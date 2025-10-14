import { motion } from 'framer-motion'
import './ProjectsBlueprint.css'

function ProjectsBlueprint() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.6,
      transition: { duration: 2, ease: "easeInOut" }
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.5,
      scale: 1,
      transition: { duration: 0.8 }
    }
  }

  return (
    <div className="projects-blueprint-container">
      <svg className="projects-blueprint-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {/* Grid */}
        <defs>
          <pattern id="projects-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#projects-grid)" />

        {/* Pool - Center Piece */}
        <motion.rect
          x="400"
          y="300"
          width="400"
          height="200"
          rx="20"
          fill="rgba(122,181,29,0.1)"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="3"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        />

        {/* Pool Steps */}
        <motion.g
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <rect x="580" y="300" width="60" height="15" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <rect x="590" y="315" width="40" height="15" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <rect x="600" y="330" width="20" height="15" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        </motion.g>

        {/* Water Ripples */}
        {[450, 550, 650, 750].map((x, i) => (
          <motion.ellipse
            key={i}
            cx={x}
            cy="400"
            rx="40"
            ry="20"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 + i * 0.2 }}
          />
        ))}

        {/* Natursteinmauer Links */}
        <motion.g
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          {/* Mauer Outline */}
          <path
            d="M 100 200 L 300 200 L 300 500 L 100 500 Z"
            fill="rgba(107,62,46,0.1)"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
          />
          
          {/* Steine in der Mauer */}
          {[220, 270, 320, 370, 420, 470].map((y, i) => (
            <g key={i}>
              <rect x="110" y={y} width="80" height="35" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <rect x="195" y={y} width="95" height="35" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            </g>
          ))}
        </motion.g>

        {/* Natursteinmauer Rechts */}
        <motion.g
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 }}
        >
          <path
            d="M 900 200 L 1100 200 L 1100 500 L 900 500 Z"
            fill="rgba(107,62,46,0.1)"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
          />
          
          {[220, 270, 320, 370, 420, 470].map((y, i) => (
            <g key={i}>
              <rect x="910" y={y} width="85" height="35" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <rect x="1000" y={y} width="90" height="35" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            </g>
          ))}
        </motion.g>

        {/* Bäume - Links vorne */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        >
          {/* Stamm */}
          <rect x="180" y="550" width="20" height="80" fill="rgba(107,62,46,0.4)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          {/* Krone */}
          <motion.circle
            cx="190"
            cy="530"
            r="45"
            fill="rgba(122,181,29,0.3)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {/* Innere Details */}
          <circle cx="180" cy="520" r="15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle cx="200" cy="530" r="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </motion.g>

        {/* Bäume - Rechts vorne */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.7 }}
        >
          <rect x="1000" y="550" width="20" height="80" fill="rgba(107,62,46,0.4)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <motion.circle
            cx="1010"
            cy="530"
            r="45"
            fill="rgba(122,181,29,0.3)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <circle cx="1000" cy="520" r="15" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle cx="1020" cy="530" r="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </motion.g>

        {/* Kleinere Bäume Hintergrund */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          <rect x="220" y="140" width="12" height="50" fill="rgba(107,62,46,0.3)" />
          <circle cx="226" cy="130" r="30" fill="rgba(122,181,29,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        </motion.g>

        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.3 }}
        >
          <rect x="960" y="140" width="12" height="50" fill="rgba(107,62,46,0.3)" />
          <circle cx="966" cy="130" r="30" fill="rgba(122,181,29,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        </motion.g>

        {/* Rasen/Lawn Lines */}
        <motion.g
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2 }}
        >
          {[600, 630, 660, 690, 720].map((y, i) => (
            <line
              key={i}
              x1="320"
              y1={y}
              x2="880"
              y2={y}
              stroke="rgba(122,181,29,0.3)"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          ))}
        </motion.g>

        {/* Blumenbeet - Vorne links */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.2 }}
        >
          <ellipse cx="350" cy="600" rx="50" ry="30" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          {/* Kleine Blumen */}
          {[330, 350, 370].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="595" r="6" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={x} y1="595" x2={x} y2="610" stroke="rgba(122,181,29,0.4)" strokeWidth="1.5" />
            </g>
          ))}
        </motion.g>

        {/* Blumenbeet - Vorne rechts */}
        <motion.g
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.3 }}
        >
          <ellipse cx="850" cy="600" rx="50" ry="30" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          {[830, 850, 870].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="595" r="6" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
              <line x1={x} y1="595" x2={x} y2="610" stroke="rgba(122,181,29,0.4)" strokeWidth="1.5" />
            </g>
          ))}
        </motion.g>

        {/* Labels */}
        <motion.text
          x="600"
          y="430"
          fill="rgba(255,255,255,0.4)"
          fontSize="16"
          fontWeight="600"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.5 }}
        >
          POOL
        </motion.text>

        <motion.text
          x="200"
          y="350"
          fill="rgba(255,255,255,0.4)"
          fontSize="12"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.6 }}
        >
          NATURSTEIN
        </motion.text>

        <motion.text
          x="1000"
          y="350"
          fill="rgba(255,255,255,0.4)"
          fontSize="12"
          textAnchor="middle"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.7 }}
        >
          NATURSTEIN
        </motion.text>
      </svg>
    </div>
  )
}

export default ProjectsBlueprint

