import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_CONFIG } from '../config/mapbox'
import './AnimatedMap.css'

interface AnimatedMapProps {
  mapboxToken: string
  startLocation: [number, number]
  endLocation: [number, number]
  companyName: string
  containerRef: React.RefObject<HTMLElement>
}

const AnimatedMap: React.FC<AnimatedMapProps> = ({
  mapboxToken,
  startLocation,
  endLocation,
  companyName,
  containerRef
}) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Transform scroll progress to map animation values
  const mapRotation = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0])
  const mapPitch = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 45])
  const mapZoom = useTransform(scrollYProgress, [0, 0.5, 1], [14, 16, 18])

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    mapboxgl.accessToken = mapboxToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12', // Apple-like satellite style
      center: endLocation,
      zoom: 14,
      pitch: 0,
      bearing: 0,
      antialias: true,
      projection: 'globe'
    })

    map.current.on('load', () => {
      if (!map.current) return

      // Add company marker
      new mapboxgl.Marker({
        color: MAPBOX_CONFIG.colors.marker,
        scale: 1.2
      })
        .setLngLat(endLocation)
        .setPopup(new mapboxgl.Popup().setHTML(`<div class="company-popup"><strong>${companyName}</strong></div>`))
        .addTo(map.current)

      // No route - just show the location

      setIsLoaded(true)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [mapboxToken, startLocation, endLocation, companyName])

  // Animate map based on scroll
  useEffect(() => {
    if (!map.current || !isLoaded) return

    const unsubscribeRotation = mapRotation.on('change', (value) => {
      if (map.current) {
        map.current.setBearing(value)
      }
    })

    const unsubscribePitch = mapPitch.on('change', (value) => {
      if (map.current) {
        map.current.setPitch(value)
      }
    })

    const unsubscribeZoom = mapZoom.on('change', (value) => {
      if (map.current) {
        map.current.setZoom(value)
      }
    })

    return () => {
      unsubscribeRotation()
      unsubscribePitch()
      unsubscribeZoom()
    }
  }, [mapRotation, mapPitch, mapZoom, isLoaded])

  // Simple camera animation - just focus on destination
  useEffect(() => {
    if (!map.current || !isLoaded) return

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (!map.current) return

      // Keep camera focused on destination with smooth zoom
      if (progress > 0.5) {
        map.current.easeTo({
          center: endLocation,
          duration: 0
        })
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, isLoaded, endLocation])

  return (
    <motion.div
      className="animated-map-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div ref={mapContainer} className="map-container" />
      
      {/* Loading overlay */}
      {!isLoaded && (
        <motion.div
          className="map-loading"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <div className="loading-spinner" />
          <p>Karte wird geladen...</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default AnimatedMap
