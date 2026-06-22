import { createFileRoute } from "@tanstack/react-router";
import { FileText, BadgeCheck, Clock, TrendingDown, ShieldCheck, Wallet } from "lucide-react";
import { FinanceCalculator } from "@/components/FinanceCalculator";
import { LeadForm } from "@/components/LeadForm";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Vehicle Finance — Flexible Packages | Kogko's Motors" },
      { name: "description", content: "Tailored vehicle finance with competitive rates. Use our calculator and apply online for fast pre-approval at Kogko's Motors." },
      { property: "og:title", content: "Vehicle Finance | Kogko's Motors" },
      { property: "og:url", content: "/finance" },
    ],
    links: [{ rel: "canonical", href: "/finance" }],
  }),
  component: Finance,
});

const steps = [
  { icon: FileText, title: "Apply Online", text: "Complete a short application in minutes — no obligation." },
  { icon: BadgeCheck, title: "Get Approved", text: "Receive a tailored decision from our finance partners fast." },
  { icon: Wallet, title: "Choose Your Plan", text: "Select the deposit and term that suit your lifestyle." },
  { icon: Clock, title: "Drive Away", text: "Complete the paperwork and collect your vehicle." },
];

const benefits = [
  { icon: TrendingDown, title: "Competitive Rates", text: "Access market-leading APRs through our trusted lending partners." },
  { icon: ShieldCheck, title: "No Hidden Fees", text: "Total transparency on every figure, every time." },
  { icon: Wallet, title: "Flexible Terms", text: "From 12 to 84 months with deposits to match your budget." },
];

const documents = ["Valid ID or passport", "Proof of address (utility bill)", "Recent bank statements (3 months)", "Proof of income / payslips", "Driving licence"];

function Finance() {
  return (
    <>
      <section className="border-b border-border bg-[#0a0a0a] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Finance" title="Drive Now, Pay Your Way" subtitle="Bespoke finance packages crafted around you, with fast decisions and complete transparency." /></Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal><FinanceCalculator price={150000} /></Reveal>
          <Reveal delay={0.1}><LeadForm type="finance" title="Apply for Finance" subtitle="Tell us a little about you and we'll be in touch with a tailored quote." messageLabel="Tell us about the vehicle you want" cta="Submit Application" /></Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="The Process" title="How It Works" center /></Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="luxury-card h-full rounded-xl p-6">
                  <span className="text-gold-gradient font-display text-3xl font-semibold">0{i + 1}</span>
                  <s.icon className="mt-4 h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Why Finance With Us" title="The Benefits" />
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
            <div className="glass rounded-xl p-8">
              <h3 className="font-display text-2xl">Required Documents</h3>
              <p className="mt-1 text-sm text-muted-foreground">Have these ready to speed up your application.</p>
              <ul className="mt-6 space-y-3">
                {documents.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-secondary-foreground/90"><BadgeCheck className="h-5 w-5 shrink-0 text-primary" /> {d}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
