/**
 * EntryDoorsInStock.tsx — MP Doors & More
 * Page showcasing currently available entry doors in stock
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
    title: "6 Lite Mahogany with Flemish Glass",
    imageUrl: "/manus-storage/Door_Southwood_Double_Wood_Mahogany_Front_Entry_Door_6_Lite_2a__59869-Edited_02505368.jpg",
    imageUrl2: "/manus-storage/4526628-1_57f1d97a.jpg",
    images: [
      "/manus-storage/Door_Southwood_Double_Wood_Mahogany_Front_Entry_Door_6_Lite_2a__59869-Edited_02505368.jpg",
      "/manus-storage/4526628-1_57f1d97a.jpg"
    ],
    brand: "Jeld-Wen",
    description: "Elegant 6 lite mahogany entry door with beautiful flemish glass pattern. Premium wood construction with authentic mahogany finish provides timeless elegance and durability for your home entrance.",
    features: ["6 lite glass panel", "Flemish glass pattern", "Mahogany wood construction", "Classic design"],
    rating: 5,
  },
  {
    id: "entry-door-jeldwen",
    title: "4 Lite Contemporary Mahogany With Frosted Glass",
    imageUrl: "/manus-storage/Screenshot2026-05-15at10.49.16PM_55ed9169.png",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at10.48.11PM_3f1d3511.png",
    imageUrl3: "/manus-storage/Screenshot2026-05-15at10.49.11PM_ba55a7e9.png",
    images: [
      "/manus-storage/Screenshot2026-05-15at10.49.16PM_55ed9169.png",
      "/manus-storage/Screenshot2026-05-15at10.48.11PM_3f1d3511.png",
      "/manus-storage/Screenshot2026-05-15at10.49.11PM_ba55a7e9.png"
    ],
    brand: "Masonite",
    description: "Contemporary 4 lite mahogany entry door with beautiful frosted glass panels. Modern design with frosted glass provides privacy while allowing natural light. Premium mahogany construction with elegant contemporary styling.",
    features: ["4 lite frosted glass panel", "Contemporary design", "Mahogany wood construction", "Privacy glass"],
    rating: 5,
  },
  {
    id: "patio-door-anderson",
    title: "4 Lite Mahogany Door with Flemish Glass",
    imageUrl: "/manus-storage/Screenshot2026-05-15at10.59.47PM_c9a22b59.png",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at10.57.35PM_63cc0e36.png",
    images: [
      "/manus-storage/Screenshot2026-05-15at10.59.47PM_c9a22b59.png",
      "/manus-storage/Screenshot2026-05-15at10.57.35PM_63cc0e36.png"
    ],
    brand: "Jeld-Wen",
    description: "Beautiful 4 lite mahogany entry door with elegant flemish glass pattern. Premium wood construction with authentic mahogany finish and beautiful glass detailing provides timeless elegance and durability for your home entrance.",
    features: ["4 lite glass panel", "Flemish glass pattern", "Mahogany wood construction", "Classic design"],
    rating: 5,
  },
  {
    id: "storm-door-larson",
    title: "6 Lite Mahogany Door with Clear Glass",
    imageUrl: "/manus-storage/Screenshot2026-05-15at11.02.45PM_afaa9b39.png",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at11.02.10PM_5e1314d0.png",
    imageUrl3: "/manus-storage/Screenshot2026-05-15at10.45.56PM_fd468fe3.png",
    imageUrl4: "/manus-storage/7231-1_5f2b9e4b-0523-4eb9-bfee-bdcee1d8a6f7_1cd4a6f3.jpeg",
    images: [
      "/manus-storage/Screenshot2026-05-15at11.02.45PM_afaa9b39.png",
      "/manus-storage/Screenshot2026-05-15at11.02.10PM_5e1314d0.png",
      "/manus-storage/Screenshot2026-05-15at10.45.56PM_fd468fe3.png",
      "/manus-storage/7231-1_5f2b9e4b-0523-4eb9-bfee-bdcee1d8a6f7_1cd4a6f3.jpeg"
    ],
    brand: "Masonite",
    description: "Beautiful 6 lite mahogany entry door with clear glass panels. Premium wood construction with authentic mahogany finish and clear glass detailing provides timeless elegance and maximum natural light for your home entrance.",
    features: ["6 lite glass panel", "Clear glass", "Mahogany wood construction", "Classic design"],
    rating: 4.8,
  },
  {
    id: "full-lite-vista-grand-larson",
    title: "8 Lite Craftsman Mahogany Door",
    imageUrl: "/manus-storage/Screenshot2026-05-15at11.09.47PM_80d00f3c.png",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at11.09.55PM_1bab30be.png",
    images: [
      "/manus-storage/Screenshot2026-05-15at11.09.47PM_80d00f3c.png",
      "/manus-storage/Screenshot2026-05-15at11.09.55PM_1bab30be.png"
    ],
    brand: "Jeld-Wen",
    description: "Beautiful 8 lite craftsman mahogany entry door with classic grid pattern. Premium wood construction with authentic mahogany finish and elegant glass detailing provides timeless craftsman style and durability for your home entrance.",
    features: ["8 lite glass panel", "Craftsman design", "Mahogany wood construction", "Classic style"],
    rating: 4.8,
  },
  {
    id: "entry-door-6",
    title: "Full Lite Mahogany Door",
    imageUrl: "/manus-storage/Door_Southwood_Double_Wood_Mahogany_Front_Entry_Door_6_Lite_2a__59869-Edited_02505368.jpg",
    imageUrl2: "/manus-storage/4526628-1_57f1d97a.jpg",
    images: [
      "/manus-storage/Door_Southwood_Double_Wood_Mahogany_Front_Entry_Door_6_Lite_2a__59869-Edited_02505368.jpg",
      "/manus-storage/4526628-1_57f1d97a.jpg"
    ],
    brand: "Masonite",
    description: "Stunning full lite mahogany entry door with premium glass panels. Premium wood construction with authentic mahogany finish and clear glass provides maximum natural light and timeless elegance for your home entrance.",
    features: ["Full lite glass panel", "Clear glass", "Mahogany wood construction", "Classic design"],
    rating: 5,
  },
  {
    id: "entry-door-7",
    title: "Half Lite Mahogany Door",
    imageUrl: "/manus-storage/Screenshot2026-05-15at10.49.16PM_55ed9169.png",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at10.48.11PM_3f1d3511.png",
    images: [
      "/manus-storage/Screenshot2026-05-15at10.49.16PM_55ed9169.png",
      "/manus-storage/Screenshot2026-05-15at10.48.11PM_3f1d3511.png"
    ],
    brand: "Jeld-Wen",
    description: "Beautiful half lite mahogany entry door with elegant glass panel. Premium wood construction with authentic mahogany finish provides privacy while allowing natural light for your home entrance.",
    features: ["Half lite glass panel", "Clear glass", "Mahogany wood construction", "Classic design"],
    rating: 5,
  },
  {
    id: "entry-door-8",
    title: "9 Lite Mahogany Door",
    imageUrl: "/manus-storage/Screenshot2026-05-15at10.59.47PM_c9a22b59.png",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at10.57.35PM_63cc0e36.png",
    images: [
      "/manus-storage/Screenshot2026-05-15at10.59.47PM_c9a22b59.png",
      "/manus-storage/Screenshot2026-05-15at10.57.35PM_63cc0e36.png"
    ],
    brand: "Masonite",
    description: "Beautiful 9 lite mahogany entry door with elegant grid pattern. Premium wood construction with authentic mahogany finish and beautiful glass detailing provides timeless elegance and natural light for your home entrance.",
    features: ["9 lite glass panel", "Grid pattern", "Mahogany wood construction", "Classic design"],
    rating: 4.8,
  },
  {
    id: "entry-door-9",
    title: "3 Panel Mahogany Door",
    imageUrl: "/manus-storage/Screenshot2026-05-15at11.02.45PM_afaa9b39.png",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at11.02.10PM_5e1314d0.png",
    images: [
      "/manus-storage/Screenshot2026-05-15at11.02.45PM_afaa9b39.png",
      "/manus-storage/Screenshot2026-05-15at11.02.10PM_5e1314d0.png"
    ],
    brand: "Jeld-Wen",
    description: "Classic 3-panel mahogany entry door with traditional styling. Premium wood construction with authentic mahogany finish provides timeless elegance and durability for your home entrance.",
    features: ["3-panel design", "Traditional style", "Mahogany wood construction", "Classic design"],
    rating: 5,
  },
  {
    id: "entry-door-10",
    title: "Arched Top Mahogany Door",
    imageUrl: "/manus-storage/Screenshot2026-05-15at10.49.16PM_55ed9169.png",
    imageUrl2: "/manus-storage/Screenshot2026-05-15at10.48.11PM_3f1d3511.png",
    images: [
      "/manus-storage/Screenshot2026-05-15at10.49.16PM_55ed9169.png",
      "/manus-storage/Screenshot2026-05-15at10.48.11PM_3f1d3511.png"
    ],
    brand: "Masonite",
    description: "Elegant arched top mahogany entry door with beautiful glass panel. Premium wood construction with authentic mahogany finish and arched design provides distinctive character and timeless elegance for your home entrance.",
    features: ["Arched top design", "Glass panel", "Mahogany wood construction", "Classic design"],
    rating: 4.8,
  },
];

export default function EntryDoorsInStock() {
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedDoor, setSelectedDoor] = useState<(typeof inStockDoors)[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleQuickView = (door: (typeof inStockDoors)[0]) => {
    setSelectedDoor(door);
    setCurrentImageIndex(0);
    setShowQuickView(true);
  };

  const handleNextImage = () => {
    if (selectedDoor) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedDoor.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedDoor) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedDoor.images.length) % selectedDoor.images.length);
    }
  };

  const filteredDoors = inStockDoors.filter((door) =>
    door.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    door.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.title = "Entry Doors In Stock | MP Doors & More";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop premium mahogany entry doors in stock in Sherman, TX. A-grade quality at B-grade prices.');
    }
    injectSchema({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "MP Doors & More - Entry Doors In Stock",
      description: "Premium entry doors in stock in Sherman, TX",
    });
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
              { label: "Doors", href: "/products/doors" },
              { label: "Entry Doors In Stock" },
            ]} />
          </div>
          <Link href="/products/doors" className="inline-flex items-center gap-2 text-[#a61c00] font-display font-semibold hover:text-white transition-colors mb-6 text-sm">
            <ChevronLeft size={16} />
            Back to Doors
          </Link>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Entry Doors In Stock
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Premium mahogany entry doors available now. Premium materials at honest prices.
          </p>
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a61c00]"
            />
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoors.map((door) => (
              <div key={door.id} className="group">
                <div className="bg-[#FAF7F2] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <ProductImagePlaceholder imageUrl={door.imageUrl} title={door.title} />

                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg text-[#1a2e45] mb-2">{door.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{door.brand}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{door.description}</p>

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
                    <div className="mb-4">
                      <ul className="space-y-1">
                        {door.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#a61c00]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleQuickView(door)}
                      className="w-full btn-accent text-sm"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK VIEW MODAL ── */}
      {showQuickView && selectedDoor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="font-display font-bold text-2xl text-[#1a2e45]">{selectedDoor.title}</h2>
              <button onClick={() => setShowQuickView(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Image Gallery */}
              <div className="mb-6">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <ProductImagePlaceholder imageUrl={selectedDoor.images[currentImageIndex]} title={selectedDoor.title} />
                </div>

                {/* Image Navigation */}
                {selectedDoor.images.length > 1 && (
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handlePrevImage}
                      className="px-4 py-2 bg-[#1a2e45] text-white rounded hover:bg-[#0f1e30] transition"
                    >
                      ← Previous
                    </button>
                    <div className="flex gap-2">
                      {selectedDoor.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-8 h-8 rounded font-semibold transition ${
                            idx === currentImageIndex
                              ? "bg-[#a61c00] text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleNextImage}
                      className="px-4 py-2 bg-[#1a2e45] text-white rounded hover:bg-[#0f1e30] transition"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-display font-semibold text-[#1a2e45] mb-2">Brand</h3>
                  <p className="text-gray-600">{selectedDoor.brand}</p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-[#1a2e45] mb-2">Description</h3>
                  <p className="text-gray-600">{selectedDoor.description}</p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-[#1a2e45] mb-2">Features</h3>
                  <ul className="space-y-1">
                    {selectedDoor.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a61c00]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full btn-accent">Get Pricing</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
