import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Routes excluded from the sitemap. The dev showcase and pre-launch holding
// page should not be indexed; the 404 page is rendered as a fallback only.
const sitemapExclude = [
  /\/dev(\/|$)/,
  /\/holding\/?$/,
  /\/404\/?$/,
];

export default defineConfig({
  site: 'https://www.kingswayinternational.co.uk',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !sitemapExclude.some((rx) => rx.test(new URL(page).pathname)),
    }),
  ],
  prefetch: {
    defaultStrategy: 'viewport',
  },
});
