import Link from "next/link";

import { spotlightCards } from "@/data/site-content";

export function SpotlightGrid() {
  return (
    <section
      id="spotlights"
      className="border-b border-border/80 bg-background py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
            Featured for you
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            Experience favourites loved by Malaysians
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {spotlightCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex h-full flex-col justify-between gap-4 rounded-3xl border border-border/70 bg-white p-6 transition hover:border-primary/60 hover:shadow-lg"
            >
              <div className="space-y-3">
                {card.eyebrow ? (
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                    {card.eyebrow}
                  </span>
                ) : null}
                <h3 className="text-xl font-semibold text-foreground/90">
                  {card.title}
                </h3>
              </div>
              <span className="text-sm font-semibold text-primary">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
