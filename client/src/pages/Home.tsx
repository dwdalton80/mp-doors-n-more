import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'wouter';

interface Review {
  name: string;
  date: string;
  text: string;
  rating: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'fill-[#a61c00] text-[#a61c00]' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

function ReviewsCarousel() {
  const reviews: Review[] = [
    {
      name: 'James R.',
      date: '2 months ago',
      text: 'Incredible selection and prices. I found a beautiful front door that would have cost me twice as much at a big box store. The staff was helpful and knowledgeable.',
      rating: 5,
    },
    {
      name: 'Maria T.',
      date: '3 months ago',
      text: 'MP Doors & More is a hidden gem in Sherman. Got vinyl flooring for my whole house at an amazing price. Installation was straightforward and it looks fantastic!',
      rating: 5,
    },
    {
      name: 'David K.',
      date: '1 month ago',
      text: 'Bought shingles and siding for my renovation project. Great quality, great price. Will definitely be back for my next project.',
      rating: 5,
    },
    {
      name: 'Sarah M.',
      date: '3 weeks ago',
      text: 'The windows I purchased are beautiful and energy-efficient. The team helped me pick the perfect style for my home. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Robert L.',
      date: '2 weeks ago',
      text: 'Best prices on doors in the area. I compared with other suppliers and MP Doors & More beats them all on price and quality.',
      rating: 5,
    },
    {
      name: 'Jennifer P.',
      date: '1 week ago',
      text: 'Professional service and excellent products. They took time to understand what I needed and recommended the perfect solution.',
      rating: 5,
    },
    {
      name: 'Michael T.',
      date: '3 days ago',
      text: 'Great experience from start to finish. Fast service, quality materials, and honest pricing. This is my go-to for all my home improvement needs.',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    resetAutoPlay();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    resetAutoPlay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative mb-10">
      <div
        className="bg-white rounded-lg p-8 shadow-sm border border-[#e8e0d8] touch-none select-none transition-opacity duration-500 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#2D4A6B] flex items-center justify-center text-white font-display font-bold text-lg">
              {currentReview.name[0]}
            </div>
            <div>
              <div className="font-display font-bold text-[#1a2e45] text-sm">{currentReview.name}</div>
              <div className="text-gray-400 text-xs">{currentReview.date}</div>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" className="shrink-0">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <StarRating rating={currentReview.rating} />
        <p className="text-gray-600 text-base leading-relaxed mt-4 min-h-20">"{currentReview.text}"</p>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-[#2D4A6B] text-white hover:bg-[#1a2e45] transition-colors"
          aria-label="Previous review"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Center Controls: Dots and Counter */}
        <div className="flex items-center gap-6">
          {/* Dot Indicators */}
          <div className="flex gap-2">
            {reviews.map((_: Review, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  resetAutoPlay();
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? "bg-[#a61c00]" : "bg-gray-300"
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-base font-bold text-[#a61c00] px-2 whitespace-nowrap">
            {currentIndex + 1} / {reviews.length}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-[#2D4A6B] text-white hover:bg-[#1a2e45] transition-colors"
          aria-label="Next review"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default ReviewsCarousel;
