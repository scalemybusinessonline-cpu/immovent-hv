---
timestamp: 2026-10-28T10:50:43Z
author: Matthew
---

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

## Aktueller Status
- Dev-Server läuft im Hintergrund (Astro 7 daemonisiert): `astro dev stop` / `astro dev status` / `astro dev logs`
- Build ok (10 Seiten); Texte 1:1 mit V3 abgeglichen; Funnel, Kontaktformular, Tabs, FAQ, Mobile-Menü per Playwright getestet, keine Konsolenfehler
- Kein Deploy vorhanden

## Nächste Schritte
- [ ] GTM-Container `GTM-N2XXWC92` ist leer → Tags anlegen (GA4, ggf. Ads/Meta mit Consent-Prüfung), dann Ablehnen/Akzeptieren erneut mit Netzwerk-Mitschnitt prüfen
- [ ] V3-Umbau im Browser abnehmen und committen
- [ ] Datenschutz: Wix-Hosting-Abschnitt ersetzen (markiert); GA/Ads/GTM/Meta-Pixel/Maps/Consent-Abschnitte mit Kunde klären, Site bindet nichts davon ein
- [ ] `/angebot`: noindex? Verlinkung? (im Design nirgends verlinkt)
- [ ] Vercel-Projekt aus dem GitHub-Repo anlegen (Auto-Deploy `main`, Preview pro Branch)
- [ ] Formular-Backend prüfen/anbinden: Danke-Weiterleitung existiert, ob Daten tatsächlich versendet werden ist ungeprüft
- [ ] Platzhalter füllen: Teamfotos, Funktion Leon Rauh, Team-Kurztexte (`ueber-uns.astro`), FAQ-Mindestgrößen (`weg-verwaltung.astro`, `mietverwaltung.astro`)
- [ ] OG-Image + Sitemap ergänzen

## Blocker / Entscheidungen
- Ziel-Domain ungeprüft: `site` in `astro.config.mjs` = `https://www.immovent-hv.de`
- Formular-Dienst offen (Netlify Forms / Formspree / eigener Endpoint)

## Kontext
- Repo ist privat im Account `scalemybusinessonline-cpu`, nicht in der Greenblut-GmbH-Org. Mit `mhuehnlein` kommt „Repository not found“. Für Pull/Push kurz `gh auth switch --user scalemybusinessonline-cpu`, danach zurück auf `mhuehnlein`
