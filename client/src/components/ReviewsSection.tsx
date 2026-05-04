/*
 * ReviewsSection.tsx — MP Doors & More
 * Displays customer reviews with AggregateRating schema
 */

import { useEffect } from "react";
import { Star } from "lucide-react";
import ReviewCard from "./ReviewCard";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewsSectionProps {
  productName: string;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
}

export default function ReviewsSection({
  productName,
  averageRating,
  reviewCount,
  reviews,
}: ReviewsSectionProps) {
  useEffect(() => {
    // Inject AggregateRating schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": reviewCount,
      "reviewCount": reviewCount,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [averageRating, reviewCount]);

  return (
    <section className="py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-black text-4xl text-[#1a2e45] mb-3">
                Customer Reviews
              </h2>
              <p className="text-gray-600">
                Real feedback from customers who trust MP Doors & More
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-[#a61c00]">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i <= Math.round(averageRating)
                          ? "fill-[#a61c00] text-[#a61c00]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Based on {reviewCount} reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Have you purchased from us? Share your experience!
          </p>
          <button className="btn-accent">
            Leave a Review
          </button>
        </div>
      </div>
    </section>
  );
}
