"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { helpResourcesTabs } from "@/data/site-content";

export function HelpResources() {
  const tabs = useMemo(() => helpResourcesTabs, []);
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const activeContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section id="help" className="border-b border-border/80 bg-white py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Help & resources
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            Take control with the right tools
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your account, stay safe online, and keep an eye on network
            updates — all in one place.
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div
            className="flex flex-1 flex-col gap-2 rounded-3xl border border-border/70 bg-muted/30 p-2"
            role="tablist"
            aria-orientation="vertical"
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-left"
                  onClick={() => setActiveTab(tab.id)}
                  aria-selected={isActive}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-controls={`tabpanel-${tab.id}`}
                >
                  <span
                    className={
                      isActive
                        ? "text-sm font-semibold text-primary"
                        : "text-sm font-medium text-muted-foreground"
                    }
                  >
                    {tab.label}
                  </span>
                  <span
                    className={
                      isActive
                        ? "text-xs font-semibold uppercase tracking-widest text-primary"
                        : "text-xs font-semibold uppercase tracking-widest text-muted-foreground/60"
                    }
                  >
                    {isActive ? "Selected" : "Tap"}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            aria-labelledby={`tab-${activeContent.id}`}
            id={`tabpanel-${activeContent.id}`}
            className="flex-1 space-y-4 rounded-3xl border border-border/70 bg-background p-6 shadow-sm"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">
              {activeContent.label}
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {activeContent.title}
            </h3>
            <p className="text-base text-muted-foreground">
              {activeContent.description}
            </p>
            <Link
              href={activeContent.link.href}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02]"
            >
              {activeContent.link.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
