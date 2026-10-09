"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionConfig";
import { cn } from "@/lib/utils";

export function BestSellersSection() {
  const [activeTab, setActiveTab] = useState<"bestsellers" | "newArrivals">("bestsellers");
  const shouldReduceMotion = useReducedMotion();

  const bestSellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.newArrival).slice(0, 8);

  const displayedProducts = activeTab === "bestsellers" ? bestSellers : newArrivals;

  return (
    <section className="py-24 bg-[var(--surface)]/30 border-y border-[var(--border)]">
      <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
                Permanent Archives & Seasonal Drops
              </span>
              <div className="flex items-center gap-6 mt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("bestsellers")}
                  className={cn(
                    "text-2xl sm:text-4xl font-extrabold tracking-tight transition-all text-left relative py-1 cursor-pointer",
                    activeTab === "bestsellers"
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)]/50 hover:text-[var(--foreground)]"
                  )}
                >
                  Curated Best Sellers
                  {activeTab === "bestsellers" && (
                    <motion.span
                      layoutId="activeBestTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                      transition={{ type: shouldReduceMotion ? "tween" : "spring", damping: 30, stiffness: 350 }}
                    />
                  )}
                </button>

                <span className="text-xl text-[var(--border)] select-none">/</span>

                <button
                  type="button"
                  onClick={() => setActiveTab("newArrivals")}
                  className={cn(
                    "text-2xl sm:text-4xl font-extrabold tracking-tight transition-all text-left relative py-1 cursor-pointer",
                    activeTab === "newArrivals"
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)]/50 hover:text-[var(--foreground)]"
                  )}
                >
                  New Arrivals
                  {activeTab === "newArrivals" && (
                    <motion.span
                      layoutId="activeBestTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)]"
                      transition={{ type: shouldReduceMotion ? "tween" : "spring", damping: 30, stiffness: 350 }}
                    />
                  )}
                </button>
              </div>
            </div>

            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group"
            >
              <span>Shop All Designs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        {/* Tab Content with Animated Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <ProductGrid products={displayedProducts} columns={4} />
          </motion.div>
        </AnimatePresence>

        {/* Mobile bottom button */}
        <div className="mt-12 text-center sm:hidden">
          <Button href="/shop" variant="outline" className="w-full">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
