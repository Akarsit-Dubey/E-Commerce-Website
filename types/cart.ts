import { Product, ProductColor } from "./product";

export interface CartItem {
  id: string; // Composite key: ${product.id}-${color.name}-${size}
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
  addedAt: string;
}

export interface SavedItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  savedAt: string;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  promoCode?: string;
  shipping: number;
  estimatedTax: number;
  total: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  itemCount: number;
}
