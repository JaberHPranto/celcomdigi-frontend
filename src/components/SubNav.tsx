"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SubNavProps {
  links: { label: string; href: string }[];
}

export function SubNav({ links }: SubNavProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-[65px] z-40 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap border-b-4 py-4 text-sm font-semibold transition-colors",
                  isActive
                    ? "border-[#0095DA] text-[#0095DA]"
                    : "border-transparent text-gray-600 hover:text-[#0095DA]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
