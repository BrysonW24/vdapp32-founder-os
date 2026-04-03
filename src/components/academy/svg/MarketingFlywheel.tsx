"use client"

import { motion } from "framer-motion"

const SEGMENTS = [
  { label: "Attract", desc: "Draw people in", color: "#386a58", angle: 0 },
  { label: "Engage", desc: "Build relationships", color: "#2f4f79", angle: 72 },
  { label: "Delight", desc: "Exceed expectations", color: "#a16a1f", angle: 144 },
  { label: "Retain", desc: "Keep them coming back", color: "#a0453f", angle: 216 },
  { label: "Refer", desc: "They bring others", color: "#6d28d9", angle: 288 },
]

const CX = 250
const CY = 250
const R = 170

function getPos(angle: number, radius: number = R) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

export function MarketingFlywheel() {
  return (
    <div className="w-full max-w-md mx-auto">
      <svg viewBox="0 0 500 500" className="w-full h-auto" style={{ minHeight: 280 }}>
        {/* Rotating ring */}
        <motion.circle
          cx={CX} cy={CY} r={R}
          fill="none"
          stroke="rgba(44,49,59,0.06)"
          strokeWidth={40}
          strokeDasharray="6 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Arc segments — decorative */}
        {SEGMENTS.map((seg, i) => {
          const startAngle = seg.angle - 90
          const endAngle = startAngle + 60
          const startRad = (startAngle * Math.PI) / 180
          const endRad = (endAngle * Math.PI) / 180
          const x1 = CX + R * Math.cos(startRad)
          const y1 = CY + R * Math.sin(startRad)
          const x2 = CX + R * Math.cos(endRad)
          const y2 = CY + R * Math.sin(endRad)
          return (
            <motion.path
              key={seg.label}
              d={`M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={seg.color}
              strokeWidth={3}
              strokeOpacity={0.3}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
            />
          )
        })}

        {/* Center */}
        <motion.circle
          cx={CX} cy={CY} r={55}
          fill="white"
          stroke="rgba(44,49,59,0.08)"
          strokeWidth={1.5}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        />
        <motion.circle
          cx={CX} cy={CY} r={48}
          fill="#386a58"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
        />
        {/* Spinning arrows in center */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {[0, 120, 240].map((a) => {
            const rad = (a * Math.PI) / 180
            const ex = CX + 22 * Math.cos(rad)
            const ey = CY + 22 * Math.sin(rad)
            return <circle key={a} cx={ex} cy={ey} r={3} fill="white" fillOpacity={0.6} />
          })}
        </motion.g>
        <text x={CX} y={CY - 4} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="serif">
          Growth
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.6)" fontSize="12">
          Flywheel
        </text>

        {/* Segment nodes */}
        {SEGMENTS.map((seg, i) => {
          const p = getPos(seg.angle, R + 2)
          return (
            <motion.g
              key={seg.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1, type: "spring" }}
            >
              <motion.g
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx={p.x} cy={p.y} r={38} fill={`${seg.color}12`} stroke={seg.color} strokeWidth={2} strokeOpacity={0.3} />
                <text x={p.x} y={p.y - 6} textAnchor="middle" dominantBaseline="middle" fill={seg.color} fontSize="18" fontWeight="600" fontFamily="serif">
                  {seg.label}
                </text>
                <text x={p.x} y={p.y + 10} textAnchor="middle" dominantBaseline="middle" fill={seg.color} fontSize="10" fillOpacity={0.6}>
                  {seg.desc}
                </text>
              </motion.g>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
