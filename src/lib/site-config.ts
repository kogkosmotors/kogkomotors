export const siteConfig = {
  name: "Kogko's Motors",
  tagline: "The Art of Automotive Excellence",
  description:
    "Kogko's Motors — Cyprus's premier luxury vehicle dealership. Discover an exclusive curated collection of premium and performance automobiles, bespoke finance and trade-in services.",
  phone: "+357 99 000 000",
  phoneHref: "tel:+35799000000",
  whatsapp: "35799000000",
  email: "sales@kogkosmotors.com",
  address: "12 Makarios Avenue, Nicosia 1065, Cyprus",
  mapQuery: "Nicosia, Cyprus",
  hours: [
    { day: "Monday – Friday", time: "09:00 – 19:00" },
    { day: "Saturday", time: "10:00 – 17:00" },
    { day: "Sunday", time: "By appointment" },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export type SiteConfig = typeof siteConfig;
