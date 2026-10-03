"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.filter((item) => item.defaultOpen).map((item) => item.id)
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) {
        return prev.filter((i) => i !== id);
      } else {
        return allowMultiple ? [...prev, id] : [id];
      }
    });
  };

  return (
    <div className={cn("divide-y divide-[var(--border)] border-y border-[var(--border)]", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="py-1">
            <h3>
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
                id={`accordion-trigger-${item.id}`}
                className="flex w-full items-center justify-between py-4 text-left font-medium text-sm sm:text-base text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-[var(--muted-foreground)] transition-transform duration-200 shrink-0 ml-4",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </h3>

            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${item.id}`}
                className="pb-5 pt-1 text-sm text-[var(--muted-foreground)] leading-relaxed animate-in fade-in duration-200"
              >
                {item.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
