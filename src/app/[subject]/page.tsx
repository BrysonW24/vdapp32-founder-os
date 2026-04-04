import { notFound } from "next/navigation";
import {
  getSubject,
  getModules,
  getPlaybooks,
  getSystems,
  getTools,
  getProjects,
  getFrameworks,
  getAllDomainMeta,
  getDayInLifeScenarios,
  getPromptPacks,
  getTemplates,
} from "@/lib/content";
import { getSubjectPresentation } from "@/lib/subject-presentation";
import { SubjectOverview } from "@/components/founder/SubjectOverview";
import { HomePageClient as MarketingClassicHome } from "@/components/founder/classic/marketing/HomePageClient";
import { HomePageClient as SalesClassicHome } from "@/components/founder/classic/sales/HomePageClient";
import { HomePageClient as AIClassicHome } from "@/components/founder/classic/ai-engineering/HomePageClient";
import { SubjectAcademyHome } from "@/components/founder/classic/shared/SubjectAcademyHome";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const modules = getModules(slug);
  const playbooks = getPlaybooks(slug);
  const systems = getSystems(slug);
  const tools = getTools(slug);
  const projects = getProjects(slug);
  const domainMetaAll = getAllDomainMeta(slug);
  const domainMeta = domainMetaAll.length > 0 ? domainMetaAll[0] : null;
  const scenarios = getDayInLifeScenarios(slug);
  const frameworks = getFrameworks(slug);
  const prompts = getPromptPacks(slug);
  const templates = getTemplates(slug);
  const presentation = getSubjectPresentation(subject);

  if (presentation.defaultVariant === "classic") {
    if (slug === "marketing") {
      return (
        <MarketingClassicHome
          subject={subject}
          scenarios={scenarios}
          domainMeta={domainMeta}
        />
      );
    }

    if (slug === "sales") {
      return (
        <SalesClassicHome
          subject={subject}
          scenarios={scenarios}
          domainMeta={domainMeta}
        />
      );
    }

    if (slug === "ai-engineering") {
      return (
        <AIClassicHome
          subject={subject}
          scenarios={scenarios}
          domainMeta={domainMeta}
        />
      );
    }

    return (
      <SubjectAcademyHome
        subject={subject}
        modules={modules}
        playbooks={playbooks}
        systems={systems}
        tools={tools}
        projects={projects}
        frameworks={frameworks}
        domainMeta={domainMeta}
        scenarios={scenarios}
      />
    );
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
  );
}
