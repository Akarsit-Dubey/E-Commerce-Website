import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/Button";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
  columns?: 2 | 3 | 4;
  onResetFilters?: () => void;
  className?: string;
}

export function ProductGrid({
  products,
  viewMode = "grid",
  columns = 4,
  onResetFilters,
  className,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-14 h-14 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto text-[var(--muted-foreground)]">
          <SearchX className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[var(--foreground)]">
            No matching products found
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-relaxed">
            Try adjusting your search criteria, widening your price range, or clearing current filters.
          </p>
        </div>
        {onResetFilters && (
          <Button onClick={onResetFilters} variant="outline" size="sm">
            Clear all filters
          </Button>
        )}
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode="list"
          />
        ))}
      </div>
    );
  }

  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10",
        columnClasses[columns],
        className
      )}
    >
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={idx < 4}
        />
      ))}
    </div>
  );
}
