"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, RotateCcw } from "lucide-react"

type Quality = "best" | "good" | "risky"

type Stage = {
  title: string
  brief: string
  question: string
  options: Array<{ label: string; feedback: string; quality: Quality }>
}

const STAGES: Stage[] = [
  {
    title: "Choose the first problem",
    brief:
      "You joined a frontier AI startup building an internal research assistant. The team wants a fast first win that proves quality without creating a trust problem.",
    question: "Which first scope gives you the best launch shape?",
    options: [
      {
        label: "Open-ended chat for every internal question",
        feedback: "Too broad. It will look powerful in a demo but fail in too many ways to earn trust quickly.",
        quality: "risky",
      },
      {
        label: "A citation-backed document Q&A flow for a narrow set of sources",
        feedback: "Best starting point. The scope is narrow, the quality bar is clearer, and citations create a visible trust mechanism.",
        quality: "best",
      },
      {
        label: "An agent that edits documents, sends messages, and opens tickets on day one",
        feedback: "Ambitious, but too much surface area before the team has evals, permissions, and rollback discipline.",
        quality: "good",
      },
    ],
  },
  {
    title: "Pick the model strategy",
    brief:
      "The feature is working locally, but you need to choose how to balance capability, latency, and cost in production.",
    question: "What serving strategy is strongest for v1?",
    options: [
      {
        label: "Use the most capable model for every request regardless of cost",
        feedback: "This is the easiest path technically, but it creates avoidable cost and latency pressure from the first release.",
        quality: "risky",
      },
      {
        label: "Route simple tasks to a cheaper model and reserve the strongest model for harder cases",
        feedback: "Best answer. It shows product and platform judgment, not just model enthusiasm.",
        quality: "best",
      },
      {
        label: "Self-host immediately so you control everything",
        feedback: "Could be right later, but for a first release it usually adds too much operational burden before the product shape is proven.",
        quality: "good",
      },
    ],
  },
  {
    title: "Design retrieval",
    brief:
      "The assistant answers questions, but quality drops whenever the wrong context comes back or the source docs are stale.",
    question: "What retrieval decision matters most next?",
    options: [
      {
        label: "Improve the system prompt and ignore the retrieval layer",
        feedback: "A stronger prompt cannot reliably fix stale or irrelevant context.",
        quality: "risky",
      },
      {
        label: "Version the index, log retrieved chunks, and expose citations in the UI",
        feedback: "Best answer. It improves both trust and debuggability at the same time.",
        quality: "best",
      },
      {
        label: "Hide citations because they make the UI feel more technical",
        feedback: "Smoother on the surface, but it removes one of the strongest trust levers the product has.",
        quality: "good",
      },
    ],
  },
  {
    title: "Set agent permissions",
    brief:
      "The team wants to add a tool-using agent that can search docs, summarize diffs, and propose changes to internal configs.",
    question: "How much autonomy should the agent get first?",
    options: [
      {
        label: "Let it write directly to production systems so the workflow feels magical",
        feedback: "That is exactly how avoidable incidents happen. The system is not mature enough for direct execution.",
        quality: "risky",
      },
      {
        label: "Let it propose actions, log traces, and require approval before sensitive changes",
        feedback: "Best answer. Useful autonomy with clear boundaries is what strong frontier teams look for.",
        quality: "best",
      },
      {
        label: "Disable tool use entirely until the model is perfect",
        feedback: "Safer, but too conservative. You can still get value with bounded permissions and approval checkpoints.",
        quality: "good",
      },
    ],
  },
  {
    title: "Choose the release gate",
    brief:
      "Launch is close. Leadership wants the feature live this week, but your latest changes touched prompts, retrieval config, and model routing.",
    question: "What does a responsible release look like?",
    options: [
      {
        label: "Ship it because manual spot checks looked good",
        feedback: "That is demo logic, not release logic.",
        quality: "risky",
      },
      {
        label: "Run evals, check latency and cost movement, and keep rollback ready",
        feedback: "Best answer. This is the release discipline that makes frontier teams trustworthy.",
        quality: "best",
      },
      {
        label: "Delay indefinitely until every edge case is solved",
        feedback: "Not realistic. Strong teams ship with evidence and rollback discipline, not impossible certainty.",
        quality: "good",
      },
    ],
  },
]

const QUALITY_STYLES: Record<Quality, string> = {
  best: "bg-editorial-green-soft text-editorial-green border-transparent",
  good: "bg-editorial-blue-soft text-editorial-blue border-transparent",
  risky: "bg-editorial-amber-soft text-editorial-amber border-transparent",
}

export function SimulationClient() {
  const [stageIndex, setStageIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const stage = STAGES[stageIndex]
  const isComplete = stageIndex >= STAGES.length

  const score = useMemo(() => {
    return answers.reduce((total, answerIndex, index) => {
      const quality = STAGES[index]?.options[answerIndex]?.quality
      return total + (quality === "best" ? 2 : quality === "good" ? 1 : 0)
    }, 0)
  }, [answers])

  const handleAnswer = (answerIndex: number) => {
    setAnswers((current) => {
      const next = [...current]
      next[stageIndex] = answerIndex
      return next
    })
  }

  const nextStage = () => {
    if (answers[stageIndex] === undefined) return
    setStageIndex((current) => current + 1)
  }

  const reset = () => {
    setStageIndex(0)
    setAnswers([])
  }

  if (isComplete) {
    return (
      <div className="container py-6 space-y-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-serif font-bold text-editorial-ink">
            Frontier Simulation Complete
          </h1>
          <p className="text-editorial-muted mt-3 text-lg leading-relaxed">
            Your score is {score} / {STAGES.length * 2}. The strongest pattern in this
            simulation is consistent: narrow scope, eval-backed releases, bounded
            autonomy, and better system visibility beat magical demos.
          </p>
        </div>

        <Card className="glass-panel-strong">
          <CardHeader>
            <CardTitle>What the simulation was testing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-editorial-muted leading-relaxed">
            <p>Could you choose product scope that creates trust instead of excitement-only demos?</p>
            <p>Could you balance model quality with cost, latency, and release safety?</p>
            <p>Could you design agent systems with approval boundaries instead of fake autonomy bravado?</p>
          </CardContent>
        </Card>

        <Button onClick={reset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Run Again
        </Button>
      </div>
    )
  }

  const selectedIndex = answers[stageIndex]
  const selectedOption = selectedIndex !== undefined ? stage.options[selectedIndex] : null

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Interactive Scenario
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Frontier AI Engineering Simulation
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Step through the tradeoffs that matter in real frontier product and platform
          work: scope, model routing, retrieval design, agent permissions, and release safety.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="secondary">Stage {stageIndex + 1}</Badge>
        <Badge variant="outline">{stage.title}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{stage.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm text-editorial-muted leading-relaxed">{stage.brief}</p>
          <div className="space-y-3">
            <p className="font-medium text-editorial-ink">{stage.question}</p>
            {stage.options.map((option, index) => (
              <button
                key={option.label}
                type="button"
                onClick={() => handleAnswer(index)}
                className={`w-full rounded-[16px] border p-4 text-left transition-colors ${
                  selectedIndex === index
                    ? "border-editorial-green bg-editorial-green-soft/40"
                    : "border-[rgba(44,49,59,0.08)] hover:bg-[rgba(241,236,225,0.35)]"
                }`}
              >
                <p className="text-sm font-medium text-editorial-ink">{option.label}</p>
              </button>
            ))}
          </div>

          {selectedOption && (
            <Card className="bg-[rgba(241,236,225,0.45)]">
              <CardContent className="p-4 space-y-2">
                <Badge className={QUALITY_STYLES[selectedOption.quality]}>
                  {selectedOption.quality}
                </Badge>
                <p className="text-sm text-editorial-muted leading-relaxed">
                  {selectedOption.feedback}
                </p>
              </CardContent>
            </Card>
          )}

          <Button onClick={nextStage} disabled={selectedIndex === undefined}>
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
