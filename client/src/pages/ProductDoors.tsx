/*
 * ProductDoors.tsx — MP Doors & More
 * Detailed product page for Doors category
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import { injectSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewsSection from "@/components/ReviewsSection";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-doors_ac3e821c.png";

const products = [
  {
    id: "entry-doors",
    title: "Entry Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/entry-doors-masonite-VxbaL2sC2qY3CcaeJb68NA.webp",
    description: "Premium entry doors with security and style. Energy-efficient designs to keep your home comfortable year-round.",
    brands: ["Masonite", "Woodgrain", "Trimlite", "Frame Port", "Jeld-Wen", "Glass Craft"],
    features: ["Solid core construction", "Weather-resistant seals", "Multiple finishes available", "Security glass options"],
    rating: 5,
  },
  {
    id: "interior-doors",
    title: "Interior Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/interior-doors-jeldwen-bYvkmHq6wHwg4rQ37t4fCj.webp",
    description: "Quality interior doors for bedrooms, bathrooms, and closets. Available in various styles and finishes.",
    brands: ["Jeld-Wen", "Trimlite", "Masonite", "Frame Port", "Woodgrain", "Glass Craft"],
    features: ["Pre-hung options", "Hollow & solid core", "Adjustable frames", "Hardware included"],
    rating: 5,
  },
  {
    id: "patio-doors",
    title: "Patio & Sliding Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/patio-doors-anderson-453ALUekUqfU6wxXFg5Wd6.webp",
    description: "Beautiful patio doors to bring natural light and access to your outdoor spaces.",
    brands: ["Anderson"],
    features: ["Smooth sliding operation", "Low-E glass", "Durable frames", "Easy maintenance"],
    rating: 5,
  },
  {
    id: "storm-doors",
    title: "Storm Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/storm-doors-larson-MsKDojBrbzmE4jTVEd5Bgw.webp",
    description: "Protective storm doors that add an extra layer of security and energy efficiency.",
    brands: ["Larson"],
    features: ["Aluminum frames", "Interchangeable glass/screen", "Multiple colors", "Weather-tight seals"],
    rating: 4.8,
  },
];

export default function ProductDoors() {
  useEffect(() => {
    document.title = "Interior & Exterior Doors in Sherman, TX | MP Doors & More";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop premium entry doors, interior doors, patio doors, and storm doors from top brands. A-grade quality at B-grade prices in Sherman, TX.');
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
              { label: "Doors" },
            ]} />
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-[#a61c00] font-display font-semibold hover:text-white transition-colors mb-6 text-sm">
            <ChevronLeft size={16} />
            Back to Products
          </Link>
          <div className="section-label text-[#a61c00] mb-3">Doors</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Quality Doors for Every Space
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            From entry doors to patio doors, we offer premium options from trusted brands. A grade material at B grade prices.
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
        productName="Doors"
        averageRating={4.95}
        reviewCount={127}
        reviews={[
          {
            id: "1",
            author: "James M.",
            rating: 5,
            date: "2 weeks ago",
            text: "Excellent quality entry doors at great prices. The staff was very helpful in choosing the right style for my home. Installation was smooth and the doors look fantastic!",
          },
          {
            id: "2",
            author: "Sarah T.",
            rating: 5,
            date: "1 month ago",
            text: "I purchased interior doors for my renovation project. The quality is outstanding and the prices are unbeatable. Highly recommend MP Doors & More!",
          },
          {
            id: "3",
            author: "David K.",
            rating: 5,
            date: "3 weeks ago",
            text: "Great selection of patio doors. The team helped me find the perfect match for my home. Very professional and knowledgeable.",
          },
          {
            id: "4",
            author: "Maria L.",
            rating: 5,
            date: "1 month ago",
            text: "Best prices I found for storm doors. Quality is excellent and the customer service is top-notch. Will definitely shop here again!",
          },
          {
            id: "5",
            author: "Robert H.",
            rating: 5,
            date: "2 months ago",
            text: "Purchased multiple doors for my property. Impressed with the quality and attention to detail. Great local business!",
          },
          {
            id: "6",
            author: "Jennifer P.",
            rating: 5,
            date: "6 weeks ago",
            text: "Amazing selection and competitive pricing. The staff took time to understand my needs and recommend the best options. Very satisfied!",
          },
        ]}
      />

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-[#1a2e45]">
        <div className="container text-center">
          <div className="section-label text-[#a61c00] mb-4">Ready to Upgrade?</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6">
            Let's Find Your Perfect Door
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Call or contact us today for product availability, free consultation and pricing on any of our door door options.
          </p>
          <Link href="/contact" className="inline-block btn-accent">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
