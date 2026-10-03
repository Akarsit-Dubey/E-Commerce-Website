export type ProductCategory =
  | "clothing"
  | "shoes"
  | "accessories"
  | "bags"
  | "essentials";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  price: number;
  salePrice?: number;
  category: ProductCategory;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
  inventory: number;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  details: string[];
  materials: string;
  careInstructions: string[];
  reviews: ProductReview[];
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating";

export interface FilterState {
  category: ProductCategory | "all";
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  inStockOnly: boolean;
  searchQuery?: string;
}
