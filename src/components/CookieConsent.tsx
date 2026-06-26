import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/hooks/use-site-data";

const STORAGE_KEY = "cookie-consent";

/**
 * GDPR / EU ePrivacy + US (CCPA/CPRA) friendly consent banner.
 * - Shown until the visitor makes an explicit choice (no pre-ticked consent).
 * - Equally prominent "Accept" and "Reject" actions.
 * - Choice is stored locally so non-essential scripts can read it before loading.
 */
export function CookieConsent() {
  const { text, flag } = useSiteData();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (choice: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice, at: new Date().toISOString() }),
      );
    } catch {
      // Ignore storage failures (private mode); banner simply reappears.
    }
    setVisible(false);
  };

  if (!flag("show_cookie_banner", true) || !visible) return null;

  return (
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
              "We use cookies to enhance your experience, analyse traffic and remember your preferences. You can accept all cookies or reject non-essential ones.",
            )}{" "}
            <Link to="/cookies" className="text-primary underline-offset-4 hover:underline">
              {text("cookie_banner_link", "Cookie Policy")}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Button variant="outline" size="sm" onClick={() => decide("rejected")}>
            {text("cookie_reject_label", "Reject non-essential")}
          </Button>
          <Button variant="luxury" size="sm" onClick={() => decide("accepted")}>
            {text("cookie_accept_label", "Accept all")}
          </Button>
        </div>
      </div>
    </div>
  );
}
