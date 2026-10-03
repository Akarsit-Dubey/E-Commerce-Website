"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Bookmark, Plus, Minus } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
  onCloseDrawer?: () => void;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
  onCloseDrawer,
}: CartItemProps) {
  const currentPrice = item.product.salePrice ?? item.product.price;
  const originalPrice = item.product.salePrice ? item.product.price : null;

  return (
    <div className="flex gap-4 py-4 border-b border-[var(--border)] group">
      {/* Product Image */}
      <Link
        href={`/products/${item.product.slug}`}
        onClick={onCloseDrawer}
        className="relative w-20 h-24 bg-[var(--surface)] shrink-0 overflow-hidden rounded-xs"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Details */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <Link
              href={`/products/${item.product.slug}`}
              onClick={onCloseDrawer}
              className="text-xs sm:text-sm font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors line-clamp-1"
            >
              {item.product.name}
            </Link>

            <button
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.product.name} from bag`}
              className="text-[var(--muted-foreground)] hover:text-rose-600 transition-colors p-0.5 -mr-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Color & Size Variant Info */}
          <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--muted-foreground)]">
            <div className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full border border-black/10 dark:border-white/10"
                style={{ backgroundColor: item.selectedColor.hex }}
              />
              <span>{item.selectedColor.name}</span>
            </div>
            <span>•</span>
            <span>Size {item.selectedSize}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-xs font-semibold text-[var(--foreground)] tabular-nums">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice && (
              <span className="text-[11px] text-[var(--muted-foreground)] line-through tabular-nums">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls & Save For Later */}
        <div className="flex items-center justify-between mt-3 pt-2">
          {/* Stepper */}
          <div className="flex items-center border border-[var(--border)] rounded-xs bg-[var(--background)]">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="p-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-xs font-medium tabular-nums select-none min-w-[20px] text-center">
              {item.quantity}
            </span>
            <button
              type="button"
              disabled={item.quantity >= item.product.inventory}
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="p-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors disabled:opacity-30"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Save for Later Button */}
          <button
            type="button"
            onClick={() => onSaveForLater(item.id)}
            className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 font-medium"
          >
            <Bookmark className="w-3 h-3" />
            <span>Save for later</span>
          </button>
        </div>
      </div>
    </div>
  );
}
