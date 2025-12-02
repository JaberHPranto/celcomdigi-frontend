import Link from "next/link";

import { otherServices } from "@/data/site-content";

export function ServicesGrid() {
  return (
    <section
      id="more-services"
      className="border-b border-border/80 bg-background section-padding"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
            Others
          </p>
          <h2 className="text-3xl font-bold text-foreground">
            More ways to stay connected
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((service) => (
            <Link
              key={service.label}
              href={service.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-linear-to-br from-white via-white/80 to-primary/8 p-6 shadow-[0_20px_44px_-28px_rgba(25,70,160,0.4)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-primary/50 hover:shadow-[0_32px_64px_-30px_rgba(25,70,160,0.6)]"
            >
              <span className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/12 via-transparent to-secondary/16 opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {service.label}
                </h3>
              </div>
              <div className="relative z-10 mt-6 flex items-center justify-between text-sm font-semibold text-primary">
                <span>Learn more</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
