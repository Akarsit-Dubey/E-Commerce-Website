"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Product, ProductColor } from "@/types/product";
import { ProductGallery } from "./ProductGallery";
import { PriceDisplay } from "./PriceDisplay";
import { RatingStars } from "@/components/ui/RatingStars";
import { QuantitySelector } from "./QuantitySelector";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Accordion } from "@/components/ui/Accordion";
import { ProductGrid } from "./ProductGrid";
import { ProductReviews } from "./ProductReviews";
import { Modal } from "@/components/ui/Modal";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/useToast";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { Heart, Truck, RotateCcw, ShieldCheck, Ruler, Check, ShoppingBag } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { recentProducts, addRecentlyViewed } = useRecentlyViewed();
  const shouldReduceMotion = useReducedMotion();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Record this product in recently viewed
  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [product.id, addRecentlyViewed]);

  // Show sticky bottom bar on mobile when scrolled past 500px
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem(product, selectedColor, selectedSize, quantity);
      setIsAdding(false);
      setIsAdded(true);
      showToast({
        title: "Added to shopping bag",
        message: `${quantity} × ${product.name} (${selectedColor.name} · Size ${selectedSize})`,
        type: "cart",
      });

      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 280);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    showToast({
      title: isFavorited ? "Removed from Wishlist" : "Saved to Wishlist",
      message: product.name,
      type: "info",
    });
  };

  // Filter out current product from recently viewed
  const otherRecent = recentProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          {
            label: product.category.toUpperCase(),
            href: `/shop?category=${product.category}`,
          },
          { label: product.name },
        ]}
        className="mb-8"
      />

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Purchase & Meta Column */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
                {product.category}
              </span>
              {product.inventory < 15 && product.inventory > 0 && (
                <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-xs">
                  Low Stock: Only {product.inventory} Left
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1.5 leading-relaxed font-light">
                {product.tagline}
              </p>
            )}

            {/* Rating summary link */}
            <div className="flex items-center gap-2 mt-3">
              <RatingStars rating={product.rating} size="sm" />
              <a
                href="#reviews-heading"
                className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline underline-offset-4"
              >
                {product.rating.toFixed(1)} ({product.reviewCount} verified reviews)
              </a>
            </div>

            {/* Price */}
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <PriceDisplay
                price={product.price}
                salePrice={product.salePrice}
                size="xl"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed font-light">
            {product.description}
          </p>

          {/* Variant Selection: Color */}
          <div className="space-y-3 pt-2 border-t border-[var(--border)]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold uppercase tracking-wider text-[var(--foreground)]">
                Color:{" "}
                <strong className="font-normal text-[var(--muted-foreground)]">
                  {selectedColor.name}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={cn(
                      "w-8 h-8 rounded-full border border-black/10 dark:border-white/10 transition-all cursor-pointer relative flex items-center justify-center",
                      isSelected && "ring-2 ring-[var(--accent)] ring-offset-2 scale-110"
                    )}
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Variant Selection: Size */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold uppercase tracking-wider text-[var(--foreground)]">
                Size:{" "}
                <strong className="font-normal text-[var(--muted-foreground)]">
                  {selectedSize}
                </strong>
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="inline-flex items-center gap-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline underline-offset-4 cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <motion.button
                    key={size}
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-10 text-xs font-semibold rounded-xs border transition-all cursor-pointer flex items-center justify-center",
                      isSelected
                        ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] shadow-sm"
                        : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)] bg-[var(--surface)]/30"
                    )}
                  >
                    {size}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <QuantitySelector
                quantity={quantity}
                max={product.inventory}
                onChange={setQuantity}
                size="md"
              />

              <Button
                onClick={handleAddToCart}
                isLoading={isAdding}
                disabled={product.inventory <= 0}
                className="flex-1 h-11 text-xs uppercase tracking-wider font-semibold shadow-md active:scale-[0.98]"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Added to Bag</span>
                  </>
                ) : product.inventory > 0 ? (
                  `Add to Bag • ${quantity} Item${quantity > 1 ? "s" : ""}`
                ) : (
                  "Currently Sold Out"
                )}
              </Button>

              <motion.button
                type="button"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.82 }}
                onClick={handleWishlistToggle}
                aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                className="h-11 w-11 border border-[var(--border)] rounded-xs flex items-center justify-center text-[var(--foreground)] hover:text-rose-600 hover:border-rose-500/50 transition-colors bg-[var(--background)] cursor-pointer"
              >
                <motion.div
                  animate={isFavorited && !shouldReduceMotion ? { scale: [1, 1.35, 1] } : {}}
                  transition={{ duration: 0.35 }}
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isFavorited && "fill-rose-500 text-rose-500"
                    )}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Reassurance Value Props */}
          <div className="grid grid-cols-1 gap-2.5 pt-4 text-xs text-[var(--muted-foreground)] border-t border-[var(--border)]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[var(--foreground)] shrink-0" />
              <span>Complimentary global express shipping on orders over $150</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[var(--foreground)] shrink-0" />
              <span>30-day effortless returns with prepaid shipping labels</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[var(--foreground)] shrink-0" />
              <span>NOVA Lifetime Craftsmanship Warranty & Circular Renewal</span>
            </div>
          </div>

          {/* Accordion Specs: Details, Materials, Shipping & Care */}
          <div className="pt-4">
            <Accordion
              items={[
                {
                  id: "details",
                  title: "Garment Details & Construction",
                  defaultOpen: true,
                  children: (
                    <ul className="list-disc pl-4 space-y-1.5">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  id: "materials",
                  title: "Materials & Ethical Provenance",
                  children: (
                    <div className="space-y-2">
                      <p>
                        <strong>Composition:</strong> {product.materials}
                      </p>
                      <p>
                        Spun and tailored in partnership with ethical European and Japanese artisanal mills adhering to strict OEKO-TEX® and GOTS sustainable benchmarks.
                      </p>
                    </div>
                  ),
                },
                {
                  id: "shipping",
                  title: "Shipping & Complimentary Returns",
                  children: (
                    <p>
                      Orders dispatched within 24 business hours from our European and North American fulfillment hubs. Standard shipping takes 3-5 business days. International express is 2-4 business days. Returns accepted within 30 days of delivery.
                    </p>
                  ),
                },
                {
                  id: "care",
                  title: "Care & Preservation",
                  children: (
                    <ul className="list-disc pl-4 space-y-1">
                      {product.careInstructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews
        productId={product.id}
        productName={product.name}
        rating={product.rating}
        reviewCount={product.reviewCount}
        reviews={product.reviews}
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 border-t border-[var(--border)] mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
                Complete The Silhouette
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] mt-1">
                Complementary Pieces
              </h2>
            </div>
            <Link
              href={`/shop?category=${product.category}`}
              className="text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] hover:text-[var(--accent)]"
            >
              View More {product.category}
            </Link>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}

      {/* Recently Viewed Products */}
      {otherRecent.length > 0 && (
        <section className="py-16 border-t border-[var(--border)]">
          <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)] mb-6">
            Recently Viewed
          </h2>
          <ProductGrid products={otherRecent} columns={4} />
        </section>
      )}

      {/* Sticky Mobile Add To Bag Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[var(--background)]/95 backdrop-blur-md border-t border-[var(--border)] p-3 lg:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-10 h-12 bg-[var(--surface)] rounded-xs overflow-hidden shrink-0 border border-[var(--border)]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[var(--foreground)] truncate">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    {formatPrice(product.salePrice ?? product.price)} · Size {selectedSize}
                  </p>
                </div>
              </div>

              <Button
                size="sm"
                onClick={handleAddToCart}
                isLoading={isAdding}
                className="shrink-0 h-10 px-4 text-xs uppercase tracking-wider font-semibold"
              >
                {isAdded ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                    <span>Add to Bag</span>
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <Modal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        title="NOVA Sizing & Proportions Guide"
        description="All dimensions in inches / centimeters. Measurements correspond to standard body circumference."
        maxWidth="lg"
      >
        <div className="space-y-4 pt-2 text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[var(--border)]">
              <thead>
                <tr className="bg-[var(--surface)] text-[var(--foreground)] font-semibold">
                  <th className="p-2.5 border border-[var(--border)]">Size</th>
                  <th className="p-2.5 border border-[var(--border)]">Chest</th>
                  <th className="p-2.5 border border-[var(--border)]">Waist</th>
                  <th className="p-2.5 border border-[var(--border)]">Hip</th>
                </tr>
              </thead>
              <tbody className="text-[var(--muted-foreground)]">
                <tr>
                  <td className="p-2.5 border border-[var(--border)] font-medium text-[var(--foreground)]">XS</td>
                  <td className="p-2.5 border border-[var(--border)]">34 - 36&quot; (86-91cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">28 - 30&quot; (71-76cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">34 - 36&quot; (86-91cm)</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-[var(--border)] font-medium text-[var(--foreground)]">S</td>
                  <td className="p-2.5 border border-[var(--border)]">36 - 38&quot; (91-96cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">30 - 32&quot; (76-81cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">36 - 38&quot; (91-96cm)</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-[var(--border)] font-medium text-[var(--foreground)]">M</td>
                  <td className="p-2.5 border border-[var(--border)]">38 - 40&quot; (96-101cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">32 - 34&quot; (81-86cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">38 - 40&quot; (96-101cm)</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-[var(--border)] font-medium text-[var(--foreground)]">L</td>
                  <td className="p-2.5 border border-[var(--border)]">40 - 42&quot; (101-106cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">34 - 36&quot; (86-91cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">40 - 42&quot; (101-106cm)</td>
                </tr>
                <tr>
                  <td className="p-2.5 border border-[var(--border)] font-medium text-[var(--foreground)]">XL</td>
                  <td className="p-2.5 border border-[var(--border)]">42 - 45&quot; (106-114cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">36 - 39&quot; (91-99cm)</td>
                  <td className="p-2.5 border border-[var(--border)]">42 - 45&quot; (106-114cm)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
            Need fit advice? Contact our studio concierge team via concierge@nova-essentials.com.
          </p>
        </div>
      </Modal>
    </div>
  );
}
