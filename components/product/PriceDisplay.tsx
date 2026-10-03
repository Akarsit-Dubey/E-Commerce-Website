import React from "react";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  salePrice?: number;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function PriceDisplay({
  price,
  salePrice,
  showBadge = true,
  size = "md",
  className,
}: PriceDisplayProps) {
  const isSale = salePrice !== undefined && salePrice < price;
  const discount = isSale ? calculateDiscount(price, salePrice) : 0;

  const sizeStyles = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base sm:text-lg",
    xl: "text-xl sm:text-2xl",
  };

  return (
    <div className={cn("flex items-baseline flex-wrap gap-2 tabular-nums", className)}>
      <span className={cn("font-semibold text-[var(--foreground)]", sizeStyles[size])}>
        {formatPrice(isSale ? salePrice : price)}
      </span>

      {isSale && (
        <>
          <span className={cn("text-[var(--muted-foreground)] line-through", size === "xl" ? "text-base sm:text-lg" : "text-xs")}>
            {formatPrice(price)}
          </span>
          {showBadge && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
              Save {discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
}
