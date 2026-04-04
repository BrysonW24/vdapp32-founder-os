import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BadgeAlert,
  Boxes,
  ChartColumn,
  Database,
  Server,
  Wallet,
} from "lucide-react"

export const metadata = {
  title: "Platform Ops",
  description:
    "Platform operations for frontier AI systems: inference infra, registries, observability, deployment safety, and AI cost controls.",
}

const LAYERS = [
  {
    icon: Server,
    title: "Inference Infrastructure",
    description:
      "Model routing, caching, streaming, batching, and serving strategy across hosted APIs or self-hosted systems.",
  },
  {
    icon: Boxes,
    title: "Registries and Release Safety",
    description:
      "Version prompts, datasets, models, and retrieval configs so releases can be promoted, reviewed, and rolled back cleanly.",
  },
  {
    icon: Database,
    title: "Data and Retrieval Pipelines",
    description:
      "Move raw documents, events, and annotations into reusable assets for knowledge systems, eval sets, and user-facing features.",
  },
  {
    icon: ChartColumn,
    title: "Observability and Runtime Health",
    description:
      "Track latency, grounding quality, tool failure rates, and request-level traces so incidents are diagnosable instead of mysterious.",
  },
  {
    icon: Wallet,
    title: "GPU and Inference Cost Controls",
    description:
      "Tie spend to workloads, monitor unit economics, and design fallbacks before cost surprises force bad product decisions.",
  },
  {
    icon: BadgeAlert,
    title: "Internal Developer Platforms",
    description:
      "Create golden paths, scaffold generators, and release tooling that let the rest of the team move faster without lowering the quality bar.",
  },
]

export default function PlatformOpsPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Platform Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Platform Ops for AI Systems
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Platform ops is the discipline that keeps frontier AI teams from drowning in
          ad hoc release work. It covers inference infra, observability, deployment
          safety, internal tooling, and AI cost governance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LAYERS.map((layer) => {
          const Icon = layer.icon
          return (
            <Card key={layer.title} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-blue-soft mb-3">
                  <Icon className="h-5 w-5 text-editorial-blue" />
                </div>
                <CardTitle>{layer.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-editorial-muted leading-relaxed">
                {layer.description}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-sm text-editorial-muted leading-relaxed">
          The platform question is simple: can your team change prompts, retrieval,
          model versions, and service configuration without creating an incident every
          time? If not, the platform layer is still too manual.
        </CardContent>
      </Card>
    </div>
  )
}
