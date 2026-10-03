"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 active:scale-[0.99] shadow-sm",
      secondary:
        "bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] active:scale-[0.99]",
      outline:
        "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)] hover:border-[var(--foreground)] active:scale-[0.99]",
      ghost:
        "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)] active:scale-[0.99]",
      link: "text-[var(--foreground)] underline-offset-4 hover:underline p-0 h-auto font-normal",
      accent:
        "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90 active:scale-[0.99] shadow-sm",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs tracking-wider uppercase font-semibold rounded-sm",
      md: "h-11 px-5 text-sm tracking-wide rounded-sm",
      lg: "h-13 px-8 text-base tracking-wide rounded-sm",
      icon: "h-10 w-10 p-0 rounded-sm shrink-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
