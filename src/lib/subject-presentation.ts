import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  Cloud,
  Compass,
  Cpu,
  Database,
  DollarSign,
  FileText,
  FlaskConical,
  FolderKanban,
  Landmark,
  Library,
  Map,
  MessageSquare,
  Package,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react"
import type { SubjectManifest } from "@/types/curriculum"
import { isCoreSubjectPath } from "@/lib/subject-routes"

export type SubjectHomeKind = "marketing" | "sales" | "ai-engineering" | "shared"
export type ChromeVariant = "classic" | "v2"
export type ChromePosition = "fixed" | "sticky"

export interface PresentationNavItem {
  href: string
  label: string
  icon: LucideIcon
}

export interface SubjectPresentation {
  defaultVariant: ChromeVariant
  classicHome: SubjectHomeKind
  brandName: string
  brandMark: string
  footerLine: string
  navPosition: ChromePosition
  mainNav: PresentationNavItem[]
  deepNav: PresentationNavItem[]
  aliasMap: Record<string, string>
  extraDeepDiveSlugs: string[]
}

const SHARED_MAIN_NAV: PresentationNavItem[] = [
  { href: "/", label: "Start Here", icon: Compass },
  { href: "/learning-map", label: "Map", icon: Map },
  { href: "/modules", label: "Modules", icon: BookOpen },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tools", label: "Tools", icon: Cpu },
  { href: "/toolkit", label: "Toolkit", icon: Wrench },
]

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  "learning-map": Map,
  timeline: Clock,
  toolkit: Wrench,
  simulation: Zap,
  "day-in-the-life": Briefcase,
  resources: Library,
  future: TrendingUp,
  "future-of-marketing": TrendingUp,
  "future-of-sales": TrendingUp,
  "ai-future": TrendingUp,
  "frontier-blueprint": Map,
  "ae-blueprint": Target,
  automations: Bot,
  "ai-workflows": Bot,
  experimentation: FlaskConical,
  "measurement-architecture": BarChart3,
  attribution: Target,
  "executive-communication": MessageSquare,
  "privacy-ethics": Shield,
  careers: Users,
  "marketing-ops": Settings,
  "sales-ops": Settings,
  "platform-ops": Settings,
  "rag-deep-dive": Database,
  "agentic-systems": Bot,
  "building-models": Brain,
  "cloud-infrastructure": Cloud,
  ops: Settings,
  compliance: Shield,
  discovery: Compass,
  prioritization: Target,
  roadmapping: Map,
  "user-research": Users,
  hiring: Users,
  delegation: ChevronRight,
  "one-on-ones": MessageSquare,
  feedback: MessageSquare,
  "org-design": Users,
  "performance-management": Target,
  instrumentation: BarChart3,
  dashboards: BarChart3,
  "warehouse-stack": Database,
  onboarding: Users,
  "support-ops": Settings,
  renewals: RefreshCw,
  "churn-analysis": TrendingUp,
  expansion: ChevronRight,
  copilots: Bot,
  agents: Bot,
  approvals: Shield,
  operations: Settings,
  fundraising: Landmark,
  "investor-updates": MessageSquare,
  "pitch-architecture": Map,
  "due-diligence": Search,
  "term-sheets": FileText,
  "cap-table": BarChart3,
  "capital-allocation": DollarSign,
  contracts: Shield,
  ip: Shield,
  "privacy-compliance": Shield,
  "employment-risk": Users,
  "vendor-risk": Shield,
  "fundraising-legal": MessageSquare,
  disputes: MessageSquare,
  "financial-statements": BarChart3,
  "month-end-close": Clock,
  "cash-controls": Shield,
  "tax-calendar": Calendar,
  payroll: Users,
  "revenue-recognition": BarChart3,
  "management-reporting": MessageSquare,
  "decision-quality": Brain,
  "energy-management": Zap,
  "time-design": Clock,
  resilience: Shield,
  relationships: Users,
  "service-delivery": Settings,
  product: Package,
  "scenario-planning": Compass,
  "research-workflows": Search,
  "pricing-architecture": DollarSign,
  "cash-planning": DollarSign,
  "financial-modeling": BarChart3,
}

function makeNavItem(href: string, label: string): PresentationNavItem {
  const slug = href.replace(/^\//, "")
  return {
    href,
    label,
    icon: ICON_BY_SLUG[slug] ?? Library,
  }
}

function titleCaseTagline(tagline: string): string {
  return tagline.replace(/\.$/, "")
}

function getSharedDeepNav(subject: SubjectManifest): PresentationNavItem[] {
  const preferredOrder = ["timeline", "day-in-the-life", "resources", "future"]
  const pageMap = new globalThis.Map(
    subject.deepDivePages.map((page) => [page.slug, page])
  )

  const ordered = preferredOrder
    .map((slug) => pageMap.get(slug))
    .filter((page): page is SubjectManifest["deepDivePages"][number] => !!page)
    .map((page) => makeNavItem(`/${page.slug}`, page.label))

  const extra = subject.deepDivePages
    .filter((page) => !["toolkit", "blueprint", ...preferredOrder].includes(page.slug))
    .map((page) => makeNavItem(`/${page.slug}`, page.label))

  return [...ordered, ...extra]
}

function getSharedAliasMap(subject: SubjectManifest): Record<string, string> {
  const aliasMap: Record<string, string> = {
    blueprint: "learning-map",
  }

  const subjectSlugs = new Set(subject.deepDivePages.map((page) => page.slug))
  if (subjectSlugs.has("future")) aliasMap.future = "future"
  if (subjectSlugs.has("ops")) aliasMap.ops = "ops"

  return aliasMap
}

export function getSubjectPresentation(subject: SubjectManifest): SubjectPresentation {
  switch (subject.slug) {
    case "marketing":
      return {
        defaultVariant: "classic",
        classicHome: "marketing",
        brandName: "Marketing Academy",
        brandMark: "M",
        footerLine: "Built to accelerate your marketing journey",
        navPosition: "fixed",
        mainNav: [
          { href: "/", label: "Start Here", icon: Compass },
          { href: "/learning-map", label: "Map", icon: Map },
          { href: "/modules", label: "Modules", icon: BookOpen },
          { href: "/projects", label: "Projects", icon: FolderKanban },
          { href: "/simulation", label: "Simulation", icon: Zap },
          { href: "/tools", label: "Tools", icon: Cpu },
          { href: "/toolkit", label: "Toolkit", icon: Wrench },
        ],
        deepNav: [
          { href: "/experimentation", label: "Experimentation", icon: FlaskConical },
          { href: "/careers", label: "Career Paths", icon: Users },
          { href: "/measurement-architecture", label: "Measurement", icon: BarChart3 },
          { href: "/attribution", label: "Attribution", icon: Target },
          { href: "/ai-workflows", label: "AI Workflows", icon: Bot },
          { href: "/marketing-ops", label: "Marketing Ops", icon: Settings },
          { href: "/executive-communication", label: "Exec Comms", icon: MessageSquare },
          { href: "/privacy-ethics", label: "Privacy & Ethics", icon: Shield },
          { href: "/timeline", label: "Your Timeline", icon: Clock },
          { href: "/day-in-the-life", label: "Day in Life", icon: Briefcase },
          { href: "/resources", label: "Resources", icon: Library },
          { href: "/future-of-marketing", label: "Future", icon: TrendingUp },
        ],
        aliasMap: {
          blueprint: "learning-map",
          future: "future-of-marketing",
          ops: "marketing-ops",
        },
        extraDeepDiveSlugs: [],
      }
    case "sales":
      return {
        defaultVariant: "classic",
        classicHome: "sales",
        brandName: "Sales Academy",
        brandMark: "S",
        footerLine: "Built to accelerate your sales career",
        navPosition: "fixed",
        mainNav: [
          { href: "/", label: "Start Here", icon: Compass },
          { href: "/learning-map", label: "Map", icon: Map },
          { href: "/modules", label: "Modules", icon: BookOpen },
          { href: "/projects", label: "Projects", icon: FolderKanban },
          { href: "/simulation", label: "Simulation", icon: Zap },
          { href: "/tools", label: "Tools", icon: Cpu },
          { href: "/toolkit", label: "Toolkit", icon: Wrench },
        ],
        deepNav: [
          { href: "/experimentation", label: "Experimentation", icon: FlaskConical },
          { href: "/ae-blueprint", label: "AE Blueprint", icon: Target },
          { href: "/careers", label: "Career Paths", icon: Users },
          { href: "/measurement-architecture", label: "Sales Metrics", icon: BarChart3 },
          { href: "/attribution", label: "Deal Attribution", icon: Target },
          { href: "/ai-workflows", label: "AI for Sales", icon: Bot },
          { href: "/sales-ops", label: "Sales Ops", icon: Settings },
          { href: "/executive-communication", label: "Exec Selling", icon: MessageSquare },
          { href: "/privacy-ethics", label: "Sales Ethics", icon: Shield },
          { href: "/day-in-the-life", label: "Day in Life", icon: Briefcase },
          { href: "/resources", label: "Resources", icon: Library },
          { href: "/future-of-sales", label: "Future", icon: TrendingUp },
        ],
        aliasMap: {
          blueprint: "ae-blueprint",
          future: "future-of-sales",
          ops: "sales-ops",
        },
        extraDeepDiveSlugs: ["timeline"],
      }
    case "ai-engineering":
      return {
        defaultVariant: "classic",
        classicHome: "ai-engineering",
        brandName: "Frontier AI Engineer Academy",
        brandMark: "FA",
        footerLine: "Built for frontier product, platform, and reliability builders",
        navPosition: "sticky",
        mainNav: [
          { href: "/", label: "Start Here", icon: Compass },
          { href: "/frontier-blueprint", label: "Blueprint", icon: Map },
          { href: "/modules", label: "Modules", icon: BookOpen },
          { href: "/projects", label: "Projects", icon: FolderKanban },
          { href: "/simulation", label: "Simulation", icon: Zap },
          { href: "/tools", label: "Tools", icon: Cpu },
          { href: "/toolkit", label: "Toolkit", icon: Wrench },
        ],
        deepNav: [
          { href: "/learning-map", label: "Learning Map", icon: Map },
          { href: "/automations", label: "Automations", icon: Bot },
          { href: "/rag-deep-dive", label: "RAG", icon: Database },
          { href: "/agentic-systems", label: "Agents", icon: Bot },
          { href: "/building-models", label: "Building Models", icon: Brain },
          { href: "/cloud-infrastructure", label: "Cloud Infra", icon: Cloud },
          { href: "/ai-future", label: "Future of AI", icon: TrendingUp },
          { href: "/experimentation", label: "Experimentation", icon: FlaskConical },
          { href: "/careers", label: "Career Paths", icon: Users },
          { href: "/measurement-architecture", label: "ML Measurement", icon: BarChart3 },
          { href: "/attribution", label: "Explainability", icon: Target },
          { href: "/ai-workflows", label: "AI Dev Workflows", icon: Settings },
          { href: "/platform-ops", label: "Platform Ops", icon: Settings },
          { href: "/executive-communication", label: "AI Stakeholders", icon: MessageSquare },
          { href: "/privacy-ethics", label: "AI Ethics", icon: Shield },
          { href: "/day-in-the-life", label: "Day in Life", icon: Briefcase },
          { href: "/resources", label: "Resources", icon: Library },
        ],
        aliasMap: {
          blueprint: "frontier-blueprint",
          future: "ai-future",
          ops: "platform-ops",
        },
        extraDeepDiveSlugs: ["timeline"],
      }
    default:
      return {
        defaultVariant: "classic",
        classicHome: "shared",
        brandName: `${subject.name} Academy`,
        brandMark: subject.shortName.slice(0, 2).toUpperCase(),
        footerLine: `Built around ${titleCaseTagline(subject.tagline).toLowerCase()}`,
        navPosition: "fixed",
        mainNav: SHARED_MAIN_NAV,
        deepNav: getSharedDeepNav(subject),
        aliasMap: getSharedAliasMap(subject),
        extraDeepDiveSlugs: [],
      }
  }
}

export function getCanonicalDeepDiveSlug(
  subject: SubjectManifest,
  requestedSlug: string
): string {
  const presentation = getSubjectPresentation(subject)
  return presentation.aliasMap[requestedSlug] ?? requestedSlug
}

export function getAllPresentationDeepDiveSlugs(subject: SubjectManifest): string[] {
  const presentation = getSubjectPresentation(subject)
  const slugs = new Set<string>()

  for (const item of [...presentation.mainNav, ...presentation.deepNav]) {
    if (!isCoreSubjectPath(item.href)) {
      slugs.add(item.href.replace(/^\//, ""))
    }
  }

  for (const page of subject.deepDivePages) {
    slugs.add(page.slug)
  }

  for (const alias of Object.keys(presentation.aliasMap)) {
    slugs.add(alias)
  }

  for (const slug of presentation.extraDeepDiveSlugs) {
    slugs.add(slug)
  }

  return Array.from(slugs)
}
