import { notFound } from "next/navigation"
import { getSubjects, getSubject, getProjects, getProject } from "@/lib/content"
import Link from "next/link"

export async function generateStaticParams() {
  return getSubjects().flatMap((s) =>
    getProjects(s.slug).map((p) => ({ subject: s.slug, slug: p.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject, slug } = await params
  const proj = getProject(subject, slug)
  if (!proj) return { title: "Not Found" }
  return { title: proj.title }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ subject: string; slug: string }>
}) {
  const { subject: subjectSlug, slug } = await params
  const subject = getSubject(subjectSlug)
  const project = getProject(subjectSlug, slug)
  if (!subject || !project) notFound()

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <nav className="text-sm text-editorial-muted mb-6">
        <Link href={`/${subjectSlug}`} className="hover:text-editorial-ink">
          {subject.name}
        </Link>
        {" / "}
        <Link
          href={`/${subjectSlug}/projects`}
          className="hover:text-editorial-ink"
        >
          Projects
        </Link>
        {" / "}
        <span className="text-editorial-ink">{project.title}</span>
      </nav>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-amber-soft text-editorial-amber">
          Difficulty {project.difficulty}/10
        </span>
        <span className="text-xs text-editorial-muted">
          ~{project.estimatedHours} hours
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-4">
        {project.title}
      </h1>

      <p className="text-editorial-muted text-lg mb-6">
        {project.description}
      </p>

      <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-6 mb-8">
        <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
          Why it matters
        </h2>
        <p className="text-editorial-muted">{project.whyItMatters}</p>
      </div>

      <div className="mb-8">
        <h2 className="font-serif text-xl font-semibold text-editorial-ink mb-4">
          Steps
        </h2>
        <div className="space-y-4">
          {project.steps.map((step, i) => (
            <div
              key={i}
              className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-editorial-green text-white text-xs font-semibold">
                  {i + 1}
                </span>
                <div>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        <div>
          <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-3">
            Deliverables
          </h2>
          <ul className="space-y-1.5">
            {project.deliverables.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-editorial-muted"
              >
                <span className="text-editorial-green mt-0.5">✓</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold text-editorial-ink mb-3">
            Skills Learned
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {project.skillsLearned.map((skill) => (
              <span
                key={skill}
                className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
