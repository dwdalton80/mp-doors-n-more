import { Link } from 'wouter';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';

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
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-accent text-secondary px-3 py-2 rounded font-bold">
                MP
              </div>
              <div>
                <h3 className="font-bold">MP Doors & More</h3>
                <p className="text-xs text-secondary-foreground/70">Sherman, TX</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Your trusted local supplier of doors, windows, vinyl flooring, siding, and shingles. A grade material at B grade prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/">
                <a className="hover:text-accent transition">Home</a>
              </Link>
              <Link href="/about">
                <a className="hover:text-accent transition">About Us</a>
              </Link>
              <Link href="/products">
                <a className="hover:text-accent transition">Products</a>
              </Link>
              <Link href="/contact">
                <a className="hover:text-accent transition">Contact Us</a>
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
        <div className="border-t border-secondary-foreground/10 pt-8 mb-8">
          <h4 className="font-bold mb-4">Follow Us</h4>
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
        <div className="border-t border-secondary-foreground/10 pt-8 text-center text-sm text-secondary-foreground/70">
          <p>© 2026 MP Doors & More. All rights reserved.</p>
          <p className="mt-2">Made with Manus</p>
        </div>
      </div>
    </footer>
  );
}
