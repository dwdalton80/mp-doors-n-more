/*
 * ProductTrim.tsx — MP Doors & More
 * Detailed product page for Trim & Molding category
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star, X } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReviewsSection from "@/components/ReviewsSection";

const HERO_IMAGE = "/manus-storage/Trim-moulding_7a9873c5.jpg";

const products = [
  {
    id: "baseboards",
    title: "Baseboards & Shoe Molding",
    imageUrl: "/manus-storage/baseboard-shoe_0278999b.png",
    description: "Quality baseboards and shoe molding to finish the bottom of your walls. Available in various profiles and materials.",
    brands: ["Novo", "Woodgrain"],
    features: ["Multiple profile options", "Pre-primed & paintable", "Easy installation", "Durable materials"],
    rating: 5,
  },
  {
    id: "crown-molding",
    title: "Crown Molding",
    imageUrl: "/manus-storage/crown-moulding_243def21.png",
    description: "Elegant crown molding to add architectural detail where walls meet ceilings. Transform any room with classic elegance.",
    brands: ["Novo", "Woodgrain"],
    features: ["Decorative profiles", "Pre-primed options", "Easy to install", "Adds visual interest"],
    rating: 5,
  },
  {
    id: "door-casings",
    title: "Door & Window Casings",
    imageUrl: "/manus-storage/door-trim_27e16ea0.png",
    description: "Professional door and window casings to frame your openings beautifully. Available in multiple styles and finishes.",
    brands: ["Novo", "Woodgrain"],
    features: ["Standard & custom profiles", "Pre-finished options", "Quality construction", "Professional appearance"],
    rating: 5,
  },
  {
    id: "decorative-trim",
    title: "Decorative Trim Boards",
    imageUrl: "/manus-storage/decorative-trim_4f46313b.png",
    description: "Add character and charm with decorative trim boards. Perfect for wainscoting, accents, and architectural details.",
    brands: ["Novo", "Woodgrain"],
    features: ["Various styles", "Paintable surfaces", "Durable construction", "Design flexibility"],
    rating: 4.8,
  },
];

export default function ProductTrim() {
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
    console.log('Form submitted:', formData, 'Product:', selectedProduct);
    setShowPricingModal(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  useEffect(() => {
    document.title = "Quality Trim & Molding in Sherman, TX | MP Doors & More";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop baseboards, crown molding, door casings, and decorative trim from Novo and Woodgrain. Add finishing touches to your home in Sherman, TX.');
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

      {/* ── PRODUCT CARDS ── */}
      <section className="py-20 bg-[#1a2e45]">
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
                      <div className="flex flex-wrap gap-3">
                        {product.brands.map((brand) => {
                          const brandMap: Record<string, { logo: string }> = {
                            'Novo': { logo: '/manus-storage/novo_logo_ce6a589d.jpg' },
                            'Woodgrain': { logo: '/manus-storage/woodgrain_logo_ca65de93.jpg' },
                          };
                          const brandInfo = brandMap[brand];
                          return (
                            <div
                              key={brand}
                              className="relative inline-flex items-center justify-center bg-white border-2 border-[#2D4A6B]/20 rounded-lg p-2 hover:border-[#a61c00] hover:shadow-md hover:scale-110 transition-all duration-200 h-10 group cursor-default"
                            >
                              {brandInfo?.logo ? (
                                <img
                                  src={brandInfo.logo}
                                  alt={brand}
                                  className="h-6 object-contain"
                                />
                              ) : (
                                <span className="text-xs font-label text-[#2D4A6B] text-center px-2">{brand}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleGetPricing(product.id)}
                      className="inline-block btn-accent text-sm cursor-pointer"
                    >
                      Get Pricing
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

      {/* ── REVIEWS SECTION ── */}
      <ReviewsSection
        productName="Trim & Molding"
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
