import Link from "next/link";

import { spotlightBanner } from "@/data/site-content";

export function SpotlightBanner() {
  return (
    <section
      id="coming-soon"
      className="border-b border-border/80 bg-background py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-foreground">
            {spotlightBanner.title}
          </h2>
          <p className="text-base text-muted-foreground">
            Expect something extraordinary from CelcomDigi very soon. Stay tuned
            for the full reveal.
          </p>
        </div>
        <Link
          href={spotlightBanner.cta.href}
          className="inline-flex items-center justify-center rounded-full border border-primary/50 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
        >
          {spotlightBanner.cta.label}
        </Link>
      </div>
    </section>
  );
}
