"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { GraduationCap, Target, Briefcase, Building2, DollarSign } from "lucide-react"

type Lens = "student" | "marketer" | "cmo" | "ceo" | "cfo"

interface Perspectives {
  marketer?: string
  cmo?: string
  ceo?: string
  cfo?: string
}

interface PerspectiveToggleProps {
  perspectives: Perspectives
  defaultContent: string
}

const LENSES: { id: Lens; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "marketer", label: "Marketer", icon: Target },
  { id: "cmo", label: "CMO", icon: Briefcase },
  { id: "ceo", label: "CEO", icon: Building2 },
  { id: "cfo", label: "CFO", icon: DollarSign },
]

export function PerspectiveToggle({ perspectives, defaultContent }: PerspectiveToggleProps) {
  const [active, setActive] = useState<Lens>("student")

  const availableLenses = LENSES.filter(
    (l) => l.id === "student" || perspectives[l.id as keyof Perspectives]
  )

  const content =
    active === "student"
      ? defaultContent
      : perspectives[active as keyof Perspectives] || defaultContent

  return (
    <div className="space-y-4">
      {/* Toggle bar */}
      <div className="flex flex-wrap gap-1.5 p-1.5 rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.78)] backdrop-blur-[16px]">
        {availableLenses.map((lens) => {
          const Icon = lens.icon
          const isActive = active === lens.id
          return (
            <button
              key={lens.id}
              onClick={() => setActive(lens.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all duration-200",
                isActive
                  ? "bg-editorial-green text-white shadow-sm"
                  : "text-editorial-muted hover:text-editorial-ink hover:bg-white/60"
              )}
            >
              <Icon className="h-3 w-3" />
              <span className="hidden sm:inline">{lens.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content with crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground leading-relaxed whitespace-pre-line"
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
