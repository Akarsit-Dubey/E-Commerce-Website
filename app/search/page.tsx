import React, { Suspense } from "react";
import type { Metadata } from "next";
import { SearchClient } from "./SearchClient";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Search Collections",
  description: "Search across NOVA's minimalist fashion and lifestyle collections.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <Skeleton className="h-10 w-48 mx-auto" />
          <Skeleton className="h-14 w-full" />
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
