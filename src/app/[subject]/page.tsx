import { notFound } from "next/navigation"
import {
  getSubject,
  getModules,
  getPlaybooks,
  getSystems,
  getTools,
  getProjects,
  getFrameworks,
  getAllDomainMeta,
  getPromptPacks,
  getTemplates,
} from "@/lib/content"
import { getSubjectPresentation } from "@/lib/subject-presentation"
import { SubjectOverview } from "@/components/founder/SubjectOverview"
import {
  ClassicSubjectHome,
} from "@/components/founder/classic/shared/ClassicSubjectHome"
import { HomePageClient as MarketingClassicHome } from "@/components/founder/classic/marketing/HomePageClient"
import { HomePageClient as SalesClassicHome } from "@/components/founder/classic/sales/HomePageClient"
import { HomePageClient as AIClassicHome } from "@/components/founder/classic/ai-engineering/HomePageClient"

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>
}) {
  const { subject: slug } = await params
  const subject = getSubject(slug)
  if (!subject) notFound()

  const modules = getModules(slug)
  const playbooks = getPlaybooks(slug)
  const systems = getSystems(slug)
  const tools = getTools(slug)
  const projects = getProjects(slug)
  const domainMetaAll = getAllDomainMeta(slug)
  const domainMeta = domainMetaAll.length > 0 ? domainMetaAll[0] : null
  const frameworks = getFrameworks(slug)
  const prompts = getPromptPacks(slug)
  const templates = getTemplates(slug)
  const presentation = getSubjectPresentation(subject)

  if (presentation.defaultVariant === "classic") {
    if (slug === "marketing") {
      return <MarketingClassicHome />
    }

    if (slug === "sales") {
      return <SalesClassicHome />
    }

    if (slug === "ai-engineering") {
      return <AIClassicHome />
    }

    return (
      <ClassicSubjectHome
        subject={subject}
        modules={modules}
        playbooks={playbooks}
        systems={systems}
        tools={tools}
        projects={projects}
        frameworks={frameworks}
        domainMeta={domainMeta}
        prompts={prompts}
        templates={templates}
      />
    )
  }

  return (
    <SubjectOverview
      subject={subject}
      modules={modules}
      playbooks={playbooks}
      systems={systems}
      tools={tools}
      projects={projects}
      frameworks={frameworks}
      domainMeta={domainMeta}
      prompts={prompts}
      templates={templates}
    />
  )
}
