/**
 * PatioDoorSpecialOrder.tsx — MP Doors & More
 * Page showcasing special order patio and sliding doors
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star, Search } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import QuickViewModal from "@/components/QuickViewModal";
import QuoteModal from "@/components/QuoteModal";
import { useQuoteModal } from "@/hooks/useQuoteModal";
import { injectSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

const HERO_IMAGE = "/images/product-doors.webp";

const specialOrderDoors = [
  {
    id: "patio-french-doors",
    title: "French Patio Doors",
    imageUrl: "/images/products/IMG_3578_2d2e4a07.WEBP",
    images: [
      "/images/products/IMG_3578_2d2e4a07.WEBP",
      "/images/products/IMG_3580_63de9df7.JPG",
      "/images/products/IMG_3581_e82caeea.PNG",
      "/images/products/IMG_3582_14d1f7b8.PNG",
      "/images/products/IMG_3583_4acccc85.PNG",
      "/images/products/IMG_3584_5e5464ba.PNG"
    ],
    brand: "Anderson",
    description: "Elegant French-style patio doors with multiple glass panes. Perfect for traditional and transitional home designs.",
    features: ["Multiple glass pane options", "Custom sizing available", "Weather-resistant seals", "Various frame colors"],
    rating: 5,
  },
  {
    id: "patio-bifold-doors",
    title: "Bifold Patio Doors",
    imageUrl: "/images/patio-doors-anderson.webp",
    images: [
      "/images/patio-doors-anderson.webp",
      "/images/products/IMG_3593_04eafb59.JPG",
      "/images/products/IMG_3594_0ef4930b.WEBP",
      "/images/products/IMG_3595_b193e8ba.JPG"
    ],
    brand: "Anderson",
    description: "Space-saving bifold doors that fold to the side for maximum opening. Ideal for modern and contemporary homes.",
    features: ["Space-saving design", "Smooth operation", "Custom configurations", "Energy-efficient glass"],
    rating: 5,
  },
  {
    id: "patio-sliding-glass",
    title: "Sliding Glass Patio Doors",
    imageUrl: "/images/products/slidingglassdoor_7d2e02cf.jpeg",
    images: [
      "/images/products/slidingglassdoor2_3c693638.jpeg",
      "/images/products/slidingglassdoor_7d2e02cf.jpeg",
      "/images/products/slidingpatiodoor4_cba34098.jpeg",
      "/images/products/slidingpatiodoor3_aa8461e5.jpeg"
    ],
    brand: "Anderson",
    description: "Classic sliding glass doors with smooth operation and excellent weather protection. Timeless design.",
    features: ["Smooth sliding operation", "Low-E glass", "Durable frames", "Easy maintenance"],
    rating: 5,
  },
];

export default function PatioDoorSpecialOrder() {
  const [selectedProduct, setSelectedProduct] = useState<typeof specialOrderDoors[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const quote = useQuoteModal(specialOrderDoors);

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
                      onClick={() => {
                        setSelectedProduct(door);
                        setCurrentImageIndex(0);
                      }}
                      className="flex-1 bg-[#1e3450] hover:bg-[#152a3a] text-white px-4 py-2 rounded font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Search size={16} />
                      Quick View
                    </button>
                    <button
                      onClick={() => quote.open(door.id)}
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
        <QuickViewModal
          product={selectedProduct}
          currentImageIndex={currentImageIndex}
          onSelectImage={setCurrentImageIndex}
          onClose={() => setSelectedProduct(null)}
          onGetQuote={quote.open}
        />
      )}

      {/* ── GET QUOTE MODAL ── */}
      {quote.isOpen && (
        <QuoteModal
          productTitle={quote.selectedProduct?.title}
          formData={quote.formData}
          onFormDataChange={quote.setFormData}
          error={quote.error}
          success={quote.success}
          isSubmitting={quote.isSubmitting}
          onClose={quote.close}
          onSubmit={quote.submit}
        />
      )}
    </div>
  );
}
