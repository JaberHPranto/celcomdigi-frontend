"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { promotions } from "@/data/site-content";

export function PromotionsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => promotions, []);

  function handleScroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const offset = direction === "left" ? -clientWidth : clientWidth;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  return (
    <section
      id="promotions"
      className="border-b border-border/80 bg-background py-12"
      aria-label="Promotions"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Promotions
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Rewards, vouchers & limited-time exclusives
            </h2>
            <Link
              href="/promotions"
              className="inline-flex items-center justify-center rounded-full border border-primary/50 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              View all promotions
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 lg:block">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-white shadow-md transition hover:scale-105"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
          </div>
          <div className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block">
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-white shadow-md transition hover:scale-105"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </div>
          <div
            ref={scrollRef}
            className="grid snap-x snap-mandatory auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto rounded-3xl border border-border/70 bg-white p-4"
          >
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex h-full flex-col justify-between gap-4 rounded-2xl bg-muted/30 p-6 transition hover:-translate-y-1 hover:bg-primary/10"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                    <span>{item.category}</span>
                    {item.segment ? <span>{item.segment}</span> : null}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground/90">
                    {item.title}
                  </h3>
                </div>
                <span className="text-sm font-semibold text-primary">
                  Discover now →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
