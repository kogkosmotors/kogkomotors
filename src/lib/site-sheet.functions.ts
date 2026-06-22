import { createServerFn } from "@tanstack/react-start";
import type { RawSheetData } from "@/lib/site-data";

export const getSiteSheet = createServerFn({ method: "GET" }).handler(
  async (): Promise<RawSheetData> => {
    const { fetchRawSheet } = await import("@/lib/site-sheet.server");
    return fetchRawSheet();
  },
);

/** Fetch a single vehicle (parsed) by id — used by the detail route loader (SSR-safe). */
export const getVehicleData = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { fetchRawSheet } = await import("@/lib/site-sheet.server");
    const raw = await fetchRawSheet();
    const { buildSiteData } = await import("@/lib/site-data");
    const { vehicles } = buildSiteData(raw);
    return vehicles.find((v) => v.id === id) ?? null;
  });

export const getBrandData = createServerFn({ method: "GET" })
  .inputValidator((brandSlug: string) => brandSlug)
  .handler(async ({ data: brandSlug }) => {
    const { fetchRawSheet } = await import("@/lib/site-sheet.server");
    const raw = await fetchRawSheet();
    const { buildSiteData } = await import("@/lib/site-data");
    const { vehicles } = buildSiteData(raw);
    const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
    const brands = Array.from(new Set(vehicles.map((v) => v.make).filter(Boolean)));
    const brand = brands.find((b) => slug(b) === brandSlug);
    if (!brand) return null;
    return { brand, cars: vehicles.filter((v) => v.make === brand) };
  });
