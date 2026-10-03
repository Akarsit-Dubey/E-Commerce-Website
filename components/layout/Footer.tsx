"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[var(--surface)] text-[var(--foreground)] border-t border-[var(--border)] pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[var(--border)]">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-extrabold tracking-[0.25em] text-[var(--foreground)]">
              NOVA
            </span>
            <p className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
              Modern essentials designed for everyday life.
            </p>
            <p className="text-sm text-[var(--muted-foreground)] max-w-sm leading-relaxed">
              We design purposeful garments and functional artifacts guided by reduction, exceptional natural textiles, and multi-generational European and Japanese craft.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-2">
                Join The NOVA Dispatch
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] mb-3">
                Receive private collection previews, atelier essays, and 10% off your initial acquisition.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-sm text-xs font-medium border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Welcome to NOVA. Your private code NOVA10 has been issued.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    aria-label="Email for newsletter subscription"
                    className="flex-1 bg-[var(--background)] border border-[var(--border)] px-3.5 py-2.5 text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:border-[var(--foreground)] rounded-l-sm"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2.5 text-xs font-medium uppercase tracking-wider rounded-r-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--foreground)] mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/shop"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  All Products
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.id}`}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Client Care Column */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--foreground)] mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted-foreground)]">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Shipping & Deliveries
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Textile Care & Sizing
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Order Tracking
                </Link>
              </li>
              <li>
                <a
                  href="mailto:concierge@nova-essentials.com"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Concierge Support
                </a>
              </li>
            </ul>
          </div>

          {/* Studio & Ethics */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--foreground)] mb-4">
              Studio
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted-foreground)]">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Ateliers & Sourcing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  Circular Sustainability
                </Link>
              </li>
              <li>
                <span className="text-[var(--muted-foreground)]/60">
                  Stockholm · Zurich · Tokyo
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <p>© {new Date().getFullYear()} NOVA Studio Inc. All rights reserved. Demo e-commerce showcase.</p>
          <div className="flex items-center gap-6">
            <span className="cursor-default">USD ($) — Global</span>
            <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-[var(--foreground)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
