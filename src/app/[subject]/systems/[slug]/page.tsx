import { notFound } from "next/navigation"
import { getSubjects, getSubject, getSystems, getSystem } from "@/lib/content"
import Link from "next/link"

export async function generateStaticParams() {
  return getSubjects().flatMap((s) =>
    getSystems(s.slug).map((sys) => ({ subject: s.slug, slug: sys.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject, slug } = await params
  const sys = getSystem(subject, slug)
  if (!sys) return { title: "Not Found" }
  return { title: sys.title }
}

export default async function SystemDetailPage({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject: subjectSlug, slug } = await params
  const subject = getSubject(subjectSlug)
  const system = getSystem(subjectSlug, slug)
  if (!subject || !system) notFound()

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <nav className="text-sm text-editorial-muted mb-6">
        <Link href={`/${subjectSlug}`} className="hover:text-editorial-ink">
          {subject.name}
        </Link>
        {" / "}
        <Link
          href={`/${subjectSlug}/systems`}
          className="hover:text-editorial-ink"
        >
          Systems
        </Link>
        {" / "}
        <span className="text-editorial-ink">{system.title}</span>
      </nav>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-blue-soft text-editorial-blue">
          {system.frequency}
        </span>
        <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-amber-soft text-editorial-amber">
          {system.owner}
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-4">
        {system.title}
      </h1>

      <p className="text-editorial-muted text-lg mb-8">{system.summary}</p>

      {/* Inputs & Outputs */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-5">
          <h2 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3">
            Inputs
          </h2>
          <ul className="space-y-1.5">
            {system.inputs.map((input, i) => (
              <li key={i} className="text-sm text-editorial-ink">
                {input}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-5">
          <h2 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3">
            Outputs
          </h2>
          <ul className="space-y-1.5">
            {system.outputs.map((output, i) => (
              <li key={i} className="text-sm text-editorial-ink">
                {output}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4">
          Steps
        </h2>
        <div className="space-y-4">
          {system.steps.map((step, i) => (
            <div
              key={i}
              className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-editorial-blue text-white text-xs font-semibold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-editorial-ink">
                      {step.title}
                    </h3>
                    <span className="text-xs text-editorial-muted">
                      {step.responsible}
                    </span>
                  </div>
                  <p className="text-sm text-editorial-muted">
                    {step.description}
                  </p>
                  {step.tool && (
                    <span className="inline-block mt-2 rounded-full px-2 py-0.5 text-xs bg-editorial-blue-soft text-editorial-blue">
                      {step.tool}
                    </span>
                  )}
                  {step.automated && (
                    <span className="inline-block mt-2 ml-1.5 rounded-full px-2 py-0.5 text-xs bg-editorial-green-soft text-editorial-green">
                      Automated
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      {system.kpis.length > 0 && (
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4">
            KPIs
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {system.kpis.map((kpi, i) => (
              <div
                key={i}
                className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-4"
              >
                <p className="font-semibold text-editorial-ink text-sm">
                  {kpi.metric}
                </p>
                <p className="text-xs text-editorial-muted mt-0.5">
                  Target: {kpi.target}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* When to Implement */}
      <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-editorial-green-soft p-6 mb-8">
        <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
          When to implement
        </h2>
        <p className="text-editorial-muted">{system.whenToImplement}</p>
      </div>

      {/* Delegation & Automation Notes */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-editorial-amber-soft p-5">
          <h2 className="text-xs uppercase tracking-[0.18em] text-editorial-amber mb-3">
            Delegation Notes
          </h2>
          <p className="text-sm text-editorial-muted">
            {system.delegationNotes}
          </p>
        </div>
        <div className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-editorial-blue-soft p-5">
          <h2 className="text-xs uppercase tracking-[0.18em] text-editorial-blue mb-3">
            Automation Notes
          </h2>
          <p className="text-sm text-editorial-muted">
            {system.automationNotes}
          </p>
        </div>
      </div>
    </div>
  )
}
