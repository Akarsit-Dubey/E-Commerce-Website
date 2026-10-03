"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PromotionalBanner() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 rounded-xs overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
        {/* Left side: Image */}
        <div className="relative aspect-[4/3] lg:aspect-auto min-h-[360px]">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200"
            alt="Crafting Virgin Wool & Pure Cashmere at NOVA"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
        </div>

        {/* Right side: Editorial text */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
              Material Provenance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              Grade-A Mongolian Cashmere. Spun to outlast generations.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            By eliminating conventional middlemen and working directly with pastoral cooperatives in Inner Mongolia, we provide 100% pure two-ply cashmere with fibers measuring an unprecedented 38mm length. Softer on skin, pill-resistant, and inherently temperature-regulating.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link href="/shop?category=clothing">
              <Button size="md" className="w-full sm:w-auto">
                <span>Shop Knitwear</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>

            <Link href="/about">
              <Button variant="outline" size="md" className="w-full sm:w-auto">
                Read Sourcing Report
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
