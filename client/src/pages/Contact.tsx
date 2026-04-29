/*
 * Contact Page — MP Doors & More
 * Design: Modern Farmhouse / Texas Contemporary
 * Contact form, business info, Google Map, hours
 */

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* ── PAGE HERO ── */}
      <section className="relative bg-[#1a2e45] pt-32 pb-16">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #a61c00 0, #a61c00 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px"
          }}
        />
        <div className="relative container">
          <div className="section-label text-[#a61c00] mb-3">Get in Touch</div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Have a question about our products or pricing? We'd love to hear from you. Reach out by phone, email, or fill out the form below.
          </p>
        </div>
      </section>

      {/* ── CONTACT CONTENT ── */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="section-heading text-2xl mb-6">Business Information</h2>

              <ul className="space-y-6 mb-8">
                <li>
                  <a href="tel:9034211305" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-md bg-[#2D4A6B] flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-[#1a2e45] text-sm mb-0.5">Phone</div>
                      <div className="text-gray-600 text-sm group-hover:text-[#a61c00] transition-colors">(903) 421-1305</div>
                      <div className="text-gray-400 text-xs">(903) 647-6695</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:Mpdoorsnmore232@gmail.com" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-md bg-[#2D4A6B] flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-[#1a2e45] text-sm mb-0.5">Email</div>
                      <div className="text-gray-600 text-sm group-hover:text-[#a61c00] transition-colors break-all">
                        Mpdoorsnmore232@gmail.com
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=3200+N+Texoma+Pkwy+Sherman+TX+75090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-md bg-[#2D4A6B] flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-[#1a2e45] text-sm mb-0.5">Address</div>
                      <div className="text-gray-600 text-sm group-hover:text-[#a61c00] transition-colors">
                        3200 N Texoma Pkwy<br />Sherman, TX 75090
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-[#2D4A6B] flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-[#1a2e45] text-sm mb-0.5">Hours</div>
                      <div className="text-gray-600 text-sm">Mon – Sat: 8:00 AM – 6:00 PM</div>
                      <div className="text-gray-600 text-sm">Sunday: Closed</div>
                    </div>
                  </div>
                </li>
              </ul>

              {/* Facebook */}
              <div className="p-5 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/20">
                <div className="flex items-center gap-3 mb-3">
                  <Facebook size={20} className="text-[#1877F2]" />
                  <span className="font-display font-bold text-[#1a2e45] text-sm">Follow Us on Facebook</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Stay up to date with our latest inventory, deals, and announcements on Facebook.
                </p>
                <a
                  href="https://www.facebook.com/p/MP-Doors-More-61550671844372/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1877F2] text-white text-sm font-semibold py-2 px-4 rounded hover:bg-[#166FE5] transition-colors"
                >
                  <Facebook size={14} />
                  Visit Our Facebook Page
                </a>
              </div>

              {/* Google Reviews link */}
              <div className="mt-4 p-5 rounded-lg bg-white border border-[#e8e0d8]">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-display font-bold text-[#1a2e45] text-sm">Leave Us a Review</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">Happy with your purchase? We'd love to hear about it on Google!</p>
                <a
                  href="https://www.google.com/maps/search/MP+Doors+More+Sherman+TX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#4285F4] text-[#4285F4] text-sm font-semibold py-2 px-4 rounded hover:bg-[#4285F4] hover:text-white transition-colors"
                >
                  Write a Google Review
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-[#e8e0d8] p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#1a2e45] mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you as soon as possible, typically within 1 business day.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="mt-6 btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="section-heading text-2xl mb-2">Send Us a Message</h2>
                    <p className="text-gray-500 text-sm mb-6">Fill out the form below and we'll get back to you shortly.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-display font-semibold text-[#1a2e45] mb-1.5">
                            Full Name <span className="text-[#a61c00]">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Smith"
                            className="w-full border border-[#e8e0d8] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A6B]/30 focus:border-[#2D4A6B] transition-colors bg-[#FAF7F2]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-display font-semibold text-[#1a2e45] mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(903) 555-0100"
                            className="w-full border border-[#e8e0d8] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A6B]/30 focus:border-[#2D4A6B] transition-colors bg-[#FAF7F2]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-display font-semibold text-[#1a2e45] mb-1.5">
                          Email Address <span className="text-[#a61c00]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full border border-[#e8e0d8] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A6B]/30 focus:border-[#2D4A6B] transition-colors bg-[#FAF7F2]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-display font-semibold text-[#1a2e45] mb-1.5">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full border border-[#e8e0d8] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A6B]/30 focus:border-[#2D4A6B] transition-colors bg-[#FAF7F2]"
                        >
                          <option value="">Select a topic...</option>
                          <option value="doors">Doors</option>
                          <option value="windows">Windows</option>
                          <option value="flooring">Vinyl Flooring</option>
                          <option value="siding">Siding</option>
                          <option value="shingles">Shingles</option>
                          <option value="pricing">Pricing & Quote</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-display font-semibold text-[#1a2e45] mb-1.5">
                          Message <span className="text-[#a61c00]">*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Tell us what you're looking for, your project details, or any questions you have..."
                          className="w-full border border-[#e8e0d8] rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D4A6B]/30 focus:border-[#2D4A6B] transition-colors bg-[#FAF7F2] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-accent w-full text-center py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="h-80 sm:h-96">
        <iframe
          title="MP Doors & More on Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.5!2d-96.6089!3d33.6357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3b0000000001%3A0x1!2s3200+N+Texoma+Pkwy%2C+Sherman%2C+TX+75090!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
