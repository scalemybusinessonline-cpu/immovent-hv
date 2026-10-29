# Immovent Hausverwaltung – Website (Astro)

## Kontakt (aus Design)
- Immovent Hausverwaltung GmbH, Schützenstr. 21, 96047 Bamberg
- 0151 74530871 · info@immovent-hv.de · Kundenportal: https://portal.immovent-hv.de/app/login

## Projekt
Statische Astro-Site (Astro 7). Aktueller Design-Stand: `~/Downloads/Immovent Website Redesign 2.html` („Blau V3 Texte überarbeitet", 9 Seiten, Umbau am 28.10.2026). Vorher: `Immovent Website Redesign (1).html`.

## Status
- [x] 6 Seiten: `/`, `/leistungen`, `/weg-verwaltung`, `/mietverwaltung`, `/ueber-uns`, `/kontakt`
- [x] V3-Design übernommen (28.10.): neue Styles, Texte, Städte-Laufband, Landingpage `/angebot` (4-Schritt-Funnel, nicht in Navigation verlinkt)
- [ ] Datenschutz (V3-Text): Hosting nennt noch Wix → markiert, an echten Hoster anpassen; Abschnitte GA, Google Ads/GTM, Meta Pixel, Maps, Cookie-Consent beschreiben Tools, die die Site nicht einbindet → mit Kunde klären
- [x] Cookie-Banner + Consent Mode v2 (Basic, eigenes Banner, GTM `GTM-N2XXWC92` lädt erst nach Einwilligung), im Browser mit Netzwerk-Mitschnitt geprüft (28.10.)
- [ ] GTM-Container ist leer (Version 1, keine Tags): GA4/Ads/Meta anlegen, Meta-Tag an `ad_storage` koppeln, danach erneut im Browser prüfen
- [ ] `/angebot`: indexieren oder `noindex` (Ads-Landingpage)?
- [x] Fonts self-hosted (Belleza, Geist, Geist Mono – Latin), Logos → WebP via astro:assets
- [x] CSS inline, kein JS außer Tabs auf `/weg-verwaltung`; FAQ = native `<details>`
- [ ] Formular-Backend (aktuell `method="post"` ohne `action`)
- [x] Impressum + Datenschutz angelegt
- [ ] Platzhalter füllen: Teamfotos, Leon Rauh Funktion, Team-Kurztexte, FAQ-Mindestgrößen (WEG + Miet)
- [x] Kennzahl vereinheitlicht: 150+ betreute Einheiten (Entscheidung Matthew, 21.10.2026)
- [ ] Hosting/Deploy, OG-Image, Sitemap

## Dateien
- `src/pages/*` – Seiten · `src/components/*` – Nav, Footer, ContactForm
- `src/styles/global.css` – Design-Tokens & alle Styles · `src/data/site.ts` – Kontaktdaten & Navigation

## Repo
https://github.com/scalemybusinessonline-cpu/immovent-hv (privat, Branch `main`)

## Befehle
`npm run dev` · `npm run build` · `npm run preview`
