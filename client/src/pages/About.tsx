/*
 * About Page — MP Doors & More
 * Design: Modern Farmhouse / Texas Contemporary
 * Story, mission, values, location
 */

import { Link } from "wouter";
import { CheckCircle2, MapPin, Phone, Mail, Facebook } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/hero-banner-JGKqZgmMvV9heZ7iiLwaZQ.webp";
const SIDING_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/product-siding-shingles-fKLGGBqMKdEog8eBUzkgpC.webp";

const values = [
  { title: "Quality First", desc: "We only carry A grade construction materials — the same products used by professional contractors and builders." },
  { title: "Fair Pricing", desc: "Our direct sourcing relationships allow us to pass real savings on to our customers. A grade material at B grade prices." },
  { title: "Community Roots", desc: "We're a locally owned business in Sherman, Texas. We serve our neighbors and take pride in our community." },
  { title: "Wide Selection", desc: "From entry doors to vinyl flooring, we carry a broad range of products so you can find everything in one place." },
  { title: "Knowledgeable Staff", desc: "Our team knows construction materials inside and out. We'll help you find exactly what your project needs." },
  { title: "In-Store & Delivery", desc: "Shop in person at our Sherman location, or ask about delivery options for larger orders." },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ── PAGE HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e30]/90 via-[#0f1e30]/50 to-[#0f1e30]/30" />
        <div className="relative container pb-12 pt-32">
          <div className="section-label text-[#a61c00] mb-2">Our Story</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white">About MP Doors & More</h1>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="section-label mb-3">Who We Are</div>
              <h2 className="section-heading text-3xl sm:text-4xl mb-6">
                Your Trusted Local Home Improvement Supplier
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  MP Doors & More is a locally owned and operated home improvement supplier located in Sherman, Texas. We specialize in buying and selling quality construction materials — including interior and exterior doors, windows, vinyl flooring, siding, shingles, and trim.
                </p>
                <p>
                  Our mission is simple: bring A grade materials to homeowners, contractors, and builders at prices that make sense. We believe that quality home improvement shouldn't require a premium budget, and we work hard every day to make that a reality for our customers in the Texoma area.
                </p>
                <p>
                  Whether you're renovating a single room or tackling a full exterior overhaul, MP Doors & More has the products and expertise to help you get the job done right — without breaking the bank.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products" className="btn-accent">Browse Products</Link>
                <Link href="/contact" className="btn-primary">Contact Us</Link>
              </div>
            </div>

            <div className="relative">
              <img
                src={SIDING_IMAGE}
                alt="Quality home exterior with siding and shingles"
                className="rounded-lg shadow-xl w-full object-cover h-80 sm:h-96"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#a61c00] text-white rounded-lg p-5 shadow-xl">
                <div className="font-display font-black text-3xl leading-none">A-Grade</div>
                <div className="font-label text-sm tracking-widest uppercase mt-1 text-white/80">Materials</div>
                <div className="font-display font-black text-3xl leading-none mt-2">B-Grade</div>
                <div className="font-label text-sm tracking-widest uppercase text-white/80">Prices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Our Commitment</div>
            <h2 className="section-heading text-4xl sm:text-5xl">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 p-6 rounded-lg border border-[#e8e0d8] hover:shadow-md transition-shadow bg-[#FAF7F2]">
                <CheckCircle2 size={22} className="text-[#a61c00] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-[#1a2e45] text-base mb-1">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="py-20 bg-[#1a2e45]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label text-[#a61c00] mb-3">Find Us</div>
              <h2 className="font-display font-black text-4xl text-white mb-6">Visit Our Sherman Location</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                We're conveniently located on N Texoma Pkwy in Sherman, Texas. Stop by to browse our inventory in person — we'd love to help you find exactly what you need for your project.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/80">
                  <MapPin size={18} className="text-[#a61c00] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Address</div>
                    <div className="text-sm">3200 N Texoma Pkwy, Sherman, TX 75090</div>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <Phone size={18} className="text-[#a61c00] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <a href="tel:9034211305" className="text-sm hover:text-white transition-colors">(903) 421-1305</a>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <Mail size={18} className="text-[#a61c00] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <a href="mailto:Mpdoorsnmore232@gmail.com" className="text-sm hover:text-white transition-colors">Mpdoorsnmore232@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <Facebook size={18} className="text-[#a61c00] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Facebook</div>
                    <a
                      href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-white transition-colors"
                    >
                      MP Doors & More | Sherman TX
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map embed */}
            <div className="rounded-lg overflow-hidden shadow-2xl h-80 sm:h-96">
              <iframe
                title="MP Doors & More Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.5!2d-96.6089!3d33.6357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3b0000000001%3A0x1!2s3200+N+Texoma+Pkwy%2C+Sherman%2C+TX+75090!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
