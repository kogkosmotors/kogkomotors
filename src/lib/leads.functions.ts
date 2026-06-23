import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { appendLead } from "./leads.server";

const leadSchema = z.object({
  type: z.string().trim().max(100),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  message: z.string().trim().max(2000).optional().default(""),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    await appendLead({
      type: data.type,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message ?? "",
    });
    return { ok: true as const };
  });
