import { motion } from 'framer-motion'
import './AnimatedBlueprint.css'

function AnimatedBlueprint() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.6,
      transition: {
        pathLength: { duration: 3, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.5,
      transition: { duration: 1, delay: 2 }
    }
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.4,
      transition: { duration: 1, delay: 2.5 }
    }
  }

  return (
    <div className="blueprint-container">
      <svg className="blueprint-svg" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
        {/* Grid Lines */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Main House/Building Outline */}
        <motion.rect
          x="50"
          y="50"
          width="200"
          height="150"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        
        {/* Terrace/Deck */}
        <motion.path
          d="M 250 100 L 400 100 L 400 250 L 250 250 Z"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          strokeDasharray="10,5"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        />

        {/* Garden Path - Curved */}
        <motion.path
          d="M 400 175 Q 500 175, 550 250 T 650 400 Q 700 450, 750 450"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="3"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        />

        {/* Garden Path - Second curve */}
        <motion.path
          d="M 400 195 Q 500 195, 550 270 T 650 420 Q 700 470, 750 470"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="3"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.1 }}
        />

        {/* Flower Beds */}
        <motion.ellipse
          cx="500"
          cy="100"
          rx="60"
          ry="40"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        />

        <motion.ellipse
          cx="700"
          cy="300"
          rx="50"
          ry="50"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
        />

        {/* Trees (Circles with cross) */}
        <motion.g variants={circleVariants} initial="hidden" animate="visible">
          <circle cx="150" cy="350" r="30" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
          <line x1="130" y1="350" x2="170" y2="350" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <line x1="150" y1="330" x2="150" y2="370" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        </motion.g>

        <motion.g variants={circleVariants} initial="hidden" animate="visible" transition={{ delay: 2.2 }}>
          <circle cx="350" cy="450" r="35" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
          <line x1="328" y1="450" x2="372" y2="450" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <line x1="350" y1="428" x2="350" y2="472" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        </motion.g>

        <motion.g variants={circleVariants} initial="hidden" animate="visible" transition={{ delay: 2.4 }}>
          <circle cx="850" cy="200" r="40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
          <line x1="825" y1="200" x2="875" y2="200" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <line x1="850" y1="175" x2="850" y2="225" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        </motion.g>

        {/* Stone Wall/Steps */}
        <motion.g
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
        >
          <line x1="100" y1="250" x2="250" y2="250" stroke="rgba(255,255,255,0.6)" strokeWidth="3"/>
          <line x1="100" y1="270" x2="250" y2="270" stroke="rgba(255,255,255,0.6)" strokeWidth="3"/>
          <line x1="100" y1="290" x2="250" y2="290" stroke="rgba(255,255,255,0.6)" strokeWidth="3"/>
        </motion.g>

        {/* Pool/Water Feature */}
        <motion.rect
          x="600"
          y="550"
          width="150"
          height="80"
          rx="10"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2 }}
        />

        {/* Plant Symbols (Small circles) */}
        {[
          { cx: 480, cy: 350, delay: 2.5 },
          { cx: 520, cy: 380, delay: 2.6 },
          { cx: 460, cy: 390, delay: 2.7 },
          { cx: 500, cy: 420, delay: 2.8 },
        ].map((plant, i) => (
          <motion.circle
            key={i}
            cx={plant.cx}
            cy={plant.cy}
            r="8"
            fill="rgba(255,255,255,0.3)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1"
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: plant.delay }}
          />
        ))}

        {/* Measurement Lines */}
        <motion.g
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <line x1="50" y1="230" x2="250" y2="230" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2,2"/>
          <text x="150" y="245" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">6.5m</text>
        </motion.g>

        <motion.g
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.7 }}
        >
          <line x1="270" y1="100" x2="270" y2="250" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2,2"/>
          <text x="285" y="180" fill="rgba(255,255,255,0.4)" fontSize="10">4.2m</text>
        </motion.g>

        {/* Labels */}
        <motion.text
          x="150"
          y="125"
          fill="rgba(255,255,255,0.4)"
          fontSize="12"
          textAnchor="middle"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          GEBÄUDE
        </motion.text>

        <motion.text
          x="325"
          y="175"
          fill="rgba(255,255,255,0.4)"
          fontSize="12"
          textAnchor="middle"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.8 }}
        >
          TERRASSE
        </motion.text>

        <motion.text
          x="675"
          y="590"
          fill="rgba(255,255,255,0.4)"
          fontSize="12"
          textAnchor="middle"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.9 }}
        >
          POOL
        </motion.text>

        <motion.text
          x="150"
          y="380"
          fill="rgba(255,255,255,0.4)"
          fontSize="10"
          textAnchor="middle"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 3 }}
        >
          BAUM
        </motion.text>
      </svg>
    </div>
  )
}

export default AnimatedBlueprint

