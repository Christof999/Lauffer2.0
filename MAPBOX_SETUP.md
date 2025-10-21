# Mapbox Integration Setup

## 🗺️ Animierte 3D-Karte mit Mapbox GL JS

Diese Implementierung erstellt eine Apple-ähnliche animierte 3D-Karte mit scroll-basierter Animation.

## 📋 Voraussetzungen

1. **Mapbox Account**: Du benötigst einen Mapbox-Account
2. **Access Token**: Einen Mapbox Access Token (Public Token)

## ⚙️ Setup

### 1. Mapbox Token konfigurieren

Öffne `src/config/mapbox.ts` und ersetze den Beispiel-Token:

```typescript
export const MAPBOX_CONFIG = {
  token: 'pk.eyJ1IjoiYOUR_ACTUAL_TOKEN_HERE', // <-- Hier deinen echten Token einfügen
  // ... rest der Konfiguration
}
```

### 2. Standorte anpassen

Die Standorte sind bereits für Lauffer Bau konfiguriert:

- **Startpunkt**: Ansbach (10.7515, 49.7915)
- **Zielpunkt**: Wolframs-Eschenbach (10.7294, 49.2275)

Du kannst diese in `src/config/mapbox.ts` anpassen:

```typescript
export const LOCATIONS = {
  start: {
    coordinates: [10.7515, 49.7915] as [number, number],
    name: 'Ansbach',
    description: 'Startpunkt der Reise'
  },
  destination: {
    coordinates: [10.7294, 49.2275] as [number, number],
    name: 'Lauffer Bau',
    description: 'Wolframs-Eschenbach',
    address: 'Waizendorfer Str. 6, 91639 Wolframs-Eschenbach',
    phone: '09875/8129006',
    email: 'info@lauffer-bau.de'
  }
}
```

## 🎯 Features

### ✨ Animationen
- **Scroll-basierte Kamerabewegung**: Zoom, Pitch und Rotation
- **Route-Animation**: Blaue Route wird beim Scrollen gezeichnet
- **Marker-Animation**: Roter Marker am Zielpunkt
- **Smooth Transitions**: Flüssige Übergänge zwischen Animationen

### 🎨 Design
- **Apple-ähnlicher Stil**: Satellite Streets Style
- **3D-Effekte**: Pitch und Bearing für 3D-Perspektive
- **Responsive Design**: Funktioniert auf allen Geräten
- **Loading States**: Elegante Ladeanimationen

## 🚀 Verwendung

### Navigation
Die Karte ist über die Navigation unter "Standort" erreichbar: `/map-demo`

### Komponente verwenden
```tsx
import AnimatedMap from '../components/AnimatedMap'

<AnimatedMap
  mapboxToken="your_token_here"
  startLocation={[lng1, lat1]}
  endLocation={[lng2, lat2]}
  companyName="Firmenname"
  containerRef={containerRef}
/>
```

## 🎛️ Anpassungen

### Stil ändern
```typescript
// In src/config/mapbox.ts
styles: {
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
  streets: 'mapbox://styles/mapbox/streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12'
}
```

### Animation-Geschwindigkeit
```typescript
animation: {
  duration: 1000,        // Animation-Dauer in ms
  easing: 'easeInOut',   // Easing-Funktion
  routeAnimationSpeed: 2000  // Route-Animation-Geschwindigkeit
}
```

### Scroll-Bereiche
```typescript
sections: {
  hero: [0, 0.2],           // Hero-Bereich
  mapIntro: [0.2, 0.4],     // Map-Intro
  routeAnimation: [0.4, 0.7], // Route-Animation
  destination: [0.7, 1.0]   // Ankunft am Ziel
}
```

## 🔧 Troubleshooting

### Token-Probleme
- Stelle sicher, dass dein Mapbox Token gültig ist
- Überprüfe die Token-Berechtigungen
- Teste den Token in der Mapbox-Dokumentation

### Performance
- Die Karte lädt beim ersten Mal möglicherweise langsam
- Verwende den Production Build für bessere Performance
- Optimiere die Scroll-Bereiche für deine Inhalte

### Browser-Kompatibilität
- WebGL wird benötigt
- Moderne Browser werden empfohlen
- Fallback für ältere Browser implementiert

## 📱 Responsive Design

Die Karte passt sich automatisch an verschiedene Bildschirmgrößen an:
- **Desktop**: Vollständige 3D-Animation
- **Tablet**: Optimierte Animation
- **Mobile**: Vereinfachte Animation

## 🎨 Customization

### Farben anpassen
```typescript
colors: {
  primary: '#007AFF',      // Apple Blue
  secondary: '#00D4FF',    // Light Blue
  marker: '#FF0000',       // Red marker
  route: '#007AFF',        // Route color
  background: '#1A1A1A'    // Dark background
}
```

### Marker-Styling
Der rote Marker kann in der `AnimatedMap.tsx` angepasst werden:
```typescript
const marker = new mapboxgl.Marker({
  color: '#ff0000',
  scale: 1.2
})
```

## 🚀 Deployment

1. Stelle sicher, dass dein Mapbox Token öffentlich ist
2. Teste die Karte in der Production-Umgebung
3. Überprüfe die Performance auf verschiedenen Geräten

## 📞 Support

Bei Fragen zur Implementierung oder Anpassungen stehe ich gerne zur Verfügung!
