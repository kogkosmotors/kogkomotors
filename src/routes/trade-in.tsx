import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, Banknote, Repeat, Gauge } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/trade-in")({
  head: () => ({
    meta: [
      { title: "Trade-In Valuation — Sell or Part-Exchange | Kogko's Motors" },
      { name: "description", content: "Get a fair, transparent valuation for your vehicle. Part-exchange against your next luxury car with Kogko's Motors." },
      { property: "og:title", content: "Trade-In Valuation | Kogko's Motors" },
      { property: "og:url", content: "/trade-in" },
    ],
    links: [{ rel: "canonical", href: "/trade-in" }],
  }),
  component: TradeIn,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(5, "Enter a valid phone").max(40),
  make: z.string().trim().min(1, "Required").max(60),
  model: z.string().trim().min(1, "Required").max(60),
  year: z.string().trim().min(4, "Required").max(4),
  mileage: z.string().trim().min(1, "Required").max(12),
  condition: z.string().min(1, "Select condition"),
  notes: z.string().trim().max(2000).optional(),
});
type Values = z.infer<typeof schema>;

const benefits = [
  { icon: Banknote, title: "Fair Market Value", text: "Honest valuations based on live market data." },
  { icon: Repeat, title: "Seamless Exchange", text: "Offset your trade-in directly against your next car." },
  { icon: Gauge, title: "Fast Turnaround", text: "Receive an indicative valuation within 24 hours." },
];

function TradeIn() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: Values) => {
    console.info("Trade-in request", v);
    setDone(true);
    toast.success("Valuation request received — we'll be in touch within 24 hours.");
  };

  return (
    <>
      <section className="border-b border-border bg-[#0a0a0a] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Trade-In" title="Your Car, Valued Fairly" subtitle="Tell us about your vehicle and receive a transparent, market-leading valuation." /></Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <SectionHeading title="Why Trade With Us" />
            <div className="mt-8 space-y-5">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary/10"><b.icon className="h-5 w-5 text-primary" /></div>
                  <div><h3 className="font-display text-xl">{b.title}</h3><p className="mt-1 text-sm text-muted-foreground">{b.text}</p></div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {done ? (
              <div className="glass rounded-xl p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 font-display text-2xl">Thank you</h3>
                <p className="mt-2 text-sm text-muted-foreground">Our valuation team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-xl p-6 sm:p-8">
                <h3 className="font-display text-2xl">Request a Valuation</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" id="ti-name" error={errors.name?.message}><Input id="ti-name" {...register("name")} placeholder="John Doe" /></Field>
                  <Field label="Phone" id="ti-phone" error={errors.phone?.message}><Input id="ti-phone" {...register("phone")} placeholder="+357 99 000 000" /></Field>
                </div>
                <div className="mt-4"><Field label="Email" id="ti-email" error={errors.email?.message}><Input id="ti-email" type="email" {...register("email")} placeholder="you@email.com" /></Field></div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Make" id="ti-make" error={errors.make?.message}><Input id="ti-make" {...register("make")} placeholder="BMW" /></Field>
                  <Field label="Model" id="ti-model" error={errors.model?.message}><Input id="ti-model" {...register("model")} placeholder="M5" /></Field>
                  <Field label="Year" id="ti-year" error={errors.year?.message}><Input id="ti-year" {...register("year")} placeholder="2021" /></Field>
                  <Field label="Mileage (km)" id="ti-mileage" error={errors.mileage?.message}><Input id="ti-mileage" {...register("mileage")} placeholder="45000" /></Field>
                </div>
                <div className="mt-4 space-y-1.5">
                  <Label htmlFor="ti-condition">Condition</Label>
                  <Select onValueChange={(v) => setValue("condition", v, { shouldValidate: true })}>
                    <SelectTrigger id="ti-condition"><SelectValue placeholder="Select condition" /></SelectTrigger>
                    <SelectContent>
                      {["Excellent", "Very Good", "Good", "Fair", "Needs Work"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.condition && <p className="text-xs text-destructive">{errors.condition.message}</p>}
                </div>
                <div className="mt-4 space-y-1.5">
                  <Label htmlFor="ti-notes">Additional Notes</Label>
                  <Textarea id="ti-notes" rows={3} {...register("notes")} placeholder="Service history, modifications, condition details…" />
                </div>
                <Button type="submit" variant="luxury" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Get My Valuation"}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
