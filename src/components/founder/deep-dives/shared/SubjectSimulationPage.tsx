import { AlertTriangle, CheckCircle2, Compass } from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import { getAllDomainMeta, getPlaybooks, getSimulations, getSystems } from "@/lib/content"

interface SubjectSimulationPageProps {
  subject: SubjectManifest
}

export function SubjectSimulationPage({ subject }: SubjectSimulationPageProps) {
  const simulations = getSimulations(subject.slug)
  const domainMeta = getAllDomainMeta(subject.slug)[0] ?? null
  const playbooks = getPlaybooks(subject.slug)
  const systems = getSystems(subject.slug)

  if (simulations.length > 0) {
    return (
      <div className="container py-6 space-y-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
            Simulation
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
            Practice under pressure
          </h1>
          <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
            Run realistic decision scenarios, compare tradeoffs, and debrief the
            consequences before the live stakes get expensive.
          </p>
        </div>

        <section className="grid gap-4">
          {simulations.map((simulation) => (
            <div
              key={simulation.slug}
              className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-6"
            >
              <h2 className="font-serif text-2xl font-bold text-editorial-ink">
                {simulation.title}
              </h2>
              <p className="mt-3 text-sm text-editorial-muted leading-relaxed">
                {simulation.context}
              </p>
              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                {simulation.decisions.map((decision) => (
                  <div key={decision.id} className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-4">
                    <p className="font-medium text-editorial-ink text-sm">{decision.prompt}</p>
                    <p className="mt-2 text-xs text-editorial-muted">
                      {decision.options[0]?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    )
  }

  const decisionPrompts = [
    `Which metric matters most this week in ${subject.name.toLowerCase()} and why?`,
    "What action would you take first if the signal is worsening faster than expected?",
    "What should stay manual for now, and what is ready to become a process or system?",
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Simulation
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          {subject.name} pressure test
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Use this as a guided scenario drill: pick the signal that matters, decide
          what you would change first, then test your answer against the operating
          assets already in the subject.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-6">
          <div className="flex items-center gap-2 text-editorial-muted">
            <Compass className="h-4 w-4 text-editorial-green" />
            <p className="text-xs uppercase tracking-[0.18em]">Scenario brief</p>
          </div>
          <p className="mt-3 text-sm text-editorial-muted leading-relaxed">
            Performance is wobbling, attention is fragmented, and the team needs a
            cleaner operating response. Treat this like a weekly leadership checkpoint,
            not a theoretical exercise.
          </p>
          <div className="mt-5 space-y-3">
            {decisionPrompts.map((prompt) => (
              <div key={prompt} className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-4">
                <p className="font-medium text-editorial-ink text-sm">{prompt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {domainMeta && (
            <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-5">
              <div className="flex items-center gap-2 text-editorial-muted">
                <AlertTriangle className="h-4 w-4 text-editorial-amber" />
                <p className="text-xs uppercase tracking-[0.18em]">Signals to watch</p>
              </div>
              <div className="mt-4 space-y-3">
                {domainMeta.coreMetrics.slice(0, 3).map((metric) => (
                  <div key={metric.name}>
                    <p className="font-medium text-editorial-ink text-sm">{metric.name}</p>
                    <p className="text-xs text-editorial-muted mt-1">{metric.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-5">
            <div className="flex items-center gap-2 text-editorial-muted">
              <CheckCircle2 className="h-4 w-4 text-editorial-green" />
              <p className="text-xs uppercase tracking-[0.18em]">Use these assets</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-editorial-muted">
              <p>{playbooks.length} playbooks ready for active response.</p>
              <p>{systems.length} systems that can stabilize recurring work.</p>
              <p>Debrief by asking what should become a rhythm instead of staying a fire drill.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
