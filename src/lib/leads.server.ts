const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxVtpLTracGOEA6xjF-Gmq1MQPrV9L9Kh9MsPSpD3Yyzvspxb6UTZU7Ox54PYBgqV3sMw/exec";

export interface LeadInput {
  type: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

/** Append a lead row to the Google Sheet via the public Apps Script Web App. */
export async function appendLead(lead: LeadInput): Promise<void> {
  const params = new URLSearchParams({
    type: lead.type,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
  });

  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    redirect: "follow",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sheets append failed (${res.status}): ${body.slice(0, 300)}`);
  }
}
