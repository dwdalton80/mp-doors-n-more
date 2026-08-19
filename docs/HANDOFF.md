# Ownership & Technical Handoff

This document is written for **whoever ends up owning or maintaining this
project next** — a new developer, a technical team, or a new business
owner after an acquisition. It's the single place that answers "what would
break, and what do I need, if this changed hands tomorrow."

Companion docs:
- [ARCHITECTURE.md](./ARCHITECTURE.md) — system design, tech stack, repo structure, data flow
- [DEPLOYMENT.md](./DEPLOYMENT.md) — build, hosting, DNS, environment variables
- [MIGRATION.md](../MIGRATION.md) — history of what was removed from the original Manus-built app
- [README.md](../README.md) — quick start for a developer picking up the code

## Executive summary

This is a small, self-contained marketing/catalog website for MP Doors &
More (a home-improvement supplier in Sherman, TX). It is:

- **A static website** (React, built by Vite) with **two small serverless
  functions** for form email — nothing more.
- **No database.** No customer data is stored anywhere in this system —
  contact/quote form submissions are emailed once and not retained by the
  application itself (they persist only in the destination inbox).
- **No login/auth system, no admin panel, no CMS.** All content (prices,
  product copy, reviews) is hardcoded in the source code.
- **Cheap and simple to run.** The only recurring cost tied directly to the
  code is Vercel hosting (free tier is plausible at this traffic level) and
  Resend email sending (also has a generous free tier). Domain registration
  is the other recurring cost, external to this stack.
- **Deliberately low platform lock-in.** After the 2026 migration off the
  Manus no-code platform (see [MIGRATION.md](../MIGRATION.md)), the only
  hosting-specific code is one rewrite rule in `vercel.json` and the
  `api/*.ts` function-export convention — both are small, well-understood
  patterns portable to Netlify, Cloudflare Pages, or any Node host (see
  [DEPLOYMENT.md](./DEPLOYMENT.md#reproducing-this-deployment-on-a-different-vercel-account--host)).

The rest of this document is the detailed inventory behind that summary.

## External accounts & services inventory

Every third-party account this project touches, and what happens to each in
a transfer. "Recreate" means a new owner can stand up a brand-new account
and just needs the new key added to Vercel — nothing in the app breaks by
switching accounts. "Transfer" means moving the *existing* account itself
is the lower-friction path (usually because reputation, history, or
verification would otherwise be lost).

| # | Service | Purpose | Recreate or transfer? | Notes |
|---|---|---|---|---|
| 1 | **Domain registrar** (nameservers resolve to `ns1/ns2.globaldomaingroup.com`, suggesting a Newfold Digital / EIG-family registrar such as Domain.com) | Owns `mpdoorsnmore.com` | **Transfer** (or at minimum, get DNS-editing access) | Confirm the exact registrar and account login directly — DNS lookups can't identify it precisely. This is the single highest-friction item in a transfer: domain transfers (registrar-to-registrar) take days and require an unlock/auth code from the current registrar, or a login-and-continue-using-same-registrar approach (lower friction) if the buyer is fine leaving it where it is. |
| 2 | **GitHub** — repo `dwdalton80/mp-doors-n-more` | Source code, version history | **Transfer** | Currently owned by a personal GitHub account (`dwdalton80`) and is **public** (see [Repository visibility](#repository-visibility--intellectual-property) below). Use GitHub's repo-transfer feature (Settings → Danger Zone → Transfer ownership) to move it to the new owner's account/org without losing history, issues, or the connected Vercel integration reference. |
| 3 | **Vercel** | Hosting, builds, serverless functions, SSL | **Transfer or recreate** | If transferring the existing Vercel project: Vercel supports transferring a project to another Vercel account/team (Project Settings → Transfer). If recreating: re-import the GitHub repo into a fresh Vercel account (5-minute process, see [DEPLOYMENT.md](./DEPLOYMENT.md)) — no code changes needed either way. |
| 4 | **Resend** | Sends contact/quote form emails | **Recreate is simplest** | A new Resend account + new API key + re-verifying the `mpdoorsnmore.com` sending domain (SPF/DKIM DNS records) is low-friction and doesn't require touching code — just update `RESEND_API_KEY` (and `FROM_EMAIL` if the domain changes) in Vercel's environment variables. Transferring the existing account is also possible via Resend support if preserving send history/reputation matters. |
| 5 | **Google Analytics 4** (property behind tag `G-QKJMTB678R`) | Traffic analytics | **Transfer preferred** | Transferring GA4 account access (Google Analytics → Admin → Account Access Management) preserves historical traffic data. If recreated instead, update the tag ID in `client/index.html` (two occurrences: the `src` script URL and the `gtag('config', ...)` call) — all historical data is lost on a fresh property. |
| 6 | **Google Search Console** | Search indexing status/verification for `mpdoorsnmore.com` | **Transfer preferred** | The site includes a verification file (`client/public/googlecd7e99b69fd86b7f.html`) tied to whatever Google account originally added this property. A new owner should either get added as a user on the existing property (Search Console → Settings → Users and permissions) or verify a new property (via DNS TXT record, replacing the file-based method) — losing the existing property loses search-performance history. |
| 7 | **Facebook Page** (`facebook.com/p/MP-Doors-More-61550671844372`) | Business social presence, linked from header/footer/home/contact | **Transfer via Facebook Business Manager** | Not integrated technically (no SDK/pixel in the code — just plain outbound `<a>` links), so nothing in the app breaks regardless of who administers the Page. Page admin transfer is a Facebook Business Manager / Meta Business Suite action, independent of this codebase. |
| 8 | **Google Business Profile / Google Maps listing** ("MP Doors & More", Sherman TX — linked from Home/Contact "Leave a Review" buttons and the embedded map) | Local search presence, reviews | **Transfer via Google Business Profile** | Same as Facebook — only linked, not integrated. Ownership transfer happens in the Google Business Profile dashboard, unrelated to the code. |
| 9 | **Business email** (`mpdoorsnmore23@gmail.com`) | Destination for all contact/quote form submissions (`TO_EMAIL` default) | **Transfer or update env var** | If the new owner uses a different inbox, just change `TO_EMAIL` in Vercel's environment variables — no code change. |

### Repository visibility & intellectual property

**The GitHub repository is currently public.** Anyone can view the full
source code, commit history, and file structure at
`github.com/dwdalton80/mp-doors-n-more`. No secrets are exposed (`.env` is
gitignored and was never committed — the Resend API key shared during this
migration was placed only in a local, gitignored `.env` and in Vercel's
environment variables, never in a commit), but the **code itself, business
copy, and structure are publicly visible and clonable**, which is worth a
deliberate decision, not an oversight, especially ahead of a sale:

- If the new owner wants the code private, flip it: GitHub → repo →
  Settings → Danger Zone → **Change visibility → Private**. This is
  reversible and doesn't affect the live site (Vercel keeps deploying from
  a private repo the same way, as long as its GitHub App has repo access).
- If keeping it public is intentional (e.g. as a portfolio piece), no
  action needed — just confirm that's actually the intent.

## Credentials & secrets inventory

**No secret value is reproduced anywhere in this repo or its documentation.**
This table tells you what exists and where it lives operationally — not the
values themselves.

| Secret | Lives in | Rotate/recreate by |
|---|---|---|
| `RESEND_API_KEY` | Vercel project env vars only (never committed; a local copy may exist in a developer's gitignored `.env`) | Resend dashboard → API Keys → create new, revoke old, update in Vercel |
| Vercel account/team access | Vercel dashboard | Vercel → Settings → Members, or full account transfer |
| GitHub account access | GitHub | Repo transfer, or add new owner as a collaborator/admin first if doing a staged handoff |
| Domain registrar login | Registrar account (see item #1 above) | Registrar's own account-recovery/transfer process |
| Google Analytics access | Google account tied to the GA4 property | GA4 Admin → Account Access Management |
| Google Search Console access | Google account tied to the property | Search Console → Settings → Users and permissions |
| Facebook Page admin | Meta Business Suite | Business Manager → Page roles |
| Google Business Profile access | Google Business Profile | Business Profile → Managers |

There are **no database credentials, no auth secrets/JWT signing keys, and
no third-party API keys beyond Resend** — a direct, deliberate consequence
of stripping the Manus platform's auth/database/storage layer during
migration (see [MIGRATION.md](../MIGRATION.md)). This significantly reduces
the secret-sprawl a typical handoff has to account for.

## Data handled / privacy posture

- The application **does not persist any visitor or customer data**. Form
  submissions (name, email, phone, message) are validated, formatted into
  an HTML email, sent via Resend, and then held only in whatever inbox
  receives them (`TO_EMAIL`) — not stored in any database, log file, or
  analytics event payload.
- Google Analytics collects standard aggregate traffic data (page views,
  device type inferred from user agent, referrer) — no PII is intentionally
  sent to GA4 beyond what GA4 collects by default for any site.
- There is no cookie-consent banner and no explicit privacy policy page in
  the current site. If growing this business or its data footprint (e.g.
  adding a CRM, storing quote requests in a database, adding remarketing
  pixels), revisit whether a privacy policy and consent flow become legally
  necessary for the target jurisdiction(s).

## Ownership transfer checklist

A suggested order of operations for a clean handoff, minimizing any window
where the live site is broken or where the outgoing and incoming owner both
have unclear access:

1. **Code**: Transfer the GitHub repo (or add the new owner as an admin
   collaborator first, transfer later) — see item #2 above. Decide on
   public vs. private visibility deliberately (see
   [above](#repository-visibility--intellectual-property)).
2. **Hosting**: Transfer or recreate the Vercel project (item #3). Set
   `RESEND_API_KEY` (and any overridden `TO_EMAIL`/`FROM_EMAIL`) in the new
   project's environment variables — see [DEPLOYMENT.md](./DEPLOYMENT.md).
3. **Verify before DNS**: Confirm the new Vercel deployment works completely
   on its `*.vercel.app` URL — every page loads, images render, both forms
   send real email — **before touching DNS**.
4. **Email**: Set up (or transfer) the Resend account and re-verify the
   sending domain (item #4).
5. **Domain**: Transfer registrar access or get DNS-editing rights (item
   #1), then re-point DNS to the new Vercel deployment per
   [DEPLOYMENT.md](./DEPLOYMENT.md#dns--current-state-important-read-before-changing-anything).
   This is the step with real, immediate customer-facing impact — do it
   deliberately, ideally during low-traffic hours, and confirm the domain
   resolves correctly and forms still work immediately after.
6. **Analytics & search**: Transfer or recreate Google Analytics (item #5)
   and Google Search Console (item #6) access.
7. **Social/local listings**: Transfer Facebook Page (item #7) and Google
   Business Profile (item #8) admin access. These don't affect the codebase
   but do affect the business's public presence and reviews.
8. **Business inbox**: Confirm who has access to `mpdoorsnmore23@gmail.com`
   (or update `TO_EMAIL` to a new address the new owner controls) — item
   #9.
9. **Walkthrough**: Have the incoming developer/owner read
   [README.md](../README.md), [ARCHITECTURE.md](./ARCHITECTURE.md), and this
   document, then do a full local `npm install && npm run dev` and a
   `vercel dev` smoke test before considering the handoff complete.

## Known limitations & technical debt

Listed roughly in order of "a new owner should know this exists," not
strictly by severity:

- **Content is hardcoded, not CMS-managed.** Every price, product
  description, and review lives in `.tsx` source files. A non-technical
  owner cannot update the site without a developer (or without learning
  basic Git/React). If the business expects frequent content changes,
  budget for either a developer relationship or a future migration to a
  headless CMS (Sanity, Contentful, or even a simple JSON/Markdown content
  layer read at build time) — see
  [ARCHITECTURE.md § Content is code](./ARCHITECTURE.md#content-is-code-no-cms).
- **Rate limiting is best-effort, not authoritative.** The in-memory
  per-IP limiter in `api/_lib/rateLimit.ts` resets on every cold start and
  doesn't share state across serverless instances. It stops naive repeat
  submissions but is not a real defense against a determined spammer — see
  [ARCHITECTURE.md § Rate limiting](./ARCHITECTURE.md#rate-limiting). If
  spam becomes a real problem, the next step up is a real captcha
  (Cloudflare Turnstile or hCaptcha are drop-in options) rather than trying
  to harden the in-memory approach.
- **`sitemap.xml` is hand-maintained and already incomplete.** It lists
  the core pages but not the in-stock inventory pages
  (`/entry-doors-in-stock`, `/exterior-doors-in-stock`,
  `/interior-doors-in-stock`) or the special-order pages
  (`/patio-doors-special-order`, `/storm-doors-special-order`). Either keep
  it updated by hand when adding routes, or generate it at build time from
  the route list in `App.tsx`.
- **No automated tests.** The original Manus-built app had Vitest tests for
  the (now-deleted) backend routers; none were ported forward because the
  backend they tested no longer exists. There is currently no test coverage
  at all — not the frontend, not the two API functions. Given the low
  complexity of what remains, the highest-value first tests would be for
  `api/contact.ts`/`api/quote.ts`'s validation and rate-limit logic.
- **No CI pipeline.** `tsc --noEmit` and `vite build` are run manually
  before commits, not enforced automatically. A GitHub Actions workflow
  running both on every PR would catch a broken build before it reaches
  Vercel.
- **Brand colors are raw hex literals**, not centralized theme tokens (see
  [ARCHITECTURE.md § Styling](./ARCHITECTURE.md#styling)). A future rebrand
  or dark-mode pass would need to find-and-replace across many files rather
  than changing one config value.
- **One licensed stock photo needs verification.**
  `client/public/images/products/trim-moulding.jpg` carries embedded
  Shutterstock copyright metadata. Confirm there's a valid license for
  continued use, or replace it with an owned photo — flagged in detail in
  [MIGRATION.md](../MIGRATION.md#known-issues-carried-over-pre-existing-not-introduced-by-this-migration).
- **`FEATURES.md`, `SITE_CONTENT.md`, and `todo.md` at the repo root are
  planning artifacts from the original build**, not living documentation —
  they may describe features or copy that have since changed. Treat them
  as historical reference only; this `docs/` folder and the code itself are
  the source of truth going forward. Consider archiving or deleting them
  once their useful historical content (if any) has been folded in here.
- **DNS is not yet pointed at the current host** — see
  [DEPLOYMENT.md](./DEPLOYMENT.md#dns--current-state-important-read-before-changing-anything)
  for the live status at time of writing. This is the most operationally
  urgent item in this list, distinct from the code-level debt above.

## Recommended conventions going forward

See [ARCHITECTURE.md § Conventions](./ARCHITECTURE.md#conventions) for the
established patterns (path aliases, the shared quote-modal pattern, styling
approach). In addition, for whoever maintains this next:

- Run `npm run check` (and ideally `npm run build`) before every commit —
  there's no CI safety net yet (see Known Limitations above).
- When adding a new "get a quote"-style form to a new product page, reuse
  `useQuoteModal` / `QuoteModal` / `QuickViewModal` rather than duplicating
  the pattern — that duplication was deliberately cleaned up once already.
- When adding a new API route under `api/`, reuse `api/_lib/http.ts`'s
  `json()`/`parseJsonBody()` helpers and follow `api/contact.ts`'s
  structure (method check → parse → zod validate → honeypot →
  rate-limit → send → record) rather than inventing a new shape.
- Keep this `docs/` folder current as the system changes — in particular,
  update [DEPLOYMENT.md](./DEPLOYMENT.md)'s DNS section once the domain is
  actually re-pointed, and update the environment-variable table here and
  in DEPLOYMENT.md if new integrations are added.

## Setup for a new developer

The short version (full detail in [README.md](../README.md) and
[DEPLOYMENT.md](./DEPLOYMENT.md)):

```bash
git clone https://github.com/dwdalton80/mp-doors-n-more.git
cd mp-doors-n-more
npm install
cp .env.example .env        # then fill in RESEND_API_KEY
npm run dev                 # UI at http://localhost:5173
# or, to test the real contact/quote forms:
npm install -g vercel
vercel dev
```

Read, in order: [README.md](../README.md) →
[ARCHITECTURE.md](./ARCHITECTURE.md) → [DEPLOYMENT.md](./DEPLOYMENT.md) →
this document → [MIGRATION.md](../MIGRATION.md) (for historical context on
why the codebase looks the way it does).
