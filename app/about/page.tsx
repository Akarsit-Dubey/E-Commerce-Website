import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Story & Philosophy",
  description:
    "Learn about NOVA's architectural approach to modern essentials, radical material purity, and ethical ateliers across Europe and Japan.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-16">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Brand Story" }]}
        className="mb-8"
      />

      {/* Editorial Title Header */}
      <div className="max-w-3xl space-y-4 mb-16">
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
          The NOVA Philosophy
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.1]">
          Modern essentials designed for everyday life.
        </h1>
        <p className="text-base sm:text-xl text-[var(--muted-foreground)] font-light leading-relaxed">
          We reject seasonal disposal and ornamental excess. NOVA exists to craft architectural garments and utilitarian objects built to endure for decades.
        </p>
      </div>

      {/* Large Featured Editorial Image */}
      <div className="relative aspect-[21/9] sm:aspect-[2.4/1] rounded-xs overflow-hidden bg-[var(--surface)] mb-20 border border-[var(--border)]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=2200"
          alt="NOVA Atelier Craftsmanship"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Section 1: The Principle of Reduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--muted-foreground)]">
            Principle 01
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            The Discipline of Reduction
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            In an industry flooded by endless seasonal cycles and oversized logotypes, we choose silence. Every seam line, button placement, pocket depth, and stitch count is tested iteratively until only the essential remains.
          </p>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            A garment should never overpower the wearer; it should serve as a calm, confident foundation for human expression.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] rounded-xs overflow-hidden bg-[var(--surface)]">
            <Image
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800"
              alt="Tailoring pattern cutting"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] rounded-xs overflow-hidden bg-[var(--surface)] mt-8">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
              alt="Sculptural virgin wool fabric drape"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Heritage Ateliers */}
      <div className="py-20 border-t border-[var(--border)] mb-20">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[var(--accent)]">
            Provenance & Heritage
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] mt-1">
            Collaborating with Multi-Generational Guilds
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
            We partner with seven specialized workshops across Europe and East Asia, chosen for their unparalleled dedication to historical techniques and humane labor conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xs border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <span className="text-xs font-mono text-[var(--accent)] font-bold">
              01 · PORTO, PORTUGAL
            </span>
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Footwear & Tailored Poplin
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Family-operated since 1974. Goodyear-welted soles, vegetable-tanned lining, and hand-lasted calfskin derbies and chelseas.
            </p>
          </div>

          <div className="p-6 rounded-xs border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <span className="text-xs font-mono text-[var(--accent)] font-bold">
              02 · BIELLA, ITALY
            </span>
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Virgin Wool & Gabardine
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Centuries of water-powered wool weaving produce high-twist tropical wool and dense overcoat cloths with sublime drape.
            </p>
          </div>

          <div className="p-6 rounded-xs border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <span className="text-xs font-mono text-[var(--accent)] font-bold">
              03 · INNER MONGOLIA
            </span>
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Nomadic Grade-A Cashmere
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Ethically combed goat fleeces from high-altitude steppes, yielding 38mm staple length fibers that resist pilling.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Lifetime Warranty & Sustainability */}
      <div className="p-8 sm:p-14 rounded-xs border border-[var(--border)] bg-[var(--surface)] mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              <ShieldCheck className="w-4 h-4" />
              <span>Circular Commitment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
              The NOVA Lifetime Repair Guarantee
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
              When an item is built with genuine integrity, it deserves to be maintained. If your overcoat seams wear, your bag buckle gives, or your boots require resoling, our atelier will repair them at our cost.
            </p>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
              Should you ever outgrow a piece, return it to our circular take-back program for store credit, and we will restore it for archival re-release.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-6 rounded-xs bg-[var(--background)] border border-[var(--border)]">
              <span className="text-3xl font-extrabold text-[var(--foreground)]">0%</span>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Virgin synthetic plastics</p>
            </div>
            <div className="p-6 rounded-xs bg-[var(--background)] border border-[var(--border)]">
              <span className="text-3xl font-extrabold text-[var(--foreground)]">100%</span>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">FSC Recycled packaging</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Experience the Autumn / Winter 2026 Collection
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
          Quiet luxury engineered for purposeful movement and daily living.
        </p>
        <div className="pt-2">
          <Link href="/shop">
            <Button size="lg" className="px-8">
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
