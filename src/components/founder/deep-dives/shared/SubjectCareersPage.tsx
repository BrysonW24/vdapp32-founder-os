import { BadgeCheck, Briefcase, Users } from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import { getDayInLifeScenarios, getModules } from "@/lib/content"

interface SubjectCareersPageProps {
  subject: SubjectManifest
}

export function SubjectCareersPage({ subject }: SubjectCareersPageProps) {
  const scenarios = getDayInLifeScenarios(subject.slug)
  const modules = getModules(subject.slug)

  const roleCards =
    scenarios.length > 0
      ? scenarios.map((scenario) => ({
          title: scenario.title,
          description: scenario.description,
          context: `${scenario.companySize} · ${scenario.setting}`,
          salary: scenario.salary,
        }))
      : [
          {
            title: `${subject.name} Operator`,
            description: `Build the execution base and handle the weekly work inside ${subject.name.toLowerCase()}.`,
            context: "Early-stage team",
            salary: "Varies by market and stage",
          },
          {
            title: `${subject.name} Lead`,
            description: "Own the system, the metrics, and the cross-functional decisions around the work.",
            context: "Growth-stage team",
            salary: "Varies by market and stage",
          },
        ]

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Career Paths
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Career paths in {subject.name.toLowerCase()}
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The useful question is not “what title should I chase?” but “what proof of
          competence should I build next?” These role shapes help anchor that thinking.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {roleCards.map((role) => (
          <div
            key={role.title}
            className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-5"
          >
            <div className="flex items-center gap-2 text-editorial-muted">
              <Briefcase className="h-4 w-4 text-editorial-green" />
              <p className="text-xs uppercase tracking-[0.18em]">{role.context}</p>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-editorial-ink">
              {role.title}
            </h2>
            <p className="mt-3 text-sm text-editorial-muted leading-relaxed">
              {role.description}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-editorial-muted">
              Indicative compensation: {role.salary}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(241,236,225,0.45)] p-6">
        <div className="flex items-center gap-2 text-editorial-muted">
          <Users className="h-4 w-4 text-editorial-green" />
          <p className="text-xs uppercase tracking-[0.18em]">Readiness signals</p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {modules.slice(0, 6).map((module) => (
            <div key={module.slug} className="rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-3">
              <div className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 h-4 w-4 text-editorial-green shrink-0" />
                <div>
                  <p className="font-medium text-editorial-ink text-sm">{module.title}</p>
                  <p className="text-xs text-editorial-muted mt-1 line-clamp-2">
                    {module.shortSummary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
