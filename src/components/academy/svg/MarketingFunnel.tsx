"use client"

import { motion } from "framer-motion"

const STAGES = [
  { label: "Awareness", width: 280, color: "#386a58", softColor: "#e5f1ea", count: "10,000", desc: "People discover you" },
  { label: "Interest", width: 230, color: "#2f4f79", softColor: "#e6eef8", count: "3,000", desc: "They want to learn more" },
  { label: "Consideration", width: 180, color: "#a16a1f", softColor: "#f7ecd6", count: "800", desc: "They compare options" },
  { label: "Purchase", width: 130, color: "#a0453f", softColor: "#f7e5e2", count: "200", desc: "They buy from you" },
  { label: "Loyalty", width: 90, color: "#6d28d9", softColor: "#ede9fe", count: "80", desc: "They come back and refer" },
]

export function MarketingFunnel() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-2">
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.label}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div className="w-12 text-right">
              <span className="text-xs font-mono text-editorial-muted">{stage.count}</span>
            </div>
            <div className="flex-1 flex justify-center">
              <motion.div
                className="rounded-full flex items-center justify-center py-2.5 relative overflow-hidden"
                style={{
                  width: `${(stage.width / 280) * 100}%`,
                  backgroundColor: stage.softColor,
                  border: `1.5px solid ${stage.color}30`,
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                {/* Animated shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stage.color}20, transparent)`,
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 4 }}
                />
                <span className="text-xs font-semibold relative z-10" style={{ color: stage.color }}>
                  {stage.label}
                </span>
              </motion.div>
            </div>
            <div className="w-28">
              <span className="text-[10px] text-editorial-muted">{stage.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex items-center justify-center gap-2 mt-4 text-[10px] text-editorial-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <div className="h-px w-8 bg-[rgba(44,49,59,0.12)]" />
        Each stage filters — your job is to optimise the flow
        <div className="h-px w-8 bg-[rgba(44,49,59,0.12)]" />
      </motion.div>
    </div>
  )
}
