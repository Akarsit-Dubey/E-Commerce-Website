"use client";

import { useEffect, useState, useCallback } from "react";
import { safeLocalStorage } from "@/lib/storage";

const STORAGE_KEY = "nova-recent-searches-v1";
const MAX_SEARCHES = 6;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = safeLocalStorage.getItem<string[]>(STORAGE_KEY, [
      "Cashmere",
      "Overcoat",
      "Leather Sneaker",
      "Tote",
    ]);
    setRecentSearches(saved);
  }, []);

  const addSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_SEARCHES);
      safeLocalStorage.setItem(STORAGE_KEY, updated);
      return updated;
    });
  }, []);

  const removeSearch = useCallback((query: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item !== query);
      safeLocalStorage.setItem(STORAGE_KEY, updated);
      return updated;
    });
  }, []);

  const clearSearches = useCallback(() => {
    setRecentSearches([]);
    safeLocalStorage.removeItem(STORAGE_KEY);
  }, []);

  return { recentSearches, addSearch, removeSearch, clearSearches };
}
