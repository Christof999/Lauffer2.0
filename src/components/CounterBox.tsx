import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './CounterBox.css'

interface CounterBoxProps {
  title: string
  targetValue: number
  unit?: string
  delay?: number
}

function CounterBox({ title, targetValue, unit = '', delay = 0 }: CounterBoxProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = targetValue / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentStep++
        if (currentStep >= steps) {
          setCount(targetValue)
          clearInterval(interval)
        } else {
          setCount(Math.floor(increment * currentStep))
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, targetValue, delay])

  return (
    <motion.div
      ref={ref}
      className="counter-box"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <h3 className="counter-title">{title}</h3>
      <div className="counter-value">
        <span className="counter-number">{count.toLocaleString('de-DE')}</span>
        {unit && <span className="counter-unit">{unit}</span>}
      </div>
    </motion.div>
  )
}

export default CounterBox

