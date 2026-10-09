"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/lib/utils";
import { editorialEase } from "@/components/motion/MotionConfig";
import { ShoppingBag, ArrowRight, Tag, Bookmark, CheckCircle2 } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    savedItems,
    summary,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    saveForLater,
    moveToCart,
    removeSavedItem,
    promoCode,
    promoError,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput);
    if (success) setPromoInput("");
  };

  const freeShippingProgress = Math.min(
    100,
    ((summary.freeShippingThreshold - summary.remainingForFreeShipping) /
      summary.freeShippingThreshold) *
      100
  );

  return (
    <Drawer
      isOpen={isCartOpen}
      onClose={closeCart}
      title={`Shopping Bag (${summary.itemCount})`}
      footer={
        items.length > 0 ? (
          <div className="space-y-4">
            {/* Promo Code Input */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xs text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      Code {promoCode} applied (
                      {summary.discount > 0 && `-${formatPrice(summary.discount)}`})
                    </span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-[var(--muted-foreground)] hover:text-rose-600 underline font-medium cursor-pointer"
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
                    aria-label="Promotional coupon code"
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

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[var(--muted-foreground)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[var(--foreground)] tabular-nums">
                  {formatPrice(summary.subtotal)}
                </span>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Savings</span>
                  <span className="tabular-nums">-{formatPrice(summary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-[var(--foreground)] tabular-nums">
                  {summary.shipping === 0 ? "Complimentary" : formatPrice(summary.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="text-[var(--foreground)] tabular-nums">
                  {formatPrice(summary.estimatedTax)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--border)] text-sm font-semibold text-[var(--foreground)]">
                <span>Estimated Total</span>
                <span className="tabular-nums text-base">{formatPrice(summary.total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <Button href="/checkout" onClick={closeCart} className="w-full h-12 flex items-center justify-between px-6">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/cart" onClick={closeCart} variant="ghost" size="sm" className="w-full text-xs">
                View Full Bag Details
              </Button>
            </div>
          </div>
        ) : null
      }
    >
      <div className="space-y-4">
        {/* Free Shipping Progress Indicator */}
        <div className="bg-[var(--surface)] p-3 rounded-xs border border-[var(--border)] text-xs">
          {summary.remainingForFreeShipping > 0 ? (
            <p className="text-[var(--muted-foreground)] mb-2">
              Add{" "}
              <strong className="text-[var(--foreground)] font-semibold">
                {formatPrice(summary.remainingForFreeShipping)}
              </strong>{" "}
              more to unlock complimentary global shipping.
            </p>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium mb-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You’ve unlocked complimentary global express shipping!</span>
            </div>
          )}
          <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--accent)]"
              initial={false}
              animate={{ width: `${freeShippingProgress}%` }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: editorialEase }}
            />
          </div>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[var(--surface)] flex items-center justify-center mx-auto text-[var(--muted-foreground)]">
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Your shopping bag is empty
              </p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1 max-w-xs mx-auto">
                Discover modern minimalist essentials designed for enduring everyday performance.
              </p>
            </div>
            <Button href="/shop" onClick={closeCart} size="sm" className="inline-block pt-2">
              Explore Collections
            </Button>
          </div>
        ) : (
          /* Item List with Staggered Animations */
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.06,
                },
              },
            }}
            className="divide-y divide-transparent"
          >
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                  transition={{ duration: 0.25 }}
                >
                  <CartItem
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    onSaveForLater={saveForLater}
                    onCloseDrawer={closeCart}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Saved For Later Accordion/Section */}
        {savedItems.length > 0 && (
          <div className="pt-6 border-t border-[var(--border)]">
            <button
              onClick={() => setShowSaved((prev) => !prev)}
              className="flex items-center justify-between w-full py-2 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved For Later ({savedItems.length})</span>
              </div>
              <span className="text-xs text-[var(--muted-foreground)]">
                {showSaved ? "Hide" : "Show"}
              </span>
            </button>

            {showSaved && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 pt-3"
              >
                {savedItems.map((saved) => (
                  <div
                    key={saved.id}
                    className="flex items-center justify-between p-2.5 rounded-xs bg-[var(--surface)] text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-medium text-[var(--foreground)] truncate">
                        {saved.product.name}
                      </p>
                      <p className="text-[11px] text-[var(--muted-foreground)]">
                        {saved.selectedColor.name} • {saved.selectedSize} •{" "}
                        {formatPrice(saved.product.salePrice ?? saved.product.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => moveToCart(saved.id)}
                        className="text-[11px] font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                      >
                        Move to Bag
                      </button>
                      <button
                        onClick={() => removeSavedItem(saved.id)}
                        className="text-xs text-[var(--muted-foreground)] hover:text-rose-600 cursor-pointer"
                        aria-label="Remove saved item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </Drawer>
  );
}
