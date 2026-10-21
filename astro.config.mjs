// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.immovent-hv.de',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
