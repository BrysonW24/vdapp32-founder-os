import { notFound } from "next/navigation"
import { getSubject, getPlaybooks } from "@/lib/content"
import Link from "next/link"
import { Clock } from "lucide-react"

export default async function PlaybooksPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  const playbooks = getPlaybooks(slug)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-2">
          {subject.name}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-editorial-ink mb-3">
          Playbooks
        </h1>
        <p className="text-editorial-muted text-lg max-w-2xl">
          Step-by-step operational guides. Pick the one you need right now.
        </p>
      </div>

      {playbooks.length === 0 ? (
        <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-12 text-center">
          <p className="text-editorial-muted text-lg mb-2">
            No playbooks yet for {subject.name}
          </p>
          <p className="text-editorial-muted text-sm">
            Playbooks are being built. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {playbooks.map((pb) => (
            <Link
              key={pb.slug}
              href={`/${slug}/playbooks/${pb.slug}`}
              className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft backdrop-blur-[18px] p-6 hover:shadow-editorial-hover transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green">
                  {pb.difficulty}
                </span>
                <span className="flex items-center gap-1 text-xs text-editorial-muted">
                  <Clock className="h-3 w-3" />
                  {pb.timeToComplete}
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-2">
                {pb.title}
              </h3>
              <p className="text-sm text-editorial-muted line-clamp-2">
                {pb.summary}
              </p>
              <p className="text-xs text-editorial-muted mt-3">
                {pb.steps.length} steps
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
