"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      className="border-b border-border/80 bg-white py-12"
      aria-label={title}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">
              Scroll to explore exclusive device bundles tailored for you.
            </p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full border border-primary/50 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            {ctaLabel}
          </Link>
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
            className="grid snap-x snap-mandatory auto-cols-[minmax(240px,1fr)] grid-flow-col gap-4 overflow-x-auto rounded-3xl border border-border/70 bg-muted/30 p-4"
          >
            {items.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group flex h-full flex-col justify-between gap-4 rounded-2xl bg-white p-5 text-sm shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="space-y-2">
                  {product.badge ? (
                    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                      {product.badge}
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.priceLabel}
                  </p>
                </div>
                {product.termLabels && product.termLabels.length ? (
                  <div className="rounded-2xl bg-muted/60 p-3 text-xs text-muted-foreground">
                    <div className="flex justify-between font-semibold uppercase tracking-wide text-muted-foreground">
                      {product.termLabels.map((term) => (
                        <span key={term}>{term}</span>
                      ))}
                    </div>
                    <div className="mt-2 grid gap-1">
                      {product.monthlyOffers.map((offer, index) => (
                        <span
                          key={`${product.name}-offer-${offer}-${index}`}
                          className="text-sm font-semibold text-primary"
                        >
                          {offer}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-primary/40 p-3 text-sm text-primary">
                    Eligible for exclusive savings when you pair with CelcomDigi
                    Postpaid.
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
