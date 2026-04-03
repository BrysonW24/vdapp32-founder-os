import { DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Career Paths",
  description:
    "Primary frontier AI roles across product engineering, platform engineering, evals, inference, research, and robotics/autonomy.",
}

const PRIMARY_ROLES = [
  {
    title: "Frontier AI Product Engineer",
    salaryRange: "$180K-$320K AUD equiv. + upside",
    description:
      "Build user-facing AI features with strong evals, clear UX, and measurable product outcomes.",
  },
  {
    title: "AI Platform Engineer",
    salaryRange: "$170K-$300K AUD equiv. + upside",
    description:
      "Create the internal rails for releases, observability, registries, datasets, and AI developer tooling.",
  },
  {
    title: "Evals / Reliability Engineer",
    salaryRange: "$170K-$290K AUD equiv. + upside",
    description:
      "Own regression suites, failure taxonomies, release gates, and the discipline that keeps features trustworthy.",
  },
  {
    title: "Inference / Performance Engineer",
    salaryRange: "$190K-$340K AUD equiv. + upside",
    description:
      "Work on serving paths, routing, caching, latency budgets, and cost-performance tradeoffs.",
  },
  {
    title: "Research Engineer",
    salaryRange: "$190K-$360K AUD equiv. + upside",
    description:
      "Translate research ideas into working training or experimentation systems with strong software depth.",
  },
  {
    title: "Robotics / Autonomy Engineer",
    salaryRange: "$160K-$300K AUD equiv. + upside",
    description:
      "A specialization path for perception, edge inference, and real-time embodied systems.",
  },
]

const SECONDARY_ROLES = [
  "ML Engineer remains relevant, but it sits here as a broader secondary role rather than the academy’s main promise.",
  "Classical NLP, CV, and MLOps paths still matter when you want deeper specialization or a wider hiring surface.",
]

export default function CareersPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Career Paths
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Where this academy is aiming you
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The main target is frontier software AI engineering: product, platform,
          reliability, and research-to-production work inside labs and high-velocity
          startups. Robotics and classical ML remain available as secondary paths.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRIMARY_ROLES.map((role) => (
          <Card key={role.title}>
            <CardHeader className="pb-2">
              <CardTitle>{role.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-[14px] border border-[rgba(44,49,59,0.06)] bg-[rgba(255,255,255,0.58)] px-3 py-2">
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-editorial-muted">
                  <DollarSign className="h-3.5 w-3.5 text-editorial-green" />
                  Comp (AUD equiv.)
                </span>
                <span className="text-sm font-medium text-editorial-ink">{role.salaryRange}</span>
              </div>
              <div className="text-sm text-editorial-muted leading-relaxed">
                {role.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-[rgba(241,236,225,0.45)]">
        <CardHeader>
          <CardTitle>Compensation note</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-editorial-muted leading-relaxed">
          Frontier AI roles swing hard by company, geography, level, and equity structure. These
          figures are best read as broad AUD-equivalent positioning bands rather than precise local
          salary quotes.
        </CardContent>
      </Card>

      <Card className="bg-[rgba(241,236,225,0.45)]">
        <CardHeader>
          <CardTitle>Secondary Role Lens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {SECONDARY_ROLES.map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-editorial-muted">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-editorial-amber shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
