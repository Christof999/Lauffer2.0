# Lauffer Gartenbau · Erdbau · Natursteinhandel

Moderne Website für Lauffer Gartenbau mit React, TypeScript, React Router und Framer Motion.

## 🌟 Features

- **React 18** mit TypeScript
- **React Router** für Navigation
- **Framer Motion** für flüssige Animationen
- **Responsive Design** für alle Geräte
- **Animierte Blueprints** im Hintergrund
- **Counter-Animationen** auf der Startseite
- **Cookie-Banner** mit LocalStorage
- **Modal-Dialoge** für Projektdetails
- **Footer** mit allen wichtigen Links
- **DSGVO-konforme** Impressum & Datenschutz Seiten

## 📄 Seiten

1. **Startseite** - Hero, Counter, Services, Galerie-Vorschau
2. **Über Uns** - Firmengeschichte, Werte, Timeline
3. **Unsere Projekte** - Projektübersicht mit Modal-Details
4. **Unser Team** - 5 Teammitglieder inkl. Bailey 🐕
5. **Galerie** - Bildergalerie (Platzhalter)
6. **Karriere** - Jobs & Bewerbungsformular
7. **Kontakt** - Kontaktformular
8. **Impressum** - Rechtliche Angaben
9. **Datenschutz** - DSGVO-Erklärung

## 🚀 Installation

```bash
npm install
```

## 💻 Entwicklung

```bash
npm run dev
```

Die Seite ist dann unter `http://localhost:5173` erreichbar.

## 🏗️ Build für Production

```bash
npm run build
```

Build-Dateien werden im `dist` Ordner erstellt.

## 🌐 Deployment

Siehe [DEPLOYMENT.md](./DEPLOYMENT.md) für detaillierte Anweisungen.

**Empfohlen:** Vercel (kostenlos, automatisch)
1. Gehe zu [vercel.com](https://vercel.com)
2. Importiere GitHub Repository
3. Deploy!

## 🎨 Farbschema

- Primär-Grün: `#7ab51d`
- Primär-Grau: `#6d7378`
- Primär-Braun: `#6b3e2e`

## 📁 Projekt-Struktur

```
src/
├── components/              # Wiederverwendbare Komponenten
│   ├── Navigation.tsx       # Haupt-Navigation
│   ├── Footer.tsx          # Footer mit Links
│   ├── CookieBanner.tsx    # Cookie-Consent
│   ├── CounterBox.tsx      # Animierte Counter
│   ├── ProjectModal.tsx    # Modal für Projektdetails
│   ├── AnimatedBlueprint.tsx    # Startseiten-Hintergrund
│   ├── AboutBlueprint.tsx       # Über Uns Hintergrund
│   ├── ProjectsBlueprint.tsx    # Projekte Hintergrund
│   └── TeamBlueprint.tsx        # Team Hintergrund
├── pages/                   # Seitenkomponenten
│   ├── Home.tsx            # Startseite
│   ├── About.tsx           # Über Uns
│   ├── Projects.tsx        # Projekte
│   ├── Team.tsx            # Unser Team
│   ├── Gallery.tsx         # Galerie
│   ├── Contact.tsx         # Kontakt
│   ├── Karriere.tsx        # Karriere/Jobs
│   ├── Impressum.tsx       # Impressum
│   └── Datenschutz.tsx     # Datenschutz
├── App.tsx                 # Haupt-App mit Routing
└── main.tsx                # Entry Point
```

## 🛠️ Technologien

- React 18.3
- TypeScript 5.6
- Vite 5.4
- React Router 6.28
- Framer Motion 11.11

## 📝 Anpassungen

### Bilder ändern:
- Lege Bilder in den `public` Ordner
- Referenziere sie mit `/bild.jpg`

### Texte ändern:
- Alle Texte sind direkt in den `.tsx` Dateien
- Suche nach dem Text und ändere ihn

### Farben ändern:
- Öffne `src/index.css`
- Ändere die CSS-Variablen in `:root`

### Team-Mitglieder:
- Öffne `src/pages/Team.tsx`
- Bearbeite das `teamMembers` Array

### Projekte:
- Öffne `src/pages/Projects.tsx`
- Bearbeite das `projects` Array

## 🐕 Besonderheiten

Bailey ist als "Chief Happiness Officer" im Team-Blueprint animiert mit wedelndem Schwanz! 🐾

## 📧 Support

Bei Fragen: info@lauffer-gartenbau.de

---

Erstellt mit ❤️ für Lauffer Gartenbau

