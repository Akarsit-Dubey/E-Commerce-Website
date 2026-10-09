import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Compass } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mx-auto text-[var(--muted-foreground)]">
          <Compass className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[var(--accent)] font-semibold">
            Status 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Artifact Not Located
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            The page or catalog reference you are seeking has been relocated, archived, or is temporarily unavailable.
          </p>
        </div>

        {/* Quick Discipline Links */}
        <div className="pt-2 pb-4">
          <p className="text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-2.5">
            Explore Curated Collections
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className="px-3 py-1.5 rounded-full text-xs bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" size="md" className="w-full sm:w-auto px-6">
            <span>Return Home</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
          <Button href="/shop" variant="outline" size="md" className="w-full sm:w-auto px-6">
            Browse All Products
          </Button>
        </div>
      </div>
    </div>
  );
}
