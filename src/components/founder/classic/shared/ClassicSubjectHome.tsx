import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  FileText,
  FolderKanban,
  Layers,
  RefreshCw,
  Wrench,
} from "lucide-react"
import HeroScene from "@/components/academy/hero/HeroScene"
import { ModuleCard } from "@/components/academy/cards/ModuleCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type {
  BusinessSystem,
  DomainMeta,
  Framework,
  Module,
  Playbook,
  Project,
  SubjectManifest,
  Template,
  Tool,
  PromptPack,
} from "@/types/curriculum"

interface ClassicSubjectHomeProps {
  subject: SubjectManifest
  modules: Module[]
  playbooks: Playbook[]
  systems: BusinessSystem[]
  tools: Tool[]
  projects: Project[]
  frameworks: Framework[]
  domainMeta: DomainMeta | null
  prompts: PromptPack[]
  templates: Template[]
}

export function ClassicSubjectHome({
  subject,
  modules,
  playbooks,
  systems,
  tools,
  projects,
  frameworks,
  domainMeta,
  prompts,
  templates,
}: ClassicSubjectHomeProps) {
  const subjectRoot = `/${subject.slug}`
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0)
  const heroStats = [
    { icon: BookOpen, label: `${modules.length} modules` },
    { icon: Layers, label: `${totalLessons} lessons` },
    { icon: Wrench, label: `${tools.length} tools` },
    { icon: FolderKanban, label: `${projects.length} projects` },
  ]
  const operatorCards = [
    {
      href: `${subjectRoot}/playbooks`,
      icon: FileText,
      title: "Playbooks",
      count: playbooks.length,
      description: "Action-by-action operating guides you can run immediately.",
    },
    {
      href: `${subjectRoot}/systems`,
      icon: RefreshCw,
      title: "Systems",
      count: systems.length,
      description: "Repeatable operating cadences, ownership rules, and review loops.",
    },
    {
      href: `${subjectRoot}/tools`,
      icon: Wrench,
      title: "Tools",
      count: tools.length,
      description: "The stack, categories, and workflow expectations for this subject.",
    },
    {
      href: `${subjectRoot}/toolkit`,
      icon: Brain,
      title: "Toolkit",
      count: frameworks.length,
      description: "Mental models, frameworks, and decision structures that sharpen judgment.",
    },
  ]

  return (
    <>
      <section className="relative min-h-[60vh] sm:min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center sm:justify-end sm:pr-8 opacity-40 sm:opacity-60">
          <HeroScene />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#f7f3ea]/95 via-[#f7f3ea]/75 to-transparent" />

        <div className="container relative z-10 mx-auto px-4 py-10 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
              {subject.name} Academy
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
              {subject.name}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-editorial-muted leading-relaxed max-w-xl">
              {subject.tagline}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href={`${subjectRoot}/learn/modules`}
                className="inline-flex items-center justify-center rounded-[14px] bg-editorial-green px-5 py-3 text-sm font-medium text-white shadow-editorial-soft"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href={`${subjectRoot}/learning-map`}
                className="inline-flex items-center justify-center rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/70 px-5 py-3 text-sm font-medium text-editorial-ink"
              >
                Explore the Map
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-editorial-muted">
              {heroStats.map((item) => {
                const Icon = item.icon
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/60 px-3 py-1"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start max-w-6xl mx-auto">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
                Operator Stack
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-4">
                Learn the system and run the work
              </h2>
              <p className="text-sm sm:text-base text-editorial-muted leading-relaxed max-w-2xl">
                This subject is structured like the strongest original academies: a visual
                home, a learning map, hands-on projects, tools, and an operator layer of
                playbooks and systems.
              </p>
            </div>

            {domainMeta && (
              <Card className="bg-[rgba(255,255,255,0.82)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Operating Rhythm Snapshot</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {domainMeta.coreMetrics.slice(0, 4).map((metric) => (
                    <div key={metric.name} className="flex items-start gap-3 text-sm text-editorial-muted">
                      <BarBullet />
                      <div>
                        <p className="font-medium text-editorial-ink">{metric.name}</p>
                        <p>{metric.description}</p>
                      </div>
                    </div>
                  ))}
                  {domainMeta.weeklyRhythm[0] && (
                    <div className="rounded-[14px] bg-[rgba(241,236,225,0.45)] p-3 text-sm text-editorial-muted">
                      <div className="flex items-center gap-2 mb-1 text-editorial-ink font-medium">
                        <Calendar className="h-4 w-4 text-editorial-green" />
                        Weekly anchor
                      </div>
                      <p>{domainMeta.weeklyRhythm[0].day}: {domainMeta.weeklyRhythm[0].activity}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 max-w-6xl mx-auto mt-8">
            {operatorCards.map((card) => {
              const Icon = card.icon
              return (
                <Link key={card.title} href={card.href} className="block group">
                  <Card className="h-full hover:-translate-y-1 transition-transform duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft mb-3">
                        <Icon className="h-5 w-5 text-editorial-green" />
                      </div>
                      <CardTitle className="text-lg">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-editorial-muted leading-relaxed">{card.description}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-editorial-muted">
                        {card.count} items
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.4)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
                What Is In Here
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-3">
                Full-depth subject content, not a thin shell
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <SnapshotCard title="Frameworks" count={frameworks.length} description="Reusable decision structures and mental models." />
              <SnapshotCard title="Prompts" count={prompts.length} description="Reusable AI prompts and structured asks where the subject benefits from them." />
              <SnapshotCard title="Templates" count={templates.length} description="Operator-ready templates, checklists, and canvases." />
              <SnapshotCard title="Projects" count={projects.length} description="Hands-on work that turns theory into evidence." />
            </div>
          </div>
        </div>
      </section>

      <ClassicModulesPreview subjectSlug={subject.slug} modules={modules} />
    </>
  )
}

export function ClassicModulesPreview({
  subjectSlug,
  modules,
}: {
  subjectSlug: string
  modules: Module[]
}) {
  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
            Module Stack
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-3">
            Work through the curriculum in order
          </h2>
          <p className="text-sm text-editorial-muted max-w-2xl mx-auto">
            The classic academy flow still starts with modules, then moves into projects,
            tools, and the deeper operating layers around the work.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.slice(0, 6).map((module) => (
            <ModuleCard
              key={module.slug}
              module={module}
              basePath={`/${subjectSlug}/learn/modules`}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/${subjectSlug}/learn/modules`}
            className="inline-flex items-center gap-2 rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/70 px-5 py-3 text-sm font-medium text-editorial-ink"
          >
            View all modules
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function SnapshotCard({
  title,
  count,
  description,
}: {
  title: string
  count: number
  description: string
}) {
  return (
    <Card className="bg-[rgba(255,255,255,0.82)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-serif text-editorial-ink mb-2">{count}</p>
        <p className="text-sm text-editorial-muted leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  )
}

function BarBullet() {
  return <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-editorial-green shrink-0" />
}
