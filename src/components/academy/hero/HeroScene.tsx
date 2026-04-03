"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const NODES = [
  { label: "Customer", color: "#386a58", softColor: "#e5f1ea", angle: -90, desc: "Who you serve" },
  { label: "Brand", color: "#6d28d9", softColor: "#ede9fe", angle: -30, desc: "How you're known" },
  { label: "Content", color: "#2f4f79", softColor: "#e6eef8", angle: 30, desc: "What you create" },
  { label: "Paid", color: "#a16a1f", softColor: "#f7ecd6", angle: 90, desc: "How you amplify" },
  { label: "Email", color: "#a0453f", softColor: "#f7e5e2", angle: 150, desc: "How you retain" },
  { label: "Analytics", color: "#2563eb", softColor: "#dbeafe", angle: 210, desc: "How you learn" },
]

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 2], [1, 4], [3, 5],
]

const RADIUS = 145
const CX = 220
const CY = 220

function pos(angle: number, r: number = RADIUS) {
  const rad = (angle * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

// Animated particles along connections
function Particle({ x1, y1, x2, y2, delay, color }: { x1: number; y1: number; x2: number; y2: number; delay: number; color: string }) {
  return (
    <motion.circle
      r={2.5}
      fill={color}
      fillOpacity={0.6}
      initial={{ cx: x1, cy: y1, opacity: 0 }}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
    />
  )
}

export default function HeroScene() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="relative w-full max-w-[440px] sm:max-w-[500px] aspect-square mx-auto">
      <svg viewBox="0 0 440 440" className="w-full h-full" style={{ filter: "drop-shadow(0 20px 40px rgba(87,73,47,0.08))" }}>
        <defs>
          {/* Radial glow for center */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#386a58" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#386a58" stopOpacity="0" />
          </radialGradient>
          {/* Orbit ring gradient */}
          <radialGradient id="orbitRing" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(44,49,59,0.04)" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <motion.circle
          cx={CX} cy={CY} r={200}
          fill="url(#centerGlow)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbit rings */}
        {[90, 145, 195].map((r, i) => (
          <motion.circle
            key={r}
            cx={CX} cy={CY} r={r}
            fill="none"
            stroke="rgba(44,49,59,0.06)"
            strokeWidth={1}
            strokeDasharray="4 8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
          />
        ))}

        {/* Connection lines */}
        {CONNECTIONS.map(([a, b], i) => {
          const p1 = pos(NODES[a].angle)
          const p2 = pos(NODES[b].angle)
          const isHighlighted = hovered === a || hovered === b
          return (
            <g key={`conn-${i}`}>
              <motion.line
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={isHighlighted ? NODES[a].color : "rgba(44,49,59,0.08)"}
                strokeWidth={isHighlighted ? 2 : 1}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.08 }}
              />
              <Particle x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} delay={1 + i * 0.6} color={NODES[a].color} />
            </g>
          )
        })}

        {/* Center hub */}
        <motion.circle
          cx={CX} cy={CY} r={42}
          fill="white"
          stroke="rgba(44,49,59,0.08)"
          strokeWidth={1}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
          style={{ filter: "drop-shadow(0 4px 12px rgba(87,73,47,0.1))" }}
        />
        <motion.circle
          cx={CX} cy={CY} r={36}
          fill="#386a58"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15, type: "spring" }}
        />
        {/* Pulse ring */}
        <motion.circle
          cx={CX} cy={CY} r={42}
          fill="none"
          stroke="#386a58"
          strokeWidth={2}
          animate={{ r: [42, 58, 42], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <text x={CX} y={CY - 4} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="serif">
          Marketing
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.7)" fontSize="7.5" fontWeight="400">
          System
        </text>

        {/* Orbit nodes */}
        {NODES.map((node, i) => {
          const p = pos(node.angle)
          const isHovered = hovered === i
          return (
            <motion.g
              key={node.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1, type: "spring" }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Floating animation */}
              <motion.g
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Soft glow ring */}
                <motion.circle
                  cx={p.x} cy={p.y}
                  r={isHovered ? 38 : 32}
                  fill={node.softColor}
                  stroke={node.color}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeOpacity={isHovered ? 0.5 : 0.2}
                  transition={{ duration: 0.2 }}
                  style={{ filter: isHovered ? `drop-shadow(0 0 12px ${node.color}40)` : "none" }}
                />
                {/* Inner circle */}
                <circle cx={p.x} cy={p.y} r={4} fill={node.color} fillOpacity={0.4} />
                {/* Label */}
                <text x={p.x} y={p.y - 7} textAnchor="middle" dominantBaseline="middle" fill={node.color} fontSize="10" fontWeight="600" fontFamily="serif">
                  {node.label}
                </text>
                <text x={p.x} y={p.y + 6} textAnchor="middle" dominantBaseline="middle" fill={node.color} fontSize="7" fontWeight="400" fillOpacity={0.7}>
                  {node.desc}
                </text>
              </motion.g>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}
