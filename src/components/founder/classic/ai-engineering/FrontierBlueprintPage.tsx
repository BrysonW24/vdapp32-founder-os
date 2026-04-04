import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Cpu,
  Gauge,
  Layers3,
  Radar,
  ShieldCheck,
  Workflow,
} from "lucide-react"

export const metadata = {
  title: "Frontier Blueprint",
  description:
    "The role blueprint for frontier AI product and platform engineering, with primary responsibilities, specialization tracks, and capstone outcomes.",
}

const ROLE_SHAPE = [
  {
    icon: BrainCircuit,
    title: "Product Layer",
    description:
      "Own AI features that users actually touch: interaction design, model choice, quality bars, and feedback loops.",
  },
  {
    icon: Cpu,
    title: "Platform Layer",
    description:
      "Own the rails behind the feature: deployment, registries, traces, release gates, and internal leverage for the rest of the team.",
  },
  {
    icon: Workflow,
    title: "System Layer",
    description:
      "Tie model calls, retrieval, agents, and services into systems that can survive messy real-world usage.",
  },
]

const STACK = [
  "LLM application design and structured outputs",
  "Evals, regression checks, and reliability gates",
  "Retrieval, ingestion pipelines, and knowledge systems",
  "Agent tool loops with approval boundaries",
  "Inference, observability, and AI FinOps discipline",
  "Product communication across engineering, design, and leadership",
]

const SPECIALIZATIONS = [
  {
    icon: Radar,
    title: "Robotics / Autonomy",
    description:
      "For Tesla- and SpaceX-style directions: perception, hardware acceleration, embedded constraints, and autonomy capstones.",
  },
  {
    icon: Layers3,
    title: "Classical ML",
    description:
      "For builders who want stronger grounding in training data, baselines, and production MLOps for trained models.",
  },
]

const OUTCOMES = [
  {
    icon: Bot,
    title: "Agent With Boundaries",
    description:
      "A supervised tool-using workflow with approval checkpoints, traces, and failure recovery.",
  },
  {
    icon: Gauge,
    title: "Inference Service",
    description:
      "A production-style serving layer with latency instrumentation, observability, and cost visibility.",
  },
  {
    icon: ShieldCheck,
    title: "Eval-Backed Feature",
    description:
      "A user-facing AI product feature that ships with quality gates instead of hope.",
  },
]

export default function FrontierBlueprintPage() {
  return (
    <div className="container py-10 space-y-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted">
          Role Blueprint
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Frontier AI Engineer Academy
        </h1>
        <p className="text-lg text-editorial-muted leading-relaxed max-w-2xl">
          The academy is built around a blended frontier role: product engineer plus
          platform engineer, with enough systems judgment to take research-like
          capability and turn it into something stable, measurable, and useful.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {ROLE_SHAPE.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft mb-3">
                  <Icon className="h-5 w-5 text-editorial-green" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-editorial-muted leading-relaxed">
                {item.description}
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle>The Primary Stack</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {STACK.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-editorial-muted">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-editorial-green shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[rgba(241,236,225,0.45)]">
          <CardHeader>
            <CardTitle>Audience Assumption</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-editorial-muted leading-relaxed">
            <p>
              This academy assumes you already know how to build software. It is not a
              Python-from-zero course.
            </p>
            <p>
              The main path is frontier software AI engineering first, with robotics
              and classical ML kept as secondary specialization tracks.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SPECIALIZATIONS.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title}>
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-blue-soft mb-3">
                  <Icon className="h-5 w-5 text-editorial-blue" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-editorial-muted leading-relaxed">
                {item.description}
              </CardContent>
            </Card>
          )
        })}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Portfolio Outcomes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {OUTCOMES.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title}>
                <CardHeader className="pb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-amber-soft mb-3">
                    <Icon className="h-5 w-5 text-editorial-amber" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-editorial-muted leading-relaxed">
                  {item.description}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl font-serif font-bold text-editorial-ink">
              Move from blueprint to build
            </h2>
            <p className="text-sm text-editorial-muted mt-2">
              The intended sequence is simple: learn the frontier role shape, work the
              core modules, then build capstones that look like real product and platform work.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/ai-engineering/learn/modules">
                Open Modules <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/ai-engineering/projects">View Capstones</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
