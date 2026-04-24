import { Link } from 'wouter';
import { ArrowRight, Star, MapPin, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IMAGES } from '@/lib/IMAGE_URLS';

/**
 * Home Page
 * Design: Professional home improvement supplier landing page
 * Sections: Hero with CTA, value propositions, product showcase, testimonials, contact
 */

export default function Home() {
  const products = [
    {
      title: 'Doors',
      description: 'Interior & exterior doors in every style — from solid wood entry doors to French doors and barn doors.',
      image: IMAGES.productDoors.compressed,
      link: '/products#doors'
    },
    {
      title: 'Windows',
      description: 'Energy-efficient vinyl windows that let the Texas sunshine in while keeping your home comfortable.',
      image: IMAGES.productWindows.compressed,
      link: '/products#windows'
    },
    {
      title: 'Vinyl Flooring',
      description: 'Luxury vinyl plank flooring with the look of hardwood at a fraction of the cost.',
      image: IMAGES.productFlooring.compressed,
      link: '/products#flooring'
    },
    {
      title: 'Siding & Shingles',
      description: 'Premium vinyl siding and architectural shingles to protect and beautify your home\'s exterior.',
      image: IMAGES.productSiding.compressed,
      link: '/products#siding'
    }
  ];

  const testimonials = [
    {
      name: 'James R.',
      date: '2 months ago',
      text: 'Incredible selection and prices. I found a beautiful front door that would have cost me twice as much at a big box store. The staff was helpful and knowledgeable.'
    },
    {
      name: 'Maria T.',
      date: '3 months ago',
      text: 'MP Doors & More is a hidden gem in Sherman. Got vinyl flooring for my whole house at an amazing price. Installation was straightforward and it looks fantastic!'
    },
    {
      name: 'David K.',
      date: '1 month ago',
      text: 'Bought shingles and siding for my renovation project. Great quality, great price. Will definitely be back for my next project.'
    }
  ];

  const valueProps = [
    {
      title: 'A Grade Materials',
      description: 'We source only top-quality construction materials — the same grade used by professional contractors.'
    },
    {
      title: 'B Grade Prices',
      description: 'Our buying power means you get premium materials without the premium markup. Real savings, every time.'
    },
    {
      title: 'Local & Trusted',
      description: 'Proudly serving Sherman and the Texoma area. We\'re your neighbors, and we stand behind every product.'
    },
    {
      title: 'Wide Selection',
      description: 'Doors, windows, flooring, siding, shingles — everything you need for your home improvement project.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative h-screen flex items-center justify-center text-white overflow-hidden"
          style={{
            backgroundImage: `url('${IMAGES.heroEntryway.compressed}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Hero Content */}
          <div className="container relative z-10 max-w-2xl">
            <div className="text-center">
              <p className="text-accent text-sm font-bold tracking-widest mb-4">SHERMAN, TEXAS • EST 2024</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Quality Materials.<br />
                <span className="text-primary">Honest Prices.</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                MP Doors & More is your local source for doors, windows, vinyl flooring, siding, and shingles in Sherman, TX. A grade material at B grade prices.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/products">
                  <a className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded font-bold flex items-center justify-center gap-2 transition">
                    Shop Products
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
                <Link href="/contact">
                  <a className="border-2 border-accent text-white hover:bg-accent hover:text-secondary px-8 py-3 rounded font-bold transition">
                    Contact Us
                  </a>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a href="tel:9034211305" className="flex items-center justify-center gap-2 hover:text-accent transition">
                  <Phone className="w-4 h-4" />
                  (903) 421-1305
                </a>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  3200 N Texoma Pkwy, Sherman TX
                </div>
                <div>Mon–Sat 8AM–6PM</div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-bold tracking-widest mb-2">WHY CHOOSE US</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Built on Value & Trust</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueProps.map((prop, idx) => (
                <div key={idx} className="p-6 border-l-4 border-accent hover:shadow-lg transition">
                  <h3 className="text-xl font-bold mb-3 text-secondary">{prop.title}</h3>
                  <p className="text-gray-600">{prop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-bold tracking-widest mb-2">WHAT WE CARRY</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {products.map((product, idx) => (
                <Link key={idx} href={product.link}>
                  <a className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-2xl font-bold mb-2 text-secondary">{product.title}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <span className="text-primary font-bold flex items-center gap-2">
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/products">
                <a className="inline-block bg-secondary text-white px-8 py-3 rounded font-bold hover:bg-secondary/90 transition">
                  View All Products
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-bold tracking-widest mb-2">CUSTOMER REVIEWS</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h2>
              <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                <span className="text-primary">5.0</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-gray-600">on Google</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="font-bold text-secondary">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.date}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href="https://www.google.com/maps/search/MP+Doors+More+Sherman+TX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-8 py-3 rounded font-bold hover:bg-primary/90 transition"
              >
                Read All Reviews on Google
              </a>
            </div>
          </div>
        </section>

        {/* Facebook Section */}
        <section className="py-16 md:py-24 bg-secondary text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">Follow Us on Facebook</h2>
            <p className="text-lg mb-8 text-white/80">Stay updated on new inventory, deals, and more!</p>
            <a
              href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-secondary px-8 py-3 rounded font-bold hover:bg-accent/90 transition"
            >
              Visit Our Page
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Visit us in Sherman, TX or give us a call. We're here to help you find the right materials at the right price.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:9034211305" className="bg-primary text-white px-8 py-3 rounded font-bold hover:bg-primary/90 transition">
                Call (903) 421-1305
              </a>
              <Link href="/contact">
                <a className="bg-secondary text-white px-8 py-3 rounded font-bold hover:bg-secondary/90 transition">
                  Send a Message
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
