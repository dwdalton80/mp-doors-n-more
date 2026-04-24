import { Link } from 'wouter';
import { ArrowRight, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IMAGES } from '@/lib/IMAGE_URLS';

/**
 * Products Page
 * Design: Detailed product showcase with features and CTAs
 * Sections: Product categories with descriptions and images
 */

export default function Products() {
  const productCategories = [
    {
      id: 'doors',
      title: 'Doors',
      category: 'INTERIOR & EXTERIOR',
      image: IMAGES.productDoors.compressed,
      description: 'We carry a wide selection of interior and exterior doors for every style and budget. From solid wood panel doors and glass-insert entry doors to French doors, sliding barn doors, and grand entry doors — we have what your home needs.',
      features: [
        'Solid wood interior doors',
        'Steel & fiberglass exterior entry doors',
        'French doors & double doors',
        'Sliding barn doors',
        'Grand entry doors with sidelights',
        'Pre-hung and slab options'
      ]
    },
    {
      id: 'windows',
      title: 'Windows',
      category: 'ENERGY-EFFICIENT VINYL',
      image: IMAGES.productWindows.compressed,
      description: 'Our windows are designed for the Texas climate — energy-efficient, durable, and beautiful. We carry double-hung, casement, sliding, and picture windows in a variety of sizes and styles to fit any home.',
      features: [
        'Double-hung windows',
        'Casement & awning windows',
        'Sliding windows',
        'Picture & bay windows',
        'Vinyl frames — low maintenance',
        'Energy-efficient glass options'
      ]
    },
    {
      id: 'flooring',
      title: 'Vinyl Flooring',
      category: 'LUXURY VINYL PLANK & TILE',
      image: IMAGES.productFlooring.compressed,
      description: 'Transform your home with luxury vinyl flooring that looks and feels like real hardwood or stone — at a fraction of the cost. Waterproof, scratch-resistant, and easy to install, our vinyl flooring is perfect for any room.',
      features: [
        'Luxury vinyl plank (LVP)',
        'Luxury vinyl tile (LVT)',
        'Waterproof construction',
        'Scratch & dent resistant',
        'Wide range of wood & stone looks',
        'Easy click-lock installation'
      ]
    },
    {
      id: 'siding',
      title: 'Siding & Shingles',
      category: 'EXTERIOR PROTECTION & BEAUTY',
      image: IMAGES.productSiding.compressed,
      description: 'Protect and beautify your home\'s exterior with our selection of vinyl siding and architectural shingles. Built to withstand Texas weather, our exterior products combine durability with curb appeal.',
      features: [
        'Vinyl lap siding',
        'Architectural asphalt shingles',
        'Trim boards & accessories',
        'Multiple color options',
        'Weather-resistant materials',
        'Contractor-grade quality'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16 md:py-24">
          <div className="container text-center">
            <p className="text-accent text-sm font-bold tracking-widest mb-2">WHAT WE CARRY</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              From entry doors to roofing shingles, we carry everything you need for your home improvement project — all at prices that make sense.
            </p>
          </div>
        </section>

        {/* Product Categories */}
        <div className="bg-white">
          {productCategories.map((product, idx) => (
            <section key={product.id} className={`py-16 md:py-24 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="container">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="relative rounded-lg overflow-hidden shadow-lg border-4 border-accent">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded font-bold text-sm">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">{product.title}</h2>
                    <p className="text-gray-600 mb-6 text-lg">{product.description}</p>

                    {/* Features */}
                    <div className="mb-8">
                      <h3 className="font-bold text-lg mb-4 text-secondary">What We Offer:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {product.features.map((feature, fidx) => (
                          <div key={fidx} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="tel:9034211305" className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded font-bold hover:bg-primary/90 transition">
                        <Phone className="w-4 h-4" />
                        (903) 421-1305
                      </a>
                      <Link href="/contact" className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded font-bold hover:bg-primary hover:text-white transition">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Additional Products Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">And More</h2>
            <h3 className="text-2xl font-bold mb-4 text-secondary">Trim, Accessories & Construction Materials</h3>
            <p className="text-gray-600 mb-8 text-lg">
              In addition to our main product categories, we also carry trim boards, molding, and a variety of other construction materials. If you do not see what you need, give us a call — we may be able to source it for you.
            </p>
            <a href="tel:9034211305" className="inline-block bg-secondary text-white px-8 py-3 rounded font-bold hover:bg-secondary/90 transition">
              Call Us Today
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Find What You Need?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project and find the perfect materials at the best prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-primary text-white px-8 py-3 rounded font-bold hover:bg-primary/90 transition">
                Send an Inquiry
              </Link>
              <a href="tel:9034211305" className="bg-secondary text-white px-8 py-3 rounded font-bold hover:bg-secondary/90 transition">
                Call Us Today
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
