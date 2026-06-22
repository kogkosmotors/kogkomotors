import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getSiteSheet } from "@/lib/site-sheet.functions";
import { buildSiteData } from "@/lib/site-data";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { vehicles } = buildSiteData(await getSiteSheet());
        const brands = Array.from(new Set(vehicles.map((v) => v.make).filter(Boolean))).sort();
        const staticPaths: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/inventory", changefreq: "daily", priority: "0.9" },
          { path: "/brands", changefreq: "weekly", priority: "0.7" },
          { path: "/finance", changefreq: "monthly", priority: "0.7" },
          { path: "/trade-in", changefreq: "monthly", priority: "0.7" },
          { path: "/about", changefreq: "yearly", priority: "0.5" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          { path: "/faq", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/cookies", changefreq: "yearly", priority: "0.3" },
        ];

        const brandPaths: SitemapEntry[] = brands.map((b) => ({
          path: `/brands/${b.toLowerCase().replace(/\s+/g, "-")}`,
          changefreq: "weekly",
          priority: "0.6",
        }));

        const vehiclePaths: SitemapEntry[] = vehicles.map((v) => ({
          path: `/vehicle/${v.id}`,
          changefreq: "weekly",
          priority: "0.8",
        }));

        const entries = [...staticPaths, ...brandPaths, ...vehiclePaths];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
