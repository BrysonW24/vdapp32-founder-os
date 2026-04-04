import type { ComponentType, ReactElement } from "react"
import type { SubjectManifest } from "@/types/curriculum"
import { ClassicLearningMapPage } from "@/components/founder/deep-dives/shared/ClassicLearningMapPage"
import { ClassicTimelinePage } from "@/components/founder/deep-dives/shared/ClassicTimelinePage"
import { GeneratedDeepDivePage } from "@/components/founder/deep-dives/shared/GeneratedDeepDivePage"
import { SubjectBlueprintPage } from "@/components/founder/deep-dives/shared/SubjectBlueprintPage"
import { SubjectCareersPage } from "@/components/founder/deep-dives/shared/SubjectCareersPage"
import { SubjectDayInLifePage } from "@/components/founder/deep-dives/shared/SubjectDayInLifePage"
import { SubjectFuturePage } from "@/components/founder/deep-dives/shared/SubjectFuturePage"
import { SubjectResourcesPage } from "@/components/founder/deep-dives/shared/SubjectResourcesPage"
import { SubjectSimulationPage } from "@/components/founder/deep-dives/shared/SubjectSimulationPage"
import { SubjectToolkitPage } from "@/components/founder/deep-dives/shared/SubjectToolkitPage"
import MarketingLearningMapPage from "@/components/founder/classic/marketing/LearningMapPage"
import MarketingTimelinePage from "@/components/founder/classic/marketing/TimelinePage"
import SalesLearningMapPage from "@/components/founder/classic/sales/LearningMapPage"
import AEBlueprintPage from "@/components/founder/classic/sales/AEBlueprintPage"
import SalesTimelinePage from "@/components/founder/classic/sales/TimelinePage"
import AILearningMapPage from "@/components/founder/classic/ai-engineering/LearningMapPage"
import FrontierBlueprintPage from "@/components/founder/classic/ai-engineering/FrontierBlueprintPage"
import AITimelinePage from "@/components/founder/classic/ai-engineering/TimelinePage"
import MarketingSimulationPage from "@/components/founder/deep-dives/marketing/simulation/page"
import MarketingAutomationsPage from "@/components/founder/deep-dives/marketing/automations/page"
import MarketingAIWorkflowsPage from "@/components/founder/deep-dives/marketing/ai-workflows/page"
import MarketingExperimentationPage from "@/components/founder/deep-dives/marketing/experimentation/page"
import MarketingMeasurementPage from "@/components/founder/deep-dives/marketing/measurement-architecture/page"
import MarketingAttributionPage from "@/components/founder/deep-dives/marketing/attribution/page"
import MarketingExecutiveCommunicationPage from "@/components/founder/deep-dives/marketing/executive-communication/page"
import MarketingPrivacyEthicsPage from "@/components/founder/deep-dives/marketing/privacy-ethics/page"
import MarketingCareersPage from "@/components/founder/deep-dives/marketing/careers/page"
import MarketingResourcesPage from "@/components/founder/deep-dives/marketing/resources/page"
import MarketingFuturePage from "@/components/founder/deep-dives/marketing/future-of-marketing/page"
import MarketingOpsPage from "@/components/founder/deep-dives/marketing/marketing-ops/page"
import SalesSimulationPage from "@/components/founder/deep-dives/sales/simulation/page"
import SalesAutomationsPage from "@/components/founder/deep-dives/sales/automations/page"
import SalesAIWorkflowsPage from "@/components/founder/deep-dives/sales/ai-workflows/page"
import SalesExperimentationPage from "@/components/founder/deep-dives/sales/experimentation/page"
import SalesMeasurementPage from "@/components/founder/deep-dives/sales/measurement-architecture/page"
import SalesAttributionPage from "@/components/founder/deep-dives/sales/attribution/page"
import SalesExecutiveCommunicationPage from "@/components/founder/deep-dives/sales/executive-communication/page"
import SalesPrivacyEthicsPage from "@/components/founder/deep-dives/sales/privacy-ethics/page"
import SalesCareersPage from "@/components/founder/deep-dives/sales/careers/page"
import SalesResourcesPage from "@/components/founder/deep-dives/sales/resources/page"
import SalesFuturePage from "@/components/founder/deep-dives/sales/future-of-sales/page"
import SalesOpsPage from "@/components/founder/deep-dives/sales/sales-ops/page"
import AISimulationPage from "@/components/founder/deep-dives/ai-engineering/simulation/page"
import AIAutomationsPage from "@/components/founder/deep-dives/ai-engineering/automations/page"
import AIRagDeepDivePage from "@/components/founder/deep-dives/ai-engineering/rag-deep-dive/page"
import AIAgenticSystemsPage from "@/components/founder/deep-dives/ai-engineering/agentic-systems/page"
import AIAttributionPage from "@/components/founder/deep-dives/ai-engineering/attribution/page"
import AIBuildingModelsPage from "@/components/founder/deep-dives/ai-engineering/building-models/page"
import AICloudInfrastructurePage from "@/components/founder/deep-dives/ai-engineering/cloud-infrastructure/page"
import AIExecutiveCommunicationPage from "@/components/founder/deep-dives/ai-engineering/executive-communication/page"
import AIPlatformOpsPage from "@/components/founder/deep-dives/ai-engineering/platform-ops/page"
import AIAIWorkflowsPage from "@/components/founder/deep-dives/ai-engineering/ai-workflows/page"
import AIExperimentationPage from "@/components/founder/deep-dives/ai-engineering/experimentation/page"
import AIMeasurementPage from "@/components/founder/deep-dives/ai-engineering/measurement-architecture/page"
import AIPrivacyEthicsPage from "@/components/founder/deep-dives/ai-engineering/privacy-ethics/page"
import AICareersPage from "@/components/founder/deep-dives/ai-engineering/careers/page"
import AIResourcesPage from "@/components/founder/deep-dives/ai-engineering/resources/page"
import AIFuturePage from "@/components/founder/deep-dives/ai-engineering/ai-future/page"

export interface DeepDiveMetadata {
  title: string
  description: string
}

type DeepDiveRenderer = (subject: SubjectManifest, label?: string) => ReactElement

const wrapStatic =
  (Component: ComponentType): DeepDiveRenderer => {
    const WrappedStaticDeepDive = () => <Component />
    WrappedStaticDeepDive.displayName = `WrappedStaticDeepDive(${
      Component.displayName || Component.name || "Anonymous"
    })`
    return WrappedStaticDeepDive
  }

const SHARED_DEEP_DIVES: Record<string, DeepDiveRenderer> = {
  "learning-map": (subject) => <ClassicLearningMapPage subject={subject} />,
  timeline: (subject) => <ClassicTimelinePage subject={subject} />,
  toolkit: (subject) => <SubjectToolkitPage subject={subject} />,
  blueprint: (subject) => <SubjectBlueprintPage subject={subject} />,
  "day-in-the-life": (subject) => <SubjectDayInLifePage subject={subject} />,
  careers: (subject) => <SubjectCareersPage subject={subject} />,
  resources: (subject) => <SubjectResourcesPage subject={subject} />,
  future: (subject) => <SubjectFuturePage subject={subject} />,
  simulation: (subject) => <SubjectSimulationPage subject={subject} />,
}

const SUBJECT_DEEP_DIVES: Record<string, Record<string, DeepDiveRenderer>> = {
  marketing: {
    "learning-map": wrapStatic(MarketingLearningMapPage),
    timeline: wrapStatic(MarketingTimelinePage),
    simulation: wrapStatic(MarketingSimulationPage),
    automations: wrapStatic(MarketingAutomationsPage),
    "ai-workflows": wrapStatic(MarketingAIWorkflowsPage),
    experimentation: wrapStatic(MarketingExperimentationPage),
    "measurement-architecture": wrapStatic(MarketingMeasurementPage),
    attribution: wrapStatic(MarketingAttributionPage),
    "executive-communication": wrapStatic(MarketingExecutiveCommunicationPage),
    "privacy-ethics": wrapStatic(MarketingPrivacyEthicsPage),
    careers: wrapStatic(MarketingCareersPage),
    resources: wrapStatic(MarketingResourcesPage),
    "future-of-marketing": wrapStatic(MarketingFuturePage),
    future: wrapStatic(MarketingFuturePage),
    "marketing-ops": wrapStatic(MarketingOpsPage),
    ops: wrapStatic(MarketingOpsPage),
  },
  sales: {
    "learning-map": wrapStatic(SalesLearningMapPage),
    "ae-blueprint": wrapStatic(AEBlueprintPage),
    timeline: wrapStatic(SalesTimelinePage),
    simulation: wrapStatic(SalesSimulationPage),
    automations: wrapStatic(SalesAutomationsPage),
    "ai-workflows": wrapStatic(SalesAIWorkflowsPage),
    experimentation: wrapStatic(SalesExperimentationPage),
    "measurement-architecture": wrapStatic(SalesMeasurementPage),
    attribution: wrapStatic(SalesAttributionPage),
    "executive-communication": wrapStatic(SalesExecutiveCommunicationPage),
    "privacy-ethics": wrapStatic(SalesPrivacyEthicsPage),
    careers: wrapStatic(SalesCareersPage),
    resources: wrapStatic(SalesResourcesPage),
    "future-of-sales": wrapStatic(SalesFuturePage),
    future: wrapStatic(SalesFuturePage),
    "sales-ops": wrapStatic(SalesOpsPage),
    ops: wrapStatic(SalesOpsPage),
  },
  "ai-engineering": {
    "learning-map": wrapStatic(AILearningMapPage),
    "frontier-blueprint": wrapStatic(FrontierBlueprintPage),
    timeline: wrapStatic(AITimelinePage),
    simulation: wrapStatic(AISimulationPage),
    automations: wrapStatic(AIAutomationsPage),
    "rag-deep-dive": wrapStatic(AIRagDeepDivePage),
    "agentic-systems": wrapStatic(AIAgenticSystemsPage),
    "building-models": wrapStatic(AIBuildingModelsPage),
    "cloud-infrastructure": wrapStatic(AICloudInfrastructurePage),
    "platform-ops": wrapStatic(AIPlatformOpsPage),
    "ai-workflows": wrapStatic(AIAIWorkflowsPage),
    experimentation: wrapStatic(AIExperimentationPage),
    "measurement-architecture": wrapStatic(AIMeasurementPage),
    attribution: wrapStatic(AIAttributionPage),
    "executive-communication": wrapStatic(AIExecutiveCommunicationPage),
    "privacy-ethics": wrapStatic(AIPrivacyEthicsPage),
    careers: wrapStatic(AICareersPage),
    resources: wrapStatic(AIResourcesPage),
    "ai-future": wrapStatic(AIFuturePage),
    future: wrapStatic(AIFuturePage),
  },
}

function getSpecificRenderer(
  subjectSlug: string,
  deepDiveSlug: string
): DeepDiveRenderer | null {
  return SUBJECT_DEEP_DIVES[subjectSlug]?.[deepDiveSlug] ?? null
}

function getSharedRenderer(deepDiveSlug: string): DeepDiveRenderer | null {
  return SHARED_DEEP_DIVES[deepDiveSlug] ?? null
}

function getPageLabel(subject: SubjectManifest, deepDiveSlug: string): string {
  return (
    subject.deepDivePages.find((item) => item.slug === deepDiveSlug)?.label ??
    deepDiveSlug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  )
}

export function isDeepDiveRegistered(): boolean {
  return true
}

export function renderDeepDive(
  subject: SubjectManifest,
  deepDiveSlug: string
): ReactElement | null {
  const label = getPageLabel(subject, deepDiveSlug)
  const renderer =
    getSpecificRenderer(subject.slug, deepDiveSlug) ??
    getSharedRenderer(deepDiveSlug)

  if (renderer) {
    return renderer(subject, label)
  }

  return <GeneratedDeepDivePage subject={subject} slug={deepDiveSlug} label={label} />
}

export function getDeepDiveMetadata(
  subject: SubjectManifest,
  deepDiveSlug: string
): DeepDiveMetadata {
  const label = getPageLabel(subject, deepDiveSlug)
  return {
    title: `${label} | ${subject.name}`,
    description: `${label} inside ${subject.name} for Founder OS.`,
  }
}
