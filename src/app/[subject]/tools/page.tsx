import { notFound } from "next/navigation"
import { getSubject, getTools } from "@/lib/content"
import Link from "next/link"

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  const tools = getTools(slug)

  // Group tools by category
  const grouped = tools.reduce<Record<string, typeof tools>>((acc, tool) => {
    const cat = tool.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(tool)
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-2">
          {subject.name}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-3">
          Tools
        </h1>
        <p className="text-editorial-muted text-lg max-w-2xl">
          {tools.length} tools for {subject.name.toLowerCase()}. What to use,
          when, and why.
        </p>
      </div>

      {Object.entries(grouped).map(([category, categoryTools]) => (
        <div key={category} className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4 capitalize">
            {category.replace(/-/g, " ")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${slug}/tools/${tool.slug}`}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft backdrop-blur-[18px] p-5 hover:shadow-editorial-hover transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green">
                    {tool.pricingTier}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-editorial-muted line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {tools.length === 0 && (
        <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-12 text-center">
          <p className="text-editorial-muted text-lg">
            No tools yet for {subject.name}
          </p>
        </div>
      )}
    </div>
  )
}
