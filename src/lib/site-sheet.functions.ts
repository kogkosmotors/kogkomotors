import { createServerFn } from "@tanstack/react-start";
import { buildSiteData, type RawSheetData } from "@/lib/site-data";

/**
 * Master Google Sheet that controls the entire website.
 * Tabs: "Settings" (key/value), "Sections" (toggles + labels), "Vehicles" (inventory).
 * The dealership edits this single sheet to manage everything.
 */
export const SPREADSHEET_ID = "11JTMGzYZScrL4nsDozLzHuZnwfdTlXI2Jwy1SSjJACU";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

const EMPTY: RawSheetData = { settings: {}, sections: {}, vehicleRows: [] };

// Simple in-memory cache so we don't hit Sheets quota on every render.
let cache: { at: number; data: RawSheetData } | null = null;
const TTL_MS = 60_000;

function rowsToMap(values?: string[][]): Record<string, string> {
  const map: Record<string, string> = {};
  (values ?? []).forEach((row) => {
    const key = (row?.[0] ?? "").toString().trim();
    if (key) map[key] = row?.[1] !== undefined ? String(row[1]) : "";
  });
  return map;
}

/** Plain async helper (not a server fn) — fetches & caches the raw sheet. */
async function fetchRawSheet(): Promise<RawSheetData> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;

  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const lovableKey = process.env.LOVABLE_API_KEY;
  if (!apiKey || !lovableKey) return cache?.data ?? EMPTY;

  try {
    const url =
      `${GATEWAY}/spreadsheets/${SPREADSHEET_ID}/values:batchGet` +
      `?ranges=Settings!A2:C&ranges=Sections!A2:C&ranges=Vehicles!A1:Z`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": apiKey,
      },
    });
    if (!res.ok) return cache?.data ?? EMPTY;
    const json = (await res.json()) as {
      valueRanges?: { values?: string[][] }[];
    };
    const [settings, sections, vehicles] = json.valueRanges ?? [];
    const data: RawSheetData = {
      settings: rowsToMap(settings?.values),
      sections: rowsToMap(sections?.values),
      vehicleRows: vehicles?.values ?? [],
    };
    cache = { at: Date.now(), data };
    return data;
  } catch {
    return cache?.data ?? EMPTY;
  }
}

export const getSiteSheet = createServerFn({ method: "GET" }).handler(
  async (): Promise<RawSheetData> => fetchRawSheet(),
);

/** Fetch a single vehicle (parsed) by id — used by the detail route loader (SSR-safe). */
export const getVehicleData = createServerFn({ method: "GET" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const raw = await fetchRawSheet();
    const { vehicles } = buildSiteData(raw);
    return vehicles.find((v) => v.id === id) ?? null;
  });
