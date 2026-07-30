# Impeccable Review – lauffer-bau.de

Design- und Technik-Review der Website mit [Impeccable](https://impeccable.style) v3.5.0 /
Skill v4.0.4 (`/impeccable audit` + `/impeccable critique`).

- **Datum:** 30.07.2026 (Befunde), 30.07.2026 (Umsetzung)
- **Stand:** Branch `claude/impeccable-style-check-hep257`
- **Status:** Alle Empfehlungen umgesetzt – siehe [Abschnitt 9: Umsetzung](#9-umsetzung-und-nachmessung)
- **Geprüft:** lokaler Production-Build (`npm run build` + `vite preview`), Chromium,
  Viewports 1440×900 und 390×844
- **Routen:** `/`, `/uber-uns`, `/projekte`, `/galerie`, `/team`, `/karriere`, `/kontakt`,
  `/gartenbau`
- **Hinweis:** `https://www.lauffer-bau.de` ist aus der Session-Umgebung heraus nicht
  erreichbar (Netzwerk-Policy). Geprüft wurde deshalb der identische lokale Build.
  Google Fonts wurden für die Screenshots lokal eingebettet, damit Cormorant Garamond und
  Manrope real gerendert werden.

---

## 1. Kurzfassung

Die Startseite hat eine **echte, eigene Designhaltung**: dunkles, redaktionelles Layout,
Cormorant Garamond als Serif-Stimme, Manrope als Sans, sparsamer Grün-Akzent, viel Ruhe.
Das ist für einen Garten- und Erdbaubetrieb deutlich über dem Branchenschnitt und liest sich
nicht wie eine Vorlage.

Der Bruch entsteht dahinter: **die Seite ist nicht ein System, sondern drei.** Die
Service-Landingpages (`/gartenbau`, `/erdbau`, `/natursteine`) sind hell, systemschriftig und
haben nichts mit dem Rest zu tun. Die Galerie ist durch eine CSS-Klassenkollision faktisch
kaputt. Und `/projekte` lädt **27,9 MB Bilder**.

| Bewertung | Ergebnis |
|---|---|
| Audit Health Score (Technik) | **8 / 20** – Poor (grundlegende Arbeit nötig) |
| Design Health Score (Nielsen, Persuade) | **26 / 40** – Acceptable |
| Design Specificity | **Pass mit Einschränkung** – eigene Haltung, aber nicht durchgehalten |

Die drei Dinge, die zuerst weg müssen:

1. **P0 – Galerie kaputt:** `.gallery-grid` / `.gallery-item` sind in `Home.css` **und**
   `Gallery.css` definiert. Weil das CSS global gebündelt wird, gewinnt `Home.css` mit
   `display: grid; grid-template-columns: repeat(12, 1fr)` – das `column-count: 4`-Masonry aus
   `Gallery.css` ist damit wirkungslos. Ergebnis auf 1440 px: 43 Bilder à **98 px** Breite mit
   Höhen von 74–212 px in einem zerrissenen Raster.
2. **P0 – Bildgewicht:** `/projekte` = 27,9 MB, `/galerie` = 10,7 MB, `/` = 5,7 MB
   (davon ein einzelnes JPG mit 4,34 MB). Einzelne Assets: `IMG_6200.PNG` 12,1 MB,
   `IMG_6181.PNG` 8,7 MB. In `public/images` liegen **242 MB**, inklusive `.HEIC`-Dateien
   (in Browsern nicht darstellbar) und `.MP4`-Clips.
3. **P1 – zweites Designsystem:** `ServiceLanding.css` enthält **keine einzige**
   `font-family`-Deklaration → die Landingpages rendern komplett in der System-Schrift,
   auf Weiß, mit braunen Buttons und `text-shadow` in der H1.

---

## 2. Audit Health Score (Technik)

| # | Dimension | Score | Kernbefund |
|---|-----------|-------|------------|
| 1 | Accessibility | 2 / 4 | Touch-Targets 17–24 px; `prefers-reduced-motion` greift nicht bei Framer Motion; Kontrast 3,0:1 auf Badges |
| 2 | Performance | 1 / 4 | 27,9 MB auf `/projekte`; unoptimierte Handy-PNGs; 11 von 12 `<img>` ohne `loading="lazy"` |
| 3 | Responsive Design | 2 / 4 | kein horizontaler Overflow, aber Galerie-Raster bricht auf Desktop; Tap-Flächen zu klein |
| 4 | Theming | 2 / 4 | gutes Token-Set in `index.css`, von den Landingpages komplett ignoriert |
| 5 | Implementation Integrity | 1 / 4 | globale Klassenkollision, 212-px-Icon-Bug, drei Bildsprachen |
| **Total** | | **8 / 20** | **Poor** |

Der Score ist härter als der optische Eindruck der Startseite – er wird vom Assetgewicht und
von den CSS-Kollisionen nach unten gezogen, nicht von der Gestaltung.

### Implementation Integrity – Verdikt: **Fail**

Die Startseite drückt ein kohärentes, produktspezifisches System aus. Der Rest der Codebasis
tut das nicht:

- `.gallery-grid` und `.gallery-item` existieren doppelt (`src/pages/Home.css:277-308` und
  `src/pages/Gallery.css:87-96`). Alle Page-CSS-Dateien landen in einem globalen Bundle,
  es gibt keine CSS-Modules und keine Namespace-Präfixe. Deshalb erbt die Galerie
  zusätzlich `filter: grayscale(100%)`, `aspect-ratio: 4/5` und die
  `nth-child(1|2|3) { grid-column: … }`-Regeln der Startseite – daher die drei großen Bilder
  oben und die Miniaturen darunter.
- Drei Fotobehandlungen parallel: Startseite grayscale (Hover → Farbe), `/projekte` voll in
  Farbe, `/galerie` durch die Kollision zwangs-grayscale.
- Vier verschiedene Grüntöne: `--primary #8cc63f`, `--primary-dark/--forest-green #6aa427`,
  `--primary-light #a6d86a` und hart kodiertes `rgba(122, 181, 29, …)` in
  `src/pages/Contact.tsx:291`.

---

## 3. Design Health Score (Nielsen, Modus *Persuade*)

| # | Heuristik | Score | Kernproblem |
|---|-----------|-------|-------------|
| 1 | Visibility of System Status | 3 | Formular hat `idle/sending/success/error` mit `role="status"`; keine Ladezustände für die schweren Bilder |
| 2 | Match System / Real World | 3 | Sprache und Inhalte sitzen; „LEISTUNG 3.746 PS" als Leitzahl ist Maschinen-, keine Kundensprache |
| 3 | User Control and Freedom | 3 | Modal mit ESC + Pfeiltasten, Cookie-Einstellungen wieder aufrufbar |
| 4 | Consistency and Standards | 1 | zwei Typo-Systeme, drei Bildsprachen, ungestylte Formularschriften |
| 5 | Error Prevention | 3 | `required`, Felder während des Sendens `disabled`, Betreff als Select |
| 6 | Recognition Rather Than Recall | 3 | klare Navigation mit Active-State, Leistungen im Footer wiederholt |
| 7 | Flexibility and Efficiency | 2 | keine Telefonnummer im Header, kein Click-to-Call oberhalb des Folds |
| 8 | Aesthetic and Minimalist Design | 3 | starke, ruhige Haltung; leerer 100-vh-Hero und Eyebrow-Labels kosten Punkte |
| 9 | Error Recovery | 3 | Fehlermeldung mit Wiederholmöglichkeit, eigene 404-Seite |
| 10 | Help and Documentation | 2 | FAQ nur auf den Landingpages, kein Ablauf/Preisrahmen auf den Hauptseiten |
| **Total** | | **26 / 40** | **Acceptable** |

### Design Specificity – Verdikt: **Pass, aber nicht durchgehalten**

Der dunkle, serif-geführte Auftritt ist eine bewusste Entscheidung und trägt: die Paarung
Cormorant Garamond / Manrope, die 1-px-Trennlinien, die reduzierte Palette und der große
Weißraum ergeben einen Auftritt, der für ein Bauunternehmen ungewöhnlich hochwertig wirkt.
Nichts davon riecht nach SaaS-Template.

Was die Eigenständigkeit verwässert:

- **Kicker über jeder Überschrift** („WAS WIR TUN" über „Unsere Expertise", „PORTFOLIO" über
  „Ausgewählte Arbeiten", „LEISTUNG" über „Gartenbau"). Impeccable verbietet das Muster
  ausdrücklich – die Überschriften tragen sich selbst.
- **Eyebrow-Chip über der H1** auf `/`, `/kontakt`, `/projekte`, `/galerie`.
- **Grüne Pill-Badges** auf den Projektkarten – das generischste Element der Seite.
- **Radialer Grün-Schein im Footer** (`#8cc63f` @ 10 % → transparent) auf allen Seiten.
- **Der Hero:** 100 vh reines Schwarz mit zentrierter Headline. Für einen Betrieb, der
  Terrassen, Natursteinmauern und Außenanlagen baut, ist das die größte verschenkte Fläche
  der Seite. Kein Bild, kein Material, kein Beweis – und die einzigen Handlungsangebote sind
  zwei 24 px hohe Textlinks.
- **Fotografie:** ehrliche Handyaufnahmen, aber unkuratiert – eingebrannte
  „LAUFFER"-Wasserzeichen, Selfies, blaue Planen, wechselnde Formate und Belichtungen. Für
  einen Auftritt, der Hochwertigkeit behauptet, ist das Bildmaterial das schwächste Glied.

---

## 4. Befunde nach Priorität

### P0 – blockierend

**[P0] Galeriegitter durch globale CSS-Klassenkollision zerstört**
- **Ort:** `src/pages/Home.css:277-308` vs. `src/pages/Gallery.css:87-96`
- **Kategorie:** Implementation Integrity / Responsive
- **Messung:** `.gallery-grid` rendert mit `display: grid` und
  `grid-template-columns` aus `Home.css`; 43 `.gallery-item` à 98 px Breite,
  Höhen 74–212 px. Erwartet war ein 4-spaltiges Masonry.
- **Wirkung:** Die Galerie – die Seite, die die Arbeit verkaufen soll – ist auf Desktop
  unbrauchbar. Zusätzlich erzwungenes Grayscale und `aspect-ratio: 4/5` aus `Home.css`.
- **Fix:** Klassen eindeutig benennen (`.home-gallery-grid` / `.page-gallery-grid`) oder auf
  CSS-Modules umstellen. Danach in `Gallery.css` `display: block` bzw.
  `columns: 4` explizit setzen.
- **Command:** `/impeccable layout`

**[P0] Seitengewicht durch unoptimierte Originalfotos**
- **Ort:** `public/images/projects/*`, `src/data/*`
- **Kategorie:** Performance
- **Messung:** `/projekte` 27,89 MB · `/galerie` 10,68 MB · `/` 5,71 MB · `/team` 2,14 MB
  (nur Bilder). Größte Einzelassets: `IMG_6200.PNG` 12,15 MB, `IMG_6181.PNG` 8,75 MB,
  `IMG_6208.PNG` 4,61 MB, `IMG_4682.JPG` 4,34 MB. `public/images` gesamt: 242 MB, darin
  `.HEIC`-Dateien (Browser können sie nicht anzeigen) und `.MP4`-Clips bis 9,6 MB.
- **Wirkung:** Auf Mobilfunk im ländlichen Mittelfranken ist `/projekte` praktisch nicht
  ladbar. Das ist gleichzeitig ein Ranking-Faktor (Core Web Vitals).
- **Fix:** Build-Pipeline für Bilder (WebP/AVIF, 1600 px Langkante, `srcset` mit 400/800/1600),
  `loading="lazy"` + `decoding="async"` + `width`/`height` überall, HEIC/MP4 aus `public/`
  entfernen oder in einen Ordner außerhalb des Deploys verschieben. Aktuell hat genau
  **1 von 12** `<img>`-Tags `loading="lazy"` (`src/pages/Gallery.tsx:107`).
- **Command:** `/impeccable optimize`

### P1 – vor dem nächsten Release

**[P1] Service-Landingpages sind ein zweites, fremdes Designsystem**
- **Ort:** `src/pages/ServiceLanding.css` (129 Zeilen, **keine** `font-family`-Deklaration)
- **Kategorie:** Consistency / Theming
- **Messung:** `getComputedStyle(h1).fontFamily` auf `/gartenbau` liefert den
  System-Stack – auf allen anderen Seiten `"Cormorant Garamond", serif`. Hintergrund weiß,
  Buttons braun, H1 mit `text-shadow: 2px 2px 4px`, Hero-Gradient grau→braun (also
  Erdbau-Braun auf der Gartenbau-Seite).
- **Wirkung:** Genau die Seiten, auf denen Google-Besucher zuerst landen, sehen aus wie ein
  anderes Unternehmen.
- **Fix:** Landingpages auf Tokens und Typo des Hauptsystems ziehen, Akzentfarbe pro Leistung
  aus der bestehenden Logik (`--service-accent` in `Home.css:189-213`) übernehmen.
- **Command:** `/impeccable adapt`

**[P1] Icon rendert 212 × 212 px statt 20 × 20 px**
- **Ort:** `src/pages/Karriere.css:355-358`, Icon-Komponente `src/pages/Karriere.tsx:46-51`
- **Kategorie:** Implementation Integrity
- **Messung:** `.email-apply-btn svg` = 212 × 212 px; `.job-apply-btn svg` = 20 × 20 px
  (dort ist `width`/`height` gesetzt, `Karriere.css:297-300`). Das `IconMail`-SVG hat keine
  eigenen `width`/`height`-Attribute, im zweiten Button fehlt die CSS-Größe.
- **Wirkung:** Der Button „Initiativbewerbung senden" ist optisch zerschossen, Label wird
  zweizeilig neben einen Riesen-Umschlag gequetscht.
- **Fix:** `width: 20px; height: 20px` in `.email-apply-btn svg` ergänzen (oder direkt am SVG).
- **Command:** `/impeccable polish`

**[P1] Kontrast unter WCAG AA an drei Stellen**
- **Ort:** `src/pages/Projects.css:103-108`; `src/components/CookieBanner.css:43,64-65,91`
- **Kategorie:** Accessibility (WCAG 2.1 SC 1.4.3)
- **Messung:**
  - Projekt-Badge: `--text-main` auf `--forest-green #6aa427` → **3,0:1** (nötig: 4,5:1)
  - Cookie-Banner: `#6aa427` auf Weiß → **3,0:1**; Weiß auf `#6aa427` → **3,0:1**
  - Cookie-Banner: `--grey-primary #707173` auf `--grey-light #f5f5f5` → **4,48:1** (knapp)
- **Fix:** Für Text auf Grün einen dunkleren Ton wählen (`#4f7a10` = `--forest-green-dark`
  ergibt 5,09:1 mit Weiß), Grün auf Weiß nur ab 24 px/18,7 px bold verwenden.
  Zur Orientierung: `--primary #8cc63f` auf `--bg-dark #0f1110` liegt bei 9,26:1 – auf
  dunklem Grund ist das Grün unproblematisch, nur als Flächenfarbe hinter Text nicht.
- **Command:** `/impeccable colorize`

**[P1] `prefers-reduced-motion` wird von Framer Motion ignoriert**
- **Ort:** `src/index.css:105-113` (CSS-Kill), 22 Dateien mit `framer-motion`, kein
  `useReducedMotion` / `MotionConfig` im Projekt
- **Kategorie:** Accessibility (WCAG 2.3.3)
- **Wirkung:** Nutzer mit vestibulären Beschwerden bekommen trotz Systemeinstellung alle
  Einblend-, Scroll- und Scale-Animationen. Zusätzlich ist der globale
  `animation-duration: 0.01ms !important`-Kill die von Impeccable ausdrücklich
  bemängelte Grobvariante – er nimmt auch nützliches Feedback mit.
- **Fix:** `<MotionConfig reducedMotion="user">` um die App legen und den globalen CSS-Kill
  durch gezielte Regeln ersetzen (Opacity-Wechsel behalten, Bewegung entfernen).
- **Command:** `/impeccable animate`

**[P1] Tap-Flächen deutlich unter 44 px**
- **Ort:** `src/components/Footer.css`, `src/pages/Home.css:70-77` (`.hero-link`),
  `src/components/Navigation.css` (`.burger-button` 40 × 40), `src/pages/Contact.css`
- **Kategorie:** Accessibility / Responsive (WCAG 2.5.5)
- **Messung** (390 px): Footer-Links 17 px hoch, Hero-Links 24 px, Burger 40 × 40,
  Telefon- und E-Mail-Link auf `/kontakt` je 22 px.
- **Wirkung:** Die 22 px hohe Telefonnummer ist auf einer Handwerker-Website die wichtigste
  Conversion-Fläche überhaupt.
- **Command:** `/impeccable adapt`

### P2 – nächster Durchgang

**[P2] Überschriftenhierarchie überspringt Ebenen**
- `/`: `<h1>` „Lauffer Bau" → `<h3>` „Leistung" (kein h2)
- `/projekte`: `<h1>` → `<h3>` Projekttitel
- `/kontakt`: `<h2>` „Lauffer Bau" → `<h4>` „E-Mail"
- Screenreader nutzen die Gliederung zur Navigation. `/impeccable harden`

**[P2] Beschreibungstext in „Unsere Expertise" ist fehlplatziert**
- **Ort:** `src/pages/Home.css:262-269`
- `.service-item p` hat `text-align: right` und `max-width: 400px`, liegt aber im linken
  Flex-Column-Container (`.service-item-left`). Der Text wird deshalb innerhalb einer 400-px-Box
  unter der Überschrift rechtsbündig gesetzt und hängt sichtbar schief. Vermutlich war eine
  zweispaltige Zeile gemeint. `/impeccable layout`

**[P2] Layout-Verschiebung im Hover**
- **Ort:** `src/pages/Home.css:189-247`
- `transition: all 0.4s ease` plus `:hover { padding-left: 2rem }` animiert eine
  Layout-Eigenschaft – Reflow bei jedem Hover. Stattdessen `transform: translateX()` und
  Transitions gezielt auf `background-color`/`transform` begrenzen. `/impeccable optimize`

**[P2] Formularfelder erben keine Markenschrift**
- **Ort:** `src/pages/Contact.css:281-292`
- `input`/`select`/`textarea` setzen `font-size`, aber keine `font-family` → die Textarea
  rendert im Browser-Default **Monospace** (im Screenshot sichtbar), die Inputs in der
  System-Schrift. `font-family: inherit` genügt. `/impeccable typeset`

**[P2] Inhalte sind erst nach Scroll-Trigger sichtbar**
- **Ort:** u. a. `src/pages/Contact.tsx:175-181`
- `initial={{ opacity: 0, x: 50 }}` + `whileInView` + `viewport={{ once: true }}`:
  Das Kontaktformular ist bis zum IntersectionObserver-Event `opacity: 0` und 50 px
  verschoben. Beim Rendern ohne Scroll (Screenshot-Tools, Print, JS-Teilausfall) bleibt
  an der Stelle ein leeres Loch. Für scrollende Nutzer funktioniert es – aber der Inhalt
  sollte nicht von der Animation abhängen. `/impeccable harden`

**[P2] Burger-Button ohne `aria-expanded`**
- **Ort:** `src/components/Navigation.tsx:63-92` – `aria-label` ist gesetzt, der Zustand
  offen/geschlossen wird nicht kommuniziert; `aria-controls` fehlt ebenfalls.
  `/impeccable harden`

**[P2] Kicker- und Eyebrow-Muster durchgehend**
- **Ort:** `.section-label` (`src/pages/Home.css:153-172`), `.hero-subtitle`,
  `.service-landing-kicker`
- Detector-Treffer: `kicker-above-heading` ×3, `hero-eyebrow-chip` ×5.
  `/impeccable distill`

### P3 – Politur

- **`info(@)lauffer-bau.de` im Footer** (`src/components/Footer.tsx:18`): Der
  Spamschutz-Platzhalter wird Nutzern unverändert angezeigt und ist nicht klickbar –
  auf `/kontakt` steht dieselbe Adresse korrekt.
- **Zentrierter Fließtext** auf `/karriere` („Warum Lauffer Bau?", „Initiativbewerbung"):
  mehrzeilig zentriert liest sich schlechter, weil die Zeilenanfänge wandern.
- **5 Karten in einem 4-Spalten-Raster** (`/karriere`, „Ihre Vorteile") lassen eine
  Waisenkarte in Reihe 2 – 3 oder 6 Spalten oder gleichmäßige Auto-Fit-Spalten.
- **Ungleich hohe Projektkarten** auf `/projekte` (Textlängen 60–430 Zeichen) → ausgefranste
  Unterkanten, „Mehr erfahren" auf unterschiedlichen Höhen.
- **Zeilenlänge ~90 Zeichen** auf `/gartenbau` (`.service-landing-inner` 720 px bei 1,1 rem)
  – Ziel sind 65–75 Zeichen.
- **`border-top: 3px` / `border-left: 3px` Akzentkanten** (`Karriere.css:176`,
  `CookieBanner.css:9`, `AnimatedMap.css:37`): Detector-Regel `side-tab` – das
  erkennbarste Merkmal generierter UIs.
- **`bounce-easing`** in `Home.css:91-120` (`fadeBounce`) und `transition: width` –
  Bounce wirkt gealtert, Breiten-Transitions verursachen Reflow.
- **`gradient-text`** in `MapDemo.css:41` (`background-clip: text` + Gradient).
- **Vierter Grünton** hart kodiert in `src/pages/Contact.tsx:291`
  (`rgba(122, 181, 29, 0.3)`) statt `var(--primary-rgb)`.
- **Token-Altlasten** in `src/index.css:32-47`: `--coal-grey`, `--forest-green`,
  `--grey-primary`, `--white`, `--black` doppeln bereits vorhandene semantische Tokens.

---

## 5. Verifizierte False Positives des Detectors

Nicht alles, was der mechanische Scan meldet, ist ein Fehler. Nachgeprüft:

| Regel | Meldung | Befund |
|---|---|---|
| `low-contrast` (Browser) | „1,0:1 via analytic-gradient+alpha" für Hero-H1 und alle Footer-Texte | **False Positive.** Der Detector kann `rgba()`-Text über geschichteten Gradienten nicht auflösen. Real: `--text-main` `rgba(240,242,240,0.92)` auf `#0f1110` ≈ 13:1. |
| `line-length` | „~149 Zeichen/Zeile" auf jeder Route (2×) | **False Positive.** Gemessen wird die 1216 px breite Copyright-Zeile im Footer – der Text darin hat 60 Zeichen und ist zentriert. |
| `body-text-viewport-edge` | `/kontakt` mobil, „bleeds right −9 px" | **False Positive.** Stammt aus dem Vor-Animations-Zustand (`x: 50`) des Kontaktformulars. Nach dem Scroll-Trigger: `document.scrollWidth == clientWidth == 390`, kein Overflow. |
| `overused-font` | „Primary font: roboto" (40–88 %) | **Teilweise.** Auf `/` & Co. ein Artefakt der Testumgebung (Google Fonts blockiert). **Real auf `/gartenbau`, `/erdbau`, `/natursteine`** – dort ist tatsächlich keine Markenschrift gesetzt (siehe P1). |
| `all-caps-body` | 31 Zeichen Uppercase | Bewusste Entscheidung (Nav-Labels, Kicker). Kurze Labels sind zulässig – der Kicker-Befund oben ist der relevantere. |
| `radial-spotlight-glow` | Footer-Glow `#8cc63f` @ 10 % | Vertretbar, aber es ist ein Reflex-Ornament. Bewusst behalten oder ersetzen. |

---

## 6. Was gut funktioniert

- **Eigene Designhaltung.** Cormorant Garamond / Manrope, dunkle Bühne, sparsamer Akzent,
  ruhiger Rhythmus – ein Auftritt, den man nicht mit den Wettbewerbern verwechselt.
- **Token-Grundlage vorhanden.** `src/index.css:1-47` definiert Markenfarben, semantische
  Aliase und RGB-Tripel für Alpha-Kompositionen; `color-scheme: dark` ist gesetzt.
- **Kontaktformular ist ordentlich gebaut.** `idle/sending/success/error`, `role="status"`
  für Meldungen, `required`, Felder während des Sendens `disabled`, Betreff als Select
  (`src/pages/Contact.tsx:9-57, 190-300`).
- **Modal-Barrierefreiheit.** `role="dialog"`, `aria-modal`, `aria-labelledby`,
  ESC + Pfeiltasten, Fokus auf Schließen-Button beim Öffnen
  (`src/components/ProjectModal.tsx:25-105`).
- **Fundament stimmt.** Skip-Link, `:focus-visible`-Ring mit Offset, `alt` auf allen
  12 `<img>`, eigene 404-Seite, saubere Titles und Canonicals pro Route.
- **Kein horizontaler Overflow** auf 390 px und 1440 px über alle geprüften Routen.
- **Farbcodierung pro Leistung** (Gartenbau grün, Erdbau braun, Naturstein steingrau,
  `Home.css:189-213`) – ein guter, eigener Gedanke, der auf den Landingpages nur noch
  nicht ankommt.

---

## 7. Empfohlene Reihenfolge

1. **[P0] `/impeccable layout`** – Klassenkollision `.gallery-grid` / `.gallery-item` auflösen,
   Galerie-Masonry reparieren.
2. **[P0] `/impeccable optimize`** – Bild-Pipeline (WebP/AVIF, `srcset`, lazy, Maße),
   HEIC/MP4 aus `public/` entfernen.
3. **[P1] `/impeccable adapt`** – Service-Landingpages auf das Hauptsystem ziehen;
   Tap-Flächen auf ≥ 44 px.
4. **[P1] `/impeccable colorize`** – Kontrastfehler bei Badges und Cookie-Banner beheben.
5. **[P1] `/impeccable animate`** – `MotionConfig reducedMotion="user"`, globalen
   `0.01ms`-Kill ersetzen.
6. **[P1] `/impeccable harden`** – Überschriftenhierarchie, `aria-expanded`,
   Inhalte von Scroll-Triggern entkoppeln.
7. **[P2] `/impeccable typeset`** – Formularschriften, Zeilenlängen.
8. **[P2] `/impeccable distill`** – Kicker und Eyebrow-Chips entfernen.
9. **[P2] `/impeccable polish`** – 212-px-Icon, ungleiche Kartenhöhen, Footer-E-Mail,
   Waisenkarte im Vorteils-Raster.

Offen und bewusst nicht als Fehler gelistet, weil es eine Richtungsentscheidung ist:
**der leere Hero und die unkuratierte Fotografie.** Beides ist der größte Hebel für die
Wirkung der Seite und gehört vor der Umsetzung besprochen – nicht wegoptimiert.

---

## 8. Reproduktion

```bash
npm ci && npm run build
npx vite preview --port 4173 --host 127.0.0.1

# Anti-Pattern-Scan (Browser-Engine, Desktop und Mobil)
npx impeccable detect http://127.0.0.1:4173/ http://127.0.0.1:4173/projekte
npx impeccable detect --viewport 390x844 http://127.0.0.1:4173/kontakt

# Quellcode-Scan
npx impeccable detect src
```

Die Impeccable-Skills liegen in `.claude/skills/impeccable/` (Apache 2.0), damit
`/impeccable audit` und `/impeccable critique` auch in Web-Sessions verfügbar sind, in denen
`impeccable.style` durch die Netzwerk-Policy blockiert ist. Lokal genügt sonst
`npx impeccable install`.

Für den URL-Scan wird Puppeteer benötigt (`npm i -D puppeteer`); in der Session-Umgebung
lief es mit `PUPPETEER_EXECUTABLE_PATH=/opt/pw-browsers/chromium` und `CI=1`
(setzt `--no-sandbox`).

---

## 9. Umsetzung und Nachmessung

Alle Empfehlungen aus Abschnitt 7 sind umgesetzt. Drei Punkte wurden vorab mit dem Auftraggeber
entschieden: **Quick Audit** für den SEO-Teil, **Originalfotos bleiben liegen** (es werden nur
optimierte Varianten ausgeliefert) und beim Hero **nur die CTAs** verbessern – die schwarze
Bühne bleibt bewusst wie sie war.

### Vorher / Nachher

| Messgröße | Vorher | Nachher |
|---|---|---|
| Impeccable-Detektor (10 Routen) | 78 Befunde auf 4 Routen | **4 Befunde**, alle als False Positive nachgewiesen |
| Kontrastfehler unter WCAG AA | 3 reale (Badge, Cookie-Banner ×2) | **0** über 10 Routen × 2 Viewports |
| Übersprungene Überschriftenebenen | 3 (`/`, `/projekte`, `/kontakt`) | **0** |
| Bildgewicht `/projekte` | 27,89 MB | **0,50 MB** (−98 %) |
| Bildgewicht `/galerie` | 10,68 MB | **1,95 MB** (−82 %) |
| Bildgewicht `/` | 5,71 MB | **0,55 MB** (−90 %) |
| Größtes Einzelbild | 12,15 MB (`IMG_6200.PNG`) | 400/800/1600-px-WebP, größte Variante < 250 KB |
| `<img>` mit `loading="lazy"` | 1 von 12 | alle über `ResponsiveImage` bzw. explizit |
| Tap-Ziele < 44 px | Footer 17 px, Hero 24 px, Burger 40 px, Telefon 22 px | nur noch Inline-Links im Fließtext (nach WCAG 2.5.5 ausgenommen) |
| Schriftsystem | System-Stack als Body-Schrift, Landingpages ohne Markenschrift | Manrope als Body-Schrift, Cormorant für Überschriften, überall |
| SEO / GEO / AEO | 7 / 7 / 6 von 10 | **8 / 8 / 8** von 10 |

### Was konkret geändert wurde

**P0 – Galerie**
`.gallery-grid` / `.gallery-item` in `Home.css` heißen jetzt `.home-gallery-*`. Damit greift das
`column-count: 4`-Masonry aus `Gallery.css` wieder, die Bilder sind nicht mehr 98 px breit und
erben kein Zwangs-Grayscale.

**P0 – Bild-Pipeline**
Neu: `scripts/optimize-images.mjs` (läuft als erster Schritt von `npm run build`) erzeugt aus
115 referenzierten Quellbildern 400/800/1600-px-WebP-Varianten nach `public/images-opt`
(gitignored, 31 MB) und schreibt `src/data/imageManifest.json`. Die neue Komponente
`src/components/ResponsiveImage.tsx` liefert daraus `srcset`/`sizes` samt `width`/`height`
gegen Layout-Shift; `src/components/imageSources.ts` stellt `optimized()` für Modals und
Lightbox bereit, die keine Komponente einsetzen können. Zusätzlich entsteht ein
1200×630-`og-default.jpg` für Social Previews. Die Originale bleiben unangetastet.

**P1 – Leistungsseiten**
`ServiceLanding.css` ist neu geschrieben: dunkle Bühne, Cormorant/Manrope, Tokens, Akzentfarbe
pro Leistung über `--service-accent`, Zeilenlänge 68ch, `text-shadow` entfernt, Kicker weg,
CTA-Reihe mit Click-to-Call, Abschnitt „Weitere Leistungen" für interne Verlinkung.

**P1 – Barrierefreiheit**
`<MotionConfig reducedMotion="user">` in `App.tsx`; der globale `0.01ms`-Kill in `index.css` ist
durch gezielte Regeln ersetzt, die Bewegung entfernen und Farb-/Opacity-Feedback erhalten.
`CounterBox` zeigt bei reduzierter Bewegung direkt den Endwert und nutzt statt `<h3>` ein
`<p>` (das war der `h1→h3`-Sprung). Burger-Button mit `aria-expanded`/`aria-controls` und
44 × 44 px. Badge-Kontrast über dunkle Schrift auf hellem Grün (9,26:1); Cookie-Banner läuft im
dunklen System statt als helle Insel. Braun und Steingrau haben aufgehellte Varianten für
dunkle Flächen (`--lauffer-brown-on-dark` 6,49:1, `--lauffer-stone-on-dark` 8,45:1).

**P1 – Icon-Bug und Hero**
`.email-apply-btn svg` bekommt 20 × 20 px (rendern vorher 212 × 212 px); alle Icons liegen jetzt
in `src/components/Icons.tsx` und bringen intrinsische Maße mit. Der Hero hat drei echte
Buttons ab 48 px Höhe – „Projekt anfragen", Click-to-Call und „Unsere Arbeiten" – sowie das
sichtbare Google-Rating.

**P2/P3**
Kicker auf allen sechs Seiten entfernt und durch eine Akzentlinie an der Überschrift ersetzt.
Beschreibungsspalte der Expertise-Liste sitzt im eigenen Rasterfeld statt rechtsbündig in einer
400-px-Box. Hover verschiebt per `transform` statt `padding` (kein Reflow, kein
`transition: all`). Formularfelder erben Manrope (die Textarea rendelte in Monospace).
Footer-E-Mail ist ein echter `mailto:`-Link statt „info(@)lauffer-bau.de", dazu Adresse und
Öffnungszeiten. Zentrierter Fließtext auf `/karriere` linksbündig, Vorteilsraster ohne
Waisenkarte, Projektkarten gleich hoch, `side-tab`-Kanten und `gradient-text` entfernt,
Bounce-Easing durch ease-out-quart ersetzt.

**Aufgeräumt**
`src/data/teamData.json` enthielt drei Platzhalter-Personen („Max Mustermann", „Anna Schmidt",
„Thomas Weber") mit erfundenen E-Mail-Adressen und war nirgends eingebunden – gelöscht.
`public/sitemap.xml` ebenfalls gelöscht, weil die Sitemap jetzt beim Build generiert wird.

### SEO / GEO / AEO

Der Quick Audit steckt vollständig in `docs/seo-audit-lauffer-bau-de-2026-07-30.pdf` (und als
`.docx`). Umgesetzt wurden:

- **`aggregateRating` sichtbar gemacht** – die Bewertung stand nur im Markup, nicht auf der
  Seite. Das verstößt gegen die Google-Richtlinie für Rezensions-Rich-Results. Jetzt steht
  „4,8 von 5 aus 16 Google-Bewertungen" im Hero und verlinkt auf das Google-Profil.
- **FAQ auf der Startseite** (`faqData.allgemein`) sichtbar und als `FAQPage`-Schema.
- **`speakable`** (SpeakableSpecification) auf H1, Lead und FAQ.
- **Präzisere Seitentypen:** `ContactPage`, `AboutPage`, `CollectionPage` statt durchgängig
  `WebPage`; neu `Person`-Schema auf `/team` (E-E-A-T).
- **`Organization` angereichert:** `legalName`, `knowsAbout`, `contactPoint`.
- **H1 im Prerender:** stand vorher der komplette SEO-Title; jetzt eine natürliche Überschrift
  aus dem neuen Feld `h1` in `crawlOutline.json`.
- **Sitemap** wird beim Build erzeugt, mit `lastmod`, ohne die `noindex`-Seiten.
- **`robots.txt`** erlaubt GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot und
  Google-Extended ausdrücklich.
- **`llms.txt`** um Öffnungszeiten, FAQ-Antworten und Bewertungsangabe ergänzt.
- **NAP aus einer Quelle:** `src/seo/business.ts` versorgt Seiten, Footer und Schema – vorher
  gab es zwei Telefon-Schreibweisen.
- **Interne Verlinkung:** Projektkarte → Leistungsseite, Leistungsseite → andere Leistungen,
  Startseite → Projektseite, Footer um Projekte und Karriere erweitert.
- **`og:image`** ist ein eigens erzeugtes 1200×630-Bild (vorher ein 4:3-Foto mit falsch
  deklarierten Maßen).

### Verbleibende 4 Detektor-Meldungen – alle geprüft

| Meldung | Prüfung |
|---|---|
| `low-contrast` „Standort-Berechtigung" und der Folgesatz im Cookie-Banner (1,0:1 / 1,5:1) | **False Positive.** Real gemessen mit Alpha-Komposition über allen Vorfahren: 7,79:1 und 6,59:1. Der Detektor kann `rgba()`-Text über getönten Flächen nicht auflösen. |
| `low-contrast` „Projekte" auf `/` (pixel 1,6:1, median 5,1:1) | **False Positive.** Gemessen während der Einblend-Animation der CounterBox; im Endzustand liegt der Wert deutlich über 4,5:1. |
| `line-length` `/karriere` ~149 Zeichen | **False Positive.** Gemessen wird die zentrierte Copyright-Zeile im Footer – der Text darin hat 60 Zeichen in einem 1216 px breiten Kasten. |

### Was bewusst offen bleibt

- **Der leere Hero und die unkuratierte Fotografie.** Auf Wunsch wurde nur die CTA-Ebene
  verbessert. Eingebrannte „LAUFFER"-Wasserzeichen, Selfies und wechselnde Belichtungen
  bleiben der größte Wirkungshebel – das ist eine inhaltliche Entscheidung, keine technische.
- **Externe Sichtbarkeit.** Google-Unternehmensprofil, Branchenverzeichnisse und Backlinks
  liegen außerhalb der Website und sind laut SEO-Report der größte verbleibende Hebel.
- **Core Web Vitals** lassen sich erst nach dem Deployment real messen: `pagespeed.web.dev`.
- **242 MB Originalfotos** bleiben nach Absprache in `public/images` liegen. Sie werden nicht
  mehr ausgeliefert, vergrößern aber weiterhin das Deployment. Ein späteres Verschieben in
  einen Ordner außerhalb des Builds wäre der nächste Schritt.
