import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(5, "Enter a valid phone").max(40),
  message: z.string().trim().max(2000).optional(),
});
type Values = z.infer<typeof schema>;

export function LeadForm({
  type,
  title = "Send us a message",
  subtitle,
  messageLabel = "Message",
  meta = {},
  cta = "Submit Request",
}: {
  type: string;
  title?: string;
  subtitle?: string;
  messageLabel?: string;
  meta?: Record<string, string>;
  cta?: string;
}) {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const submit = useServerFn(submitLead);

  const onSubmit = async (values: Values) => {
    const metaText = Object.entries(meta)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");
    const message = [values.message ?? "", metaText].filter(Boolean).join("\n");
    try {
      await submit({
        data: {
          type,
          name: values.name,
          email: values.email,
          phone: values.phone,
          message,
        },
      });
      setDone(true);
      toast.success("Request received — our team will contact you shortly.");
    } catch (err) {
      console.error("Lead submit failed", err);
      toast.error("Something went wrong. Please try again or call us directly.");
    }
  };

  if (done) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 font-display text-2xl">Thank you</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your request has been received. A Kogko's Motors specialist will be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-xl p-6 sm:p-8">
      <h3 className="font-display text-2xl">{title}</h3>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={`${type}-name`}>Full Name</Label>
          <Input id={`${type}-name`} {...register("name")} placeholder="John Doe" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`${type}-phone`}>Phone</Label>
          <Input id={`${type}-phone`} {...register("phone")} placeholder="+357 99 000 000" />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor={`${type}-email`}>Email</Label>
        <Input id={`${type}-email`} type="email" {...register("email")} placeholder="you@email.com" />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor={`${type}-message`}>{messageLabel}</Label>
        <Textarea id={`${type}-message`} rows={4} {...register("message")} placeholder="How can we help?" />
      </div>

      <Button type="submit" variant="luxury" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : cta}
      </Button>
    </form>
  );
}
