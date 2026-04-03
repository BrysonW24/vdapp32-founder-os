import { Briefcase } from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import { getDayInLifeScenarios } from "@/lib/content"
import { SubjectDayInLifeClient } from "./SubjectDayInLifeClient"

interface SubjectDayInLifePageProps {
  subject: SubjectManifest
}

export function SubjectDayInLifePage({
  subject,
}: SubjectDayInLifePageProps) {
  const scenarios = getDayInLifeScenarios(subject.slug)

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Working Reality
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          A Day in {subject.name}
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Explore what the rhythm of {subject.name.toLowerCase()} actually looks
          like across different company shapes, environments, and operating
          constraints.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.72)] px-4 py-2 text-xs text-editorial-muted">
        <Briefcase className="h-3.5 w-3.5 text-editorial-green" />
        {scenarios.length} role scenario{scenarios.length === 1 ? "" : "s"}
      </div>

      <SubjectDayInLifeClient scenarios={scenarios} />
    </div>
  )
}
