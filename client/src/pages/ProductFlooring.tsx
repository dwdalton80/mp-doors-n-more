/*
 * ProductFlooring.tsx — MP Doors & More
 * Detailed product page for Vinyl Flooring category
 * Design: Modern Farmhouse with deep red accents
 */

import { Link } from "wouter";
import { ChevronLeft, Star } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-flooring_ac3e821c.png";

const products = [
  {
    id: "luxury-vinyl",
    title: "Luxury Vinyl Plank (LVP)",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/luxury-vinyl-plank-mohawk-6U9k5xcmHEMjneeX5i8YTk.webp",
    description: "Premium vinyl plank flooring that mimics the look of hardwood with superior durability and easy maintenance.",
    brands: ["Mohawk", "Shaw", "Pergo", "Armstrong"],
    features: ["Waterproof construction", "Realistic wood grain", "Easy installation", "Scratch resistant"],
    rating: 5,
  },
  {
    id: "vinyl-tile",
    title: "Vinyl Tile Flooring",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/vinyl-tile-flooring-tarkett-GmUDPLpJ5rbpeDTRj8khrz.webp",
    description: "Durable vinyl tiles perfect for kitchens, bathrooms, and high-traffic areas.",
    brands: ["Tarkett", "Mannington", "Karndean", "Armstrong"],
    features: ["Stone-look options", "Slip-resistant", "Low maintenance", "Multiple colors"],
    rating: 4.9,
  },
  {
    id: "sheet-vinyl",
    title: "Sheet Vinyl Flooring",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/sheet-vinyl-armstrong-nPJpdZVDDRznBXjwmRucYo.webp",
    description: "Seamless sheet vinyl for a clean, modern look with excellent water resistance.",
    brands: ["Tarkett", "Armstrong", "Congoleum", "Karndean"],
    features: ["Seamless installation", "Waterproof", "Comfortable underfoot", "Easy to clean"],
    rating: 4.8,
  },
  {
    id: "vinyl-composite",
    title: "Vinyl Composite Tile (VCT)",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/vinyl-composite-tile-armstrong-eVhhaqaekg3QN8QgqvD5jG.webp",
    description: "Commercial-grade vinyl composite tiles ideal for commercial and residential applications.",
    brands: ["Armstrong", "Tarkett", "Mannington", "Congoleum"],
    features: ["Durable construction", "Commercial grade", "Cost-effective", "Wide color range"],
    rating: 4.7,
  },
];

export default function ProductFlooring() {
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
          <div className="section-label text-[#a61c00] mb-3">Vinyl Flooring</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Durable Vinyl Flooring Solutions
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Beautiful, waterproof vinyl flooring that's easy to maintain and budget-friendly. Perfect for any room in your home.
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
            Transform Your Floors Today
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Contact us today for a free consultation and pricing on any of our premium vinyl flooring options.
          </p>
          <Link href="/contact" className="inline-block btn-accent">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
