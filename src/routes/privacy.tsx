import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Kogko's Motors" },
      { name: "description", content: "How Kogko's Motors collects, uses and protects your personal data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalLayout title="Privacy Policy" updated="June 2026">
      <p>Kogko's Motors ("we", "us") is committed to protecting your privacy. This policy explains how we handle your personal information in accordance with the GDPR and Cyprus data protection law.</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide when you enquire, apply for finance, request a valuation, or contact us — including your name, email, phone number and vehicle details.</p>
      <h2>How We Use It</h2>
      <ul>
        <li>To respond to your enquiries and provide quotes</li>
        <li>To process finance and trade-in requests</li>
        <li>To improve our services and communicate offers (with consent)</li>
      </ul>
      <h2>Data Sharing</h2>
      <p>We share data only with trusted finance partners and service providers as necessary to fulfil your request. We never sell your data.</p>
      <h2>Your Rights</h2>
      <p>You may request access, correction or deletion of your data at any time by contacting sales@kogkosmotors.com.</p>
    </LegalLayout>
  ),
});
