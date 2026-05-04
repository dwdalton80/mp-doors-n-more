/*
 * ReviewCard.tsx — MP Doors & More
 * Displays individual customer reviews with star ratings
 */

import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[#FAF7F2] rounded-lg p-6 border border-gray-200">
      {/* Star Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={16}
              className={i <= review.rating ? "fill-[#a61c00] text-[#a61c00]" : "text-gray-300"}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-[#1a2e45]">{review.rating}.0</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
        "{review.text}"
      </p>

      {/* Author and Date */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm text-[#1a2e45]">{review.author}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
        <div className="text-xs bg-[#a61c00]/10 text-[#a61c00] px-2 py-1 rounded">
          Verified
        </div>
      </div>
    </div>
  );
}
