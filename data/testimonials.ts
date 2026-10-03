export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  productMentioned: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Elena Vasquez",
    role: "Architect & Creative Director",
    location: "Copenhagen",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    quote: "NOVA gets proportions right where other modern labels miss. The Architectural Overcoat drapes with a sculptural weight that commands attention without demanding it.",
    productMentioned: "Architectural Wool Overcoat",
    rating: 5,
  },
  {
    id: "test-2",
    author: "Julian Sterling",
    role: "Industrial Designer",
    location: "Zurich",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    quote: "The Titanium Chronograph is an exceptional exercise in reduction. Clean matte surfaces, zero decorative noise, and impeccable Swiss precision.",
    productMentioned: "Titanium Chrono Watch",
    rating: 5,
  },
  {
    id: "test-3",
    author: "Amara Okonjo",
    role: "Design Critic & Author",
    location: "London",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    quote: "It's rare to find garments where every internal seam, button shank, and lining material feels as considered as the exterior. Truly investment-grade essentials.",
    productMentioned: "Pure Mongolian Cashmere Crewneck",
    rating: 5,
  },
];
