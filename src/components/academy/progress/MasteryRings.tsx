"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useProgress, DOMAIN_GROUPS } from "@/lib/progress"

/** Domain rendering order: inner ring first (Foundations), outer ring last (Strategy). */
const DOMAIN_ORDER = ["foundations", "customers", "channels", "analytics", "strategy"] as const

interface MasteryRingsProps {
  /** Outer diameter of the ring visualisation in pixels. */
  size?: number
}

export function MasteryRings({ size = 240 }: MasteryRingsProps) {
  const { completedModules } = useProgress()
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null)

  const center = size / 2
  const strokeWidth = size * 0.042 // proportional stroke
  const ringGap = size * 0.038
  const innerRadius = size * 0.14

  // Compute per-domain progress
  const domainData = DOMAIN_ORDER.map((key, index) => {
    const group = DOMAIN_GROUPS[key]
    const total = group.modules.length
    const done = group.modules.filter((m) => completedModules.includes(m)).length
    const pct = total > 0 ? done / total : 0
    const radius = innerRadius + index * (strokeWidth + ringGap)
    const circumference = 2 * Math.PI * radius
    return { key, ...group, total, done, pct, radius, circumference }
  })

  // Overall percentage across all modules
  const totalModules = domainData.reduce((s, d) => s + d.total, 0)
  const totalDone = domainData.reduce((s, d) => s + d.done, 0)
  const overallPct = totalModules > 0 ? Math.round((totalDone / totalModules) * 100) : 0

  const hovered = hoveredDomain ? domainData.find((d) => d.key === hoveredDomain) : null

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        aria-label={`Mastery rings: ${overallPct}% overall completion`}
      >
        {domainData.map((d) => (
          <g key={d.key}>
            {/* Background track */}
            <circle
              cx={center}
              cy={center}
              r={d.radius}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeWidth}
              opacity={0.15}
            />
            {/* Animated fill arc */}
            <motion.circle
              cx={center}
              cy={center}
              r={d.radius}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={d.circumference}
              initial={{ strokeDashoffset: d.circumference }}
              animate={{ strokeDashoffset: d.circumference * (1 - d.pct) }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 * DOMAIN_ORDER.indexOf(d.key as typeof DOMAIN_ORDER[number]) }}
              style={{ filter: `drop-shadow(0 0 4px ${d.color}40)` }}
            />
            {/* Invisible wider hit area for hover */}
            <circle
              cx={center}
              cy={center}
              r={d.radius}
              fill="none"
              stroke="transparent"
              strokeWidth={strokeWidth + ringGap}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredDomain(d.key)}
              onMouseLeave={() => setHoveredDomain(null)}
            />
          </g>
        ))}
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {hovered ? (
          <motion.div
            key={hovered.key}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col items-center text-center px-2"
          >
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: hovered.color }}
            >
              {hovered.label}
            </span>
            <span className="text-xs text-editorial-muted mt-0.5">
              {hovered.done} of {hovered.total} modules
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="overall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-2xl font-bold font-serif text-editorial-ink leading-none">
              {overallPct}%
            </span>
            <span className="text-[10px] text-editorial-muted uppercase tracking-[0.14em] mt-1">
              Mastery
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
