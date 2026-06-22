import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  type: z.string().min(1).max(40),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  message: z.string().trim().max(2000).optional().default(""),
  meta: z.record(z.string(), z.string()).optional().default({}),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Records a lead. In production this writes to your CRM / Google Sheet /
 * email provider. See README for wiring SHEETS_WEBHOOK_URL or an email API.
 */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const webhook = process.env.LEADS_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
        });
      } catch (err) {
        console.error("Lead webhook failed", err);
      }
    } else {
      console.log("[LEAD]", JSON.stringify(data));
    }
    return { ok: true };
  });
