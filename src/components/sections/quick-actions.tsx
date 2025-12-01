import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { quickActions } from "@/data/site-content";

export function QuickActions() {
  return (
    <section
      id="quick-actions"
      className="border-b border-border/80 bg-white py-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Quick actions
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="group relative flex h-full flex-col justify-between gap-2 rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm transition hover:border-primary/50 hover:bg-primary/10"
            >
              {action.badge ? (
                <span className="w-fit inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                  {action.badge}
                </span>
              ) : null}
              <div className="space-y-2">
                <p className="text-base font-semibold text-foreground">
                  {action.label}
                </p>
                {action.description ? (
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                ) : null}
              </div>
              <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
