// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import faqSchema from './integrations/faq-schema.mjs';

export default defineConfig({
  // Ohne www: der Hoster leitet www.immovent-hv.de auf immovent-hv.de weiter
  site: 'https://immovent-hv.de',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [
    // Danke-Seite ist noindex und gehört nicht in die Sitemap
    sitemap({ filter: (page) => !page.includes('/danke-seite') }),
    // FAQPage-JSON-LD aus den <details class="faq"> jeder Seite erzeugen
    faqSchema(),
  ],
});
