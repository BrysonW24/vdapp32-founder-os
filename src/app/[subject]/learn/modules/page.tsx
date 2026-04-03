import { notFound } from "next/navigation"
import { getSubject, getModules } from "@/lib/content"
import { ModuleCard } from "@/components/academy/cards/ModuleCard"

export default async function ModulesPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  const modules = getModules(slug)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-2">
          {subject.name} · Learn
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-3">
          Modules
        </h1>
        <p className="text-editorial-muted text-lg">
          {modules.length} modules covering {subject.name.toLowerCase()} from
          foundations to advanced.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <ModuleCard
            key={mod.slug}
            module={mod}
            basePath={`/${slug}/learn/modules`}
          />
        ))}
      </div>
    </div>
  )
}
