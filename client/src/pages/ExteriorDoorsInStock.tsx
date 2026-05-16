/**
 * ExteriorDoorsInStock.tsx — MP Doors & More
 * Page showcasing currently available exterior doors in stock
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star, X, Search } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import { injectSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-doors_ac3e821c.png";

const inStockDoors = [
  {
    id: "entry-door-masonite",
    title: "Full Lite Mini Blind",
    imageUrl: "/manus-storage/Screenshot2026-05-15at4.49.26PM_5f2d9e60.png",
    imageUrl2: "/manus-storage/fullminiblind2_69778246.webp",
    images: [
      "/manus-storage/Screenshot2026-05-15at4.49.26PM_5f2d9e60.png",
      "/manus-storage/fullminiblind2_69778246.webp",
      "/manus-storage/Screenshot2026-05-15at4.46.11PM_cca253d7.png"
    ],
    brand: "Masonite",
    description: "Premium full lite mini blind entry door with integrated blinds. Weather-resistant seals and energy-efficient construction keep your home comfortable year-round.",
    features: ["Full lite glass panel", "Mini blind integrated", "Weather-resistant seals", "Energy-efficient"],
    rating: 5,
  },
  {
    id: "entry-door-jeldwen",
    title: "Half Lite Mini Blind",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/jeldwen-entry-door-MopepvCWi9e7dqDhB2chc6.webp",
    imageUrl2: "/manus-storage/entry-door-diagram.jpg",
    brand: "Jeld-Wen",
    description: "Quality entry door with modern styling and durable construction. Perfect for any home exterior.",
    features: ["Solid core construction", "Weather-resistant seals", "Multiple finishes", "Security glass options"],
    rating: 5,
  },
  {
    id: "patio-door-anderson",
    title: "9 Lite Exterior Door",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/patio-doors-anderson-453ALUekUqfU6wxXFg5Wd6.webp",
    imageUrl2: "/manus-storage/patio-door-diagram.jpg",
    brand: "Anderson",
    description: "Beautiful sliding patio door with smooth operation. Low-E glass provides energy efficiency.",
    features: ["Smooth sliding operation", "Low-E glass", "Durable frames", "Easy maintenance"],
    rating: 5,
  },
  {
    id: "storm-door-larson",
    title: "3/4 Lite Vista Grand Exterior Door",
    imageUrl: "/manus-storage/34litevista3_367bfd2f.webp",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at4.54.38PM_bdb0711b.png",
    imageUrl3: "/manus-storage/34litevista2_6c0e91e1.webp",
    imageUrl4: "/manus-storage/34litevista_e309735c.webp",
    brand: "Larson",
    description: "Protective storm door with full lite vista grand design. Interchangeable glass and screen for year-round use.",
    features: ["Full lite glass panel", "Interchangeable glass/screen", "Vista grand design", "Weather-tight seals"],
    rating: 4.8,
  },
  {
    id: "full-lite-vista-grand-larson",
    title: "Full Lite Vista Grand",
    imageUrl: "/manus-storage/34litevista3_367bfd2f.webp",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at4.54.38PM_bdb0711b.png",
    imageUrl3: "/manus-storage/34litevista2_6c0e91e1.webp",
    imageUrl4: "/manus-storage/34litevista_e309735c.webp",
    brand: "Larson",
    description: "Protective storm door with full lite vista grand design. Interchangeable glass and screen for year-round use.",
    features: ["Full lite glass panel", "Interchangeable glass/screen", "Vista grand design", "Weather-tight seals"],
    rating: 4.8,
  },
  {
    id: "flush-fiberglass-masonite",
    title: "Flush Fiberglass Exterior Door",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/entry-doors-masonite-VxbaL2sC2qY3CcaeJb68NA.webp",
    imageUrl2: "/manus-storage/entry-door-diagram.jpg",
    brand: "Masonite",
    description: "Sleek flush fiberglass exterior door with modern minimalist design. Durable fiberglass construction resists warping and weather damage.",
    features: ["Fiberglass construction", "Warp-resistant", "Contemporary design", "Low maintenance"],
    rating: 5,
  },
  {
    id: "6-panel-fiberglass-masonite",
    title: "6 Panel Fiberglass Exterior Door",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/entry-doors-masonite-VxbaL2sC2qY3CcaeJb68NA.webp",
    imageUrl2: "/manus-storage/entry-door-diagram.jpg",
    brand: "Masonite",
    description: "Classic 6-panel fiberglass door with traditional styling. Provides excellent insulation and durability for any home exterior.",
    features: ["6-panel design", "Superior insulation", "Traditional style", "Durable fiberglass"],
    rating: 5,
  },
  {
    id: "2-panel-square-top-masonite",
    title: "2 Panel Square Top Exterior Door",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/entry-doors-masonite-VxbaL2sC2qY3CcaeJb68NA.webp",
    imageUrl2: "/manus-storage/entry-door-diagram.jpg",
    brand: "Masonite",
    description: "Elegant 2-panel square top design with clean lines. Perfect for modern farmhouse and contemporary home styles.",
    features: ["2-panel design", "Square top profile", "Energy-efficient", "Multiple finishes"],
    rating: 5,
  },
  {
    id: "2-panel-santa-fe-masonite",
    title: "2 Panel Santa Fe Exterior Door",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/entry-doors-masonite-VxbaL2sC2qY3CcaeJb68NA.webp",
    imageUrl2: "/manus-storage/entry-door-diagram.jpg",
    brand: "Masonite",
    description: "Rustic 2-panel Santa Fe style door with authentic southwestern character. Adds warmth and charm to any home exterior.",
    features: ["Santa Fe style", "Rustic character", "Weather-resistant", "Authentic design"],
    rating: 5,
  },
];

export default function ExteriorDoorsInStock() {
  const [selectedProduct, setSelectedProduct] = useState<typeof inStockDoors[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedPricingProduct, setSelectedPricingProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleGetPricing = (productId: string) => {
    setSelectedPricingProduct(productId);
    setShowPricingModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData, 'Product:', selectedPricingProduct);
    setShowPricingModal(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  useEffect(() => {
    injectSchema({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Exterior Doors In Stock",
      description: "Currently available exterior doors in stock at MP Doors & More in Sherman, TX",
      url: "https://mpdoorsnmore.com/exterior-doors-in-stock",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ── BREADCRUMBS ── */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Doors", href: "/products#doors" },
          { label: "Exterior Doors In Stock" },
        ]}
      />

      {/* ── PAGE HERO ── */}
      <section className="relative bg-[#1a2e45] pt-20 pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e30]/90 via-[#0f1e30]/70 to-transparent" />

        <div className="relative container">
          <Link href="/products#doors" className="inline-flex items-center gap-2 text-[#a61c00] font-display font-semibold hover:text-white transition-colors mb-6 text-sm">
            <ChevronLeft size={16} />
            Back to Doors
          </Link>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            Exterior Doors In Stock
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Premium entry doors, patio doors, and storm doors ready for immediate purchase. A grade quality at B grade prices.
          </p>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-display font-black text-3xl text-[#1e3450] mb-12">Popular In Stock Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {inStockDoors.map((door) => (
              <div key={door.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100 group">
                  <ProductImagePlaceholder imageUrl={door.imageUrl} title={door.title} />

                  {/* In Stock Badge */}
                  <div className="absolute top-4 right-4 bg-[#1e3450] text-white px-3 py-1 rounded-full text-xs font-bold">
                    In Stock
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => {
                        setSelectedProduct(door);
                        setCurrentImageIndex(0);
                      }}
                      className="bg-white text-[#1a2e45] px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#a61c00] hover:text-white transition-colors"
                    >
                      <Search size={18} />
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display font-bold text-xl text-[#a61c00] mb-2">{door.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{door.brand}</p>
                  <p className="text-gray-700 text-sm mb-4 flex-grow">{door.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i <= door.rating ? "fill-[#a61c00] text-[#a61c00]" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{door.rating}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-sm text-[#1a2e45] mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {door.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#a61c00]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => setSelectedProduct(door)}
                      className="flex-1 bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-2 rounded font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Search size={16} />
                      Quick View
                    </button>
                    <button
                      onClick={() => window.location.href = "tel:9034211305"}
                      className="flex-1 border-2 border-[#a61c00] text-[#a61c00] hover:bg-[#a61c00] hover:text-white px-4 py-2 rounded font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Call Now
                    </button>
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
                className="text-gray-500 hover:text-gray-700 transition"
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

      {/* ── CTA SECTION ── */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1e3450]">Ready to Upgrade Your Exterior?</h2>
          <p className="text-lg text-[#1e3450] mb-8 max-w-2xl mx-auto">
            Don't see what you're looking for? Contact us today and we'll help you find the perfect exterior door solution.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#a61c00] text-white px-8 py-3 rounded font-bold hover:bg-[#8a1700] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* ── QUICK VIEW MODAL ── */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="font-display font-bold text-xl text-[#1a2e45]">{selectedProduct.title}</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors md:p-1"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Section */}
                <div className="flex flex-col gap-4">
                  <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center overflow-hidden">
                    <img
                      key={selectedProduct.images?.[currentImageIndex] || selectedProduct.imageUrl}
                      src={selectedProduct.images?.[currentImageIndex] || selectedProduct.imageUrl}
                      alt={selectedProduct.title}
                      className="w-full h-full object-contain transition-opacity duration-500"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {(selectedProduct.images || [selectedProduct.imageUrl, selectedProduct.imageUrl2]).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 px-3 py-2 rounded font-semibold text-sm transition-colors ${
                          currentImageIndex === idx
                            ? "bg-[#a61c00] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details Section */}
                <div>
                  <h4 className="font-display font-bold text-2xl text-[#1a2e45] mb-2">{selectedProduct.title}</h4>
                  <p className="text-[#a61c00] font-semibold mb-4">{selectedProduct.brand}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i <= selectedProduct.rating ? "fill-[#a61c00] text-[#a61c00]" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{selectedProduct.rating}</span>
                  </div>

                  <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-[#1a2e45] mb-3">Key Features:</h5>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#a61c00]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = "tel:9034211305"}
                      className="flex-1 bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-3 rounded font-semibold transition-colors"
                    >
                      Call Now
                    </button>
                    <button
                      onClick={() => window.location.href = "mailto:mpdoorsnmore23@gmail.com"}
                      className="flex-1 border-2 border-[#a61c00] text-[#a61c00] hover:bg-[#a61c00] hover:text-white px-4 py-3 rounded font-semibold transition-colors"
                    >
                      Get Pricing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
