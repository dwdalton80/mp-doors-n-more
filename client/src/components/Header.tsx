import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Phone, Facebook } from 'lucide-react';

/**
 * Header Component
 * Design: Professional navigation with dark navy background, red accents
 * Features: Responsive mobile menu, logo, navigation links, CTA button
 */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-secondary text-secondary-foreground sticky top-0 z-50 border-b-4 border-accent">
      <div className="container">
        {/* Top Bar with Contact Info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-secondary-foreground/10">
          <div className="flex items-center gap-4">
            <a href="tel:9034211305" className="flex items-center gap-1 hover:text-accent transition">
              <Phone className="w-4 h-4" />
              (903) 421-1305
            </a>
            <span>3200 N Texoma Pkwy, Sherman, TX 75090</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon–Sat 8AM–6PM</span>
            <a href="https://www.facebook.com/p/MP-Doors-More-61550671844372/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition">
              Follow Us
            </a>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/manus-storage/Untitleddesign4_a825de6f.png" alt="MP Doors & More" className="h-12 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">Doors & More</span>
              <span className="text-xs text-accent">SHERMAN, TEXAS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-accent transition font-medium">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Facebook Button - Desktop */}
          <a
            href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-secondary-foreground hover:text-accent transition"
          >
            <Facebook className="w-5 h-5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary-foreground/10 rounded transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-secondary-foreground/10 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 hover:bg-secondary-foreground/10 rounded transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 text-secondary-foreground hover:text-accent transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <Facebook className="w-5 h-5" />
              Follow on Facebook
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
