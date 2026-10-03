"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
            Curated Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] mt-1">
            Shop By Discipline
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] hover:text-[var(--accent)] inline-flex items-center gap-1 transition-colors"
        >
          <span>View All Disciplines</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, index) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.id}`}
            className={`group relative overflow-hidden rounded-xs bg-[var(--surface)] border border-[var(--border)] transition-all ${
              index === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3] sm:aspect-[3/4] lg:aspect-[4/5]"
            }`}
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85] group-hover:brightness-[0.75]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-1">
                {cat.itemCount} Designs Available
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <p className="text-xs text-white/80 line-clamp-1 max-w-md mt-1 font-light">
                {cat.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
