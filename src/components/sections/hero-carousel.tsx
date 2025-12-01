"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { heroSlides } from "@/data/site-content";

const AUTO_ADVANCE_MS = 6000;

export function HeroCarousel() {
  const slides = useMemo(() => heroSlides, []);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  function goTo(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border/80 bg-linear-to-br from-primary/10 via-background to-secondary/10 py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
            Malaysia's widest and fastest network
          </span>
          <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Everything you love from Celcom and Digi, now better together
          </h1>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white/90 shadow-lg">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <article
                  key={slide.title}
                  className="flex min-w-full flex-col gap-6 p-6 sm:flex-row sm:p-10"
                >
                  <div className="flex-1 space-y-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                      Featured
                    </p>
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                      {slide.title}
                    </h2>
                    <p className="max-w-xl text-base text-muted-foreground">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.cta.href}
                      className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:scale-[1.02]"
                    >
                      {slide.cta.label}
                    </Link>
                  </div>
                  <div className="relative flex-1">
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-muted sm:h-full">
                      {slide.image ? (
                        <Image
                          src={slide.image}
                          alt={slide.imageAlt}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                          {slide.imageAlt}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 rounded-full bg-white/90 shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex"
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
            >
              <ChevronLeft
                className="mx-auto h-5 w-5 text-primary mt-3"
                strokeWidth={3}
              />
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 rounded-full bg-white/90 shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex oc"
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
            >
              <ChevronRight
                className="mx-auto h-5 w-5 text-primary mt-3"
                strokeWidth={3}
              />
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className="h-3 w-10 rounded-full bg-muted transition hover:scale-105"
                  aria-label={`Show slide ${index + 1}`}
                  aria-pressed={active === index}
                  style={{
                    backgroundColor:
                      active === index ? "var(--primary)" : undefined,
                    opacity: active === index ? 1 : 0.4,
                  }}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Slide {active + 1} of {slides.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
