import porscheImg from "@/assets/cars/porsche.jpg.asset.json";
import mercedesImg from "@/assets/cars/mercedes.jpg.asset.json";
import bmwImg from "@/assets/cars/bmw.jpg.asset.json";
import rangeImg from "@/assets/cars/range.jpg.asset.json";
import audiImg from "@/assets/cars/audi.jpg.asset.json";
import bentleyImg from "@/assets/cars/bentley.jpg.asset.json";
import heroImg from "@/assets/cars/hero.jpg.asset.json";
import { vehicles as fallbackVehicles, type Vehicle } from "@/data/vehicles";
import { siteConfig } from "@/lib/site-config";
import { assetUrl, imageUrl } from "@/lib/image-urls";
import type { RawSheetData } from "@/lib/sheet-types";
export type { RawSheetData } from "@/lib/sheet-types";

export type SiteConfigShape = typeof siteConfig;

export interface StatItem {
  value: string;
  label: string;
}

export interface ReviewItem {
  name: string;
  car: string;
  text: string;
}

export interface SiteData {
  config: SiteConfigShape;
  sections: Record<string, string>;
  vehicles: Vehicle[];
  stats: StatItem[];
  reviews: ReviewItem[];
}

/** Default stats — overridable per-slot from the Settings tab; blank value hides the stat. */
const DEFAULT_STATS: StatItem[] = [
  { value: "500+", label: "Vehicles Delivered" },
  { value: "25+", label: "Premium Brands" },
  { value: "15", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

const DEFAULT_REVIEWS: ReviewItem[] = [
  { name: "Andreas P.", car: "Porsche 911 Turbo S", text: "An impeccable experience from start to finish. The most refined dealership in Cyprus." },
  { name: "Maria K.", car: "Range Rover Autobiography", text: "Effortless, honest and genuinely luxurious. They handled everything beautifully." },
  { name: "Dimitris L.", car: "Bentley Continental GT", text: "World-class service. The valuation was the fairest I've ever received." },
];

/** Build the stats list from the Settings tab. Slots use keys stat1_value/stat1_label … stat6_*. Blank value = hidden. */
function buildStats(settings: Record<string, string>): StatItem[] {
  const out: StatItem[] = [];
  for (let i = 1; i <= 6; i++) {
    const d = DEFAULT_STATS[i - 1];
    const rawValue = settings[`stat${i}_value`];
    const rawLabel = settings[`stat${i}_label`];
    const value = (rawValue !== undefined ? rawValue : d?.value ?? "").trim();
    const label = (rawLabel !== undefined ? rawLabel : d?.label ?? "").trim();
    if (value) out.push({ value, label });
  }
  return out;
}

/** Build the reviews list from the Reviews tab (columns: name, car, review/text). Blank = removed. */
function buildReviews(rows: string[][]): ReviewItem[] {
  if (!rows || rows.length < 2) return DEFAULT_REVIEWS;
  const header = rows[0].map((h) => h.toString().trim().toLowerCase());
  const idx = (...names: string[]) => {
    for (const n of names) {
      const i = header.indexOf(n);
      if (i >= 0) return i;
    }
    return -1;
  };
  const ni = idx("name");
  const ci = idx("car", "vehicle");
  const ti = idx("review", "text", "quote", "message");
  const out: ReviewItem[] = [];
  for (const row of rows.slice(1)) {
    const name = (ni >= 0 ? row[ni] : "")?.toString().trim() ?? "";
    const text = (ti >= 0 ? row[ti] : "")?.toString().trim() ?? "";
    if (!name && !text) continue;
    out.push({
      name: name || "Anonymous",
      car: (ci >= 0 ? row[ci] : "")?.toString().trim() ?? "",
      text,
    });
  }
  return out;
}

const truthy = (v?: string) => /^(true|yes|1|on)$/i.test((v ?? "").trim());

/** Read a boolean toggle from the Sections tab, defaulting to `fallback`. */
export function flagOf(
  sections: Record<string, string>,
  key: string,
  fallback = true,
): boolean {
  const raw = sections[key];
  if (raw === undefined || raw === "") return fallback;
  return truthy(raw);
}

/** Read a text/label value from the Sections tab. */
export function textOf(
  sections: Record<string, string>,
  key: string,
  fallback = "",
): string {
  const raw = sections[key];
  return raw && raw.trim() ? raw : fallback;
}

function fallbackImage(make: string): string {
  const m = make.toLowerCase();
  if (m.includes("porsche")) return assetUrl(porscheImg.url);
  if (m.includes("mercedes") || m.includes("maybach")) return assetUrl(mercedesImg.url);
  if (m.includes("bmw")) return assetUrl(bmwImg.url);
  if (m.includes("land rover") || m.includes("range")) return assetUrl(rangeImg.url);
  if (m.includes("audi")) return assetUrl(audiImg.url);
  if (m.includes("bentley")) return assetUrl(bentleyImg.url);
  return assetUrl(heroImg.url);
}

function splitList(value?: string): string[] {
  return (value ?? "")
    .split(/[|\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseVehicles(rows: string[][]): Vehicle[] {
  if (!rows || rows.length < 2) return fallbackVehicles;
  const header = rows[0].map((h) => h.toString().trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name);
  const col = (row: string[], name: string) => {
    const i = idx(name);
    return i >= 0 && row[i] !== undefined ? String(row[i]).trim() : "";
  };
  const num = (row: string[], name: string) => {
    const n = Number(col(row, name).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const parsed = rows.slice(1).reduce<Vehicle[]>((acc, row) => {
    const make = col(row, "make");
    const model = col(row, "model");
    if (!make && !model) return acc;

    const fallback = fallbackImage(make);
    const gallery = splitList(col(row, "image_url")).map(imageUrl);
    const main = gallery[0] || fallback;
    const id =
      col(row, "id") ||
      `${make}-${model}-${col(row, "year")}`.toLowerCase().replace(/\s+/g, "-");

    acc.push({
      id,
      make,
      model,
      year: num(row, "year"),
      mileage: num(row, "mileage"),
      price: num(row, "price"),
      fuel: col(row, "fuel"),
      transmission: col(row, "transmission"),
      drive: col(row, "drive"),
      engine: col(row, "engine"),
      horsepower: num(row, "horsepower"),
      bodyType: col(row, "bodytype"),
      exteriorColor: col(row, "exteriorcolor"),
      interiorColor: col(row, "interiorcolor"),
      vin: col(row, "vin"),
      description: col(row, "description"),
      features: splitList(col(row, "features")),
      gallery: gallery.length ? gallery : [main],
      mainImage: main,
      fallbackImage: fallback,
      available:
        col(row, "available") === "" ? true : truthy(col(row, "available")),
      featured: truthy(col(row, "featured")),
      location: col(row, "location"),
    });
    return acc;
  }, []);

  return parsed.length ? parsed : fallbackVehicles;
}

/** Build the typed, merged site data from the raw sheet rows (pure, SSR-safe). */
export function buildSiteData(raw?: RawSheetData | null): SiteData {
  const settings = raw?.settings ?? {};
  const sections = raw?.sections ?? {};
  const s = (key: string, fallback: string) =>
    settings[key] && settings[key].trim() ? settings[key] : fallback;
  const n = (key: string, fallback: number) => {
    const raw = settings[key];
    if (raw === undefined || raw.trim() === "") return fallback;
    const parsed = Number(raw.replace(/[^0-9.]/g, ""));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  };

  const config: SiteConfigShape = {
    sheetId: siteConfig.sheetId,
    name: s("site_name", siteConfig.name),
    tagline: s("tagline", siteConfig.tagline),
    description: s("description", siteConfig.description),
    phone: s("phone", siteConfig.phone),
    phoneHref: s("phone_href", siteConfig.phoneHref),
    whatsapp: s("whatsapp", siteConfig.whatsapp),
    email: s("email", siteConfig.email),
    logoUrl: imageUrl(s("logo_url", siteConfig.logoUrl)),
    logoHeaderHeight: n("logo_header_height", siteConfig.logoHeaderHeight),
    logoFooterHeight: n("logo_footer_height", siteConfig.logoFooterHeight),
    heroImage: imageUrl(s("hero_image_url", siteConfig.heroImage)),
    filterPriceMin: n("filter_price_min", siteConfig.filterPriceMin),
    filterPriceMax: n("filter_price_max", siteConfig.filterPriceMax),
    filterYearMin: n("filter_year_min", siteConfig.filterYearMin),
    filterYearMax: n("filter_year_max", siteConfig.filterYearMax),
    address: s("address", siteConfig.address),
    mapQuery: s("map_query", siteConfig.mapQuery),
    hours: [
      { day: s("hours_day1_label", siteConfig.hours[0].day), time: s("hours_mon_fri", siteConfig.hours[0].time) },
      { day: s("hours_day2_label", siteConfig.hours[1].day), time: s("hours_sat", siteConfig.hours[1].time) },
      { day: s("hours_day3_label", siteConfig.hours[2].day), time: s("hours_sun", siteConfig.hours[2].time) },
    ],
    socials: {
      instagram: s("instagram", siteConfig.socials.instagram),
      facebook: s("facebook", siteConfig.socials.facebook),
      youtube: s("youtube", siteConfig.socials.youtube),
    },
  };

  return {
    config,
    sections,
    vehicles: parseVehicles(raw?.vehicleRows ?? []),
    stats: buildStats(settings),
    reviews: buildReviews(raw?.reviewRows ?? []),
  };
}

/** Default data used during SSR / before the sheet loads. */
export const defaultSiteData: SiteData = buildSiteData(null);
