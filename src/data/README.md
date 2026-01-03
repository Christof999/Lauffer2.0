# Daten-Verwaltung

## Ordnerstruktur

```
public/images/
├── gallery/      # Galerie-Bilder
├── team/         # Team-Mitarbeiter Fotos
└── projects/     # Projekt-Bilder

src/data/
├── galleryData.json   # Galerie-Daten
├── teamData.json      # Team-Daten
└── projectsData.json  # Projekt-Daten
```

## So fügen Sie neue Inhalte hinzu:

### 1. Galerie-Bilder
1. Bild in `public/images/gallery/` hochladen
2. `src/data/galleryData.json` bearbeiten:
```json
{
  "id": 4,
  "title": "Ihr Projekt-Titel",
  "description": "Beschreibung des Projekts",
  "category": "gartenbau|erdbau|naturstein",
  "image": "/images/gallery/ihr-bild.jpg",
  "date": "2024-12-01"
}
```

### 2. Team-Mitarbeiter
1. Foto in `public/images/team/` hochladen
2. `src/data/teamData.json` bearbeiten:
```json
{
  "id": 4,
  "name": "Name des Mitarbeiters",
  "position": "Position",
  "description": "Kurze Beschreibung",
  "image": "/images/team/name.jpg",
  "email": "email@lauffer-bau.de",
  "phone": "09875/8129006"
}
```

### 3. Projekte
1. Bilder in `public/images/projects/` hochladen
2. `src/data/projectsData.json` bearbeiten:
```json
{
  "id": 4,
  "title": "Projekt-Titel",
  "category": "Gartenbau|Erdbau|Natursteinhandel",
  "location": "Ort",
  "date": "Monat Jahr",
  "description": "Ausführliche Beschreibung",
  "image": "/images/projects/projekt-haupt.jpg",
  "detailImages": [
    "/images/projects/projekt-detail1.jpg",
    "/images/projects/projekt-detail2.jpg"
  ],
  "features": ["Feature 1", "Feature 2"],
  "duration": "X Wochen",
  "size": "XXXm²"
}
```

## Bildformate & Größen

### Empfohlene Bildgrößen:
- **Galerie**: 1920x1080px (16:9)
- **Team-Fotos**: 800x800px (quadratisch)
- **Projekt-Hauptbild**: 1920x1080px (16:9)
- **Projekt-Details**: 1200x800px

### Dateiformate:
- JPG (empfohlen für Fotos)
- PNG (für Logos/transparente Bilder)
- WebP (beste Kompression, wird automatisch konvertiert)

### Dateinamen:
- Kleinbuchstaben
- Keine Leerzeichen (nutzen Sie `-` oder `_`)
- Beispiele: `projekt-garten-mueller.jpg`, `team-max-mustermann.jpg`

## Nach Änderungen:

```bash
git add .
git commit -m "Neue Bilder und Daten hinzugefügt"
git push
```

Vercel deployed automatisch die neue Version!

