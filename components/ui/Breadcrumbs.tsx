import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs text-[var(--muted-foreground)]", className)}>
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)]/50 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-medium text-[var(--foreground)] line-clamp-1 max-w-[200px] sm:max-w-none" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[var(--foreground)] transition-colors line-clamp-1 max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
