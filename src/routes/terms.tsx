import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Kogko's Motors" },
      { name: "description", content: "The terms and conditions governing the use of the Kogko's Motors website and services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalLayout title="Terms & Conditions" updated="June 2026">
      <p>By accessing this website and using our services, you agree to the following terms and conditions.</p>
      <h2>Vehicle Information</h2>
      <p>While we strive for accuracy, all vehicle specifications, prices and availability are subject to change and should be confirmed with our team before purchase.</p>
      <h2>Pricing</h2>
      <p>All prices are quoted in Euros and may be subject to additional fees. Finance figures are indicative and subject to status and approval.</p>
      <h2>Reservations</h2>
      <p>Reservation deposits secure a vehicle and are refundable in accordance with our reservation policy.</p>
      <h2>Liability</h2>
      <p>Kogko's Motors shall not be liable for any indirect or consequential loss arising from the use of this website.</p>
    </LegalLayout>
  ),
});
