import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { openCookiePreferences } from "@/lib/cookie-consent";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Kogko's Motors" },
      { name: "description", content: "How Kogko's Motors collects, uses, shares and protects your personal data, your rights under the GDPR, and how to contact us." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalLayout title="Privacy Policy" updated="June 2026">
      <p>Kogko's Motors ("we", "us", "our") is committed to protecting your privacy and handling your personal data responsibly. This policy explains what personal data we collect, why we collect it, the legal basis for processing, how long we keep it, who we share it with, and the rights you have under the EU General Data Protection Regulation (GDPR) and applicable Cyprus data protection law.</p>

      <h2>1. Who We Are (Data Controller)</h2>
      <p>Kogko's Motors is the data controller responsible for your personal data. You can reach us using the contact details at the end of this policy. We have not appointed a dedicated Data Protection Officer; privacy enquiries are handled by our team at <a href="mailto:sales@kogkosmotors.com">sales@kogkosmotors.com</a>.</p>

      <h2>2. What Personal Data We Collect</h2>
      <ul>
        <li><strong>Identity &amp; contact data</strong> — name, email address, phone number, and any details you choose to include in your message.</li>
        <li><strong>Enquiry data</strong> — vehicle of interest, finance, trade-in or valuation details you provide.</li>
        <li><strong>Technical &amp; usage data</strong> — IP address, browser type, device information and pages visited, collected through cookies and similar technologies (only with your consent for non-essential cookies).</li>
        <li><strong>Consent records</strong> — your cookie choices and form consent, so we can demonstrate the basis for processing.</li>
      </ul>

      <h2>3. Why We Collect It &amp; Legal Basis</h2>
      <ul>
        <li><strong>To respond to enquiries and provide quotes</strong> — legal basis: your consent and/or steps taken at your request prior to entering a contract.</li>
        <li><strong>To process finance, trade-in and valuation requests</strong> — legal basis: performance of a contract or pre-contractual steps.</li>
        <li><strong>To operate, secure and improve our website</strong> — legal basis: our legitimate interests in running a safe, functional service.</li>
        <li><strong>Analytics</strong> (e.g. Google Analytics) — legal basis: your consent, given through our cookie banner.</li>
        <li><strong>To comply with legal obligations</strong> — legal basis: compliance with applicable law.</li>
      </ul>

      <h2>4. How Long We Keep It</h2>
      <p>We keep enquiry and contact data only for as long as necessary to handle your request and for a reasonable period afterwards to manage our relationship and meet legal or accounting obligations — typically up to 24 months from your last contact, unless a longer period is required by law. Analytics data is retained according to the provider's settings (typically up to 26 months). When data is no longer needed, we securely delete or anonymise it.</p>

      <h2>5. Who We Share It With</h2>
      <p>We share personal data only where necessary, with:</p>
      <ul>
        <li>Trusted finance partners, where you request finance or trade-in services.</li>
        <li>Service providers who help us operate the website and communications (e.g. hosting, analytics such as Google Analytics) under appropriate data-processing terms.</li>
        <li>Authorities or advisers where required by law.</li>
      </ul>
      <p>We never sell your personal data. Where data is processed outside the European Economic Area, we rely on appropriate safeguards such as Standard Contractual Clauses.</p>

      <h2>6. Cookies</h2>
      <p>We use cookies and similar technologies as described in our <Link to="/cookies">Cookie Policy</Link>. No non-essential cookies (including analytics) are set until you give consent. You can change or withdraw your consent at any time:</p>
      <p>
        <Button variant="luxury" size="sm" onClick={openCookiePreferences}>Manage cookie preferences</Button>
      </p>

      <h2>7. Your Rights Under the GDPR</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> the personal data we hold about you.</li>
        <li><strong>Rectify</strong> inaccurate or incomplete data.</li>
        <li><strong>Erase</strong> your data ("right to be forgotten").</li>
        <li><strong>Data portability</strong> — receive your data in a portable format.</li>
        <li><strong>Restrict</strong> processing in certain circumstances.</li>
        <li><strong>Object</strong> to processing based on legitimate interests or direct marketing.</li>
        <li><strong>Withdraw consent</strong> at any time, without affecting prior processing.</li>
      </ul>
      <p>To exercise any of these rights, contact us at <a href="mailto:sales@kogkosmotors.com">sales@kogkosmotors.com</a>. You also have the right to lodge a complaint with the Office of the Commissioner for Personal Data Protection in Cyprus.</p>

      <h2>8. Data Security</h2>
      <p>We use appropriate technical and organisational measures to protect your data, including encryption in transit (HTTPS), access controls, secure hosting and regular updates. While no method of transmission is completely secure, we work to safeguard your information.</p>

      <h2>9. Marketing</h2>
      <p>We will only send you marketing communications where you have given your consent, and every such message includes a way to unsubscribe. You can opt out at any time.</p>

      <h2>10. Contact Us</h2>
      <p>Kogko's Motors<br />Strovolos, Nicosia, Cyprus<br />Email: <a href="mailto:sales@kogkosmotors.com">sales@kogkosmotors.com</a><br />Phone: <a href="tel:+35799592202">+357 99 592202</a></p>
    </LegalLayout>
  ),
});
