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
  {
    id: "specialty",
    title: "Specialty Windows",
    imageUrl: "/manus-storage/baywindows_3367388a.jpg",
    description: "Picture, bay, and bow windows to add character and natural light to any room.",
    brands: ["Synergy", "Westlake"],
    features: ["Custom shapes available", "Premium glass options", "Structural support included", "Design flexibility"],
    rating: 5,
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
                      <div className="flex flex-wrap gap-3">
                        {product.brands.map((brand) => {
                          const brandMap: Record<string, { logo: string }> = {
                            'Synergy': { logo: '/manus-storage/Synergy-Logo-1_e6633c2e.jpg' },
                            'Westlake': { logo: '/manus-storage/westlake_ef851210.png' },
                          };
                          const brandInfo = brandMap[brand];
                          return (
                            <div
                              key={brand}
                              className="inline-flex items-center justify-center bg-white border-2 border-[#2D4A6B]/20 rounded-lg p-2 hover:border-[#a61c00] hover:shadow-md hover:scale-110 transition-all duration-200 h-12 cursor-default"
                            >
                              <img
                                src={brandInfo?.logo}
                                alt={brand}
                                className="h-8 object-contain"
                              />
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
        productName="Windows"
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
