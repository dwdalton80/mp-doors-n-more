# MP Doors & More - Website Features

## Overview
A professional, fully-responsive website for MP Doors & More, a local home improvement supplier in Sherman, Texas. The site showcases products, enables customer inquiries, and provides real-time analytics for business insights.

---

## Core Website Features

### Home Page
- **Hero Section** - Eye-catching banner with company tagline and call-to-action buttons
- **Value Propositions** - Four key differentiators highlighting A-grade materials at B-grade prices
- **Product Showcase** - Featured product categories (Doors, Windows, Flooring, Siding)
- **Customer Testimonials** - Real customer reviews with 5-star ratings
- **Social Media Integration** - Direct links to Facebook page and Google Reviews
- **Contact Information** - Phone number, address, and business hours prominently displayed

### Navigation
- **Header Navigation** - Clean, professional menu with links to all main sections
- **Footer Navigation** - Comprehensive footer with contact info and social links
- **Breadcrumb Navigation** - Easy navigation on all product detail pages
- **Mobile-Responsive Menu** - Optimized for all device sizes

### Product Pages

#### Main Product Categories
1. **Entry Doors** - Interior and exterior entry doors with in-stock inventory
2. **Exterior Doors** - Premium exterior doors with quick-view modals
3. **Windows** - Energy-efficient vinyl windows
4. **Flooring** - Luxury vinyl plank flooring options
5. **Siding** - Vinyl siding and architectural shingles
6. **Trim & Molding** - Decorative trim and molding solutions

#### Product Features
- **Quick-View Modals** - Instant product details without leaving the page
- **Product Images** - High-quality professional photography
- **Dual-Image Toggle** - Before/after or alternate view options for most products
- **Multi-Image Gallery** - Up to 7 images for detailed products (e.g., French Patio Doors)
- **Product Ratings** - Star ratings and customer feedback
- **Product Features** - Detailed specifications and benefits
- **Brand Logos** - Display of trusted brands (Andersen, Jeld-Wen, etc.)

#### Special Order Pages
- **Patio Doors Special Order** - Custom order form for patio doors
- **Storm Doors Special Order** - Custom order form for storm doors
- **Get Quote Modal** - Easy quote request submission

#### In-Stock Pages
- **Entry Doors In-Stock** - 10 fiberglass door products with quick-view
- **Exterior Doors In-Stock** - Premium exterior door selection
- **Hover Zoom Effects** - Product images zoom smoothly on hover for better viewing
- **Get Pricing Button** - Links to contact page with product pre-filled

---

## Contact & Lead Generation

### Contact Page
- **Contact Form** - Professional form for customer inquiries
- **Form Validation** - Real-time validation with error messages
- **Pre-Filled Product Name** - Contact form auto-populates with product name when clicked from product pages
- **Phone Call Button** - Direct phone link with click tracking
- **Facebook Link** - Direct link to Facebook page
- **Google Reviews Link** - Direct link to Google Reviews

### Quote Request System
- **Quote Request Forms** - Available on special order pages
- **Email Integration** - Quotes sent to mpdoorsnmore23@gmail.com via Resend API
- **Automatic Notifications** - Business owner receives email notifications for each quote
- **Spam Prevention** - Rate limiting (1 submission per IP per hour)
- **Honeypot Field** - Hidden field to catch bot submissions

### Contact Form Features
- **Email Integration** - Resend API integration for reliable email delivery
- **Form Validation** - Client-side and server-side validation
- **Success Messages** - Clear feedback when submission is successful
- **Error Handling** - Helpful error messages if submission fails

---

## Analytics & Business Intelligence

### Analytics Dashboard
- **Password-Protected Access** - Secure dashboard with password authentication
- **Manus OAuth Login** - Admin access via Manus account for project owner
- **Real-Time Data** - Live tracking of visitor activity and conversions

### Key Metrics
- **Visitor Tracking** - Total visitors and daily trends
- **Page Views** - Count of all page views with bounce rate analysis
- **Session Duration** - Average time spent on site
- **Device Breakdown** - Percentage of mobile, tablet, and desktop visitors
- **Traffic Sources** - Organic, direct, and referral traffic analysis
- **Top Pages** - Most visited pages on the site

### Conversion Tracking
- **Quote Requests** - Track all quote request submissions
- **Contact Form Submissions** - Count of contact form inquiries
- **Phone Call Clicks** - Track phone number clicks with 5-second debounce to prevent duplicates
- **Facebook Link Clicks** - Track clicks to Facebook page
- **Google Review Clicks** - Track clicks to Google Reviews
- **Reset Functionality** - Admin users can reset conversion numbers to zero

### Analytics Visualizations
- **Daily Visitor Chart** - Line chart showing visitor trends over time
- **Traffic Sources Chart** - Breakdown of where visitors come from
- **Device Breakdown Chart** - Bar chart showing device type distribution
- **Conversion Metrics** - Cards displaying key conversion numbers

### Date Range Filtering
- **Custom Date Range** - Select custom start and end dates for analysis
- **Default Range** - Automatically shows last 7 days of data
- **Real-Time Updates** - Data refreshes as new events are tracked

### Reporting Features
- **PDF Report Generation** - Export analytics as professional PDF reports
- **Report Templates** - Multiple report styles:
  - Executive Summary - High-level overview for management
  - Detailed Report - Comprehensive metrics and analysis
  - Conversion Report - Focus on lead generation metrics
  - Custom Report - Select specific metrics to include
- **Custom Metrics** - Choose which metrics to include in reports
- **Professional Formatting** - PDF reports with company branding

---

## Technical Features

### Performance & Optimization
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Image Optimization** - Images served from CDN for fast loading
- **Mobile-First Design** - Optimized mobile experience
- **Fast Load Times** - Optimized for quick page loads
- **SEO Optimization** - Meta tags and keywords for search engine visibility

### Security & Compliance
- **SSL/TLS Encryption** - Secure HTTPS connection
- **Rate Limiting** - Protection against spam and abuse
- **Honeypot Fields** - Bot detection on forms
- **Secure Data Handling** - Customer data protected and never shared

### Browser Compatibility
- **Modern Browsers** - Works on Chrome, Firefox, Safari, Edge
- **Mobile Browsers** - Optimized for iOS Safari and Android Chrome
- **Cross-Browser Testing** - Verified on multiple browsers and devices

---

## User Experience Features

### Navigation & Accessibility
- **Intuitive Navigation** - Easy-to-find information
- **Clear Call-to-Action Buttons** - Prominent buttons for key actions
- **Keyboard Navigation** - Full keyboard support for accessibility
- **Mobile Touch-Friendly** - Large touch targets for mobile users
- **Scroll-to-Top** - Automatic scroll to top when navigating between pages

### Visual Design
- **Professional Branding** - Consistent use of brand colors (dark blue #1e3450, deep red #a61c00)
- **High-Quality Images** - Professional product photography
- **Clean Layout** - Uncluttered, easy-to-scan design
- **Hover Effects** - Interactive feedback on clickable elements
- **Product Image Zoom** - Smooth zoom effect on product card images

### Forms & Interactions
- **Form Validation** - Real-time feedback on form input
- **Success Messages** - Clear confirmation when actions complete
- **Error Messages** - Helpful guidance when issues occur
- **Loading States** - Visual feedback during data loading
- **Toast Notifications** - Non-intrusive notifications for user actions

---

## Administrative Features

### Dashboard Admin Controls
- **Admin Authentication** - Manus OAuth login for project owner
- **Admin-Only Reset Button** - Only admins can reset conversion numbers
- **Loading States** - Visual feedback during reset operations
- **Confirmation Dialogs** - Prevent accidental data resets

### Data Management
- **Real-Time Analytics** - Live data from page views and conversions
- **Historical Data** - Track metrics over time
- **Data Aggregation** - Automatic daily metric calculations
- **Device Type Tracking** - Automatic detection of visitor device type

---

## Integration & APIs

### Email Services
- **Resend API** - Reliable email delivery for contact forms and quotes
- **Email Notifications** - Business owner receives notifications for leads

### Analytics Tracking
- **Page View Tracking** - Automatic tracking of all page visits
- **Event Tracking** - Custom events for conversions and interactions
- **Device Detection** - Automatic mobile/tablet/desktop classification
- **Traffic Source Detection** - Automatic referrer tracking
- **User Agent Tracking** - Browser and OS information collection

### Third-Party Services
- **Google Analytics** - Integration with Google Tag Manager (GTM)
- **Facebook Integration** - Direct links to Facebook page
- **Google Reviews** - Direct links to Google Reviews

---

## Content & Information

### Business Information
- **Company Name** - MP Doors & More
- **Location** - 3200 N Texoma Pkwy, Sherman TX 75090
- **Phone** - (903) 421-1305
- **Hours** - Mon–Fri 7 AM–5 PM, Sat 8 AM–3 PM
- **Service Area** - Texoma region (Texas and Oklahoma)

### Product Information
- **Doors** - Entry doors, exterior doors, patio doors, storm doors
- **Windows** - Energy-efficient vinyl windows
- **Flooring** - Luxury vinyl plank flooring
- **Siding** - Vinyl siding and architectural shingles
- **Trim** - Decorative trim and molding

### Brand Partnerships
- **Andersen Windows** - Premium window manufacturer
- **Jeld-Wen** - Quality door manufacturer
- **Other Trusted Brands** - Multiple quality suppliers

---

## Deployment & Hosting

### Domains
- **Primary Domain** - mpdoorsnmore.com
- **WWW Domain** - www.mpdoorsnmore.com
- **Manus Domain** - mpdoorsnmore.manus.space (backup)

### Hosting
- **Manus Hosting** - Built-in hosting with automatic SSL
- **CDN Delivery** - Fast content delivery network
- **Automatic Backups** - Regular backups of all data
- **99.9% Uptime** - Reliable hosting infrastructure

---

## Quality Assurance

### Testing
- **78 Unit Tests** - Comprehensive test coverage
- **Integration Tests** - End-to-end testing of key features
- **Mobile Testing** - Verified on multiple mobile devices
- **Cross-Browser Testing** - Tested on major browsers

### Monitoring
- **Error Tracking** - Automatic error detection and logging
- **Performance Monitoring** - Track page load times
- **Uptime Monitoring** - 24/7 monitoring of site availability
- **Analytics Monitoring** - Track all visitor activity

---

## Summary

The MP Doors & More website is a **complete, production-ready solution** that combines:
- Professional design and branding
- Comprehensive product showcase
- Lead generation and contact capabilities
- Real-time analytics and reporting
- Mobile-responsive design
- Security and compliance
- Reliable hosting and support

**Total Features: 100+**
**Test Coverage: 78 passing tests**
**Deployment Status: Live and active**
