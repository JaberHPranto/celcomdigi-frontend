import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeftRight,
  ArrowUpRight,
  BadgeCheck,
  CreditCard,
  RefreshCcw,
  Smartphone,
} from "lucide-react";

import { quickActions } from "@/data/site-content";

const actionIcons: Record<string, LucideIcon> = {
  "CelcomDigi app": Smartphone,
  "Pay bill": CreditCard,
  "Reload Prepaid": RefreshCcw,
  "Get eSIM": BadgeCheck,
  "Switch to CelcomDigi": ArrowLeftRight,
};

export function QuickActions() {
  return (
    <section
      id="quick-actions"
      className="section-transition relative bg-linear-to-br from-white/95 via-secondary/15 to-primary/10 py-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-linear-to-b from-primary/10 via-primary/40 to-transparent" />
      </div>
      <div className="relative flex w-full flex-col gap-6 px-4 sm:px-6 lg:px-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="group relative flex h-full flex-col justify-between gap-3 rounded-2xl border border-border/70 bg-white/70 p-5 text-sm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/15"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                    {(() => {
                      const Icon = actionIcons[action.label] ?? ArrowUpRight;
                      return <Icon className="h-5 w-5" aria-hidden />;
                    })()}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                </div>
                {action.badge ? (
                  <span className="inline-flex w-fit items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-secondary-foreground shadow-sm">
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
