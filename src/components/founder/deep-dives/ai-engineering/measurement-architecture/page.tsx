import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "AI Measurement Architecture",
  description:
    "Measurement architecture for frontier AI systems across latency, throughput, eval pass rates, hallucination classes, cost, and uptime.",
}

const LAYERS = [
  {
    title: "Request Health",
    metrics: ["Latency p50 / p95 / p99", "Throughput", "Timeout rate", "Fallback rate"],
  },
  {
    title: "Quality",
    metrics: ["Eval pass rate", "Grounding or citation quality", "Hallucination classes", "Format correctness"],
  },
  {
    title: "System Reliability",
    metrics: ["Uptime", "Incident rate", "Rollback frequency", "Trace coverage"],
  },
  {
    title: "Economics",
    metrics: ["Cost per request", "Cost per successful task", "GPU utilisation", "Forecast vs actual spend"],
  },
]

export default function MeasurementArchitecturePage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Measurement Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          AI Measurement Architecture
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Frontier teams measure more than raw accuracy. They instrument runtime health,
          eval pass rates, hallucination classes, cost, and uptime so they can see what
          changed before users lose trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LAYERS.map((layer) => (
          <Card key={layer.title}>
            <CardHeader className="pb-2">
              <CardTitle>{layer.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {layer.metrics.map((metric) => (
                <div key={metric} className="flex items-start gap-2 text-sm text-editorial-muted">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-editorial-green shrink-0" />
                  <span>{metric}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-sm text-editorial-muted leading-relaxed">
          The rule is simple: if a metric does not help the team decide whether to
          ship, roll back, debug, or re-scope, it probably does not belong in the
          operating dashboard.
        </CardContent>
      </Card>
    </div>
  )
}
