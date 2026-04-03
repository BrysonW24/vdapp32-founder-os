"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LEVEL_OPTIONS = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "foundation", label: "Foundation" },
  { value: "channel", label: "Channel" },
  { value: "strategy", label: "Strategy" },
  { value: "analytics", label: "Analytics" },
  { value: "retention", label: "Retention" },
  { value: "advanced", label: "Advanced" },
] as const

interface ModuleFilterProps {
  activeLevel: string
  activeCategory: string
  onFilterChange: (filters: { level: string; category: string }) => void
}

export function ModuleFilter({ activeLevel, activeCategory, onFilterChange }: ModuleFilterProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {LEVEL_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={activeLevel === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange({ level: option.value, category: activeCategory })}
            className={cn(
              "text-[11px] px-2.5 h-7",
              activeLevel === option.value && "shadow-sm"
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1">
        {CATEGORY_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={activeCategory === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange({ level: activeLevel, category: option.value })}
            className={cn(
              "text-[11px] px-2.5 h-7",
              activeCategory === option.value && "shadow-sm"
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
