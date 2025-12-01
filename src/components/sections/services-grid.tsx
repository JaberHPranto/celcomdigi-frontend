import Link from "next/link";

import { otherServices } from "@/data/site-content";

export function ServicesGrid() {
  return (
    <section
      id="more-services"
      className="border-b border-border/80 bg-white py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
            Others
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            More ways to stay connected
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className="group flex h-full flex-col justify-between gap-4 rounded-2xl border border-border/70 bg-muted/30 p-6 transition hover:border-primary/50 hover:bg-primary/10"
            >
              <h3 className="text-lg font-semibold text-foreground/90">
                {service.label}
              </h3>
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
