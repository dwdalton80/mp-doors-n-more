import { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Contact Page
 * Design: Contact form and business information
 * Sections: Contact form, business info, social links
 */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16 md:py-24">
          <div className="container text-center">
            <p className="text-accent text-sm font-bold tracking-widest mb-2">GET IN TOUCH</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have a question about our products or pricing? We would love to hear from you. Reach out by phone, email, or fill out the form below.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-8 text-secondary">Business Information</h2>

                <div className="space-y-8">
                  {/* Phone */}
                  <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2">Phone</h3>
                      <a href="tel:9034211305" className="text-primary hover:text-primary/80 transition block">
                        (903) 421-1305
                      </a>
                      <a href="tel:9036476695" className="text-primary hover:text-primary/80 transition block">
                        (903) 647-6695
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <a href="mailto:Mpdoorsnmore232@gmail.com" className="text-primary hover:text-primary/80 transition">
                        Mpdoorsnmore232@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2">Address</h3>
                      <a
                        href="https://maps.google.com/?q=3200+N+Texoma+Pkwy+Sherman+TX+75090"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition"
                      >
                        3200 N Texoma Pkwy<br />
                        Sherman, TX 75090
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-2">Hours</h3>
                      <p className="text-gray-600">Mon – Sat: 8:00 AM – 6:00 PM</p>\n                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold mb-4">Follow Us on Facebook</h3>
                  <p className="text-gray-600 mb-4">Stay up to date with our latest inventory, deals, and announcements on Facebook.</p>
                  <a
                    href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-secondary px-4 py-2 rounded font-bold hover:bg-accent/90 transition"
                  >
                    <Facebook className="w-4 h-4" />
                    Visit Our Page
                  </a>
                </div>

                {/* Google Reviews */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold mb-4">Leave Us a Review</h3>
                  <p className="text-gray-600 mb-4">Happy with your purchase? We would love to hear about it on Google!</p>
                  <a
                    href="https://www.google.com/maps/search/MP+Doors+More+Sherman+TX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-secondary text-white px-4 py-2 rounded font-bold hover:bg-secondary/90 transition"
                  >
                    Write a Google Review
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-8 text-secondary">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">Fill out the form below and we will get back to you shortly.</p>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded text-green-800">
                    Thank you for your message! We will get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block font-bold mb-2 text-secondary">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block font-bold mb-2 text-secondary">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(903) 555-0100"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block font-bold mb-2 text-secondary">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block font-bold mb-2 text-secondary">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select a topic...</option>
                      <option value="doors">Doors</option>
                      <option value="windows">Windows</option>
                      <option value="flooring">Vinyl Flooring</option>
                      <option value="siding">Siding & Shingles</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-bold mb-2 text-secondary">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you are looking for, your project details, or any questions you have..."
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-8 py-3 rounded font-bold hover:bg-primary/90 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
