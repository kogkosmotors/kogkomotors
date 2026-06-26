export const siteConfig = {
  /**
   * Google Sheet ID powering editable content (stats, reviews, settings).
   * Paste the ID from your sheet URL: docs.google.com/spreadsheets/d/<THIS_PART>/edit
   * The sheet must be shared as "Anyone with the link can view". Leave blank to use built-in defaults.
   */
  sheetId: "11JTMGzYZScrL4nsDozLzHuZnwfdTlXI2Jwy1SSjJACU",
  name: "Kogko's Motors",
  tagline: "The Art of Automotive Excellence",
  description:
    "Kogko's Motors — Cyprus's premier luxury vehicle dealership. Discover an exclusive curated collection of premium and performance automobiles, bespoke finance and trade-in services.",
  phone: "+357 99 592202",
  phoneHref: "tel:+35799592202",
  whatsapp: "35799592202",
  email: "sales@kogkosmotors.com",
  logoUrl: "",
  /** Header/footer logo heights in pixels — editable from the Settings tab. */
  logoHeaderHeight: 64,
  logoFooterHeight: 64,
  heroImage: "",
  address: "Strovolos, Nicosia, Cyprus",
  mapQuery: "Strovolos, Nicosia, Cyprus",
  hours: [
    { day: "Monday – Friday", time: "09:00 – 19:00" },
    { day: "Saturday", time: "10:00 – 17:00" },
    { day: "Sunday", time: "By appointment" },
  ],
  socials: {
    instagram: "https://www.instagram.com/kogkos_motors",
    facebook: "https://www.facebook.com/people/Kogkos-Motors/61584137496512/",
    youtube: "https://youtube.com",
  },
};

export type SiteConfig = typeof siteConfig;
