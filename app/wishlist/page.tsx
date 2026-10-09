"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, editorialEase } from "@/components/motion/MotionConfig";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, isHydrated } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (product: (typeof wishlist)[0]) => {
    addItem(product, product.colors[0], product.sizes[0], 1);
    removeFromWishlist(product.id);
    showToast({
      title: "Moved to bag",
      message: `${product.name} (${product.colors[0].name} · Size ${product.sizes[0]})`,
      type: "cart",
    });
  };

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-[var(--muted-foreground)]">
        Loading saved wishlist...
      </div>
    );
  }

  return (
    <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Shop", href: "/shop" }, { label: "Saved Wishlist" }]}
        className="mb-8"
      />

      <div className="flex items-baseline justify-between pb-6 border-b border-[var(--border)] mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
            Curated Archives
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] mt-1">
            Saved Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-[var(--muted-foreground)] hover:text-rose-600 transition-colors underline"
          >
            Clear all
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <FadeIn className="py-24 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto text-[var(--muted-foreground)]">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Your wishlist is empty
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            Curate your personal collection of architectural tailoring, cashmere essentials, and crafted leather accessories.
          </p>
          <Button href="/shop" size="lg" className="inline-block pt-2">
            Explore Collections
          </Button>
        </FadeIn>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.2, ease: editorialEase } }}
                className="flex flex-col rounded-xs border border-[var(--border)] bg-[var(--card)] overflow-hidden group hover:border-[var(--foreground)]/40 transition-colors"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative aspect-[3/4] bg-[var(--surface)] overflow-hidden"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--foreground)] mt-0.5 line-clamp-1">
                      <Link
                        href={`/products/${product.slug}`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <div className="mt-2">
                      <PriceDisplay
                        price={product.price}
                        salePrice={product.salePrice}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center gap-2">
                    <Button
                      onClick={() => handleMoveToCart(product)}
                      size="sm"
                      className="flex-1 text-xs uppercase tracking-wider"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                      <span>Move to Bag</span>
                    </Button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="p-2 border border-[var(--border)] rounded-xs text-[var(--muted-foreground)] hover:text-rose-600 hover:border-rose-500/50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
