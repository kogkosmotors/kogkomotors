import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CarFront, Compass, FileText, ShieldCheck } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Site Map | Kogko's Motors" },
      { name: "description", content: "Browse every public page on Kogko's Motors, including inventory, brands, support pages, and current vehicle listings." },
      { property: "og:title", content: "Site Map | Kogko's Motors" },
      { property: "og:url", content: "/sitemap" },
    ],
    links: [{ rel: "canonical", href: "/sitemap" }],
  }),
  component: SitemapPage,
});

const slug = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

const mainPages = [
  { to: "/" as const, label: "Home", description: "Start here for featured vehicles and showroom highlights." },
  { to: "/inventory" as const, label: "Inventory", description: "Browse the full vehicle collection with filters." },
  { to: "/brands" as const, label: "Brands", description: "Explore vehicles by marque." },
  { to: "/about" as const, label: "About Us", description: "Learn more about Kogko's Motors." },
  { to: "/contact" as const, label: "Contact", description: "Get in touch with the showroom team." },
];

const supportPages = [
  { to: "/faq" as const, label: "FAQ", description: "Find answers to buying, delivery, and reservation questions." },
];

const legalPages = [
  { to: "/privacy" as const, label: "Privacy Policy", description: "Review how data is handled and protected." },
  { to: "/terms" as const, label: "Terms & Conditions", description: "Read the website and service terms." },
  { to: "/cookies" as const, label: "Cookie Policy", description: "See how cookies are used on the site." },
];

function SitemapPage() {
  const { vehicles } = useSiteData();

  const brands = useMemo(
    () => Array.from(new Set(vehicles.map((vehicle) => vehicle.make).filter(Boolean))).sort(),
    [vehicles],
  );

  const listedVehicles = useMemo(
    () => vehicles.filter((vehicle) => vehicle.available).slice(0, 6),
    [vehicles],
  );

  const groups = [
    {
      title: "Main Pages",
      description: "Primary navigation and core showroom content.",
      icon: Compass,
      links: mainPages,
    },
    {
      title: "Support",
      description: "Helpful information for buyers and enquiries.",
      icon: FileText,
      links: supportPages,
    },
    {
      title: "Legal",
      description: "Policies and terms available on the website.",
      icon: ShieldCheck,
      links: legalPages,
    },
  ];

  return (
    <>
      <section className="border-b border-border bg-[#0a0a0a] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Navigation"
              title="Site Map"
              subtitle="Use this page to jump to every public area of the Kogko's Motors website, from inventory and brands to support and policy pages."
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {groups.map((group, index) => (
              <Reveal key={group.title} delay={index * 0.08}>
                <div className="luxury-card h-full rounded-xl p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10">
                    <group.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl">{group.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{group.description}</p>

                  <ul className="mt-6 space-y-4">
                    {group.links.map((item) => (
                      <li key={item.to}>
                        <Link to={item.to} className="group block rounded-lg border border-border/70 bg-background/30 px-4 py-3 transition-colors hover:border-primary/60 hover:bg-primary/5">
                          <span className="block font-medium text-foreground transition-colors group-hover:text-primary">{item.label}</span>
                          <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Browse By Make"
              title="Brand Pages"
              subtitle="Visit each marque page to see the vehicles currently available from that brand."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand, index) => (
              <Reveal key={brand} delay={index * 0.05}>
                <Link
                  to="/brands/$brand"
                  params={{ brand: slug(brand) }}
                  className="luxury-card block rounded-xl p-6 transition-transform hover:-translate-y-1"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Brand</p>
                  <h2 className="mt-3 font-display text-2xl">{brand}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    View all current {brand} vehicles in stock.
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="Current Stock"
              title="Vehicle Pages"
              subtitle="Quick links to the vehicles currently listed on the website."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listedVehicles.map((vehicle, index) => (
              <Reveal key={vehicle.id} delay={index * 0.05}>
                <Link
                  to="/vehicle/$id"
                  params={{ id: vehicle.id }}
                  className="luxury-card block rounded-xl p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{vehicle.make}</p>
                      <h2 className="mt-3 font-display text-2xl">{vehicle.model}</h2>
                    </div>
                    <CarFront className="h-5 w-5 shrink-0 text-primary" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {vehicle.year} · {vehicle.bodyType} · {vehicle.location}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[#0a0a0a] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Need Help?</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Explore the collection or speak with our team.</h2>
            <p className="mt-3 text-muted-foreground">
              Continue browsing available vehicles or contact the showroom for reservations, viewings, and test drives.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="luxury" size="lg">
              <Link to="/inventory">Browse Vehicles</Link>
            </Button>
            <Button asChild variant="outlineGold" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
