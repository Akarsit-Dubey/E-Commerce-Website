"use client";

import React from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";
import { RatingStars } from "@/components/ui/RatingStars";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[var(--surface)]/50 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
            Community Voices
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] mt-2">
            Praised by Architects, Designers & Discerning Creators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="flex flex-col justify-between p-8 rounded-xs bg-[var(--background)] border border-[var(--border)] relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[var(--border)] mb-4" />
                <RatingStars rating={test.rating} size="sm" className="mb-4" />
                <p className="text-sm sm:text-base text-[var(--foreground)] leading-relaxed italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center gap-3.5">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[var(--surface)] shrink-0">
                  <Image
                    src={test.avatar}
                    alt={test.author}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--foreground)]">
                    {test.author}
                  </h4>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    {test.role} · {test.location}
                  </p>
                  <p className="text-[10px] text-[var(--accent)] font-medium mt-0.5">
                    Acquired {test.productMentioned}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
