# Kogko's Motors — Luxury Vehicle Dealership

A premium, production-ready dealership website built on **TanStack Start (React 19 + TypeScript)**, Tailwind CSS, shadcn/ui and Framer Motion.

## Pages
Home · Inventory (filters/search/sort) · Vehicle Details (gallery, specs, calculator, lead form, related) · Trade-In · About · Contact · FAQ · Brands (+ dynamic brand pages) · Privacy · Terms · Cookies · 404.

## Vehicle data
Vehicles live in `src/data/vehicles.ts`. Each record carries the full spec set
(make, model, year, mileage, price, fuel, transmission, drive, engine, hp,
colors, VIN, features, gallery, availability, featured, location).

## Lead capture
All forms show an on-site confirmation and can be wired to a backend endpoint later if persistent lead storage is needed.

## Dealer configuration
Brand info, phone, WhatsApp, email, address, hours and socials live in
`src/lib/site-config.ts`.

## SEO
Per-route metadata, Open Graph, Twitter cards, AutoDealer / Car / FAQ JSON-LD,
PWA manifest and canonical tags are wired.

## Develop
The dev server runs automatically in Lovable. Routes are file-based under `src/routes/`.

## Inventory and site data

The published site currently uses the checked-in fallback inventory and site settings so production builds stay stable. Editable external inventory can be reintroduced later behind a simpler API endpoint if needed.
