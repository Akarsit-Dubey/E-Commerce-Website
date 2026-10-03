import { ProductCategory } from "@/types/product";

export interface CategoryMetadata {
  id: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: CategoryMetadata[] = [
  {
    id: "clothing",
    name: "Clothing",
    tagline: "Architectural silhouettes & pure natural fibers",
    description: "Tailored outerwear, virgin wool trousers, and grade-A Mongolian cashmere knitwear built to outlast trends.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200",
    itemCount: 8,
  },
  {
    id: "shoes",
    name: "Footwear",
    tagline: "Handcrafted Portuguese & Italian leather foundations",
    description: "Goodyear-welted derbies, oiled suede Chelsea boots, and minimalist calfskin sneakers engineered for continuous comfort.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200",
    itemCount: 5,
  },
  {
    id: "bags",
    name: "Bags & Carry",
    tagline: "Modular utility meets artisanal leathercraft",
    description: "Weatherproof bonded canvas weekender duffles, structured vegetable-tanned totes, and magnetic Fidlock slings.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200",
    itemCount: 4,
  },
  {
    id: "accessories",
    name: "Accessories",
    tagline: "Grade-5 titanium, bio-acetate, and bridle leather",
    description: "Swiss-movement chronographs, Japanese acetate eyewear, and hand-stitched Chèvre leather wallets.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200",
    itemCount: 5,
  },
  {
    id: "essentials",
    name: "Daily Essentials",
    tagline: "Elevated foundational pieces for mindful living",
    description: "300 GSM organic cotton tees, thermal loopback hoodies, fine merino socks, and ceramic home vessels.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200",
    itemCount: 4,
  },
];
