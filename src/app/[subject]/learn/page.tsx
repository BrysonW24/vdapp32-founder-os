import { notFound } from "next/navigation"
import { getSubject, getModules, getAllLessons } from "@/lib/content"
import Link from "next/link"

export default async function LearnPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  const modules = getModules(slug)
  const lessons = getAllLessons(slug)

  const totalModules = modules.length
  const totalLessons = lessons.length

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-2">
          {subject.name}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-3">
          Learn {subject.name}
        </h1>
        <p className="text-editorial-muted text-lg max-w-2xl">
          {subject.tagline}. {totalModules} modules with {totalLessons} lessons
          to build your understanding.
        </p>
      </div>

      <div className="flex gap-3 mb-8">
        <Link
          href={`/${slug}/learn/modules`}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-editorial-green text-white hover:bg-editorial-green/90 transition-colors"
        >
          Browse Modules
        </Link>
        <Link
          href={`/${slug}/blueprint`}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border border-[rgba(44,49,59,0.12)] text-editorial-ink hover:bg-white/50 transition-colors"
        >
          View Blueprint
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link
            key={mod.slug}
            href={`/${slug}/learn/modules/${mod.slug}`}
            className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft backdrop-blur-[18px] p-6 hover:shadow-editorial-hover transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green">
                {mod.level}
              </span>
              {mod.status === "coming-soon" && (
                <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-amber-soft text-editorial-amber">
                  Coming soon
                </span>
              )}
            </div>
            <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
              {mod.title}
            </h3>
            <p className="text-sm text-editorial-muted line-clamp-2">
              {mod.shortSummary}
            </p>
            <p className="text-xs text-editorial-muted mt-3">
              {mod.lessons.length} lessons
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
