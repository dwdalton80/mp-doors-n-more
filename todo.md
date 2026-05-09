# MP Doors & More Website - Project TODO

## Core Features
- [x] Home page with hero section and value propositions
- [x] Header navigation with logo and menu items
- [x] Footer with contact information and social links
- [x] About page
- [x] Contact page with form
- [x] Products page with category showcase

## Product Pages
- [x] ProductDoors.tsx - Main doors category page
- [x] ProductWindows.tsx - Windows category page
- [x] ProductFlooring.tsx - Flooring category page
- [x] ProductSiding.tsx - Siding category page
- [x] ProductTrim.tsx - Trim & Molding category page
- [x] InteriorDoorsInStock.tsx - In-stock interior doors with quick view modals
- [x] ExteriorDoorsInStock.tsx - In-stock exterior doors with quick view modals
- [x] PatioDoorSpecialOrder.tsx - Special order patio doors
- [x] StormDoorSpecialOrder.tsx - Special order storm doors

## Product Features
- [x] Quick View modals with product details
- [x] Dual-image toggle for most products
- [x] Multi-image gallery (7 images) for French Patio Doors
- [x] Product ratings and features display
- [x] Brand logos with hover effects (non-clickable)
- [x] Breadcrumb navigation on all sub-pages

## Modals & Forms
- [x] Get Pricing modal on product category pages
- [x] Get Quote modal on special order pages
- [x] Form validation for contact forms
- [x] Dark blue header styling (#1e3450) on modals

## Branding & Design
- [x] Correct brand spelling (Andersen, not Anderson)
- [x] Dark blue (#1e3450) and deep red (#a61c00) color scheme
- [x] Professional product photography integration
- [x] Custom favicon
- [x] Responsive design across all pages

## Backend Integration
- [x] Connect Get Pricing forms to Resend email service (router created)
- [x] Connect Get Quote forms to Resend email service (PatioDoorSpecialOrder & StormDoorSpecialOrder)
- [x] Send quote requests to mpdoorsnmore23@gmail.com
- [x] Create vitest tests for quotes router (6 tests passing)
- [x] Multi-image gallery for French Patio Doors (7 images with carousel)

## Analytics & Reporting
- [x] Password-protected analytics dashboard at /dashboard
- [x] Key metrics display (visitors, page views, bounce rate, session duration)
- [x] Daily visitor trends visualization
- [x] Device breakdown and traffic sources analytics
- [x] Conversion tracking (quote requests, contact forms, phone calls)
- [x] Customizable reporting feature with PDF export
- [x] 4 preset report templates (Executive, Detailed, Conversion, Custom)
- [x] Custom metric selection for reports

## Future Enhancements
- [ ] Shopping cart system for multi-product quotes
- [ ] Product search and filtering
- [ ] Customer testimonials section
- [ ] Blog or resources section
- [ ] Live chat support integration
- [ ] Replace hardcoded analytics values with real DB-derived data (top pages, traffic sources, device breakdown)
- [ ] Add integration tests for browser-to-server event tracking flow
- [ ] Test daily metrics aggregation with actual date ranges

## Technical Improvements
- [x] Write vitest unit tests for quotes router (6 tests passing)
- [x] Write vitest unit tests for contact router (2 tests passing)
- [x] Write vitest unit tests for auth logout (1 test passing)
- [x] Write vitest unit tests for dashboard router (9 tests passing)
- [x] Write vitest unit tests for reports router (9 tests passing)
- [x] Add SEO keywords to home page
- [ ] Optimize image loading and caching

## Production Analytics Implementation
- [x] Protect dashboard and reports with owner authentication (adminProcedure)
- [x] Create event tracking system for conversions (quotes, contacts, calls)
- [x] Implement custom analytics system (Option 2: no external dependencies)
- [x] Update dashboard to fetch real analytics data from database
- [x] Update reports to use real analytics data from database
- [x] Add conversion event logging to quote/contact form submissions
- [x] Write tests for protected dashboard access (admin-only)
- [x] Write tests for event tracking and analytics integration (72 tests passing)
- [x] Client-side page view tracking with Navigator.sendBeacon API
- [x] Server-side analytics router for event collection
- [x] Daily metrics aggregation system
- [x] Comprehensive test suite for analytics system


## Analytics Implementation - Complete
- [x] Wire client-side page view tracking to all routes (implemented in App.tsx)
- [x] Add phone-call click tracking to all tel: links in Header and Contact page
- [x] Fix Drizzle query filters in analyticsMetrics router (use `and()` combinator for proper date range)
- [x] Implement page view tracking on route changes in App.tsx
- [x] Create REST endpoint for analytics tracking (/api/analytics/track)
- [x] Connect client-side analytics to server backend
- [x] All 72 tests passing (analytics, dashboard, reports, auth, contact)


## Dashboard Access Enhancement
- [x] Add password-based dashboard access for non-admin users
- [x] Create separate dashboard view for password-protected access
- [x] Implement password verification endpoint for dashboard
- [x] Add password verification to dashboard router


## Bug Fixes
- [x] Fix text overlapping issue on traffic sources pie chart in dashboard (replaced pie chart with legend and progress bars)


## Dashboard Features
- [x] Add date range picker to dashboard for filtering analytics data

- [x] Add dashboard login button in footer under Facebook button
