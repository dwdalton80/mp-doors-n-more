# Architecture

System design, tech stack, and how the pieces fit together. For *why* the
system looks like this (migrated off Manus), see [MIGRATION.md](../MIGRATION.md).
For deployment/DNS/hosting, see [DEPLOYMENT.md](./DEPLOYMENT.md). For the
full acquisition/ownership-transfer picture, see [HANDOFF.md](./HANDOFF.md).

## What this is

A public marketing/catalog website for MP Doors & More, a home-improvement
supplier in Sherman, TX. It presents the product catalog (doors, windows,
flooring, siding, trim), company info, and customer reviews, and lets
visitors submit two kinds of leads: a general contact message and a
per-product quote request. Both are emailed straight to the business owner.

There is **no login, no database, no admin backend, and no CMS**. Content
(copy, prices, product lists, reviews) is hardcoded in the React source and
changed by editing and redeploying the code — see
["Content is code" under Conventions](#content-is-code-no-cms) below.

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Language | TypeScript | strict-ish `tsc --noEmit` is the type-check gate |
| Frontend framework | React 19 | function components + hooks only |
| Build tool | Vite 7 | `client/` is the Vite root (see `vite.config.ts`) |
| Routing | [wouter](https://github.com/molefrog/wouter) | lightweight client-side router, not React Router |
| Styling | Tailwind CSS 4 | `@tailwindcss/vite` plugin, `client/src/index.css` |
| UI primitives | [shadcn/ui](https://ui.shadcn.com) pattern over Radix UI | `client/src/components/ui/*` — copy-in components, not an npm package |
| Icons | lucide-react | |
| Forms/validation | react-hook-form (some UI components), zod (API payload validation) | the actual Contact/Quote forms use plain `useState`, not react-hook-form |
| Backend | 2 Vercel serverless functions | `api/contact.ts`, `api/quote.ts` — Node.js runtime, Web `Request`/`Response` signature |
| Email delivery | [Resend](https://resend.com) | `resend` npm package, used only inside the two API functions |
| Hosting | [Vercel](https://vercel.com) | static build + serverless functions, auto-deploy on git push |
| Analytics | Google Analytics 4 (`gtag.js`) | tag `G-QKJMTB678R`, loaded in `client/index.html` |
| Maps | Google Maps **embed iframe** | no Google Maps API key/billing account involved — see [HANDOFF.md](./HANDOFF.md) |
| Fonts | Google Fonts (Inter) | loaded via `<link>` in `client/index.html`, no API key |
| Package manager | npm | `package-lock.json` is the source of truth (the repo *used* to pin pnpm — see Conventions) |

There is **no database, no auth provider, no CMS, no object storage
service, and no CI pipeline** (no `.github/workflows`). Deployment is
Vercel's git integration: push → build → deploy.

## Repository structure

```
client/                        Vite root — everything that ships to the browser
  index.html                   HTML shell: meta tags, GA4 tag, Google Fonts, favicon
  public/                      Static files copied as-is to the build output root
    images/                    Every image the site uses (self-hosted, see MIGRATION.md)
      products/                 Product photos (doors, windows, flooring...)
    robots.txt, sitemap.xml     SEO files — hand-maintained, see Known Limitations
    googlecd7e...html           Google Search Console ownership-verification file
  src/
    main.tsx                   Entry point — mounts <App/>
    App.tsx                    Router + layout (Navbar/Footer wrap every page)
    index.css                  Tailwind entry + global styles
    pages/                     One file per route (see Routes table below)
    components/                Header, Footer, modals, review cards, shared UI
      ui/                      shadcn/ui primitives (button, dialog, form, etc.)
    hooks/                     useQuoteModal (shared quote-form logic), small UI hooks
    lib/
      api.ts                   fetch() wrappers for /api/contact and /api/quote
      analytics.ts             gtag.js wrapper (page views, click events)
      schema.ts                schema.org JSON-LD builders, injected per-page
      IMAGE_URLS.ts             a handful of named image constants
      utils.ts                 cn() class-merge helper (shadcn convention)
    contexts/ThemeContext.tsx  light/dark theme context (site is light-only in practice)

api/                            Vercel serverless functions — the entire backend
  contact.ts                    POST /api/contact — general inquiry form
  quote.ts                      POST /api/quote — per-product quote request
  _lib/
    email.ts                    Resend client + shared HTML email template + honeypot check
    rateLimit.ts                 best-effort in-memory per-IP rate limiting
    http.ts                      json()/parseJsonBody() response helpers

vercel.json                     SPA rewrite rule (all paths → index.html) — see DEPLOYMENT.md
vite.config.ts                  Vite config: client/ as root, dist/public as output, path aliases
tsconfig.json / tsconfig.node.json
components.json                 shadcn/ui config (used only when adding new ui/ primitives via its CLI)
package.json / package-lock.json

docs/                            This documentation set
MIGRATION.md                     History: what was removed from the original Manus build and why
FEATURES.md, SITE_CONTENT.md, todo.md   Pre-existing planning docs from the original build — see
                                          Known Limitations for their current accuracy/staleness
```

## Routes

All routes are registered in [`client/src/App.tsx`](../client/src/App.tsx) and rendered inside a
shared `Navbar` + `Footer` layout. No route requires authentication (there
is none).

| Path | Page component | Purpose |
|---|---|---|
| `/` | `Home.tsx` | Hero, value props, product category teasers, reviews |
| `/about` | `About.tsx` | Company story, embedded map |
| `/products` | `Products.tsx` | Category index (doors/windows/flooring/siding/trim) |
| `/products/doors` | `ProductDoors.tsx` | Doors category detail + brand logos |
| `/products/windows` | `ProductWindows.tsx` | Windows category detail |
| `/products/flooring` | `ProductFlooring.tsx` | Flooring category detail |
| `/products/siding` | `ProductSiding.tsx` | Siding/shingles category detail |
| `/products/trim` | `ProductTrim.tsx` | Trim & molding category detail |
| `/entry-doors-in-stock` | `EntryDoorsInStock.tsx` | In-stock entry door inventory with Quick View |
| `/interior-doors-in-stock` | `InteriorDoorsInStock.tsx` | In-stock interior door inventory |
| `/exterior-doors-in-stock` | `ExteriorDoorsInStock.tsx` | In-stock exterior door inventory |
| `/patio-doors-special-order` | `PatioDoorSpecialOrder.tsx` | Special-order patio doors + Get Quote modal |
| `/storm-doors-special-order` | `StormDoorSpecialOrder.tsx` | Special-order storm doors + Get Quote modal |
| `/contact` | `Contact.tsx` | General contact form + business info + embedded map |
| `/404`, catch-all | `NotFound.tsx` | 404 page |

`Products.tsx`'s category cards and several product pages hard-code their
own image lists and copy — see ["Content is code"](#content-is-code-no-cms).

## Data flow

### Page view (analytics)

```
Browser loads any route
  → App.tsx Router's useEffect fires on mount and on every wouter route change
  → client/src/lib/analytics.ts: logPageView(path)
  → window.gtag('event', 'page_view', {...})
  → Google Analytics (property tied to tag G-QKJMTB678R)
```

GA4's own automatic page-view (normally fired by `gtag('config', ...)`) is
explicitly disabled (`send_page_view: false` in `client/index.html`)
specifically so it doesn't double-count against the manual call above — a
regression introduced and then fixed during the Manus migration (see the
"Fix code-review findings" commit).

### Contact form submission

```
Contact.tsx form submit
  → client/src/lib/api.ts: sendContactMessage(payload)
  → POST /api/contact  (Vercel serverless function, api/contact.ts)
      1. reject non-POST (405)
      2. parse JSON body (400 on failure)
      3. zod schema validation (400 on failure) — name, valid email, message required;
         phone/subject optional
      4. honeypot field check (400 if filled — bot signal)
      5. per-IP rate limit check (429 if within the last hour on this warm instance)
      6. render HTML email (api/_lib/email.ts) and send via Resend
         (api/_lib/email.ts → resend.emails.send)
         — on failure: 502, and the rate-limit window is NOT consumed
      7. on success: record the rate-limit submission, return { success: true }
  → toast/success UI in Contact.tsx
```

`api/quote.ts` (used by the "Get Quote" modals on the special-order pages,
via `client/src/hooks/useQuoteModal.ts`) follows the identical flow with a
different zod schema (adds `product`, drops `subject`) and email subject
line.

Both routes reply to `mpdoorsnmore23@gmail.com` (or the `TO_EMAIL` env var)
via a `from` address on the `mpdoorsnmore.com` domain, with `replyTo` set to
the submitter's own email — so hitting "Reply" in the inbox goes straight to
the customer.

### Product images / "Quick View"

Product image galleries are plain arrays of local paths under
`client/public/images/products/`, no CDN or image-optimization service.
`QuickViewModal.tsx` (shared by the special-order pages) and the in-stock
pages each render their own gallery/lightbox from those arrays — see
[Known Limitations](#known-limitations) for the duplication that still
exists in the non-special-order in-stock pages.

## Rate limiting

`api/_lib/rateLimit.ts` keeps an in-memory `Map<ip, timestamp>` and rejects a
second submission from the same IP within an hour. This is **best-effort
only**: Vercel serverless functions are ephemeral and each cold/warm
instance has its own independent map, so the limit doesn't hold across
instances or redeploys. Treat it as a speed bump against naive spam bots,
not a real defense — Vercel's platform-level abuse protection is the actual
backstop. See [HANDOFF.md](./HANDOFF.md#known-limitations--technical-debt)
for the tradeoffs if this ever needs to be made authoritative.

## Third-party integrations at a glance

| Service | Used for | Where | Requires account? |
|---|---|---|---|
| Resend | Sending contact/quote form emails | `api/_lib/email.ts` | Yes — API key + verified sending domain |
| Vercel | Hosting, build, serverless functions | (platform, not in-repo) | Yes |
| Google Analytics 4 | Page view / click tracking | `client/index.html`, `client/src/lib/analytics.ts` | Yes (to view data; site works without it) |
| Google Search Console | SEO indexing/verification | `client/public/googlecd7e99b69fd86b7f.html` | Yes (to view data) |
| Google Fonts | Inter typeface | `client/index.html` `<link>` tags | No account needed |
| Google Maps | Embedded map (About, Contact pages) | plain `<iframe src="https://www.google.com/maps/embed?...">` | No — this is the free embed, not the paid JS API, no API key in the codebase |
| Facebook | Outbound links to the business Page | `Header.tsx`, `Footer.tsx`, `Home.tsx`, `Contact.tsx` | No — plain links, no SDK/pixel embedded |

Full detail on what each of these needs for an ownership transfer is in
[HANDOFF.md](./HANDOFF.md).

## Conventions

### Content is code, no CMS

Every product description, price note, review, and image list lives
directly in the page's `.tsx` file as a hardcoded array/object (e.g. the
`specialOrderDoors` array in `StormDoorSpecialOrder.tsx`). There is no
headless CMS, spreadsheet, or database backing this. **Updating a product
description or adding a review means editing the component and redeploying.**
This is a deliberate simplicity trade-off for a small static site, but it's
the single biggest thing a non-developer owner needs to understand — see
[HANDOFF.md](./HANDOFF.md) for the practical implications.

### Path aliases

`@/*` → `client/src/*` and `@shared/*` (defined in `vite.config.ts` and
`tsconfig.json`, but currently unused — nothing under `client/src` imports
`@shared`). Prefer `@/` imports over relative `../../` paths, matching the
existing code.

### Styling

Tailwind utility classes directly in JSX; the brand palette is used as raw
hex literals (`#a61c00` red accent, `#1a2e45` / `#1e3450` navy, `#FAF7F2`
cream) rather than named Tailwind theme tokens. If this project grows,
promoting those hex values into `tailwind.config`/CSS variables would make
a rebrand or theme change far cheaper — see Known Limitations.

### Shared modal pattern

The quote-request and quick-view product modals are factored into
`client/src/hooks/useQuoteModal.ts` + `client/src/components/QuoteModal.tsx`
+ `client/src/components/QuickViewModal.tsx`, used by both special-order
pages. New product pages that need the same "get a quote" flow should reuse
these rather than re-implementing them inline (that duplication is exactly
what was cleaned up in the "Fix code-review findings" commit).

### Type checking

`npm run check` runs `tsc --noEmit`. There is no `npm test` — no automated
test suite exists (the old Manus build had Vitest tests for the deleted
backend; none carried over, see [HANDOFF.md](./HANDOFF.md)).
