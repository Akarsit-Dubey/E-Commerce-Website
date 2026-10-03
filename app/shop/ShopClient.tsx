"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { FilterState, ProductCategory, SortOption } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductSort } from "@/components/product/ProductSort";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FadeIn } from "@/components/motion/MotionConfig";
import { SlidersHorizontal, LayoutGrid, List, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 8;

export function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as ProductCategory | null;
  const shouldReduceMotion = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory || "all",
    priceRange: [0, 600],
    sizes: [],
    colors: [],
    inStockOnly: false,
  });

  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Sync with URL params if category changes
  useEffect(() => {
    const cat = searchParams.get("category") as ProductCategory | null;
    if (cat) {
      setFilters((prev) => ({ ...prev, category: cat }));
    }
  }, [searchParams]);

  // Reset pagination when filters or sort change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filters, sortOption, searchQuery]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      // Price
      const effectivePrice = product.salePrice ?? product.price;
      if (effectivePrice > filters.priceRange[1]) {
        return false;
      }

      // Sizes
      if (
        filters.sizes.length > 0 &&
        !filters.sizes.some((size) => product.sizes.includes(size))
      ) {
        return false;
      }

      // Colors
      if (
        filters.colors.length > 0 &&
        !filters.colors.some((colorName) =>
          product.colors.some((c) => c.name.toLowerCase().includes(colorName.toLowerCase()))
        )
      ) {
        return false;
      }

      // Stock
      if (filters.inStockOnly && product.inventory <= 0) {
        return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case "newest":
        return list.filter((p) => p.newArrival).concat(list.filter((p) => !p.newArrival));
      case "price-asc":
        return list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      case "price-desc":
        return list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "featured":
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortOption]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  const handleClearAllFilters = () => {
    setFilters({
      category: "all",
      priceRange: [0, 600],
      sizes: [],
      colors: [],
      inStockOnly: false,
    });
    setSearchQuery("");
  };

  const removeSizeFilter = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const removeColorFilter = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
  };

  return (
    <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          ...(filters.category !== "all"
            ? [{ label: filters.category.toUpperCase() }]
            : []),
        ]}
        className="mb-6"
      />

      {/* Header & Page Title */}
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[var(--border)]">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
              Permanent & Seasonal Editions
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] capitalize mt-1">
              {filters.category === "all" ? "All Collections" : `${filters.category}`}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1.5 max-w-xl font-light leading-relaxed">
              Thoughtfully engineered essentials constructed with pure wool, organic cotton, Portuguese leather, and Grade-5 titanium.
            </p>
          </div>

          {/* Quick Search inside Shop */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in collections..."
              aria-label="Filter products by keyword"
              className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] rounded-xs py-2 pl-9 pr-8 text-xs focus:outline-none focus:border-[var(--foreground)]"
            />
            <Search className="w-4 h-4 text-[var(--muted-foreground)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Visual Discipline Quick Selector */}
        <div className="py-4 border-b border-[var(--border)] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: "all" }));
                router.replace("/shop");
              }}
              className={cn(
                "flex items-center gap-2 px-3.5 py-1.5 rounded-xs border text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer",
                filters.category === "all"
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-xs"
                  : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/40"
              )}
            >
              <span>All Disciplines</span>
              <span className="text-[10px] opacity-75 font-mono">({PRODUCTS.length})</span>
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = filters.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: cat.id }));
                    router.replace(`/shop?category=${cat.id}`);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-1.5 rounded-xs border text-xs font-medium transition-all cursor-pointer",
                    isSelected
                      ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-xs font-semibold"
                      : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/40"
                  )}
                >
                  <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 border border-black/10 dark:border-white/10">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="16px"
                      className="object-cover"
                    />
                  </div>
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({cat.itemCount})</span>
                </button>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Control Bar: Product Count, Mobile Filter Trigger, Sort, View Toggle */}
      <div className="flex items-center justify-between py-5 border-b border-[var(--border)] gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 text-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </Button>

          <span className="text-xs text-[var(--muted-foreground)]">
            Showing <strong className="text-[var(--foreground)] font-semibold">{sortedProducts.length}</strong> {sortedProducts.length === 1 ? "design" : "designs"}
          </span>
        </div>

        {/* Active Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <AnimatePresence>
            {filters.sizes.map((size) => (
              <motion.span
                key={size}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--surface)] text-[var(--foreground)] text-[11px] font-medium border border-[var(--border)]"
              >
                Size: {size}
                <button
                  onClick={() => removeSizeFilter(size)}
                  className="hover:text-rose-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
            {filters.colors.map((color) => (
              <motion.span
                key={color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--surface)] text-[var(--foreground)] text-[11px] font-medium border border-[var(--border)]"
              >
                Color: {color}
                <button
                  onClick={() => removeColorFilter(color)}
                  className="hover:text-rose-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Sort Selector */}
          <ProductSort
            currentSort={sortOption}
            onSortChange={(sort) => setSortOption(sort)}
          />

          {/* Grid vs List Mode Toggle */}
          <div className="hidden sm:flex items-center border border-[var(--border)] rounded-xs bg-[var(--surface)] p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid layout"
              className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[var(--background)] text-[var(--foreground)] shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List layout"
              className={`p-1.5 rounded-xs transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-[var(--background)] text-[var(--foreground)] shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1">
          <ProductFilters
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearAllFilters}
          />
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filters.category}-${sortOption}-${viewMode}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <ProductGrid
                products={displayedProducts}
                viewMode={viewMode}
                columns={3}
                onResetFilters={handleClearAllFilters}
              />
            </motion.div>
          </AnimatePresence>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-16 text-center">
              <Button
                variant="outline"
                size="md"
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="px-8"
              >
                Load More Designs ({sortedProducts.length - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter & Refine"
        side="left"
        footer={
          <Button
            className="w-full"
            onClick={() => setMobileFilterOpen(false)}
          >
            Show {sortedProducts.length} Results
          </Button>
        }
      >
        <ProductFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearAllFilters}
        />
      </Drawer>
    </div>
  );
}
