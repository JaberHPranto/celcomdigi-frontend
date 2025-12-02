"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

import type { ProductCard } from "@/data/site-content";

type ProductCarouselProps = {
  id: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
  products: ProductCard[];
};

export function ProductCarousel({
  id,
  title,
  ctaHref,
  ctaLabel,
  products,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => products, [products]);

  function handleScroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const offset = direction === "left" ? -clientWidth : clientWidth;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  }

  return (
    <section
      id={id}
      className="border-b border-border/80 bg-background section-padding"
      aria-label={title}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            <p className="text-base text-muted-foreground">
              Scroll to explore exclusive device bundles tailored for you.
            </p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-transparent px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            {ctaLabel}
          </Link>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -left-4 top-1/2 hidden -translate-y-1/2 lg:block z-10">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-white shadow-md transition hover:scale-105 "
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
          </div>
          <div className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 lg:block z-10">
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
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto py-4"
          >
            {items.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group relative flex min-w-[288px] flex-col overflow-hidden rounded-3xl border border-white/60 bg-linear-to-br from-white via-white/75 to-primary/10 p-7 shadow-[0_24px_48px_-28px_rgba(25,70,160,0.45)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-primary/50 hover:shadow-[0_36px_70px_-30px_rgba(25,70,160,0.6)]"
              >
                <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-secondary/20 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col gap-4">
                  {product.badge ? (
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      {product.badge}
                    </span>
                  ) : null}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.priceLabel}
                    </p>
                  </div>
                </div>
                {product.termLabels && product.termLabels.length ? (
                  <div className="relative z-10 mt-5 rounded-2xl border border-primary/15 bg-white/70 p-4 shadow-inner backdrop-blur">
                    <ul className="flex flex-wrap gap-2">
                      {product.termLabels.map((label) => (
                        <li
                          key={label}
                          className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary/80"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary/70" />
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className="relative z-10 mt-6 flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary">
                    View details
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
