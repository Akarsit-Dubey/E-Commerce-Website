"use client";

import React from "react";
import Image from "next/image";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const SOCIAL_POSTS = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
    handle: "@studio_arc",
    product: "Architectural Overcoat",
  },
  {
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
    handle: "@elena.k",
    product: "Crossbody Sling",
  },
  {
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600",
    handle: "@marcus.vance",
    product: "Minimalist Sneaker",
  },
  {
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600",
    handle: "@tobias_horology",
    product: "Titanium Watch",
  },
  {
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600",
    handle: "@hannah.arch",
    product: "Structured Leather Tote",
  },
];

export function SocialGallery() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
            #LivingWithNOVA
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] mt-1">
            In Context & Living Spaces
          </h2>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 transition-colors"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>Follow @nova.essentials</span>
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {SOCIAL_POSTS.map((post, idx) => (
          <div
            key={idx}
            className="group relative aspect-square overflow-hidden rounded-xs bg-[var(--surface)] border border-[var(--border)]"
          >
            <Image
              src={post.image}
              alt={post.product}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-white">
              <InstagramIcon className="w-5 h-5 mb-1.5" />
              <p className="text-xs font-semibold">{post.handle}</p>
              <p className="text-[10px] text-white/80 mt-0.5">{post.product}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
