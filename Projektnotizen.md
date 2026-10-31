# Immovent Hausverwaltung – Website (Astro)

## Kontakt (aus Design)
- Immovent Hausverwaltung GmbH, Schützenstr. 21, 96047 Bamberg
- 0151 74530871 · info@immovent-hv.de · Kundenportal: https://portal.immovent-hv.de/app/login

## Projekt
Statische Astro-Site (Astro 7). Aktueller Design-Stand: `~/Downloads/Immovent Website Redesign 2.html` („Blau V3 Texte überarbeitet", 9 Seiten, Umbau am 28.10.2026). Vorher: `Immovent Website Redesign (1).html`.

## Status
- [x] 6 Seiten: `/`, `/leistungen`, `/weg-verwaltung`, `/mietverwaltung`, `/ueber-uns`, `/kontakt`
- [x] V3-Design übernommen (28.10.): neue Styles, Texte, Städte-Laufband, Landingpage `/angebot` (Funnel, nicht in Navigation verlinkt; seit 31.10. 5 Schritte, Weiterleitung auf `/danke-seite`)
- [ ] Datenschutz (V3-Text): Wix-Bezug entfernt (31.10.), Hoster (Name, Anschrift, AV-Vertrag) + Logfile-Dauer fehlen noch; Google Sheets (Formulardaten) + gclid/UTM ergänzen; Abschnitte GA, Google Ads/GTM, Meta Pixel, Maps, Cookie-Consent beschreiben Tools, die die Site nicht einbindet → mit Kunde klären
- [x] Cookie-Banner + Consent Mode v2 (Basic, eigenes Banner, GTM `GTM-N2XXWC92` lädt erst nach Einwilligung), im Browser mit Netzwerk-Mitschnitt geprüft (28.10.)
- [ ] GTM: nach „Alle akzeptieren“ geht seit 29.10. `ad.doubleclick.net/ccm` raus → Container prüfen, welcher Tag; Meta-Tag an `ad_storage` koppeln, danach erneut im Browser prüfen
- [x] Consent Mode: `personalization_storage` default granted; Update setzt functionality/personalization/security granted (29.10.)
- [ ] `/angebot`: indexieren oder `noindex` (Ads-Landingpage)?
- [x] Fonts self-hosted (Belleza, Geist, Geist Mono – Latin), Logos → WebP via astro:assets
- [x] CSS inline, kein JS außer Tabs auf `/weg-verwaltung`; FAQ = native `<details>`
- [x] Formular-Backend: Kontaktformular + Funnel → Google Sheet „Lead Liste - Immovent-hv“ via Apps-Script-Web-App (`apps-script/Code.gs`, URL in `site.ts`), neueste Anfrage oben in Zeile 2, Form ID fortlaufend, Spalte P = Seiten-URL; live getestet 30.10.
- [ ] Spam-Schutz für das Formular (Honeypot), Endpoint ist öffentlich
- [x] Impressum + Datenschutz angelegt
- [ ] Platzhalter füllen: Teamfotos, Leon Rauh Funktion, Team-Kurztexte, FAQ-Mindestgrößen (WEG + Miet)
- [x] Kennzahl vereinheitlicht: 150+ betreute Einheiten (Entscheidung Matthew, 21.10.2026)
- [x] Sitemap (`@astrojs/sitemap`, ohne Danke-Seite) + `robots.txt`; SEO-Übersicht als Google Sheet „SEO-Sitemap – Immovent-hv“ (31.10.)
- [x] Fotos als AVIF mit WebP-Fallback (~50 % kleiner, 31.10.)
- [x] Alte Wix-SEO-Titel/-Beschreibungen für `/`, `/leistungen`, `/ueber-uns`, `/kontakt` übernommen (31.10.); SEO-Daten der Live-Seite im Sheet „SEO-Sitemap Live-Seite (Wix)“
- [ ] URLs ohne Schrägstrich (wie Wix) + Weiterleitung `/home` → `/` (Entscheidung offen, abhängig vom Hosting)
- [ ] Live-Impressum (Wix) zeigt Platzhalter [Steuernummer]/[Umsatzsteuer-ID] → Kunde informieren
- [ ] Hosting/Deploy (kein Staging, kein Auto-Deploy auf GitHub, geprüft 30.10.), OG-Image
- [ ] Optional: zu lange Titel (WEG 67, Miet 62 Zeichen) kürzen; 320px-Overflow

## Dateien
- `src/pages/*` – Seiten · `src/components/*` – Nav, Footer, ContactForm, ConsentMode, CookieBanner
- `src/scripts/lead.ts` – Formularversand + Herkunft (gclid/UTM) · `apps-script/Code.gs` – Web-App der Lead-Liste (manuell in Apps Script einfügen + neue Version bereitstellen)
- `src/styles/global.css` – Design-Tokens & alle Styles · `src/data/site.ts` – Kontaktdaten & Navigation

## Repo
https://github.com/scalemybusinessonline-cpu/immovent-hv (privat, Branch `main`)

## Befehle
`npm run dev` · `npm run build` · `npm run preview`
