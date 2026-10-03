"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  min?: number;
  onChange: (quantity: number) => void;
  className?: string;
  size?: "sm" | "md";
}

export function QuantitySelector({
  quantity,
  max = 99,
  min = 1,
  onChange,
  className,
  size = "md",
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  const sizeClasses = {
    sm: "h-9 text-xs",
    md: "h-11 text-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border border-[var(--border)] bg-[var(--background)] rounded-xs",
        sizeClasses[size],
        className
      )}
    >
      <button
        type="button"
        disabled={quantity <= min}
        onClick={handleDecrement}
        aria-label="Decrease quantity"
        className="px-3 h-full flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] disabled:opacity-30 transition-colors"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="px-2 min-w-[32px] text-center font-semibold tabular-nums select-none text-[var(--foreground)]">
        {quantity}
      </span>

      <button
        type="button"
        disabled={quantity >= max}
        onClick={handleIncrement}
        aria-label="Increase quantity"
        className="px-3 h-full flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] disabled:opacity-30 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
