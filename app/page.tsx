import React from "react";
import { EditorialHero } from "@/components/home/EditorialHero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestSellersSection } from "@/components/home/BestSellersSection";
import { PromotionalBanner } from "@/components/home/PromotionalBanner";
import { BrandStorySection } from "@/components/home/BrandStorySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SocialGallery } from "@/components/home/SocialGallery";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EditorialHero />
      <CategoryGrid />
      <BestSellersSection />
      <PromotionalBanner />
      <BrandStorySection />
      <TestimonialsSection />
      <SocialGallery />
    </div>
  );
}
