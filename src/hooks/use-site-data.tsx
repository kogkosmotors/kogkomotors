import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  defaultSiteData,
  flagOf,
  textOf,
  type SiteData,
} from "@/lib/site-data";

interface SiteDataContextValue extends SiteData {
  /** True boolean toggle from the Sections tab. */
  flag: (key: string, fallback?: boolean) => boolean;
  /** Text/label value from the Sections tab. */
  text: (key: string, fallback?: string) => string;
  loading: boolean;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const value = useMemo<SiteDataContextValue>(() => {
    const built: SiteData = defaultSiteData;
    return {
      ...built,
      flag: (key, fallback = true) => flagOf(built.sections, key, fallback),
      text: (key, fallback = "") => textOf(built.sections, key, fallback),
      loading: false,
    };
  }, []);

  return (
    <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    // Fallback so components used outside the provider still render.
    return {
      ...defaultSiteData,
      flag: (key, fallback = true) => flagOf(defaultSiteData.sections, key, fallback),
      text: (key, fallback = "") => textOf(defaultSiteData.sections, key, fallback),
      loading: false,
    };
  }
  return ctx;
}
