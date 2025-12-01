"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type NavSection,
  navSections,
  quickActions,
  supportLinks,
} from "@/data/site-content";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const BRAND_NAME = "CelcomDigi";

export function Navbar() {
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [mobileOpen]);

  const desktopNav = useMemo(() => navSections, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-primary"
          >
            {BRAND_NAME}
          </Link>
          <nav className="hidden items-center gap-2 lg:flex">
            {desktopNav.map((section) => (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => {
                  if (closeTimeout.current) clearTimeout(closeTimeout.current);
                  setActiveDesktopMenu(section.label);
                }}
                onMouseLeave={() => {
                  if (closeTimeout.current) clearTimeout(closeTimeout.current);
                  closeTimeout.current = setTimeout(
                    () =>
                      setActiveDesktopMenu((prev) =>
                        prev === section.label ? null : prev
                      ),
                    120
                  );
                }}
              >
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition",
                    activeDesktopMenu === section.label
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-primary/10 hover:text-primary"
                  )}
                  aria-expanded={activeDesktopMenu === section.label}
                  aria-haspopup="true"
                  onFocus={() => setActiveDesktopMenu(section.label)}
                  onClick={() =>
                    setActiveDesktopMenu((prev) =>
                      prev === section.label ? null : section.label
                    )
                  }
                >
                  {section.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeDesktopMenu === section.label && "rotate-180"
                    )}
                  />
                </button>
                <MegaMenu
                  open={activeDesktopMenu === section.label}
                  onClose={() => setActiveDesktopMenu(null)}
                  title={section.tagline ?? section.label}
                  columns={section.columns}
                />
              </div>
            ))}
            {supportLinks.slice(0, 2).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="https://shop.celcomdigi.com/home"
            className="hidden items-center gap-1 rounded-full border border-primary/40 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white lg:flex"
          >
            Shop
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="hidden items-center gap-1 rounded-full border border-border/80 px-3 py-2 text-sm text-foreground/80 transition hover:bg-muted lg:flex"
          >
            <Globe className="h-4 w-4" /> EN
            <ChevronDown className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-foreground/80 transition hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  columns: NavSection["columns"];
};

function MegaMenu({ open, onClose, columns, title }: MegaMenuProps) {
  if (!open) return null;
  return (
    <div
      className="absolute left-1/2 top-full z-40 mt-2 w-[720px] -translate-x-1/2 rounded-3xl border border-border/70 bg-white p-6 shadow-xl"
      onMouseLeave={onClose}
      onKeyUp={(event) => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">
          {title}
        </p>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          DISCOVER
        </span>
      </div>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
        {columns.map((column) => (
          <div key={column.title} className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {column.title}
            </p>
            <ul className="space-y-1.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                  >
                    <span className="flex-1 text-left">
                      {link.label}
                      {link.description ? (
                        <span className="block text-xs font-normal text-muted-foreground">
                          {link.description}
                        </span>
                      ) : null}
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setExpanded(null);
    }
  }, [open]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border/60 bg-white px-4 py-6 transition-transform duration-300 lg:hidden",
        open ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="space-y-6">
        {navSections.map((section) => (
          <div key={section.label} className="border-b border-border/60 pb-4">
            <button
              type="button"
              className="flex w-full items-center justify-between text-left text-base font-semibold text-foreground"
              onClick={() =>
                setExpanded((prev) =>
                  prev === section.label ? null : section.label
                )
              }
            >
              {section.label}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  expanded === section.label && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all",
                expanded === section.label
                  ? "mt-3 grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              )}
            >
              <div className="space-y-4 overflow-hidden">
                {section.columns.map((column) => (
                  <div key={column.title}>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {column.title}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="block rounded-lg bg-muted/40 px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-primary/10 hover:text-primary"
                            onClick={onClose}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="space-y-2">
          {supportLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center justify-between rounded-full border border-border/80 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-primary/5"
              onClick={onClose}
            >
              {link.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </div>

        <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/40 p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Quick actions
          </p>
          <ul className="space-y-2">
            {quickActions.map((action) => (
              <li key={action.label}>
                <Link
                  href={action.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-primary/10 hover:text-primary"
                >
                  <span>
                    {action.label}
                    {action.description ? (
                      <span className="block text-xs font-normal text-muted-foreground">
                        {action.description}
                      </span>
                    ) : null}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
