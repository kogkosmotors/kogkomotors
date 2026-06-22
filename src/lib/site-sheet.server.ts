import type { RawSheetData } from "@/lib/site-data";

/**
 * Master Google Sheet that controls the entire website.
 * Tabs: "Settings" (key/value), "Sections" (toggles + labels), "Vehicles" (inventory).
 */
export const SPREADSHEET_ID = "11JTMGzYZScrL4nsDozLzHuZnwfdTlXI2Jwy1SSjJACU";

const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
const EMPTY: RawSheetData = { settings: {}, sections: {}, vehicleRows: [] };
const TTL_MS = 60_000;

let cache: { at: number; data: RawSheetData } | null = null;

function rowsToMap(values?: string[][]): Record<string, string> {
  const map: Record<string, string> = {};
  (values ?? []).forEach((row) => {
    const key = (row?.[0] ?? "").toString().trim();
    if (key) map[key] = row?.[1] !== undefined ? String(row[1]) : "";
  });
  return map;
}

export async function fetchRawSheet(): Promise<RawSheetData> {
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