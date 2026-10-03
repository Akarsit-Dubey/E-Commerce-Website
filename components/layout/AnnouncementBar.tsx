"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ANNOUNCEMENTS = [
  "Complimentary global shipping on all orders over $150",
  "Enjoy 10% off your first order with code NOVA10",
  "Curated autumn essentials crafted from Grade-A Mongolian cashmere",
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="relative z-40 bg-[var(--surface)] text-[var(--foreground)] border-b border-[var(--border)] text-[11px] font-medium tracking-widest uppercase py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length
            )
          }
          aria-label="Previous announcement"
          className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-0.5"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center truncate px-2">
          <span className="inline-block transition-all duration-300">
            {ANNOUNCEMENTS[currentIndex]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
            }
            aria-label="Next announcement"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-0.5"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement bar"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-0.5 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
