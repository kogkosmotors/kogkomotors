import { buildSiteData, type SiteData } from "@/lib/site-data";
import type { RawSheetData } from "@/lib/sheet-types";
import { siteConfig } from "@/lib/site-config";

/** Minimal CSV parser that handles quoted fields, commas and newlines. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // ignore
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

async function fetchTab(sheetId: string, tab: string): Promise<string[][]> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}&cacheBust=${Date.now()}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    return parseCsv(await res.text());
  } catch {
    return [];
  }
}

/** Two-column rows (key, value) → record. */
function rowsToMap(rows: string[][]): Record<string, string> {
  const map: Record<string, string> = {};
  for (const row of rows) {
    const key = (row[0] ?? "").toString().trim();
    if (!key) continue;
    map[key] = (row[1] ?? "").toString().trim();
  }
  return map;
}

/**
 * Fetch editable content from the configured Google Sheet (client-side only).
 * Returns null when no sheet is configured so callers keep the built-in defaults.
 */
export async function fetchSiteData(): Promise<SiteData | null> {
  const sheetId = siteConfig.sheetId?.trim();
  if (!sheetId) return null;

  const [settingsRows, sectionsRows, vehicleRows, reviewRows] = await Promise.all([
    fetchTab(sheetId, "Settings"),
    fetchTab(sheetId, "Sections"),
    fetchTab(sheetId, "Vehicles"),
    fetchTab(sheetId, "Reviews"),
  ]);

  const raw: RawSheetData = {
    settings: rowsToMap(settingsRows),
    sections: rowsToMap(sectionsRows),
    vehicleRows,
    reviewRows,
  };

  return buildSiteData(raw);
}
