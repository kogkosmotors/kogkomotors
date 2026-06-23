const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";
const SPREADSHEET_ID = "11JTMGzYZScrL4nsDozLzHuZnwfdTlXI2Jwy1SSjJACU";
const LEADS_RANGE = "Leads!A:F";

export interface LeadInput {
  type: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

/** Append a lead row to the Google Sheet via the Lovable connector gateway. */
export async function appendLead(lead: LeadInput): Promise<void> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey || !sheetsKey) {
    throw new Error("Google Sheets connector is not configured.");
  }

  const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${LEADS_RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": sheetsKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [
        [
          new Date().toISOString(),
          lead.type,
          lead.name,
          lead.email,
          lead.phone,
          lead.message,
        ],
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets append failed (${res.status}): ${body.slice(0, 300)}`);
  }
}
