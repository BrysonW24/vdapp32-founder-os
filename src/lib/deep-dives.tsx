import type { ComponentType, ReactElement } from "react"
import type { SubjectManifest } from "@/types/curriculum"
import { SubjectBlueprintPage } from "@/components/founder/deep-dives/shared/SubjectBlueprintPage"
import { SubjectDayInLifePage } from "@/components/founder/deep-dives/shared/SubjectDayInLifePage"
import { SubjectToolkitPage } from "@/components/founder/deep-dives/shared/SubjectToolkitPage"
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
import AIRagDeepDivePage from "@/components/founder/deep-dives/ai-engineering/rag-deep-dive/page"
import AIAgenticSystemsPage from "@/components/founder/deep-dives/ai-engineering/agentic-systems/page"
import AIBuildingModelsPage from "@/components/founder/deep-dives/ai-engineering/building-models/page"
import AICloudInfrastructurePage from "@/components/founder/deep-dives/ai-engineering/cloud-infrastructure/page"
import AIPlatformOpsPage from "@/components/founder/deep-dives/ai-engineering/platform-ops/page"
import AIAIWorkflowsPage from "@/components/founder/deep-dives/ai-engineering/ai-workflows/page"
import AIExperimentationPage from "@/components/founder/deep-dives/ai-engineering/experimentation/page"
import AIPrivacyEthicsPage from "@/components/founder/deep-dives/ai-engineering/privacy-ethics/page"
import AICareersPage from "@/components/founder/deep-dives/ai-engineering/careers/page"
import AIResourcesPage from "@/components/founder/deep-dives/ai-engineering/resources/page"
import AIFuturePage from "@/components/founder/deep-dives/ai-engineering/ai-future/page"

export interface DeepDiveMetadata {
  title: string
  description: string
}

type DeepDiveRenderer = (subject: SubjectManifest) => ReactElement

const wrapStatic =
  (Component: ComponentType): DeepDiveRenderer => {
    const WrappedStaticDeepDive = () => <Component />
    WrappedStaticDeepDive.displayName = `WrappedStaticDeepDive(${
      Component.displayName || Component.name || "Anonymous"
    })`
    return WrappedStaticDeepDive
  }

const SHARED_DEEP_DIVES: Record<string, DeepDiveRenderer> = {
  toolkit: (subject) => <SubjectToolkitPage subject={subject} />,
  blueprint: (subject) => <SubjectBlueprintPage subject={subject} />,
  "day-in-the-life": (subject) => <SubjectDayInLifePage subject={subject} />,
}

const SUBJECT_DEEP_DIVES: Record<string, Record<string, DeepDiveRenderer>> = {
  marketing: {
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
    future: wrapStatic(MarketingFuturePage),
    ops: wrapStatic(MarketingOpsPage),
  },
  sales: {
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
    future: wrapStatic(SalesFuturePage),
    ops: wrapStatic(SalesOpsPage),
  },
  "ai-engineering": {
    simulation: wrapStatic(AISimulationPage),
    "rag-deep-dive": wrapStatic(AIRagDeepDivePage),
    "agentic-systems": wrapStatic(AIAgenticSystemsPage),
    "building-models": wrapStatic(AIBuildingModelsPage),
    "cloud-infrastructure": wrapStatic(AICloudInfrastructurePage),
    "platform-ops": wrapStatic(AIPlatformOpsPage),
    "ai-workflows": wrapStatic(AIAIWorkflowsPage),
    experimentation: wrapStatic(AIExperimentationPage),
    "privacy-ethics": wrapStatic(AIPrivacyEthicsPage),
    careers: wrapStatic(AICareersPage),
    resources: wrapStatic(AIResourcesPage),
    future: wrapStatic(AIFuturePage),
  },
}

const DESCRIPTION_BY_SLUG: Record<string, string> = {
  toolkit: "Mental models and frameworks for this subject.",
  blueprint: "The operating map for this subject inside Founder OS.",
  "day-in-the-life": "Working rhythms, responsibilities, and role context.",
  simulation: "Interactive scenario practice for this subject.",
  automations: "Automation design, patterns, and operational leverage.",
  "ai-workflows": "How AI changes execution and where human judgment stays essential.",
  experimentation: "Testing, evidence, and learning loops.",
  "measurement-architecture": "How to structure signals, metrics, and reporting.",
  attribution: "How value, influence, and causality are interpreted.",
  "executive-communication": "How to communicate this function to leadership.",
  "privacy-ethics": "Risk, policy, and responsible operating boundaries.",
  careers: "Role shapes, progression, and capability expectations.",
  resources: "Curated resources for deeper study and operating leverage.",
  future: "What is changing in this subject over the next few years.",
  ops: "Systems, enablement, and operating model design.",
  "rag-deep-dive": "Retrieval-augmented generation patterns and production choices.",
  "agentic-systems": "Agent architectures, tool use, safety, and production patterns.",
  "building-models": "Model building foundations, tradeoffs, and practical choices.",
  "cloud-infrastructure": "Cloud architecture decisions for AI systems.",
  "platform-ops": "Inference, registries, observability, and AI cost governance.",
}

export function getDeepDiveRenderer(
  subjectSlug: string,
  deepDiveSlug: string
): DeepDiveRenderer | null {
  return (
    SUBJECT_DEEP_DIVES[subjectSlug]?.[deepDiveSlug] ??
    SHARED_DEEP_DIVES[deepDiveSlug] ??
    null
  )
}

export function isDeepDiveRegistered(
  subjectSlug: string,
  deepDiveSlug: string
): boolean {
  return getDeepDiveRenderer(subjectSlug, deepDiveSlug) !== null
}

export function renderDeepDive(
  subject: SubjectManifest,
  deepDiveSlug: string
): ReactElement | null {
  const renderer = getDeepDiveRenderer(subject.slug, deepDiveSlug)
  return renderer ? renderer(subject) : null
}

export function getDeepDiveMetadata(
  subject: SubjectManifest,
  deepDiveSlug: string
): DeepDiveMetadata {
  const page = subject.deepDivePages.find((item) => item.slug === deepDiveSlug)
  return {
    title: `${page?.label ?? deepDiveSlug} | ${subject.name}`,
    description:
      DESCRIPTION_BY_SLUG[deepDiveSlug] ??
      `${subject.name} deep dive in Founder OS.`,
  }
}
