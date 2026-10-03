import React from "react";
import { EditorialHero } from "@/components/home/EditorialHero";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AsymmetricSpotlight } from "@/components/home/AsymmetricSpotlight";
import { BestSellersSection } from "@/components/home/BestSellersSection";
import { PromotionalBanner } from "@/components/home/PromotionalBanner";
import { BrandStorySection } from "@/components/home/BrandStorySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SocialGallery } from "@/components/home/SocialGallery";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EditorialHero />
      <BrandMarquee />
      <CategoryGrid />
      <AsymmetricSpotlight />
      <BestSellersSection />
      <PromotionalBanner />
      <BrandStorySection />
      <TestimonialsSection />
      <SocialGallery />
    </div>
  );
}
