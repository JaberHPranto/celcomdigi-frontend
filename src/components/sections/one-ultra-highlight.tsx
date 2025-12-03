import Link from "next/link";

import { oneUltraHighlight } from "@/data/site-content";

export function OneUltraHighlight() {
  return (
    <section
      id="one-ultra"
      className="border-b border-border/80 bg-linear-to-r from-secondary/20 via-background to-primary/10 py-48"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
            CelcomDigi One Ultra
          </p>
          <h2 className="text-3xl font-bold leading-tight text-foreground">
            {oneUltraHighlight.title}
          </h2>
          <p className="text-base text-muted-foreground">
            {oneUltraHighlight.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={oneUltraHighlight.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02]"
            >
              {oneUltraHighlight.primaryCta.label}
            </Link>
            <Link
              href={oneUltraHighlight.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-primary/50 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              {oneUltraHighlight.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="relative h-70 w-full overflow-hidden rounded-3xl border border-dashed border-primary/40 bg-white p-6 shadow-lg">
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/60">
                Bundle perks
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• 300Mbps home fibre with WiFi 6 router</li>
                <li>• 5G flagship devices with Easy360 financing</li>
                <li>• Unlimited 5G/4G data & calls for the whole family</li>
                <li>• CelcomDigi app rewards and personalised care</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-primary/10 p-4 text-sm text-primary mt-4">
              Placeholder visual — replace with official One Ultra key art when
              available.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
