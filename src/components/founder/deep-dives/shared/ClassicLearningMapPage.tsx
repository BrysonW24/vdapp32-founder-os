import Link from "next/link"
import { ArrowRight, BookOpen, FolderKanban, RefreshCw, Wrench } from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import { getModules, getPlaybooks, getProjects, getSystems, getTools } from "@/lib/content"

interface ClassicLearningMapPageProps {
  subject: SubjectManifest
}

export function ClassicLearningMapPage({ subject }: ClassicLearningMapPageProps) {
  const modules = getModules(subject.slug)
  const playbooks = getPlaybooks(subject.slug)
  const systems = getSystems(subject.slug)
  const tools = getTools(subject.slug)
  const projects = getProjects(subject.slug)

  const grouped = {
    beginner: modules.filter((item) => item.level === "beginner"),
    intermediate: modules.filter((item) => item.level === "intermediate"),
    advanced: modules.filter((item) => item.level === "advanced"),
  }

  const lanes = [
    {
      title: "Foundation",
      description: "Get the shape of the subject before chasing tactics.",
      modules: grouped.beginner,
    },
    {
      title: "Execution",
      description: "Turn theory into repeatable operating moves and deliverables.",
      modules: grouped.intermediate,
    },
    {
      title: "Operator Judgment",
      description: "Push into decisions, tradeoffs, and cross-functional leverage.",
      modules: grouped.advanced,
    },
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Learning Map
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          The {subject.name} learning map
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Start with the foundations, move into applied work, then tighten the systems
          around the work. This is the classic academy sequence that makes the subject
          feel navigable instead of scattered.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookOpen} label="Modules" value={modules.length} />
        <StatCard icon={FolderKanban} label="Projects" value={projects.length} />
        <StatCard icon={Wrench} label="Tools" value={tools.length} />
        <StatCard icon={RefreshCw} label="Systems + Playbooks" value={systems.length + playbooks.length} />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {lanes.map((lane) => (
          <div
            key={lane.title}
            className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-5"
          >
            <h2 className="font-serif text-2xl font-bold text-editorial-ink">
              {lane.title}
            </h2>
            <p className="mt-2 text-sm text-editorial-muted">{lane.description}</p>
            <div className="mt-4 space-y-3">
              {lane.modules.slice(0, 8).map((module) => (
                <Link
                  key={module.slug}
                  href={`/${subject.slug}/learn/modules/${module.slug}`}
                  className="block rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/75 p-3 hover:shadow-editorial-soft transition-shadow"
                >
                  <p className="font-medium text-editorial-ink text-sm">{module.title}</p>
                  <p className="text-xs text-editorial-muted mt-1 line-clamp-2">
                    {module.shortSummary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(241,236,225,0.45)] p-6">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
            Academy Flow
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-editorial-ink">
            Learn, practice, then operationalize
          </h2>
          <p className="mt-3 text-sm sm:text-base text-editorial-muted leading-relaxed">
            The fastest route is usually: complete the first module block, build one
            project, adopt one tool stack, then start running playbooks and systems on
            a weekly rhythm.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-editorial-muted">
          <Link href={`/${subject.slug}/learn/modules`} className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/75 px-4 py-2">
            Modules <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={`/${subject.slug}/projects`} className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/75 px-4 py-2">
            Projects <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={`/${subject.slug}/tools`} className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/75 px-4 py-2">
            Tools <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={`/${subject.slug}/systems`} className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/75 px-4 py-2">
            Systems <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen
  label: string
  value: number
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
