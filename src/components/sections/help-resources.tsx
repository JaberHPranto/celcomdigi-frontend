"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

import { helpResourcesTabs } from "@/data/site-content";

const AUTO_ADVANCE_MS = 7000;

export function HelpResources() {
  const tabs = useMemo(() => helpResourcesTabs, []);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);

  const isPaused = isHovered || isFocusWithin;

  const activeContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  useEffect(() => {
    if (tabs.length <= 1 || isPaused) return;
    if (typeof window === "undefined") return;

    const timer = window.setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex]?.id ?? tabs[0].id;
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [tabs, isPaused]);

  return (
    <section
      id="help"
      className="relative overflow-hidden border-b border-border/60 bg-linear-to-br from-background via-white to-primary/5 py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-1/2 bg-linear-to-r from-primary/5 via-transparent to-secondary/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4">
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
            Help & resources
          </p>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Take control with the right tools
          </h2>
          <p className="text-base text-muted-foreground">
            Manage your account, stay safe online, and keep an eye on network
            updates — all in one place.
          </p>
        </div>
        <div
          className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocusWithin(true)}
          onBlurCapture={() => setIsFocusWithin(false)}
        >
          <div
            className="flex w-full flex-col gap-3 rounded-3xl border border-white/60 bg-white/60 p-4 shadow-[0_24px_60px_-40px_rgba(25,70,160,0.65)] backdrop-blur-xl lg:w-[320px] lg:flex-none lg:self-stretch"
            role="tablist"
            aria-orientation="vertical"
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`group relative flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-primary/30 bg-white/95 shadow-[0_20px_45px_-35px_rgba(25,70,160,0.7)]"
                      : "border-transparent bg-transparent hover:border-primary/10 hover:bg-white/55 hover:shadow-[0_14px_30px_-24px_rgba(25,70,160,0.4)]"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  aria-selected={isActive}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-controls={`tabpanel-${tab.id}`}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        isActive ? "text-primary" : "text-foreground/80"
                      }`}
                    >
                      {tab.label}
                    </span>
                    <span className="text-xs text-muted-foreground/80">
                      {tab.title}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-[0.65rem] font-semibold uppercase tracking-[0.35em] ${
                        isActive ? "text-primary" : "text-muted-foreground/60"
                      }`}
                    >
                      {isActive ? "Selected" : "Tap"}
                    </span>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-white/60 text-primary/60 group-hover:bg-primary/10 group-hover:text-primary"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  <span
                    className={`pointer-events-none absolute inset-y-2 left-0 w-[3px] rounded-full transition ${
                      isActive
                        ? "bg-primary"
                        : "bg-transparent group-hover:bg-primary/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            aria-labelledby={`tab-${activeContent.id}`}
            id={`tabpanel-${activeContent.id}`}
            className="flex h-[450px] w-full flex-1 flex-col justify-between gap-5 rounded-4xl border border-white/70 bg-linear-to-br from-white via-white/85 to-primary/10 p-8 shadow-[0_30px_70px_-40px_rgba(25,70,160,0.65)] backdrop-blur-xl"
          >
            <div className="space-y-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
                {activeContent.label}
              </span>
              <h3 className="text-3xl font-semibold text-foreground">
                {activeContent.title}
              </h3>
              <p className="text-base text-muted-foreground">
                {activeContent.description}
              </p>
            </div>
            <Link
              href={activeContent.link.href}
              className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-300 hover:translate-x-1 hover:shadow-xl"
            >
              {activeContent.link.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
