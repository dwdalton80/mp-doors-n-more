/*
 * ProductSiding.tsx — MP Doors & More
 * Detailed product page for Siding & Shingles category
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import ReviewsSection from "@/components/ReviewsSection";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-siding-shingles_ac3e821c.png";

const products = [
  {
    id: "lp-smart-siding",
    title: "LP Smart Siding and Trim",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/vinyl-siding-certainteed-nEXe9HMrZqcujhvPB4TRDY.webp",
    description: "Premium LP Smart Siding and Trim engineered for superior durability, protection, and beautiful curb appeal.",
    brands: ["LP Smart Siding"],
    features: ["Weather-resistant", "Engineered durability", "Low maintenance", "Trim solutions included"],
    rating: 5,
  },
  {
    id: "fiber-cement",
    title: "Fiber Cement Siding",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/fiber-cement-james-hardie-BY5HrwRhA4oECsudubk6Jm.webp",
    description: "Premium fiber cement siding that mimics the look of wood with superior durability and fire resistance.",
    brands: ["James Hardie", "Allura", "Fiber Cement Co.", "Cemplank"],
    features: ["Fire resistant", "Realistic wood look", "Long-lasting", "Paintable finishes"],
    rating: 5,
  },
  {
    id: "asphalt-shingles",
    title: "Asphalt Shingles",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/asphalt-shingles-gaf-N8qChrpSSotvLHumApRL3g.webp",
    description: "Affordable and reliable asphalt shingles for residential roofing applications.",
    brands: ["Certainteed", "GAF", "Owens Corning", "Malarkey"],
    features: ["Weather-resistant", "Multiple colors", "Impact resistant", "Warranty included"],
    rating: 4.9,
  },
  {
    id: "architectural-shingles",
    title: "Architectural Shingles",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/architectural-shingles-owens-corning-fnVjpTzfvz6JsDJc9Lryg8.webp",
    description: "Premium architectural shingles with enhanced dimension and style for your roof.",
    brands: ["Owens Corning", "GAF Timberline", "Certainteed", "Malarkey"],
    features: ["Dimensional design", "Superior protection", "Long warranty", "Fade resistant"],
    rating: 5,
  },
];

export default function ProductSiding() {
  useEffect(() => {
    document.title = "LP Smart Siding, Fiber Cement & Shingles in Sherman, TX | MP Doors & More";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Premium LP Smart Siding and Trim, fiber cement, asphalt shingles, and architectural shingles. Protect and beautify your home with quality materials in Sherman, TX.');
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
          <Link href="/products" className="inline-flex items-center gap-2 text-[#a61c00] font-display font-semibold hover:text-white transition-colors mb-6 text-sm">
            <ChevronLeft size={16} />
            Back to Products
          </Link>
          <div className="section-label text-[#a61c00] mb-3">Siding & Shingles</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Protect & Beautify Your Home
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Premium siding and roofing materials from trusted brands. Enhance your home's protection and curb appeal.
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
        productName="Siding & Shingles"
        averageRating={4.88}
        reviewCount={76}
        reviews={[
          {
            id: "1",
            author: "Richard M.",
            rating: 5,
            date: "2 weeks ago",
            text: "Excellent siding quality! My home looks brand new. Great prices and professional service.",
          },
          {
            id: "2",
            author: "Donna B.",
            rating: 5,
            date: "1 month ago",
            text: "Beautiful architectural shingles! Transformed the look of my roof. Very satisfied with the quality.",
          },
          {
            id: "3",
            author: "Gary P.",
            rating: 5,
            date: "3 weeks ago",
            text: "Best siding and shingles selection in the area. Competitive pricing and great customer support.",
          },
          {
            id: "4",
            author: "Diane C.",
            rating: 5,
            date: "6 weeks ago",
            text: "Fantastic products and excellent service. My home exterior looks amazing!",
          },
          {
            id: "5",
            author: "Mark T.",
            rating: 5,
            date: "2 months ago",
            text: "High-quality siding at great prices. Very impressed with the entire experience.",
          },
          {
            id: "6",
            author: "Susan R.",
            rating: 4,
            date: "1 month ago",
            text: "Great selection of shingles and siding. Happy with my purchase and the service.",
          },
        ]}
      />

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-[#1a2e45]">
        <div className="container text-center">
          <div className="section-label text-[#a61c00] mb-4">Ready to Upgrade?</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6">
            Upgrade Your Home's Exterior
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Contact us today for a free consultation and pricing on any of our premium siding and roofing options.
          </p>
          <Link href="/contact" className="inline-block btn-accent">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
