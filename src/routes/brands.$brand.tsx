import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { brands, vehicles } from "@/data/vehicles";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export const Route = createFileRoute("/brands/$brand")({
  loader: ({ params }) => {
    const brand = brands.find((b) => slug(b) === params.brand);
    if (!brand) throw notFound();
    return { brand, cars: vehicles.filter((v) => v.make === brand) };
  },
  head: ({ loaderData }) => {
    const brand = loaderData?.brand ?? "Brand";
    return {
      meta: [
        { title: `${brand} — Vehicles for Sale | Kogko's Motors` },
        { name: "description", content: `Browse our collection of ${brand} vehicles available at Kogko's Motors, Cyprus's premier luxury dealership.` },
        { property: "og:title", content: `${brand} | Kogko's Motors` },
        { property: "og:url", content: `/brands/${slug(brand)}` },
      ],
      links: [{ rel: "canonical", href: `/brands/${slug(brand)}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Brand not found</h1>
      <Button asChild variant="luxury" className="mt-6"><Link to="/brands">All Brands</Link></Button>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Something went wrong</h1>
      <Button asChild variant="luxury" className="mt-6"><Link to="/brands">All Brands</Link></Button>
    </div>
  ),
  component: BrandPage,
});

function BrandPage() {
  const { brand, cars } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Link to="/brands" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" /> All Brands
      </Link>
      <h1 className="mt-5 font-display text-4xl sm:text-5xl">{brand}</h1>
      <p className="mt-2 text-muted-foreground">{cars.length} {cars.length === 1 ? "vehicle" : "vehicles"} available</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
      </div>
    </div>
  );
}
