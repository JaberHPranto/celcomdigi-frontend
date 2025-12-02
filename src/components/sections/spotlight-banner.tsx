import Link from "next/link";

import { spotlightBanner } from "@/data/site-content";

export function SpotlightBanner() {
  return (
    <section id="coming-soon" className=" bg-background py-16">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="spotlight-card relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-br from-primary/65 via-primary/45 to-secondary/55 p-10 text-white shadow-2xl shadow-primary/30">
          <div className="pointer-events-none absolute inset-0">
            <div className="spotlight-card__layer spotlight-card__layer--one" />
            <div className="spotlight-card__layer spotlight-card__layer--two" />
            <div className="spotlight-card__layer spotlight-card__layer--three" />
            <div className="spotlight-card__orb spotlight-card__orb--top" />
            <div className="spotlight-card__orb spotlight-card__orb--bottom" />
          </div>

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/90 backdrop-blur-sm">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-secondary"
                />
                <span>CelcomDigi Spotlight</span>
              </div>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                {spotlightBanner.title}
              </h2>
              <p className="text-base text-white/80 sm:text-lg">
                Expect something extraordinary from CelcomDigi very soon. Stay
                tuned for the full reveal.
              </p>
              <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.2em] text-white/60">
                <span className="spotlight-card__tab spotlight-card__tab--active">
                  Full reveal
                </span>
                <span className="spotlight-card__tab">First look</span>
                <span className="spotlight-card__tab">Launch drops</span>
                <span className="spotlight-card__tab">VIP access</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 sm:items-end">
              <Link
                href={spotlightBanner.cta.href}
                className="relative inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-[0_15px_35px_rgba(255,255,255,0.35)] transition duration-200 hover:scale-[1.04] hover:shadow-[0_20px_45px_rgba(255,255,255,0.45)]"
              >
                <span className="relative z-10">
                  {spotlightBanner.cta.label}
                </span>
              </Link>
              <span className="spotlight-card__glow" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
