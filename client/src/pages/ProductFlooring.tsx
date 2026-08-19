/*
 * ProductFlooring.tsx — MP Doors & More
 * Detailed product page for Vinyl Flooring category
 * Design: Modern Farmhouse with deep red accents
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Star, X } from "lucide-react";
import ProductImagePlaceholder from "@/components/ProductImagePlaceholder";
import ReviewsSection from "@/components/ReviewsSection";

const HERO_IMAGE = "/images/product-flooring.webp";

const products = [
  {
    id: "spc",
    title: "SPC Flooring",
    imageUrl: "/images/products/IMG_3510_bf1f5299.JPG",
    description: "Stone Plastic Composite flooring with superior durability and waterproof protection for any room.",
    brands: ["Lawson"],
    features: ["Waterproof construction", "Realistic wood grain", "Easy installation", "Scratch resistant"],
    rating: 5,
  },
  {
    id: "lvp-glue-down",
    title: "LVP (Glue-Down)",
    imageUrl: "/images/products/IMG_3511_be4494b4.JPG",
    description: "Luxury Vinyl Plank with glue-down installation for a secure, professional finish.",
    brands: ["Lawson"],
    features: ["Stone-look options", "Slip-resistant", "Low maintenance", "Multiple colors"],
    rating: 4.9,
  },
  {
    id: "laminate",
    title: "Laminate Flooring",
    imageUrl: "/images/products/IMG_3512_15a2d594.JPG",
    description: "Durable laminate flooring with authentic wood appearance and superior scratch resistance.",
    brands: ["Lawson"],
    features: ["Seamless installation", "Waterproof", "Comfortable underfoot", "Easy to clean"],
    rating: 4.8,
  },
  {
    id: "hardwood",
    title: "Hardwood Flooring",
    imageUrl: "/images/products/IMG_3513_30148280.JPG",
    description: "Premium hardwood flooring with natural beauty and timeless elegance for any home.",
    brands: ["Lawson"],
    features: ["Durable construction", "Commercial grade", "Cost-effective", "Wide color range"],
    rating: 4.7,
  },
];

export default function ProductFlooring() {
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
    document.title = "Flooring Options in Sherman, TX | MP Doors & More";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop SPC, LVP, laminate, and hardwood flooring from Lawson. Durable, waterproof, and affordable options in Sherman, TX.');
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
          <Link href="/products" className="inline-flex items-center gap-2 text-[#a61c00] font-display font-semibold hover:text-white transition-colors mb-6 text-sm">
            <ChevronLeft size={16} />
            Back to Products
          </Link>
          <div className="section-label text-[#a61c00] mb-3">Vinyl Flooring</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Durable Flooring Solutions
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Beautiful, luxury flooring that's easy to maintain and budget-friendly. Perfect for any room in your home.
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
                            'Lawson': { logo: '/images/products/lawson_ee7b2882.webp' },
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
        productName="Flooring"
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
            Transform Your Floors Today
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Contact us today for a free consultation and pricing on any of our premium vinyl flooring options.
          </p>
          <Link href="/contact" className="inline-block btn-accent">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
