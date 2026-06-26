import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { Toaster } from "@/components/ui/sonner";
import { SiteDataProvider } from "@/hooks/use-site-data";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kogko's Motors — Luxury & Performance Vehicles in Cyprus" },
      {
        name: "description",
        content:
          "Kogko's Motors — Cyprus's premier luxury dealership. Explore a curated collection of premium and performance vehicles with bespoke finance and trade-in services.",
      },
      { name: "author", content: "Kogko's Motors" },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "Kogko's Motors — Luxury & Performance Vehicles in Cyprus" },
      { property: "og:description", content: "Kogko's Luxury Motors is a premium online dealership showcasing high-end vehicles with a luxurious user experience." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Kogko's Motors" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kogko's Motors — Luxury & Performance Vehicles in Cyprus" },
      { name: "description", content: "Kogko's Luxury Motors is a premium online dealership showcasing high-end vehicles with a luxurious user experience." },
      { name: "twitter:description", content: "Kogko's Luxury Motors is a premium online dealership showcasing high-end vehicles with a luxurious user experience." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4eb50c92-3fd3-46b7-9100-528b54c5c34c/id-preview-86dd57bb--9aeb962f-850b-45a7-bbab-3a0e1a781d65.lovable.app-1782157325256.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4eb50c92-3fd3-46b7-9100-528b54c5c34c/id-preview-86dd57bb--9aeb962f-850b-45a7-bbab-3a0e1a781d65.lovable.app-1782157325256.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          name: "Kogko's Motors",
          description: "Cyprus's premier luxury vehicle dealership.",
          telephone: "+35799592202",
          email: "sales@kogkosmotors.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Strovolos",
            addressLocality: "Nicosia",
            addressCountry: "CY",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteDataProvider>
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </SiteDataProvider>
    </QueryClientProvider>
  );
}
