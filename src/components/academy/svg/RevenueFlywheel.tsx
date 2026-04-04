"use client"

import { motion } from "framer-motion"

const SEGMENTS = [
  { label: "Prospect", desc: "Find new buyers", color: "#386a58", angle: 0 },
  { label: "Qualify", desc: "Confirm the fit", color: "#2f4f79", angle: 60 },
  { label: "Win", desc: "Close the deal", color: "#a16a1f", angle: 120 },
  { label: "Deliver", desc: "Exceed expectations", color: "#a0453f", angle: 180 },
  { label: "Expand", desc: "Grow the account", color: "#6d28d9", angle: 240 },
  { label: "Refer", desc: "They bring others", color: "#2563eb", angle: 300 },
]

const CX = 250
const CY = 250
const R = 170

function getPos(angle: number, radius: number = R) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) }
}

export function RevenueFlywheel() {
  return (
    <div className="w-full max-w-[280px] sm:max-w-sm mx-auto">
      <svg viewBox="0 0 500 500" className="w-full h-auto" style={{ minHeight: 200 }}>
        <motion.circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="rgba(44,49,59,0.06)"
          strokeWidth={40}
          strokeDasharray="6 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {SEGMENTS.map((seg, i) => {
          const startAngle = seg.angle - 90
          const endAngle = startAngle + 50
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

        <motion.circle
          cx={CX}
          cy={CY}
          r={55}
          fill="white"
          stroke="rgba(44,49,59,0.08)"
          strokeWidth={1}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        />
        <motion.circle
          cx={CX}
          cy={CY}
          r={48}
          fill="#386a58"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
        />
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {[0, 120, 240].map((a) => {
            const rad = (a * Math.PI) / 180
            const ex = CX + 14 * Math.cos(rad)
            const ey = CY + 14 * Math.sin(rad)
            return <circle key={a} cx={ex} cy={ey} r={2} fill="white" fillOpacity={0.6} />
          })}
        </motion.g>
        <text x={CX} y={CY - 2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="serif">
          Revenue
        </text>
        <text x={CX} y={CY + 8} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
          Flywheel
        </text>

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
                <circle cx={p.x} cy={p.y} r={38} fill={`${seg.color}12`} stroke={seg.color} strokeWidth={1.5} strokeOpacity={0.3} />
                <text x={p.x} y={p.y - 4} textAnchor="middle" dominantBaseline="middle" fill={seg.color} fontSize="18" fontWeight="600" fontFamily="serif">
                  {seg.label}
                </text>
                <text x={p.x} y={p.y + 5} textAnchor="middle" dominantBaseline="middle" fill={seg.color} fontSize="10" fillOpacity={0.6}>
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
