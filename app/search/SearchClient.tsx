"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCategory, SortOption } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductSort } from "@/components/product/ProductSort";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { Search, X, Clock, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { cn } from "@/lib/utils";

const POPULAR_SUGGESTIONS = [
  "Cashmere",
  "Virgin Wool",
  "Overcoat",
  "Leather Sneaker",
  "Titanium Watch",
  "Tote Bag",
  "Organic Cotton",
  "Chelsea Boot",
];

export function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [sortOption, setSortOption] = useState<SortOption>("featured");

  const { recentSearches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  // If URL changes, sync query
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  // Execute search filter
  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase().trim();

    let results = PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(lowerQuery);
      const matchDesc = p.description.toLowerCase().includes(lowerQuery);
      const matchTag = p.tags.some((t) => t.toLowerCase().includes(lowerQuery));
      const matchCat = p.category.toLowerCase().includes(lowerQuery);
      const matchColor = p.colors.some((c) => c.name.toLowerCase().includes(lowerQuery));

      return matchName || matchDesc || matchTag || matchCat || matchColor;
    });

    if (selectedCategory !== "all") {
      results = results.filter((p) => p.category === selectedCategory);
    }

    switch (sortOption) {
      case "price-asc":
        return results.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      case "price-desc":
        return results.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      case "rating":
        return results.sort((a, b) => b.rating - a.rating);
      case "newest":
        return results.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      case "featured":
      default:
        return results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [query, selectedCategory, sortOption]);

  const handleSearchSubmit = (term: string) => {
    setQuery(term);
    addSearch(term);
    router.replace(`/search?q=${encodeURIComponent(term)}`);
  };

  const handleClear = () => {
    setQuery("");
    router.replace("/search");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      {/* Search Header and Input */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
          Catalog Search
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
          Search Collections
        </h1>

        {/* Input Bar */}
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length > 2) {
                addSearch(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                handleSearchSubmit(query);
              }
            }}
            placeholder="Search by garment, material, color, or category..."
            className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] rounded-xs py-4 pl-12 pr-12 text-sm sm:text-base focus:outline-none focus:border-[var(--foreground)] shadow-xs"
            autoFocus
          />
          <Search className="w-5 h-5 text-[var(--muted-foreground)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          {query && (
            <button
              onClick={handleClear}
              aria-label="Clear search input"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Suggestions */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap text-xs text-[var(--muted-foreground)]">
          <span className="inline-flex items-center gap-1 font-medium mr-1 text-[var(--foreground)]">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            Trending:
          </span>
          {POPULAR_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSearchSubmit(suggestion)}
              className="px-2.5 py-1 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] text-[11px] transition-colors border border-[var(--border)]"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !query && (
          <div className="pt-4 border-t border-[var(--border)] text-left">
            <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-2.5">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Recent Searches
              </span>
              <button
                onClick={clearSearches}
                className="hover:text-[var(--foreground)] underline"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[var(--surface)] text-xs text-[var(--foreground)] border border-[var(--border)]"
                >
                  <button
                    onClick={() => handleSearchSubmit(item)}
                    className="hover:text-[var(--accent)]"
                  >
                    {item}
                  </button>
                  <button
                    onClick={() => removeSearch(item)}
                    className="text-[var(--muted-foreground)] hover:text-rose-500"
                    aria-label={`Remove recent search ${item}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Results Area */}
      {query.trim() && (
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Showing <strong className="text-[var(--foreground)] font-semibold">{matchingProducts.length}</strong> {matchingProducts.length === 1 ? "result" : "results"} for{" "}
                <span className="text-[var(--foreground)] font-semibold">"{query}"</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Category Filter Pills */}
              <div className="hidden md:flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-xs border transition-colors",
                    selectedCategory === "all"
                      ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                      : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]"
                  )}
                >
                  All
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-2.5 py-1 text-xs rounded-xs border transition-colors",
                      selectedCategory === cat.id
                        ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                        : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <ProductSort
                currentSort={sortOption}
                onSortChange={setSortOption}
              />
            </div>
          </div>

          {/* Grid */}
          <ProductGrid
            products={matchingProducts}
            columns={4}
            onResetFilters={handleClear}
          />
        </div>
      )}
    </div>
  );
}
