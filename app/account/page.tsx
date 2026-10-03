"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_USER, MOCK_SAVED_ADDRESSES, MOCK_ORDERS } from "@/data/orders";
import { Order } from "@/types/order";
import { SavedAddress } from "@/types/user";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { safeLocalStorage } from "@/lib/storage";
import { formatPrice, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { motion, AnimatePresence } from "framer-motion";
import { editorialEase } from "@/components/motion/MotionConfig";
import {
  User,
  Package,
  MapPin,
  Settings,
  Plus,
  Truck,
  LogOut,
} from "lucide-react";

type AccountTab = "orders" | "profile" | "addresses" | "settings";

export default function AccountPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<AccountTab>("orders");

  // State
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [addresses, setAddresses] = useState<SavedAddress[]>(MOCK_SAVED_ADDRESSES);
  const [userProfile, setUserProfile] = useState(MOCK_USER);

  // Tracking modal
  const [selectedOrderTracking, setSelectedOrderTracking] = useState<Order | null>(null);

  // Address modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddressLabel, setNewAddressLabel] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");

  // Load any local simulated orders placed in checkout
  useEffect(() => {
    const localOrders = safeLocalStorage.getItem<Order[]>("nova-orders-v1", []);
    if (localOrders.length > 0) {
      setOrders([...localOrders, ...MOCK_ORDERS]);
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      title: "Profile saved",
      message: "Your contact details and preferences have been updated.",
      type: "success",
    });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim() || !newCity.trim()) return;

    const newAddr: SavedAddress = {
      id: `addr_${Date.now()}`,
      label: newAddressLabel.trim() || "Delivery Location",
      isDefault: false,
      firstName: userProfile.name.split(" ")[0] || "Julian",
      lastName: userProfile.name.split(" ")[1] || "Sterling",
      email: userProfile.email,
      phone: userProfile.phone,
      addressLine1: newStreet.trim(),
      city: newCity.trim(),
      state: newState.trim() || "NY",
      postalCode: newZip.trim() || "10001",
      country: "United States",
    };

    setAddresses([...addresses, newAddr]);
    setIsAddressModalOpen(false);
    setNewAddressLabel("");
    setNewStreet("");
    setNewCity("");
    setNewState("");
    setNewZip("");

    showToast({
      title: "Address saved",
      message: `${newAddr.label} added to your address book.`,
      type: "success",
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    showToast({
      title: "Default updated",
      message: "Default shipping address set.",
      type: "info",
    });
  };

  return (
    <div className="max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Client Account" }]}
        className="mb-8"
      />

      {/* Header Profile Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 rounded-xs border border-[var(--border)] bg-[var(--surface)] mb-10">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[var(--background)] border border-[var(--border)] shrink-0">
            {userProfile.avatarUrl ? (
              <Image
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-lg">
                {userProfile.name[0]}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--foreground)]">
                {userProfile.name}
              </h1>
              <Badge variant="accent">NOVA Patron</Badge>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              {userProfile.email} · Member since {userProfile.memberSince}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              showToast({
                title: "Logged out (Demo)",
                message: "Authentication placeholder active.",
                type: "info",
              })
            }
            className="text-xs text-[var(--muted-foreground)] hover:text-rose-600 transition-colors inline-flex items-center gap-1.5 p-2 rounded-xs hover:bg-[var(--background)]"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Navigation Tabs + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <nav className="flex lg:flex-col gap-1 border-b lg:border-b-0 lg:border-r border-[var(--border)] pb-4 lg:pb-0 pr-0 lg:pr-6 text-xs font-semibold uppercase tracking-wider overflow-x-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2.5 py-3 px-3.5 rounded-xs transition-colors text-left shrink-0 ${
                activeTab === "orders"
                  ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2.5 py-3 px-3.5 rounded-xs transition-colors text-left shrink-0 ${
                activeTab === "profile"
                  ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Details</span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`flex items-center gap-2.5 py-3 px-3.5 rounded-xs transition-colors text-left shrink-0 ${
                activeTab === "addresses"
                  ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2.5 py-3 px-3.5 rounded-xs transition-colors text-left shrink-0 ${
                activeTab === "settings"
                  ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Preferences</span>
            </button>
          </nav>
        </aside>

        {/* Tab Content Panels */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: editorialEase }}
            >
              {/* TAB 1: ORDERS */}
              {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <h2 className="text-base font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Order Archives
                </h2>
                <span className="text-xs text-[var(--muted-foreground)]">
                  {orders.length} Past Purchases
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-16 text-center text-xs text-[var(--muted-foreground)]">
                  No previous orders placed yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[var(--border)] rounded-xs bg-[var(--card)] p-5 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border)] text-xs">
                        <div>
                          <span className="font-bold text-[var(--foreground)] mr-3">
                            Order {order.id}
                          </span>
                          <span className="text-[var(--muted-foreground)]">
                            Placed on {formatDate(order.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="capitalize font-semibold px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            {order.status}
                          </span>
                          <span className="font-bold text-[var(--foreground)] tabular-nums">
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-[var(--border)]">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="py-3 flex items-center justify-between gap-4 text-xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-12 h-14 bg-[var(--surface)] rounded-xs overflow-hidden shrink-0 border border-[var(--border)]">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="48px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <Link
                                  href={`/products/${item.slug}`}
                                  className="font-medium text-[var(--foreground)] hover:underline truncate block"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-[11px] text-[var(--muted-foreground)]">
                                  {item.color} · Size {item.size} · Qty {item.quantity}
                                </p>
                              </div>
                            </div>

                            <span className="font-semibold text-[var(--foreground)] tabular-nums shrink-0">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div className="text-[11px] text-[var(--muted-foreground)]">
                          {order.trackingNumber ? (
                            <span>Tracking: <strong className="font-mono text-[var(--foreground)]">{order.trackingNumber}</strong></span>
                          ) : (
                            <span>Estimated dispatch within 24 hours</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrderTracking(order)}
                          >
                            <Truck className="w-3.5 h-3.5 mr-1" />
                            <span>Track Package</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-6 max-w-xl">
              <div className="pb-3 border-b border-[var(--border)]">
                <h2 className="text-base font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Personal Information
                </h2>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Manage your personal credentials and communication preferences.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                    className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                    className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, phone: e.target.value })
                    }
                    className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2.5 text-xs rounded-xs focus:outline-none focus:border-[var(--foreground)]"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" size="sm">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-wider text-[var(--foreground)]">
                    Saved Addresses
                  </h2>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                    Manage your primary delivery locations.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-xs"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  <span>Add Location</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-5 rounded-xs border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[var(--foreground)]">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <Badge variant="accent">Default</Badge>
                        )}
                      </div>
                      <p className="text-xs text-[var(--foreground)] font-medium">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">
                        {addr.addressLine1}
                        {addr.addressLine2 && `, ${addr.addressLine2}`}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {addr.city}, {addr.state} {addr.postalCode}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">
                        {addr.country}
                      </p>
                    </div>

                    {!addr.isDefault && (
                      <div className="pt-2 border-t border-[var(--border)]">
                        <button
                          onClick={() => handleSetDefaultAddress(addr.id)}
                          className="text-[11px] font-semibold text-[var(--accent)] hover:underline"
                        >
                          Set as Default Shipping Address
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-xl">
              <div className="pb-3 border-b border-[var(--border)]">
                <h2 className="text-base font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Preferences & Localization
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-4 rounded-xs border border-[var(--border)] bg-[var(--surface)]">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">
                      Preferred Display Currency
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                      Prices rendered in standard international rates.
                    </p>
                  </div>
                  <span className="font-mono font-semibold">USD ($)</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xs border border-[var(--border)] bg-[var(--surface)]">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">
                      Collection Bulletins & Invitations
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                      Receive notifications for private sample sales.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-[var(--accent)]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xs border border-[var(--border)] bg-[var(--surface)]">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">
                      Two-Factor Security Authentication
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                      Hardware keys and SMS authenticator app readiness.
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                    Configured
                  </span>
                </div>
              </div>
            </div>
          )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Package Tracking Dialog */}
      {selectedOrderTracking && (
        <Modal
          isOpen={Boolean(selectedOrderTracking)}
          onClose={() => setSelectedOrderTracking(null)}
          title={`Shipment Progress • ${selectedOrderTracking.id}`}
          description={`Carrier: DHL Express (Tracking ${selectedOrderTracking.trackingNumber || "DHL-98129841029"})`}
        >
          <div className="space-y-6 pt-2 text-xs">
            <div className="space-y-4 relative pl-6 border-l-2 border-[var(--accent)]">
              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--background)]" />
                <p className="font-bold text-[var(--foreground)]">
                  Out for Final Delivery
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  Courier van in transit to {selectedOrderTracking.shippingAddress.city}, {selectedOrderTracking.shippingAddress.state}
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-[var(--muted)] ring-4 ring-[var(--background)]" />
                <p className="font-semibold text-[var(--foreground)]">
                  Customs Cleared & Scanned at Gateway
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  JFK Airport International Cargo Terminal
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-[var(--muted)] ring-4 ring-[var(--background)]" />
                <p className="font-semibold text-[var(--foreground)]">
                  Dispatched from European Fulfillment Center
                </p>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  Porto Atelier Logistics Center
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrderTracking(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add New Address"
        description="Enter recipient location for future acquisitions"
      >
        <form onSubmit={handleAddAddress} className="space-y-4 pt-2 text-xs">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
              Location Label (e.g. Studio, Summer Residence)
            </label>
            <input
              type="text"
              required
              value={newAddressLabel}
              onChange={(e) => setNewAddressLabel(e.target.value)}
              placeholder="Design Studio"
              className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2 text-xs rounded-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
              Street Address
            </label>
            <input
              type="text"
              required
              value={newStreet}
              onChange={(e) => setNewStreet(e.target.value)}
              placeholder="100 Grand Street, Suite 500"
              className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2 text-xs rounded-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="New York"
                className="w-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-3.5 py-2 text-xs rounded-xs"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1">
                State / Zip
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                  placeholder="NY"
                  className="w-16 bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-2 py-2 text-xs rounded-xs uppercase"
                />
                <input
                  type="text"
                  required
                  value={newZip}
                  onChange={(e) => setNewZip(e.target.value)}
                  placeholder="10013"
                  className="flex-1 bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] px-2.5 py-2 text-xs rounded-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAddressModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
