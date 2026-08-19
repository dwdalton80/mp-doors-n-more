# MP Doors & More

Website for MP Doors & More, a home-improvement supplier (doors, windows, vinyl
flooring, siding, and shingles) in Sherman, TX.

This is a static React + Vite site with two small serverless functions for the
contact/quote forms. It was migrated off the Manus platform — see
[MIGRATION.md](./MIGRATION.md) for what changed and why.

## Stack

- **Frontend**: React 19 + Vite + Tailwind CSS + wouter (routing), built as a
  static single-page app.
- **Forms**: Two Vercel serverless functions, [api/contact.ts](./api/contact.ts)
  and [api/quote.ts](./api/quote.ts), send form submissions via
  [Resend](https://resend.com).
- No database, no auth, no admin dashboard — this is a public marketing/catalog
  site only.

## Local development

```bash
npm install
npm run dev
```

Opens the Vite dev server at `http://localhost:5173`. The contact/quote forms
won't send real email in plain `vite dev` (that needs the serverless
functions) — use `vercel dev` instead if you want to test form submission
locally (see below).

## Environment variables

Create a `.env` file (never committed — already in `.gitignore`):

```
RESEND_API_KEY=your_resend_api_key
```

Optional overrides (defaults shown):

```
TO_EMAIL=mpdoorsnmore23@gmail.com
FROM_EMAIL=MP Doors & More <noreply@mpdoorsnmore.com>
```

`FROM_EMAIL`'s domain must be a verified sending domain in your Resend
account (mpdoorsnmore.com already is).

## Deploying to Vercel

1. Push this repo to GitHub (if not already).
2. In [vercel.com](https://vercel.com), "Add New Project" → import the repo.
   Vercel auto-detects the Vite framework preset — no build config needed.
3. In the project's **Settings → Environment Variables**, add `RESEND_API_KEY`
   (and `TO_EMAIL`/`FROM_EMAIL` if you want non-default values).
4. Deploy. `vercel.json` already contains the SPA rewrite rule so client-side
   routes (`/products/doors`, `/contact`, etc.) work on direct load/refresh.
5. Point your domain (`mpdoorsnmore.com`) at the Vercel project in
   **Settings → Domains**.

To test the serverless functions locally before deploying:

```bash
npm install -g vercel
vercel dev
```

## Project structure

```
client/               React app (Vite root)
  src/pages/           One file per route
  src/components/      Header, Footer, shared UI
  public/images/        All site images (self-hosted, see MIGRATION.md)
api/                   Vercel serverless functions (contact + quote forms)
  _lib/                 Shared email/rate-limit helpers
```
