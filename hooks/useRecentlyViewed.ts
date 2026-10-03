"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "@/types/product";
import { safeLocalStorage } from "@/lib/storage";
import { PRODUCTS } from "@/data/products";

const STORAGE_KEY = "nova-recently-viewed-v1";
const MAX_RECENT = 8;

export function useRecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const ids = safeLocalStorage.getItem<string[]>(STORAGE_KEY, []);
    const matching = ids
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
    setRecentProducts(matching);
  }, []);

  const addRecentlyViewed = useCallback((productId: string) => {
    const currentIds = safeLocalStorage.getItem<string[]>(STORAGE_KEY, []);
    const filtered = currentIds.filter((id) => id !== productId);
    const updated = [productId, ...filtered].slice(0, MAX_RECENT);
    safeLocalStorage.setItem(STORAGE_KEY, updated);

    const matching = updated
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
    setRecentProducts(matching);
  }, []);

  return { recentProducts, addRecentlyViewed };
}
