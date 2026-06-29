export type ConsentCategory = "necessary" | "functional" | "analytics" | "marketing";

export type ConsentState = Record<ConsentCategory, boolean>;

export interface StoredConsent {
  choice: "accepted" | "rejected" | "custom";
  categories: ConsentState;
  at: string;
  version: number;
}

export const CONSENT_STORAGE_KEY = "cookie-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "cookie-consent:open";

/** Categories the user can toggle. Necessary is always on. */
export const CONSENT_CATEGORIES: {
  id: ConsentCategory;
  label: string;
  description: string;
  always?: boolean;
}[] = [
  {
    id: "necessary",
    label: "Strictly necessary",
    description:
      "Required for the website to function — security, page navigation and remembering your cookie choice. These cannot be switched off.",
    always: true,
  },
  {
    id: "functional",
    label: "Functional",
    description:
      "Remember preferences such as language or saved vehicles to give you an enhanced, more personal experience.",
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Help us understand how visitors use the site so we can measure and improve performance. No analytics load before you consent.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Used to deliver relevant offers and measure advertising campaigns. No marketing scripts load before you consent.",
  },
];

export const ALL_ACCEPTED: ConsentState = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

export const ONLY_NECESSARY: ConsentState = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (!parsed || typeof parsed !== "object" || !parsed.categories) return null;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      choice: parsed.choice ?? "custom",
      categories: { ...ONLY_NECESSARY, ...parsed.categories },
      at: parsed.at ?? new Date().toISOString(),
      version: CONSENT_VERSION,
    };
  } catch {
    return null;
  }
}

export function writeConsent(
  choice: StoredConsent["choice"],
  categories: ConsentState,
): StoredConsent {
  const record: StoredConsent = {
    choice,
    categories: { ...categories, necessary: true },
    at: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore storage failures (private mode).
  }
  return record;
}

/** Reopen the cookie preferences dialog from anywhere (e.g. footer link). */
export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}
