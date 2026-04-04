import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartLine, Clock3, ShieldCheck, Users, Wallet } from "lucide-react"

export const metadata = {
  title: "Communicating AI to Stakeholders",
  description:
    "Translate model quality, latency, reliability, adoption, cost, and rollback readiness into decision-ready language.",
}

const STAKEHOLDERS = [
  {
    title: "CTO / VP Engineering",
    cares: "Reliability, release safety, and where the real technical risk sits.",
    metrics: ["Latency percentiles", "Rollback readiness", "Incident class", "Trace coverage"],
  },
  {
    title: "Product Leadership",
    cares: "Whether the AI feature improves user task success and is worth further investment.",
    metrics: ["Task success rate", "Correction rate", "Adoption", "User trust signals"],
  },
  {
    title: "Finance / Operations",
    cares: "Spend discipline, unit economics, and whether the system scales without ugly surprises.",
    metrics: ["Cost per request", "GPU or API burn", "Forecast versus actual", "Fallback rate"],
  },
  {
    title: "Leadership / Board",
    cares: "Product impact, strategic leverage, and whether the team can ship responsibly at speed.",
    metrics: ["Adoption trend", "Reliability trend", "Quality bar", "Strategic moat"],
  },
]

const METRIC_TRANSLATIONS = [
  { icon: ChartLine, metric: "Model quality", translation: "Can users complete the task successfully, and is that trend improving?" },
  { icon: Clock3, metric: "Latency", translation: "Does the system feel fast enough to stay in the workflow instead of being tolerated?" },
  { icon: ShieldCheck, metric: "Reliability", translation: "Can we release without creating new incidents or trust-breaking regressions?" },
  { icon: Users, metric: "Adoption", translation: "Are people choosing this feature repeatedly once they try it?" },
  { icon: Wallet, metric: "Cost", translation: "Is the feature economically sustainable at the volume we want?" },
]

export default function ExecutiveCommunicationPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Communication Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Communicating AI to Stakeholders
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Great frontier engineers do not just build systems. They explain model quality,
          latency, reliability, adoption, cost, and rollback readiness in language that
          helps the rest of the company make decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STAKEHOLDERS.map((stakeholder) => (
          <Card key={stakeholder.title} className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>{stakeholder.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-editorial-muted leading-relaxed">{stakeholder.cares}</p>
              <div className="flex flex-wrap gap-2">
                {stakeholder.metrics.map((metric) => (
                  <Badge key={metric} variant="outline">
                    {metric}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-panel-strong">
        <CardHeader>
          <CardTitle>Translate technical metrics into decision language</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {METRIC_TRANSLATIONS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.metric} className="flex items-start gap-3 text-sm text-editorial-muted">
                <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-editorial-green-soft shrink-0">
                  <Icon className="h-4 w-4 text-editorial-green" />
                </div>
                <div>
                  <p className="font-medium text-editorial-ink">{item.metric}</p>
                  <p>{item.translation}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
