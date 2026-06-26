import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Headphones, Banknote, Star, Quote } from "lucide-react";
import heroImg from "@/assets/cars/hero.jpg.asset.json";
import { VehicleCard } from "@/components/VehicleCard";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/hooks/use-site-data";
import { assetUrl } from "@/lib/image-urls";

const defaultHeroImage = assetUrl(heroImg.url);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kogko's Motors — Luxury & Performance Vehicles in Cyprus" },
      { name: "description", content: "Discover Cyprus's finest curated collection of luxury and performance vehicles. Bespoke finance, trade-in and concierge service at Kogko's Motors." },
      { property: "og:title", content: "Kogko's Motors — Luxury & Performance Vehicles" },
      { property: "og:description", content: "Cyprus's premier luxury vehicle dealership." },
      { property: "og:image", content: defaultHeroImage },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});


const whyUsDefaults = [
  { icon: Award, title: "Curated Excellence", text: "Every vehicle is hand-selected and inspected to the highest standard." },
  { icon: ShieldCheck, title: "Total Transparency", text: "Full service history and verified provenance on every car." },
  { icon: Banknote, title: "Bespoke Finance", text: "Tailored finance packages designed around your lifestyle." },
  { icon: Headphones, title: "Concierge Service", text: "A dedicated specialist from first viewing to delivery." },
];

function Home() {
  const { config, vehicles, text, flag, stats, reviews } = useSiteData();
  const heroImage = config.heroImage || defaultHeroImage;
  const featured = vehicles.filter((v) => v.featured);
  const latest = [...vehicles].sort((a, b) => b.year - a.year).slice(0, 3);
  const brands = Array.from(new Set(vehicles.map((v) => v.make).filter(Boolean))).sort();
  const whyUs = whyUsDefaults.map((w, i) => ({
    icon: w.icon,
    title: text(`why${i + 1}_title`, w.title),
    text: text(`why${i + 1}_text`, w.text),
  }));
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img src={heroImage} alt="Luxury performance car at night" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            {text("hero_eyebrow", config.tagline)}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            Drive the <span className="text-gold-gradient">Extraordinary</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 max-w-xl text-lg text-secondary-foreground/85">
            {text("hero_subtext", "Cyprus's premier destination for luxury and performance automobiles. A curated collection, an uncompromising standard.")}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="luxury" size="xl">
              <Link to="/inventory">Browse Vehicles <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outlineGold" size="xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      {stats.length > 0 && (
      <section className="border-y border-border bg-[#0a0a0a]">
        <div className={`mx-auto grid max-w-7xl divide-x divide-border px-4 sm:px-6 ${stats.length >= 4 ? "grid-cols-2 md:grid-cols-4" : stats.length === 3 ? "grid-cols-3" : stats.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <p className="text-gold-gradient font-display text-3xl font-semibold sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* FEATURED */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal><SectionHeading eyebrow="The Collection" title="Featured Vehicles" subtitle="Hand-picked masterpieces from the world's most revered marques." /></Reveal>
            <Button asChild variant="outlineGold"><Link to="/inventory">View All</Link></Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.08}><VehicleCard vehicle={v} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST */}
      <section className="section-pad border-t border-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Just Arrived" title="Latest Arrivals" center /></Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.08}><VehicleCard vehicle={v} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Marques" title="Premium Brands" center subtitle="We specialise in the most prestigious names in motoring." /></Reveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {brands.map((b) => (
              <Link key={b} to="/brands/$brand" params={{ brand: b.toLowerCase().replace(/\s+/g, "-") }} className="glass rounded-full px-6 py-3 font-display text-lg text-foreground transition-colors hover:text-primary">
                {b}
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* WHY US */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="The Kogko's Standard" title="Why Choose Us" center /></Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="luxury-card h-full rounded-xl p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10"><w.icon className="h-6 w-6 text-primary" /></div>
                  <h3 className="mt-5 font-display text-xl">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {reviews.length > 0 && (
      <section className="section-pad border-t border-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Client Voices" title="What Our Clients Say" center /></Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {reviews.map((t, i) => (
              <Reveal key={`${t.name}-${i}`} delay={i * 0.08}>
                <figure className="luxury-card h-full rounded-xl p-7">
                  <Quote className="h-8 w-8 text-primary/60" />
                  <div className="mt-3 flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-primary text-primary" />)}</div>
                  <blockquote className="mt-4 text-secondary-foreground/90">"{t.text}"</blockquote>
                  <figcaption className="mt-5 text-sm"><span className="font-semibold text-foreground">{t.name}</span>{t.car && <><br /><span className="text-muted-foreground">{t.car}</span></>}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* CONTACT CTA + MAP */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Visit Us" title="Experience Kogko's Motors" subtitle="Step into our showroom in the heart of Nicosia, or arrange a private viewing at your convenience." />
            <div className="mt-7 flex flex-wrap gap-4">
              <Button asChild variant="luxury" size="lg"><Link to="/contact">Contact Us</Link></Button>
              <Button asChild variant="outlineGold" size="lg"><a href={config.phoneHref}>Call {config.phone}</a></Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-xl gold-border">
              <iframe
                title="Kogko's Motors location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(config.mapQuery)}&output=embed`}
                className="h-[340px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
