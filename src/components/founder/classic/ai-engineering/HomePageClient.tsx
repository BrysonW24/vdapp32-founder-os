"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  Cpu,
  Database,
  Layers3,
  Radar,
  ShieldCheck,
  Workflow,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import HeroScene from "@/components/academy/hero/HeroScene"
import { RolePressureDashboard } from "@/components/academy/home/RolePressureDashboard"

const ROLE_BLEND = [
  {
    icon: BrainCircuit,
    title: "AI Product Engineer",
    description:
      "Own the user-facing layer: eval-backed interaction design, model choice, and feedback loops that improve the feature over time.",
  },
  {
    icon: Cpu,
    title: "AI Platform Engineer",
    description:
      "Build the rails behind the feature: deployment, traces, registries, release gates, and internal tooling that keeps teams shipping.",
  },
  {
    icon: Workflow,
    title: "Research-to-Production Builder",
    description:
      "Translate promising capabilities into real systems with ingestion pipelines, retrieval, tool use, and reliability discipline.",
  },
]

const CORE_MODULES = [
  {
    icon: BookOpen,
    title: "What Frontier AI Engineering Is",
    description: "Get the actual role map before you get lost in tools.",
    href: "/ai-engineering/learn/modules/what-ai-engineering-is",
  },
  {
    icon: Layers3,
    title: "LLM Application Foundations",
    description: "Understand the modern product stack: models, prompts, retrieval, guardrails, and UX.",
    href: "/ai-engineering/learn/modules/llm-engineering",
  },
  {
    icon: ShieldCheck,
    title: "Evals and Reliability",
    description: "Build release discipline with golden sets, rubrics, and regression checks.",
    href: "/ai-engineering/learn/modules/model-evaluation",
  },
  {
    icon: Database,
    title: "RAG and Knowledge Systems",
    description: "Go beyond vector demos and design inspectable retrieval systems.",
    href: "/ai-engineering/learn/modules/vector-databases-retrieval",
  },
  {
    icon: Bot,
    title: "Agents and Multi-Step Systems",
    description: "Learn approval loops, tool use, and bounded autonomy.",
    href: "/ai-engineering/learn/modules/ai-agents",
  },
  {
    icon: Cpu,
    title: "Platform Engineering for AI",
    description: "Ship prompts, models, and services with stronger deployment rails.",
    href: "/ai-engineering/learn/modules/mlops-deployment",
  },
]

const SECONDARY_TRACKS = [
  {
    icon: Radar,
    title: "Robotics / Autonomy Track",
    description:
      "Perception, edge inference, embedded systems, and autonomy capstone work for Tesla- or SpaceX-style paths.",
  },
  {
    icon: BrainCircuit,
    title: "Classical ML Track",
    description:
      "A compact secondary lane for builders who want stronger grounding in training data, baselines, and production MLOps for trained models.",
  },
]

const FRONTIER_SIGNALS = [
  "Frontier labs and high-velocity startups",
  "Eval-first product and platform systems",
  "Portfolio capstones instead of generic tutorials",
]

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.5 },
}

export function HomePageClient() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[72vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center sm:justify-end sm:pr-8 opacity-40 sm:opacity-60">
          <HeroScene />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#f7f3ea]/96 via-[#f7f3ea]/84 to-transparent" />

        <div className="container relative z-10 mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-2xl">
            <motion.p
              className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Frontier AI Engineer Academy
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-editorial-ink leading-[0.92] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Frontier AI engineering{" "}
              <span className="text-editorial-green">for already-technical builders</span>
            </motion.h1>
            <motion.p
              className="mt-5 text-base sm:text-lg text-editorial-muted leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              This academy is built for engineers who already know how to ship software
              and want the frontier stack: LLM systems, evals, retrieval, agents,
              platform rails, inference tradeoffs, and portfolio-grade capstones.
            </motion.p>
            <motion.div
              className="mt-6 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/ai-engineering/frontier-blueprint">
                  View the Blueprint <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/ai-engineering/learn/modules">Explore Core Modules</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/ai-engineering/projects">See Capstones</Link>
              </Button>
            </motion.div>
            <motion.div
              className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-editorial-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {FRONTIER_SIGNALS.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-[rgba(44,49,59,0.08)] bg-white/60 px-3 py-1"
                >
                  {signal}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" {...fadeInUp}>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
              The Role Shape
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-3">
              This is not a generic “learn AI from scratch” course
            </h2>
            <p className="text-sm sm:text-base text-editorial-muted leading-relaxed">
              The primary promise is a blended frontier role: product judgment plus
              platform discipline. You learn how modern AI features are designed,
              evaluated, shipped, observed, and improved inside high-velocity teams.
            </p>
          </motion.div>
        </div>
      </section>

      <RolePressureDashboard />

      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.4)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              The blended role this academy is training for
            </h2>
            <p className="text-sm sm:text-base text-editorial-muted max-w-2xl mx-auto">
              Product, platform, and research-to-production work feed into each other.
              That blend is what makes the strongest frontier AI engineers unusually useful.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {ROLE_BLEND.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <Card className="h-full bg-[rgba(255,255,255,0.82)]">
                    <CardHeader className="pb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft mb-3">
                        <Icon className="h-5 w-5 text-editorial-green" />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              Core Frontier Modules
            </h2>
            <p className="text-sm text-editorial-muted max-w-md mx-auto">
              Start here first. These modules anchor the academy’s main promise.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {CORE_MODULES.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                          <Icon className="h-4 w-4 text-editorial-green" />
                        </div>
                        <span className="text-[10px] font-mono text-editorial-muted">Core {i + 1}</span>
                      </div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs leading-relaxed">
                        {item.description}
                      </CardDescription>
                      <Link
                        href={item.href}
                        className="mt-3 inline-flex items-center gap-1 text-xs text-editorial-green"
                      >
                        Open module <ArrowRight className="h-3 w-3" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.4)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              Secondary Tracks
            </h2>
            <p className="text-sm text-editorial-muted max-w-md mx-auto">
              Robotics/autonomy and classical ML stay in the academy, but as optional depth rather than the main promise.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {SECONDARY_TRACKS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-blue-soft mb-3">
                        <Icon className="h-5 w-5 text-editorial-blue" />
                      </div>
                      <h3 className="font-serif font-semibold text-editorial-ink text-lg">
                        {item.title}
                      </h3>
                      <p className="text-sm text-editorial-muted leading-relaxed mt-2">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <Card className="glass-panel-strong max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8 text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-editorial-ink">
                Start with the blueprint, then ship your way into the role
              </h2>
              <p className="text-sm text-editorial-muted max-w-md mx-auto">
                The fastest path through the academy is simple: understand the role,
                work the core frontier modules, and build capstones that feel like real
                product and platform work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/ai-engineering/frontier-blueprint">
                    Open Blueprint <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/ai-engineering/projects">Explore Capstones</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
