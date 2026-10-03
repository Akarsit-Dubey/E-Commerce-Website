"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function BestSellersSection() {
  const [activeTab, setActiveTab] = useState<"bestsellers" | "newArrivals">("bestsellers");

  const bestSellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.newArrival).slice(0, 8);

  const displayedProducts = activeTab === "bestsellers" ? bestSellers : newArrivals;

  return (
    <section className="py-20 bg-[var(--surface)]/30 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
              Curated Selection
            </span>
            <div className="flex items-center gap-6 mt-2">
              <button
                type="button"
                onClick={() => setActiveTab("bestsellers")}
                className={cn(
                  "text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors text-left",
                  activeTab === "bestsellers"
                    ? "text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-8"
                    : "text-[var(--muted-foreground)]/60 hover:text-[var(--foreground)]"
                )}
              >
                Best Sellers
              </button>

              <span className="text-xl text-[var(--border)] select-none">/</span>

              <button
                type="button"
                onClick={() => setActiveTab("newArrivals")}
                className={cn(
                  "text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors text-left",
                  activeTab === "newArrivals"
                    ? "text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-8"
                    : "text-[var(--muted-foreground)]/60 hover:text-[var(--foreground)]"
                )}
              >
                New Arrivals
              </button>
            </div>
          </div>

          <Link href="/shop" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
            <span>Shop The Full Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={displayedProducts} columns={4} />

        {/* Mobile bottom button */}
        <div className="mt-12 text-center sm:hidden">
          <Link href="/shop" className="w-full inline-block">
            <Button variant="outline" className="w-full">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
