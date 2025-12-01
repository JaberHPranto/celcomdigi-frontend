import Link from "next/link";

import { floatingBanner } from "@/data/site-content";

export function FloatingBanner() {
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-40 w-full max-w-2xl -translate-x-1/2 px-4">
      <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-full border border-primary/50 bg-white px-6 py-3 shadow-2xl">
        <p className="text-sm font-semibold text-foreground">
          {floatingBanner.title}
        </p>
        <Link
          href={floatingBanner.href}
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition hover:scale-105"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
