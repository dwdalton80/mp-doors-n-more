/**
 * PatioDoorSpecialOrder.tsx — MP Doors & More
 * Page showcasing special order patio and sliding doors
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star, X, Search } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import { injectSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-doors_ac3e821c.png";

const specialOrderDoors = [
  {
    id: "patio-french-doors",
    title: "French Patio Doors",
    imageUrl: "/manus-storage/IMG_3578_2d2e4a07.WEBP",
    imageUrl2: "/manus-storage/IMG_3579_25fc7e3b.JPG",
    brand: "Anderson",
    description: "Elegant French-style patio doors with multiple glass panes. Perfect for traditional and transitional home designs.",
    features: ["Multiple glass pane options", "Custom sizing available", "Weather-resistant seals", "Various frame colors"],
    rating: 5,
  },
  {
    id: "patio-bifold-doors",
    title: "Bifold Patio Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/patio-doors-anderson-453ALUekUqfU6wxXFg5Wd6.webp",
    imageUrl2: "/manus-storage/patio-door-diagram.jpg",
    brand: "Anderson",
    description: "Space-saving bifold doors that fold to the side for maximum opening. Ideal for modern and contemporary homes.",
    features: ["Space-saving design", "Smooth operation", "Custom configurations", "Energy-efficient glass"],
    rating: 5,
  },
  {
    id: "patio-pocket-doors",
    title: "Pocket Patio Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/patio-doors-anderson-453ALUekUqfU6wxXFg5Wd6.webp",
    imageUrl2: "/manus-storage/patio-door-diagram.jpg",
    brand: "Anderson",
    description: "Pocket doors slide into the wall for a seamless indoor-outdoor connection. Perfect for open floor plans.",
    features: ["Slides into wall", "Maximizes space", "Custom sizes", "Premium hardware"],
    rating: 5,
  },
  {
    id: "patio-sliding-glass",
    title: "Sliding Glass Patio Doors",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663585381002/ewrgsBYn5kz4enQN79TrkM/patio-doors-anderson-453ALUekUqfU6wxXFg5Wd6.webp",
    imageUrl2: "/manus-storage/patio-door-diagram.jpg",
    brand: "Anderson",
    description: "Classic sliding glass doors with smooth operation and excellent weather protection. Timeless design.",
    features: ["Smooth sliding operation", "Low-E glass", "Durable frames", "Easy maintenance"],
    rating: 5,
  },
];

export default function PatioDoorSpecialOrder() {
  const [selectedProduct, setSelectedProduct] = useState<typeof specialOrderDoors[0] | null>(null);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<typeof specialOrderDoors[0] | null>(null);
  const [quoteFormData, setQuoteFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleGetQuote = (doorId: string) => {
    const door = specialOrderDoors.find(d => d.id === doorId);
    if (door) {
      setSelectedProductForQuote(door);
      setShowQuoteModal(true);
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request:", { ...quoteFormData, product: selectedProductForQuote?.title });
    setShowQuoteModal(false);
    setQuoteFormData({ name: "", email: "", phone: "", message: "" });
  };

  useEffect(() => {
    injectSchema({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Patio & Sliding Doors Special Order",
      description: "Custom special order patio and sliding doors at MP Doors & More in Sherman, TX",
      url: "https://mpdoorsnmore.com/patio-doors-special-order",
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
          { label: "Patio Doors Special Order" },
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
            Patio & Sliding Doors Special Order
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Custom patio and sliding doors built to your specifications. We work with you to create the perfect solution for your home.
          </p>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-display font-black text-3xl text-[#1e3450] mb-12">Special Order Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {specialOrderDoors.map((door) => (
              <div key={door.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100 group">
                  <ProductImagePlaceholder imageUrl={door.imageUrl} title={door.title} />

                  {/* Special Order Badge */}
                  <div className="absolute top-4 right-4 bg-[#a61c00] text-white px-3 py-1 rounded-full text-xs font-bold">
                    Special Order
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => {
                        setSelectedProduct(door);
                        setShowSecondImage(false);
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
                      onClick={() => handleGetQuote(door.id)}
                      className="flex-1 border-2 border-[#a61c00] text-[#a61c00] hover:bg-[#a61c00] hover:text-white px-4 py-2 rounded font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1e3450]">Ready to Order Your Custom Patio Doors?</h2>
          <p className="text-lg text-[#1e3450] mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your custom patio door project. We'll help you find the perfect solution for your home.
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
                className="p-1 hover:bg-gray-100 rounded transition-colors"
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
                      key={showSecondImage ? selectedProduct.imageUrl2 : selectedProduct.imageUrl}
                      src={showSecondImage ? selectedProduct.imageUrl2 : selectedProduct.imageUrl}
                      alt={selectedProduct.title}
                      className="w-full h-full object-contain transition-opacity duration-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowSecondImage(false)}
                      className={`flex-1 py-2 rounded font-semibold text-sm transition-colors ${
                        !showSecondImage
                          ? "bg-[#a61c00] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Image 1
                    </button>
                    <button
                      onClick={() => setShowSecondImage(true)}
                      className={`flex-1 py-2 rounded font-semibold text-sm transition-colors ${
                        showSecondImage
                          ? "bg-[#a61c00] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Image 2
                    </button>
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
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── GET QUOTE MODAL ── */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowQuoteModal(false)}>
          <div className="bg-white rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#1e3450] text-white p-6 flex justify-between items-center">
              <h3 className="font-bold text-lg">Get Quote for {selectedProductForQuote?.title}</h3>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="p-1 hover:bg-[#152a3a] rounded transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleQuoteSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={quoteFormData.name}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3450]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={quoteFormData.email}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3450]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  value={quoteFormData.phone}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3450]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Message</label>
                <textarea
                  value={quoteFormData.message}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3450]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#a61c00] hover:bg-[#8a1700] text-white font-bold py-2 rounded transition-colors"
              >
                Submit Quote Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
