import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { formatPrice } from "@/data/vehicles";
import { useSiteData } from "@/hooks/use-site-data";
import { VehicleCard } from "@/components/VehicleCard";
import { Reveal } from "@/components/ui/reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — Luxury Vehicles for Sale | Kogko's Motors" },
      { name: "description", content: "Browse our full inventory of luxury and performance vehicles. Filter by brand, price, year, fuel, body type and more." },
      { property: "og:title", content: "Inventory | Kogko's Motors" },
      { property: "og:url", content: "/inventory" },
    ],
    links: [{ rel: "canonical", href: "/inventory" }],
  }),
  component: Inventory,
});

const ALL = "all";

type Sort = "newest" | "oldest" | "price-asc" | "price-desc" | "mileage";

function Inventory() {
  const { vehicles } = useSiteData();

  const { brands, bodyTypes, fuelTypes, transmissions, maxPrice, minYear, maxYear } = useMemo(() => {
    const uniq = (arr: string[]) => Array.from(new Set(arr.filter(Boolean))).sort();
    const prices = vehicles.map((v) => v.price);
    const years = vehicles.map((v) => v.year);
    return {
      brands: uniq(vehicles.map((v) => v.make)),
      bodyTypes: uniq(vehicles.map((v) => v.bodyType)),
      fuelTypes: uniq(vehicles.map((v) => v.fuel)),
      transmissions: uniq(vehicles.map((v) => v.transmission)),
      maxPrice: prices.length ? Math.max(...prices) : 500000,
      minYear: years.length ? Math.min(...years) : 2010,
      maxYear: years.length ? Math.max(...years) : new Date().getFullYear(),
    };
  }, [vehicles]);

  const [q, setQ] = useState("");
  const [brand, setBrand] = useState(ALL);
  const [body, setBody] = useState(ALL);
  const [fuel, setFuel] = useState(ALL);
  const [trans, setTrans] = useState(ALL);
  const [priceCap, setPriceCap] = useState<number | null>(null);
  const [yearFrom, setYearFrom] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const price = priceCap ?? maxPrice;
  const year = yearFrom ?? minYear;
  const setPrice = (n: number) => setPriceCap(n);
  const setYear = (n: number) => setYearFrom(n);

  const reset = () => {
    setQ(""); setBrand(ALL); setBody(ALL); setFuel(ALL); setTrans(ALL);
    setPriceCap(null); setYearFrom(null); setSort("newest");
  };

  const results = useMemo(() => {
    let list = vehicles.filter((v) => {
      const text = `${v.make} ${v.model} ${v.year} ${v.bodyType}`.toLowerCase();
      return (
        (!q || text.includes(q.toLowerCase())) &&
        (brand === ALL || v.make === brand) &&
        (body === ALL || v.bodyType === body) &&
        (fuel === ALL || v.fuel === fuel) &&
        (trans === ALL || v.transmission === trans) &&
        v.price <= price &&
        v.year >= year
      );
    });
    list = list.sort((a, b) => {
      switch (sort) {
        case "newest": return b.year - a.year;
        case "oldest": return a.year - b.year;
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "mileage": return a.mileage - b.mileage;
      }
    });
    return list;
  }, [q, brand, body, fuel, trans, price, year, sort]);

  const Filters = (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label>Brand</Label>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Brands</SelectItem>
            {brands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Body Type</Label>
        <Select value={body} onValueChange={setBody}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Types</SelectItem>
            {bodyTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Fuel</Label>
        <Select value={fuel} onValueChange={setFuel}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Fuel</SelectItem>
            {fuelTypes.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Transmission</Label>
        <Select value={trans} onValueChange={setTrans}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All</SelectItem>
            {transmissions.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Max Price: <span className="text-primary">{formatPrice(price)}</span></Label>
        <Slider min={50000} max={maxPrice} step={1000} value={[price]} onValueChange={(v) => setPrice(v[0])} />
      </div>
      <div className="space-y-2">
        <Label>From Year: <span className="text-primary">{year}</span></Label>
        <Slider min={minYear} max={maxYear} step={1} value={[year]} onValueChange={(v) => setYear(v[0])} />
      </div>
      <Button variant="outlineGold" className="w-full" onClick={reset}><X className="h-4 w-4" /> Reset Filters</Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">The Collection</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Our Inventory</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Explore every vehicle in our curated collection. Refine your search to find your perfect match.</p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search make, model, year…" className="pl-9" />
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
          <SelectTrigger className="sm:w-52"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="mileage">Lowest Mileage</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outlineGold" className="lg:hidden" onClick={() => setShowFilters((v) => !v)}>
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <div className="glass sticky top-24 rounded-xl p-6">{Filters}</div>
        </aside>

        <div>
          <p className="mb-5 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "vehicle" : "vehicles"} found</p>
          {results.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <p className="text-muted-foreground">No vehicles match your filters.</p>
              <Button variant="luxury" className="mt-4" onClick={reset}>Reset Filters</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
