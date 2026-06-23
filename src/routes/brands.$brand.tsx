import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export const Route = createFileRoute("/brands/$brand")({
  head: () => ({
    meta: [
      { title: "Brand Vehicles for Sale | Kogko's Motors" },
      { name: "description", content: "Browse premium vehicles available at Kogko's Motors, Cyprus's premier luxury dealership." },
      { property: "og:title", content: "Brand Vehicles | Kogko's Motors" },
    ],
  }),
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
  const { brand: brandParam } = Route.useParams();
  const { vehicles, loading } = useSiteData();
  const brand = Array.from(new Set(vehicles.map((v) => v.make).filter(Boolean))).find((b) => slug(b) === brandParam);
  const cars = brand ? vehicles.filter((v) => v.make === brand) : [];

  if (!brand && loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Loading brand…</h1>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Brand not found</h1>
        <Button asChild variant="luxury" className="mt-6"><Link to="/brands">All Brands</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Link to="/brands" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" /> All Brands
      </Link>
      <h1 className="mt-5 font-display text-4xl sm:text-5xl">{brand}</h1>
      <p className="mt-2 text-muted-foreground">{cars.length} {cars.length === 1 ? "vehicle" : "vehicles"} available</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((v: typeof cars[number]) => <VehicleCard key={v.id} vehicle={v} />)}
      </div>
    </div>
  );
}
