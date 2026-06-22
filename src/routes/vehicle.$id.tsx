import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Phone, Share2, ChevronLeft, Check, Gauge, Fuel, Settings2, Calendar, Cog, Zap, Palette, MapPin } from "lucide-react";
import { formatPrice, formatMileage, type Vehicle } from "@/data/vehicles";
import { getVehicleData } from "@/lib/site-sheet.functions";
import { useSiteData } from "@/hooks/use-site-data";
import { VehicleCard } from "@/components/VehicleCard";
import { FinanceCalculator } from "@/components/FinanceCalculator";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/vehicle/$id")({
  loader: async ({ params }) => {
    const vehicle = await getVehicleData({ data: params.id });
    if (!vehicle) throw notFound();
    return { vehicle };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.vehicle;
    if (!v) return { meta: [{ title: "Vehicle | Kogko's Motors" }] };
    const title = `${v.year} ${v.make} ${v.model} — ${formatPrice(v.price)} | Kogko's Motors`;
    return {
      meta: [
        { title },
        { name: "description", content: v.description },
        { property: "og:title", content: title },
        { property: "og:description", content: v.description },
        { property: "og:image", content: v.mainImage },
        { property: "og:url", content: `/vehicle/${v.id}` },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/vehicle/${v.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Car",
            name: `${v.year} ${v.make} ${v.model}`,
            brand: { "@type": "Brand", name: v.make },
            model: v.model,
            vehicleModelDate: v.year,
            mileageFromOdometer: { "@type": "QuantitativeValue", value: v.mileage, unitCode: "KMT" },
            fuelType: v.fuel,
            vehicleTransmission: v.transmission,
            color: v.exteriorColor,
            vehicleIdentificationNumber: v.vin,
            offers: { "@type": "Offer", price: v.price, priceCurrency: "EUR", availability: v.available ? "https://schema.org/InStock" : "https://schema.org/SoldOut" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Vehicle not found</h1>
      <Button asChild variant="luxury" className="mt-6"><Link to="/inventory">Back to Inventory</Link></Button>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Something went wrong</h1>
      <Button asChild variant="luxury" className="mt-6"><Link to="/inventory">Back to Inventory</Link></Button>
    </div>
  ),
  component: VehicleDetail,
});

function VehicleDetail() {
  const { vehicle: v } = Route.useLoaderData();
  const related = getRelated(v);

  const specs = [
    { icon: Calendar, label: "Year", value: v.year },
    { icon: Gauge, label: "Mileage", value: formatMileage(v.mileage) },
    { icon: Fuel, label: "Fuel", value: v.fuel },
    { icon: Settings2, label: "Transmission", value: v.transmission },
    { icon: Cog, label: "Engine", value: v.engine },
    { icon: Zap, label: "Horsepower", value: `${v.horsepower} hp` },
    { icon: Settings2, label: "Drive", value: v.drive },
    { icon: Palette, label: "Exterior", value: v.exteriorColor },
    { icon: Palette, label: "Interior", value: v.interiorColor },
    { icon: MapPin, label: "Location", value: v.location },
  ];

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `${v.make} ${v.model}`, url: window.location.href }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <Link to="/inventory" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" /> Back to Inventory
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-2xl gold-border">
            <img src={v.mainImage} alt={`${v.year} ${v.make} ${v.model}`} width={1280} height={896} className="aspect-[16/10] w-full object-cover" />
            {v.featured && <Badge className="absolute left-4 top-4 bg-gold-gradient text-primary-foreground">Featured</Badge>}
          </div>
          {v.gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {v.gallery.map((g: string, i: number) => (
                <img key={i} src={g} alt={`${v.model} view ${i + 1}`} loading="lazy" className="aspect-square w-full rounded-lg object-cover gold-border" />
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{v.make}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight">{v.model}</h1>
          <p className="mt-2 text-muted-foreground">{v.year} · {formatMileage(v.mileage)} · {v.fuel}</p>
          <p className="text-gold-gradient mt-5 font-display text-4xl font-semibold">{formatPrice(v.price)}</p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Button asChild variant="luxury" size="lg"><a href={siteConfig.phoneHref}><Phone className="h-4 w-4" /> Call Dealer</a></Button>
            <Button asChild variant="outlineGold" size="lg">
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${v.year} ${v.make} ${v.model}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </Button>
            <Button asChild variant="outlineGold" size="lg"><Link to="/trade-in">Trade-In</Link></Button>
            <Button variant="outlineGold" size="lg" onClick={share}><Share2 className="h-4 w-4" /> Share</Button>
          </div>

          <div className="mt-7 rounded-xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">VIN</p>
            <p className="mt-1 font-mono tracking-wider">{v.vin}</p>
          </div>
        </div>
      </div>

      {/* Description + specs */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-3xl">Overview</h2>
          <p className="mt-4 leading-relaxed text-secondary-foreground/90">{v.description}</p>

          <h2 className="mt-12 font-display text-3xl">Specifications</h2>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {specs.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-4">
                <s.icon className="h-5 w-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</dt>
                  <dd className="truncate font-medium text-foreground">{s.value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 font-display text-3xl">Features</h2>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {v.features.map((f: string) => (
              <li key={f} className="flex items-center gap-2 text-secondary-foreground/90">
                <Check className="h-4 w-4 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <FinanceCalculator price={v.price} />
          <LeadForm
            type="vehicle-inquiry"
            title="Enquire About This Vehicle"
            subtitle={`${v.year} ${v.make} ${v.model}`}
            meta={{ vehicle: `${v.year} ${v.make} ${v.model}`, vin: v.vin }}
            cta="Send Enquiry"
          />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <Reveal><h2 className="font-display text-3xl">Related Vehicles</h2></Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <VehicleCard key={r.id} vehicle={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}

export { vehicles };
