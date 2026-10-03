"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionConfig";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";

export function AsymmetricSpotlight() {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const centerpiece = PRODUCTS[0]; // Architectural Wool Overcoat
  const companion1 = PRODUCTS[1]; // Pure Mongolian Cashmere Crewneck
  const companion2 = PRODUCTS[2]; // Pleated Wide-Leg Trousers

  const [addedCenter, setAddedCenter] = React.useState(false);

  const handleQuickAddCenterpiece = () => {
    addItem(centerpiece, centerpiece.colors[0], centerpiece.sizes[0], 1);
    setAddedCenter(true);
    showToast({
      title: "Added to shopping bag",
      message: `${centerpiece.name} (${centerpiece.colors[0].name} · Size ${centerpiece.sizes[0]})`,
      type: "cart",
    });
    setTimeout(() => setAddedCenter(false), 2000);
  };

  return (
    <section className="py-24 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-[var(--border)]">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
              Silhouette In Focus
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mt-1">
              The Complete Uniform
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md font-light leading-relaxed">
            Every garment in our autumn collection is engineered to interact with the next: balancing sculptural wool drape with featherweight cashmere knitwear.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column (Asymmetric Hero Piece - spans 7 cols) */}
        <FadeIn direction="left" className="lg:col-span-7 flex flex-col">
          <div className="group relative flex-1 min-h-[500px] sm:min-h-[620px] rounded-xs overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
            <Image
              src={centerpiece.images[0]}
              alt={centerpiece.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-amber-300 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Season Standout</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {centerpiece.name}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 mt-1.5 max-w-lg font-light leading-relaxed">
                {centerpiece.tagline}
              </p>

              <div className="mt-4 flex items-center justify-between pt-4 border-t border-white/20 flex-wrap gap-4">
                <PriceDisplay
                  price={centerpiece.price}
                  salePrice={centerpiece.salePrice}
                  size="xl"
                  className="text-white"
                />

                <div className="flex items-center gap-3">
                  <Link href={`/products/${centerpiece.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/40 text-white hover:bg-white/20 text-xs uppercase tracking-wider backdrop-blur-xs"
                    >
                      View Piece
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    onClick={handleQuickAddCenterpiece}
                    className="bg-white text-black hover:bg-neutral-100 text-xs font-semibold uppercase tracking-wider"
                  >
                    {addedCenter ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        <span>Added</span>
                      </>
                    ) : (
                      <span>Acquire Piece</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Right Column (Companion items - spans 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* Companion Item 1 */}
          <FadeIn direction="right" delay={0.15} className="flex-1">
            <Link
              href={`/products/${companion1.slug}`}
              className="group flex flex-col sm:flex-row h-full rounded-xs border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--foreground)]/40 transition-colors"
            >
              <div className="relative w-full sm:w-40 aspect-[3/4] sm:aspect-auto rounded-xs overflow-hidden bg-[var(--surface)] shrink-0 mb-4 sm:mb-0">
                <Image
                  src={companion1.images[0]}
                  alt={companion1.name}
                  fill
                  sizes="180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="sm:pl-5 flex flex-col justify-between flex-1 py-1">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold">
                    Foundation 01
                  </span>
                  <h4 className="text-sm font-semibold text-[var(--foreground)] mt-0.5 group-hover:text-[var(--accent)] transition-colors">
                    {companion1.name}
                  </h4>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2 leading-relaxed">
                    {companion1.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-4">
                  <PriceDisplay price={companion1.price} size="sm" />
                  <span className="text-xs font-semibold text-[var(--foreground)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>

          {/* Companion Item 2 */}
          <FadeIn direction="right" delay={0.25} className="flex-1">
            <Link
              href={`/products/${companion2.slug}`}
              className="group flex flex-col sm:flex-row h-full rounded-xs border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--foreground)]/40 transition-colors"
            >
              <div className="relative w-full sm:w-40 aspect-[3/4] sm:aspect-auto rounded-xs overflow-hidden bg-[var(--surface)] shrink-0 mb-4 sm:mb-0">
                <Image
                  src={companion2.images[0]}
                  alt={companion2.name}
                  fill
                  sizes="180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="sm:pl-5 flex flex-col justify-between flex-1 py-1">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--muted-foreground)] font-semibold">
                    Foundation 02
                  </span>
                  <h4 className="text-sm font-semibold text-[var(--foreground)] mt-0.5 group-hover:text-[var(--accent)] transition-colors">
                    {companion2.name}
                  </h4>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2 leading-relaxed">
                    {companion2.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-4">
                  <PriceDisplay
                    price={companion2.price}
                    salePrice={companion2.salePrice}
                    size="sm"
                  />
                  <span className="text-xs font-semibold text-[var(--foreground)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
