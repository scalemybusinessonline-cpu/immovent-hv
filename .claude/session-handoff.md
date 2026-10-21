---
timestamp: 2026-10-21T13:49:57Z
author: Matthew
---

## Was wurde gemacht
- Claude-Design-Export (`~/Downloads/project - immovent-hv/Immovent Website Redesign (1).html`, Variante „Blau") entpackt und als Astro-7-Site umgesetzt
- 6 Seiten: `/`, `/leistungen`, `/weg-verwaltung`, `/mietverwaltung`, `/ueber-uns`, `/kontakt`
- Fonts (Belleza, Geist, Geist Mono) self-hosted, Logos → WebP, CSS inline, FAQ als `<details>`, Kontakt-Segment als Radios
- Bugfix: WEG-Tab-Panels waren alle sichtbar → `[hidden]{display:none!important}`
- Repo initialisiert und nach https://github.com/scalemybusinessonline-cpu/immovent-hv (privat, `main`) gepusht

## Aktueller Status
- `npm run build` läuft fehlerfrei, ~8 KB gzip pro Seite, kein JS außer Tabs auf WEG
- Screenshots Desktop 1440 + Mobil 390 geprüft: keine Konsolenfehler, kein horizontales Scrollen
- Kein Deploy vorhanden

## Nächste Schritte
- [ ] Vercel-Projekt aus dem GitHub-Repo anlegen (Auto-Deploy `main`, Preview pro Branch)
- [ ] Formular-Backend wählen und anbinden (Formulare in `index.astro` + `kontakt.astro`, aktuell `method="post"` ohne `action`)
- [ ] Impressum- und Datenschutz-Seiten anlegen (Links in `Footer.astro` + Formularen stehen auf `#`)
- [ ] Platzhalter füllen: Teamfotos, Funktion Leon Rauh, Team-Kurztexte (`ueber-uns.astro`), FAQ-Mindestgrößen (`weg-verwaltung.astro`, `mietverwaltung.astro`)
- [ ] OG-Image + Sitemap ergänzen

## Blocker / Entscheidungen
- Objektzahl widersprüchlich im Design: Start „150+" vs. Über uns „30+" → Kunde klären
- Ziel-Domain ungeprüft: `site` in `astro.config.mjs` = `https://www.immovent-hv.de` (abgeleitet vom Kundenportal-Link)
- Formular-Dienst offen (Netlify Forms / Formspree / eigener Endpoint)

## Kontext
- Repo liegt im Account `scalemybusinessonline-cpu`, nicht in der Greenblut-GmbH-Org (vom User so vorgegeben)
- Design-Quelle ist ein verschachtelter Claude-Design-Bundle (gzip+base64); entpackte Seiten lagen nur im Session-Scratchpad
