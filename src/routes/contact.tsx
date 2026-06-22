import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/hooks/use-site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Visit Our Showroom | Kogko's Motors" },
      { name: "description", content: "Get in touch with Kogko's Motors. Visit our Nicosia showroom, call, email or message us on WhatsApp." },
      { property: "og:title", content: "Contact Kogko's Motors" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { config: siteConfig } = useSiteData();
  return (
    <>
      <section className="border-b border-border bg-[#0a0a0a] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionHeading eyebrow="Get In Touch" title="Contact Kogko's Motors" subtitle="We'd be delighted to assist you. Reach out or visit our showroom in the heart of Nicosia." /></Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Address", value: siteConfig.address, href: `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}` },
                { icon: Phone, label: "Phone", value: siteConfig.phone, href: siteConfig.phoneHref },
                { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${siteConfig.whatsapp}` },
              ].map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="luxury-card flex items-center gap-4 rounded-xl p-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/10"><c.icon className="h-5 w-5 text-primary" /></div>
                  <div><p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p><p className="font-medium text-foreground">{c.value}</p></div>
                </a>
              ))}

              <div className="luxury-card rounded-xl p-5">
                <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary" /><h3 className="font-display text-lg">Business Hours</h3></div>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {siteConfig.hours.map((h) => (
                    <li key={h.day} className="flex justify-between"><span>{h.day}</span><span className="text-foreground">{h.time}</span></li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-xl gold-border">
                <iframe title="Kogko's Motors location" src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&output=embed`} className="h-[300px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <Button asChild variant="outlineGold" className="w-full">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address)}`} target="_blank" rel="noopener noreferrer"><Navigation className="h-4 w-4" /> Get Directions</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <LeadForm type="contact" title="Send Us a Message" subtitle="Fill in the form and a specialist will respond shortly." cta="Send Message" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
