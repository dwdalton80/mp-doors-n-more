# Deployment, Hosting & DNS

This is the operational reference: how a build happens, what's configured on
Vercel, what the domain currently points at, and how to reproduce all of it
from scratch on a different account. For the acquisition-specific checklist
(what has to be *recreated* vs *transferred*), see
[HANDOFF.md](./HANDOFF.md#ownership-transfer-checklist).

## How deployment works today

- **Host**: [Vercel](https://vercel.com), connected to the GitHub repo
  [`dwdalton80/mp-doors-n-more`](https://github.com/dwdalton80/mp-doors-n-more).
- **Trigger**: Vercel's GitHub integration auto-builds and deploys on every
  push. Pushes to `main` produce a Production deployment; pushes to any
  other branch (and PRs) produce a Preview deployment.
- **Build**: Vercel auto-detects the Vite framework preset. No custom build
  command is configured — it runs `npm run build` (→ `vite build`, output to
  `dist/public`) and serves the two files under `api/` as serverless
  functions automatically (Vercel's convention: anything in `/api` with a
  default-exported `handler` becomes `POST /api/<filename>`).
- **Routing**: [`vercel.json`](../vercel.json) contains one rewrite rule —
  `"/(.*)" → "/index.html"` — so client-side routes (`/products/doors`,
  `/contact`, etc.) resolve correctly on a hard refresh or direct link,
  instead of 404ing. This is the standard SPA fallback; Vercel checks static
  files and functions (`/api/*`, `/images/*`, etc.) before applying it, so
  it does not swallow API calls or asset requests.
- **No CI pipeline**: there's no `.github/workflows` — Vercel's own build
  step is the only "CI" this project has. Nothing runs `tsc --noEmit` or
  lints automatically before a deploy; a broken build is only caught by
  Vercel's build step failing.

## Environment variables (Vercel project settings)

Set under **Project → Settings → Environment Variables**. None of these are
in the repo — see [.env.example](../.env.example) for the local-dev version.

| Variable | Required | Purpose | Where to get it |
|---|---|---|---|
| `RESEND_API_KEY` | **Yes** | Auth for sending contact/quote emails | [resend.com](https://resend.com) → API Keys |
| `TO_EMAIL` | No (defaults to `mpdoorsnmore23@gmail.com`) | Where form submissions are delivered | — |
| `FROM_EMAIL` | No (defaults to `MP Doors & More <noreply@mpdoorsnmore.com>`) | Sender address on outgoing emails | Must be on a domain verified in Resend |

If `FROM_EMAIL` is changed to a different domain, that domain must be added
and DNS-verified (SPF/DKIM records) in the Resend dashboard first, or Resend
will reject the send.

## DNS — current state (important, read before changing anything)

Checked at time of writing:

```
mpdoorsnmore.com       A      104.18.26.246        (Cloudflare-fronted)
www.mpdoorsnmore.com   A      104.18.26.246        (Cloudflare-fronted)
mpdoorsnmore.com       NS     ns1.globaldomaingroup.com
                              ns2.globaldomaingroup.com
```

**As of this writing, `https://mpdoorsnmore.com` returns an HTTP 404** — the
apex domain is still pointed at the old hosting (Cloudflare in front of what
was the Manus deployment), which is no longer serving the site correctly
post-migration. The Vercel deployment itself is reportedly live, but on its
`*.vercel.app` URL — **the custom domain has not yet been repointed to
Vercel.** Confirm the exact Vercel project URL in the Vercel dashboard, and
treat re-pointing DNS as an explicit, deliberate next step, not something to
do casually — it is the one action in this whole stack that visibly affects
live customer traffic the moment it propagates.

The nameservers (`ns1/ns2.globaldomaingroup.com`) indicate the domain is
registered through a Newfold Digital / EIG-family reseller (commonly branded
as **Domain.com** or similar) — confirm the exact registrar and login access
directly in the account, since DNS lookups can't tell you that with
certainty.

### To point the domain at Vercel

1. In the Vercel project, **Settings → Domains → Add** `mpdoorsnmore.com`
   and `www.mpdoorsnmore.com`.
2. Vercel will show the exact records to create (typically an `A` record for
   the apex pointing at Vercel's IP, and a `CNAME` for `www` pointing at
   `cname.vercel-dns.com` — Vercel's UI gives the authoritative values at
   the time you add the domain).
3. Log into the domain's DNS management (wherever `ns1/ns2.globaldomaingroup.com`
   is administered — check the registrar account) and update those records.
4. Vercel auto-issues an SSL certificate once DNS resolves correctly — no
   separate certificate purchase/step needed.
5. **Recommended order of operations**: verify the site fully on the
   `*.vercel.app` URL first (every page, both forms actually send email,
   images load) — *then* switch DNS. That way there's no window where the
   public domain points at a broken or half-configured deployment.

## Reproducing this deployment on a different Vercel account / host

If ownership changes and a fresh Vercel account is used instead of
transferring the existing one:

1. Fork/transfer the GitHub repo to the new owner's account (see
   [HANDOFF.md](./HANDOFF.md) for the GitHub-transfer specifics).
2. Create a new Vercel project, import that repo. Framework preset
   auto-detects as Vite — no build settings need to be entered manually.
3. Set the three environment variables above (`RESEND_API_KEY` at minimum).
4. Deploy, verify on the `*.vercel.app` URL.
5. Re-point DNS per the steps above.
6. Re-add the Google Search Console property for the domain (or transfer
   the existing property — see HANDOFF.md) so indexing isn't interrupted.

Nothing in this codebase is Vercel-specific beyond `vercel.json`'s rewrite
rule and the `api/*.ts` handler-export convention (`export default async
function handler(req: Request): Promise<Response>`). Both of those are easy
to port:

- **Netlify**: equivalent SPA redirect in `netlify.toml`
  (`[[redirects]] from = "/*" to = "/index.html" status = 200`), and the
  `api/*.ts` functions would move to `netlify/functions/` with a small
  signature adjustment (Netlify's Node functions use `(event, context)`,
  not the Fetch API `Request`/`Response` Vercel uses — a rewrite, not a
  large one, since the actual logic in `_lib/` is platform-agnostic).
- **Any static host + separate function host** (e.g. Cloudflare Pages +
  Workers, S3/CloudFront + Lambda): the `dist/public` build output is a
  plain static SPA and can be hosted anywhere; the two email-sending
  functions are the only pieces that need *some* serverless/Node runtime
  environment with outbound HTTPS access (to call Resend's API) and the
  `RESEND_API_KEY` secret.

## Local development

```bash
npm install
npm run dev        # Vite dev server at http://localhost:5173 — UI only,
                    # /api/contact and /api/quote are NOT served this way
```

To exercise the real serverless functions locally (so the forms actually
send email against your Resend key):

```bash
npm install -g vercel
vercel dev
```

`vercel dev` reads `.env` for the environment variables above (Vercel CLI
picks up a local `.env` automatically, or use `vercel env pull` if the
variables are already set in the Vercel project).

## Build verification

```bash
npm run check   # tsc --noEmit — must be clean
npm run build   # vite build — outputs to dist/public
```

Both are run manually before every commit in this project's history so far;
there is no pre-commit hook or CI enforcing it (see Known Limitations in
[HANDOFF.md](./HANDOFF.md)).
