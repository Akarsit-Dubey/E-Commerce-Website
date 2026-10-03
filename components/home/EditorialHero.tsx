"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { editorialEase } from "@/components/motion/MotionConfig";

export function EditorialHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#0c0d10] text-white">
      {/* Background Hero Image with Slow Entrance */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.4 : 1.2, ease: editorialEase }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=2400"
          alt="NOVA Autumn/Winter Editorial Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.72] contrast-[1.08]"
        />
        {/* Subtle Luxury Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45" />
      </motion.div>

      {/* Content Stagger Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center flex flex-col items-center">
        {/* Step 1: Subtitle badge */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: editorialEase }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-white/90 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Autumn / Winter 2026 Collection</span>
        </motion.div>

        {/* Step 2: Heading */}
        <motion.h1
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: editorialEase }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-4xl text-white"
        >
          The architecture of daily dressing.
        </motion.h1>

        {/* Step 3: Supporting narrative */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease: editorialEase }}
          className="mt-6 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl font-light leading-relaxed"
        >
          Sculptural virgin wool tailoring, Grade-A Mongolian cashmere knitwear, and tactile Portuguese leather carry built to outlast trends.
        </motion.p>

        {/* Step 4: CTAs */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.58, ease: editorialEase }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/shop" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-black hover:bg-neutral-100 font-semibold uppercase tracking-wider text-xs px-8 h-12 shadow-xl hover:scale-[1.02] transition-transform"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href="/about" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/35 text-white hover:bg-white/15 uppercase tracking-wider text-xs px-7 h-12 backdrop-blur-xs hover:border-white transition-colors"
            >
              The NOVA Manifesto
            </Button>
          </Link>
        </motion.div>

        {/* Step 5: Supporting Value Pillars */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72, ease: editorialEase }}
          className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 pt-10 border-t border-white/15 max-w-3xl w-full text-left"
        >
          <div className="flex items-start gap-3 group">
            <Globe className="w-5 h-5 text-amber-300/90 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Global Express
              </p>
              <p className="text-[11px] text-white/60 mt-0.5">
                Complimentary delivery on acquisitions over $150
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <ShieldCheck className="w-5 h-5 text-amber-300/90 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Artisan Provenance
              </p>
              <p className="text-[11px] text-white/60 mt-0.5">
                Tailored in Portugal, Italy & Scotland
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 group">
            <Sparkles className="w-5 h-5 text-amber-300/90 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">
                Enduring Warranty
              </p>
              <p className="text-[11px] text-white/60 mt-0.5">
                Lifetime repairs & circular take-back program
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
