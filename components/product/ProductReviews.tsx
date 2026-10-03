"use client";

import React, { useState } from "react";
import { ProductReview } from "@/types/product";
import { RatingStars } from "@/components/ui/RatingStars";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { CheckCircle2, Star } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

interface ProductReviewsProps {
  productId: string;
  productName: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

export function ProductReviews({
  productName,
  rating,
  reviewCount,
  reviews: initialReviews,
}: ProductReviewsProps) {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [newRating, setNewRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      title: title.trim() || "Exceptional piece",
      comment: comment.trim(),
      verified: true,
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
    setAuthor("");
    setTitle("");
    setComment("");

    showToast({
      title: "Review submitted",
      message: "Thank you for sharing your experience with the community.",
      type: "success",
    });
  };

  // Mock distribution
  const distribution = [
    { stars: 5, percentage: 86 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <section className="pt-12 border-t border-[var(--border)]" aria-labelledby="reviews-heading">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h2 id="reviews-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Client Impressions & Reviews
          </h2>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Verified experiences from our global community.
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} variant="outline" size="sm">
          Write a Review
        </Button>
      </div>

      {/* Rating Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-xs bg-[var(--surface)] border border-[var(--border)] mb-10">
        <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-[var(--border)] pb-6 md:pb-0">
          <span className="text-5xl font-extrabold text-[var(--foreground)] tabular-nums tracking-tight">
            {rating.toFixed(1)}
          </span>
          <RatingStars rating={rating} size="md" className="mt-2" />
          <span className="text-xs text-[var(--muted-foreground)] mt-1 font-medium">
            Based on {reviewCount} verified purchases
          </span>
        </div>

        <div className="md:col-span-2 flex flex-col justify-center gap-2">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-[var(--muted-foreground)] tabular-nums shrink-0">
                {item.stars} stars
              </span>
              <div className="flex-1 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-[var(--muted-foreground)] tabular-nums shrink-0">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="divide-y divide-[var(--border)]">
        {reviews.map((rev) => (
          <article key={rev.id} className="py-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-[var(--foreground)]">
                  {rev.author}
                </span>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Buyer
                  </span>
                )}
              </div>
              <time className="text-xs text-[var(--muted-foreground)]" dateTime={rev.date}>
                {formatDate(rev.date)}
              </time>
            </div>

            <RatingStars rating={rev.rating} size="sm" />

            {rev.title && (
              <h3 className="text-sm font-semibold text-[var(--foreground)] pt-1">
                {rev.title}
              </h3>
            )}

            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
              {rev.comment}
            </p>
          </article>
        ))}
      </div>

      {/* Write Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Write a Review"
        description={`Share your thoughts on the ${productName}`}
      >
        <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
          {/* Star selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-2">
              Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  aria-label={`${star} star rating`}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-[var(--border)]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Julian S."
              className="w-full bg-[var(--background)] border border-[var(--border)] px-3.5 py-2 text-xs focus:outline-none focus:border-[var(--foreground)] rounded-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1.5">
              Review Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exceptional fit and tactile feel"
              className="w-full bg-[var(--background)] border border-[var(--border)] px-3.5 py-2 text-xs focus:outline-none focus:border-[var(--foreground)] rounded-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--foreground)] mb-1.5">
              Your Review
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Detail your thoughts regarding craftsmanship, drape, sizing, and longevity..."
              className="w-full bg-[var(--background)] border border-[var(--border)] p-3.5 text-xs focus:outline-none focus:border-[var(--foreground)] rounded-xs leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Submit Review
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
