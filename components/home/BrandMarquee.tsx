"use client";

import React from "react";

const MARQUEE_ITEMS = [
  "PERMANENT ARCHITECTURAL SILHOUETTES",
  "DOUBLE-FACED VIRGIN WOOL",
  "GRADE-A MONGOLIAN CASHMERE",
  "VEGETABLE-TANNED TUSCAN LEATHER",
  "HANDCRAFTED IN PORTO & BIELLA",
  "LIFETIME REPAIR GUARANTEE",
];

export function BrandMarquee() {
  return (
    <div
      className="py-4 border-b border-[var(--border)] bg-[var(--surface)]/60 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="hover:text-[var(--foreground)] transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
