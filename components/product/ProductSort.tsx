"use client";

import React from "react";
import { SortOption } from "@/types/product";
import { ChevronDown } from "lucide-react";

interface ProductSortProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export function ProductSort({ currentSort, onSortChange }: ProductSortProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        aria-label="Sort products by"
        className="appearance-none bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] rounded-xs py-2 pl-3.5 pr-8 text-xs font-medium focus:outline-none focus:border-[var(--foreground)] cursor-pointer"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            Sort: {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-[var(--muted-foreground)] absolute right-2.5 pointer-events-none" />
    </div>
  );
}
