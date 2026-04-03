import { notFound } from "next/navigation"
import { getSubject, getProjects } from "@/lib/content"
import Link from "next/link"

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  const projects = getProjects(slug)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-2">
          {subject.name}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-3">
          Projects
        </h1>
        <p className="text-editorial-muted text-lg max-w-2xl">
          Hands-on practice. Build real deliverables to learn by doing.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-12 text-center">
          <p className="text-editorial-muted text-lg">
            No projects yet for {subject.name}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj) => (
            <Link
              key={proj.slug}
              href={`/${slug}/projects/${proj.slug}`}
              className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft backdrop-blur-[18px] p-6 hover:shadow-editorial-hover transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-amber-soft text-editorial-amber">
                  Difficulty {proj.difficulty}/10
                </span>
                <span className="text-xs text-editorial-muted">
                  ~{proj.estimatedHours}h
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
                {proj.title}
              </h3>
              <p className="text-sm text-editorial-muted line-clamp-2">
                {proj.description}
              </p>
              <p className="text-xs text-editorial-muted mt-3">
                {proj.steps.length} steps · {proj.deliverables.length}{" "}
                deliverables
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
