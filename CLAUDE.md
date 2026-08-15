# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Commands

```bash
npm run dev       # local dev server on :3000
npm run build     # production build (must stay fully static)
npm run lint      # eslint
npx tsc --noEmit  # type-check
npm run preview   # build for Cloudflare Workers and preview locally
npm run deploy    # build and deploy to Cloudflare Workers

# Convert a new screenshot or photo to WebP and print its dimensions
node scripts/optimize-images.mjs <file-or-dir>
```

There is no test runner yet.

## Architecture

A Next.js 16 App Router site deployed to **Cloudflare Workers** via `@opennextjs/cloudflare`.
Supabase clients are installed but not yet wired into any route.

The one route, `/`, is the **Ads2Sawa sales page**. Its structure is deliberately layered:

- `src/content/` — **all copy and every number.** `offer.ts` holds prices, the founding-price
  deadline, the checkout URL and the results figures; `copy.ts` holds the prose, module list,
  receipts, FAQs and testimonials. Sections read from here and own no strings of their own.
  Long-form prose is stored as arrays of lines because one thought per paragraph is what gives
  the sales letter its rhythm.
- `src/components/ui/` — presentation primitives (`Section`, `Container`, `CtaButton`,
  `Exhibit`, `AssetSlot`, `Reveal`, `Marker`, `Ledger`, `Countdown`, `StickyCta`).
- `src/components/sections/` — one file per page section; `app/page.tsx` only composes them.

Editing copy or pricing should never require touching a component.

## Conventions

- **Static output is a hard requirement.** The route must stay `○ (Static)` in build output.
  Nothing may read request-time state, and `new Date()` must not appear in render — use
  `offer.copyrightYear` and let the client-side `Countdown` handle live time.
- **Images are pre-sized WebP and unoptimized at runtime.** `next.config.ts` sets
  `images.unoptimized` so Cloudflare needs no image-optimization binding — which makes
  `scripts/optimize-images.mjs` (dev-only `sharp`) the whole pipeline. Run every new asset
  through it and copy the printed `width`/`height` into `copy.ts` so nothing shifts on load.
  Flat-colour UI captures go **lossless** WebP: smaller than PNG and pixel-perfect, which
  matters because visitors zoom into them. Photographs go lossy.
- **Every `Exhibit` gets a full-size zoom viewer** via `ExhibitZoom`, so a screenshot never
  has to be legible at card size. Its `<img>` only mounts on first open — eleven eager copies
  would double the images in the DOM.
- **Design tokens live in `globals.css`**, under Tailwind v4 `@theme`. Use `ink-*`, `paper`,
  `fog*` and `brand*` — never raw hex in components. The palette is red plus neutrals only;
  the proof screenshots supply every other colour.
- **Red is annotation, not decoration.** `Marker` is used exactly three times on the page.
  Adding a fourth weakens all of them.
- **Every primary CTA carries `data-cta`.** `StickyCta` observes them and hides itself while
  one is on screen, so the bar never competes with a real button. A new CTA that skips
  `CtaButton` must set the attribute itself or the bar will overlap it.
- **Reveal animations must degrade.** `.reveal` starts hidden and is shown by an observer, so
  reduced-motion and no-JS fallbacks in `globals.css` and `layout.tsx` must stay in place.
- Effects must not call `setState` synchronously — the lint config rejects it. Use
  `useSyncExternalStore` (see `Countdown`) or a rAF callback (see `Ledger`).

## Payments

Xendit hosted invoices. The flow, and why it's shaped this way:

1. `POST /api/checkout` recomputes the price from `content/checkout.ts` (never from
   the request body), inserts a `pending` row in Supabase `orders`, creates a Xendit
   invoice, and returns its `invoice_url`.
2. The buyer pays on Xendit's page. **Card details never touch this app** — that's
   the entire reason for the hosted handoff.
3. `POST /api/webhooks/xendit` is the authoritative signal. It verifies the
   `x-callback-token` header and flips the order to `paid`. This fires whether or
   not the buyer ever returns, so someone who closes the tab still gets recorded.
4. Xendit redirects to `/checkout/success?ref=<external_id>`, which looks the order
   up server-side. The redirect alone proves nothing — anyone can type that URL.

Rules worth keeping:

- **Never trust an amount from the client.** `orderTotal()` prices from our own data
  and unknown bump ids are filtered out.
- **Webhooks must be repeatable.** Xendit retries up to six times and can deliver the
  same event twice. `applyInvoiceCallback` reaches the same end state either way, and
  a late `EXPIRED` can never undo a `paid` order.
- **Return 2xx unless *we* failed.** `outcome: "ignored"` (unknown order, PENDING
  status) returns 200 to stop pointless retries; only `outcome: "error"` returns 500.
- `orders` has RLS on with **no policies** — anon and authenticated can touch nothing.
  All access goes through `lib/supabase/admin.ts` (service-role, server-only). Never
  import that into a Client Component.

### Environment variables

Three places, all needing the same values — this trips people up:

| Where | Read by |
|---|---|
| `.env.local` | `npm run dev` |
| `.dev.vars` | `npm run preview` (Cloudflare local runtime) |
| Cloudflare dashboard → Workers → Settings → Variables and Secrets | production |

```
XENDIT_SECRET_KEY           Xendit → Settings → Developers → API Keys
XENDIT_CALLBACK_TOKEN       Xendit → Settings → Developers → Webhooks
SUPABASE_SERVICE_ROLE_KEY   Supabase → Project Settings → API (server-only)
NEXT_PUBLIC_SITE_URL        https://your-domain — builds the redirect URLs
```

Register the webhook in Xendit at `https://<your-domain>/api/webhooks/xendit` for the
**Invoices paid** event.

## Asset slots

Sections render `AssetSlot` placeholders where the client still owes a file (JB at the
dealership, the ₱100M ad-spend dashboard, module demos). Pass an `image` prop to fill one —
the layout is already reserved, so nothing moves. `testimonials` in `copy.ts` is an empty
array on purpose; adding entries replaces the labelled slots. Never invent quotes or receipts.
