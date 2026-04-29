/*
 * Navbar — MP Doors & More
 * Design: Modern Farmhouse / Texas Contemporary
 * Sticky nav with transparent-to-solid scroll behavior
 * Slate blue (#2D4A6B) background on scroll, transparent on top
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-[#1e3450] shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className={`border-b transition-all duration-300 ${scrolled || !isHome ? "border-white/10" : "border-white/20"}`}>
        <div className="container flex items-center justify-between py-2">
          <div className="flex items-center gap-4 text-white/80 text-sm">
            <a href="tel:9034211305" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} />
              <span className="font-label">(903) 421-1305</span>
            </a>
            <span className="hidden sm:block text-white/40">|</span>
            <span className="hidden sm:block text-white/70 text-xs">3200 N Texoma Pkwy, Sherman, TX 75090</span>
          </div>
          <a
            href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="hidden sm:block font-label text-xs tracking-wide">Follow Us</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/mp-doors-logo_9851a1c6.png" alt="MP Doors & More Logo" className="h-14 w-auto" />
          <div>
            <div className="text-white font-display font-bold text-lg leading-tight tracking-tight">
              MP Doors & More
            </div>
            <div className="text-white/60 text-xs font-label tracking-widest uppercase">
              Sherman, Texas
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display font-semibold text-sm tracking-wide transition-colors relative group ${
                location === link.href
                  ? "text-[#a61c00]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#a61c00] transition-all duration-200 ${
                location === link.href ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
          <a
            href="/contact"
            className="btn-accent text-sm py-2 px-5"
          >
            Get a Quote
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1e3450] border-t border-white/10">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-display font-semibold py-3 px-2 border-b border-white/10 transition-colors ${
                  location === link.href
                    ? "text-[#a61c00]"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="/contact"
              className="btn-accent text-sm py-2 px-5"
              onClick={() => setMenuOpen(false)}
            >
              Get a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
