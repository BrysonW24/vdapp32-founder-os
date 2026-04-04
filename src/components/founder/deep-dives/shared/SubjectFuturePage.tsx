import { ArrowUpRight, TrendingUp } from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"

interface SubjectFuturePageProps {
  subject: SubjectManifest
}

export function SubjectFuturePage({ subject }: SubjectFuturePageProps) {
  const trends = [
    {
      title: "More automation, higher judgment",
      description: `${subject.name} work will automate the repetitive layers first, which makes operating judgment, review discipline, and exception handling more valuable, not less.`,
    },
    {
      title: "Tighter measurement loops",
      description: `Leaders will expect ${subject.name.toLowerCase()} to be instrumented more clearly, with better definitions, faster reviews, and less room for narrative without evidence.`,
    },
    {
      title: "Cross-functional fluency",
      description: `${subject.name} will matter more at the boundaries: it will increasingly need to work cleanly with product, finance, operations, and leadership decisions.`,
    },
    {
      title: "Smaller teams, broader scope",
      description: `The strongest operators will likely own a wider surface area. The edge will come from better systems, cleaner leverage, and more deliberate prioritization.`,
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Future View
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          The future of {subject.name.toLowerCase()}
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          This page is less about prediction theater and more about directional truth:
          where the work is tightening, where leverage is increasing, and where strong
          operators should prepare early.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {trends.map((trend) => (
          <div
            key={trend.title}
            className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-5"
          >
            <div className="flex items-center gap-2 text-editorial-green">
              <TrendingUp className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.18em]">Trend</p>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-editorial-ink">
              {trend.title}
            </h2>
            <p className="mt-3 text-sm text-editorial-muted leading-relaxed">
              {trend.description}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(241,236,225,0.45)] p-6">
        <div className="flex items-center gap-2 text-editorial-muted">
          <ArrowUpRight className="h-4 w-4 text-editorial-green" />
          <p className="text-xs uppercase tracking-[0.18em]">Practical read</p>
        </div>
        <p className="mt-3 text-sm sm:text-base text-editorial-muted leading-relaxed max-w-3xl">
          The right response is usually not to chase every trend. It is to build the
          underlying discipline that keeps paying off as the tools and market move:
          better systems, better measurement, and better judgment.
        </p>
      </section>
    </div>
  )
}
