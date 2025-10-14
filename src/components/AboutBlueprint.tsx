import { motion } from 'framer-motion'
import './AboutBlueprint.css'

function AboutBlueprint() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.5,
      transition: { duration: 2.5, ease: "easeInOut" }
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.4,
      scale: 1,
      transition: { duration: 1 }
    }
  }

  return (
    <div className="about-blueprint-container">
      <svg className="about-blueprint-svg" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
        {/* Grid */}
        <defs>
          <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(107,62,46,0.08)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-grid)" />

        {/* Timeline - Horizontal Line */}
        <motion.line
          x1="100"
          y1="400"
          x2="900"
          y2="400"
          stroke="rgba(107,62,46,0.5)"
          strokeWidth="3"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Timeline Points */}
        {[150, 300, 450, 600, 750].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy="400"
            r="8"
            fill="rgba(122,181,29,0.6)"
            stroke="rgba(107,62,46,0.5)"
            strokeWidth="2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 + i * 0.3 }}
          />
        ))}

        {/* Spaten/Shovel Symbol */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <rect x="130" y="250" width="8" height="80" fill="rgba(107,62,46,0.5)" />
          <path d="M 124 330 L 134 350 L 144 330 Z" fill="rgba(107,62,46,0.5)" />
          <ellipse cx="134" cy="240" rx="12" ry="8" fill="rgba(107,62,46,0.4)" />
        </motion.g>

        {/* Pflanze/Sprössling - Growing */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.3 }}
        >
          <motion.path
            d="M 300 350 Q 290 320, 295 300"
            fill="none"
            stroke="rgba(122,181,29,0.6)"
            strokeWidth="3"
            animate={{ d: ["M 300 350 Q 290 320, 295 300", "M 300 350 Q 290 310, 295 280"] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M 300 350 Q 310 320, 305 300"
            fill="none"
            stroke="rgba(122,181,29,0.6)"
            strokeWidth="3"
            animate={{ d: ["M 300 350 Q 310 320, 305 300", "M 300 350 Q 310 310, 305 280"] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
          />
          <line x1="300" y1="340" x2="300" y2="360" stroke="rgba(107,62,46,0.5)" strokeWidth="2" />
        </motion.g>

        {/* Haus/Building Icon */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.6 }}
        >
          <path d="M 430 280 L 450 260 L 470 280 L 470 320 L 430 320 Z" fill="none" stroke="rgba(107,62,46,0.5)" strokeWidth="2" />
          <rect x="442" y="295" width="16" height="25" fill="none" stroke="rgba(107,62,46,0.5)" strokeWidth="1.5" />
          <line x1="450" y1="260" x2="450" y2="250" stroke="rgba(107,62,46,0.5)" strokeWidth="2" />
          <rect x="447" y="245" width="6" height="5" fill="rgba(107,62,46,0.4)" />
        </motion.g>

        {/* Zahnrad/Gear - für Mechanisierung */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.9 }}
        >
          <motion.circle
            cx="600"
            cy="300"
            r="30"
            fill="none"
            stroke="rgba(107,62,46,0.5)"
            strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ originX: "600px", originY: "300px" }}
          />
          <circle cx="600" cy="300" r="18" fill="none" stroke="rgba(107,62,46,0.5)" strokeWidth="2" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const x = 600 + 28 * Math.cos((angle * Math.PI) / 180);
            const y = 300 + 28 * Math.sin((angle * Math.PI) / 180);
            return <rect key={angle} x={x - 3} y={y - 6} width="6" height="12" fill="rgba(107,62,46,0.4)" />;
          })}
        </motion.g>

        {/* Stern/Award Symbol - für Qualität */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.2 }}
        >
          <motion.path
            d="M 750 270 L 760 295 L 787 295 L 765 310 L 775 335 L 750 318 L 725 335 L 735 310 L 713 295 L 740 295 Z"
            fill="rgba(122,181,29,0.4)"
            stroke="rgba(122,181,29,0.6)"
            strokeWidth="2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "750px", originY: "302px" }}
          />
        </motion.g>

        {/* Wurzeln/Roots - unten */}
        <motion.g
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <path d="M 300 400 Q 280 450, 260 500" fill="none" stroke="rgba(107,62,46,0.3)" strokeWidth="2" />
          <path d="M 300 400 Q 320 450, 340 500" fill="none" stroke="rgba(107,62,46,0.3)" strokeWidth="2" />
          <path d="M 300 400 Q 300 460, 290 510" fill="none" stroke="rgba(107,62,46,0.3)" strokeWidth="2" />
        </motion.g>

        {/* Year Labels */}
        <motion.text
          x="150"
          y="440"
          fill="rgba(107,62,46,0.5)"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.5 }}
        >
          2018
        </motion.text>

        <motion.text
          x="300"
          y="440"
          fill="rgba(107,62,46,0.5)"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.6 }}
        >
          2019
        </motion.text>

        <motion.text
          x="450"
          y="440"
          fill="rgba(107,62,46,0.5)"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.7 }}
        >
          2021
        </motion.text>

        <motion.text
          x="600"
          y="440"
          fill="rgba(107,62,46,0.5)"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.8 }}
        >
          2023
        </motion.text>

        <motion.text
          x="750"
          y="440"
          fill="rgba(107,62,46,0.5)"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.9 }}
        >
          HEUTE
        </motion.text>

        {/* "Seit 2018" Large Text */}
        <motion.text
          x="500"
          y="600"
          fill="rgba(122,181,29,0.2)"
          fontSize="80"
          fontWeight="bold"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 3 }}
        >
          Seit 2018
        </motion.text>
      </svg>
    </div>
  )
}

export default AboutBlueprint

