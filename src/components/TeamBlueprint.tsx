import { motion } from 'framer-motion'
import './TeamBlueprint.css'

interface TeamMember {
  x: number
  delay: number
  isDog?: boolean
}

function TeamBlueprint() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 0.4,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.3,
      transition: { duration: 2, ease: "easeInOut" }
    }
  }

  // Person positions for team - 5 members
  const teamMembers: TeamMember[] = [
    { x: 250, delay: 0.3 },
    { x: 425, delay: 0.5 },
    { x: 600, delay: 0.7 },
    { x: 775, delay: 0.9 },
    { x: 950, delay: 1.1, isDog: true }
  ]

  return (
    <div className="team-blueprint-container">
      <svg className="team-blueprint-svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {/* Grid */}
        <defs>
          <pattern id="team-grid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path d="M 35 0 L 0 0 0 35" fill="none" stroke="rgba(107,62,46,0.08)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#team-grid)" />

        {/* Connecting Line between team members */}
        <motion.path
          d="M 250 450 L 425 450 L 600 450 L 775 450 L 950 450"
          stroke="rgba(122,181,29,0.4)"
          strokeWidth="3"
          fill="none"
          variants={drawLine}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        />

        {/* Connection circles under each person */}
        {teamMembers.map((member, i) => (
          <motion.circle
            key={`circle-${i}`}
            cx={member.x}
            cy="450"
            r="8"
            fill="rgba(122,181,29,0.5)"
            stroke="rgba(122,181,29,0.7)"
            strokeWidth="2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: member.delay }}
          />
        ))}

        {/* Team Members - Stylized People */}
        {teamMembers.map((member, i) => (
          <motion.g
            key={`person-${i}`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: member.delay }}
          >
            {member.isDog ? (
              /* Bailey the Dog */
              <>
                {/* Dog Head */}
                <ellipse 
                  cx={member.x} 
                  cy="360" 
                  rx="30" 
                  ry="25" 
                  fill="none" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="2.5" 
                />
                {/* Ears */}
                <ellipse 
                  cx={member.x - 20} 
                  cy="345" 
                  rx="10" 
                  ry="18" 
                  fill="rgba(107,62,46,0.3)" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="1.5" 
                />
                <ellipse 
                  cx={member.x + 20} 
                  cy="345" 
                  rx="10" 
                  ry="18" 
                  fill="rgba(107,62,46,0.3)" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="1.5" 
                />
                {/* Snout */}
                <ellipse 
                  cx={member.x} 
                  cy="370" 
                  rx="15" 
                  ry="10" 
                  fill="rgba(107,62,46,0.2)" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="1.5" 
                />
                {/* Body */}
                <ellipse 
                  cx={member.x} 
                  cy="410" 
                  rx="25" 
                  ry="30" 
                  fill="none" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="2.5" 
                />
                {/* Tail - wagging */}
                <motion.path
                  d={`M ${member.x + 25} 400 Q ${member.x + 40} 390, ${member.x + 45} 380`}
                  fill="none"
                  stroke="rgba(107,62,46,0.5)"
                  strokeWidth="2.5"
                  animate={{ d: [
                    `M ${member.x + 25} 400 Q ${member.x + 40} 390, ${member.x + 45} 380`,
                    `M ${member.x + 25} 400 Q ${member.x + 40} 410, ${member.x + 45} 420`,
                    `M ${member.x + 25} 400 Q ${member.x + 40} 390, ${member.x + 45} 380`
                  ]}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {/* Legs */}
                <line x1={member.x - 15} y1="435" x2={member.x - 15} y2="450" stroke="rgba(107,62,46,0.5)" strokeWidth="2.5" />
                <line x1={member.x - 5} y1="435" x2={member.x - 5} y2="450" stroke="rgba(107,62,46,0.5)" strokeWidth="2.5" />
                <line x1={member.x + 5} y1="435" x2={member.x + 5} y2="450" stroke="rgba(107,62,46,0.5)" strokeWidth="2.5" />
                <line x1={member.x + 15} y1="435" x2={member.x + 15} y2="450" stroke="rgba(107,62,46,0.5)" strokeWidth="2.5" />
              </>
            ) : (
              /* Human Team Member */
              <>
                {/* Head */}
                <circle 
                  cx={member.x} 
                  cy="350" 
                  r="25" 
                  fill="none" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="2.5" 
                />
                
                {/* Body */}
                <line 
                  x1={member.x} 
                  y1="375" 
                  x2={member.x} 
                  y2="430" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="3" 
                />
                
                {/* Arms - Slightly different for variation */}
                <line 
                  x1={member.x} 
                  y1="390" 
                  x2={member.x - 20} 
                  y2={i % 2 === 0 ? 410 : 405} 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="2.5" 
                />
                <line 
                  x1={member.x} 
                  y1="390" 
                  x2={member.x + 20} 
                  y2={i % 2 === 0 ? 410 : 405} 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="2.5" 
                />
                
                {/* Legs */}
                <line 
                  x1={member.x} 
                  y1="430" 
                  x2={member.x - 12} 
                  y2="450" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="2.5" 
                />
                <line 
                  x1={member.x} 
                  y1="430" 
                  x2={member.x + 12} 
                  y2="450" 
                  stroke="rgba(107,62,46,0.5)" 
                  strokeWidth="2.5" 
                />
              </>
            )}

            {/* Tool/Equipment Icons for variety */}
            {i === 0 && (
              <g>
                {/* Helmet on head */}
                <path 
                  d={`M ${member.x - 20} 345 Q ${member.x} 335, ${member.x + 20} 345`}
                  fill="none"
                  stroke="rgba(122,181,29,0.5)"
                  strokeWidth="2"
                />
              </g>
            )}
            
            {i === 2 && (
              <g>
                {/* Spaten/Shovel */}
                <line 
                  x1={member.x + 25} 
                  y1="380" 
                  x2={member.x + 35} 
                  y2="440" 
                  stroke="rgba(107,62,46,0.4)" 
                  strokeWidth="2" 
                />
                <path 
                  d={`M ${member.x + 32} 440 L ${member.x + 38} 448 L ${member.x + 35} 440 Z`}
                  fill="rgba(107,62,46,0.4)"
                />
              </g>
            )}

            {i === 4 && (
              <g>
                {/* Clipboard */}
                <rect 
                  x={member.x - 35} 
                  y="390" 
                  width="15" 
                  height="20" 
                  fill="none" 
                  stroke="rgba(107,62,46,0.4)" 
                  strokeWidth="1.5" 
                />
                <line 
                  x1={member.x - 32} 
                  y1="395" 
                  x2={member.x - 23} 
                  y2="395" 
                  stroke="rgba(107,62,46,0.4)" 
                  strokeWidth="1" 
                />
                <line 
                  x1={member.x - 32} 
                  y1="400" 
                  x2={member.x - 23} 
                  y2="400" 
                  stroke="rgba(107,62,46,0.4)" 
                  strokeWidth="1" 
                />
              </g>
            )}
          </motion.g>
        ))}

        {/* Teamwork Symbol - Circle around all */}
        <motion.circle
          cx="600"
          cy="400"
          r="250"
          fill="none"
          stroke="rgba(122,181,29,0.3)"
          strokeWidth="2"
          strokeDasharray="10,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 3, delay: 1.5 }}
        />

        {/* Connection Lines from circle to people - like a network */}
        {teamMembers.map((member, i) => (
          <motion.line
            key={`connection-${i}`}
            x1="600"
            y1="400"
            x2={member.x}
            y2="370"
            stroke="rgba(122,181,29,0.2)"
            strokeWidth="1"
            strokeDasharray="3,3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
          />
        ))}

        {/* Handshake Symbol in center */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {/* Left Hand */}
          <path
            d="M 565 400 L 580 390 L 585 395 L 590 390 L 595 395 L 590 400"
            fill="none"
            stroke="rgba(107,62,46,0.5)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Right Hand */}
          <path
            d="M 635 400 L 620 390 L 615 395 L 610 390 L 605 395 L 610 400"
            fill="none"
            stroke="rgba(107,62,46,0.5)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Arms */}
          <line x1="565" y1="400" x2="555" y2="410" stroke="rgba(107,62,46,0.5)" strokeWidth="3" />
          <line x1="635" y1="400" x2="645" y2="410" stroke="rgba(107,62,46,0.5)" strokeWidth="3" />
        </motion.g>

        {/* "TEAM + BAILEY" Text */}
        <motion.text
          x="600"
          y="600"
          fill="rgba(122,181,29,0.25)"
          fontSize="85"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          TEAM LAUFFER
        </motion.text>

        {/* Subtitle */}
        <motion.text
          x="600"
          y="640"
          fill="rgba(107,62,46,0.3)"
          fontSize="20"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          ...und Bailey 🐾
        </motion.text>
      </svg>
    </div>
  )
}

export default TeamBlueprint

