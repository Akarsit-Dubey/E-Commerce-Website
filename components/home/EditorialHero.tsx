"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EditorialHero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#121316] text-white">
      {/* Background Hero Image with subtle vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=2200"
          alt="NOVA Autumn/Winter Editorial Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.75] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Subtitle pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[11px] uppercase tracking-[0.25em] font-medium text-white/90 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Autumn / Winter 2026 Collection</span>
        </div>

        {/* Editorial Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl text-white">
          Modern essentials designed for everyday life.
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl font-light leading-relaxed">
          Sculptural tailoring, pure Mongolian cashmere, and weatherproof carry engineered for enduring distinction.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <Link href="/shop" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-neutral-100 font-semibold uppercase tracking-wider text-xs px-8 h-12 shadow-xl"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href="/about" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/40 text-white hover:bg-white/15 uppercase tracking-wider text-xs px-7 h-12 backdrop-blur-xs"
            >
              The NOVA Manifesto
            </Button>
          </Link>
        </div>

        {/* Value Proposition Pills */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 pt-10 border-t border-white/15 max-w-3xl w-full text-left">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Global Express
              </p>
              <p className="text-[11px] text-white/60 mt-0.5">
                Complimentary delivery on acquisitions over $150
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Artisan Provenance
              </p>
              <p className="text-[11px] text-white/60 mt-0.5">
                Tailored in Portugal, Italy & Scotland
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Enduring Warranty
              </p>
              <p className="text-[11px] text-white/60 mt-0.5">
                Lifetime repairs & circular take-back program
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
