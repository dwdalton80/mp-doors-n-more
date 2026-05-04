/*
 * ProductTrim.tsx — MP Doors & More
 * Detailed product page for Trim & Molding category
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import Breadcrumbs from "@/components/Breadcrumbs";

const HERO_IMAGE = "/manus-storage/Trim-moulding_7a9873c5.jpg";

const products = [
  {
    id: "baseboards",
    title: "Baseboards & Shoe Molding",
    imageUrl: "/manus-storage/baseboard-shoe_0278999b.png",
    description: "Quality baseboards and shoe molding to finish the bottom of your walls. Available in various profiles and materials.",
    brands: ["Nova", "Woodgrain"],
    features: ["Multiple profile options", "Pre-primed & paintable", "Easy installation", "Durable materials"],
    rating: 5,
  },
  {
    id: "crown-molding",
    title: "Crown Molding",
    imageUrl: "/manus-storage/crown-moulding_243def21.png",
    description: "Elegant crown molding to add architectural detail where walls meet ceilings. Transform any room with classic elegance.",
    brands: ["Nova", "Woodgrain"],
    features: ["Decorative profiles", "Pre-primed options", "Easy to install", "Adds visual interest"],
    rating: 5,
  },
  {
    id: "door-casings",
    title: "Door & Window Casings",
    imageUrl: "/manus-storage/door-trim_27e16ea0.png",
    description: "Professional door and window casings to frame your openings beautifully. Available in multiple styles and finishes.",
    brands: ["Nova", "Woodgrain"],
    features: ["Standard & custom profiles", "Pre-finished options", "Quality construction", "Professional appearance"],
    rating: 5,
  },
  {
    id: "decorative-trim",
    title: "Decorative Trim Boards",
    imageUrl: "/manus-storage/decorative-trim_4f46313b.png",
    description: "Add character and charm with decorative trim boards. Perfect for wainscoting, accents, and architectural details.",
    brands: ["Nova", "Woodgrain"],
    features: ["Various styles", "Paintable surfaces", "Durable construction", "Design flexibility"],
    rating: 4.8,
  },
];

export default function ProductTrim() {
  useEffect(() => {
    document.title = "Quality Trim & Molding in Sherman, TX | MP Doors & More";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop baseboards, crown molding, door casings, and decorative trim from Nova and Woodgrain. Add finishing touches to your home in Sherman, TX.');
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
              { label: "Trim & Molding" },
            ]} />
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-[#a61c00] font-display font-semibold hover:text-white transition-colors mb-6 text-sm">
            <ChevronLeft size={16} />
            Back to Products
          </Link>
          <div className="section-label text-[#a61c00] mb-3">Trim & Molding</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Quality Trim & Molding
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            From baseboards to crown molding, we offer premium trim options to add the perfect finishing touches to your home.
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
                <div className="bg-[#FAF7F2] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <ProductImagePlaceholder imageUrl={product.imageUrl} title={product.title} />

                  <div className="p-6 flex flex-col flex-1">
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
                      <span className="text-sm text-gray-600">{product.rating}/5</span>
                    </div>

                    {/* Features */}
                    <div className="mb-4 flex-1">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Key Features:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="text-[#a61c00] mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Available Brands */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Available Brands:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.brands.map((brand) => (
                          <span key={brand} className="inline-block bg-[#2D4A6B]/10 text-[#2D4A6B] text-xs font-label px-3 py-1 rounded">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <a href="tel:9034211305" className="block w-full text-center bg-[#a61c00] text-white py-2 rounded font-semibold hover:bg-[#8a1700] transition">
                      Call for Pricing
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-16 md:py-24 bg-[#2D4A6B]">
        <div className="container text-center">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6">
            Let's Find Your Perfect Trim
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Call or contact us today for product availability, free consultation and pricing on any of our trim and molding options.
          </p>
          <Link href="/contact" className="inline-block btn-accent">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
