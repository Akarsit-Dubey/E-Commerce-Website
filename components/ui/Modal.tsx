"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { editorialEase } from "@/components/motion/MotionConfig";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  maxWidth = "md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.96,
              y: shouldReduceMotion ? 0 : 12,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.96,
              y: shouldReduceMotion ? 0 : 8,
            }}
            transition={{ duration: 0.25, ease: editorialEase }}
            className={cn(
              "relative w-full rounded-xs border border-[var(--border)] bg-[var(--background)] p-6 shadow-2xl focus:outline-none z-10",
              widthClasses[maxWidth],
              className
            )}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                {title && (
                  <h3
                    id="modal-title"
                    className="text-base font-bold uppercase tracking-wider text-[var(--foreground)]"
                  >
                    {title}
                  </h3>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="text-xs text-[var(--muted-foreground)] mt-1"
                  >
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1 -mr-1 -mt-1 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors rounded-xs hover:bg-[var(--surface)] active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
