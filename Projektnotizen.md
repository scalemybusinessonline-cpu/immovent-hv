# Immovent Hausverwaltung – Website (Astro)

## Kontakt (aus Design)
- Immovent Hausverwaltung GmbH, Schützenstr. 21, 96047 Bamberg
- 0151 74530871 · info@immovent-hv.de · Kundenportal: https://www.immovent-hv.de

## Projekt
Statische Astro-Site (Astro 7), umgesetzt aus Claude-Design-Export `~/Downloads/project - immovent-hv/Immovent Website Redesign (1).html` (Variante „Blau", 6 Seiten).

## Status
- [x] 6 Seiten: `/`, `/leistungen`, `/weg-verwaltung`, `/mietverwaltung`, `/ueber-uns`, `/kontakt`
- [x] Fonts self-hosted (Belleza, Geist, Geist Mono – Latin), Logos → WebP via astro:assets
- [x] CSS inline, kein JS außer Tabs auf `/weg-verwaltung`; FAQ = native `<details>`
- [ ] Formular-Backend (aktuell `method="post"` ohne `action`)
- [ ] Impressum + Datenschutz (Links stehen auf `#`)
- [ ] Platzhalter füllen: Teamfotos, Leon Rauh Funktion, Team-Kurztexte, FAQ-Mindestgrößen (WEG + Miet)
- [x] Kennzahl vereinheitlicht: 150+ betreute Einheiten (Entscheidung Matthew, 21.10.2026)
- [ ] Hosting/Deploy, OG-Image, Sitemap

## Dateien
- `src/pages/*` – Seiten · `src/components/*` – Nav, Footer, Faq, CtaBanner, SectionHead, Check, Arrow, Roof
- `src/styles/global.css` – Design-Tokens & alle Styles · `src/data/site.ts` – Kontaktdaten & Navigation

## Repo
https://github.com/scalemybusinessonline-cpu/immovent-hv (privat, Branch `main`)

## Befehle
`npm run dev` · `npm run build` · `npm run preview`
