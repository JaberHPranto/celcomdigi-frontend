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
      className="relative overflow-hidden  bg-linear-to-br from-primary/10 via-background to-secondary/10 section-padding"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
            Malaysia's Widest and Fastest Network
          </span>
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Everything you love,
            <br />
            <span className="text-primary">now better together</span>
          </h1>
        </div>
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-lg backdrop-blur-sm">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {slides.map((slide) => (
                <article
                  key={slide.title}
                  className="flex min-w-full flex-col-reverse gap-6 p-6 sm:flex-row sm:items-center sm:p-10"
                >
                  <div className="flex-1 space-y-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
                      Featured
                    </p>
                    <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="max-w-xl text-base text-muted-foreground">
                      {slide.description}
                    </p>
                    <Link
                      href={slide.cta.href}
                      className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:scale-[1.02]"
                    >
                      {slide.cta.label}
                    </Link>
                  </div>
                  <div className="relative aspect-video flex-1 sm:aspect-square">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted">
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
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => goTo(active - 1)}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-primary" strokeWidth={3} />
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => goTo(active + 1)}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-primary" strokeWidth={3} />
            </button>
          </div>
          <div className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2">
            <div className="flex items-center justify-center gap-2 rounded-full bg-card/80 px-3 py-2 shadow-lg backdrop-blur-sm">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`h-2 w-2 rounded-full transition-colors ${
                    active === index ? "bg-primary" : "bg-muted-foreground/50"
                  }`}
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
