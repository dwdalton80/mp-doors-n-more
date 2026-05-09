/*
 * Home Page — MP Doors & More
 * Design: Modern Farmhouse / Texas Contemporary
 * Sections: Hero, Features, Products Preview, Reviews, CTA
 * Colors: Slate Blue primary, Deep Red accent, Cream background
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Star, ChevronRight, Phone, MapPin, Clock, CheckCircle2, Facebook } from "lucide-react";
import { generateLocalBusinessSchema, injectSchema } from "@/lib/schema";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/hero-banner-JGKqZgmMvV9heZ7iiLwaZQ.webp";
const DOORS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-doors-k6uQ2prwjDGFQjGmGhVFk3.webp";
const WINDOWS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-windows-PXTs3yR42MpCtjM66Wo53F.webp";
const FLOORING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-flooring-RfCxtdvLU9XE8VY2nSVEwA.webp";
const TRIM_IMAGE = "/manus-storage/Trim-moulding_7a9873c5.jpg";

const products = [
  { title: "Doors", desc: "Interior & exterior doors in every style — from solid wood entry doors to French doors and barn doors.", image: DOORS_IMAGE, href: "/products#doors" },
  { title: "Windows", desc: "Energy-efficient vinyl windows that let the Texas sunshine in while keeping your home comfortable.", image: WINDOWS_IMAGE, href: "/products#windows" },
  { title: "Vinyl Flooring", desc: "Luxury vinyl plank flooring with the look of hardwood at a fraction of the cost.", image: FLOORING_IMAGE, href: "/products#flooring" },
  { title: "Trim & Molding", desc: "Quality trim and molding options to add the perfect finishing touches to your home's interior.", image: TRIM_IMAGE, href: "/products#trim" },
];

const features = [
  { icon: CheckCircle2, title: "A-Grade Materials", desc: "We source only top-quality construction materials — the same grade used by professional contractors." },
  { icon: CheckCircle2, title: "B-Grade Prices", desc: "Our buying power means you get premium materials without the premium markup. Real savings, every time." },
  { icon: CheckCircle2, title: "Local & Trusted", desc: "Proudly serving Sherman and the Texoma area. We're your neighbors, and we stand behind every product." },
  { icon: CheckCircle2, title: "Wide Selection", desc: "Doors, windows, flooring, siding, shingles — everything you need for your home improvement project." },
];

// Real Google Reviews from MP Doors & More Google Business page
const reviews = [
  {
    name: "Josh Cole",
    rating: 5,
    date: "8 months ago",
    text: "I absolutely love this place! Amazing people and amazing products! Rafael is wonderful along with his whole crew! They always go above and beyond in helping me out. I would certainly recommend them to anyone.",
  },
  {
    name: "Howard Cochran",
    rating: 5,
    date: "9 months ago",
    text: "Rafael took very good care of us. I live quite a ways away from Sherman and he saw to it that the two doors I was buying would be ready for me when I got there. Excellent customer service.",
  },
  {
    name: "Layth Fadhil",
    rating: 5,
    date: "7 months ago",
    text: "Amazing door selections and great customer service. You are treated like family in this place and they are ready to answer all of your questions. Give them a call.",
  },
  {
    name: "Jenn Smith",
    rating: 5,
    date: "3 months ago",
    text: "Great place. Very friendly and helpful.",
  },
  {
    name: "Monica Mackey",
    rating: 5,
    date: "a year ago",
    text: "Beautiful doors and wonderful customer service! If you need any doors check this place out!",
  },
  {
    name: "el oso",
    rating: 5,
    date: "a month ago",
    text: "Excellent service from these guys! We have been there a handful of times and never disappointed. Thank you MP Doors and More!",
  },
  {
    name: "Julie Cruz",
    rating: 5,
    date: "a month ago",
    text: "Nice place great prices very courteous thanks a million.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? "fill-[#a61c00] text-[#a61c00]" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export default function Home() {
  useEffect(() => {
    document.title = "Doors, Windows & Flooring in Sherman, TX";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shop premium doors, windows, vinyl flooring, siding, trim & molding in Sherman, TX. A-grade materials at B-grade prices. Local supplier serving Texoma.');
    }
    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    const keywords = 'doors Sherman TX, windows Sherman TX, vinyl flooring Sherman TX, siding Sherman TX, shingles Sherman TX, trim molding Sherman TX, home improvement materials, building supplies Sherman, construction materials, entry doors, interior doors, patio doors, storm doors, energy efficient windows, luxury vinyl plank, architectural shingles, vinyl siding, home renovation, local building supplies, affordable doors, quality materials, Texoma home improvement';
    metaKeywords.setAttribute('content', keywords);
    // Inject LocalBusiness schema
    injectSchema(generateLocalBusinessSchema());
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e30]/90 via-[#0f1e30]/70 to-transparent" />

        <div className="relative container pt-32 pb-20">
          <div className="max-w-2xl">
            <div className="section-label text-[#a61c00] mb-4">
              Sherman, Texas · Est. 2023
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Quality Materials.
              <span className="block text-[#a61c00]">Honest Prices.</span>
            </h1>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              MP Doors & More is your local source for premium entry doors, interior doors, patio doors, energy-efficient windows, luxury vinyl plank flooring, vinyl siding, shingles, and quality trim & molding in Sherman, TX. A-grade materials at B-grade prices. Serving Texoma with quality home improvement products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-accent text-base">
                Shop Products
              </Link>
              <Link href="/contact" className="btn-primary text-base bg-white/10 hover:bg-white/20 border border-white/30">
                Contact Us
              </Link>
            </div>

            {/* Quick info bar */}
            <div className="mt-12 flex flex-wrap gap-6">
              <a href="tel:9034211305" className="flex items-center gap-2 text-white/75 hover:text-white transition-colors text-sm">
                <Phone size={15} className="text-[#a61c00]" />
                (903) 421-1305
              </a>
              <div className="flex items-center gap-2 text-white/75 text-sm">
                <MapPin size={15} className="text-[#a61c00]" />
                3200 N Texoma Pkwy, Sherman TX
              </div>
              <div className="flex items-center gap-2 text-white/75 text-sm">
                <Clock size={15} className="text-[#a61c00]" />
                Mon-Fri 7 AM–5 PM; Sat 7 AM-3 PM
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#FAF7F2]" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Why MP Doors & More</div>
            <h2 className="section-heading text-4xl sm:text-5xl">Built on Value & Trust</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-white rounded-lg p-6 shadow-sm border border-[#e8e0d8] hover:shadow-md transition-shadow"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-md bg-[#2D4A6B]/10 flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-[#2D4A6B]" />
                </div>
                <h3 className="font-display font-bold text-[#1a2e45] text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS PREVIEW ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="section-label mb-3">What We Carry</div>
              <h2 className="section-heading text-4xl sm:text-5xl">Our Products</h2>
            </div>
            <Link href="/products" className="flex items-center gap-2 text-[#2D4A6B] font-display font-semibold hover:text-[#a61c00] transition-colors text-sm">
              View All Products <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link
                key={p.title}
                href={p.href}
                className="group block rounded-lg overflow-hidden shadow-sm border border-[#e8e0d8] hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e45]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-display font-bold text-[#1a2e45] text-lg mb-2 group-hover:text-[#a61c00] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-[#2D4A6B] font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn more <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Customer Reviews</div>
            <h2 className="section-heading text-4xl sm:text-5xl">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={20} className="fill-[#a61c00] text-[#a61c00]" />
                ))}
              </div>
              <span className="font-display font-bold text-[#1a2e45] text-lg">5.0</span>
              <span className="text-gray-500 text-sm">on Google</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white rounded-lg p-6 shadow-sm border border-[#e8e0d8]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2D4A6B] flex items-center justify-center text-white font-display font-bold text-sm">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-display font-bold text-[#1a2e45] text-sm">{r.name}</div>
                      <div className="text-gray-400 text-xs">{r.date}</div>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0 mt-1">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <StarRating rating={r.rating} />
                <p className="text-gray-600 text-sm leading-relaxed mt-3">"{r.text}"</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.google.com/maps/search/MP+Doors+More+Sherman+TX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#2D4A6B] text-[#2D4A6B] font-display font-bold py-3 px-6 rounded hover:bg-[#2D4A6B] hover:text-white transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Read All Reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* ── FACEBOOK CTA ── */}
      <section className="py-16 bg-[#1877F2]">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <Facebook size={28} className="text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-xl">Follow Us on Facebook</h3>
              <p className="text-white/80 text-sm">Stay updated on new inventory, deals, and more!</p>
            </div>
          </div>
          <a
            href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1877F2] font-display font-bold py-3 px-8 rounded hover:bg-blue-50 transition-colors shrink-0"
          >
            Visit Our Page
          </a>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-[#1a2e45]">
        <div className="container text-center">
          <div className="section-label text-[#a61c00] mb-4">Ready to Get Started?</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6">
            Visit Us in Sherman, TX
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Stop by our location at 3200 N Texoma Pkwy or give us a call. We're here to help you find the right materials at the right price.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:9034211305" className="btn-accent text-base">
              Call (903) 421-1305
            </a>
            <Link href="/contact" className="btn-primary text-base bg-white/10 hover:bg-white/20 border border-white/30">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
