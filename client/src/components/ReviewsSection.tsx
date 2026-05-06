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
          <a
            href="https://www.google.com/maps/place/MP+Doors+%26+More/@33.6705702,-96.5961385,17z/data=!4m18!1m9!3m8!1s0x864c897632db665d:0xbe1a54ed55193c88!2sMP+Doors+%26+More!8m2!3d33.6705658!4d-96.5935636!9m1!1b1!16s%2Fg%2F11l2cz4p91!3m7!1s0x864c897632db665d:0xbe1a54ed55193c88!8m2!3d33.6705658!4d-96.5935636!9m1!1b1!16s%2Fg%2F11l2cz4p91?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent inline-block"
          >
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}
