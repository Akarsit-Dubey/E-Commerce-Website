"use client";

import React from "react";
import { FilterState, ProductCategory } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/categories";

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  className?: string;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "40", "41", "42", "43", "44", "One Size"];

const AVAILABLE_COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#FAF8F5" },
  { name: "Grey", hex: "#4A4D53" },
  { name: "Camel", hex: "#C2A37E" },
  { name: "Terracotta", hex: "#AF6249" },
  { name: "Olive", hex: "#4C5245" },
  { name: "Blue", hex: "#1C2433" },
];

export function ProductFilters({
  filters,
  onFilterChange,
  onClearFilters,
  className,
}: ProductFiltersProps) {
  const handleCategoryClick = (cat: ProductCategory | "all") => {
    onFilterChange({ ...filters, category: cat });
  };

  const handleSizeToggle = (size: string) => {
    const updated = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  const handleColorToggle = (colorName: string) => {
    const updated = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  const handleStockToggle = () => {
    onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly });
  };

  const handlePriceChange = (maxPrice: number) => {
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], maxPrice] });
  };

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.inStockOnly ||
    filters.priceRange[1] < 600;

  return (
    <div className={cn("space-y-6 text-xs", className)}>
      {/* Header with Clear Button */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
        <span className="font-semibold uppercase tracking-wider text-[var(--foreground)]">
          Filters
        </span>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-[var(--accent)] hover:underline font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h4 className="font-semibold uppercase tracking-wider text-[var(--muted-foreground)] text-[11px]">
          Collection
        </h4>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => handleCategoryClick("all")}
            className={cn(
              "text-left py-1 transition-colors hover:text-[var(--foreground)]",
              filters.category === "all"
                ? "font-semibold text-[var(--foreground)]"
                : "text-[var(--muted-foreground)]"
            )}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={cn(
                "text-left py-1 transition-colors hover:text-[var(--foreground)] flex justify-between",
                filters.category === cat.id
                  ? "font-semibold text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)]"
              )}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-[var(--muted-foreground)]">
                ({cat.itemCount})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-3 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold uppercase tracking-wider text-[var(--muted-foreground)] text-[11px]">
            Max Price
          </h4>
          <span className="font-semibold tabular-nums text-[var(--foreground)]">
            ${filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="40"
          max="600"
          step="10"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-[var(--foreground)] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[var(--muted-foreground)]">
          <span>$40</span>
          <span>$600+</span>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2 pt-4 border-t border-[var(--border)]">
        <h4 className="font-semibold uppercase tracking-wider text-[var(--muted-foreground)] text-[11px]">
          Sizes
        </h4>
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={cn(
                  "h-8 border text-[11px] font-medium rounded-xs transition-all",
                  isSelected
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                    : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)]"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2 pt-4 border-t border-[var(--border)]">
        <h4 className="font-semibold uppercase tracking-wider text-[var(--muted-foreground)] text-[11px]">
          Color Palette
        </h4>
        <div className="flex flex-wrap gap-2 pt-1">
          {AVAILABLE_COLORS.map((color) => {
            const isSelected = filters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => handleColorToggle(color.name)}
                title={color.name}
                className={cn(
                  "w-6 h-6 rounded-full border border-black/10 dark:border-white/10 transition-transform relative flex items-center justify-center",
                  isSelected && "ring-2 ring-[var(--accent)] ring-offset-2 scale-110"
                )}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Stock Availability */}
      <div className="pt-4 border-t border-[var(--border)]">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={handleStockToggle}
            className="w-4 h-4 rounded-xs border-[var(--border)] accent-[var(--accent)]"
          />
          <span className="text-[var(--foreground)] font-medium">In stock only</span>
        </label>
      </div>

      {hasActiveFilters && (
        <Button
          onClick={onClearFilters}
          variant="outline"
          size="sm"
          className="w-full mt-4"
        >
          Reset All Filters
        </Button>
      )}
    </div>
  );
}
