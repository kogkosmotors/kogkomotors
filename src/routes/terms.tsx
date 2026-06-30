import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Kogko's Motors" },
      { name: "description", content: "The terms and conditions governing the use of the Kogko's Motors website and services, governed by the laws of Cyprus." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalLayout title="Terms & Conditions" updated="June 2026">
      <p>By accessing this website and using our services, you agree to the following terms and conditions. If you do not agree, please do not use the website.</p>

      <h2>1. Website Usage</h2>
      <p>You may use this website for lawful purposes only. You agree not to misuse the site, attempt to gain unauthorised access, disrupt its operation, or use it in any way that could damage or impair the service or other users' enjoyment of it.</p>

      <h2>2. User Responsibilities</h2>
      <p>You are responsible for ensuring that any information you provide to us — including in enquiry, finance, valuation or contact forms — is accurate and up to date. You must not submit content that is unlawful, misleading or infringes the rights of others.</p>

      <h2>3. Vehicle Information</h2>
      <p>While we strive for accuracy, all vehicle specifications, prices, equipment and availability are provided for guidance and are subject to change. Details should be confirmed with our team before any purchase. Images may be illustrative.</p>

      <h2>4. Pricing &amp; Financing</h2>
      <p>All prices are quoted in Euros and may be subject to additional fees and taxes. Any finance figures shown are indicative only, subject to status, eligibility and approval by the relevant finance provider. Full terms of any finance agreement will be provided separately before you commit.</p>

      <h2>5. Warranty</h2>
      <p>Where a vehicle is offered with a warranty, the applicable terms, coverage and duration will be confirmed in writing. Statutory consumer rights are not affected.</p>

      <h2>6. Reservations</h2>
      <p>Reservation deposits secure a vehicle and are handled in accordance with our reservation policy, which will be made clear at the time of reservation.</p>

      <h2>7. Intellectual Property</h2>
      <p>All content on this website — including text, logos, graphics, images, icons, fonts and design — is owned by or licensed to Kogko's Motors and protected by intellectual property laws. You may not reproduce, distribute or use it without our prior written permission.</p>

      <h2>8. Disclaimers</h2>
      <p>The website and its content are provided "as is" without warranties of any kind, express or implied. We do not warrant that the website will be uninterrupted, error-free or free of harmful components.</p>

      <h2>9. Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Kogko's Motors shall not be liable for any indirect, incidental or consequential loss arising from your use of, or inability to use, this website. Nothing in these terms limits liability that cannot be excluded by law.</p>

      <h2>10. Governing Law</h2>
      <p>These terms are governed by and construed in accordance with the laws of the Republic of Cyprus, and any disputes shall be subject to the exclusive jurisdiction of the courts of Cyprus.</p>

      <h2>11. Contact</h2>
      <p>Questions about these terms can be sent to <a href="mailto:sales@kogkosmotors.com">sales@kogkosmotors.com</a>.</p>
    </LegalLayout>
  ),
});
