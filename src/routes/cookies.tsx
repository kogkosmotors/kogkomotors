import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { Button } from "@/components/ui/button";
import { openCookiePreferences } from "@/lib/cookie-consent";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Kogko's Motors" },
      { name: "description", content: "How Kogko's Motors uses cookies and similar technologies on this website, and how to manage your consent." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <LegalLayout title="Cookie Policy" updated="June 2026">
      <p>This website uses cookies and similar technologies to enhance your browsing experience, analyse site traffic and remember your preferences. This policy explains what we use, why, for how long, and how you can control your choices.</p>

      <h2>What Are Cookies</h2>
      <p>Cookies are small text files stored on your device that help us remember your preferences and understand how the site is used. Similar technologies include local storage and pixels.</p>

      <h2>Categories We Use</h2>
      <ul>
        <li><strong>Strictly necessary</strong> — required for the site to function, including security, navigation and remembering your cookie choice. These are always active and cannot be switched off. Typical duration: session to 12 months.</li>
        <li><strong>Functional</strong> — remember preferences such as language or saved vehicles. Typical duration: up to 12 months.</li>
        <li><strong>Analytics</strong> — help us understand how visitors use the site so we can measure and improve performance. These load only after you consent. Typical duration: up to 24 months.</li>
        <li><strong>Marketing</strong> — used to deliver relevant offers and measure advertising. These load only after you consent. Typical duration: up to 12 months.</li>
      </ul>

      <h2>Third Parties</h2>
      <p>Some cookies may be set by third-party services we use for analytics or advertising. These providers set their own cookies only after you grant consent for the relevant category, and they may process data under their own privacy policies.</p>

      <h2>Your Consent &amp; How to Withdraw It</h2>
      <p>When you first visit, no non-essential cookies are loaded until you make a choice. You can accept all, reject non-essential cookies, or choose specific categories. You can change or withdraw your consent at any time using the button below or the “Cookie settings” link in the footer.</p>
      <p>
        <Button variant="luxury" size="sm" onClick={openCookiePreferences}>Manage cookie preferences</Button>
      </p>

      <h2>Managing Cookies in Your Browser</h2>
      <p>You can also control or delete cookies through your browser settings at any time. Disabling cookies may affect site functionality.</p>
    </LegalLayout>
  ),
});
