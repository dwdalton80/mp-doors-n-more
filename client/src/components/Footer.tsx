import { Link } from 'wouter';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

/**
 * Footer Component
 * Design: Dark navy background with white text, organized information sections
 * Features: Navigation links, contact info, social links, copyright
 */

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t-4 border-accent">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <img src="/manus-storage/Untitleddesign4_a825de6f.png" alt="MP Doors & More" className="h-12 w-auto" />
            </div>
            <h3 className="font-bold text-sm mb-1">Doors & More</h3>
            <p className="text-xs text-secondary-foreground/70 mb-4">Sherman, TX</p>
            <p className="text-sm text-secondary-foreground/80">
              Your trusted local supplier of doors, windows, vinyl flooring, siding, and shingles. A grade material at B grade prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-accent transition">
                Home
              </Link>
              <Link href="/about" className="hover:text-accent transition">
                About Us
              </Link>
              <Link href="/products" className="hover:text-accent transition">
                Products
              </Link>
              <Link href="/contact" className="hover:text-accent transition">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold mb-4">Hours</h4>
            <div className="text-sm space-y-1">
              <p>Mon – Sat: 8:00 AM – 6:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:9034211305" className="flex items-center gap-2 hover:text-accent transition">
                <Phone className="w-4 h-4" />
                (903) 421-1305
              </a>
              <a href="mailto:Mpdoorsnmore232@gmail.com" className="flex items-center gap-2 hover:text-accent transition">
                <Mail className="w-4 h-4" />
                Mpdoorsnmore232@gmail.com
              </a>
              <a href="https://maps.google.com/?q=3200+N+Texoma+Pkwy+Sherman+TX+75090" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-accent transition">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>3200 N Texoma Pkwy<br />Sherman, TX 75090</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-secondary-foreground/10 py-3">
          <div className="flex items-center gap-3 mb-3">
            <h4 className="font-bold text-sm">Follow Us</h4>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground hover:text-accent transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground hover:text-accent transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          <a
            href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-secondary px-4 py-2 rounded font-bold hover:bg-accent/90 transition"
          >
            <Facebook className="w-4 h-4" />
            Follow on Facebook
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-foreground/10 pt-2 text-center text-sm text-secondary-foreground/70">
          <p>© 2026 MP Doors & More. All rights reserved.</p>
          <p className="mt-2">Made with Manus</p>
        </div>
      </div>
    </footer>
  );
}
