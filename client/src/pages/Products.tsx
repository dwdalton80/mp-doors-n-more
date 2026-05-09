/*
 * Products Page — MP Doors & More
 * Design: Modern Farmhouse / Texas Contemporary
 * Sections: Hero, Product Categories with details, CTA
 */

import { Link } from "wouter";
import { ChevronRight, Phone } from "lucide-react";

const DOORS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-doors-k6uQ2prwjDGFQjGmGhVFk3.webp";
const WINDOWS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-windows-PXTs3yR42MpCtjM66Wo53F.webp";
const FLOORING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-flooring-RfCxtdvLU9XE8VY2nSVEwA.webp";
const SIDING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-siding-shingles-fKLGGBqMKdEog8eBUzkgpC.webp";
const TRIM_IMAGE = "/manus-storage/Trim-moulding_7a9873c5.jpg";

const categories = [
  {
    id: "doors",
    title: "Doors",
    subtitle: "Interior & Exterior",
    image: DOORS_IMAGE,
    description:
      "We carry a wide selection of interior and exterior doors for every style and budget. From solid wood panel doors and glass-insert entry doors to French doors, sliding barn doors, and grand entry doors — we have what your home needs.",
    features: [
      "Solid wood interior doors",
      "Steel & fiberglass exterior entry doors",
      "French doors & double doors",
      "Sliding barn doors",
      "Grand entry doors with sidelights",
      "Pre-hung and slab options",
    ],
    accent: "#2D4A6B",
  },
  {
    id: "windows",
    title: "Windows",
    subtitle: "Energy-Efficient Vinyl",
    image: WINDOWS_IMAGE,
    description:
      "Our windows are designed for the Texas climate — energy-efficient, durable, and beautiful. We carry single-hung, casement, sliding, and picture windows in a variety of sizes and styles to fit any home.",
    features: [
      "Single-hung windows",
      "Casement & awning windows",
      "Sliding windows",
      "Picture & bay windows",
      "Vinyl frames — low maintenance",
      "Energy-efficient glass options",
    ],
    accent: "#a61c00",
  },
  {
    id: "flooring",
    title: "Flooring",
    subtitle: "SPC, LVP, Laminate & Hardwood",
    image: FLOORING_IMAGE,
    description:
      "Premium flooring options from Lawson featuring SPC, luxury vinyl plank, laminate, and hardwood. Durable, waterproof, and beautiful finishes for every room in your home.",
    features: [
      "SPC (Stone Plastic Composite)",
      "LVP (Glue-Down)",
      "Laminate flooring",
      "Hardwood flooring",
      "Waterproof & scratch resistant",
      "Professional installation available",
    ],
    accent: "#2D4A6B",
  },
  {
    id: "siding",
    title: "Siding & Shingles",
    subtitle: "Exterior Protection & Beauty",
    image: SIDING_IMAGE,
    description:
      "Protect and beautify your home's exterior with our selection of vinyl siding and architectural shingles. Built to withstand Texas weather, our exterior products combine durability with curb appeal.",
    features: [
      "Vinyl lap siding",
      "Architectural asphalt shingles",
      "Trim boards & accessories",
      "Multiple color options",
      "Weather-resistant materials",
      "Contractor-grade quality",
    ],
    accent: "#a61c00",
  },
  {
    id: "trim",
    title: "Trim & Molding",
    subtitle: "Finishing Touches",
    image: TRIM_IMAGE,
    description:
      "Complete your home improvement project with quality trim and molding. From baseboards and crown molding to door casings and decorative accents, we have everything you need to add the perfect finishing touches.",
    features: [
      "Baseboards & shoe molding",
      "Crown molding",
      "Door & window casings",
      "Decorative trim boards",
      "Pre-primed & paintable options",
      "Multiple profiles & styles",
    ],
    accent: "#2D4A6B",
  },
];

export default function Products() {
  return (
    <div className="min-h-screen">
      {/* ── PAGE HERO ── */}
      <section className="relative bg-[#1a2e45] pt-32 pb-16">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #a61c00 0, #a61c00 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px"
          }}
        />
        <div className="relative container">
          <div className="section-label text-[#a61c00] mb-3">What We Carry</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Our Products
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            From entry doors to roofing shingles, we carry everything you need for your home improvement project — all at prices that make sense.
          </p>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ── */}
      <div className="bg-[#FAF7F2]">
        {categories.map((cat, index) => (
          <section
            key={cat.id}
            id={cat.id}
            className={`py-20 ${index % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}
          >
            <div className="container">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                {/* Clickable Image */}
                <Link href={`/products/${cat.id}`} onClick={() => window.scrollTo(0, 0)} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                  <div className="relative overflow-hidden h-80 sm:h-96">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className="absolute top-4 left-4 text-white text-xs font-label tracking-widest uppercase py-1.5 px-3 rounded"
                      style={{ backgroundColor: cat.accent }}
                    >
                      {cat.subtitle}
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className={`${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <div className="section-label mb-2" style={{ color: cat.accent }}>
                    {cat.subtitle}
                  </div>
                  <h2 className="section-heading text-4xl sm:text-5xl mb-4">{cat.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{cat.description}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {cat.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <ChevronRight size={14} style={{ color: cat.accent }} className="shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    <Link href={`/products/${cat.id}`} onClick={() => window.scrollTo(0, 0)} className="btn-accent">
                      View Details
                    </Link>
                    <a href="tel:9034211305" className="flex items-center gap-2 text-[#2D4A6B] font-display font-semibold hover:text-[#a61c00] transition-colors text-sm">
                      <Phone size={15} />
                      (903) 421-1305
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── TRIM & MORE ── */}
      <section className="py-16 bg-[#2D4A6B]">
        <div className="container text-center">
          <div className="section-label text-[#a61c00] mb-3">And More</div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">
            Accessories & Construction Materials
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            In addition to our main product categories, we also carry a variety of other construction materials. If you don't see what you need, give us a call — we may be able to source it for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:9034211305" className="btn-accent">
              Call Us Today
            </a>
            <Link href="/contact" className="btn-primary bg-white/10 hover:bg-white/20 border border-white/30">
              Send an Inquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
