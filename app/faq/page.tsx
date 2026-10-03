"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQ_DATA } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Mail, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...FAQ_DATA.map((c) => c.category)];

  const displayedFAQ =
    selectedCategory === "All"
      ? FAQ_DATA
      : FAQ_DATA.filter((c) => c.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Client Care & FAQ" }]}
        className="mb-8"
      />

      <div className="text-center space-y-4 mb-12">
        <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--accent)]">
          Assistance & Protocols
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-lg mx-auto leading-relaxed">
          Comprehensive answers regarding global deliveries, artisanal materials, sizing guidelines, and our lifetime warranty.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors",
              selectedCategory === cat
                ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-xs"
                : "bg-[var(--surface)] text-[var(--muted-foreground)] border-[var(--border)] hover:text-[var(--foreground)]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordions */}
      <div className="space-y-12">
        {displayedFAQ.map((group) => (
          <div key={group.category} className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)] pb-2 border-b border-[var(--border)]">
              {group.category}
            </h2>

            <Accordion
              items={group.items.map((item, idx) => ({
                id: `${group.category}-${idx}`,
                title: item.question,
                children: <p>{item.answer}</p>,
                defaultOpen: idx === 0 && selectedCategory !== "All",
              }))}
            />
          </div>
        ))}
      </div>

      {/* Concierge Contact Support Box */}
      <div className="mt-20 p-8 rounded-xs border border-[var(--border)] bg-[var(--surface)] text-center space-y-4">
        <h3 className="text-lg font-bold text-[var(--foreground)]">
          Have an unaddressed inquiry?
        </h3>
        <p className="text-xs text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
          Our client advisory concierge is available Monday through Friday, 9:00 AM – 6:00 PM EST.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="mailto:concierge@nova-essentials.com">
            <Button size="sm" className="w-full sm:w-auto">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              <span>concierge@nova-essentials.com</span>
            </Button>
          </a>

          <Link href="/about">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              <span>Read Brand Manifesto</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
