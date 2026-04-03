"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Clock,
  Shield,
  Swords,
  Trophy,
  ChevronRight,
  CheckCircle2,
  Wrench,
  Sparkles,
  Crown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useProgress } from "@/lib/progress"
import type { Project } from "@/types/curriculum"

interface QuestBoardProps {
  projects: Project[]
}

function getDifficultyColor(difficulty: number) {
  if (difficulty <= 3) return { bg: "bg-emerald-500", text: "text-emerald-700", soft: "bg-emerald-50 border-emerald-200 text-emerald-700" }
  if (difficulty <= 6) return { bg: "bg-amber-500", text: "text-amber-700", soft: "bg-amber-50 border-amber-200 text-amber-700" }
  if (difficulty <= 9) return { bg: "bg-rose-500", text: "text-rose-700", soft: "bg-rose-50 border-rose-200 text-rose-700" }
  return { bg: "bg-yellow-500", text: "text-yellow-700", soft: "bg-yellow-50 border-yellow-400 text-yellow-700" }
}

function getDifficultyLabel(difficulty: number) {
  if (difficulty <= 2) return "Novice"
  if (difficulty <= 4) return "Apprentice"
  if (difficulty <= 6) return "Journeyman"
  if (difficulty <= 8) return "Expert"
  if (difficulty === 9) return "Master"
  return "Legendary"
}

function getDifficultyIcon(difficulty: number) {
  if (difficulty <= 3) return Shield
  if (difficulty <= 6) return Swords
  if (difficulty <= 9) return Trophy
  return Crown
}

type QuestStatus = "not-started" | "completed"

function QuestCard({
  project,
  index,
  status,
}: {
  project: Project
  index: number
  status: QuestStatus
}) {
  const colors = getDifficultyColor(project.difficulty)
  const DiffIcon = getDifficultyIcon(project.difficulty)
  const isCapstone = project.difficulty === 10
  const isCompleted = status === "completed"

  // Staggered offset for the "pinned board" feel
  const offsetY = index % 3 === 0 ? 0 : index % 3 === 1 ? 12 : -8
  const rotate = index % 5 === 0 ? -0.5 : index % 5 === 1 ? 0.4 : index % 5 === 2 ? -0.3 : index % 5 === 3 ? 0.6 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.2, 0.75, 0.2, 1] }}
      style={{ marginTop: offsetY }}
      className={cn(
        isCapstone && "md:col-span-2",
      )}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <div
          className={cn(
            "relative rounded-[22px] border transition-all duration-300 overflow-hidden",
            // Base card style — warm paper texture
            "bg-[#fffdf7] shadow-editorial-soft",
            // Default border
            "border-[rgba(44,49,59,0.08)]",
            // Hover lift
            "group-hover:shadow-editorial-hover group-hover:-translate-y-1",
            // Completed state — green glow
            isCompleted && "border-editorial-green/30 shadow-[0_0_24px_rgba(56,106,88,0.12)]",
            // Capstone special style
            isCapstone && "border-yellow-400/50 bg-gradient-to-br from-[#fffdf7] to-[#fef9e7]",
          )}
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          {/* Completed stamp overlay */}
          {isCompleted && (
            <div className="absolute top-4 right-4 z-10">
              <div className="flex items-center gap-1.5 rounded-full bg-editorial-green/10 border border-editorial-green/20 px-3 py-1.5">
                <CheckCircle2 className="h-4 w-4 text-editorial-green" />
                <span className="text-xs font-semibold text-editorial-green uppercase tracking-wide">
                  Complete
                </span>
              </div>
            </div>
          )}

          {/* Capstone badge */}
          {isCapstone && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400" />
          )}

          <div className={cn("p-6", isCapstone && "p-8")}>
            {/* Top row: difficulty badge + capstone tag */}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
                colors.soft,
              )}>
                <DiffIcon className="h-3.5 w-3.5" />
                <span>{project.difficulty}/10</span>
                <span className="opacity-60">-</span>
                <span>{getDifficultyLabel(project.difficulty)}</span>
              </div>

              {isCapstone && (
                <Badge className="bg-yellow-400/20 border-yellow-400/40 text-yellow-700 text-[10px] uppercase tracking-widest font-bold">
                  <Crown className="h-3 w-3 mr-1" />
                  Capstone
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className={cn(
              "font-serif font-bold text-editorial-ink leading-tight mb-2",
              isCapstone ? "text-2xl" : "text-lg",
            )}>
              {project.title}
            </h3>

            {/* Description — 2 lines max */}
            <p className="text-sm text-editorial-muted leading-relaxed line-clamp-2 mb-4">
              {project.description}
            </p>

            {/* Tools required */}
            {project.tools.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="h-3.5 w-3.5 text-editorial-muted flex-shrink-0" />
                <div className="flex flex-wrap gap-1">
                  {project.tools.slice(0, 5).map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center rounded-md bg-editorial-canvas px-2 py-0.5 text-[11px] text-editorial-muted font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 5 && (
                    <span className="text-[11px] text-editorial-muted">
                      +{project.tools.length - 5}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Skills unlocked */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-editorial-green flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {project.skillsLearned.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full bg-editorial-green-soft px-2 py-0.5 text-[11px] text-editorial-green font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {project.skillsLearned.length > 3 && (
                  <span className="text-[11px] text-editorial-muted">
                    +{project.skillsLearned.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Bottom row: time + action button */}
            <div className="flex items-center justify-between pt-3 border-t border-[rgba(44,49,59,0.06)]">
              <div className="flex items-center gap-1.5 text-xs text-editorial-muted">
                <Clock className="h-3.5 w-3.5" />
                <span>{project.estimatedHours} hour{project.estimatedHours !== 1 ? "s" : ""}</span>
              </div>

              <Button
                variant={isCompleted ? "secondary" : "default"}
                size="sm"
                className={cn(
                  "gap-1.5",
                  isCompleted && "text-editorial-green",
                  isCapstone && !isCompleted && "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-600/20",
                )}
                asChild
              >
                <span>
                  {isCompleted ? (
                    <>
                      Completed
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      Begin Quest
                      <ChevronRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function QuestBoard({ projects }: QuestBoardProps) {
  const { isProjectComplete } = useProgress()

  const sorted = [...projects].sort((a, b) => a.difficulty - b.difficulty)

  const completedCount = sorted.filter((p) => isProjectComplete(p.slug)).length
  const totalCount = sorted.length

  return (
    <div className="space-y-8">
      {/* Board header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-editorial-green/10">
            <Swords className="h-5 w-5 text-editorial-green" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-editorial-muted uppercase tracking-[0.18em]">
              Quest Board
            </h2>
            <p className="text-xs text-editorial-muted">
              {completedCount}/{totalCount} quests completed
            </p>
          </div>
        </div>

        {/* Progress pips */}
        <div className="hidden sm:flex items-center gap-1">
          {sorted.map((p) => (
            <div
              key={p.slug}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                isProjectComplete(p.slug)
                  ? "bg-editorial-green"
                  : "bg-editorial-canvas border border-[rgba(44,49,59,0.1)]"
              )}
            />
          ))}
        </div>
      </div>

      {/* Quest grid — staggered layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sorted.map((project, i) => {
          const status: QuestStatus = isProjectComplete(project.slug) ? "completed" : "not-started"

          return (
            <QuestCard
              key={project.slug}
              project={project}
              index={i}
              status={status}
            />
          )
        })}
      </div>
    </div>
  )
}
