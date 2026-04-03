"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useProgress, DOMAIN_GROUPS } from "@/lib/progress"
import { cn } from "@/lib/utils"

const DOMAINS = [
  { key: "foundations", label: "Foundations", color: "#386a58" },
  { key: "customers", label: "Customers", color: "#6d28d9" },
  { key: "channels", label: "Channels", color: "#2f4f79" },
  { key: "analytics", label: "Analytics", color: "#14b8a6" },
  { key: "strategy", label: "Strategy", color: "#a16a1f" },
] as const

export function ProgressRibbon() {
  const { completedModules } = useProgress()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate completion per domain
  const domainStats = DOMAINS.map((domain) => {
    const group = DOMAIN_GROUPS[domain.key]
    if (!group) return { ...domain, completed: 0, total: 0, ratio: 0 }
    const total = group.modules.length
    const completed = group.modules.filter((m) => completedModules.includes(m)).length
    return { ...domain, completed, total, ratio: total > 0 ? completed / total : 0 }
  })

  const totalModules = domainStats.reduce((sum, d) => sum + d.total, 0)
  const totalCompleted = domainStats.reduce((sum, d) => sum + d.completed, 0)

  // Find the current active domain (first incomplete one)
  const activeDomainIndex = domainStats.findIndex((d) => d.ratio < 1)
  const currentIndex = activeDomainIndex === -1 ? domainStats.length - 1 : activeDomainIndex

  // Don't render anything meaningful on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-full h-[6px] bg-editorial-canvas rounded-full" />
    )
  }

  return (
    <div className="relative w-full group">
      {/* Ribbon bar */}
      <div className="flex w-full h-[6px] rounded-full overflow-hidden bg-editorial-canvas">
        {domainStats.map((domain, i) => {
          const segmentWidth = domain.total / totalModules
          return (
            <div
              key={domain.key}
              className="relative h-full"
              style={{ width: `${segmentWidth * 100}%` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Filled portion */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: domain.color }}
                initial={{ width: "0%" }}
                animate={{ width: `${domain.ratio * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.2, 0.75, 0.2, 1] }}
              />

              {/* Segment divider */}
              {i < domainStats.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/60 z-10" />
              )}

              {/* Hover tooltip */}
              {hoveredIndex === i && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-20 pointer-events-none">
                  <div className="whitespace-nowrap rounded-lg bg-editorial-ink text-white px-3 py-1.5 text-[11px] font-medium shadow-lg">
                    <span style={{ color: domain.color }} className="font-semibold">
                      {domain.label}
                    </span>
                    <span className="opacity-70 ml-1.5">
                      {domain.completed}/{domain.total}
                    </span>
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-editorial-ink" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Current position indicator — glowing dot */}
      {totalCompleted < totalModules && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          style={{
            left: `${
              domainStats
                .slice(0, currentIndex)
                .reduce((sum, d) => sum + (d.total / totalModules) * 100, 0) +
              domainStats[currentIndex].ratio *
                (domainStats[currentIndex].total / totalModules) *
                100
            }%`,
          }}
        >
          <div className="relative">
            <div
              className={cn(
                "w-3 h-3 rounded-full border-2 border-white shadow-md -translate-x-1/2",
              )}
              style={{ backgroundColor: domainStats[currentIndex].color }}
            />
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full -translate-x-1/2"
              style={{ borderColor: domainStats[currentIndex].color }}
              animate={{
                scale: [1, 1.8],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <div
                className="w-3 h-3 rounded-full border"
                style={{ borderColor: domainStats[currentIndex].color }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Labels that appear on hover */}
      <div className="hidden group-hover:flex w-full justify-between mt-1 px-0.5">
        {domainStats.map((domain) => {
          const segmentWidth = domain.total / totalModules
          return (
            <span
              key={domain.key}
              className="text-[9px] text-editorial-muted font-medium text-center truncate"
              style={{ width: `${segmentWidth * 100}%`, color: domain.ratio > 0 ? domain.color : undefined }}
            >
              {domain.label}
            </span>
          )
        })}
      </div>
    </div>
  )
}
