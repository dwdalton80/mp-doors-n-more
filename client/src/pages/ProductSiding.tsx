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
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/lp-smartside-siding-trim-E6EvXPacjMJ5knmnZ3NfAx.webp",
    description: "Premium LP SmartSide fiber cement siding and trim engineered for superior durability, protection, and beautiful curb appeal.",
    brands: ["LP SmartSide"],
    features: ["Fiber cement durability", "Engineered for performance", "Low maintenance", "Integrated trim solutions"],
    rating: 5,
  },
  {
    id: "fiber-cement",
    title: "Fiber Cement Siding",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/fiber-cement-james-hardie-BY5HrwRhA4oECsudubk6Jm.webp",
    description: "Premium fiber cement siding that mimics the look of wood with superior durability and fire resistance.",
    brands: ["James Hardie", "Nichiha"],
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
                      <div className="flex flex-wrap gap-3">
                        {product.brands.map((brand) => {
                          const brandMap: Record<string, { logo: string }> = {
                            'LP SmartSide': { logo: '/manus-storage/lp_smartside_logo_ccb283e1.png' },
                            'James Hardie': { logo: '/manus-storage/james_hardie_logo_1322fa8e.png' },
                            'Nichiha': { logo: '/manus-storage/nichiha_logo_6f73c5b7.webp' },
                            'Certainteed': { logo: '/manus-storage/certainteed_logo_5b6f3130.png' },
                            'GAF': { logo: '/manus-storage/gaf_logo_3ccfe9d8.jpg' },
                            'Owens Corning': { logo: '/manus-storage/owens_corning_logo_dfae2ce4.png' },
                            'Malarkey': { logo: '/manus-storage/malarkey_logo_0d7e3d2e.png' },
                            'GAF Timberline': { logo: '/manus-storage/gaf_logo_3ccfe9d8.jpg' },
                          };
                          const brandInfo = brandMap[brand];
                          return (
                            <div
                              key={brand}
                              className="relative inline-flex items-center justify-center bg-white border-2 border-[#2D4A6B]/20 rounded-lg p-2 hover:border-[#a61c00] hover:shadow-md transition-all duration-200 h-12 cursor-default peer"
                            >
                              {brandInfo?.logo ? (
                                <>
                                  <img
                                    src={brandInfo.logo}
                                    alt={brand}
                                    className="h-8 object-contain"
                                  />
                                  <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                    {brand}
                                  </span>
                                </>
                              ) : (
                                <span className="text-xs font-label text-[#2D4A6B] text-center px-2">{brand}</span>
                              )}
                            </div>
                          );
                        })}
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
        averageRating={5.0}
        reviewCount={7}
        reviews={[
          {
            id: "1",
            author: "Josh Cole",
            rating: 5,
            date: "9 months ago",
            text: "I absolutely love this place! Amazing people and amazing products! Rafael is wonderful along with his whole crew! They always go above and beyond in helping me out. I would certainly recommend them to anyone",
          },
          {
            id: "2",
            author: "Howard Cochran",
            rating: 5,
            date: "9 months ago",
            text: "Rafael took very good care of us. I live quite a ways away from Sherman and he saw to it that the two doors I was buying would be ready for me when I got there. Excellent customer service.",
          },
          {
            id: "3",
            author: "Layth Fadhil",
            rating: 5,
            date: "8 months ago",
            text: "Amazing door selections and great customer service. You are treated like family in this place and they are ready to answer all of your questions. Give them a call",
          },
          {
            id: "4",
            author: "Jenn Smith",
            rating: 5,
            date: "4 months ago",
            text: "Great place. Very friendly and helpful",
          },
          {
            id: "5",
            author: "Monica Mackey",
            rating: 5,
            date: "a year ago",
            text: "Beautiful doors and wonderful customer service! If you need any doors check this place out!",
          },
          {
            id: "6",
            author: "el oso",
            rating: 5,
            date: "a month ago",
            text: "Excellent service from these guys! We have been there a handful of times and never disappointed. Thank you MP Doors and More!",
          },
          {
            id: "7",
            author: "Julie Cruz",
            rating: 5,
            date: "a month ago",
            text: "Nice place great prices very courteous thanks a million.",
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
