import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

import { footerColumns, footerPrivacyLinks } from "@/data/site-content";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://web.facebook.com/CelcomDigi",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/celcomdigi/",
    label: "Instagram",
  },
  { icon: Twitter, href: "https://twitter.com/CelcomDigi", label: "Twitter" },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@celcomdigimy",
    label: "YouTube",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/celcomdigi",
    label: "LinkedIn",
  },
];

export function SiteFooter() {
  return (
    <footer
      id="footer"
      className="bg-background py-16 text-sm text-muted-foreground"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              CelcomDigi
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Malaysia's widest and fastest network, keeping you connected with
              everything you love.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 transition hover:border-primary/60 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {footerColumns.map((column, index) => (
              <div key={index} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                  {column.title}
                </p>
                <ul className="space-y-2 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-foreground/80 transition hover:text-primary"
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
        <div className="space-y-4 border-t border-border/70 pt-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <span>Privacy Notice:</span>
            {footerPrivacyLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-3">
                <Link
                  href={link.href}
                  className="text-primary transition hover:underline"
                >
                  {link.label}
                </Link>
                {index < footerPrivacyLinks.length - 1 ? <span>|</span> : null}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            © Copyright 2025 CelcomDigi Berhad [Registration No. 199701009694
            (425190-X)]. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
