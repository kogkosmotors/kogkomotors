import { createFileRoute, Link } from "@tanstack/react-router";
import { useSiteData } from "@/hooks/use-site-data";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "Premium Brands — Luxury Marques | Kogko's Motors" },
      { name: "description", content: "Explore the prestigious brands available at Kogko's Motors, from Porsche and Bentley to Mercedes-Benz and Range Rover." },
      { property: "og:title", content: "Premium Brands | Kogko's Motors" },
      { property: "og:url", content: "/brands" },
    ],
    links: [{ rel: "canonical", href: "/brands" }],
  }),
  component: Brands,
});

function Brands() {
  const { vehicles } = useSiteData();
  const brands = Array.from(new Set(vehicles.map((v) => v.make).filter(Boolean))).sort();
  return (
    <>
      <section className="border-b border-border bg-[#0a0a0a] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Marques" title="Premium Brands" subtitle="We specialise in the world's most revered automotive names." /></Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b, i) => {
            const count = vehicles.filter((v) => v.make === b).length;
            const sample = vehicles.find((v) => v.make === b)!;
            return (
              <Reveal key={b} delay={i * 0.06}>
                <Link to="/brands/$brand" params={{ brand: b.toLowerCase().replace(/\s+/g, "-") }} className="luxury-card group block overflow-hidden rounded-xl">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={sample.mainImage} alt={b} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-5">
                      <h3 className="font-display text-2xl">{b}</h3>
                      <p className="text-sm text-primary">{count} {count === 1 ? "vehicle" : "vehicles"}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
