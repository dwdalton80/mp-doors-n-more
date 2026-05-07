/**
 * InteriorDoorsInStock.tsx — MP Doors & More
 * Page showcasing currently available interior doors in stock
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star, X } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import { injectSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-doors_ac3e821c.png";

const inStockDoors = [
  {
    id: "hollow-core-6panel",
    title: "Hollow Core 6-Panel",
    imageUrl: "/manus-storage/07662845.jpg_61295038.avif",
    brand: "Jeld-Wen",
    description: "Classic 6-panel design with timeless appeal. Ideal for creating a traditional look in any room.",
    price: "$89 - $129",
    quantity: "12 in stock",
    features: ["Pre hung", "Various finishes", "All sizes available"],
    rating: 5,
  },
  {
    id: "solid-core-flush",
    title: "Santa Fe Hollow Core",
    imageUrl: "/manus-storage/primed-jeld-wen-single-prehung-doors-thdjw136700668-e1_600.jpg_a36eb55b.avif",
    brand: "Masonite",
    description: "Modern Santa Fe style with clean lines and contemporary design. Perfect for contemporary interiors.",
    price: "$149 - $199",
    quantity: "8 in stock",
    features: ["Pre hung", "Various finishes", "All sizes available"],
    rating: 5,
  },
  {
    id: "bifold-closet",
    title: "Two-Panel Arch Top Hollow Core",
    imageUrl: "/manus-storage/primed-white-masonite-slab-doors-33334-e1_600.jpg_4d0837d9.avif",
    brand: "Woodgrain",
    description: "Elegant arch top design adds architectural interest. Perfect for creating a sophisticated, refined entrance.",
    price: "$79 - $119",
    quantity: "15 in stock",
    features: ["Pre hung", "Various finishes", "All sizes available"],
    rating: 5,
  },
  {
    id: "french-glass",
    title: "2-Panel Square Top Hollow Core",
    imageUrl: "/manus-storage/09738639.jpg_a8a4f3c4.avif",
    brand: "Woodgrain",
    description: "Clean square top design with classic 2-panel styling. Versatile option for any interior space.",
    price: "$199 - $299",
    quantity: "6 in stock",
    features: ["Pre hung", "Various finishes", "All sizes available"],
    rating: 5,
  },
  {
    id: "pocket-slide",
    title: "5 Panel Raised Hollow Core",
    imageUrl: "/manus-storage/light-gray-jeld-wen-slab-doors-thdjw137400019-40_600.jpg_72f99564.avif",
    brand: "Jeld-Wen",
    description: "Elegant 5-panel raised design with traditional charm. Adds character and sophistication to any room.",
    price: "$249 - $349",
    quantity: "5 in stock",
    features: ["Pre hung", "Various finishes", "All sizes available"],
    rating: 5,
  },
];

export default function InteriorDoorsInStock() {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  useEffect(() => {
    injectSchema({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Interior Doors In Stock",
      description: "Currently available interior doors in stock at MP Doors & More in Sherman, TX",
      url: "https://mpdoorsnmore.com/interior-doors-in-stock",
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
          { label: "Interior Doors In Stock" },
        ]}
      />

      {/* ── HERO SECTION ── */}
      <section
        className="relative min-h-96 flex items-center justify-center bg-cover bg-center pt-20 md:pt-24"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Interior Doors In Stock</h1>
          <p className="text-xl md:text-2xl mb-8">Available now at our Sherman, TX location</p>
          <Link
            href="/contact"
            className="inline-block bg-[#a61c00] hover:bg-[#8b1600] text-white px-8 py-3 rounded font-bold transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-[#a61c00] text-sm font-bold tracking-widest mb-2">READY TO PURCHASE</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular In Stock Options</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These interior doors are in stock and ready for immediate purchase and installation. Visit us in Sherman, TX or call for availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inStockDoors.map((door) => (
              <div key={door.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200">
                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setEnlargedImage(door.imageUrl)}>
                  <ProductImagePlaceholder
                    imageUrl={door.imageUrl}
                    title={door.title}
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[#a61c00] text-xs font-bold tracking-widest mb-1">{door.brand}</p>
                      <h3 className="text-xl font-bold text-[#a61c00] mb-2">{door.title}</h3>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(door.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#a61c00] text-[#a61c00]" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{door.description}</p>

                  {/* Features */}
                  <ul className="mb-6 space-y-2">
                    {door.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#a61c00] rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <Link
                      href="/contact"
                      className="flex-1 text-center bg-[#a61c00] hover:bg-[#8b1600] text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                    >
                      Get Pricing
                    </Link>
                    <a
                      href="tel:9034211305"
                      className="flex-1 text-center border-2 border-[#a61c00] text-[#a61c00] hover:bg-[#a61c00] hover:text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-16 md:py-24 bg-secondary text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1e3450]">Ready to Upgrade Your Interior?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-[#1e3450]">
            Visit MP Doors & More in Sherman, TX to see our full selection of in-stock interior doors. Our team is ready to help you find the perfect doors for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:9034211305"
              className="inline-block bg-[#a61c00] hover:bg-[#8b1600] text-white px-8 py-3 rounded font-bold transition-colors"
            >
              Call (903) 421-1305
            </a>
            <Link
              href="/contact"
              className="inline-block bg-white hover:bg-gray-100 text-[#1e3450] px-8 py-3 rounded font-bold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── IMAGE MODAL ── */}
      {enlargedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setEnlargedImage(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6 text-black" />
            </button>
            <img src={enlargedImage} alt="Enlarged product" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
