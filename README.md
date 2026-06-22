# Kogko's Motors — Luxury Vehicle Dealership

A premium, production-ready dealership website built on **TanStack Start (React 19 + TypeScript)**, Tailwind CSS, shadcn/ui and Framer Motion.

## Pages
Home · Inventory (filters/search/sort) · Vehicle Details (gallery, specs, finance calculator, lead form, related) · Finance · Trade-In · About · Contact · FAQ · Brands (+ dynamic brand pages) · Privacy · Terms · Cookies · 404.

## Vehicle data
Vehicles live in `src/data/vehicles.ts`. Each record carries the full spec set
(make, model, year, mileage, price, fuel, transmission, drive, engine, hp,
colors, VIN, features, gallery, availability, featured, location).

## Google Sheets CMS (optional headless inventory)
The dealer can manage inventory from a Google Sheet — no admin panel needed.

### Setup
1. Create a Google Sheet with a header row matching:
   `id, make, model, year, price, mileage, transmission, fuel, bodyType, description, features, images, featured, available, make/brand, color, engine, horsepower, location`
2. **Publish to web** (File → Share → Publish to web) or use the Sheets API.
3. Add the env var below and wire `src/data/vehicles.ts` to fetch + map rows
   inside a server function (`createServerFn`) so the site updates automatically.

### Environment variables
```
GOOGLE_SHEETS_ID=your_sheet_id
GOOGLE_SHEETS_API_KEY=your_api_key
LEADS_WEBHOOK_URL=https://script.google.com/...   # receives every form lead
```
Read them with `process.env.*` inside server functions only.

## Lead capture
All forms (Contact, Finance, Trade-In, Vehicle Enquiry) post to the
`submitLead` server function in `src/lib/leads.functions.ts`. Set
`LEADS_WEBHOOK_URL` (e.g. a Google Apps Script web app) to forward leads to a
Sheet/email; otherwise leads are logged server-side.

## Dealer configuration
Brand info, phone, WhatsApp, email, address, hours and socials live in
`src/lib/site-config.ts`.

## SEO
Per-route metadata, Open Graph, Twitter cards, AutoDealer / Car / FAQ JSON-LD,
dynamic `sitemap.xml`, `robots.txt`, PWA manifest and canonical tags are all wired.

## Develop
The dev server runs automatically in Lovable. Routes are file-based under `src/routes/`.
