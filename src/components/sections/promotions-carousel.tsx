"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ChevronRight,
  Gift,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Waves,
} from "lucide-react";

import { promotions } from "@/data/site-content";
import { cn } from "@/lib/utils";

const iconPalette = [
  Sparkles,
  Smartphone,
  Gift,
  ShieldCheck,
  ShieldCheck,
  Waves,
];

const layoutPalette = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:row-span-2",
  // "",
  "",
  "lg:col-span-2",
];

export function PromotionsCarousel() {
  const items = useMemo(() => promotions, []);

  return (
    <section
      id="promotions"
      className="border-b border-border/80 bg-background section-padding"
      aria-label="Promotions"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
            Promotions
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold text-foreground">
              Rewards, vouchers & limited-time exclusives
            </h2>
            <Link
              href="/promotions"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white/80 px-6 py-2.5 text-sm font-medium text-primary transition hover:border-primary hover:bg-primary/10"
            >
              View all promotions
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(180px,1fr)]">
          {items.map((item, index) => {
            const Icon = iconPalette[index] ?? Sparkles;
            const layout = layoutPalette[index] ?? "";

            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "group flex flex-col gap-4 rounded-3xl border border-border/40 bg-white/80 p-6 shadow-sm ring-1 ring-inset ring-white/40 transition hover:border-primary/30 hover:shadow-md lg:p-8",
                  layout
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-primary/80">
                      {item.category}
                    </span>
                    {item.segment ? (
                      <span className="rounded-full bg-muted/40 px-3 py-1 text-muted-foreground">
                        {item.segment}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary/80">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold leading-snug text-foreground">
                  {item.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Discover more
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
