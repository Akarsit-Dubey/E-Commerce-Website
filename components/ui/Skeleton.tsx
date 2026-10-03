import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-[var(--surface-hover)] dark:bg-neutral-800/60",
        className
      )}
      {...props}
    />
  );
}
