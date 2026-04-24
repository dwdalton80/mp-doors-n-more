import { Link } from 'wouter';
import { CheckCircle, MapPin, Phone, Facebook } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IMAGES } from '@/lib/IMAGE_URLS';

/**
 * About Page
 * Design: Company story and values with professional imagery
 * Sections: Hero, who we are, commitment, find us
 */

export default function About() {
  const commitments = [
    {
      title: 'Quality First',
      description: 'We only carry A grade construction materials — the same products used by professional contractors and builders.'
    },
    {
      title: 'Fair Pricing',
      description: 'Our direct sourcing relationships allow us to pass real savings on to our customers. A grade material at B grade prices.'
    },
    {
      title: 'Community Roots',
      description: 'We\'re a locally owned business in Sherman, Texas. We serve our neighbors and take pride in our community.'
    },
    {
      title: 'Wide Selection',
      description: 'From entry doors to vinyl flooring, we carry a broad range of products so you can find everything in one place.'
    },
    {
      title: 'Knowledgeable Staff',
      description: 'Our team knows construction materials inside and out. We\'ll help you find exactly what your project needs.'
    },
    {
      title: 'In-Store & Delivery',
      description: 'Shop in person at our Sherman location, or ask about delivery options for larger orders.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative h-96 flex items-center justify-center text-white overflow-hidden"
          style={{
            backgroundImage: `url('${IMAGES.heroEntryway.compressed}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Hero Content */}
          <div className="container relative z-10 text-center">
            <p className="text-accent text-sm font-bold tracking-widest mb-4">OUR STORY</p>
            <h1 className="text-5xl md:text-6xl font-bold">About MP Doors & More</h1>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <p className="text-primary text-sm font-bold tracking-widest mb-2">WHO WE ARE</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Trusted Local Home Improvement Supplier</h2>

                <p className="text-gray-600 mb-4">
                  MP Doors & More is a locally owned and operated home improvement supplier located in Sherman, Texas. We specialize in buying and selling quality construction materials — including interior and exterior doors, windows, vinyl flooring, siding, shingles, and trim.
                </p>

                <p className="text-gray-600 mb-6">
                  Our mission is simple: bring A grade materials to homeowners, contractors, and builders at prices that make sense. We believe that quality home improvement shouldn't require a premium budget, and we work hard every day to make that a reality for our customers in the Texoma area.
                </p>

                <p className="text-gray-600 mb-8">
                  Whether you're renovating a single room or tackling a full exterior overhaul, MP Doors & More has the products and expertise to help you get the job done right — without breaking the bank.
                </p>

                <div className="flex gap-8">
                  <Link href="/products">
                    <a className="bg-primary text-white px-6 py-3 rounded font-bold hover:bg-primary/90 transition">
                      Browse Products
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a className="border-2 border-primary text-primary px-6 py-3 rounded font-bold hover:bg-primary hover:text-white transition">
                      Contact Us
                    </a>
                  </Link>
                </div>
              </div>

              {/* Value Proposition Visual */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-8 text-center">
                  <div className="mb-6">
                    <div className="text-6xl font-bold text-secondary mb-2">A Grade</div>
                    <div className="text-xl font-bold text-secondary mb-4">MATERIALS</div>
                  </div>
                  <div className="border-t-2 border-primary my-6"></div>
                  <div>
                    <div className="text-6xl font-bold text-primary mb-2">B Grade</div>
                    <div className="text-xl font-bold text-primary">PRICES</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-bold tracking-widest mb-2">OUR COMMITMENT</p>
              <h2 className="text-4xl md:text-5xl font-bold">What We Stand For</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commitments.map((commitment, idx) => (
                <div key={idx} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-secondary">{commitment.title}</h3>
                      <p className="text-gray-600">{commitment.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Find Us Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-bold tracking-widest mb-2">VISIT US</p>
              <h2 className="text-4xl md:text-5xl font-bold">Find Us in Sherman, TX</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Address</h3>
                    <p className="text-gray-600">3200 N Texoma Pkwy<br />Sherman, TX 75090</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Phone</h3>
                    <a href="tel:9034211305" className="text-primary hover:text-primary/80 transition">
                      (903) 421-1305
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Facebook className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2">Facebook</h3>
                    <a
                      href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition"
                    >
                      MP Doors & More | Sherman TX
                    </a>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-gray-600 mb-4">
                    We're conveniently located on N Texoma Pkwy in Sherman, Texas. Stop by to browse our inventory in person — we'd love to help you find exactly what you need for your project.
                  </p>
                  <a
                    href="https://maps.google.com/?q=3200+N+Texoma+Pkwy+Sherman+TX+75090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-secondary text-white px-6 py-3 rounded font-bold hover:bg-secondary/90 transition"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Map Placeholder / Image */}
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>3200 N Texoma Pkwy<br />Sherman, TX 75090</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
