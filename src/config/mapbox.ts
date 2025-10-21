// Mapbox Configuration
export const MAPBOX_CONFIG = {
  // Ersetze 'YOUR_MAPBOX_TOKEN' mit deinem echten Mapbox Token
  token: 'pk.eyJ1IjoiY3NvZXJnZWwiLCJhIjoiY21oMG03cmpiMDF6eDJpc2hteGRqdWU1eCJ9.qFkEWSMxyri66cwb_QQWfA', // Ersetze mit deinem Token
  
  // Stil-Optionen für Apple-ähnliche Karten
  styles: {
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
    streets: 'mapbox://styles/mapbox/streets-v12',
    outdoors: 'mapbox://styles/mapbox/outdoors-v12'
  },
  
  // Farben im Lauffer Bau Stil
  colors: {
    primary: '#7AB51D',      // Lauffer Grün
    secondary: '#5A8A15',    // Dunkleres Grün
    marker: '#E74C3C',       // Roter Marker
    route: '#7AB51D',        // Route in Lauffer Grün
    background: '#1A1A1A'    // Dark background
  },
  
  // Animation-Einstellungen
  animation: {
    duration: 1000,
    easing: 'easeInOut',
    routeAnimationSpeed: 2000
  }
}

// Standort-Konfiguration für Lauffer Bau
export const LOCATIONS = {
  // Startpunkt (Ortseingang Wolframs-Eschenbach)
  start: {
    coordinates: [10.7300, 49.2280] as [number, number],
    name: 'Wolframs-Eschenbach',
    description: 'Ortseingang'
  },
  
  // Zielpunkt (Lauffer Bau Standort)
  destination: {
    coordinates: [10.7294, 49.2275] as [number, number],
    name: 'Lauffer Bau',
    description: 'Wolframs-Eschenbach',
    address: 'Waizendorfer Str. 6, 91639 Wolframs-Eschenbach',
    phone: '09875/8129006',
    email: 'info@lauffer-bau.de'
  }
}

// Scroll-Animation Konfiguration
export const SCROLL_CONFIG = {
  // Scroll-Bereiche für verschiedene Animationen
  sections: {
    hero: [0, 0.2],           // Hero-Bereich
    mapIntro: [0.2, 0.4],     // Map-Intro
    routeAnimation: [0.4, 0.7], // Route-Animation
    destination: [0.7, 1.0]   // Ankunft am Ziel
  },
  
  // Kamera-Bewegungen
  camera: {
    startZoom: 14,
    midZoom: 16,
    endZoom: 18,
    startPitch: 0,
    endPitch: 45,
    startBearing: 0,
    endBearing: 0
  }
}
