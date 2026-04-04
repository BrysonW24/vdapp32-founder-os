import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Compass,
  FileText,
  Wrench,
} from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import {
  getAllDomainMeta,
  getModules,
  getPlaybooks,
  getSystems,
  getTools,
} from "@/lib/content"
import { getGeneratedDeepDiveDefinition } from "@/lib/generated-deep-dives"

interface GeneratedDeepDivePageProps {
  subject: SubjectManifest
  slug: string
  label?: string
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2)
}

export function GeneratedDeepDivePage({
  subject,
  slug,
  label,
}: GeneratedDeepDivePageProps) {
  const definition = getGeneratedDeepDiveDefinition(subject, slug, label)
  const modules = getModules(subject.slug)
  const playbooks = getPlaybooks(subject.slug)
  const systems = getSystems(subject.slug)
  const tools = getTools(subject.slug)
  const domainMeta = getAllDomainMeta(subject.slug)[0] ?? null
  const tokens = new Set(tokenize(`${slug} ${definition.title}`))

  const relatedModules = modules
    .map((module) => ({
      module,
      score: [...tokens].reduce((sum, token) => {
        const haystack = `${module.title} ${module.shortSummary}`.toLowerCase()
        return sum + (haystack.includes(token) ? 1 : 0)
      }, 0),
    }))
    .sort((a, b) => b.score - a.score || a.module.order - b.module.order)
    .map((entry) => entry.module)
    .slice(0, 4)

  const suggestedTools = tools.slice(0, 4)

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          {definition.eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          {definition.title}
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          {definition.summary}
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-6">
          <div className="flex items-center gap-2 text-editorial-muted">
            <Compass className="h-4 w-4 text-editorial-green" />
            <p className="text-xs uppercase tracking-[0.18em]">Operator questions</p>
          </div>
          <div className="mt-4 space-y-3">
            {definition.questions.map((question) => (
              <div key={question} className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-4">
                <p className="font-medium text-editorial-ink text-sm">{question}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(241,236,225,0.45)] p-6">
          <div className="flex items-center gap-2 text-editorial-muted">
            <FileText className="h-4 w-4 text-editorial-green" />
            <p className="text-xs uppercase tracking-[0.18em]">What good leaves behind</p>
          </div>
          <div className="mt-4 space-y-3">
            {definition.artifacts.map((artifact) => (
              <div key={artifact} className="rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-editorial-green shrink-0" />
                  <p className="text-sm text-editorial-ink">{artifact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-6">
          <div className="flex items-center gap-2 text-editorial-muted">
            <AlertTriangle className="h-4 w-4 text-editorial-amber" />
            <p className="text-xs uppercase tracking-[0.18em]">Common failure modes</p>
          </div>
          <div className="mt-4 space-y-3">
            {definition.failureModes.map((item) => (
              <div key={item} className="rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-3 text-sm text-editorial-muted">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-6">
          <div className="flex items-center gap-2 text-editorial-muted">
            <Wrench className="h-4 w-4 text-editorial-green" />
            <p className="text-xs uppercase tracking-[0.18em]">Leverage points</p>
          </div>
          <div className="mt-4 space-y-3">
            {suggestedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${subject.slug}/tools/${tool.slug}`}
                className="block rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-3 hover:shadow-editorial-soft transition-shadow"
              >
                <p className="font-medium text-editorial-ink text-sm">{tool.name}</p>
                <p className="text-xs text-editorial-muted mt-1 line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">Related curriculum</p>
          <div className="mt-4 space-y-3">
            {relatedModules.map((module) => (
              <Link
                key={module.slug}
                href={`/${subject.slug}/learn/modules/${module.slug}`}
                className="block rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-3 hover:shadow-editorial-soft transition-shadow"
              >
                <p className="font-medium text-editorial-ink text-sm">{module.title}</p>
                <p className="text-xs text-editorial-muted mt-1 line-clamp-2">
                  {module.shortSummary}
                </p>
              </Link>
            ))}
            {relatedModules.length === 0 && (
              <p className="text-sm text-editorial-muted">
                The module set is still being organized for this page.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-[24px] border border-[rgba(44,49,59,0.08)] bg-[rgba(241,236,225,0.45)] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">Next moves</p>
          <div className="mt-4 space-y-3">
            {definition.nextMoves.map((move) => (
              <div key={move} className="rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-3 text-sm text-editorial-muted">
                {move}
              </div>
            ))}
          </div>
          {domainMeta && (
            <div className="mt-5 rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-editorial-muted">Anchor metric</p>
              <p className="mt-2 font-medium text-editorial-ink text-sm">
                {domainMeta.coreMetrics[0]?.name}
              </p>
              <p className="mt-1 text-xs text-editorial-muted">
                {domainMeta.coreMetrics[0]?.description}
              </p>
            </div>
          )}
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-editorial-muted">
            {playbooks[0] && (
              <Link href={`/${subject.slug}/playbooks/${playbooks[0].slug}`} className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/80 px-4 py-2">
                First playbook <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {systems[0] && (
              <Link href={`/${subject.slug}/systems/${systems[0].slug}`} className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/80 px-4 py-2">
                First system <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
