---
timestamp: 2026-10-31T10:58:27Z
author: Matthew
---

> Stand vom 28.10. gesichert unter `~/.claude/backups/session-handoff-2026-10-29-2242.md`.
> Vorheriger Handoff (2026-10-21) gesichert unter `~/.claude/backups/session-handoff-2026-10-28-1026.md`.

## Was wurde gemacht
- 28.10.: `git pull`, war bereits aktuell (`be98af3`), danach Dev-Server gestartet (`astro dev`, http://localhost:4321)
- Nachgetragen aus Commits vom 21.10. nach dem letzten Handoff:
  - Impressum + Datenschutzerklärung angelegt und verlinkt (Footer + Formulare)
  - Danke-Seite + Weiterleitung nach Formular-Absenden
  - Mobile-Menü, neuer Active State, Nav-Blur, kein Springen auf der Kontaktseite
  - Kundenportal-Link → `portal.immovent-hv.de/app/login`
  - Kennzahl vereinheitlicht: „150+ betreute Einheiten“ (Start + Über uns)

- 28.10.: Design V3 (`~/Downloads/Immovent Website Redesign 2.html`) komplett übernommen, **nicht committed** (auf `main`, wie vom User gewünscht)
  - 9 Seiten neu aus V3 konvertiert, neue `global.css` (Vereinigung der V3-Styles), Nav/Footer/Base neu, `ContactForm.astro`, neue Seite `/angebot` (Funnel mit Vanilla-JS)
  - FAQ als `<details>`, WEG-Tabs mit Skript, 4 neue Fotos in `src/assets/`
  - Alte Komponenten (Faq, SectionHead, CtaBanner, Check, Arrow, Roof) + Geist-Mono-Font gelöscht
  - Fix ggü. Design: Menü-Button war auch auf Desktop sichtbar (`.btn` überschrieb `.menu-btn`) → `.btn.menu-btn`
  - Bewusst lokal behalten: SEO-Titel/Descriptions, Portal-Link `/app/login`, Danke-Seite-Weiterleitung

- 28.10.: Cookie-Banner mit Consent Mode v2 (Basic): `ConsentMode.astro` (Head, Defaults + GTM-Loader), `CookieBanner.astro`, Footer-Link „Cookie-Einstellungen“, Speicherung in localStorage (12 Monate), Neuladen bei Änderung nach GTM-Start

- 29.10.: Startseite erneut pixelgenau mit V3 abgeglichen (identische Abschnittshöhen, nur gewollte Abweichungen: Menü-Button-Fix, Footer-Link Cookie-Einstellungen)
- 29.10.: Alles committed und auf `main` gepusht: `5b05ef3` „Redesign V3 umgesetzt + Cookie-Banner mit Consent Mode v2“
- 29.10.: Consent Mode: `personalization_storage` default `granted`; Update setzt `functionality_storage`, `personalization_storage`, `security_storage` immer auf `granted` (`ConsentMode.astro`), per Playwright geprüft, gepusht
- 29.10.: Formulare (Kontakt auf Start + /kontakt, Funnel /angebot) an Google Sheet „Lead Liste - Immovent-hv“ (ID `18f1GsUzbaUKNaa1QsdQ9Uc9-NH5L45HCF_Kf22zIw1w`, Tab `Sheet1`) angebunden: `src/scripts/lead.ts` (sendLead + trackLanding), `apps-script/Code.gs` (doPost → appendRow), `site.formEndpoint` = Web-App-URL (`…AKfycbzaTBUL…j4BUeN/exec`; Version 6 live getestet: Zähler 1/2 + URL in P korrekt). Payloads per Playwright mit abgefangenem Endpoint geprüft, **nicht committed**
- 30./31.10.: Funnel `/angebot` leitet nach Absenden auf `/danke-seite` (Inline-Danke-Schritt entfernt) und hat jetzt 5 Schritte (Zeitpunkt und Standort getrennt, Standort mit „Weiter“/Enter)
- 30./31.10.: `.head` ohne max-width (volle `.wrap`-Breite, alle Seiten); Hero Über uns + Leistungen volle Breite, H1 dort `clamp(40px, 4.4vw, 52px)` (User: „gefällt mir besser“); global `h1,h2{text-wrap:balance}`, `p{text-wrap:pretty}`
- 31.10.: `@astrojs/sitemap` (ohne `/danke-seite`) + `public/robots.txt`; SEO-Übersicht als Google Sheet „SEO-Sitemap – Immovent-hv“ (ID `1AAXgIigE7yHNrKwXcisWqrkRvlMTCs9C09C0P0Nyr50`, Drive scale.my.business.online)
- 31.10.: Fotos als AVIF (`<Picture formats={['avif','webp']}>`, ~50 % kleiner; `picture{display:contents}` + `picture>source{display:none}`, Layout alt/neu identisch geprüft)
- 31.10.: Telefon-Links `white-space:nowrap`; FAQ-Hinweis Startseite mit `<br>` auf 2 Zeilen
- 31.10.: Datenschutz: Wix-Absatz + Prüfbox entfernt (`.pruef`-CSS gelöscht), Abschnitt 2 enthält nur noch Logfiles
- 31.10.: Push `d266e3c` (Sheet-Anbindung, Funnel, AVIF, Sitemap, Layout, Datenschutz ohne Wix)
- 31.10. danach (uncommitted): leerer `.todo`-Marker bei „9. Meta Pixel“ + `.todo`-CSS entfernt; alte Wix-SEO-Titel/-Beschreibungen für `/`, `/leistungen`, `/ueber-uns`, `/kontakt` übernommen (User-Wunsch)
- 31.10.: Live-Wix-Seite ausgewertet → Google Sheet „SEO-Sitemap Live-Seite (Wix) – Immovent-hv“ (ID `1DHLDbfqbFgITnCb7CiCfeppzd2H-8eiW2VUA-NTkoGc`), User kopiert es als 2. Reiter in die SEO-Sitemap

## Aktueller Status
- Dev-Server läuft im Hintergrund (Astro 7 daemonisiert): `astro dev stop` / `astro dev status` / `astro dev logs`
- Build ok (10 Seiten); Texte 1:1 mit V3 abgeglichen; Funnel, Kontaktformular, Tabs, FAQ, Mobile-Menü per Playwright getestet, keine Konsolenfehler
- `main` = `origin/main` (`5b05ef3`), Working Tree: Sheet-Anbindung uncommitted (lead.ts, Code.gs, Base, angebot, site.ts, Handoff)
- Deploy/Staging: ✅ 30.10. geprüft, keiner vorhanden (GitHub: keine Deployments, Webhooks, Commit-Status). User fragte nach Staging-Server → Optionen angeboten: lokal `astro preview` oder Vercel-Projekt (Account offen)

## Nächste Schritte
- [x] Script „neueste oben“ (Version 7) live getestet 30.10. 01:05: neueste Zeile 2, Zähler steigt (4, 5), URL in P
- [ ] Alle Testzeilen im Sheet löschen lassen (User)
- [x] Push `d266e3c`
- [x] Todo-Marker + alte SEO-Texte gepusht
- [ ] **Entscheidung User:** URLs ohne Schrägstrich (`trailingSlash: 'never'`, `build.format: 'file'`), damit identisch mit Wix (Wix leitet `/kontakt/` → `/kontakt` per 301); einzige Weiterleitung dann `/home` → `/` (Wix liefert `/home` mit 200), Ort hängt vom Hosting ab
- [ ] GSC-Zugriff klären: weitere alte Wix-URLs (z. B. `/copy-of-…`) prüfen
- [ ] SEO-Sitemap-Sheet Reiter 1: Titel/Beschreibung der 4 Seiten mit alten Texten nachziehen (Datei nicht überschreiben, enthält User-Reiter 2)
- [ ] Live-Impressum: Platzhalter [Steuernummer]/[Umsatzsteuer-ID] sichtbar → Kunde informieren
- [ ] Optional (User gefragt): 320px-Overflow (breite Buttons, Tabelle /leistungen) beheben
- [ ] Optional (User fragen): zu lange Titel (WEG 67, Miet 62) und Beschreibungen (Leistungen 169, Über uns 171) kürzen
- Hinweis: Beim Einfügen in den Apps-Script-Editor gingen mehrfach Textteile verloren (Autocomplete/Terminal-Umbruch). Code per `pbcopy` geben, kurze Zeilen; Fehler per curl-POST + Error-Text in Antwort-HTML diagnostizieren
- [ ] Optional: Honeypot gegen Spam (Endpoint ist öffentlich)
- [ ] Datenschutz ergänzen: Formulardaten in Google Sheets; gclid/UTM werden ohne Consent in sessionStorage gehalten (User-Entscheidung)
- [x] Consent-Änderung committen + pushen
- [ ] Nach „Alle akzeptieren“ geht jetzt `ad.doubleclick.net/ccm/s/collect` raus: GTM-Container prüfen, welcher Tag das ist (am 28.10. war er leer)
- [ ] GTM-Container `GTM-N2XXWC92` ist leer → Tags anlegen (GA4, ggf. Ads/Meta mit Consent-Prüfung), dann Ablehnen/Akzeptieren erneut mit Netzwerk-Mitschnitt prüfen
- [x] V3-Umbau committen + pushen (`5b05ef3`)
- [ ] Prüfen, ob `main` automatisch deployt wird (Vercel/anderer Host), sonst Deploy aufsetzen
- [ ] Datenschutz Abschnitt 2: Hoster (Name, Anschrift, AV-Vertrag) ergänzen + Logfile-Dauer „7 Tage“ (stammt aus Wix-Text) an Hoster anpassen, sobald Hosting feststeht; GA/Ads/GTM/Meta/Maps/Consent-Abschnitte mit Kunde klären; Google Sheets (Formulardaten) + gclid/UTM in sessionStorage ergänzen
- [ ] `/angebot`: noindex? Verlinkung? (im Design nirgends verlinkt)
- [ ] Vercel-Projekt aus dem GitHub-Repo anlegen (Auto-Deploy `main`, Preview pro Branch)
- [ ] Platzhalter füllen: Teamfotos, Funktion Leon Rauh, Team-Kurztexte (`ueber-uns.astro`), FAQ-Mindestgrößen (`weg-verwaltung.astro`, `mietverwaltung.astro`)
- [ ] OG-Image ergänzen

## Blocker / Entscheidungen
- Ziel-Domain ungeprüft: `site` in `astro.config.mjs` = `https://www.immovent-hv.de`
- Formular-Dienst: entschieden, Google Apps Script → Lead-Liste

## Kontext
- Repo ist privat im Account `scalemybusinessonline-cpu`, nicht in der Greenblut-GmbH-Org. Mit `mhuehnlein` kommt „Repository not found“. Für Pull/Push kurz `gh auth switch --user scalemybusinessonline-cpu`, danach zurück auf `mhuehnlein`
- Sheet-Mapping: Form ID = fortlaufende Nummer (Script, neueste in Zeile 2, +1), P = Seiten-URL ohne Query, Datum (Script), Status + D leer, Name = Vor+Nachname, Funnel-Zeitpunkt → Nachricht, Quelle = utm_source > „Google Ads“ (gclid) > Referrer-Domain > „Direkt“. Werte mit Apostroph als Text (sonst +49 → Formel, führende 0 weg). no-cors: Script-Fehler sind im Browser nicht erkennbar
