import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Kogko's Motors" },
      { name: "description", content: "How Kogko's Motors uses cookies and similar technologies on this website." },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <LegalLayout title="Cookie Policy" updated="June 2026">
      <p>This website uses cookies to enhance your browsing experience and analyse site traffic.</p>
      <h2>What Are Cookies</h2>
      <p>Cookies are small text files stored on your device that help us remember your preferences and understand how the site is used.</p>
      <h2>Types We Use</h2>
      <ul>
        <li><strong>Essential</strong> — required for the site to function</li>
        <li><strong>Analytics</strong> — help us improve the experience</li>
        <li><strong>Preference</strong> — remember your settings such as language</li>
      </ul>
      <h2>Managing Cookies</h2>
      <p>You can control or delete cookies through your browser settings at any time. Disabling cookies may affect site functionality.</p>
    </LegalLayout>
  ),
});
