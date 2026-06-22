import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  defaultSiteData,
  flagOf,
  textOf,
  type SiteData,
} from "@/lib/site-data";
import { fetchSiteData } from "@/lib/site-sheet";

interface SiteDataContextValue extends SiteData {
  /** True boolean toggle from the Sections tab. */
  flag: (key: string, fallback?: boolean) => boolean;
  /** Text/label value from the Sections tab. */
  text: (key: string, fallback?: string) => string;
  loading: boolean;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchSiteData()
      .then((fetched) => {
        if (active && fetched) setData(fetched);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<SiteDataContextValue>(() => {
    return {
      ...data,
      flag: (key, fallback = true) => flagOf(data.sections, key, fallback),
      text: (key, fallback = "") => textOf(data.sections, key, fallback),
      loading,
    };
  }, [data, loading]);

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
