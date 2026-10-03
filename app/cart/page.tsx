"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ArrowRight, Tag, Bookmark, CheckCircle2, ShieldCheck, Truck } from "lucide-react";

export default function CartPage() {
  const {
    items,
    savedItems,
    summary,
    updateQuantity,
    removeItem,
    saveForLater,
    moveToCart,
    removeSavedItem,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
    clearCart,
    isHydrated,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromoCode(promoInput);
    if (ok) setPromoInput("");
  };

  const recommended = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  const freeShippingProgress = Math.min(
    100,
    ((summary.freeShippingThreshold - summary.remainingForFreeShipping) /
      summary.freeShippingThreshold) *
      100
  );

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[var(--muted-foreground)]">Loading your shopping bag...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Shop", href: "/shop" }, { label: "Shopping Bag" }]}
        className="mb-8"
      />

      <div className="flex items-baseline justify-between pb-6 border-b border-[var(--border)] mb-8">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
            Review Selection
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] mt-1">
            Shopping Bag ({summary.itemCount})
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-[var(--muted-foreground)] hover:text-rose-600 transition-colors underline"
          >
            Clear bag
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto text-[var(--muted-foreground)]">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">
            Your shopping bag is currently empty
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            Take a moment to explore our permanent collections and seasonal arrivals.
          </p>
          <Link href="/shop" className="inline-block pt-2">
            <Button size="lg">Discover Collections</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main items column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free shipping progress */}
            <div className="bg-[var(--surface)] p-4 rounded-xs border border-[var(--border)] text-xs">
              {summary.remainingForFreeShipping > 0 ? (
                <p className="text-[var(--muted-foreground)] mb-2">
                  Add <strong className="text-[var(--foreground)] font-semibold">{formatPrice(summary.remainingForFreeShipping)}</strong> more to your order to unlock complimentary global express delivery.
                </p>
              ) : (
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium mb-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Complimentary express global delivery unlocked!</span>
                </div>
              )}
              <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-transparent">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onSaveForLater={saveForLater}
                />
              ))}
            </div>

            {/* Saved For Later Items */}
            {savedItems.length > 0 && (
              <div className="pt-10 border-t border-[var(--border)]">
                <h3 className="text-base font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[var(--accent)]" />
                  <span>Saved For Later ({savedItems.length})</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedItems.map((saved) => (
                    <div
                      key={saved.id}
                      className="flex items-center gap-3 p-3 rounded-xs border border-[var(--border)] bg-[var(--surface)] text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[var(--foreground)] truncate">
                          {saved.product.name}
                        </p>
                        <p className="text-[11px] text-[var(--muted-foreground)]">
                          {saved.selectedColor.name} • Size {saved.selectedSize}
                        </p>
                        <p className="font-medium text-[var(--foreground)] mt-1">
                          {formatPrice(saved.product.salePrice ?? saved.product.price)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0">
                        <Button
                          size="sm"
                          onClick={() => moveToCart(saved.id)}
                          className="text-[10px] h-7 px-2.5"
                        >
                          Move to Bag
                        </Button>
                        <button
                          onClick={() => removeSavedItem(saved.id)}
                          className="text-[10px] text-[var(--muted-foreground)] hover:text-rose-600 text-center"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: Summary */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-xs border border-[var(--border)] bg-[var(--surface)] space-y-6 sticky top-28">
              <h2 className="text-base font-bold text-[var(--foreground)] uppercase tracking-wider pb-3 border-b border-[var(--border)]">
                Order Summary
              </h2>

              {/* Promo code field */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xs text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code {promoCode} applied ({summary.discount > 0 && `-${formatPrice(summary.discount)}`})</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-[var(--muted-foreground)] hover:text-rose-600 underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. NOVA10)"
                      aria-label="Promo discount code"
                      className="flex-1 bg-[var(--background)] border border-[var(--border)] px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[var(--foreground)] rounded-xs"
                    />
                    <Button type="submit" variant="secondary" size="sm">
                      Apply
                    </Button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{promoError}</p>
                )}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-2.5 text-xs text-[var(--muted-foreground)]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[var(--foreground)] font-medium tabular-nums">
                    {formatPrice(summary.subtotal)}
                  </span>
                </div>
                {summary.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Discount</span>
                    <span className="tabular-nums">-{formatPrice(summary.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-[var(--foreground)] font-medium tabular-nums">
                    {summary.shipping === 0 ? "Complimentary" : formatPrice(summary.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-[var(--foreground)] font-medium tabular-nums">
                    {formatPrice(summary.estimatedTax)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[var(--border)] text-base font-bold text-[var(--foreground)]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">{formatPrice(summary.total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link href="/checkout" className="block w-full">
                <Button className="w-full h-12 flex items-center justify-between px-6 uppercase tracking-wider text-xs font-semibold">
                  <span>Checkout Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[var(--border)] space-y-2 text-[11px] text-[var(--muted-foreground)]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span>Secure 256-bit encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span>DHL Express carbon-neutral transit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Products */}
      <section className="py-20 border-t border-[var(--border)] mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
              Curated Additions
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] mt-1">
              You May Also Admire
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] hover:text-[var(--accent)]"
          >
            Explore All
          </Link>
        </div>
        <ProductGrid products={recommended} columns={4} />
      </section>
    </div>
  );
}
