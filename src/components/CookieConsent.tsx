import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSiteData } from "@/hooks/use-site-data";
import {
  ALL_ACCEPTED,
  CONSENT_CATEGORIES,
  CONSENT_EVENT,
  ONLY_NECESSARY,
  readConsent,
  writeConsent,
  type ConsentCategory,
  type ConsentState,
} from "@/lib/cookie-consent";

/**
 * GDPR / EU ePrivacy + US (CCPA/CPRA) friendly consent manager.
 * - Banner shown until the visitor makes an explicit choice (no pre-ticked consent).
 * - Equally prominent Accept / Reject / Manage actions.
 * - "Manage preferences" dialog with granular categories.
 * - Choice can be reopened anytime via the footer link (CONSENT_EVENT).
 * - Non-essential scripts must read the stored consent before loading.
 */
export function CookieConsent() {
  const { text, flag } = useSiteData();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [selection, setSelection] = useState<ConsentState>(ONLY_NECESSARY);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = readConsent();
    if (!existing) {
      setBannerVisible(true);
    } else {
      setSelection(existing.categories);
    }
  }, []);

  // Allow reopening the preferences dialog from anywhere (e.g. footer link).
  useEffect(() => {
    const open = () => {
      const existing = readConsent();
      setSelection(existing?.categories ?? ONLY_NECESSARY);
      setPrefsOpen(true);
    };
    window.addEventListener(CONSENT_EVENT, open);
    return () => window.removeEventListener(CONSENT_EVENT, open);
  }, []);

  const persist = (
    choice: "accepted" | "rejected" | "custom",
    categories: ConsentState,
  ) => {
    writeConsent(choice, categories);
    setSelection(categories);
    setBannerVisible(false);
    setPrefsOpen(false);
  };

  const acceptAll = () => persist("accepted", ALL_ACCEPTED);
  const rejectAll = () => persist("rejected", ONLY_NECESSARY);
  const saveCustom = () => persist("custom", selection);

  const toggle = (id: ConsentCategory, value: boolean) =>
    setSelection((prev) => ({ ...prev, [id]: value }));

  if (!flag("show_cookie_banner", true)) return null;

  return (
    <>
      {bannerVisible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                {text(
                  "cookie_banner_text",
                  "We use cookies to enhance your experience, analyse traffic and remember your preferences. You can accept all cookies, reject non-essential ones, or choose exactly what you allow.",
                )}{" "}
                <Link to="/cookies" className="text-primary underline-offset-4 hover:underline">
                  {text("cookie_banner_link", "Cookie Policy")}
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={() => setPrefsOpen(true)}>
                {text("cookie_manage_label", "Manage preferences")}
              </Button>
              <Button variant="outline" size="sm" onClick={rejectAll}>
                {text("cookie_reject_label", "Reject non-essential")}
              </Button>
              <Button variant="luxury" size="sm" onClick={acceptAll}>
                {text("cookie_accept_label", "Accept all")}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" /> Cookie preferences
            </DialogTitle>
            <DialogDescription>
              Choose which categories of cookies you allow. You can change these settings at any
              time. See our{" "}
              <Link to="/cookies" className="text-primary underline-offset-4 hover:underline">
                Cookie Policy
              </Link>{" "}
              for details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {CONSENT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{cat.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <Switch
                  checked={cat.always ? true : selection[cat.id]}
                  disabled={cat.always}
                  onCheckedChange={(v) => toggle(cat.id, v)}
                  aria-label={`${cat.label} cookies`}
                />
              </div>
            ))}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <Button variant="outline" size="sm" onClick={rejectAll}>
              Reject non-essential
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={saveCustom}>
                Save preferences
              </Button>
              <Button variant="luxury" size="sm" onClick={acceptAll}>
                Accept all
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
