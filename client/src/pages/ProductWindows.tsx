/*
 * ProductWindows.tsx — MP Doors & More
 * Detailed product page for Windows category
 * Design: Modern Farmhouse with deep red accents
 */

import { Link } from "wouter";
import { ChevronLeft, Star } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-windows_ac3e821c.png";

const products = [
  {
    id: "double-hung",
    title: "Double Hung Windows",
    imageUrl: "/manus-storage/DoubleHungWindow_a5966fda.png",
    description: "Classic double hung windows with smooth operation and excellent ventilation control.",
    brands: ["Pella", "Andersen", "Jeld-Wen", "Milgard"],
    features: ["Tilt-in sashes for easy cleaning", "Low-E glass", "Multiple color options", "Energy Star certified"],
    rating: 5,
  },
  {
    id: "casement",
    title: "Casement Windows",
    imageUrl: "/manus-storage/CasementWindow_d1b2aba9.png",
    description: "Modern casement windows with superior weather sealing and maximum ventilation.",
    brands: ["Andersen", "Pella", "Marvin", "Jeld-Wen"],
    features: ["Crank-operated opening", "Weather-tight seals", "Picture & bay options", "Vinyl frames"],
    rating: 5,
  },
  {
    id: "sliding",
    title: "Sliding Windows",
    imageUrl: "/manus-storage/slidingwindow_3db1304b.png",
    description: "Sleek sliding windows perfect for contemporary and traditional homes.",
    brands: ["Pella", "Milgard", "Jeld-Wen", "Simonton"],
    features: ["Smooth gliding operation", "Low maintenance", "Energy efficient", "Multiple sizes"],
    rating: 4.9,
  },
  {
    id: "specialty",
    title: "Specialty & Bay Windows",
    imageUrl: "/manus-storage/BayWindow_68987e48.png",
    description: "Picture, bay, and bow windows to add character and natural light to any room.",
    brands: ["Andersen", "Pella", "Marvin", "Thermal"],
    features: ["Custom shapes available", "Premium glass options", "Structural support included", "Design flexibility"],
    rating: 5,
  },
];

export default function ProductWindows() {
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
