# Migration off Manus

This site was originally built on [Manus](https://manus.im). This document
records what was ripped out and why, for anyone picking this up later.

## What was removed

The original app was a full Manus "webdev" template: a public marketing site
bolted onto a full admin stack. All of the following were deleted because
they only worked through Manus's own backend services and had no purpose on
a public site anyway:

- **Auth/OAuth** (`server/_core/sdk.ts`, `oauth.ts`) — called Manus's own
  OAuth service, not a standard provider.
- **File storage proxy** (`server/_core/storageProxy.ts`, `server/storage.ts`)
  — every uploaded image was fetched through Manus's "Forge API" for a
  presigned URL. Nothing here was a real S3 bucket you controlled.
- **LLM / image generation / voice transcription** (`server/_core/llm.ts`,
  `imageGeneration.ts`, `voiceTranscription.ts`) — same Forge API, unused by
  the public site.
- **Admin dashboard, analytics, reports, quotes DB logging** — MySQL via
  Drizzle, tRPC routers, the whole Express backend.
- **AI chat box**, admin auth hooks, dashboard layout components.
- Manus dev tooling: `vite-plugin-manus-runtime`, the debug-log collector
  Vite plugin, `.manus/`, `.manus-logs/`, `client/public/__manus__/`.

## What replaced it

- **Hosting**: static Vite build, deployable anywhere (set up for Vercel).
- **Contact/quote forms**: two small serverless functions
  ([api/contact.ts](./api/contact.ts), [api/quote.ts](./api/quote.ts)) using
  [Resend](https://resend.com) directly — same emails, same recipient, no
  backend/database required.
- **Analytics**: routed through the Google Analytics tag (`gtag.js`) already
  present in `index.html`, instead of a custom `/api/analytics/track`
  endpoint that no longer exists.
- **Images**: every image that lived on Manus/CloudFront storage
  (`d2xsxph8kpxj0f.cloudfront.net/...` and `/manus-storage/...`) was
  downloaded and is now committed under `client/public/images/`. Nothing on
  the site depends on a Manus-hosted URL anymore.

## Known issues carried over (pre-existing, not introduced by this migration)

- Two image references were already dead on the live production site before
  this migration (`storm-door-diagram.jpg`, `patio-door-diagram.jpg` — both
  404'd even through the old Manus proxy). The dead `imageUrl2` fields
  referencing them were removed from `StormDoorSpecialOrder.tsx` and
  `PatioDoorSpecialOrder.tsx`. If you have real diagram photos for these,
  add them to `client/public/images/products/` and wire them back in.
- **Licensing flag**: `client/public/images/products/trim-moulding.jpg`
  carries embedded Shutterstock copyright metadata
  ("jantsarik/Shutterstock — No use without permission"). Confirm there's a
  valid license for this image before using it in production, or replace it
  with your own photo.

## Rate limiting

The old backend rate-limited form submissions in-memory (1/hour/IP). The new
serverless functions do the same on a best-effort basis, but since
serverless instances are ephemeral this is a soft speed bump, not a hard
limit — Vercel's platform-level abuse protection is the real backstop.
