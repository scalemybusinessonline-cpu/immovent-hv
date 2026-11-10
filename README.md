# Immovent Hausverwaltung – Website

Statische Website der Immovent Hausverwaltung GmbH (Bamberg), gebaut mit **Astro 7**.
Design-Stand: **V3 „Blau V3 Texte überarbeitet“** (umgesetzt 28.10.2026).

Projektstand und offene Aufgaben stehen in [`Projektnotizen.md`](Projektnotizen.md).
Diese Datei beschreibt, **wie das Design funktioniert und wie neue Inhalte gestaltet werden.**

```sh
npm ci            # Abhängigkeiten installieren (Node >= 22.22)
npm run dev       # Entwicklung auf http://localhost:4321
npm run build     # Produktion nach ./dist
npm run preview   # Build lokal ansehen
```

---

## 1. Grundprinzipien

1. **Ruhig, seriös, nahbar.** Viel Weißraum, wenige Farben, klare Hierarchie. Keine Effekte, die nur dekorieren.
2. **Eine Quelle für Styles.** Alle Styles stehen in [`src/styles/global.css`](src/styles/global.css). Neue Gestaltung zuerst mit vorhandenen Klassen lösen, erst dann neue Klassen dort ergänzen. Keine CSS-Frameworks, keine Komponentenbibliotheken.
3. **Leicht und schnell.** CSS wird inline ausgeliefert, kein JavaScript außer Menü, Tabs (`/weg-verwaltung`), Funnel (`/angebot`), Cookie-Banner und Formularversand. FAQ = natives `<details>`.
4. **Barrierearm.** Mindestens 48 px Klickfläche, sichtbarer Fokusrahmen, `prefers-reduced-motion` wird respektiert, Kontraste nach WCAG AA (Ausnahme siehe [Abschnitt 9](#9-bekannte-design-baustellen)).
5. **Deutsch, Sie-Form.** Konkrete Aussagen statt Floskeln (siehe [Abschnitt 8](#8-texte--tonalität)).

---

## 2. Farben

Die Farben sind derzeit als feste Hex-Werte in `global.css` hinterlegt (keine CSS-Variablen). Nur diese Werte verwenden.

| Rolle | Hex | Verwendung |
|---|---|---|
| **Primärblau** | `#5797F5` | Primär-Buttons, CTA-Box, blaue Sektion, Footer, Fortschrittsbalken, `theme-color` |
| Primärblau hover | `#3F82E8` | Hover von `.btn-p` |
| **Akzent / Link** | `#1F4FA3` | Links, Eyebrows, Icons, aktive Navigation, Fokusrahmen, Häkchen |
| Akzent hover | `#193F84` | Link-Hover |
| **Text** | `#16202E` | Fließtext, Überschriften |
| Text sekundär | `#2E3A4B` | Navigation, Listen, Tabellenzellen |
| Text gedämpft | `#4F5B6B` | `.muted`, `.lead`, Labels, Kennzahl-Beschriftungen |
| Hinweistext | `#5B6676` | `.hint`, Unterzeilen in Kacheln |
| Platzhalter | `#7A8596` | nur für `::placeholder` |
| Hintergrund | `#FFFFFF` | Seite, Karten |
| Hintergrund alt | `#EFF5FE` | `.sec-alt`, Tabellenkopf |
| Hellblau-Fläche | `#EEF4FE` | Icon-Boxen, Tags, aktiver Nav-Link, ausgewählte Kachel |
| Fläche neutral | `#F9FAFC` / `#F1F4F8` / `#E9EDF3` | Trust-Leiste, Hover, Bild-Platzhalter |
| Linie | `#E3E7EE` | Karten-Rahmen, Trenner |
| Linie fein | `#EEF1F5` | Zeilen in Karten, mobile Navigation |
| Linie stark | `#CBD3DF` | Input-Rahmen, Ghost-Button, Kennzahl-Linie |
| Pflichtfeld | `#B42318` | `.req` |

**Status-Chips** (`.chip`): `ok` grün `#13613D` auf `#E4F4EC` · `wip` braun `#7A4300` auf `#FDF0DC` · `new` blau `#1F4FA3` auf `#EEF4FE`.

**Regeln**
- Für Text und Links immer **`#1F4FA3`** nehmen, nicht das hellere Primärblau. `#5797F5` ist eine **Flächenfarbe**.
- Pro Sektion höchstens eine blaue Fläche (Button, CTA-Box *oder* Sektion).
- Keine Verläufe und keine zusätzlichen Farben. Grün/Braun nur in Status-Chips.

---

## 3. Typografie

Schriften sind **selbst gehostet** (`public/fonts/`, nur Latin, kein Request an Google Fonts):

- **Belleza** – Überschriften `h1`, `h2`, `.h3l`, `.serif`, Kennzahlen, Funnel-Fragen. Nur Gewicht 400.
- **Geist** – alles andere, Gewichte 400–600.

| Element | Größe | Zeilenhöhe | Schrift |
|---|---|---|---|
| `h1` | `clamp(40px, 5.2vw, 62px)` | 1.07 | Belleza |
| `h2` | `clamp(30px, 3.6vw, 44px)` | 1.12 | Belleza |
| `.h3l` (Karten-Titel groß) | 30px | 1.15 | Belleza |
| `h3` | 20px, 600 | 1.3 | Geist |
| `.lead` | 19px | 1.6 | Geist, `#4F5B6B` |
| Fließtext | 17px | 1.6 | Geist |
| Sektions-Untertitel | 18px | 1.6 | Geist, `.muted` |
| `.small` | 15px | 1.6 | Geist |
| `.eyebrow` | 13px, 600, Versalien, `.08em` Sperrung | – | Geist |
| `.stat-n` | 40px (Hero 32px) | 1 | Belleza |

**Regeln**
- Pro Seite genau ein `h1`. Überschriften nicht fett setzen, Belleza wirkt über Größe.
- `h1`/`h2` haben `text-wrap: balance`, Absätze `pretty`. Keine manuellen `<br>` zum Umbrechen von Überschriften.
- Belleza nie für Fließtext oder Buttons.
- Telefonnummern brechen nie um (`a[href^="tel:"]` ist `nowrap`).

---

## 4. Layout & Abstände

| Token | Wert |
|---|---|
| Inhaltsbreite `.wrap` | max. 1200px, seitlich 32px (≤ 640px: 16px) |
| Sektion `.sec` | 112px oben/unten (≤ 760px: 72px) |
| Sektionskopf `.head` | Abstand 16px intern, 56px nach unten (≤ 760px: 40px) |
| Raster `.grid2/3/4` | Spalten ab 440 / 300 / 240px, Abstand 24px |
| `.split` (Text + Bild/Formular) | Spalten ab 440px, Abstand 72px (≤ 760px: 40px) |
| Rechtstexte `.legal` | max. 780px |

**Radien:** Buttons & Inputs 10px · Kacheln 12px · Karten 16px · Fotos, CTA-Box, Funnel 20px · Chips/Tags rund (999px).

**Schatten:** nur für schwebende Elemente (Float-Card im Hero, Cookie-Banner, Funnel): `0 24px 48px -20px rgba(16,35,65,.28)`. Normale Karten haben **keinen** Schatten, nur Rahmen.

**Breakpoints**

| Breite | Änderung |
|---|---|
| ≤ 1060px | Desktop-Navigation und „Kundenportal“-Button weg, Menü-Button erscheint |
| ≤ 900px | Float-Card wird normal unter das Hero-Bild gesetzt, Schritt-Linie entfällt |
| ≤ 760px | kleinere Sektionsabstände, Hero-Foto quadratisch, Footer einspaltig oben |
| ≤ 640px | Formular einspaltig, Footer 2 Spalten, Logo 38px |
| ≤ 440px | „Erstgespräch“-Button in der Navigation ausgeblendet |

Jede Seite muss bei **320px Breite** ohne horizontales Scrollen funktionieren.

---

## 5. Sektionsaufbau

Jede Inhaltsseite folgt demselben Rhythmus:

```html
<section class="sec">            <!-- oder: sec sec-alt / sec sec-blue -->
  <div class="wrap">
    <div class="head">
      <div class="eyebrow">Kurzes Thema</div>
      <h2>Aussage als ganzer Satz.</h2>
      <p class="muted" style="font-size: 18px; line-height: 1.6">Ein bis zwei Sätze Einordnung.</p>
    </div>
    <!-- Inhalt: grid2 / grid3 / grid4 / split / faqs / steps -->
  </div>
</section>
```

- **Hintergründe abwechseln:** weiß → `.sec-alt` (hellblau) → weiß … Maximal **eine** `.sec-blue` pro Seite (z. B. „Verwalterwechsel in vier Schritten“). In `.sec-blue` die Eyebrow mit `.eyebrow.w` setzen.
- **Seitenschluss:** Kontaktbereich (`#anfrage`, `.sec-alt`, `.split` mit Text + Formular-Karte) oder `.cta`-Box.
- **Hero (Startseite):** `.split` mit Eyebrow, `h1`, `.lead`, zwei Buttons (primär + ghost), drei `.stat`-Kennzahlen; rechts `.hero-photo` mit `.float-card`.

---

## 6. Komponenten

| Klasse | Wofür | Hinweise |
|---|---|---|
| `.btn .btn-p` | Hauptaktion (Erstgespräch) | **Eine** Primäraktion pro Sichtbereich. Pfeil-Icon optional. |
| `.btn .btn-g` | Nebenaktion | weiß mit Rahmen |
| `.btn .btn-w` / `.btn-o` | Buttons auf blauer Fläche | weiß gefüllt / weiß umrandet |
| `.card` | Inhaltsboxen | Innenabstand 32–40px; als `<a class="card">` klickbar mit `.link-arrow` |
| `.ic-box` | Icon in 44px-Box | Hellblau, Icon `#1F4FA3` |
| `.checks` / `.check` | Vorteilslisten | Häkchen-SVG, max. 4–5 Punkte |
| `.eyebrow` | Thema über Überschriften | 2–5 Wörter, mit blauem Strich davor |
| `.stat` | Kennzahlen | Einheitlich **„150+ betreute Einheiten“** (Entscheidung 21.10.2026) |
| `.steps` + `.step` / `.vsteps` | Ablauf | nummeriert `01`–`04`, horizontal bzw. vertikal |
| `details.faq` | FAQ | natives `<details name="faq">`, erstes Element `open` |
| `.tabs` / `.tab` | Umschalter | nur auf `/weg-verwaltung` |
| `.chip` / `.tag` | Status / Schlagworte | siehe Farben |
| `.form` / `.field` | Formulare | Label immer sichtbar, Pflichtfeld mit `<span class="req">*</span>`, Inputs 48px hoch, 16px Schrift (kein iOS-Zoom) |
| `.cta` | Abschlussbox | blaue Fläche, 20px Radius |
| `.funnel` / `.tile` | Anfrage-Funnel `/angebot` | 5 Schritte, Fortschrittsbalken `.f-bar`, Kacheln mit `.radio` |
| `.marq` | Städte-Laufband | stoppt bei Hover, bei reduzierter Bewegung statisch |

Gemeinsame Teile liegen in `src/components/` (Nav, Footer, ContactForm, CookieBanner, ConsentMode) und `src/layouts/Base.astro`. Kontaktdaten und Navigation **nur** in [`src/data/site.ts`](src/data/site.ts) ändern.

---

## 7. Bilder & Icons

**Fotos**
- Motive: echte Wohngebäude (Mehrfamilienhäuser, Wohnanlagen, Altbau-Fassaden), hell und freundlich. Keine Stock-Business-Fotos mit Händeschütteln.
- Quelle in `src/assets/` ablegen, immer über `<Picture formats={['avif','webp']} …>` mit `widths` und `sizes` einbinden.
- Klasse `.photo` (20px Radius, `object-fit: cover`). In Karten oben bündig, 240px hoch.
- Pflicht: aussagekräftiges `alt` auf Deutsch. Hero-Bild `loading="eager" fetchpriority="high"`, alle anderen `lazy`.
- Fehlende Fotos (z. B. Team) als `.ph`-Platzhalter, nicht mit Fremdbildern füllen.

**Icons**
- Inline-SVG, Linienstil: `fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`.
- Größe 20px in `.ic-box`, 16px bei Pfeilen, 18px bei Häkchen. Immer `aria-hidden="true"`.
- Keine Icon-Fonts, keine Emojis, keine gefüllten Icons.

**Logo:** `logo.png` (Navigation, 44px hoch, mobil 38px) und `logo-white.png` (Footer, 210px breit).

---

## 8. Texte & Tonalität

- **Sie-Form**, sachlich und warm. Kurze Sätze, aktive Verben („Wir übernehmen …“, „Wir melden uns …“).
- **Überschriften sind Aussagen** mit Punkt am Ende: „Hausverwaltung in Bamberg, die einfach funktioniert.“
- Konkrete Zusagen statt Superlative: „Rückmeldung werktags innerhalb von 24 Stunden“, „2 feste Ansprechpartner“.
- Region nennen (Bamberg, Forchheim, Bayreuth, Coburg …) – wichtig für lokales SEO.
- Haupt-CTA heißt **„Erstgespräch vereinbaren“** bzw. „Erstgespräch“ in der Navigation. Einzige Ausnahme ist die Ads-Landingpage `/angebot`: dort „Kostenloses Angebot anfordern“.
- Fachbegriffe korrekt: „WEG-Verwaltung“, „Wohnungseigentumsgesetz“, „Eigentümerversammlung“, „Jahresabrechnung“.

---

## 9. Bekannte Design-Baustellen

- **Kontrast Weiß auf Primärblau:** `#FFFFFF` auf `#5797F5` erreicht nur **2,94 : 1** (WCAG AA verlangt 4,5 : 1 für Text). Betrifft `.btn-p`, `.cta`, `.sec-blue` und den Footer. Dunkler Text `#16202E` auf `#5797F5` hätte 5,59 : 1. Vor dem Livegang mit dem Kunden klären, ob das Blau abgedunkelt oder die Schriftfarbe gewechselt wird.
- Farben sind Hex-Werte statt CSS-Variablen – bei der nächsten größeren Änderung in `:root`-Tokens überführen.
- Viele Abstände stehen als Inline-`style` in den Seiten. Wiederkehrende Muster (Karten-Innenabstand, Sektions-Untertitel 18px) bei Gelegenheit in Klassen auslagern.
- Platzhalter (Teamfotos, Team-Texte) und 320px-Overflow: siehe `Projektnotizen.md`.

---

## 10. Checkliste für neue Seiten

- [ ] `Base`-Layout mit eigenem `title` (≤ 60 Zeichen) und `description` (≤ 155 Zeichen)
- [ ] Genau ein `h1`, Sektionen mit `.head` (Eyebrow → `h2` → Untertitel)
- [ ] Hintergründe abwechselnd, höchstens eine `.sec-blue`
- [ ] Nur Farben, Klassen und Icons aus diesem Dokument
- [ ] Bilder als AVIF/WebP mit `alt`
- [ ] Endet mit Kontaktbereich oder `.cta` → Erstgespräch
- [ ] Geprüft bei 320px, 768px und 1280px Breite, mit Tastatur bedienbar
- [ ] Seite in Navigation (`site.ts`) bzw. Sitemap aufnehmen, falls öffentlich
