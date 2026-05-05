/*
 * ProductWindows.tsx — MP Doors & More
 * Detailed product page for Windows category
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewsSection from "@/components/ReviewsSection";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-windows_ac3e821c.png";

const products = [
  {
    id: "single-hung",
    title: "Single Hung Windows",
    imageUrl: "/manus-storage/doublehungwindows_aee37039.png",
    description: "Classic single hung windows with smooth operation and excellent ventilation control.",
    brands: ["Synergy", "Westlake"],
    features: ["Tilt-in sashes for easy cleaning", "Low-E glass", "Multiple color options", "Energy Star certified"],
    rating: 5,
  },
  {
    id: "casement",
    title: "Casement Windows",
    imageUrl: "/manus-storage/casement-window_04331195.png",
    description: "Modern casement windows with superior weather sealing and maximum ventilation.",
    brands: ["Synergy", "Westlake"],
    features: ["Crank-operated opening", "Weather-tight seals", "Picture & bay options", "Vinyl frames"],
    rating: 5,
  },
  {
    id: "sliding",
    title: "Sliding Windows",
    imageUrl: "/manus-storage/slidingwindow_174ca486.png",
    description: "Sleek sliding windows perfect for contemporary and traditional homes.",
    brands: ["Synergy", "Westlake"],
    features: ["Smooth gliding operation", "Low maintenance", "Energy efficient", "Multiple sizes"],
    rating: 4.9,
  },

];

export default function ProductWindows() {
  useEffect(() => {
    document.title = "Energy-Efficient Vinyl Windows in Sherman, TX | MP Doors & More";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse energy-efficient vinyl windows from Synergy and Westlake including single-hung, casement, and sliding windows. Premium quality at affordable prices in Sherman, TX.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── PAGE HERO ── */}
      <section className="relative bg-[#1a2e45] pt-32 pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e30]/90 via-[#0f1e30]/70 to-transparent" />

        <div className="relative container">
          <div className="mb-6">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Windows" },
            ]} />
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-[#a61c00] font-display font-semibold hover:text-white transition-colors mb-6 text-sm">
            <ChevronLeft size={16} />
            Back to Products
          </Link>
          <div className="section-label text-[#a61c00] mb-3">Windows</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Premium Windows for Natural Light
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Energy-efficient windows from top manufacturers. Let natural light transform your home while keeping energy costs low.
          </p>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {products.map((product) => (
              <div key={product.id} className="group">
                {/* Product Card */}
                <div className="bg-[#FAF7F2] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <ProductImagePlaceholder imageUrl={product.imageUrl} title={product.title} />

                  <div className="p-6">
                    <h3 className="font-display font-bold text-2xl text-[#1a2e45] mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i <= product.rating ? "fill-[#a61c00] text-[#a61c00]" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-display font-semibold text-sm text-[#1a2e45] mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#a61c00]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Brands */}
                    <div className="mb-6">
                      <h4 className="font-display font-semibold text-sm text-[#1a2e45] mb-2">Available Brands:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.brands.map((brand) => (
                          <span key={brand} className="inline-block bg-[#2D4A6B]/10 text-[#2D4A6B] text-xs font-label px-3 py-1 rounded">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      className="inline-block btn-accent text-sm"
                    >
                      Get Pricing
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS SECTION ── */}
      <ReviewsSection
        productName="Windows"
        averageRating={4.9}
        reviewCount={98}
        reviews={[
          {
            id: "1",
            author: "Linda C.",
            rating: 5,
            date: "3 weeks ago",
            text: "Beautiful energy-efficient windows! My energy bills have already decreased. Great quality and excellent customer service.",
          },
          {
            id: "2",
            author: "Michael R.",
            rating: 5,
            date: "1 month ago",
            text: "Replaced all windows in my home. The selection is fantastic and prices are very competitive. Highly satisfied!",
          },
          {
            id: "3",
            author: "Patricia W.",
            rating: 5,
            date: "2 weeks ago",
            text: "Excellent windows with great craftsmanship. The team helped me choose the perfect style for my home.",
          },
          {
            id: "4",
            author: "Thomas B.",
            rating: 5,
            date: "6 weeks ago",
            text: "Best window prices I found locally. Quality is outstanding and installation was professional.",
          },
          {
            id: "5",
            author: "Angela M.",
            rating: 5,
            date: "2 months ago",
            text: "Very impressed with the window selection and knowledgeable staff. Will recommend to friends!",
          },
          {
            id: "6",
            author: "Christopher D.",
            rating: 4,
            date: "1 month ago",
            text: "Great windows at good prices. Very happy with my purchase and the service received.",
          },
        ]}
      />

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-[#1a2e45]">
        <div className="container text-center">
          <div className="section-label text-[#a61c00] mb-4">Ready to Upgrade?</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6">
            Brighten Your Home with New Windows
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Contact us today for a free consultation and pricing on any of our premium window options.
          </p>
          <Link href="/contact" className="inline-block btn-accent">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
