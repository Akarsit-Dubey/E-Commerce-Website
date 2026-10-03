"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Sun, Moon, Menu } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useTheme } from "@/hooks/useTheme";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Clothing", href: "/shop?category=clothing" },
  { label: "Footwear", href: "/shop?category=shoes" },
  { label: "Bags", href: "/shop?category=bags" },
  { label: "Accessories", href: "/shop?category=accessories" },
  { label: "Essentials", href: "/shop?category=essentials" },
  { label: "Story", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const { summary, openCart, isHydrated: cartHydrated } = useCart();
  const { wishlist, isHydrated: wishlistHydrated } = useWishlist();
  const { resolvedTheme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cartAnimate, setCartAnimate] = useState(false);
  const [wishlistAnimate, setWishlistAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bump cart on count increase
  useEffect(() => {
    if (summary.itemCount > 0) {
      setCartAnimate(true);
      const timer = setTimeout(() => setCartAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [summary.itemCount]);

  // Bump wishlist on count change
  useEffect(() => {
    if (wishlist.length > 0) {
      setWishlistAnimate(true);
      const timer = setTimeout(() => setWishlistAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [wishlist.length]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-[var(--background)]/85 backdrop-blur-md border-[var(--border)] shadow-xs"
            : "bg-[var(--background)] border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open navigation menu"
                className="p-2 -ml-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors active:scale-95"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="group flex flex-col items-center sm:items-start text-left"
              >
                <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
                  NOVA
                </span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-[var(--muted-foreground)] -mt-1 font-medium">
                  Modern Essentials
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links with animated active underline */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/shop" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xs uppercase tracking-widest transition-colors font-medium relative py-1 hover:text-[var(--foreground)]",
                      isActive
                        ? "text-[var(--foreground)]"
                        : "text-[var(--muted-foreground)]"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent)]"
                        transition={{
                          type: shouldReduceMotion ? "tween" : "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons with micro-interactions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <Link
                href="/search"
                aria-label="Search catalog"
                className="p-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors rounded-xs hover:bg-[var(--surface)] active:scale-95"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                className="p-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors rounded-xs hover:bg-[var(--surface)] active:scale-95"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label={`Wishlist with ${wishlistHydrated ? wishlist.length : 0} items`}
                className="relative p-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors rounded-xs hover:bg-[var(--surface)] active:scale-95"
              >
                <motion.div
                  animate={wishlistAnimate && !shouldReduceMotion ? { scale: [1, 1.25, 0.9, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                {wishlistHydrated && wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-[var(--accent)] rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                aria-label="Client account"
                className="hidden sm:inline-flex p-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors rounded-xs hover:bg-[var(--surface)] active:scale-95"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Button with Reactive Bump */}
              <button
                type="button"
                onClick={openCart}
                aria-label={`Shopping bag with ${cartHydrated ? summary.itemCount : 0} items`}
                className="relative p-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors rounded-xs hover:bg-[var(--surface)] active:scale-95"
              >
                <motion.div
                  animate={cartAnimate && !shouldReduceMotion ? { scale: [1, 1.3, 0.9, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                {cartHydrated && summary.itemCount > 0 && (
                  <motion.span
                    key={summary.itemCount}
                    initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-[var(--background)] bg-[var(--foreground)] rounded-full"
                  >
                    {summary.itemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
}
