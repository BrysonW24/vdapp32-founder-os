import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "The Future of AI Engineering",
  description:
    "Frontier AI product and platform trends across agents, eval-first development, inference economics, moats, and robotics.",
}

const SECTIONS = [
  {
    title: "Now",
    description:
      "The strongest teams are converging on eval-first development, retrieval-backed products, structured outputs, and bounded agent workflows. The biggest shift is not that models are better. It is that production patterns are getting sharper.",
  },
  {
    title: "Near Term",
    description:
      "Inference economics, release discipline, and tool use quality will matter more than novelty. Teams that can ship faster without trust-breaking regressions will separate from teams that only demo well.",
  },
  {
    title: "Medium Term",
    description:
      "The frontier product engineer and the frontier platform engineer will get even closer. More value will come from internal leverage, system design, and operational clarity than from raw prompt cleverness.",
  },
  {
    title: "Robotics Branch",
    description:
      "Robotics and autonomy continue as a specialization, not the default path. The branch matters because it pushes edge inference, perception, and real-time constraints harder than most software-only teams.",
  },
]

export default function AIFuturePage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Outlook
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          The Future of AI Engineering
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The field is moving toward stronger product systems, better evals, tighter
          platform rails, and more pressure on cost-quality-speed tradeoffs. The
          frontier engineer of the next few years will be judged by judgment, not hype.
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
          The biggest long-term signal is simple: frontier teams are becoming harder to
          impress with generic AI demos. They want engineers who can design systems,
          explain tradeoffs, measure regressions, and ship features people trust.
        </CardContent>
      </Card>
    </div>
  )
}
