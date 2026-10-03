"use client";

import React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { CATEGORIES } from "@/data/categories";
import { Heart, User, Sun, Moon } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useTheme } from "@/hooks/useTheme";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { wishlist } = useWishlist();
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="left" title="Menu">
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-6 pt-2">
          {/* Main Links */}
          <div className="space-y-1">
            <Link
              href="/shop"
              onClick={onClose}
              className="block py-2.5 text-base font-medium tracking-wide text-[var(--foreground)] hover:text-[var(--accent)] transition-colors border-b border-[var(--border)]/40"
            >
              Shop All
            </Link>
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.id}`}
                onClick={onClose}
                className="block py-2.5 text-sm font-normal text-[var(--foreground)]/80 hover:text-[var(--accent)] transition-colors border-b border-[var(--border)]/40"
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={onClose}
              className="block py-2.5 text-sm font-medium tracking-wide text-[var(--foreground)] hover:text-[var(--accent)] transition-colors border-b border-[var(--border)]/40"
            >
              Brand Story
            </Link>
            <Link
              href="/faq"
              onClick={onClose}
              className="block py-2.5 text-sm font-medium tracking-wide text-[var(--foreground)] hover:text-[var(--accent)] transition-colors border-b border-[var(--border)]/40"
            >
              FAQ & Client Care
            </Link>
          </div>

          {/* Quick Access */}
          <div className="pt-4 space-y-3">
            <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)] font-semibold">
              Account & Saved
            </p>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-sm text-[var(--foreground)] hover:text-[var(--accent)]"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-[var(--muted-foreground)]" />
                <span>Wishlist</span>
              </div>
              {wishlist.length > 0 && (
                <span className="text-xs bg-[var(--surface)] text-[var(--foreground)] font-semibold px-2 py-0.5 rounded-full border border-[var(--border)]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2.5 py-2 text-sm text-[var(--foreground)] hover:text-[var(--accent)]"
            >
              <User className="w-4 h-4 text-[var(--muted-foreground)]" />
              <span>My Account</span>
            </Link>
          </div>
        </div>

        {/* Footer controls inside drawer */}
        <div className="pt-8 pb-4 border-t border-[var(--border)] flex items-center justify-between">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--foreground)] hover:text-[var(--accent)] p-2 rounded-sm bg-[var(--surface)]"
          >
            {resolvedTheme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          <span className="text-xs text-[var(--muted-foreground)]">
            NOVA Studio © 2026
          </span>
        </div>
      </div>
    </Drawer>
  );
}
