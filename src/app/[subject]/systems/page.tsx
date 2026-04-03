import { notFound } from "next/navigation"
import { getSubject, getSystems, getFrameworks } from "@/lib/content"
import Link from "next/link"

export default async function SystemsPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  const systems = getSystems(slug)
  const frameworks = getFrameworks(slug)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-2">
          {subject.name}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-3">
          Systems & Frameworks
        </h1>
        <p className="text-editorial-muted text-lg max-w-2xl">
          Repeatable processes, mental models, and frameworks for{" "}
          {subject.name.toLowerCase()}.
        </p>
      </div>

      {frameworks.length > 0 && (
        <div className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4">
            Frameworks
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((fw) => (
              <div
                key={fw.slug}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-6"
              >
                <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-blue-soft text-editorial-blue mb-3">
                  {fw.category}
                </span>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
                  {fw.name}
                </h3>
                <p className="text-sm text-editorial-muted mb-3">
                  {fw.summary}
                </p>
                <p className="text-xs text-editorial-amber italic">
                  Use when: {fw.whenToUseIt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {systems.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4">
            Business Systems
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {systems.map((sys) => (
              <Link
                key={sys.slug}
                href={`/${slug}/systems/${sys.slug}`}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-6 hover:shadow-editorial-hover transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-blue-soft text-editorial-blue">
                    {sys.frequency}
                  </span>
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-amber-soft text-editorial-amber">
                    {sys.owner}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
                  {sys.title}
                </h3>
                <p className="text-sm text-editorial-muted">{sys.summary}</p>
                <p className="text-xs text-editorial-muted mt-3">
                  {sys.steps.length} steps · {sys.kpis.length} KPIs
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {frameworks.length === 0 && systems.length === 0 && (
        <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-12 text-center">
          <p className="text-editorial-muted text-lg mb-2">
            No systems or frameworks yet for {subject.name}
          </p>
          <p className="text-editorial-muted text-sm">
            These are being built. Check back soon.
          </p>
        </div>
      )}
    </div>
  )
}
