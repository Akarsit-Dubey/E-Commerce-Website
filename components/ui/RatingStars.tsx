import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RatingStars({
  rating,
  reviewCount,
  showValue = false,
  size = "sm",
  className,
}: RatingStarsProps) {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
        {stars.map((starIndex) => {
          const isFilled = rating >= starIndex;
          const isHalf = !isFilled && rating >= starIndex - 0.5;

          return (
            <Star
              key={starIndex}
              className={cn(
                iconSizes[size],
                isFilled
                  ? "fill-amber-400 text-amber-400 dark:fill-amber-400 dark:text-amber-400"
                  : isHalf
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-[var(--border)] dark:text-neutral-700"
              )}
            />
          );
        })}
      </div>

      {showValue && (
        <span className="text-xs font-semibold tabular-nums text-[var(--foreground)]">
          {rating.toFixed(1)}
        </span>
      )}

      {typeof reviewCount === "number" && (
        <span className="text-xs text-[var(--muted-foreground)]">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
