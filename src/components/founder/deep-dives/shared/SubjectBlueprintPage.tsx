import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  FileText,
  FolderKanban,
  Play,
  RefreshCw,
  Wrench,
} from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import {
  getAllDomainMeta,
  getDayInLifeScenarios,
  getFrameworks,
  getModules,
  getPlaybooks,
  getProjects,
  getPromptPacks,
  getSystems,
  getTemplates,
  getTools,
} from "@/lib/content"
import { MarketingSystemMap } from "@/components/academy/progress/MarketingSystemMap"
import { SalesSystemMap } from "@/components/academy/progress/SalesSystemMap"

interface SubjectBlueprintPageProps {
  subject: SubjectManifest
}

const COUNT_ICONS = {
  modules: BookOpen,
  playbooks: Play,
  systems: RefreshCw,
  tools: Wrench,
  projects: FolderKanban,
  frameworks: BarChart3,
}

export function SubjectBlueprintPage({ subject }: SubjectBlueprintPageProps) {
  const modules = getModules(subject.slug)
  const playbooks = getPlaybooks(subject.slug)
  const systems = getSystems(subject.slug)
  const tools = getTools(subject.slug)
  const projects = getProjects(subject.slug)
  const frameworks = getFrameworks(subject.slug)
  const prompts = getPromptPacks(subject.slug)
  const templates = getTemplates(subject.slug)
  const scenarios = getDayInLifeScenarios(subject.slug)
  const domainMeta = getAllDomainMeta(subject.slug)[0] ?? null

  const counts = [
    { key: "modules", label: "Modules", value: modules.length },
    { key: "playbooks", label: "Playbooks", value: playbooks.length },
    { key: "systems", label: "Systems", value: systems.length },
    { key: "tools", label: "Tools", value: tools.length },
    { key: "projects", label: "Projects", value: projects.length },
    { key: "frameworks", label: "Frameworks", value: frameworks.length },
  ] as const

  const groupedModules = modules.reduce<Record<string, typeof modules>>(
    (acc, module) => {
      if (!acc[module.level]) acc[module.level] = []
      acc[module.level].push(module)
      return acc
    },
    {}
  )

  return (
    <div className="container py-6 space-y-10">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted">
          Subject Blueprint
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          {subject.name} Blueprint
        </h1>
        <p className="text-lg text-editorial-muted leading-relaxed max-w-2xl">
          The operating map for {subject.name.toLowerCase()} inside Founder OS:
          what matters, what to build first, and where execution, learning, and
          systems connect.
        </p>
      </div>

      <section className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {counts.map((item) => {
          const Icon = COUNT_ICONS[item.key]
          return (
            <div
              key={item.key}
              className="rounded-[18px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-4"
            >
              <div className="flex items-center gap-2 text-editorial-muted mb-2">
                <Icon className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.12em]">
                  {item.label}
                </span>
              </div>
              <p className="font-serif text-2xl font-semibold text-editorial-ink">
                {item.value}
              </p>
            </div>
          )
        })}
      </section>

      {(subject.slug === "marketing" || subject.slug === "sales") && (
        <section className="space-y-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">
              System View
            </h2>
            <p className="text-sm text-editorial-muted mt-2">
              This is the connected operating surface underneath the subject. The
              point is not isolated tactics. The point is how the whole system
              moves together.
            </p>
          </div>
          {subject.slug === "marketing" ? <MarketingSystemMap /> : <SalesSystemMap />}
        </section>
      )}

      {domainMeta && (
        <section className="space-y-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">
              Operating Rhythm
            </h2>
            <p className="text-sm text-editorial-muted mt-2">
              The recurring metrics and cadences that make this subject
              manageable as an operating system, not just a study topic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-5">
              <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3 flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" />
                Core Metrics
              </h3>
              <div className="space-y-3">
                {domainMeta.coreMetrics.map((metric) => (
                  <div key={metric.name}>
                    <p className="font-medium text-editorial-ink text-sm">
                      {metric.name}
                    </p>
                    <p className="text-xs text-editorial-muted">
                      {metric.description}
                    </p>
                    <p className="text-xs text-editorial-green mt-1">
                      Target: {metric.target}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-5 space-y-5">
              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Weekly Rhythm
                </h3>
                <div className="space-y-2">
                  {domainMeta.weeklyRhythm.map((item) => (
                    <div key={`${item.day}-${item.activity}`}>
                      <p className="text-sm font-medium text-editorial-ink">
                        {item.day}
                      </p>
                      <p className="text-xs text-editorial-muted">
                        {item.activity} · {item.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3">
                  Monthly Rhythm
                </h3>
                <div className="space-y-2">
                  {domainMeta.monthlyRhythm.map((item) => (
                    <div key={`${item.week}-${item.focus}`}>
                      <p className="text-sm font-medium text-editorial-ink">
                        Week {item.week}: {item.focus}
                      </p>
                      <p className="text-xs text-editorial-muted">
                        {item.deliverable}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {modules.length > 0 && (
        <section className="space-y-5">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">
              Learning Path
            </h2>
            <p className="text-sm text-editorial-muted mt-2">
              The current subject depth is organized into a sequence of modules
              that move from foundation to operator judgment.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Object.entries(groupedModules).map(([level, items]) => (
              <div
                key={level}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-5"
              >
                <h3 className="font-serif text-xl font-semibold text-editorial-ink capitalize mb-3">
                  {level}
                </h3>
                <div className="space-y-3">
                  {items.map((module) => (
                    <Link
                      key={module.slug}
                      href={`/${subject.slug}/learn/modules/${module.slug}`}
                      className="block rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/70 p-3 hover:shadow-editorial-soft transition-shadow"
                    >
                      <p className="font-medium text-editorial-ink text-sm">
                        {module.title}
                      </p>
                      <p className="text-xs text-editorial-muted mt-1 line-clamp-2">
                        {module.shortSummary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-5">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink mb-4">
            Operator Assets
          </h2>
          <div className="space-y-3 text-sm text-editorial-muted">
            <p>{playbooks.length} playbooks for execution right now.</p>
            <p>{systems.length} systems for repeatable operating rhythm.</p>
            <p>{prompts.length} prompt packs and {templates.length} templates for leverage.</p>
            <p>{projects.length} projects for hands-on proof of capability.</p>
            <p>{scenarios.length} day-in-the-life scenarios for role context.</p>
          </div>
        </div>

        <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-5">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink mb-4">
            Start Here
          </h2>
          <div className="space-y-3">
            {playbooks.slice(0, 2).map((playbook) => (
              <Link
                key={playbook.slug}
                href={`/${subject.slug}/playbooks/${playbook.slug}`}
                className="block rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/70 p-3 hover:shadow-editorial-soft transition-shadow"
              >
                <p className="font-medium text-editorial-ink text-sm">
                  {playbook.title}
                </p>
                <p className="text-xs text-editorial-muted mt-1">
                  {playbook.summary}
                </p>
              </Link>
            ))}
            {playbooks.length === 0 && modules[0] && (
              <Link
                href={`/${subject.slug}/learn/modules/${modules[0].slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-editorial-green hover:underline"
              >
                Open the first module <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {(projects.length > 0 || tools.length > 0 || templates.length > 0) && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-5">
            <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3 flex items-center gap-1.5">
              <FolderKanban className="h-3.5 w-3.5" />
              Projects
            </h3>
            <p className="text-3xl font-serif font-semibold text-editorial-ink">
              {projects.length}
            </p>
            <p className="text-sm text-editorial-muted mt-2">
              Build proof, not just understanding.
            </p>
          </div>

          <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-5">
            <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3 flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5" />
              Tools
            </h3>
            <p className="text-3xl font-serif font-semibold text-editorial-ink">
              {tools.length}
            </p>
            <p className="text-sm text-editorial-muted mt-2">
              The current stack, with subject-native recommendations.
            </p>
          </div>

          <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] p-5">
            <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Templates
            </h3>
            <p className="text-3xl font-serif font-semibold text-editorial-ink">
              {templates.length}
            </p>
            <p className="text-sm text-editorial-muted mt-2">
              Operating assets that speed execution.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
