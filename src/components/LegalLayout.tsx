import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

export function LegalLayout({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
      <Reveal>
        <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="prose-luxury mt-8 space-y-6 text-secondary-foreground/90 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_li]:text-muted-foreground">
          {children}
        </div>
      </Reveal>
    </div>
  );
}
