"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const STAGES = [
  { label: "Lead", width: 280, color: "#386a58", softColor: "#e5f1ea", count: "1,000", desc: "New leads enter the pipeline" },
  { label: "Qualified", width: 230, color: "#2f4f79", softColor: "#e6eef8", count: "400", desc: "Confirmed fit and budget" },
  { label: "Discovery", width: 180, color: "#a16a1f", softColor: "#f7ecd6", count: "200", desc: "Pain uncovered, urgency built" },
  { label: "Proposal", width: 140, color: "#6d28d9", softColor: "#ede9fe", count: "100", desc: "Solution and pricing presented" },
  { label: "Negotiation", width: 100, color: "#a0453f", softColor: "#f7e5e2", count: "60", desc: "Terms and objections resolved" },
  {
    label: "Closed Won",
    width: 86,
    minWidth: 86,
    circular: true,
    color: "#386a58",
    softColor: "#e5f1ea",
    count: "30",
    desc: "Deal signed and revenue booked",
  },
]

export function SalesPipeline() {
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
                className={cn(
                  "rounded-full flex items-center justify-center px-3 py-2.5 relative overflow-hidden",
                  stage.circular && "aspect-square min-h-[5.25rem] px-2 py-0"
                )}
                style={{
                  width: `${(stage.width / 280) * 100}%`,
                  minWidth: stage.minWidth ? `${stage.minWidth}px` : undefined,
                  backgroundColor: stage.softColor,
                  border: `1.5px solid ${stage.color}30`,
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${stage.color}20, transparent)`,
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 4 }}
                />
                {stage.circular ? (
                  <span
                    className="text-[11px] font-semibold leading-tight text-center relative z-10"
                    style={{ color: stage.color }}
                  >
                    Closed
                    <br />
                    Won
                  </span>
                ) : (
                  <span
                    className="text-xs font-semibold relative z-10 text-center"
                    style={{ color: stage.color }}
                  >
                    {stage.label}
                  </span>
                )}
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
        Each stage filters — your job is to advance the right deals
        <div className="h-px w-8 bg-[rgba(44,49,59,0.12)]" />
      </motion.div>
    </div>
  )
}
