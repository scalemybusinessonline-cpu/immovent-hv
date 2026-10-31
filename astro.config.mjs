// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.immovent-hv.de',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  // Danke-Seite ist noindex und gehört nicht in die Sitemap
  integrations: [sitemap({ filter: (page) => !page.includes('/danke-seite') })],
});