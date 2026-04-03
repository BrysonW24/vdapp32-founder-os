import { z } from "zod"

// ============================================================
// Subject Manifest — auto-discovery registration per subject
// ============================================================

export const SUBJECT_GROUPS = [
  "go-to-market",
  "operations",
  "growth",
  "founder-only",
] as const

export type SubjectGroup = (typeof SUBJECT_GROUPS)[number]

export const SUBJECT_GROUP_LABELS: Record<SubjectGroup, string> = {
  "go-to-market": "Go-to-Market",
  operations: "Operations",
  growth: "Growth",
  "founder-only": "Founder",
}

export const SubjectManifestSchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  group: z.enum(SUBJECT_GROUPS),
  icon: z.string(),
  color: z.string(),
  tagline: z.string(),
  blueprintSlug: z.string(),
  deepDivePages: z.array(
    z.object({
      slug: z.string(),
      label: z.string(),
      icon: z.string(),
    })
  ),
  order: z.number(),
})

export type SubjectManifest = z.infer<typeof SubjectManifestSchema>

// --- Domain constants ---
export const DOMAIN_SLUGS = [
  "strategy",
  "product",
  "sales",
  "marketing",
  "finance",
  "accounting",
  "operations",
  "leadership",
  "customer-success",
  "legal",
  "data-analytics",
  "ai-automation",
  "ai-engineering",
  "capital",
  "founder-performance",
] as const

export type DomainSlug = (typeof DOMAIN_SLUGS)[number]

export const DOMAINS: { slug: DomainSlug; label: string; color: string; icon: string }[] = [
  { slug: "strategy", label: "Strategy", color: "#386a58", icon: "Compass" },
  { slug: "product", label: "Product", color: "#6d28d9", icon: "Package" },
  { slug: "sales", label: "Sales", color: "#2f4f79", icon: "Handshake" },
  { slug: "marketing", label: "Marketing", color: "#14b8a6", icon: "Megaphone" },
  { slug: "finance", label: "Finance", color: "#a16a1f", icon: "DollarSign" },
  { slug: "accounting", label: "Accounting", color: "#78716c", icon: "Calculator" },
  { slug: "operations", label: "Operations", color: "#0ea5e9", icon: "Settings" },
  { slug: "leadership", label: "Leadership / People", color: "#dc2626", icon: "Users" },
  { slug: "customer-success", label: "Customer Success", color: "#22c55e", icon: "HeartHandshake" },
  { slug: "legal", label: "Legal / Risk", color: "#64748b", icon: "Shield" },
  { slug: "data-analytics", label: "Data / Analytics", color: "#8b5cf6", icon: "BarChart3" },
  { slug: "ai-automation", label: "AI / Automation", color: "#f59e0b", icon: "Bot" },
  { slug: "ai-engineering", label: "AI Engineering", color: "#f97316", icon: "Cpu" },
  { slug: "capital", label: "Capital / Fundraising", color: "#059669", icon: "Landmark" },
  { slug: "founder-performance", label: "Founder Performance", color: "#e11d48", icon: "Brain" },
]

const domainEnum = z.enum(DOMAIN_SLUGS)

// --- Module ---
export const ModuleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  shortSummary: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  // domain is the canonical field; category is accepted for legacy content
  domain: domainEnum.optional(),
  category: z.string().optional(),
  whyItMatters: z.string(),
  coreConcepts: z.array(z.string()),
  lessons: z.array(z.string()),
  frameworks: z.array(z.string()),
  visualType: z.string().optional(),
  relatedModules: z.array(z.string()),
  status: z.enum(["complete", "coming-soon"]).default("coming-soon"),
  order: z.number(),
  levelNumber: z.number().optional(),
})

export type Module = z.infer<typeof ModuleSchema>

// --- Lesson ---
export const LessonSchema = z.object({
  slug: z.string(),
  moduleSlug: z.string(),
  title: z.string(),
  objective: z.string(),
  beginnerExplanation: z.string(),
  deeperExplanation: z.string(),
  keyTakeaways: z.array(z.string()),
  frameworks: z.array(z.string()),
  example: z.string(),
  commonMistakes: z.array(z.string()),
  exercise: z.string(),
  nextLesson: z.string().optional(),
  order: z.number(),
  quiz: z.array(z.object({
    question: z.string(),
    options: z.array(z.string()),
    correctIndex: z.number(),
    explanation: z.string(),
  })).optional(),
  // Flexible perspectives — keys vary by subject (founder/delegator/investor or marketer/cmo/ceo)
  perspectives: z.record(z.string(), z.string()).optional(),
})

export type Lesson = z.infer<typeof LessonSchema>

// --- Framework ---
export const FrameworkSchema = z.object({
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  whenToUseIt: z.string(),
  steps: z.array(z.string()),
  example: z.string(),
  category: z.string(),
  domain: domainEnum.optional(),
})

export type Framework = z.infer<typeof FrameworkSchema>

// --- Project ---
export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  difficulty: z.number().min(1).max(10),
  estimatedHours: z.number(),
  description: z.string(),
  whyItMatters: z.string(),
  skillsLearned: z.array(z.string()),
  prerequisites: z.array(z.string()),
  steps: z.array(z.object({
    title: z.string(),
    description: z.string(),
    tips: z.string().optional(),
  })),
  deliverables: z.array(z.string()),
  tools: z.array(z.string()),
  rubric: z.array(z.object({
    criteria: z.string(),
    description: z.string(),
  })),
  domain: domainEnum.optional(),
})

export type Project = z.infer<typeof ProjectSchema>

// --- Tool ---
export const ToolSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string(),
  whyUseIt: z.string(),
  pricingTier: z.enum(["free", "freemium", "paid", "enterprise"]),
  url: z.string().optional(),
  logoUrl: z.string().optional(),
  aiCapabilities: z.string().optional(),
  alternatives: z.array(z.string()),
  // Legacy marketing fields
  funnelPosition: z.string().optional(),
  outputs: z.array(z.string()).optional(),
  marketerWorkflow: z.string().optional(),
  engineerWorkflow: z.string().optional(),
  managerExpects: z.string().optional(),
  aiWorkflowImpact: z.string().optional(),
  demoDescription: z.string().optional(),
  relatedProject: z.string().optional(),
  // Founder OS fields
  founderWorkflow: z.string().optional(),
  delegationReady: z.boolean().optional(),
  automationPotential: z.enum(["low", "medium", "high"]).optional(),
  stageRecommendation: z.enum(["pre-revenue", "early", "growth", "scale"]).optional(),
  vocabulary: z.array(z.object({ term: z.string(), definition: z.string() })).optional(),
  beginnerMistakes: z.array(z.string()).optional(),
})

export type Tool = z.infer<typeof ToolSchema>

// --- Day in the Life ---
export const ScheduleEntrySchema = z.object({
  time: z.string(),
  activity: z.string(),
  tools: z.array(z.string()).optional(),
  note: z.string().optional(),
})

export const DayInLifeSchema = z.object({
  slug: z.string(),
  title: z.string(),
  setting: z.string(),
  companySize: z.string(),
  description: z.string(),
  salary: z.string(),
  schedule: z.array(ScheduleEntrySchema),
  responsibilities: z.array(z.string()),
  challenges: z.array(z.string()),
  rewards: z.array(z.string()),
  careerPath: z.array(z.string()),
})

export type ScheduleEntry = z.infer<typeof ScheduleEntrySchema>
export type DayInLife = z.infer<typeof DayInLifeSchema>

// --- Domain Meta (NEW) ---
export const DomainMetaSchema = z.object({
  slug: domainEnum,
  name: z.string(),
  tagline: z.string(),
  icon: z.string(),
  color: z.string(),
  coreMetrics: z.array(z.object({
    name: z.string(),
    description: z.string(),
    target: z.string(),
    frequency: z.enum(["daily", "weekly", "monthly", "quarterly"]),
  })),
  weeklyRhythm: z.array(z.object({
    day: z.string(),
    activity: z.string(),
    duration: z.string(),
  })),
  monthlyRhythm: z.array(z.object({
    week: z.number(),
    focus: z.string(),
    deliverable: z.string(),
  })),
  whatToDelegate: z.array(z.object({
    task: z.string(),
    when: z.string(),
    toWhom: z.string(),
  })),
  whatToAutomate: z.array(z.object({
    task: z.string(),
    tool: z.string(),
    savesHoursPerWeek: z.number(),
  })),
  order: z.number(),
})

export type DomainMeta = z.infer<typeof DomainMetaSchema>

// --- Playbook (NEW) ---
export const PlaybookSchema = z.object({
  slug: z.string(),
  title: z.string(),
  domain: domainEnum,
  summary: z.string(),
  whenToUseIt: z.string(),
  timeToComplete: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  prerequisites: z.array(z.string()),
  steps: z.array(z.object({
    title: z.string(),
    description: z.string(),
    tips: z.string().optional(),
    tools: z.array(z.string()).optional(),
    timeEstimate: z.string().optional(),
    aiPrompt: z.string().optional(),
  })),
  expectedOutcome: z.string(),
  commonMistakes: z.array(z.string()),
  relatedPlaybooks: z.array(z.string()),
  relatedModules: z.array(z.string()),
  order: z.number(),
})

export type Playbook = z.infer<typeof PlaybookSchema>

// --- Business System (NEW) ---
export const BusinessSystemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  domain: domainEnum,
  summary: z.string(),
  frequency: z.enum(["daily", "weekly", "monthly", "quarterly", "as-needed"]),
  owner: z.enum(["founder", "hire", "contractor", "automated"]),
  inputs: z.array(z.string()),
  outputs: z.array(z.string()),
  steps: z.array(z.object({
    title: z.string(),
    description: z.string(),
    responsible: z.string(),
    tool: z.string().optional(),
    automated: z.boolean().optional(),
  })),
  kpis: z.array(z.object({
    metric: z.string(),
    target: z.string(),
  })),
  whenToImplement: z.string(),
  delegationNotes: z.string(),
  automationNotes: z.string(),
  relatedSystems: z.array(z.string()),
  order: z.number(),
})

export type BusinessSystem = z.infer<typeof BusinessSystemSchema>

// --- Simulation (NEW) ---
export const SimulationSchema = z.object({
  slug: z.string(),
  title: z.string(),
  domain: domainEnum,
  scenario: z.string(),
  context: z.string(),
  stakeholders: z.array(z.object({
    name: z.string(),
    role: z.string(),
    perspective: z.string(),
  })),
  decisions: z.array(z.object({
    id: z.string(),
    prompt: z.string(),
    options: z.array(z.object({
      label: z.string(),
      description: z.string(),
      outcome: z.string(),
      score: z.number().min(0).max(10),
      tradeoffs: z.array(z.string()),
    })),
  })),
  debrief: z.string(),
  lessonsLearned: z.array(z.string()),
  relatedModules: z.array(z.string()),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  order: z.number(),
})

export type Simulation = z.infer<typeof SimulationSchema>

// --- Prompt Pack (NEW) ---
export const PromptPackSchema = z.object({
  slug: z.string(),
  title: z.string(),
  domain: domainEnum,
  description: z.string(),
  prompts: z.array(z.object({
    title: z.string(),
    prompt: z.string(),
    context: z.string(),
    exampleOutput: z.string().optional(),
  })),
  order: z.number(),
})

export type PromptPack = z.infer<typeof PromptPackSchema>

// --- Template (NEW) ---
export const TemplateSchema = z.object({
  slug: z.string(),
  title: z.string(),
  domain: domainEnum,
  description: z.string(),
  format: z.enum(["spreadsheet", "document", "checklist", "canvas", "dashboard"]),
  sections: z.array(z.object({
    title: z.string(),
    description: z.string(),
    fields: z.array(z.string()),
  })),
  howToUse: z.string(),
  relatedPlaybooks: z.array(z.string()),
  order: z.number(),
})

export type Template = z.infer<typeof TemplateSchema>
