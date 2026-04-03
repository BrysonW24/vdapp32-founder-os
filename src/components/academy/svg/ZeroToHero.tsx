"use client"

import { motion } from "framer-motion"

const STAGES = [
  { label: "Zero", sub: "Starting out", color: "#c4bfb4", x: 30 },
  { label: "Curious", sub: "Asking questions", color: "#386a58", x: 145 },
  { label: "Practising", sub: "First outputs", color: "#2f4f79", x: 275 },
  { label: "Capable", sub: "Running campaigns", color: "#6d28d9", x: 415 },
  { label: "Strategic", sub: "Thinking in systems", color: "#a16a1f", x: 555 },
  { label: "Hero", sub: "Leading marketing", color: "#386a58", x: 680 },
]

export function ZeroToHero() {
  const pathD = "M 30 140 C 100 140, 120 80, 200 90 C 280 100, 300 65, 400 75 C 500 85, 520 45, 600 50 C 650 53, 670 35, 680 30"

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 710 210" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[130, 100, 70, 40, 10].map((y, i) => (
          <line key={y} x1="20" y1={y} x2="690" y2={y} stroke="rgba(44,49,59,0.04)" strokeWidth="0.5" />
        ))}

        {/* Path shadow */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="rgba(56,106,88,0.08)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Main path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#heroGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Dotted path overlay */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1"
          strokeDasharray="3 6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c4bfb4" />
            <stop offset="20%" stopColor="#386a58" />
            <stop offset="40%" stopColor="#2f4f79" />
            <stop offset="60%" stopColor="#6d28d9" />
            <stop offset="80%" stopColor="#a16a1f" />
            <stop offset="100%" stopColor="#386a58" />
          </linearGradient>
        </defs>

        {/* Stage nodes */}
        {STAGES.map((stage, i) => {
          // Calculate y position along the curve
          const t = i / (STAGES.length - 1)
          const y = 140 - t * 110 + Math.sin(t * Math.PI) * 10

          return (
            <motion.g
              key={stage.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.25, type: "spring" }}
            >
              {/* Outer ring */}
              <circle
                cx={stage.x}
                cy={y}
                r={i === 0 ? 10 : i === STAGES.length - 1 ? 14 : 11}
                fill="white"
                stroke={stage.color}
                strokeWidth={i === STAGES.length - 1 ? 2.5 : 1.5}
                strokeOpacity={0.3}
              />
              {/* Inner dot */}
              <circle
                cx={stage.x}
                cy={y}
                r={i === 0 ? 4 : i === STAGES.length - 1 ? 7 : 5}
                fill={stage.color}
                opacity={0.15 + i * 0.17}
              />
              {/* Glow for hero */}
              {i === STAGES.length - 1 && (
                <motion.circle
                  cx={stage.x}
                  cy={y}
                  r={18}
                  fill="none"
                  stroke={stage.color}
                  strokeWidth={1}
                  strokeOpacity={0.2}
                  animate={{ r: [18, 22, 18], strokeOpacity: [0.2, 0.05, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              {/* Label — all below the line */}
              <text
                x={stage.x}
                y={y + 30}
                textAnchor="middle"
                fontSize="24"
                fontWeight="700"
                fill={stage.color}
                fontFamily="serif"
              >
                {stage.label}
              </text>
              <text
                x={stage.x}
                y={y + 46}
                textAnchor="middle"
                fontSize="12"
                fill="#65655f"
              >
                {stage.sub}
              </text>
            </motion.g>
          )
        })}

        {/* Travelling particle */}
        <motion.circle
          r="3"
          fill="#386a58"
          opacity={0.6}
          animate={{
            offsetDistance: ["0%", "100%"],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
          style={{ offsetPath: `path('${pathD}')` }}
        />
      </svg>
    </div>
  )
}
