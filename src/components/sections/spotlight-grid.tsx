import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { spotlightCards } from "@/data/site-content";

const cardGradients = [
  "linear-gradient(135deg, oklch(0.82 0.2 250 / 0.95) 0%, oklch(0.66 0.19 220 / 0.92) 45%, oklch(0.55 0.2 260 / 0.95) 100%)",
  "linear-gradient(135deg, oklch(0.85 0.18 95 / 0.9) 0%, oklch(0.75 0.14 120 / 0.95) 50%, oklch(0.6 0.12 180 / 0.98) 100%)",
  "linear-gradient(135deg, oklch(0.86 0.17 240 / 0.96) 0%, oklch(0.68 0.15 300 / 0.92) 50%, oklch(0.58 0.14 330 / 0.95) 100%)",
  "linear-gradient(135deg, oklch(0.9 0.12 250 / 0.9) 0%, oklch(0.78 0.1 210 / 0.95) 45%, oklch(0.65 0.12 190 / 0.98) 100%)",
];

export function SpotlightGrid() {
  return (
    <section
      id="spotlights"
      className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-background via-primary/12 to-background py-20"
    >
      <div aria-hidden className="featured-section__background" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Featured for you
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            Experience favourites loved by Malaysians
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Curated picks that customers can’t stop talking about—discover
            plans, bundles, and perks tuned to how you stay connected.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {spotlightCards.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              className="featured-card group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.25rem] border border-white/20 p-7 text-white shadow-[0_18px_40px_rgba(23,54,140,0.28)] transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_55px_rgba(23,54,140,0.38)]"
              style={{
                background: cardGradients[index % cardGradients.length],
              }}
            >
              <div className="featured-card__overlay" aria-hidden />
              <div className="featured-card__noise" aria-hidden />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/70">
                  <span className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-white/50" />
                  <span>{card.eyebrow ?? "Top pick"}</span>
                </div>
                <h3 className="text-2xl font-semibold leading-snug text-white drop-shadow-sm">
                  {card.title}
                </h3>
              </div>
              <div className="relative flex items-center gap-3 text-sm font-semibold mt-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-white transition duration-200 group-hover:bg-white group-hover:text-primary">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <span className="featured-card__beam" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
