"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Product, ProductColor } from "@/types/product";
import { CartItem, SavedItem, CartSummary } from "@/types/cart";
import { safeLocalStorage } from "@/lib/storage";

const CART_STORAGE_KEY = "nova-cart-items-v1";
const SAVED_STORAGE_KEY = "nova-saved-items-v1";
const PROMO_STORAGE_KEY = "nova-promo-code-v1";

const FREE_SHIPPING_THRESHOLD = 150;
const STANDARD_SHIPPING_COST = 12;
const TAX_RATE = 0.08;

const VALID_PROMOS: Record<string, number> = {
  NOVA10: 0.10,
  WELCOME20: 0.20,
  SUMMER15: 0.15,
};

interface CartContextType {
  items: CartItem[];
  savedItems: SavedItem[];
  summary: CartSummary;
  isCartOpen: boolean;
  promoCode: string | null;
  promoDiscountRate: number;
  promoError: string | null;
  isHydrated: boolean;
  addItem: (product: Product, color: ProductColor, size: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  removeSavedItem: (id: string) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = safeLocalStorage.getItem<CartItem[]>(CART_STORAGE_KEY, []);
    const storedSaved = safeLocalStorage.getItem<SavedItem[]>(SAVED_STORAGE_KEY, []);
    const storedPromo = safeLocalStorage.getItem<string | null>(PROMO_STORAGE_KEY, null);

    setItems(storedCart);
    setSavedItems(storedSaved);
    if (storedPromo && VALID_PROMOS[storedPromo.toUpperCase()]) {
      setPromoCode(storedPromo.toUpperCase());
    }
    setIsHydrated(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    safeLocalStorage.setItem(CART_STORAGE_KEY, items);
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    safeLocalStorage.setItem(SAVED_STORAGE_KEY, savedItems);
  }, [savedItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    if (promoCode) {
      safeLocalStorage.setItem(PROMO_STORAGE_KEY, promoCode);
    } else {
      safeLocalStorage.removeItem(PROMO_STORAGE_KEY);
    }
  }, [promoCode, isHydrated]);

  const promoDiscountRate = useMemo(() => {
    if (!promoCode) return 0;
    return VALID_PROMOS[promoCode.toUpperCase()] || 0;
  }, [promoCode]);

  const summary: CartSummary = useMemo(() => {
    const subtotal = items.reduce((acc, item) => {
      const price = item.product.salePrice ?? item.product.price;
      return acc + price * item.quantity;
    }, 0);

    const discount = subtotal * promoDiscountRate;
    const discountedSubtotal = Math.max(0, subtotal - discount);

    const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
    const shipping = isFreeShipping ? 0 : STANDARD_SHIPPING_COST;

    const estimatedTax = discountedSubtotal * TAX_RATE;
    const total = discountedSubtotal + shipping + estimatedTax;

    const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      subtotal,
      discount,
      promoCode: promoCode ?? undefined,
      shipping,
      estimatedTax,
      total,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      remainingForFreeShipping,
      itemCount,
    };
  }, [items, promoDiscountRate, promoCode]);

  const addItem = useCallback(
    (product: Product, color: ProductColor, size: string, quantity = 1) => {
      setItems((prev) => {
        const itemId = `${product.id}-${color.name}-${size}`;
        const existingIndex = prev.findIndex((i) => i.id === itemId);

        if (existingIndex > -1) {
          const updated = [...prev];
          const newQty = Math.min(
            product.inventory,
            updated[existingIndex].quantity + quantity
          );
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          return updated;
        }

        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity: Math.min(product.inventory, Math.max(1, quantity)),
          addedAt: new Date().toISOString(),
        };
        return [newItem, ...prev];
      });

      setIsCartOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const clamped = Math.min(item.product.inventory, quantity);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  }, []);

  const saveForLater = useCallback((id: string) => {
    setItems((prev) => {
      const itemToSave = prev.find((item) => item.id === id);
      if (!itemToSave) return prev;

      setSavedItems((savedPrev) => {
        const alreadySaved = savedPrev.find((s) => s.id === itemToSave.id);
        if (alreadySaved) return savedPrev;
        return [
          {
            id: itemToSave.id,
            productId: itemToSave.productId,
            product: itemToSave.product,
            selectedColor: itemToSave.selectedColor,
            selectedSize: itemToSave.selectedSize,
            savedAt: new Date().toISOString(),
          },
          ...savedPrev,
        ];
      });

      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const moveToCart = useCallback(
    (id: string) => {
      const itemToMove = savedItems.find((s) => s.id === id);
      if (!itemToMove) return;

      addItem(itemToMove.product, itemToMove.selectedColor, itemToMove.selectedSize, 1);
      setSavedItems((prev) => prev.filter((s) => s.id !== id));
    },
    [savedItems, addItem]
  );

  const removeSavedItem = useCallback((id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const applyPromoCode = useCallback((code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (VALID_PROMOS[cleanCode]) {
      setPromoCode(cleanCode);
      setPromoError(null);
      return true;
    }
    setPromoError("Invalid promotional code. Try 'NOVA10' or 'WELCOME20'.");
    return false;
  }, []);

  const removePromoCode = useCallback(() => {
    setPromoCode(null);
    setPromoError(null);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        savedItems,
        summary,
        isCartOpen,
        promoCode,
        promoDiscountRate,
        promoError,
        isHydrated,
        addItem,
        removeItem,
        updateQuantity,
        saveForLater,
        moveToCart,
        removeSavedItem,
        applyPromoCode,
        removePromoCode,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
