/**
 * SSR-safe wrapper around localStorage with fallback handling.
 */

export const safeLocalStorage = {
  getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  setItem<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event to sync states if needed
      window.dispatchEvent(new Event(`local-storage-${key}`));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  },

  removeItem(key: string): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event(`local-storage-${key}`));
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  },
};
