import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/kogkos-logo.png.asset.json";
import { useSiteData } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { assetUrl } from "@/lib/image-urls";

const defaultLogo = assetUrl(logo.url);

export function Header() {
  const [open, setOpen] = useState(false);
  const { config, flag } = useSiteData();
  const logoSrc = config.logoUrl || defaultLogo;

  const nav = [
    { to: "/", label: "Home", show: true },
    { to: "/inventory", label: "Inventory", show: true },
    { to: "/brands", label: "Brands", show: flag("show_brands_page", true) },
    { to: "/about", label: "About", show: flag("show_about_page", true) },
    { to: "/contact", label: "Contact", show: flag("show_contact_page", true) },
  ].filter((n) => n.show);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label={`${config.name} home`}>
          <img src={logoSrc} alt={config.name} className="h-10 w-auto sm:h-12" width={300} height={120} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-secondary-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {flag("show_phone_in_header", true) && (
            <a href={config.phoneHref} className="flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-primary">
              <Phone className="h-4 w-4 text-primary" /> {config.phone}
            </a>
          )}
          <Button asChild variant="luxury" size="sm">
            <Link to="/inventory">Browse Vehicles</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-primary lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-secondary-foreground/90 hover:bg-secondary hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Button asChild variant="luxury" className="mt-3">
              <Link to="/inventory" onClick={() => setOpen(false)}>Browse Vehicles</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
