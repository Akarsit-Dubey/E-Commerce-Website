import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "./ShopClient";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Shop All Collections",
  description:
    "Explore NOVA's complete catalog of architectural tailoring, cashmere knitwear, luxury leather footwear, and minimalist carry.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Skeleton className="h-96 hidden lg:block" />
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="aspect-[3/4]" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
