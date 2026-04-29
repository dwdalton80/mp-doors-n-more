/*
 * Footer — MP Doors & More
 * Design: Modern Farmhouse / Texas Contemporary
 * Deep slate blue background, warm terracotta accents
 */

import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2e45] text-white">
      {/* Main footer */}
      <div className="container py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/mp-doors-logo_9851a1c6.png" alt="MP Doors & More Logo" className="h-12 w-auto" />
            <div>
              <div className="font-display font-bold text-base leading-tight">MP Doors & More</div>
              <div className="text-white/50 text-xs font-label tracking-widest uppercase">Sherman, Texas</div>
            </div>
          </div>
          <p className="text-white/65 text-sm leading-relaxed mb-5">
            Your trusted local supplier of doors, windows, vinyl flooring, siding, and shingles. A grade material at B grade prices.
          </p>
          <a
            href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-semibold py-2 px-4 rounded transition-colors"
          >
            <Facebook size={16} />
            Follow on Facebook
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#a61c00] mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Products", href: "/products" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/65 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#a61c00] group-hover:w-2 transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#a61c00] mb-4">
            Our Products
          </h4>
          <ul className="space-y-2">
            {[
              "Interior & Exterior Doors",
              "Windows",
              "Vinyl Flooring",
              "Siding",
              "Shingles & Roofing",
              "Trim & More",
            ].map((item) => (
              <li key={item} className="text-white/65 text-sm flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#a61c00]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#a61c00] mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3">
            <li>
              <a href="tel:9034211305" className="flex items-start gap-3 text-white/65 hover:text-white transition-colors text-sm group">
                    <Phone size={15} className="mt-0.5 text-[#a61c00] shrink-0" />
                    <span>(903) 421-1305</span>
              </a>
            </li>
            <li>
              <a href="mailto:Mpdoorsnmore232@gmail.com" className="flex items-start gap-3 text-white/65 hover:text-white transition-colors text-sm">
                <Mail size={15} className="mt-0.5 text-[#a61c00] shrink-0" />
                <span>Mpdoorsnmore232@gmail.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://maps.google.com/?q=3200+N+Texoma+Pkwy+Sherman+TX+75090"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-white/65 hover:text-white transition-colors text-sm"
              >
                <MapPin size={15} className="mt-0.5 text-[#a61c00] shrink-0" />
                <span>3200 N Texoma Pkwy<br />Sherman, TX 75090</span>
              </a>
            </li>
          </ul>

          <div className="mt-5 pt-4 border-t border-white/10">
            <p className="text-white/50 text-xs font-label tracking-wide uppercase">Hours</p>
            <p className="text-white/65 text-sm mt-1">Mon – Sat: 8:00 AM – 6:00 PM</p>
            <p className="text-white/65 text-sm">Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © {currentYear} MP Doors & More. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Sherman, Texas · (903) 421-1305
          </p>
        </div>
      </div>
    </footer>
  );
}
