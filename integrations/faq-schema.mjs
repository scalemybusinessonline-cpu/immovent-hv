// Erzeugt nach dem Build FAQPage-JSON-LD aus den sichtbaren FAQs jeder Seite.
// Quelle sind die <details class="faq"> mit <summary> (Frage) und <p class="ans"> (Antwort),
// so gibt es die FAQ-Texte nur an einer Stelle.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** HTML-Fragment in reinen Text umwandeln */
const toText = (html) =>
  html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => {
      if (e[0] === '#') return String.fromCodePoint(parseInt(e.slice(1).replace(/^x/i, ''), e[1].toLowerCase() === 'x' ? 16 : 10));
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/\s+/g, ' ')
    .trim();

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

export default function faqSchema() {
  return {
    name: 'faq-schema',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        for await (const file of htmlFiles(root)) {
          const html = await readFile(file, 'utf8');
          const items = [...html.matchAll(/<details class="?faq"?[^>]*>([\s\S]*?)<\/details>/g)].map(([, inner]) => ({
            q: toText(inner.match(/<summary[^>]*>([\s\S]*?)<span class="?pm/)?.[1] ?? ''),
            a: toText(inner.match(/<p class="?ans"?[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? ''),
          }));
          const faqs = items.filter((f) => f.q && f.a);
          if (!faqs.length) continue;
          if (faqs.length !== items.length) logger.warn(`${file}: ${items.length - faqs.length} FAQ ohne Frage oder Antwort übersprungen`);

          const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          };
          const tag = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
          await writeFile(file, html.replace('</head>', `${tag}</head>`));
          logger.info(`${file.slice(root.length)}: ${faqs.length} FAQs`);
        }
      },
    },
  };
}
