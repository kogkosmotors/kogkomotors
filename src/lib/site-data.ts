import porscheImg from "@/assets/cars/porsche.jpg.asset.json";
import mercedesImg from "@/assets/cars/mercedes.jpg.asset.json";
import bmwImg from "@/assets/cars/bmw.jpg.asset.json";
import rangeImg from "@/assets/cars/range.jpg.asset.json";
import audiImg from "@/assets/cars/audi.jpg.asset.json";
import bentleyImg from "@/assets/cars/bentley.jpg.asset.json";
import heroImg from "@/assets/cars/hero.jpg.asset.json";
import { vehicles as fallbackVehicles, type Vehicle } from "@/data/vehicles";
import { siteConfig } from "@/lib/site-config";
import type { RawSheetData } from "@/lib/sheet-types";
export type { RawSheetData } from "@/lib/sheet-types";

export type SiteConfigShape = typeof siteConfig;

export interface SiteData {
  config: SiteConfigShape;
  sections: Record<string, string>;
  vehicles: Vehicle[];
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
  if (m.includes("porsche")) return porscheImg.url;
  if (m.includes("mercedes") || m.includes("maybach")) return mercedesImg.url;
  if (m.includes("bmw")) return bmwImg.url;
  if (m.includes("land rover") || m.includes("range")) return rangeImg.url;
  if (m.includes("audi")) return audiImg.url;
  if (m.includes("bentley")) return bentleyImg.url;
  return heroImg.url;
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

    const gallery = splitList(col(row, "image_url"));
    const main = gallery[0] || fallbackImage(make);
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

  const config: SiteConfigShape = {
    name: s("site_name", siteConfig.name),
    tagline: s("tagline", siteConfig.tagline),
    description: s("description", siteConfig.description),
    phone: s("phone", siteConfig.phone),
    phoneHref: s("phone_href", siteConfig.phoneHref),
    whatsapp: s("whatsapp", siteConfig.whatsapp),
    email: s("email", siteConfig.email),
    address: s("address", siteConfig.address),
    mapQuery: s("map_query", siteConfig.mapQuery),
    hours: [
      { day: "Monday – Friday", time: s("hours_mon_fri", siteConfig.hours[0].time) },
      { day: "Saturday", time: s("hours_sat", siteConfig.hours[1].time) },
      { day: "Sunday", time: s("hours_sun", siteConfig.hours[2].time) },
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
  };
}

/** Default data used during SSR / before the sheet loads. */
export const defaultSiteData: SiteData = buildSiteData(null);
