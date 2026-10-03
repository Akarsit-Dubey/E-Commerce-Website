"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { FadeIn } from "@/components/motion/MotionConfig";

const CATEGORY_DISCIPLINES: Record<string, { code: string; label: string; actionText: string }> = {
  clothing: { code: "01", label: "Ready-to-Wear", actionText: "Explore Outerwear & Knitwear" },
  shoes: { code: "02", label: "Footwear", actionText: "Explore Leather Shoes" },
  bags: { code: "03", label: "Carry Goods", actionText: "Explore Bags & Totes" },
  accessories: { code: "04", label: "Utilitarian Objects", actionText: "Explore Objects" },
  essentials: { code: "05", label: "Daily Essentials", actionText: "Explore Essentials" },
};

export function CategoryGrid() {
  return (
    <section className="py-20 sm:py-28 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
              Architectural Disciplines
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mt-1.5">
              Shop By Category
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-2 font-light max-w-lg">
              Each discipline is shaped around radical reduction, natural material integrity, and lifelong utility.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 transition-colors group shrink-0"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </FadeIn>

      {/* 12-Column Responsive Bento Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
        {CATEGORIES.map((cat, index) => {
          const discipline = CATEGORY_DISCIPLINES[cat.id] || {
            code: `0${index + 1}`,
            label: "Collection",
            actionText: "Explore",
          };

          // Deterministic architectural spans & heights
          // Row 1: Clothing (7 cols) + Footwear (5 cols) -> Exact matched height
          // Row 2: Bags (4 cols) + Accessories (4 cols) + Essentials (4 cols) -> Exact matched height
          let spanClasses = "";
          let heightClasses = "";

          if (index === 0) {
            // Primary Hero Anchor: Clothing
            spanClasses = "sm:col-span-2 lg:col-span-7";
            heightClasses = "h-[420px] sm:h-[480px] lg:h-[500px] xl:h-[540px]";
          } else if (index === 1) {
            // Secondary Anchor: Footwear
            spanClasses = "sm:col-span-2 lg:col-span-5";
            heightClasses = "h-[380px] sm:h-[480px] lg:h-[500px] xl:h-[540px]";
          } else if (index === 2) {
            // Trio: Bags
            spanClasses = "sm:col-span-1 lg:col-span-4";
            heightClasses = "h-[360px] sm:h-[400px] lg:h-[430px] xl:h-[460px]";
          } else if (index === 3) {
            // Trio: Accessories
            spanClasses = "sm:col-span-1 lg:col-span-4";
            heightClasses = "h-[360px] sm:h-[400px] lg:h-[430px] xl:h-[460px]";
          } else {
            // Trio: Daily Essentials
            spanClasses = "sm:col-span-2 lg:col-span-4";
            heightClasses = "h-[360px] sm:h-[400px] lg:h-[430px] xl:h-[460px]";
          }

          return (
            <FadeIn
              key={cat.id}
              delay={index * 0.06}
              className={`${spanClasses} ${heightClasses} w-full`}
            >
              <Link
                href={`/shop?category=${cat.id}`}
                className="group relative w-full h-full block overflow-hidden rounded-xs bg-[var(--surface)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--foreground)]/40 hover:shadow-lg"
              >
                {/* Background Image with refined zoom */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 1024px) 100vw, 60vw"
                      : index === 1
                      ? "(max-width: 1024px) 100vw, 40vw"
                      : "(max-width: 1024px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] brightness-[0.88] group-hover:brightness-[0.78]"
                  priority={index === 0}
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/50 transition-colors" />

                {/* Content Container */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white z-10">
                  {/* Top Bar: Code, Label, Item Count Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/90">
                      <span className="text-[var(--accent)] font-bold">{discipline.code}</span>
                      <span>·</span>
                      <span>{discipline.label}</span>
                    </span>

                    <span className="text-[11px] font-medium tracking-wide text-white/75 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 hidden sm:inline-block">
                      {cat.itemCount} Designs
                    </span>
                  </div>

                  {/* Bottom Content: Title, Tagline, & Interactive Affordance */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
                          {cat.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mt-1.5 font-light max-w-md leading-relaxed">
                          {cat.tagline}
                        </p>
                      </div>

                      {/* Circular Action Button */}
                      <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-black group-hover:scale-105 transition-all duration-300 shadow-md">
                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Action Text for Hero Card */}
                    {index === 0 && (
                      <div className="pt-2 hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--accent)] font-semibold group-hover:translate-x-1 transition-transform">
                        <span>{discipline.actionText}</span>
                        <span>→</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
