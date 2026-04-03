import { getSubjects, getModules, getPlaybooks, getSystems, getTools, getFrameworks, getAllDomainMeta } from "@/lib/content"
import { SUBJECT_GROUP_LABELS } from "@/types/curriculum"
import type { SubjectGroup, SubjectManifest } from "@/types/curriculum"
import Link from "next/link"
import { BookOpen, Play, Wrench, RefreshCw, Lightbulb } from "lucide-react"

export default function DashboardPage() {
  const subjects = getSubjects()

  // Group subjects
  const grouped = subjects.reduce<Record<SubjectGroup, SubjectManifest[]>>(
    (acc, s) => {
      if (!acc[s.group]) acc[s.group] = []
      acc[s.group].push(s)
      return acc
    },
    {} as Record<SubjectGroup, SubjectManifest[]>
  )

  // Gather stats per subject
  const stats = subjects.map((s) => ({
    subject: s,
    modules: getModules(s.slug).length,
    playbooks: getPlaybooks(s.slug).length,
    systems: getSystems(s.slug).length,
    frameworks: getFrameworks(s.slug).length,
    tools: getTools(s.slug).length,
    hasDomainMeta: getAllDomainMeta(s.slug).length > 0,
  }))

  const totalModules = stats.reduce((sum, s) => sum + s.modules, 0)
  const totalPlaybooks = stats.reduce((sum, s) => sum + s.playbooks, 0)
  const totalSystems = stats.reduce((sum, s) => sum + s.systems, 0)
  const totalFrameworks = stats.reduce((sum, s) => sum + s.frameworks, 0)
  const totalTools = stats.reduce((sum, s) => sum + s.tools, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-editorial-ink mb-3">
          Founder OS
        </h1>
        <p className="text-editorial-muted text-lg max-w-2xl">
          Your operating system for building and running a business. Playbooks,
          systems, tools, and structured learning across{" "}
          {subjects.length} domains.
        </p>
        <div className="flex flex-wrap gap-5 mt-4 text-sm text-editorial-muted">
          <span className="flex items-center gap-1.5">
            <Play className="h-4 w-4" /> {totalPlaybooks} playbooks
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="h-4 w-4" /> {totalSystems} systems
          </span>
          <span className="flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4" /> {totalFrameworks} frameworks
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" /> {totalModules} modules
          </span>
          <span className="flex items-center gap-1.5">
            <Wrench className="h-4 w-4" /> {totalTools} tools
          </span>
        </div>
      </div>

      {/* Subject Groups */}
      {(
        Object.entries(grouped) as [SubjectGroup, SubjectManifest[]][]
      ).map(([group, subs]) => (
        <div key={group} className="mb-10">
          <h2 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-4">
            {SUBJECT_GROUP_LABELS[group]}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subs.map((s) => {
              const st = stats.find((x) => x.subject.slug === s.slug)
              const hasContent = st && (st.modules > 0 || st.playbooks > 0 || st.tools > 0 || st.systems > 0 || st.frameworks > 0)
              const hasDomainMetaOnly = st && !hasContent && st.hasDomainMeta
              return (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className={`rounded-[22px] border border-[rgba(44,49,59,0.08)] p-6 transition-shadow group ${
                    hasContent
                      ? "bg-[rgba(255,255,255,0.78)] shadow-editorial-soft backdrop-blur-[18px] hover:shadow-editorial-hover"
                      : hasDomainMetaOnly
                        ? "bg-[rgba(255,255,255,0.6)] hover:shadow-editorial-soft"
                        : "bg-[rgba(255,255,255,0.4)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="inline-block h-2.5 w-10 rounded-full"
                      style={{ backgroundColor: s.color, opacity: hasContent ? 1 : 0.35 }}
                    />
                    <span className="text-xs text-editorial-muted">
                      {s.shortName}
                    </span>
                  </div>
                  <h3 className={`font-serif text-xl font-semibold mb-1 transition-colors ${
                    hasContent || hasDomainMetaOnly
                      ? "text-editorial-ink group-hover:text-editorial-green"
                      : "text-editorial-muted"
                  }`}>
                    {s.name}
                  </h3>
                  <p className="text-sm text-editorial-muted line-clamp-2 mb-3">
                    {s.tagline}
                  </p>
                  {hasContent ? (
                    <div className="flex items-center gap-1.5">
                      {st.playbooks > 0 && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-editorial-green" title="Playbooks" />
                      )}
                      {st.systems > 0 && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-editorial-blue" title="Systems" />
                      )}
                      {st.frameworks > 0 && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-editorial-amber" title="Frameworks" />
                      )}
                      {st.modules > 0 && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-editorial-muted" title="Modules" />
                      )}
                      {st.tools > 0 && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} title="Tools" />
                      )}
                      <span className="text-xs text-editorial-muted ml-1">
                        {[
                          st.playbooks > 0 && `${st.playbooks} playbooks`,
                          st.systems > 0 && `${st.systems} systems`,
                          st.frameworks > 0 && `${st.frameworks} frameworks`,
                          st.modules > 0 && `${st.modules} modules`,
                        ].filter(Boolean).join(" · ")}
                      </span>
                    </div>
                  ) : hasDomainMetaOnly ? (
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{ backgroundColor: `${s.color}18`, color: s.color }}
                    >
                      Operating rhythm ready
                    </span>
                  ) : (
                    <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium bg-[rgba(44,49,59,0.06)] text-editorial-muted">
                      Coming soon
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
