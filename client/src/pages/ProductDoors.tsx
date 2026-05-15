/**
 * ProductDoors.tsx — MP Doors & More
 * Detailed product page for Doors category
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star, X } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import { injectSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewsSection from "@/components/ReviewsSection";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-doors_ac3e821c.png";

const products = [
  {
    id: "entry-doors",
    title: "Entry Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/entry-doors-product-QKWgV7Duu9whAYXBXvyKxu.webp",
    description: "Premium entry doors with security and style. Modern farmhouse designs with glass sidelights and solid wood construction. Energy-efficient and beautiful.",
    brands: ["Masonite", "Woodgrain", "Thermatru", "Glass Craft"],
    features: ["Solid core construction", "Weather-resistant seals", "Multiple finishes available", "Security glass options"],
    rating: 5,
  },
  {
    id: "exterior-doors",
    title: "Exterior Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/entry-doors-product-QKWgV7Duu9whAYXBXvyKxu.webp",
    description: "Durable exterior doors designed to withstand the Texas climate. Premium materials with weather-resistant construction and beautiful finishes for any home style.",
    brands: ["Masonite", "Woodgrain", "Thermatru", "Glass Craft"],
    features: ["Weather-resistant construction", "Energy-efficient seals", "Multiple style options", "Durable hardware"],
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
    brands: ["Andersen"],
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
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleGetPricing = (productId: string) => {
    setSelectedProduct(productId);
    setShowPricingModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData, 'Product:', selectedProduct);
    setShowPricingModal(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

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
                          const brandMap: Record<string, { logo: string }> = {
                            'Masonite': { logo: '/manus-storage/masonite_f182a41d.png' },
                            'Woodgrain': { logo: '/manus-storage/woodgrain_407754e1.png' },
                            'Trimlite': { logo: '/manus-storage/trimlite_cf6ce7db.png' },
                            'Frame Port': { logo: '/manus-storage/frameport_4e20b9d2.jpg' },
                            'Thermatru': { logo: '/manus-storage/thermatru_7ccab93c.png' },
                            'Glass Craft': { logo: '/manus-storage/glasscraft_619348f3.jpg' },
                            'Jeld-Wen': { logo: '/manus-storage/jeldwen-new_5d78f820.png' },
                            'Andersen': { logo: '/manus-storage/anderson_fa14d188.png' },
                            'Larson': { logo: '/manus-storage/larson_aaf43b2e.png' },
                          };
                          const brandInfo = brandMap[brand];
                          return (
                            <div
                              key={brand}
                              className="inline-flex items-center justify-center bg-white border-2 border-[#2D4A6B]/20 rounded-lg p-2 hover:border-[#a61c00] hover:shadow-md hover:scale-110 transition-all duration-200 h-12 cursor-default"
                            >
                              {brandInfo?.logo ? (
                                <img src={brandInfo.logo} alt={brand} className="h-8 object-contain" />
                              ) : (
                                <span className="text-xs font-label text-gray-600">{brand}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleGetPricing(product.id)}
                        className="inline-block btn-accent text-sm cursor-pointer"
                      >
                        Get Pricing
                      </button>
                      {product.id === 'interior-doors' && (
                        <Link
                          href="/interior-doors-in-stock"
                          onClick={() => window.scrollTo(0, 0)}
                          className="inline-block bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                        >
                          Popular In Stock
                        </Link>
                      )}
                      {product.id === 'entry-doors' && (
                        <Link
                          href="/exterior-doors-in-stock"
                          onClick={() => window.scrollTo(0, 0)}
                          className="inline-block bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                        >
                          Popular In Stock
                        </Link>
                      )}
                      {product.id === 'exterior-doors' && (
                        <Link
                          href="/exterior-doors-in-stock"
                          onClick={() => window.scrollTo(0, 0)}
                          className="inline-block bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                        >
                          Popular In Stock
                        </Link>
                      )}
                      {product.id === 'patio-doors' && (
                        <Link
                          href="/patio-doors-special-order"
                          onClick={() => window.scrollTo(0, 0)}
                          className="inline-block bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                        >
                          Special Order
                        </Link>
                      )}
                      {product.id === 'storm-doors' && (
                        <Link
                          href="/storm-doors-special-order"
                          onClick={() => window.scrollTo(0, 0)}
                          className="inline-block bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                        >
                          Special Order
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING REQUEST MODAL ── */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#1e3450]">Get Pricing</h2>
              <button
                onClick={() => setShowPricingModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition md:p-0"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3450]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3450]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3450]"
                  placeholder="(903) 421-1305"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3450]"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#a61c00] hover:bg-[#8b1600] text-white font-bold py-2 rounded-lg transition-colors"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── REVIEWS SECTION ── */}
      <ReviewsSection
        productName="Doors"
        averageRating={5.0}
        reviewCount={12}
        reviews={[
          {
            id: "1",
            author: "Sarah M.",
            rating: 5,
            date: "2 months ago",
            text: "Excellent selection of doors and very knowledgeable staff. Found exactly what I needed for my home renovation.",
          },
          {
            id: "2",
            author: "James R.",
            rating: 5,
            date: "1 month ago",
            text: "Great prices on quality doors. The team helped me find the perfect entry door for my new house.",
          },
          {
            id: "3",
            author: "Maria T.",
            rating: 5,
            date: "3 weeks ago",
            text: "MP Doors & More is a hidden gem. Their customer service is outstanding and their products are top-notch.",
          },
        ]}
      />
    </div>
  );
}
