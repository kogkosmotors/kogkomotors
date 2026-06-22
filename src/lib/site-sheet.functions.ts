import { createServerFn } from "@tanstack/react-start";
import type { RawSheetData } from "@/lib/site-data";
import { fetchRawSheet } from "@/lib/site-sheet.server";

export const getSiteSheet = createServerFn({ method: "GET" }).handler(
  async (): Promise<RawSheetData> => fetchRawSheet(),
);

/** Fetch a single vehicle (parsed) by id — used by the detail route loader (SSR-safe). */
export const getVehicleData = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const raw = await fetchRawSheet();
    const { buildSiteData } = await import("@/lib/site-data");
    const { vehicles } = buildSiteData(raw);
    return vehicles.find((v) => v.id === id) ?? null;
  });
