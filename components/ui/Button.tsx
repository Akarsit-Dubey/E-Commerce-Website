"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const baseStyles =
  "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]";

const variantStyles = {
  primary:
    "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 shadow-xs hover:shadow-sm",
  secondary:
    "bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)] border border-[var(--border)]/60",
  outline:
    "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)] hover:border-[var(--foreground)]",
  ghost:
    "bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)]",
  link: "text-[var(--foreground)] underline-offset-4 hover:underline p-0 h-auto font-normal active:scale-100",
  accent:
    "bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-95 shadow-xs hover:shadow-sm",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs tracking-wider uppercase font-semibold rounded-xs",
  md: "h-11 px-5 text-xs sm:text-sm tracking-wide rounded-xs",
  lg: "h-13 px-8 text-sm sm:text-base tracking-wide rounded-xs",
  icon: "h-10 w-10 p-0 rounded-xs shrink-0",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
} = {}) {
  return cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );
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
      href,
      target,
      rel,
      type = "button",
      ...props
    },
    ref
  ) => {
    if (href) {
      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");

      if (isExternal) {
        return (
          <a
            href={href}
            target={target}
            rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
            onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
            className={cn(
              baseStyles,
              variantStyles[variant],
              sizeStyles[size],
              className
            )}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />}
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
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

