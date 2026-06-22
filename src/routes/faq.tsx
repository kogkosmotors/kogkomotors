import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Frequently Asked Questions | Kogko's Motors" },
      { name: "description", content: "Answers to common questions about buying, financing, trading in and reserving vehicles at Kogko's Motors." },
      { property: "og:title", content: "FAQ | Kogko's Motors" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQ,
});

const faqs = [
  { cat: "Buying", q: "How do I reserve a vehicle?", a: "You can reserve any vehicle by placing a refundable deposit through our team. Simply enquire on the vehicle page or contact us directly." },
  { cat: "Buying", q: "Can I view a car before purchasing?", a: "Absolutely. We encourage private viewings at our Nicosia showroom. Book an appointment and a specialist will guide you through every detail." },
  { cat: "Trade-In", q: "How is my trade-in valued?", a: "We base valuations on live market data, condition, mileage and history. Submit a request and we'll respond within 24 hours." },
  { cat: "Trade-In", q: "Can I part-exchange against any car?", a: "Yes, your trade-in value can be offset directly against any vehicle in our inventory." },
  { cat: "Warranty", q: "Do vehicles come with a warranty?", a: "Eligible vehicles include a comprehensive warranty. Extended warranty options are available — ask our team for details." },
  { cat: "Reservations", q: "Is my deposit refundable?", a: "Yes, reservation deposits are fully refundable should you decide not to proceed." },
  { cat: "Payments", q: "What payment methods do you accept?", a: "We accept bank transfer and major payment methods. Our team will guide you through the secure process." },
  { cat: "Vehicle History", q: "Do you provide service history?", a: "Every vehicle is supplied with full service history and verified provenance for complete peace of mind." },
  { cat: "Delivery", q: "Do you deliver vehicles?", a: "Yes, we offer nationwide delivery across Cyprus and can arrange international shipping on request." },
];

const categories = Array.from(new Set(faqs.map((f) => f.cat)));

function FAQ() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => faqs.filter((f) => `${f.q} ${f.a} ${f.cat}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <>
      <section className="border-b border-border bg-[#0a0a0a] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Help Centre" title="Frequently Asked Questions" subtitle="Everything you need to know about buying, financing and trading with Kogko's Motors." /></Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions…" className="pl-9" />
          </div>

          {categories.map((cat) => {
            const items = filtered.filter((f) => f.cat === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="mt-10">
                <h2 className="mb-3 font-display text-2xl text-primary">{cat}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {items.map((f) => (
                    <AccordionItem key={f.q} value={f.q} className="glass rounded-lg border-none px-4">
                      <AccordionTrigger className="text-left hover:no-underline">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}

          {filtered.length === 0 && <p className="mt-10 text-center text-muted-foreground">No questions match your search.</p>}
        </div>
      </section>
    </>
  );
}
