import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/kogkos-logo.png.asset.json";
import { useSiteData } from "@/hooks/use-site-data";
import { assetUrl } from "@/lib/image-urls";

const defaultLogo = assetUrl(logo.url);

export function Footer() {
  const { config, text } = useSiteData();
  const logoSrc = config.logoUrl || defaultLogo;
  return (
    <footer className="border-t border-border bg-[#0a0a0a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logoSrc} alt={config.name} className="mb-5 w-auto" style={{ height: config.logoFooterHeight }} width={300} height={120} />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{text("footer_note", config.description)}</p>
          <div className="mt-5 flex gap-3">
            {config.socials.instagram && (
              <a href={config.socials.instagram} aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border text-primary hover:bg-primary/10">
                <Instagram className="h-4 w-4" />
              </a>
            )}
            {config.socials.facebook && (
              <a href={config.socials.facebook} aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-border text-primary hover:bg-primary/10">
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {config.socials.youtube && (
              <a href={config.socials.youtube} aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full border border-border text-primary hover:bg-primary/10">
                <Youtube className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>


        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Explore</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/inventory", l: "Inventory" },
              { to: "/brands", l: "Brands" },
              { to: "/faq", l: "FAQ" },
              { to: "/about", l: "About Us" },
            ].map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="hover:text-primary">{i.l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {config.address}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary" /> <a href={config.phoneHref} className="hover:text-primary">{config.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary" /> <a href={`mailto:${config.email}`} className="hover:text-primary">{config.email}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Showroom Hours</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {config.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span><span className="text-foreground">{h.day}</span><br />{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {config.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/sitemap" className="hover:text-primary">Sitemap</Link>
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <Link to="/cookies" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
