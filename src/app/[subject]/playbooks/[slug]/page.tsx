import { notFound } from "next/navigation"
import { getSubjects, getSubject, getPlaybooks, getPlaybook } from "@/lib/content"
import Link from "next/link"
import { Clock, CheckCircle2, Bot } from "lucide-react"

export async function generateStaticParams() {
  return getSubjects().flatMap((s) =>
    getPlaybooks(s.slug).map((pb) => ({ subject: s.slug, slug: pb.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject, slug } = await params
  const pb = getPlaybook(subject, slug)
  if (!pb) return { title: "Not Found" }
  return { title: pb.title }
}

export default async function PlaybookDetailPage({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject: subjectSlug, slug } = await params
  const subject = getSubject(subjectSlug)
  const playbook = getPlaybook(subjectSlug, slug)
  if (!subject || !playbook) notFound()

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <nav className="text-sm text-editorial-muted mb-6">
        <Link href={`/${subjectSlug}`} className="hover:text-editorial-ink">
          {subject.name}
        </Link>
        {" / "}
        <Link
          href={`/${subjectSlug}/playbooks`}
          className="hover:text-editorial-ink"
        >
          Playbooks
        </Link>
        {" / "}
        <span className="text-editorial-ink">{playbook.title}</span>
      </nav>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green">
          {playbook.difficulty}
        </span>
        <span className="flex items-center gap-1 text-xs text-editorial-muted">
          <Clock className="h-3 w-3" />
          {playbook.timeToComplete}
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-4">
        {playbook.title}
      </h1>

      <p className="text-editorial-muted text-lg mb-6">{playbook.summary}</p>

      <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-editorial-amber-soft p-6 mb-8">
        <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
          When to use this
        </h2>
        <p className="text-editorial-muted">{playbook.whenToUseIt}</p>
      </div>

      <div className="mb-8">
        <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4">
          Steps
        </h2>
        <div className="space-y-4">
          {playbook.steps.map((step, i) => (
            <div
              key={i}
              className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-editorial-green text-white text-xs font-semibold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-editorial-ink mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-editorial-muted">
                    {step.description}
                  </p>
                  {step.tips && (
                    <p className="text-sm text-editorial-amber mt-2 italic">
                      Tip: {step.tips}
                    </p>
                  )}
                  {step.tools && step.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {step.tools.map((tool) => (
                        <span
                          key={tool}
                          className="inline-block rounded-full px-2 py-0.5 text-xs bg-editorial-blue-soft text-editorial-blue"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.aiPrompt && (
                    <div className="mt-3 rounded-[12px] bg-editorial-blue-soft border border-editorial-blue/10 p-3">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Bot className="h-3.5 w-3.5 text-editorial-blue" />
                        <span className="text-[10px] uppercase tracking-wider font-medium text-editorial-blue">
                          AI Prompt
                        </span>
                      </div>
                      <p className="text-sm text-editorial-muted italic">
                        {step.aiPrompt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-editorial-green-soft p-6 mb-8">
        <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
          Expected Outcome
        </h2>
        <p className="text-editorial-muted">{playbook.expectedOutcome}</p>
      </div>

      {playbook.commonMistakes.length > 0 && (
        <div className="mb-8">
          <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-3">
            Common Mistakes
          </h2>
          <ul className="space-y-2">
            {playbook.commonMistakes.map((mistake, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-editorial-muted"
              >
                <span className="text-editorial-red mt-0.5">×</span>
                {mistake}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-8">
        <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-3">
          Checklist
        </h2>
        <ul className="space-y-2">
          {playbook.steps.map((step, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm text-editorial-muted"
            >
              <CheckCircle2 className="h-4 w-4 text-editorial-green" />
              {step.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
