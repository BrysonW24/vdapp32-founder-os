import Link from "next/link"
import { BookOpen, FolderKanban, Library, Wrench } from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import { getFrameworks, getModules, getProjects, getTools } from "@/lib/content"

interface SubjectResourcesPageProps {
  subject: SubjectManifest
}

export function SubjectResourcesPage({ subject }: SubjectResourcesPageProps) {
  const modules = getModules(subject.slug)
  const frameworks = getFrameworks(subject.slug)
  const tools = getTools(subject.slug)
  const projects = getProjects(subject.slug)

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Resource Stack
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Resources for {subject.name.toLowerCase()}
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The fastest way to go deeper is to pair the curriculum with a compact resource
          stack: core modules, frameworks worth revisiting, tools that matter in live
          work, and projects that force synthesis.
        </p>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <ResourceSection
          icon={BookOpen}
          title="Start here"
          items={modules.slice(0, 6).map((item) => ({
            label: item.title,
            description: item.shortSummary,
            href: `/${subject.slug}/learn/modules/${item.slug}`,
          }))}
        />
        <ResourceSection
          icon={Library}
          title="Framework shelf"
          items={frameworks.slice(0, 6).map((item) => ({
            label: item.name,
            description: item.summary,
            href: `/${subject.slug}/toolkit`,
          }))}
        />
        <ResourceSection
          icon={Wrench}
          title="Tool stack"
          items={tools.slice(0, 6).map((item) => ({
            label: item.name,
            description: item.description,
            href: `/${subject.slug}/tools/${item.slug}`,
          }))}
        />
        <ResourceSection
          icon={FolderKanban}
          title="Practice material"
          items={projects.slice(0, 6).map((item) => ({
            label: item.title,
            description: item.description,
            href: `/${subject.slug}/projects/${item.slug}`,
          }))}
        />
      </section>
    </div>
  )
}

function ResourceSection({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof BookOpen
  title: string
  items: Array<{ label: string; description: string; href: string }>
}) {
  return (
    <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.76)] p-5">
      <div className="flex items-center gap-2 text-editorial-muted">
        <Icon className="h-4 w-4" />
        <p className="text-xs uppercase tracking-[0.18em]">{title}</p>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block rounded-[14px] border border-[rgba(44,49,59,0.08)] bg-white/80 p-3 hover:shadow-editorial-soft transition-shadow"
          >
            <p className="font-medium text-editorial-ink text-sm">{item.label}</p>
            <p className="text-xs text-editorial-muted mt-1 line-clamp-2">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
