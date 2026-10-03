"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto md:w-20 md:max-h-[600px] shrink-0 no-scrollbar py-1">
          {images.map((image, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View photo ${idx + 1} of ${productName}`}
              className={cn(
                "relative w-16 h-20 md:w-20 md:h-24 shrink-0 rounded-xs overflow-hidden border transition-all cursor-pointer",
                activeIndex === idx
                  ? "border-[var(--foreground)] ring-1 ring-[var(--foreground)]"
                  : "border-[var(--border)] opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Feature Image Container */}
      <div className="relative flex-1 aspect-[3/4] bg-[var(--surface)] rounded-xs overflow-hidden border border-[var(--border)] group">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - View ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out"
        />

        {/* Prev / Next Chevrons on Hover */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--background)]/80 text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--background)] shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[var(--background)]/80 text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--background)] shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Lightbox / Zoom Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Open fullscreen image view"
          className="absolute top-3 right-3 p-2 rounded-full bg-[var(--background)]/80 text-[var(--foreground)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--background)] shadow-sm"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Mobile Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 md:hidden pointer-events-none">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  activeIndex === idx
                    ? "w-4 bg-[var(--foreground)]"
                    : "bg-[var(--foreground)]/30"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close zoom modal"
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl w-full h-[85vh] select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={productName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
