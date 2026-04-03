import { notFound } from "next/navigation"
import { getSubjects, getSubject, getTools, getTool } from "@/lib/content"
import Link from "next/link"

export async function generateStaticParams() {
  return getSubjects().flatMap((s) =>
    getTools(s.slug).map((t) => ({ subject: s.slug, slug: t.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject, slug } = await params
  const tool = getTool(subject, slug)
  if (!tool) return { title: "Not Found" }
  return { title: tool.name }
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject: subjectSlug, slug } = await params
  const subject = getSubject(subjectSlug)
  const tool = getTool(subjectSlug, slug)
  if (!subject || !tool) notFound()

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <nav className="text-sm text-editorial-muted mb-6">
        <Link href={`/${subjectSlug}`} className="hover:text-editorial-ink">
          {subject.name}
        </Link>
        {" / "}
        <Link
          href={`/${subjectSlug}/tools`}
          className="hover:text-editorial-ink"
        >
          Tools
        </Link>
        {" / "}
        <span className="text-editorial-ink">{tool.name}</span>
      </nav>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green">
          {tool.pricingTier}
        </span>
        <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-blue-soft text-editorial-blue capitalize">
          {tool.category.replace(/-/g, " ")}
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-4">
        {tool.name}
      </h1>

      <p className="text-editorial-muted text-lg mb-6">{tool.description}</p>

      <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-6 mb-6">
        <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
          Why use it
        </h2>
        <p className="text-editorial-muted">{tool.whyUseIt}</p>
      </div>

      {tool.url && (
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-editorial-green text-white hover:bg-editorial-green/90 transition-colors mb-6"
        >
          Visit {tool.name} →
        </a>
      )}

      {tool.alternatives.length > 0 && (
        <div className="mt-6">
          <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-3">
            Alternatives
          </h2>
          <div className="flex flex-wrap gap-2">
            {tool.alternatives.map((alt) => (
              <span
                key={alt}
                className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-editorial-amber-soft text-editorial-amber"
              >
                {alt}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
