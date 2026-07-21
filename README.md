# Kingsway International — Website

The production website for **Kingsway International**, a UK-based ethnic food
trading and distribution company preparing to launch.

A statically-generated Astro site built to the spec in
[`Kingsway_International_Website_Build_Prompt_3.docx`](./Kingsway_International_Website_Build_Prompt_3.docx),
using page copy lifted verbatim from the Website Copy document.

---

## Tech stack

| Layer          | Choice                                                        |
|----------------|---------------------------------------------------------------|
| Framework      | [Astro 4.x](https://astro.build) (static output, TypeScript strict) |
| Styling        | [Tailwind CSS 3.x](https://tailwindcss.com) with a custom brand theme (no UI libraries) |
| Typography     | [Fraunces](https://fonts.google.com/specimen/Fraunces) (display serif) + [Manrope](https://fonts.google.com/specimen/Manrope) (body sans), self-hosted via `@fontsource-variable/*` |
| Content        | Markdown in `src/content/stories/`, typed with a Zod schema (Astro content collections) |
| Forms          | [Formspree](https://formspree.io) (contact + newsletter) via `PUBLIC_*` env vars |
| Analytics      | [Plausible](https://plausible.io) (optional, off by default) |
| Build output   | Static HTML + hashed assets, ~820 KB total (18 indexable pages) |
| Package manager| [pnpm](https://pnpm.io) 8+                                    |

---

## Prerequisites

- **Node.js** 20 LTS or newer
- **pnpm** 8+ (`npm install -g pnpm`)
- A terminal and a web browser

---

## Local development

```sh
pnpm install
pnpm dev        # starts dev server at http://localhost:4321/
```

Other commands:

```sh
pnpm build      # produces a production build in dist/
pnpm preview    # preview the built dist/ locally
pnpm astro check   # TypeScript + Astro diagnostics
```

The dev server hot-reloads on file changes, including content collections.

---

## Environment variables

Copy `.env.example` to `.env` and fill in real values. All are prefixed with
`PUBLIC_` because Astro requires that prefix for values exposed to client-side
code.

| Variable                         | Required? | Used by                    |
|----------------------------------|-----------|----------------------------|
| `PUBLIC_FORMSPREE_CONTACT`       | Yes (for forms) | `/contact`, `/contact/become-a-supplier` |
| `PUBLIC_FORMSPREE_NEWSLETTER`    | Yes (for newsletter) | `/food-stories` newsletter panel |
| `PUBLIC_PLAUSIBLE_DOMAIN`        | Optional  | `BaseLayout` → Plausible script only renders when set |

`.env` is gitignored. Host platforms (Vercel / Netlify / Cloudflare Pages) expose
their own UI for injecting these at build time.

---

## Folder structure

```
.
├── astro.config.mjs           Astro config — site URL, sitemap filter, tailwind integration
├── tailwind.config.mjs        Brand palette + typography theme
├── public/                    Copied verbatim into dist/
│   ├── favicon.ico / favicon.svg
│   ├── og-default.svg         Social-share image (replace with branded PNG pre-launch)
│   ├── robots.txt
│   ├── _headers               Netlify / CF Pages caching + security headers
│   └── _redirects             Defensive route aliases
├── vercel.json                Vercel equivalent of the above
└── src/
    ├── layouts/
    │   ├── BaseLayout.astro   Every page's HTML shell + SEO meta + header/footer
    │   └── LegalLayout.astro  760px prose container for legal stubs
    ├── components/
    │   ├── SiteHeader.astro / SiteFooter.astro
    │   ├── Plausible.astro
    │   ├── ui/                Button, Eyebrow, SectionTitle, Lede, Callout, ImagePlaceholder, CTABanner
    │   ├── sections/          Hero, HeroHome, FeatureCard, ChannelCard
    │   └── schema/            OrganizationSchema, LocalBusinessSchema, BlogPostingSchema (JSON-LD)
    ├── content/
    │   ├── config.ts          Zod schema for the 'stories' collection
    │   └── stories/           One Markdown file per Food Story
    ├── pages/                 One file per route (file-based routing)
    ├── lib/                   Shared types
    ├── assets/                Static assets imported by components
    └── styles/global.css      Brand CSS variables + reset + a11y utilities
```

---

## Content editing

### Add a new Food Story

1. Create `src/content/stories/<slug>.md`.
2. Use this frontmatter (the schema is enforced by `src/content/config.ts`):

   ```yaml
   ---
   title: "Your story title"
   excerpt: "One sentence that appears on the landing-page card and as meta description."
   category: "Recipe"            # "Recipe" | "Origin story" | "Cooking tip"
   readTime: "5 min read"
   date: 2026-05-01              # YYYY-MM-DD
   draft: false                   # Set true to hide while in progress
   ---
   ```

3. Write the body in Markdown below the frontmatter. Standard formatting
   (`##` headings, lists, `> blockquote`, `**bold**`, `[links](url)`) all
   render through the prose styles defined in `src/pages/food-stories/[...slug].astro`.
4. Save the file. The dev server hot-reloads; the story appears at
   `/food-stories/<slug>` and in the landing-page latest grid.

### Add a new policy

Policies are currently hard-coded in `src/pages/policies.astro` so the sort
order and "Download PDF" tile layout stay fully controlled by the designer.
To add one:

1. Open [`src/pages/policies.astro`](./src/pages/policies.astro).
2. Add an entry to the `policies` array with `number` (`"08"` etc.), `title`,
   `summary`, and `href` (point at a real PDF when published, or `"#"` while
   pending).
3. Drop the PDF into `public/policies/` if hosting it alongside the site.

When policies become more than ~10 entries or want per-policy pages, migrate
to a second content collection mirroring `stories`.

---

## Deployment

The site is a pure static build. Any static host works. Config files for the
three most common choices are in the repo — **pick one, delete the others if
you like**.

### Cloudflare Pages (recommended for MVP)

1. Push this repo to GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create application** →
   **Pages** → **Connect to Git**.
3. Build settings:
   - **Framework preset**: Astro
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
4. Environment variables: add `PUBLIC_FORMSPREE_CONTACT` and
   `PUBLIC_FORMSPREE_NEWSLETTER` (optionally `PUBLIC_PLAUSIBLE_DOMAIN`).
5. Deploy. `public/_headers` and `public/_redirects` are picked up automatically.

### Netlify

1. Netlify Dashboard → **Add new site** → **Import an existing project** →
   pick the repo.
2. Build settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist`
3. Environment variables: same as Cloudflare above.
4. Deploy. `public/_headers` and `public/_redirects` are picked up automatically.

### Vercel

1. Vercel Dashboard → **Add New** → **Project** → pick the repo.
2. Framework preset: **Astro** (auto-detected).
3. `vercel.json` at the repo root defines build command, redirects, headers —
   no manual config needed.
4. Environment variables: same as above.
5. Deploy.

---

## Pre-launch checklist

Every bracketed placeholder in the repo needs to be resolved before going live.
The current set:

- [ ] **Formspree endpoints** — replace the placeholder IDs in the host's env
      vars with real project IDs from [formspree.io](https://formspree.io).
      Test both the contact form and the newsletter form end-to-end.
- [ ] **OG social image** — `public/og-default.svg` is a temporary placeholder.
      Replace with a branded **1200×630 PNG or JPG** and update the default in
      [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro) if the
      filename changes. Preview with
      [opengraph.dev](https://opengraph.dev) or similar.
- [ ] **Registered office address** — populate in
      [`src/components/SiteFooter.astro`](./src/components/SiteFooter.astro),
      [`src/pages/contact.astro`](./src/pages/contact.astro),
      and `LocalBusinessSchema.astro`.
- [ ] **Companies House number** — footer.
- [ ] **Phone number** — footer + contact page + LocalBusinessSchema.
- [ ] **Leadership bios** — 5 placeholders in
      [`src/pages/about/leadership.astro`](./src/pages/about/leadership.astro).
      **Decide:** ship with placeholder `[Name]` entries, or remove
      `/about/leadership` from the header/footer nav and delete the page until
      real bios land.
- [ ] **Leadership portraits** — 5 square image placeholders; swap for real
      photography once supplied.
- [ ] **Policy PDFs** — all 7 `href="#"` links in
      [`src/pages/policies.astro`](./src/pages/policies.astro) need real PDFs.
      Host them under `public/policies/` or an external CDN.
- [ ] **Legal stub pages** — `/privacy-notice`, `/terms-of-use`, `/cookie-policy`,
      `/modern-slavery-statement` currently ship as `[DRAFT]` stubs. **Decide:**
      keep the stubs live with the draft banner, or delete those routes from
      the build until the real documents are drafted (also remove the links
      from the footer if you delete).
- [ ] **Recipe schema** — `BlogPostingSchema` is attached to every Food Story.
      `RecipeSchema` (ingredients + instructions) is intentionally **not**
      attached yet because the three sample recipes are still bracketed
      placeholders. When the real recipe body lands, add a Recipe JSON-LD
      component following Google's [Recipe schema spec](https://developers.google.com/search/docs/appearance/structured-data/recipe).
- [ ] **Whistleblowing mailbox** — placeholder address `[whistleblowing@kingswayinternational.co.uk]`
      on [`src/pages/policies.astro`](./src/pages/policies.astro). Confirm the
      actual route before removing the brackets.
- [ ] **Plausible analytics** — decide whether to enable at launch. If yes, set
      `PUBLIC_PLAUSIBLE_DOMAIN=kingswayinternational.co.uk` in the host env.
- [ ] **Delete the dev showcase** — [`src/pages/dev/components.astro`](./src/pages/dev/components.astro)
      is already excluded from the sitemap and disallowed in `robots.txt`,
      but consider deleting it entirely before first public deploy.

---

## Post-deploy smoke test

Walk through this on the staging URL (and again on production) before
announcing the site:

1. **Homepage** — visit `/`, confirm hero, 3 features, dark callout, 4 channels,
   3 Food Story cards, trade-enquiry banner all render without console errors.
2. **Nav** — click every header nav link. Each resolves to the right page and
   the active state (accent underline) updates.
3. **Mobile drawer** — narrow browser to 375px, tap the hamburger, confirm
   the drawer opens, links navigate and close the drawer, Escape key closes it.
4. **Contact form** — submit the form with real values. Confirm:
   - "Sending…" state appears
   - Formspree receives it (check your Formspree dashboard)
   - The success panel replaces the form
   - With an empty required field, HTML validation blocks submission
5. **Deep-link subject** — visit `/contact?subject=listing` and confirm the
   dropdown has "Trade enquiry — wholesale / cash & carry" pre-selected.
   Test `?subject=sample` and `?subject=privatelabel` too.
6. **Supplier form** — submit `/contact/become-a-supplier` end-to-end.
7. **Food Stories** — visit `/food-stories`, confirm 3 cards. Click through to
   each sample story. "Older / Newer" pagination works at the bottom.
8. **Newsletter** — submit the `/food-stories` newsletter form with a test
   email; confirm Formspree receives it.
9. **Policies** — visit `/policies`, confirm 7 numbered rows. (Download links
   go to `#` until PDFs are supplied.)
10. **404** — visit `/obviously-missing`, confirm the themed 404 page renders
    with all four helpful links.
11. **Legal stubs** — visit `/privacy-notice` (and the other three); confirm
    breadcrumb, `[DRAFT]` banner, stub paragraph, and back-to-policies link.
12. **Holding page** — visit `/holding`, confirm no site chrome (no header /
    footer) and the email link works.
13. **OG preview** — paste the homepage URL into
    [opengraph.dev](https://opengraph.dev) (or Facebook / LinkedIn debuggers)
    and confirm the preview card renders. If the SVG OG image doesn't render
    on a platform, that's the cue to replace `og-default.svg` with a PNG.
14. **Sitemap** — visit `/sitemap-index.xml`, confirm it lists only public
    pages (no `/dev/`, `/holding`, or `/404`).
15. **Lighthouse mobile audit** — run against `/`, `/about`, `/quality`,
    `/products`, `/who-we-serve`, `/food-stories`, `/policies`, `/contact`.
    Target: 90+ across Performance, Accessibility, Best Practices, SEO.

---

## Known limitations (by design for MVP)

- **No CMS** — content changes require editing Markdown and pushing a rebuild.
  A Phase-2 integration (Sanity, Decap, Contentful) is a separate project.
- **No search** — Food Stories category filtering is by URL only; no full-text
  search on MVP.
- **Formspree free-tier limits** — 50 submissions/month. Upgrade before any
  marketing activity.
- **Static only** — no dynamic product catalogue, no inventory, no account areas.

---

## Notes for future maintainers

- The Website Build spec is authoritative for scope. When the copy says one
  thing and a CSS preference says another, the copy wins — it's reviewed.
- Image placeholders use a hatched diagonal pattern deliberately; they are
  **not** plain grey boxes. This is to make it obvious at a glance where real
  photography is still pending.
- UK English throughout (`organise`, `favour`, `recognise`). Smart quotes (`'`
  and `"`). Em-dashes without surrounding spaces in voice-setting callouts,
  with spaces in standard body copy — both are correct, don't auto-reformat.
- Pre-launch brand voice bans certain words: _revolutionary_, _disruptive_,
  _best-in-class_, _cutting-edge_, _premium_, _world-class_, _unique_.
  Prefer: _authentic_, _sourced_, _trusted_, _traceable_, _partnership_,
  _honest_, _consistent_.

---

© Kingsway International — repository and site content.
