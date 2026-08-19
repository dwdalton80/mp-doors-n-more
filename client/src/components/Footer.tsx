/*
 * Footer — MP Doors & More
 * Design: Modern Farmhouse / Texas Contemporary
 * Deep slate blue background, warm terracotta accents
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { logEvent } from "@/lib/analytics";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Inject LocalBusiness schema with extended details
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "MP Doors & More",
      "image": "https://www.mpdoorsnmore.com/images/mp-doors-logo.png",
      "description": "Premium doors, windows, vinyl flooring, siding, and trim & molding supplier in Sherman, TX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3200 N Texoma Pkwy",
        "addressLocality": "Sherman",
        "addressRegion": "TX",
        "postalCode": "75090",
        "addressCountry": "US"
      },
      "telephone": "(903) 421-1305",
      "email": "mpdoorsnmore23@gmail.com",
      "url": "https://www.mpdoorsnmore.com",
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "07:00",
          "closes": "15:00"
        }
      ],
      "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
      "sameAs": [
        "https://www.facebook.com/p/MP-Doors-More-61550671844372/"
      ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);


  return (
    <footer className="bg-[#1a2e45] text-white">
      {/* Main footer */}
      <div className="container py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/mp-doors-logo.png" alt="MP Doors & More Logo" className="h-12 w-auto" />
            <div>
              <div className="font-display font-bold text-base leading-tight">MP Doors & More</div>
              <div className="text-white/50 text-xs font-label tracking-widest uppercase">Sherman, Texas</div>
            </div>
          </div>
          <p className="text-white/65 text-sm leading-relaxed mb-5">
            Your trusted local supplier of doors, windows, vinyl flooring, siding, and shingles. A grade material at B grade prices.
          </p>
          <div className="space-y-2">
            <a
              href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logEvent({ eventType: 'facebook_click', eventName: 'facebook_click', metadata: { source: 'footer' } })}
              className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-semibold py-2 px-4 rounded transition-colors w-full justify-center"
            >
              <Facebook size={16} />
              Follow on Facebook
            </a>
          </div>
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
              <a href="mailto:mpdoorsnmore23@gmail.com" className="flex items-start gap-3 text-white/65 hover:text-white transition-colors text-sm">
                <Mail size={15} className="mt-0.5 text-[#a61c00] shrink-0" />
                <span>mpdoorsnmore23@gmail.com</span>
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
            <p className="text-white/65 text-sm mt-1">Mon – Fri: 7 AM – 5 PM</p>
            <p className="text-white/65 text-sm">Saturday: 7 AM - 3 PM</p>
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
