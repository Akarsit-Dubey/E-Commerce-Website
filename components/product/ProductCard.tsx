"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Plus, Check } from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "./PriceDisplay";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { editorialEase } from "@/components/motion/MotionConfig";

interface ProductCardProps {
  product: Product;
  aspectRatio?: "portrait" | "square";
  viewMode?: "grid" | "list";
  priority?: boolean;
}

export function ProductCard({
  product,
  aspectRatio = "portrait",
  viewMode = "grid",
  priority = false,
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAddSize = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product, selectedColor, size, 1);
    setJustAdded(true);
    setShowSizes(false);
    showToast({
      title: "Added to shopping bag",
      message: `${product.name} (${selectedColor.name} · Size ${size})`,
      type: "cart",
    });

    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast({
      title: isFavorited ? "Removed from Wishlist" : "Saved to Wishlist",
      message: product.name,
      type: "info",
    });
  };

  const secondaryImage = product.images[1] || product.images[0];

  // List View layout for shop page
  if (viewMode === "list") {
    return (
      <div className="group relative flex flex-col sm:flex-row gap-6 p-5 rounded-xs border border-[var(--border)] bg-[var(--card)] hover:border-[var(--foreground)]/40 transition-all duration-300">
        <Link
          href={`/products/${product.slug}`}
          className="relative w-full sm:w-52 h-64 bg-[var(--surface)] shrink-0 overflow-hidden rounded-xs"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 220px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {product.salePrice && (
            <Badge variant="sale" className="absolute top-2.5 left-2.5 z-10 shadow-xs">
              Sale
            </Badge>
          )}
        </Link>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold">
                  {product.category}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-[var(--foreground)] mt-0.5">
                  <Link
                    href={`/products/${product.slug}`}
                    className="hover:text-[var(--accent)] transition-colors"
                  >
                    {product.name}
                  </Link>
                </h3>
              </div>

              <motion.button
                type="button"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.85 }}
                onClick={handleWishlistToggle}
                aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                className="p-2 text-[var(--foreground)] hover:text-rose-600 transition-colors"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isFavorited && "fill-rose-500 text-rose-500"
                  )}
                />
              </motion.button>
            </div>

            <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[11px] text-[var(--muted-foreground)]">Colors:</span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    className={cn(
                      "w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer",
                      selectedColor.name === c.name
                        ? "scale-115 ring-1 ring-[var(--foreground)] ring-offset-1"
                        : "opacity-75 hover:opacity-100"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--border)]">
            <PriceDisplay
              price={product.price}
              salePrice={product.salePrice}
              size="lg"
            />

            <div className="flex items-center gap-1.5">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAddSize(size, e)}
                  className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider border border-[var(--border)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] rounded-xs transition-all cursor-pointer"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View layout
  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizes(false);
      }}
    >
      {/* Image Container with Luxury 1.04 Scale */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[var(--surface)] rounded-xs border border-[var(--border)]/60 transition-colors group-hover:border-[var(--foreground)]/30",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      >
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 block overflow-hidden"
          aria-label={`View ${product.name}`}
        >
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              isHovered && product.images.length > 1
                ? "opacity-0 scale-[1.04]"
                : "opacity-100 scale-100"
            )}
          />

          {/* Secondary Image for Hover Crossfade */}
          {product.images.length > 1 && (
            <Image
              src={secondaryImage}
              alt={`${product.name} detail view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-cover transition-all duration-700 ease-out absolute inset-0",
                isHovered ? "opacity-100 scale-[1.04]" : "opacity-0 scale-100"
              )}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.salePrice && <Badge variant="sale">Sale</Badge>}
          {product.newArrival && <Badge variant="new">New</Badge>}
          {product.bestseller && !product.salePrice && (
            <Badge variant="bestseller">Curated</Badge>
          )}
        </div>

        {/* Wishlist Heart Button with Spring Animation */}
        <motion.button
          type="button"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.8 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-[var(--background)]/80 backdrop-blur-xs text-[var(--foreground)] hover:text-rose-600 transition-colors shadow-xs"
        >
          <motion.div
            animate={isFavorited && !shouldReduceMotion ? { scale: [1, 1.35, 1] } : {}}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isFavorited && "fill-rose-500 text-rose-500"
              )}
            />
          </motion.div>
        </motion.button>

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-2 bottom-2 z-10 hidden sm:block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {!showSizes ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSizes(true);
              }}
              className="w-full py-2.5 px-3 bg-[var(--background)]/95 hover:bg-[var(--foreground)] hover:text-[var(--background)] text-[var(--foreground)] border border-[var(--border)] text-xs font-semibold uppercase tracking-wider rounded-xs backdrop-blur-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: editorialEase }}
              className="p-2 bg-[var(--background)]/95 backdrop-blur-md border border-[var(--border)] rounded-xs shadow-lg flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[var(--muted-foreground)] px-1">
                <span>Select Size</span>
                <span className="text-[var(--accent)] font-medium">{selectedColor.name}</span>
              </div>
              <div className="flex items-center gap-1 justify-center flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAddSize(size, e)}
                    className="px-2 py-1 text-[11px] font-bold border border-[var(--border)] hover:bg-[var(--foreground)] hover:text-[var(--background)] rounded-xs transition-colors cursor-pointer"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Product Meta */}
      <div className="pt-3 pb-1 flex flex-col">
        {/* Color preview swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c)}
                title={c.name}
                className={cn(
                  "w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20 transition-transform cursor-pointer",
                  selectedColor.name === c.name &&
                    "scale-125 ring-1 ring-[var(--foreground)] ring-offset-1"
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[10px] text-[var(--muted-foreground)] ml-1">
              +{product.colors.length}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-medium text-[var(--foreground)] leading-snug line-clamp-1 group-hover:text-[var(--accent)] transition-colors">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Tagline / Subtitle */}
        {product.tagline && (
          <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-1 mt-0.5 font-normal">
            {product.tagline}
          </p>
        )}

        {/* Price */}
        <div className="mt-1.5">
          <PriceDisplay
            price={product.price}
            salePrice={product.salePrice}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
