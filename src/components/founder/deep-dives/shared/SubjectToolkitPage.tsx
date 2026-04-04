import { Lightbulb, Sparkles } from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import { getFrameworks, getModules } from "@/lib/content"
import { FrameworkCard } from "@/components/academy/cards/FrameworkCard"

interface SubjectToolkitPageProps {
  subject: SubjectManifest
}

export function SubjectToolkitPage({ subject }: SubjectToolkitPageProps) {
  const frameworks = getFrameworks(subject.slug)
  const modules = getModules(subject.slug)

  const mentionCounts = new Map<string, number>()
  for (const learningModule of modules) {
    for (const frameworkSlug of learningModule.frameworks) {
      mentionCounts.set(
        frameworkSlug,
        (mentionCounts.get(frameworkSlug) ?? 0) + 1
      )
    }
  }

  const featured = [...frameworks]
    .sort((a, b) => (mentionCounts.get(b.slug) ?? 0) - (mentionCounts.get(a.slug) ?? 0))
    .slice(0, 6)

  const featuredSlugs = new Set(featured.map((framework) => framework.slug))
  const grouped = frameworks.reduce<Record<string, typeof frameworks>>(
    (acc, framework) => {
      const category = framework.category || "general"
      if (!acc[category]) acc[category] = []
      acc[category].push(framework)
      return acc
    },
    {}
  )

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Mental Models
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          {subject.name} Toolkit
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The mental models, frameworks, and operating lenses that make
          {` ${subject.name.toLowerCase()} `}
          decisions cleaner and faster.
        </p>
      </div>

      {featured.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-editorial-muted">
            <Sparkles className="h-4 w-4 text-editorial-green" />
            Most referenced in the current curriculum
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map((framework) => (
              <FrameworkCard
                key={framework.slug}
                framework={framework}
                essential={featuredSlugs.has(framework.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-editorial-amber" />
            <h2 className="text-2xl font-serif font-bold text-editorial-ink capitalize">
              {category.replace(/-/g, " ")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((framework) => (
              <FrameworkCard
                key={framework.slug}
                framework={framework}
                essential={featuredSlugs.has(framework.slug)}
              />
            ))}
          </div>
        </section>
      ))}

      {frameworks.length === 0 && (
        <p className="text-editorial-muted text-center py-12">
          Frameworks are being added. Check back soon.
        </p>
      )}
    </div>
  )
}
