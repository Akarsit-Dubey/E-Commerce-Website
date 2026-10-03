"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

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

  if (!isOpen) return null;

  const sideAnimations = {
    right: "right-0 top-0 bottom-0 max-w-md w-full animate-in slide-in-from-right duration-300",
    left: "left-0 top-0 bottom-0 max-w-md w-full animate-in slide-in-from-left duration-300",
    bottom: "bottom-0 left-0 right-0 max-h-[85vh] w-full animate-in slide-in-from-bottom duration-300",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Drawer panel"}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        aria-hidden="true"
      />

      {/* Sheet Content */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed z-50 flex flex-col bg-[var(--background)] border-[var(--border)] shadow-2xl focus:outline-none",
          side === "right" && "border-l",
          side === "left" && "border-r",
          side === "bottom" && "border-t rounded-t-xl",
          sideAnimations[side],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          {title ? (
            <h2 className="text-base font-semibold tracking-tight text-[var(--foreground)]">
              {title}
            </h2>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 -mr-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors rounded-sm hover:bg-[var(--surface)]"
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
      </div>
    </div>
  );
}
