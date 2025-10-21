import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_CONFIG, LOCATIONS } from '../config/mapbox'

const MapTest: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = MAPBOX_CONFIG.token

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_CONFIG.styles.satellite,
      center: LOCATIONS.start.coordinates,
      zoom: 10,
      pitch: 45,
      bearing: 0
    })

    map.current.on('load', () => {
      if (!map.current) return

      // Add marker for Lauffer Bau
      new mapboxgl.Marker({
        color: '#ff0000',
        scale: 1.2
      })
        .setLngLat(LOCATIONS.destination.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div style="padding: 10px;">
            <strong>${LOCATIONS.destination.name}</strong><br/>
            ${LOCATIONS.destination.address}
          </div>
        `))
        .addTo(map.current)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div 
        ref={mapContainer} 
        style={{ width: '100%', height: '100%' }} 
      />
    </div>
  )
}

export default MapTest
