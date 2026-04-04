import Link from "next/link"
import { ArrowRight, BookOpen, FolderKanban, RefreshCw } from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import { getModules, getPlaybooks, getProjects, getSystems } from "@/lib/content"

interface ClassicTimelinePageProps {
  subject: SubjectManifest
}

export function ClassicTimelinePage({ subject }: ClassicTimelinePageProps) {
  const modules = getModules(subject.slug)
  const projects = getProjects(subject.slug)
  const playbooks = getPlaybooks(subject.slug)
  const systems = getSystems(subject.slug)

  const phases = [
    {
      title: "Weeks 1-2",
      subtitle: "Foundations and orientation",
      description: "Get the shape of the subject, the key vocabulary, and the first few concepts into working memory.",
      modules: modules.slice(0, 4),
      assetHref: `/${subject.slug}/learn/modules`,
      assetLabel: "Start the module stack",
    },
    {
      title: "Weeks 3-6",
      subtitle: "Applied execution",
      description: "Turn early understanding into output. Projects and first-playbook execution matter more than passive reading here.",
      modules: modules.slice(4, 8),
      assetHref: `/${subject.slug}/projects`,
      assetLabel: "Ship a project",
    },
    {
      title: "Months 2-3",
      subtitle: "Operator rhythm",
      description: "Introduce systems, review loops, and higher-stakes decisions so the work becomes repeatable.",
      modules: modules.slice(8, 14),
      assetHref: `/${subject.slug}/systems`,
      assetLabel: "Install a system",
    },
    {
      title: "Quarter 2+",
      subtitle: "Judgment and leverage",
      description: "Move from doing the work to shaping how the whole function runs and how it supports the rest of the business.",
      modules: modules.slice(14, 20),
      assetHref: `/${subject.slug}/toolkit`,
      assetLabel: "Tighten judgment",
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Your Timeline
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          A realistic ramp for {subject.name.toLowerCase()}
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          This classic timeline treats the subject like a capability build, not a
          content dump: foundations first, applied work second, systems third, and
          operating judgment after that.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-4">
        <QuickMetric label="Modules" value={modules.length} icon={BookOpen} />
        <QuickMetric label="Projects" value={projects.length} icon={FolderKanban} />
        <QuickMetric label="Playbooks" value={playbooks.length} icon={ArrowRight} />
        <QuickMetric label="Systems" value={systems.length} icon={RefreshCw} />
      </section>

      <section className="space-y-4">
        {phases.map((phase, index) => (
          <div
            key={phase.title}
            className="grid gap-4 rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-5 lg:grid-cols-[0.28fr_0.72fr]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                Phase {index + 1}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-editorial-ink">
                {phase.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-editorial-green">
                {phase.subtitle}
              </p>
              <p className="mt-3 text-sm text-editorial-muted leading-relaxed">
                {phase.description}
              </p>
              <Link
                href={phase.assetHref}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/80 px-4 py-2 text-sm text-editorial-ink"
              >
                {phase.assetLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {phase.modules.map((module) => (
                <Link
                  key={module.slug}
                  href={`/${subject.slug}/learn/modules/${module.slug}`}
                  className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-4 hover:shadow-editorial-soft transition-shadow"
                >
                  <p className="font-medium text-editorial-ink text-sm">{module.title}</p>
                  <p className="mt-1 text-xs text-editorial-muted line-clamp-3">
                    {module.shortSummary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

function QuickMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: typeof BookOpen
}) {
  return (
    <div className="rounded-[18px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-editorial-muted">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-3 font-serif text-3xl text-editorial-ink">{value}</p>
    </div>
  )
}
