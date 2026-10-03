"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle2, AlertCircle, Info, ShoppingBag } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "cart";

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, "id">) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, type = "info", duration = 4000, action }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = { id, title, message, type, duration, action };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      {/* Toast rendering container */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
        aria-live="polite"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-md border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-lg backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 duration-300"
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              )}
              {toast.type === "info" && (
                <Info className="w-5 h-5 text-[var(--accent)]" />
              )}
              {toast.type === "cart" && (
                <ShoppingBag className="w-5 h-5 text-[var(--accent)]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
              {toast.action && (
                <button
                  onClick={() => {
                    toast.action?.onClick();
                    dismissToast(toast.id);
                  }}
                  className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] hover:underline"
                >
                  {toast.action.label}
                </button>
              )}
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
