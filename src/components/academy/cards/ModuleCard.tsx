"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, CheckCircle2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useProgress } from "@/lib/progress"
import type { Module } from "@/types/curriculum"

const CATEGORY_LABELS: Record<string, string> = {
  foundation: "Foundation",
  channel: "Channel",
  strategy: "Strategy",
  analytics: "Analytics",
  retention: "Retention",
  advanced: "Advanced",
}

interface ModuleCardProps {
  module: Module
  basePath?: string
}

export function ModuleCard({ module, basePath = "/modules" }: ModuleCardProps) {
  const isComingSoon = module.status === "coming-soon"
  const isComplete = useProgress((s) => s.completedModules.includes(module.slug))

  return (
    <Link
      href={isComingSoon ? "#" : `${basePath}/${module.slug}`}
      className={cn("block", isComingSoon && "cursor-default")}
      aria-disabled={isComingSoon}
      tabIndex={isComingSoon ? -1 : undefined}
    >
      <motion.div
        whileHover={isComingSoon ? {} : { scale: 1.02 }}
        whileTap={isComingSoon ? {} : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Card className={cn(
          "relative h-full overflow-hidden transition-colors",
          !isComingSoon && "hover:border-primary/40"
        )}>
          {isComingSoon && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">Coming Soon</span>
              </div>
            </div>
          )}

          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <Badge variant={module.level}>{module.level}</Badge>
                {isComplete && (
                  <Badge className="bg-editorial-green-soft text-editorial-green border-transparent text-[10px]">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" /> Done
                  </Badge>
                )}
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {CATEGORY_LABELS[module.category ?? ""] ?? module.category ?? module.domain ?? ""}
              </span>
            </div>
            <CardTitle className="text-lg">{module.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="line-clamp-2">
              {module.shortSummary}
            </CardDescription>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{module.lessons.length} lesson{module.lessons.length !== 1 ? "s" : ""}</span>
              <span className="text-border">·</span>
              <span>{module.coreConcepts.length} concepts</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
