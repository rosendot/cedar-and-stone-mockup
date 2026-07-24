# Cedar & Stone Landscape Co. — concept mockup

A five-page Astro site for **Cedar & Stone Landscape Co.**, a fictional
landscaping company in Bend, Oregon. Built by Atlas Studio as a portfolio piece
— this is a **concept build, not a client site**. No such business exists; the
address, phone, and testimonials are invented.

The site footer says so on every page, and links back to atlasstudio.dev.

> **No license numbers.** The design source carried an invented Oregon CCB
> number in the footer and again in a Services FAQ answer. Both were removed —
> an invented contractor license is checkable against a public state registry.
> The copy names the regulator and offers to send the number on request
> instead. Re-check with:
> `grep -rioE "ccb|licen[sc]e #|#[0-9]{5,}" --include=*.html dist/`

Ported from the Atlas Studio design system in Claude Design (project
`5b78c5e0-3edd-4692-abc2-b097220f4fd1`) and rebuilt as a real deployable Astro
project.

## Stack

- **Astro 5**, static output — no server routes, no framework islands
- Plain CSS: [`src/styles/tokens.css`](src/styles/tokens.css) (Atlas design
  tokens) + [`src/styles/cedar.css`](src/styles/cedar.css) (the fresh-garden
  brand theme). Everything else reads `var(--token)`.
- Vanilla `<script>` blocks for the four interactive bits
- Deploys to Cloudflare Pages

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # serve the built output
npm run deploy    # wrangler pages deploy dist
```

## Deploying

Cloudflare Pages. Connect this repo in the dashboard (**Workers & Pages** →
**Create** → **Pages** → **Connect to Git**) with framework preset **Astro**,
build command `npm run build`, output directory `dist` — then pushes to `main`
auto-deploy.

For a one-off CLI deploy instead: `wrangler login`, then `npm run deploy`.

## Pages

| Route | Sections |
|-------|----------|
| `/` | Hero · pillars · 6 service cards · before/after · masonry gallery · process · testimonials · map + contact · CTA |
| `/services/` | Page hero · 6 alternating feature rows · process · FAQ accordion · CTA |
| `/portfolio/` | Page hero · 12-thumb lightbox gallery · before/after · testimonial slider · CTA |
| `/about/` | Page hero · 3 story rows · animated stat counters · testimonials · CTA |
| `/contact/` | Page hero · map + details · estimate form · FAQ cards · CTA |

## Images

The Claude Design source used `<image-slot>` — a drag-and-drop authoring
element backed by a sidecar file and the `window.omelette` bridge. That runtime
doesn't exist outside the design canvas, so every slot was replaced with
[`ImageSlot.astro`](src/components/ImageSlot.astro): a plain div rendering a
textured placeholder captioned with the photo that belongs there.

There are **40 slots** across the five pages. To drop in a real photo, pass
`src` (and `alt`):

```astro
<ImageSlot src="/photos/patio.jpg" alt="Flagstone patio at dusk" ratio="3/2" />
```

The placeholder styling falls away automatically once `src` is set. Put files
in `public/` and reference them by absolute path.

## Interactive pieces

All vanilla JS, no dependencies:

- **Header** — solid on scroll, hamburger drawer under 720px
  ([`Header.astro`](src/components/Header.astro))
- **Before/after slider** — drag or touch to wipe
  ([`BeforeAfter.astro`](src/components/BeforeAfter.astro))
- **Lightbox** — click a thumbnail, arrow keys and Escape work
  ([`portfolio.astro`](src/pages/portfolio.astro))
- **Testimonial slider** — auto-advances every 6.5s, dots and arrows
  ([`portfolio.astro`](src/pages/portfolio.astro))
- **Stat counters** — count up once on scroll into view; skipped entirely under
  `prefers-reduced-motion` ([`about.astro`](src/pages/about.astro))

The estimate form on `/contact/` is **demo only** — it validates the three
required fields and confirms in place. It posts nowhere; there's no backend.

## Notes

- Content lives in frontmatter arrays at the top of each page, so copy edits
  don't mean touching markup.
- Testimonials are shared across three pages via
  [`src/data/testimonials.ts`](src/data/testimonials.ts).
- Fonts are Playfair Display + Lato, loaded from Google Fonts by an `@import`
  in `cedar.css`.
- The service-area "map" on `/` and `/contact/` is drawn in CSS — no Maps
  embed, no API key.
