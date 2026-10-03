"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, PackageCheck, ArrowRight, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "NV-892401";

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
      {/* Icon & Badge */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground)] border border-[var(--border)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Order Confirmed (Demo)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
          Thank you for your acquisition.
        </h1>

        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
          Your order <strong className="text-[var(--foreground)] font-mono">{orderId}</strong> has been received by our atelier dispatch center. A simulated confirmation dispatch has been sent.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="p-6 rounded-xs border border-[var(--border)] bg-[var(--surface)] text-left space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
          <PackageCheck className="w-5 h-5 text-[var(--accent)] shrink-0" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
              Next Steps in Fulfillment
            </h3>
            <p className="text-[11px] text-[var(--muted-foreground)]">
              Estimated delivery: 2-4 business days via DHL Express
            </p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[var(--muted-foreground)] leading-relaxed">
          <p>
            • Every garment is hand-inspected, steamed, and packaged in FSC-certified protective materials.
          </p>
          <p>
            • You can view simulated order history and shipment tracking anytime in your <Link href="/account" className="text-[var(--foreground)] underline font-medium">Account Dashboard</Link>.
          </p>
          <p className="pt-2 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
            * This was a client-side simulated demonstration. No card was charged.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link href="/shop" className="w-full sm:w-auto">
          <Button size="md" className="w-full sm:w-auto px-8">
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        <Link href="/account" className="w-full sm:w-auto">
          <Button variant="outline" size="md" className="w-full sm:w-auto px-6">
            <Home className="w-4 h-4 mr-2" />
            <span>View Account Orders</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs">Loading confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
