import { notFound } from "next/navigation"
import {
  getAllDomainMeta,
  getFrameworks,
  getPlaybooks,
  getProjects,
  getPromptPacks,
  getSubject,
  getSystems,
  getTemplates,
  getTools,
  getModules,
} from "@/lib/content"
import { SubjectOverview } from "@/components/founder/SubjectOverview"

export default async function SubjectV2Page({
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
