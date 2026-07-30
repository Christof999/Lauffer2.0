# Design-Review mit Impeccable

Werkzeug: [impeccable](https://impeccable.style) 3.5.0 (`impeccable detect`, Browser-Rendering
via Puppeteer) + visuelle Sichtung von Screenshots.
Datum: 2026-07-30 · Branch: `claude/impeccable-style-check-mczuu2`

## Wie geprüft wurde

`https://www.lauffer-bau.de` ist aus dieser Session heraus nicht erreichbar (Egress-Policy).
Geprüft wurde deshalb der Production-Build (`npm run build`) lokal ausgeliefert, inklusive der
prerenderten SEO-Seiten. Die Google-Fonts wurden lokal eingebunden, damit Cormorant Garamond
und Manrope tatsächlich rendern und die Typografie-Messungen stimmen.

Geprüfte Seiten: `/`, `/gartenbau/`, `/projekte/`, `/kontakt/`, `/karriere/`, `/uber-uns/` —
jeweils Desktop (1440×900) und Mobil (390×844). Zusätzlich statische Analyse über `src/`.

Ergebnis der automatischen Erkennung: 17–26 Findings pro Seite.

## Gesamteindruck

Die Kernseiten haben eine klare, eigenständige Handschrift: dunkle Bühne (`#0f1110`),
Cormorant Garamond als Display-Serif gegen Manrope als schlanke Grotesk, Grün nur als
sparsamer Akzent, viel Weißraum, ruhige Linien statt Karten-Kacheln. Das ist deutlich besser
als der Branchendurchschnitt.

Der Bruch liegt woanders: Es sind faktisch **zwei Websites unter einer Domain**, und die
Grundtypografie ist nicht verankert. Beides ist mit überschaubarem Aufwand zu beheben.

---

## 1. Zwei Designsysteme auf einer Domain (wichtigster Punkt)

Die SEO-Landingpages `/gartenbau/`, `/erdbau/`, `/natursteine/` sehen aus wie ein anderes
Unternehmen:

| | Kernseiten | Service-Landingpages |
|---|---|---|
| Hintergrund | `#0f1110` dunkel | `#ffffff` weiß |
| Akzent | Grün `#8cc63f` | Braun `#7b4833` |
| Headline-Font | Cormorant Garamond | System-Sans (fett) |
| Buttons | Textlinks, keine Fläche | braune Vollflächen-Buttons, `border-radius: 2px` |
| Aufbau | großzügige Zeilen | generische Bullet-Liste |

Ursache: `src/pages/ServiceLanding.css` arbeitet komplett mit den Legacy-Tokens
(`--brown-primary`, `--grey-primary`, `--white`, `--coal-grey`) und deklariert **keine
einzige** `font-family`. Diese Seiten sind genau die, auf denen Google Nutzer landet — der
erste Eindruck entsteht also auf der Seite, die am wenigsten nach Lauffer Bau aussieht.

**Empfehlung:** ServiceLanding auf die dunklen Tokens und das Font-Paar der Kernseiten
umziehen. Braun kann als Akzent für Erdbau bleiben (so wie `.service-item--erdbau` es auf der
Startseite schon macht), aber nicht als Seitenidentität.

## 2. Body-Font ist ein System-Stack

`src/index.css:57` setzt für `body` den klassischen System-Font-Stack. Cormorant und Manrope
werden nur pro Komponente nachgezogen. Alles, was das vergisst, fällt auf die OS-Schrift
zurück:

- der komplette Footer (11 von 11 Textelementen)
- das Cookie-Banner
- die Formular-Labels auf `/kontakt/`
- die Benefit-Karten auf `/karriere/`
- sämtliche Service-Landingpages

Gemessener Anteil OS-Schrift: 40 % (Startseite) bis 88 % (`/projekte/`). Praktische Folge:
Die Seite sieht unter macOS, Windows und Android unterschiedlich aus, und im Footer steht
sichtbar eine andere Schrift als 20 cm darüber.

**Empfehlung:** `body { font-family: 'Manrope', sans-serif }` als Basis, Cormorant gezielt für
Display-Ebenen. Die komponentenweisen Wiederholungen können dann größtenteils raus.

## 3. Kontrast (WCAG AA)

Echte Verstöße:

| Ort | Werte | Soll |
|---|---|---|
| Cookie-Banner, Hinweistext grün auf weiß | `#6aa427` / `#ffffff` = 3,0:1 | 4,5:1 |
| Cookie-Banner, Button „Alle akzeptieren" | `#ffffff` / `#6aa427` = 3,0:1 | 4,5:1 |
| Cookie-Banner, Fließtext | `#707173` / `#f5f5f5` = 4,48:1 | 4,5:1 |
| `/projekte/` Kategorie-Chips (7×) | `#f0f2f0` / `#6aa427` = 2,7:1 | 4,5:1 |
| `/gartenbau/` Kicker + Subline über Braun-Verlauf | 2,5:1 bzw. 3,3:1 (Median) | 4,5:1 |

`#6aa427` (`--primary-dark`) trägt für Text auf Weiß bzw. Weiß auf Fläche nicht. Für
Textflächen braucht es eine dunklere Variante (~`#4f7a10` aufwärts).

Nicht zu beheben, weil Fehlalarm: die Meldungen „browser contrast 1.0:1" für Footer-Texte
(„Lauffer Bau", „Kontakt", „Leistungen", „Rechtliches", Copyright). Die entstehen durch das
analytische Modell des Detectors über den beiden Radial-Verläufen im Footer; real liegt der
Kontrast dort bei ca. 14:1. Im Screenshot ist der Footer einwandfrei lesbar.

## 4. Erkannte AI-Muster

Impeccable prüft gegen einen Katalog von Mustern, die inzwischen als „generiert" gelesen
werden. Gefunden:

- **`hero-eyebrow-chip`** — getrackter Caps-Kicker direkt über der Hero-Headline auf `/`,
  `/projekte/`, `/kontakt/`, `/uber-uns/`
- **`kicker-above-heading`** — „Was wir tun" über „Unsere Expertise", „Portfolio" über
  „Ausgewählte Arbeiten", „Leistung" über „Gartenbau"
- **`side-tab`** — `border-top: 3px` im Footer, `border-left: 3px` + `border-radius: 10px` auf
  der Stellenanzeige (`src/pages/Karriere.css:176`)
- **`radial-spotlight-glow`** — grüner Radial-Schleier im Footer (`#8cc63f`, α 0.10)
- **`icon-tile-stack`** — 5× 44px-Icon-Kachel über Überschrift auf `/karriere/`
- **`gradient-text`** — `src/pages/MapDemo.css:41`
- **`border-accent-on-rounded`** — `src/components/AnimatedMap.css:37`
- **`bounce-easing`** — `fadeBounce` in `src/pages/Home.css:108`
- **`layout-transition`** — `transition: width` (`src/pages/Home.css:91`) und
  `padding-left` im `.service-item:hover`

Die Kicker sind der auffälligste Punkt: Sie tauchen auf fast jeder Seite auf und tragen
nirgends Information, die die Überschrift nicht selbst hat.

## 5. Typografie und Layout

- **Ausgerissene linke Kante bei den Leistungen** (`src/pages/Home.css:262`): Die Subline hat
  `text-align: right` in einer 400px-Box, die Überschrift darüber ist linksbündig. Die drei
  Sublines starten dadurch bei drei verschiedenen x-Positionen. Im Screenshot deutlich
  sichtbar.
- **Zeilenlängen**: 149 Zeichen im Cookie-Banner, 89–102 Zeichen auf `/projekte/`,
  `/kontakt/`, `/karriere/`. Zielbereich sind 65–75 Zeichen.
- **Übersprungene Heading-Ebenen**: `h1 → h3` auf `/` und `/projekte/`, `h2 → h4` auf
  `/kontakt/`. Betrifft Screenreader-Navigation und SEO-Outline.
- **`cramped-padding`** auf `.service-landing-faq` — Inhalt sitzt oben bündig auf der Fläche.
- **Versalien im Fließtext** (31 Zeichen) — für Labels okay, für Sätze nicht.
- **`/karriere/`**: 5 Benefit-Karten in einem 4-spaltigen Raster ergeben eine verwaiste
  fünfte Karte in Zeile zwei.

## 6. Inhalt und Interaktion

- **`info(@)lauffer-bau.de`** steht so im Footer. Die Spam-Obfuskation ist in die sichtbare
  Ausgabe durchgeschlagen — Besucher können die Adresse nicht kopieren.
- **Galerie ist `grayscale(100%)`**, Farbe erst bei `:hover` (`src/pages/Home.css`,
  `.gallery-item`). Auf Touch-Geräten gibt es kein Hover: Mobilnutzer sehen die Arbeiten eines
  Garten- und Landschaftsbauers ausschließlich in Schwarzweiß.
- **Hero ohne Bild**: Die Startseite öffnet mit einer leeren schwarzen Fläche. Typografisch
  souverän, aber ein Betrieb, der Außenanlagen baut, verschenkt hier seinen stärksten Beleg.
- **Kennzahlen**: „1.373 PS" als erste Zahl neben „20 Jahre" und „20" (ohne Einheit) ist eine
  ungewöhnliche Reihung — PS ist kein Kaufargument für Gartengestaltung.
- **Cookie-Banner** legt sich beim ersten Besuch über die gesamte Seite, inklusive Footer.

---

## Reihenfolge für die Umsetzung

1. ServiceLanding auf das dunkle Designsystem umstellen (Punkt 1) — größte Wirkung, betrifft
   die Google-Einstiegsseiten.
2. `body`-Font auf Manrope (Punkt 2) — eine Zeile, wirkt auf jeder Seite.
3. Kontraste korrigieren (Punkt 3) — Cookie-Banner und Projekt-Chips.
4. `info(@)` und Galerie-Graustufen auf Mobil (Punkt 6) — kleine Änderungen, direkter
   Nutzen.
5. Kicker entfernen, Sublines linksbündig, Heading-Ebenen glätten (Punkte 4 und 5).

## Reproduzieren

```bash
npm run build
npx vite preview --port 4173
npx impeccable detect http://localhost:4173/
npx impeccable detect --viewport 390x844 http://localhost:4173/
npx impeccable detect src/
```

Für die Browser-Prüfung wird ein Chromium benötigt; in dieser Session wurde
`PUPPETEER_EXECUTABLE_PATH` auf das vorinstallierte Chromium mit `--no-sandbox` gesetzt.
