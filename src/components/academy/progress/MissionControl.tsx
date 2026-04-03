"use client"

import { useMemo, useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  GraduationCap,
  Hammer,
  Layers,
  Wrench,
  Zap,
  ArrowRight,
  Rocket,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProgress, DOMAIN_GROUPS } from "@/lib/progress"
import { MasteryRings } from "./MasteryRings"
import type { Module } from "@/types/curriculum"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DOMAIN_ORDER = ["foundations", "customers", "channels", "analytics", "strategy"] as const
const TOTAL_MODULES = 26
const TOTAL_LESSONS = 26
const TOTAL_PROJECTS = 10
const TOTAL_FRAMEWORKS = 17
const TOTAL_TOOLS = 30

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const, delay: 0.06 * i },
  }),
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSimProgress(): string {
  if (typeof window === "undefined") return "0"
  try {
    const raw = localStorage.getItem("bloom-sim-progress")
    if (!raw) return "0"
    const parsed = JSON.parse(raw)
    if (typeof parsed === "number") return String(parsed)
    if (typeof parsed === "string") return parsed
    if (Array.isArray(parsed)) return String(parsed.length)
    if (parsed && typeof parsed === "object" && "stage" in parsed) return String(parsed.stage)
    return "0"
  } catch {
    return "0"
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatBox({
  icon: Icon,
  label,
  value,
  total,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number | string
  total?: number | string
}) {
  return (
    <div className="flex flex-col items-center text-center rounded-2xl border border-[rgba(44,49,59,0.06)] bg-[rgba(255,255,255,0.55)] px-3 py-3.5 backdrop-blur-md">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-editorial-green/10 text-editorial-green mb-1.5">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <p className="text-lg font-bold font-serif text-editorial-ink leading-tight">
        {value}
        {total !== undefined && (
          <span className="text-xs font-normal text-editorial-muted">/{total}</span>
        )}
      </p>
      <p className="text-[10px] text-editorial-muted uppercase tracking-[0.1em] leading-tight mt-0.5">
        {label}
      </p>
    </div>
  )
}

function DomainBar({
  label,
  color,
  done,
  total,
}: {
  label: string
  color: string
  done: number
  total: number
}) {
  const pct = total > 0 ? (done / total) * 100 : 0
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-editorial-ink">{label}</span>
        <span className="text-editorial-muted">
          {done}/{total} &middot; {Math.round(pct)}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-[rgba(44,49,59,0.06)] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface MissionControlProps {
  modules: Module[]
}

export function MissionControl({ modules }: MissionControlProps) {
  const {
    completedModules,
    completedLessons,
    completedProjects,
    completedFrameworks,
    viewedTools,
  } = useProgress()

  const [simProgress, setSimProgress] = useState("0")

  useEffect(() => {
    setSimProgress(getSimProgress())
  }, [])

  // --- Derived data --------------------------------------------------------

  const domainProgress = useMemo(
    () =>
      DOMAIN_ORDER.map((key) => {
        const group = DOMAIN_GROUPS[key]
        const done = group.modules.filter((m) => completedModules.includes(m)).length
        return { key, label: group.label, color: group.color, done, total: group.modules.length }
      }),
    [completedModules]
  )

  // Find the current / next incomplete module (ordered by original module order)
  const currentModule = useMemo(() => {
    const ordered = [...modules].sort((a, b) => a.order - b.order)
    return ordered.find((m) => !completedModules.includes(m.slug) && m.status === "complete") ?? null
  }, [modules, completedModules])

  // Smart next recommendation
  const recommendation = useMemo(() => {
    if (completedModules.length === 0) {
      return {
        text: "Start with \"What Marketing Actually Is\"",
        href: "/modules/what-marketing-is",
        cta: "Begin your journey",
      }
    }

    if (completedModules.length >= TOTAL_MODULES) {
      const nextProject = modules.length > 0 ? "/projects" : "#"
      return {
        text: "All modules complete! Time to apply your knowledge with hands-on projects.",
        href: nextProject,
        cta: "Explore projects",
      }
    }

    // Suggest next module in the least-complete domain
    const leastComplete = [...domainProgress].sort((a, b) => {
      const aPct = a.total > 0 ? a.done / a.total : 1
      const bPct = b.total > 0 ? b.done / b.total : 1
      return aPct - bPct
    })[0]

    const domainGroup = DOMAIN_GROUPS[leastComplete.key]
    const nextSlug = domainGroup.modules.find((m) => !completedModules.includes(m))
    const nextMod = modules.find((m) => m.slug === nextSlug)

    if (nextMod) {
      return {
        text: `Continue with "${nextMod.title}" in ${leastComplete.label}`,
        href: `/modules/${nextMod.slug}`,
        cta: "Start module",
      }
    }

    return {
      text: "Keep going \u2014 pick up where you left off.",
      href: currentModule ? `/modules/${currentModule.slug}` : "/modules",
      cta: "Continue",
    }
  }, [completedModules, domainProgress, modules, currentModule])

  // Recent activity (last 3 completed items)
  const recentActivity = useMemo(() => {
    const items: { label: string; type: string }[] = []

    // Combine all completed items with their types — most recent last in arrays
    const modItems = completedModules.slice(-3).map((slug) => {
      const mod = modules.find((m) => m.slug === slug)
      return { label: mod?.title ?? slug, type: "Module" }
    })

    const lessonItems = completedLessons.slice(-3).map((slug) => ({
      label: slug.replace(/-/g, " "),
      type: "Lesson",
    }))

    const projectItems = completedProjects.slice(-3).map((slug) => ({
      label: slug.replace(/-/g, " "),
      type: "Project",
    }))

    items.push(...modItems, ...lessonItems, ...projectItems)
    return items.slice(-3).reverse()
  }, [completedModules, completedLessons, completedProjects, modules])

  // --- Render --------------------------------------------------------------

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {/* ── 1. Overall Progress + Mastery Rings ─────────────────────── */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="md:col-span-2 lg:col-span-1 lg:row-span-2"
      >
        <Card className="h-full">
          <CardHeader>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-editorial-muted">
              Overall Progress
            </p>
            <CardTitle className="text-lg">Mastery Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <MasteryRings size={220} />
            <p className="text-sm text-editorial-muted text-center max-w-[200px]">
              {completedModules.length} of {TOTAL_MODULES} modules mastered
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 2. Current Position ─────────────────────────────────────── */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
        <Card className="h-full">
          <CardHeader>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-editorial-muted">
              Current Position
            </p>
            <CardTitle className="text-lg">
              {currentModule ? currentModule.title : "All modules complete"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentModule ? (
              <>
                <p className="text-sm text-editorial-muted mb-4 line-clamp-2">
                  {currentModule.shortSummary}
                </p>
                <Button asChild>
                  <Link href={`/modules/${currentModule.slug}`}>
                    Continue
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <p className="text-sm text-editorial-muted">
                You have completed every available module. Explore projects to apply what you have
                learned.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 3. Next Recommended Action ──────────────────────────────── */}
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show">
        <Card className="h-full border-editorial-green/20 bg-editorial-green/[0.04]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-editorial-green/10 text-editorial-green">
                <Rocket className="h-3.5 w-3.5" />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-editorial-green">
                Recommended Next
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-editorial-ink mb-4">{recommendation.text}</p>
            <Button size="sm" asChild>
              <Link href={recommendation.href}>
                {recommendation.cta}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 4. Stats Grid ───────────────────────────────────────────── */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="md:col-span-2 lg:col-span-2"
      >
        <Card>
          <CardHeader>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-editorial-muted">
              Your Stats
            </p>
            <CardTitle className="text-lg">Academy Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatBox
                icon={BookOpen}
                label="Modules"
                value={completedModules.length}
                total={TOTAL_MODULES}
              />
              <StatBox
                icon={GraduationCap}
                label="Lessons"
                value={completedLessons.length}
                total={TOTAL_LESSONS}
              />
              <StatBox
                icon={Hammer}
                label="Projects"
                value={completedProjects.length}
                total={TOTAL_PROJECTS}
              />
              <StatBox
                icon={Layers}
                label="Frameworks"
                value={completedFrameworks.length}
                total={TOTAL_FRAMEWORKS}
              />
              <StatBox
                icon={Wrench}
                label="Tools Explored"
                value={viewedTools.length}
                total={TOTAL_TOOLS}
              />
              <StatBox
                icon={Zap}
                label="Simulation Stage"
                value={simProgress}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 5. Domain Breakdown ─────────────────────────────────────── */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="md:col-span-1 lg:col-span-2"
      >
        <Card>
          <CardHeader>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-editorial-muted">
              By Domain
            </p>
            <CardTitle className="text-lg">Domain Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {domainProgress.map((d) => (
              <DomainBar
                key={d.key}
                label={d.label}
                color={d.color}
                done={d.done}
                total={d.total}
              />
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── 6. Recent Activity ──────────────────────────────────────── */}
      <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show">
        <Card className="h-full">
          <CardHeader>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-editorial-muted">
              Recent Activity
            </p>
            <CardTitle className="text-lg">Last Completed</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <ul className="space-y-3">
                {recentActivity.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-editorial-green/10 text-editorial-green">
                      <Clock className="h-3 w-3" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-editorial-ink capitalize truncate">
                        {item.label}
                      </p>
                      <p className="text-[11px] text-editorial-muted">{item.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-editorial-muted">
                No activity yet. Complete a module or lesson to see it here.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
