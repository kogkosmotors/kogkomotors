import { createFileRoute } from "@tanstack/react-router";
import { Award, Gem, HeartHandshake, Target } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Our Story | Kogko's Motors" },
      { name: "description", content: "Discover the story behind Kogko's Motors, Cyprus's premier luxury vehicle dealership built on passion, integrity and uncompromising standards." },
      { property: "og:title", content: "About Kogko's Motors" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const values = [
  { icon: Gem, title: "Excellence", text: "We accept nothing less than perfection in every vehicle and every interaction." },
  { icon: HeartHandshake, title: "Integrity", text: "Honest dealings, transparent pricing and lasting relationships." },
  { icon: Target, title: "Passion", text: "A genuine love of fine automobiles drives everything we do." },
  { icon: Award, title: "Service", text: "A concierge experience tailored to the discerning client." },
];

function About() {
  return (
    <>
      <section className="border-b border-border bg-[#0a0a0a] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Our Story" title="The Art of Automotive Excellence" subtitle="For over fifteen years, Kogko's Motors has been Cyprus's trusted destination for the world's finest automobiles." /></Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-3xl px-4 text-lg leading-relaxed text-secondary-foreground/90 sm:px-6">
          <Reveal>
            <p>Founded on a simple belief — that buying an extraordinary car should be an extraordinary experience — Kogko's Motors has grown into one of Cyprus's most respected luxury dealerships.</p>
            <p className="mt-5">Every vehicle in our collection is hand-selected, meticulously inspected, and presented with full transparency. From the moment you step into our Nicosia showroom to the day you drive away, a dedicated specialist ensures every detail is flawless.</p>
            <p className="mt-5">We don't just sell cars. We curate experiences, build relationships, and deliver a standard of service worthy of the marques we represent.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-t border-border bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="What We Stand For" title="Our Values" center /></Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="luxury-card h-full rounded-xl p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/10"><v.icon className="h-6 w-6 text-primary" /></div>
                  <h3 className="mt-5 font-display text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
