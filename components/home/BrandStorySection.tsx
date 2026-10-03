"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left side: Editorial Typography */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
            Design Philosophy
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.15]">
            Reduction without sacrifice. Quality that speaks in whispers.
          </h2>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed font-light">
            NOVA was established in 2025 as an antidote to disposable fashion cycles and noisy branding. We believe the objects you wear and carry every day should be silent companions: understated in form, immaculate in proportion, and uncompromising in tactile materiality.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
            <div>
              <span className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                100%
              </span>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Natural or certified recycled textiles across all collections.
              </p>
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                7 Ateliers
              </span>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">
                Family-owned heritage workshops across Portugal, Italy, and Scotland.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] transition-colors border-b-2 border-[var(--foreground)] pb-1"
            >
              <span>Explore The NOVA Manifesto</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right side: Dual Editorial Images */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] rounded-xs overflow-hidden bg-[var(--surface)] mt-8">
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800"
              alt="Tailoring atelier cutting wool"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] rounded-xs overflow-hidden bg-[var(--surface)]">
            <Image
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
              alt="Finished architectural overcoat in charcoal"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
