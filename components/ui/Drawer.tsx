"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { editorialEase } from "@/components/motion/MotionConfig";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "right" | "left" | "bottom";
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
  className,
  footer,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Close on Escape & Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }
    if (side === "right") {
      return {
        hidden: { x: "100%", opacity: 0.5 },
        visible: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0.5 },
      };
    }
    if (side === "left") {
      return {
        hidden: { x: "-100%", opacity: 0.5 },
        visible: { x: 0, opacity: 1 },
        exit: { x: "-100%", opacity: 0.5 },
      };
    }
    return {
      hidden: { y: "100%", opacity: 0.5 },
      visible: { y: 0, opacity: 1 },
      exit: { y: "100%", opacity: 0.5 },
    };
  };

  const variants = getVariants();

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label={title || "Drawer panel"}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Sheet Content */}
          <motion.div
            ref={drawerRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{
              type: shouldReduceMotion ? "tween" : "spring",
              damping: 32,
              stiffness: 320,
              ease: editorialEase,
            }}
            className={cn(
              "fixed z-50 flex flex-col bg-[var(--background)] border-[var(--border)] shadow-2xl focus:outline-none",
              side === "right" && "right-0 top-0 bottom-0 max-w-md w-full border-l",
              side === "left" && "left-0 top-0 bottom-0 max-w-md w-full border-r",
              side === "bottom" && "bottom-0 left-0 right-0 max-h-[85vh] w-full border-t rounded-t-xl",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              {title ? (
                <h2 className="text-sm uppercase tracking-wider font-bold text-[var(--foreground)]">
                  {title}
                </h2>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="p-1.5 -mr-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors rounded-xs hover:bg-[var(--surface)] active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

            {/* Optional Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-[var(--border)] bg-[var(--surface)]/50">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
