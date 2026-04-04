import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Timeline",
  description:
    "A 6-12 month accelerator roadmap for already-technical builders moving into frontier AI product and platform work.",
}

const PHASES = [
  {
    title: "Weeks 1-4",
    subtitle: "Frontier stack orientation",
    description:
      "Lock in the role map, LLM application foundations, prompting contracts, and the first eval-first habits.",
  },
  {
    title: "Weeks 5-8",
    subtitle: "Evals + RAG",
    description:
      "Build knowledge systems, set up evaluation discipline, and stop treating retrieval like a sidecar demo.",
  },
  {
    title: "Weeks 9-12",
    subtitle: "Agents + tool use",
    description:
      "Move into tool loops, approval boundaries, and supervised autonomy with stronger failure handling.",
  },
  {
    title: "Months 4-6",
    subtitle: "Platform, inference, safety",
    description:
      "Focus on deployment rails, traces, serving tradeoffs, guardrails, and cost-aware system design.",
  },
  {
    title: "Months 6-9",
    subtitle: "Specialization track",
    description:
      "Choose robotics/autonomy or classical ML depth, depending on the roles you want to target.",
  },
  {
    title: "Months 9-12",
    subtitle: "Portfolio + interview prep",
    description:
      "Turn the capstones into case studies, rehearse system design, and package your work for frontier hiring loops.",
  },
]

export default function TimelinePage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          6-12 Month Accelerator
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          A realistic frontier ramp
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          This timeline assumes you already know how to build software. The point is not
          to start from zero. The point is to redirect that skill into frontier AI
          product and platform work over a focused 6-12 month window.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PHASES.map((phase) => (
          <Card key={phase.title}>
            <CardHeader className="pb-2">
              <CardTitle>{phase.title}</CardTitle>
              <p className="text-sm text-editorial-green">{phase.subtitle}</p>
            </CardHeader>
            <CardContent className="text-sm text-editorial-muted leading-relaxed">
              {phase.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
