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
    brands: ["Masonite", "Woodgrain", "Trimlite", "Frame Port", "Thermatru", "Glass Craft"],
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
                      <h4 className="font-display font-semibold text-sm text-[#1a2e45] mb-3">Available Brands:</h4>
                      <div className="flex flex-wrap gap-3">
                        {product.brands.map((brand) => {
                          const brandMap: Record<string, { logo: string; url: string }> = {
                            'Masonite': { logo: '/manus-storage/masonite_f182a41d.png', url: 'https://www.masonitedoors.com' },
                            'Woodgrain': { logo: '/manus-storage/woodgrain_407754e1.png', url: 'https://woodgrain.com/products/doors/' },
                            'Trimlite': { logo: '/manus-storage/trimlite_cf6ce7db.png', url: 'https://trimlite.com/' },
                            'Frame Port': { logo: '/manus-storage/frameport_4e20b9d2.jpg', url: 'https://www.frameportamerica.com' },
                            'Thermatru': { logo: '/manus-storage/thermatru_7ccab93c.png', url: 'https://www.thermatru.com' },
                            'Glass Craft': { logo: '/manus-storage/glasscraft_619348f3.jpg', url: 'https://glasscraft.com/' },
                            'Jeld-Wen': { logo: '/manus-storage/jeldwen-new_5d78f820.png', url: 'https://www.jeldwen.com' },
                            'Anderson': { logo: '/manus-storage/anderson_fa14d188.png', url: 'https://www.andersenwindows.com' },
                            'Larson': { logo: '/manus-storage/larson_aaf43b2e.png', url: 'https://www.larsonmfg.com' },
                          };
                          const brandInfo = brandMap[brand];
                          return (
                            <a
                              key={brand}
                              href={brandInfo?.url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center h-12 px-3 bg-white rounded border border-gray-200 hover:border-[#a61c00] hover:shadow-md transition"
                              title={`Visit ${brand} website`}
                            >
                              {brandInfo?.logo ? (
                                <img src={brandInfo.logo} alt={brand} className="h-8 object-contain" />
                              ) : (
                                <span className="text-xs font-label text-gray-600">{brand}</span>
                              )}
                            </a>
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
        productName="Doors"
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
