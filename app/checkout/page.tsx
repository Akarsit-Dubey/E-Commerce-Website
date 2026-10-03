"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShippingAddress, DeliveryMethod, Order } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import { safeLocalStorage } from "@/lib/storage";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion/MotionConfig";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  Info,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: "standard",
    title: "Complimentary Standard Delivery",
    description: "Delivered in 3-5 business days via carbon-neutral postal service",
    estimatedDays: "3-5 business days",
    price: 0,
  },
  {
    id: "express",
    title: "Global Express Air",
    description: "Priority air transit via DHL Express with required signature",
    estimatedDays: "1-2 business days",
    price: 18,
  },
  {
    id: "saturday",
    title: "White Glove Concierge Courier",
    description: "Scheduled delivery window with personalized garment unboxing",
    estimatedDays: "Next business day",
    price: 35,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, summary, promoCode, clearCart, isHydrated } = useCart();

  // Address State
  const [address, setAddress] = useState<ShippingAddress>({
    firstName: "Julian",
    lastName: "Sterling",
    email: "julian.sterling@studio-minimal.com",
    phone: "+1 (555) 392-8810",
    addressLine1: "420 Mercer Street, Loft 4B",
    addressLine2: "SoHo",
    city: "New York",
    state: "NY",
    postalCode: "10013",
    country: "United States",
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    DELIVERY_METHODS[0]
  );

  // Payment mock fields
  const [paymentType, setPaymentType] = useState<"card" | "apple-pay">("card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("889");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  // Errors & submission state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Compute final total considering chosen delivery method
  const finalShipping = deliveryMethod.price;
  const finalTotal = summary.subtotal - summary.discount + finalShipping + summary.estimatedTax;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!address.firstName.trim()) newErrors.firstName = "First name is required";
    if (!address.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!address.email.trim() || !address.email.includes("@")) {
      newErrors.email = "Valid email address is required";
    }
    if (!address.addressLine1.trim()) newErrors.addressLine1 = "Street address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state.trim()) newErrors.state = "State / Province is required";
    if (!address.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError("Your shopping bag is empty. Please add items before checking out.");
      return;
    }

    if (!validate()) {
      setSubmitError("Please correct the highlighted fields before placing your order.");
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement delay
    setTimeout(() => {
      const orderId = `NV-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderPayload = {
        id: orderId,
        date: new Date().toISOString(),
        status: "processing",
        items: items.map((i) => ({
          productId: i.productId,
          name: i.product.name,
          slug: i.product.slug,
          image: i.product.images[0],
          color: i.selectedColor.name,
          size: i.selectedSize,
          price: i.product.salePrice ?? i.product.price,
          quantity: i.quantity,
        })),
        shippingAddress: address,
        deliveryMethod,
        paymentLast4: "4242",
        subtotal: summary.subtotal,
        discount: summary.discount,
        shipping: finalShipping,
        tax: summary.estimatedTax,
        total: finalTotal,
      };

      // Save to recent orders in localStorage for account page
      const currentOrders = safeLocalStorage.getItem<Order[]>("nova-orders-v1", []);
      safeLocalStorage.setItem("nova-orders-v1", [orderPayload, ...currentOrders]);

      // Clear the shopping bag
      clearCart();

      // Navigate to order confirmation
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 1200);
  };

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[var(--muted-foreground)]">Preparing secure checkout...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <FadeIn>
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
          className="mb-6"
        />

        {/* Demo Notice Banner */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 rounded-xs text-xs mb-8 flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold uppercase tracking-wider text-[11px]">
              Demo Portfolio Showcase
            </p>
            <p className="mt-0.5 leading-relaxed">
              This checkout flow is a client-side simulation. No live transactions will be billed, and no payment card will be charged.
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Checkout Forms */}
        <FadeIn direction="left" delay={0.05} className="lg:col-span-7">
          <form onSubmit={handlePlaceOrder} className="space-y-10">
            {submitError && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 rounded-xs text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

          {/* Section 1: Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <h2 className="text-sm uppercase tracking-widest font-bold text-[var(--foreground)]">
                01. Contact Details
              </h2>
              <span className="text-xs text-[var(--muted-foreground)]">Required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={address.email}
                  onChange={(e) =>
                    setAddress({ ...address, email: e.target.value })
                  }
                  className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                  placeholder="julian@example.com"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Mobile Telephone *
                </label>
                <input
                  type="tel"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Destination */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <h2 className="text-sm uppercase tracking-widest font-bold text-[var(--foreground)]">
                02. Shipping Destination
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={address.firstName}
                  onChange={(e) =>
                    setAddress({ ...address, firstName: e.target.value })
                  }
                  className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                />
                {errors.firstName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={address.lastName}
                  onChange={(e) =>
                    setAddress({ ...address, lastName: e.target.value })
                  }
                  className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                />
                {errors.lastName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.lastName}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={address.addressLine1}
                  onChange={(e) =>
                    setAddress({ ...address, addressLine1: e.target.value })
                  }
                  placeholder="Street address, apartment, suite"
                  className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                />
                {errors.addressLine1 && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.addressLine1}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                />
                {errors.city && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    State / Prov *
                  </label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                    className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Options */}
          <div className="space-y-4">
            <div className="pb-2 border-b border-[var(--border)]">
              <h2 className="text-sm uppercase tracking-widest font-bold text-[var(--foreground)]">
                03. Delivery Method
              </h2>
            </div>

            <div className="space-y-3">
              {DELIVERY_METHODS.map((method) => {
                const isSelected = deliveryMethod.id === method.id;
                return (
                  <motion.label
                    key={method.id}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setDeliveryMethod(method)}
                    className={`flex items-start justify-between p-4 rounded-xs border cursor-pointer transition-all ${
                      isSelected
                        ? "border-[var(--foreground)] bg-[var(--surface)] ring-1 ring-[var(--foreground)]"
                        : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--foreground)]/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={isSelected}
                        onChange={() => setDeliveryMethod(method)}
                        className="mt-1 accent-[var(--foreground)] cursor-pointer"
                      />
                      <div>
                        <p className="text-xs font-bold text-[var(--foreground)]">
                          {method.title}
                        </p>
                        <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                          {method.description}
                        </p>
                        <p className="text-[10px] text-[var(--accent)] font-semibold mt-1">
                          Est: {method.estimatedDays}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[var(--foreground)] tabular-nums">
                      {method.price === 0 ? "Complimentary" : formatPrice(method.price)}
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </div>

          {/* Section 4: Demo Payment Processing */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <h2 className="text-sm uppercase tracking-widest font-bold text-[var(--foreground)]">
                04. Payment Information
              </h2>
              <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                256-Bit SSL Mock Flow
              </span>
            </div>

            {/* Quick Demo Pay Switch */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentType("card")}
                className={`py-3 px-4 border text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  paymentType === "card"
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit / Debit</span>
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPaymentType("apple-pay")}
                className={`py-3 px-4 border text-xs font-semibold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  paymentType === "apple-pay"
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Express Mock Pay</span>
              </motion.button>
            </div>

            {/* Card Inputs */}
            <div className="p-4 rounded-xs border border-[var(--border)] bg-[var(--surface)]/50 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                  Card Number (Demo)
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Security Code
                  </label>
                  <input
                    type="password"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={billingSameAsShipping}
                onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                className="w-3.5 h-3.5 accent-[var(--accent)]"
              />
              <span>Billing address matches shipping address</span>
            </label>
          </div>

          {/* Place Order CTA */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="w-full h-14 text-xs uppercase tracking-widest font-bold shadow-xl"
            >
              <span>Authorize & Place Order • {formatPrice(finalTotal)}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-[11px] text-[var(--muted-foreground)] text-center mt-3">
              By authorizing, you agree to NOVA’s terms of service and client care protocols.
            </p>
          </div>
        </form>
      </FadeIn>

      {/* Right Column: Order Summary Sidebar */}
      <FadeIn direction="right" delay={0.1} className="lg:col-span-5">
        <aside className="p-6 rounded-xs border border-[var(--border)] bg-[var(--surface)] space-y-6 sticky top-28">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)] pb-3 border-b border-[var(--border)]">
            Bag Summary ({summary.itemCount} Items)
          </h3>

          {/* Items Mini List */}
          <div className="divide-y divide-[var(--border)] max-h-80 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center text-xs">
                <div className="relative w-12 h-14 bg-[var(--background)] rounded-xs overflow-hidden shrink-0 border border-[var(--border)]">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[var(--foreground)] truncate">
                    {item.product.name}
                  </p>
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                    {item.selectedColor.name} · Size {item.selectedSize} · Qty {item.quantity}
                  </p>
                </div>
                <span className="font-medium text-[var(--foreground)] tabular-nums">
                  {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Calculations Breakdown */}
          <div className="space-y-2 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[var(--foreground)] tabular-nums">
                {formatPrice(summary.subtotal)}
              </span>
            </div>
            {summary.discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Promotion ({promoCode})</span>
                <span className="tabular-nums">-{formatPrice(summary.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery ({deliveryMethod.title.split(" ")[0]})</span>
              <span className="text-[var(--foreground)] tabular-nums">
                {finalShipping === 0 ? "Complimentary" : formatPrice(finalShipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax</span>
              <span className="text-[var(--foreground)] tabular-nums">
                {formatPrice(summary.estimatedTax)}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[var(--border)] text-base font-bold text-[var(--foreground)]">
              <span>Total Due</span>
              <span className="tabular-nums">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Reassurance */}
          <div className="pt-2 border-t border-[var(--border)] space-y-2 text-[11px] text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>30-Day complimentary return privileges</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Lifetime repair warranty included</span>
            </div>
          </div>
        </aside>
      </FadeIn>
    </div>
  </div>
);
}
