import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Explainability and Failure Attribution",
  description:
    "Understand model attribution, failure attribution, and regression analysis for frontier AI systems.",
}

const SECTIONS = [
  {
    title: "Model Attribution",
    description:
      "Use techniques like feature attribution, token-level inspection, or retrieved-context review to understand what influenced an output.",
  },
  {
    title: "Failure Attribution",
    description:
      "Figure out whether a bad outcome came from the model, retrieval layer, prompt contract, tool call, or data freshness path.",
  },
  {
    title: "Regression Analysis",
    description:
      "When a release degrades quality, compare traces, eval suites, latency shifts, and output classes to isolate what actually changed.",
  },
  {
    title: "Decision Use",
    description:
      "Explainability is not only a trust feature. It is also how you decide what to fix next, what to roll back, and what to communicate upstream.",
  },
]

export default function AttributionPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Diagnosis Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Explainability and Failure Attribution
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          When a frontier AI system fails, the hard part is rarely noticing the failure.
          The hard part is isolating which layer caused it and knowing how much evidence
          you have before you change the system again.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-2">
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-editorial-muted leading-relaxed">
              {section.description}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-sm text-editorial-muted leading-relaxed">
          The frontier habit is to blame the smallest possible layer first. Was the
          context stale? Was the prompt contract ambiguous? Did the tool call fail? The
          better your attribution discipline, the faster your system improves.
        </CardContent>
      </Card>
    </div>
  )
}
