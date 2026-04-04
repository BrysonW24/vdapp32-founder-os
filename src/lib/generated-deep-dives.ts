import type { SubjectManifest } from "@/types/curriculum"

export interface GeneratedDeepDiveDefinition {
  eyebrow: string
  title: string
  summary: string
  questions: string[]
  artifacts: string[]
  failureModes: string[]
  nextMoves: string[]
}

const SLUG_SUMMARY: Record<string, string> = {
  automations: "the repeatable work that should leave human heads and become reliable flows",
  "ai-workflows": "where AI compresses cycle time without weakening judgment",
  experimentation: "how this domain learns faster than competitors through disciplined tests",
  "measurement-architecture": "the signals, dashboards, and review loops that make performance legible",
  attribution: "how this domain interprets influence, causality, and value creation",
  "executive-communication": "how leaders should understand progress, risk, and tradeoffs in this domain",
  "privacy-ethics": "the boundaries that keep speed from turning into avoidable risk",
  careers: "the role paths, capability ladders, and proof-of-competence markers in this domain",
  resources: "the references, stacks, and external inputs that keep this domain sharp",
  future: "what is changing fastest and where the next advantage will come from",
  ops: "the systems layer that keeps this function dependable at higher scale",
  compliance: "the controls that let this function move quickly without creating silent liabilities",
  discovery: "how to reduce uncertainty before committing team time and capital",
  prioritization: "how to say no, sequence work, and protect focus under pressure",
  roadmapping: "how to turn strategy into a clear operating sequence the team can trust",
  "user-research": "how to keep real customer reality inside every decision",
  hiring: "how to define the role, assess signal, and hire for leverage instead of hope",
  delegation: "how to move work off the founder or manager without losing quality",
  "one-on-ones": "how to make recurring people conversations useful instead of ceremonial",
  feedback: "how to create faster learning loops without damaging trust",
  "org-design": "how structure, spans, and decision rights shape execution quality",
  "performance-management": "how to set standards, review work, and intervene early",
  instrumentation: "how to make key user and business behavior measurable",
  dashboards: "how to make reporting decision-ready instead of merely informative",
  "warehouse-stack": "how data gets collected, transformed, governed, and served back to the business",
  onboarding: "how customers become successful quickly enough to stay and expand",
  "support-ops": "how service quality, response speed, and root-cause learning fit together",
  renewals: "how to protect revenue by earning the next contract before it is due",
  "churn-analysis": "how to diagnose why customers leave and what to fix upstream",
  expansion: "how to grow accounts through outcomes, not pressure",
  copilots: "where assistive AI can increase throughput while keeping humans responsible",
  agents: "where bounded autonomy is useful and where tighter controls still win",
  approvals: "how to keep escalation and human sign-off proportional to risk",
  operations: "the execution layer that turns plans into stable routines",
  fundraising: "how to run a capital process with narrative clarity and founder control",
  "investor-updates": "how to create trust through consistent signal, not sporadic storytelling",
  "pitch-architecture": "how to structure the narrative, proof, and commercial logic behind the raise",
  "due-diligence": "how to survive investor scrutiny with fewer surprises and cleaner materials",
  "term-sheets": "how the structure of the deal changes control, dilution, and future options",
  "cap-table": "how ownership evolves over time and why small choices compound",
  "capital-allocation": "how to turn every dollar raised into real strategic leverage",
  contracts: "how agreements reduce ambiguity, protect downside, and keep execution moving",
  ip: "how the business protects the assets that create long-term value",
  "privacy-compliance": "how to align operations with privacy obligations before issues become expensive",
  "employment-risk": "how hiring, exits, and documentation create or reduce legal exposure",
  "vendor-risk": "how third-party relationships import both leverage and liability",
  "fundraising-legal": "how the legal layer of a raise shapes speed, cost, and control",
  disputes: "how to prevent conflict early and handle it cleanly when it arrives",
  "financial-statements": "how the business translates activity into a financial picture leadership can act on",
  "month-end-close": "how to make closing the books fast, accurate, and reviewable",
  "cash-controls": "how money movement stays traceable, intentional, and hard to abuse",
  "tax-calendar": "how to avoid deadline-driven chaos and silent penalties",
  payroll: "how compensation operations stay accurate, compliant, and trusted",
  "revenue-recognition": "how sales activity becomes finance-ready revenue without distortion",
  "management-reporting": "how numbers become decisions instead of static reports",
  "decision-quality": "how the founder improves thinking under time pressure and uncertainty",
  "energy-management": "how capacity, recovery, and performance compound across a week",
  "time-design": "how attention gets protected instead of fragmented",
  resilience: "how the founder recovers quickly and remains useful under stress",
  relationships: "how trust with team, customers, and stakeholders becomes an operating asset",
  "service-delivery": "how work moves reliably from commitment to outcome",
  "scenario-planning": "how teams prepare for uncertainty instead of reacting late",
  "research-workflows": "how better inputs improve the quality of strategy and execution",
  "pricing-architecture": "how pricing decisions shape margin quality, positioning, and room to grow",
  "cash-planning": "how the business protects optionality by seeing cash earlier and acting sooner",
  "financial-modeling": "how assumptions, scenarios, and decision support get translated into numbers",
}

const SLUG_ARTIFACTS: Record<string, string[]> = {
  fundraising: ["Target investor list", "Fundraising narrative", "Due diligence room"],
  contracts: ["Template library", "Approval rules", "Obligation tracker"],
  discovery: ["Interview guide", "Evidence notes", "Decision memo"],
  onboarding: ["Launch checklist", "Success plan", "Risk watchlist"],
  instrumentation: ["Event map", "Definition sheet", "Dashboard spec"],
  "decision-quality": ["Decision journal", "Assumption register", "Pre-mortem notes"],
}

function titleize(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function defaultQuestions(title: string, subject: SubjectManifest): string[] {
  return [
    `What does strong ${title.toLowerCase()} look like inside ${subject.name.toLowerCase()}?`,
    `Which signals tell us this area is healthy versus drifting?`,
    `What should stay founder- or leader-owned, and what should become a system?`,
  ]
}

function defaultArtifacts(title: string): string[] {
  return [
    `${title} operating brief`,
    `${title} review cadence`,
    `${title} decision log`,
  ]
}

function defaultFailureModes(title: string): string[] {
  return [
    `Treating ${title.toLowerCase()} like ad hoc work instead of a designed system.`,
    "Letting activity substitute for evidence or operating clarity.",
    "Waiting too long to formalize ownership, review loops, or decision rules.",
  ]
}

function defaultNextMoves(subject: SubjectManifest, title: string): string[] {
  return [
    `Find the closest related module inside ${subject.name} and work through it end to end.`,
    "Convert the current best practice into a checklist, meeting rhythm, or scorecard.",
    `Review the tool stack and remove any step that adds work without improving ${title.toLowerCase()}.`,
  ]
}

export function getGeneratedDeepDiveDefinition(
  subject: SubjectManifest,
  slug: string,
  label?: string
): GeneratedDeepDiveDefinition {
  const title = label ?? titleize(slug)
  const summaryFocus =
    SLUG_SUMMARY[slug] ??
    `the operator layer where ${subject.name.toLowerCase()} becomes more deliberate and more repeatable`

  return {
    eyebrow: "Operator Deep Dive",
    title,
    summary: `${title} is about ${summaryFocus}. In Founder OS, this page is the decision lens for the work that sits between theory and live execution.`,
    questions: defaultQuestions(title, subject),
    artifacts: SLUG_ARTIFACTS[slug] ?? defaultArtifacts(title),
    failureModes: defaultFailureModes(title),
    nextMoves: defaultNextMoves(subject, title),
  }
}
