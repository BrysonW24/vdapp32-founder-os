import { notFound } from "next/navigation"
import { getSubjects, getSubject, getModules, getModule, getLessons } from "@/lib/content"
import Link from "next/link"

export async function generateStaticParams() {
  return getSubjects().flatMap((s) =>
    getModules(s.slug).map((m) => ({ subject: s.slug, slug: m.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject, slug } = await params
  const mod = getModule(subject, slug)
  if (!mod) return { title: "Not Found" }
  return { title: mod.title }
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject: subjectSlug, slug } = await params
  const subject = getSubject(subjectSlug)
  const mod = getModule(subjectSlug, slug)
  if (!subject || !mod) notFound()

  const lessons = getLessons(subjectSlug, mod.slug)

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <nav className="text-sm text-editorial-muted mb-6">
        <Link href={`/${subjectSlug}`} className="hover:text-editorial-ink">
          {subject.name}
        </Link>
        {" / "}
        <Link
          href={`/${subjectSlug}/learn/modules`}
          className="hover:text-editorial-ink"
        >
          Modules
        </Link>
        {" / "}
        <span className="text-editorial-ink">{mod.title}</span>
      </nav>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green">
          {mod.level}
        </span>
        {mod.status === "coming-soon" && (
          <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-amber-soft text-editorial-amber">
            Coming soon
          </span>
        )}
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-4">
        {mod.title}
      </h1>

      <p className="text-editorial-muted text-lg mb-8">{mod.shortSummary}</p>

      <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-6 mb-8">
        <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-2">
          Why it matters
        </h2>
        <p className="text-editorial-muted">{mod.whyItMatters}</p>
      </div>

      <div className="mb-8">
        <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4">
          Core Concepts
        </h2>
        <ul className="space-y-2">
          {mod.coreConcepts.map((concept, i) => (
            <li key={i} className="flex items-start gap-2 text-editorial-muted">
              <span className="text-editorial-green mt-0.5">•</span>
              {concept}
            </li>
          ))}
        </ul>
      </div>

      {lessons.length > 0 && (
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4">
            Lessons
          </h2>
          <div className="space-y-3">
            {lessons.map((lesson, i) => (
              <Link
                key={lesson.slug}
                href={`/${subjectSlug}/learn/modules/${mod.slug}/${lesson.slug}`}
                className="flex items-center gap-3 rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-4 hover:shadow-editorial-soft transition-shadow"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-editorial-green-soft text-editorial-green text-xs font-semibold">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-editorial-ink">
                    {lesson.title}
                  </p>
                  <p className="text-sm text-editorial-muted line-clamp-1">
                    {lesson.objective}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {mod.frameworks.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-3">
            Related Frameworks
          </h2>
          <div className="flex flex-wrap gap-2">
            {mod.frameworks.map((fw) => (
              <span
                key={fw}
                className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-editorial-blue-soft text-editorial-blue"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
