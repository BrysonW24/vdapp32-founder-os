import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Briefcase,
  Calculator,
  Calendar,
  Compass,
  Cpu,
  Database,
  DollarSign,
  FileText,
  FlaskConical,
  FolderKanban,
  Handshake,
  HeartHandshake,
  Landmark,
  Layers3,
  Library,
  Map,
  Megaphone,
  MessageSquare,
  Package,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  Settings,
  Shield,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import type { DomainSlug } from "@/types/curriculum";

export type SubjectHomeVisualKind = DomainSlug;

export interface SubjectHomeCta {
  label: string;
  href: string;
}

export interface SubjectHomeDirectionCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SubjectHomeUsageStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SubjectHomeBranchCard {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export interface SubjectHomeEcosystemStep {
  step: string;
  description: string;
}

export interface SubjectHomeDefinition {
  academyLabel: string;
  heroTitle: string;
  heroAccent: string;
  heroBody: string;
  heroChips: string[];
  primaryCta: SubjectHomeCta;
  secondaryCta: SubjectHomeCta;
  overviewEyebrow: string;
  overviewTitle: string;
  overviewBody: [string, string];
  visualKind: SubjectHomeVisualKind;
  visualTitle: string;
  visualCaption: string;
  signalTitle: string;
  signalBody: string;
  ecosystemTitle: string;
  ecosystemBody: string;
  ecosystemSteps: SubjectHomeEcosystemStep[];
  directionTitle: string;
  directionBody: string;
  directionCards: SubjectHomeDirectionCard[];
  usageSteps: SubjectHomeUsageStep[];
  branchesTitle: string;
  branchesBody: string;
  branchCards: SubjectHomeBranchCard[];
  closingTitle: string;
  closingBody: string;
  closingPrimaryCta: SubjectHomeCta;
  closingSecondaryCta: SubjectHomeCta;
}

const modulesHref = (slug: DomainSlug) => `/${slug}/learn/modules`;
const learningMapHref = (slug: DomainSlug) => `/${slug}/learning-map`;

function makeUsageSteps(subjectName: string): SubjectHomeUsageStep[] {
  return [
    {
      icon: BookOpen,
      title: "Start with Foundations",
      description: `Get the operating basics of ${subjectName.toLowerCase()} before chasing tools, tactics, or edge cases.`,
    },
    {
      icon: Map,
      title: "Study the System",
      description:
        "Use the map to understand how the work connects, where the bottlenecks form, and which decisions compound.",
    },
    {
      icon: Layers3,
      title: "Work Through Modules",
      description:
        "Move through the structured lessons, examples, and frameworks until the patterns feel usable in live work.",
    },
    {
      icon: Rocket,
      title: "Apply It in Real Work",
      description:
        "Turn the subject into action through projects, playbooks, and operating experiments inside the business.",
    },
  ];
}

const SUBJECT_HOME_DEFINITIONS: Record<DomainSlug, SubjectHomeDefinition> = {
  strategy: {
    academyLabel: "Strategy Academy",
    heroTitle: "Build strategy",
    heroAccent: "that survives reality",
    heroBody:
      "Learn how to research markets, choose where to compete, sequence priorities, and turn strategic thinking into a repeatable operating rhythm.",
    heroChips: [
      "Research before certainty",
      "Prioritisation with tradeoffs",
      "Narratives the team can follow",
    ],
    primaryCta: {
      label: "Begin Strategy Modules",
      href: modulesHref("strategy"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("strategy"),
    },
    overviewEyebrow: "What Strategy Is",
    overviewTitle: "Strategy is deliberate focus under constraint",
    overviewBody: [
      "Strong strategy is not a mood board or a vision deck. It is the discipline of deciding what matters, what can wait, and where the business can create unfair leverage.",
      "That means better inputs, clearer choices, stronger sequencing, and a system for revisiting assumptions before they quietly expire.",
    ],
    visualKind: "strategy",
    visualTitle: "The Strategy Loop",
    visualCaption:
      "Scan, frame, choose, and review. Strategy compounds when the loop is faster and clearer than the market around you.",
    signalTitle: "Run strategy like an operating cadence",
    signalBody:
      "The best strategic teams turn uncertainty into a recurring review system: inputs, choices, narrative, and follow-through.",
    ecosystemTitle: "The Strategy Ecosystem",
    ecosystemBody:
      "Each move depends on the quality of the previous one. Research sharpens framing, framing shapes choices, and sequencing protects execution.",
    ecosystemSteps: [
      {
        step: "Scan",
        description:
          "Collect signals from customers, competitors, and the market.",
      },
      {
        step: "Frame",
        description:
          "Clarify the problem worth solving before solutions multiply.",
      },
      {
        step: "Choose",
        description: "Make explicit tradeoffs around bets, focus, and timing.",
      },
      {
        step: "Sequence",
        description: "Turn ambition into a realistic order of operations.",
      },
      {
        step: "Align",
        description: "Explain the logic so the team can act without guessing.",
      },
      {
        step: "Review",
        description:
          "Revisit the assumptions and adjust before drift becomes damage.",
      },
    ],
    directionTitle: "Research-informed strategic direction",
    directionBody:
      "This academy pushes strategy toward evidence, sequencing, and operational clarity rather than abstract planning theatre.",
    directionCards: [
      {
        icon: Search,
        title: "Market Intelligence",
        description:
          "Build a better input layer so strategy decisions come from reality, not internal anecdotes.",
      },
      {
        icon: Target,
        title: "Priority Discipline",
        description:
          "Choose fewer things, sequence them well, and protect focus when every option looks urgent.",
      },
      {
        icon: MessageSquare,
        title: "Strategic Narratives",
        description:
          "Translate tradeoffs into a story your team, investors, and partners can actually execute against.",
      },
    ],
    usageSteps: makeUsageSteps("Strategy"),
    branchesTitle: "Explore Strategy Branches",
    branchesBody:
      "Start with the decision areas that most influence focus, confidence, and team alignment.",
    branchCards: [
      {
        icon: Compass,
        title: "Scenario Planning",
        description:
          "Prepare for multiple futures without creating planning paralysis.",
        href: "/strategy/scenario-planning",
      },
      {
        icon: Search,
        title: "Research Workflows",
        description:
          "Create a better input system for owners, teams, and decision forums.",
        href: "/strategy/research-workflows",
      },
      {
        icon: Target,
        title: "Prioritisation",
        description:
          "Protect focus by turning tradeoffs into a visible decision system.",
        href: "/strategy/prioritization",
      },
      {
        icon: MessageSquare,
        title: "Executive Comms",
        description:
          "Make the strategic logic legible enough that leadership can move together.",
        href: "/strategy/executive-communication",
      },
    ],
    closingTitle: "Ready to sharpen strategy?",
    closingBody:
      "Start with the foundational modules, then move into research workflows and prioritisation while the decisions are still live.",
    closingPrimaryCta: {
      label: "Start Strategy",
      href: modulesHref("strategy"),
    },
    closingSecondaryCta: {
      label: "Open the Strategy Map",
      href: learningMapHref("strategy"),
    },
  },
  product: {
    academyLabel: "Product Academy",
    heroTitle: "Build product",
    heroAccent: "with sharper selection",
    heroBody:
      "Learn how to discover demand, prioritise with discipline, shape roadmaps, and ship products that earn the next decision.",
    heroChips: [
      "Discovery before certainty",
      "Roadmaps that reflect tradeoffs",
      "User signal built into every loop",
    ],
    primaryCta: {
      label: "Begin Product Modules",
      href: modulesHref("product"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("product"),
    },
    overviewEyebrow: "What Product Is",
    overviewTitle: "Product is choosing what deserves to exist",
    overviewBody: [
      "Product work is not just shipping features. It is the discipline of converting customer reality, business goals, and engineering constraints into a sequence the team can trust.",
      "Great product teams decide where to look, what to learn, what to cut, and how to keep the roadmap honest as evidence changes.",
    ],
    visualKind: "product",
    visualTitle: "The Product Cycle",
    visualCaption:
      "Discover, decide, prototype, and ship. The loop matters more than any single release.",
    signalTitle: "Operate product as a learning system",
    signalBody:
      "The strongest product teams make their evidence, sequencing, and review rhythm visible before they make their roadmap louder.",
    ecosystemTitle: "The Product Ecosystem",
    ecosystemBody:
      "Discovery, prioritisation, delivery, and measurement should behave like one system instead of four disconnected functions.",
    ecosystemSteps: [
      {
        step: "Observe",
        description: "Collect user, market, and commercial signal.",
      },
      {
        step: "Diagnose",
        description: "Name the problem precisely before proposing scope.",
      },
      {
        step: "Prioritise",
        description: "Trade off opportunity, effort, and strategic fit.",
      },
      {
        step: "Prototype",
        description: "Reduce risk before committing the full team.",
      },
      {
        step: "Ship",
        description: "Deliver the smallest useful slice with clear intent.",
      },
      {
        step: "Measure",
        description: "Learn what changed and what still needs redesign.",
      },
    ],
    directionTitle: "Research-informed product direction",
    directionBody:
      "This academy leans into disciplined discovery, roadmap integrity, and stakeholder communication instead of feature theatre.",
    directionCards: [
      {
        icon: Compass,
        title: "Discovery Systems",
        description:
          "Create repeatable ways to hear the customer and define what is actually worth solving.",
      },
      {
        icon: Target,
        title: "Priority Architecture",
        description:
          "Use explicit decision rules so the roadmap reflects real leverage instead of the latest pressure.",
      },
      {
        icon: Package,
        title: "Roadmaps With Integrity",
        description:
          "Translate strategy, bets, and constraints into a sequence the team can deliver without surprise churn.",
      },
    ],
    usageSteps: makeUsageSteps("Product"),
    branchesTitle: "Explore Product Branches",
    branchesBody:
      "Move through the four decision zones that most change product quality and team confidence.",
    branchCards: [
      {
        icon: Compass,
        title: "Discovery",
        description:
          "Reduce uncertainty before the roadmap starts collecting expensive guesses.",
        href: "/product/discovery",
      },
      {
        icon: Target,
        title: "Prioritisation",
        description: "Build a sequencing system that holds up under pressure.",
        href: "/product/prioritization",
      },
      {
        icon: Map,
        title: "Roadmapping",
        description:
          "Turn strategic intent into a realistic delivery narrative.",
        href: "/product/roadmapping",
      },
      {
        icon: Users,
        title: "User Research",
        description:
          "Keep the product loop attached to the people it is meant to help.",
        href: "/product/user-research",
      },
    ],
    closingTitle: "Ready to build better product judgment?",
    closingBody:
      "Start with the foundations, then move into discovery and prioritisation while your product decisions are still live.",
    closingPrimaryCta: {
      label: "Start Product",
      href: modulesHref("product"),
    },
    closingSecondaryCta: {
      label: "Open the Product Map",
      href: learningMapHref("product"),
    },
  },
  sales: {
    academyLabel: "Sales Academy",
    heroTitle: "Master enterprise SaaS sales",
    heroAccent: "from zero",
    heroBody:
      "A structured visual academy for becoming a modern Account Executive in software sales, from prospecting and discovery to forecasting and multi-stakeholder closes.",
    heroChips: [
      "Full-cycle ownership",
      "Pipeline discipline",
      "Forecast confidence",
    ],
    primaryCta: { label: "Begin Your Journey", href: modulesHref("sales") },
    secondaryCta: { label: "View AE Blueprint", href: "/sales/ae-blueprint" },
    overviewEyebrow: "What Sales Is",
    overviewTitle: "Sales is value discovery plus commercial motion",
    overviewBody: [
      "Strong sales turns customer pain, buying dynamics, and business outcomes into a process that earns trust instead of forcing urgency.",
      "Modern AEs need discovery depth, technical fluency, process hygiene, and enough judgment to carry a deal through ambiguity.",
    ],
    visualKind: "sales",
    visualTitle: "The Sales Pipeline",
    visualCaption:
      "Prospect, qualify, discover, present, negotiate, and expand without losing the narrative.",
    signalTitle: "Operate the pipeline with signal, not hope",
    signalBody:
      "Pipeline quality, close rate, cycle length, and forecast discipline are the pressure gauges that keep revenue honest.",
    ecosystemTitle: "The Sales Ecosystem",
    ecosystemBody:
      "Prospecting, discovery, demos, negotiation, and expansion only work when they connect into one clear commercial system.",
    ecosystemSteps: [
      {
        step: "Prospect",
        description: "Find the buyers worth real attention.",
      },
      {
        step: "Qualify",
        description: "Confirm fit, urgency, and economic potential.",
      },
      {
        step: "Discover",
        description: "Surface pain, stakes, and change logic.",
      },
      {
        step: "Present",
        description: "Connect the solution to the buyer's world.",
      },
      { step: "Close", description: "Navigate terms, risk, and commitment." },
      {
        step: "Expand",
        description: "Turn trust into durable account growth.",
      },
    ],
    directionTitle: "Research-informed AE direction",
    directionBody:
      "The modern sales path here leans into full-cycle responsibility, account intelligence, technical fluency, and forecast quality.",
    directionCards: [
      {
        icon: Briefcase,
        title: "Full-Cycle Ownership",
        description:
          "Source, qualify, progress, close, and protect the account without losing control of the narrative.",
      },
      {
        icon: Target,
        title: "KPIs That Matter",
        description:
          "Meetings booked, self-sourced pipeline, win rate, forecast accuracy, and closed revenue matter more than shallow activity.",
      },
      {
        icon: Database,
        title: "Technical Credibility",
        description:
          "CRM discipline, security awareness, and tighter coordination with solution engineers are now table stakes.",
      },
    ],
    usageSteps: makeUsageSteps("Sales"),
    branchesTitle: "Explore Sales Branches",
    branchesBody:
      "Use the academy like a revenue system: build the fundamentals, then specialise where the pipeline is breaking.",
    branchCards: [
      {
        icon: Search,
        title: "Prospecting",
        description: "Find and engage the accounts worth a real shot.",
        href: "/sales/learn/modules",
      },
      {
        icon: Handshake,
        title: "AE Blueprint",
        description:
          "See the full-cycle expectation set for modern enterprise sellers.",
        href: "/sales/ae-blueprint",
      },
      {
        icon: BarChart3,
        title: "Sales Metrics",
        description: "Make pipeline quality and forecast truth visible early.",
        href: "/sales/measurement-architecture",
      },
      {
        icon: Bot,
        title: "AI for Sales",
        description:
          "Use tooling to compress admin work without weakening judgment.",
        href: "/sales/ai-workflows",
      },
    ],
    closingTitle: "Ready to start selling with structure?",
    closingBody:
      "Begin with the fundamentals, then move into discovery, metrics, and account strategy as live deals arrive.",
    closingPrimaryCta: {
      label: "Start Sales",
      href: modulesHref("sales"),
    },
    closingSecondaryCta: {
      label: "Explore the AE Blueprint",
      href: "/sales/ae-blueprint",
    },
  },
  marketing: {
    academyLabel: "Marketing Academy",
    heroTitle: "Learn marketing",
    heroAccent: "from zero",
    heroBody:
      "A structured visual academy to understand what marketing is, how the parts connect, and how to start practicing it with real commercial intent.",
    heroChips: [
      "Customer insight first",
      "Channel systems, not hacks",
      "Measurement that changes decisions",
    ],
    primaryCta: { label: "Begin Your Journey", href: modulesHref("marketing") },
    secondaryCta: { label: "Explore the Map", href: "/marketing/learning-map" },
    overviewEyebrow: "What Marketing Is",
    overviewTitle:
      "Marketing is how businesses create attention that turns into demand",
    overviewBody: [
      "Marketing connects a business to the people who actually need what it offers. It turns customer understanding, messaging, and distribution into momentum.",
      "The work only compounds when positioning, content, channels, campaigns, and analytics behave like one system.",
    ],
    visualKind: "marketing",
    visualTitle: "The Marketing Funnel",
    visualCaption:
      "Research, positioning, channels, campaigns, and retention should feed each other.",
    signalTitle: "Run marketing with signal, not noise",
    signalBody:
      "The strongest marketing teams make channel feedback, conversion signal, and growth loops legible before they spend more.",
    ecosystemTitle: "The Marketing Ecosystem",
    ecosystemBody:
      "Every channel decision is downstream of customer clarity, positioning, and a distribution system that can keep learning.",
    ecosystemSteps: [
      {
        step: "Research",
        description: "Understand the market and the people inside it.",
      },
      {
        step: "Position",
        description: "Define the promise and the angle clearly.",
      },
      {
        step: "Message",
        description: "Turn insight into language the market understands.",
      },
      {
        step: "Distribute",
        description: "Choose the channels and the timing.",
      },
      {
        step: "Measure",
        description: "Watch what the audience actually does.",
      },
      {
        step: "Retain",
        description: "Keep the loop alive after the first conversion.",
      },
    ],
    directionTitle: "Research-informed marketing direction",
    directionBody:
      "The academy leans into system design, measurement, and customer understanding rather than disconnected campaign activity.",
    directionCards: [
      {
        icon: Users,
        title: "Customer Clarity",
        description:
          "Build your messaging and channel choices from real demand, not internal taste.",
      },
      {
        icon: Megaphone,
        title: "Channel Systems",
        description:
          "Treat content, paid, email, and brand as one connected acquisition engine.",
      },
      {
        icon: BarChart3,
        title: "Measurement Rigor",
        description:
          "Use signal to improve the system instead of reporting vanity numbers after the fact.",
      },
    ],
    usageSteps: makeUsageSteps("Marketing"),
    branchesTitle: "Explore Marketing Branches",
    branchesBody:
      "Learn the core growth surfaces first, then specialise where distribution and conversion are under pressure.",
    branchCards: [
      {
        icon: Map,
        title: "Learning Map",
        description: "See the full marketing system in one view.",
        href: "/marketing/learning-map",
      },
      {
        icon: FlaskConical,
        title: "Experimentation",
        description:
          "Test channels, messaging, and offers with more discipline.",
        href: "/marketing/experimentation",
      },
      {
        icon: Target,
        title: "Attribution",
        description:
          "Understand how influence and conversion actually connect.",
        href: "/marketing/attribution",
      },
      {
        icon: Settings,
        title: "Marketing Ops",
        description:
          "Turn the function into a system that can scale with less chaos.",
        href: "/marketing/marketing-ops",
      },
    ],
    closingTitle: "Ready to build real marketing judgment?",
    closingBody:
      "Start with the foundations, then move into the map, experimentation, and measurement while campaigns are still live.",
    closingPrimaryCta: {
      label: "Start Marketing",
      href: modulesHref("marketing"),
    },
    closingSecondaryCta: {
      label: "Open the Marketing Map",
      href: "/marketing/learning-map",
    },
  },
  finance: {
    academyLabel: "Finance Academy",
    heroTitle: "Build finance",
    heroAccent: "that protects optionality",
    heroBody:
      "Learn how to manage cash, forecast scenarios, shape pricing, and make financial decisions before the runway starts making them for you.",
    heroChips: [
      "Cash visibility before panic",
      "Models that support decisions",
      "Pricing tied to margin reality",
    ],
    primaryCta: {
      label: "Begin Finance Modules",
      href: modulesHref("finance"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("finance"),
    },
    overviewEyebrow: "What Finance Is",
    overviewTitle: "Finance is how the business sees around corners",
    overviewBody: [
      "Finance turns activity into a forecast, a set of choices, and a clearer sense of risk. It helps the business see the consequences of timing, margin, and allocation before those decisions become painful.",
      "Founders do not need complex finance theatre. They need clear cash visibility, scenario logic, and enough reporting discipline to make the next call well.",
    ],
    visualKind: "finance",
    visualTitle: "The Cash Planning Stack",
    visualCaption:
      "Runway, margins, scenarios, and pricing belong in one decision system, not separate spreadsheets.",
    signalTitle: "Operate finance before the runway tightens",
    signalBody:
      "Cash planning, margin quality, forecast accuracy, and reporting cadence create the warning system that buys time and better decisions.",
    ecosystemTitle: "The Finance Ecosystem",
    ecosystemBody:
      "Planning, pricing, reporting, and capital allocation should behave like one system that protects flexibility.",
    ecosystemSteps: [
      {
        step: "Model",
        description: "Translate assumptions into a baseline financial picture.",
      },
      {
        step: "Plan Cash",
        description: "See the runway early enough to act with intent.",
      },
      {
        step: "Price",
        description: "Protect margin while staying credible in the market.",
      },
      {
        step: "Report",
        description: "Turn numbers into decisions leadership can use.",
      },
      {
        step: "Review",
        description: "Update the assumptions as reality changes.",
      },
      {
        step: "Allocate",
        description: "Put capital behind the highest-leverage work.",
      },
    ],
    directionTitle: "Finance direction for founder-led teams",
    directionBody:
      "This academy keeps finance practical: better visibility, stronger scenario thinking, and clearer conversations about money.",
    directionCards: [
      {
        icon: DollarSign,
        title: "Cash Visibility",
        description:
          "Know when the runway changes, why it changes, and which levers move it fastest.",
      },
      {
        icon: BarChart3,
        title: "Modeling for Decisions",
        description:
          "Use financial models to compare options, not to create decorative precision.",
      },
      {
        icon: TrendingUp,
        title: "Pricing and Margin",
        description:
          "Make pricing decisions with margin quality, positioning, and sales reality in the same frame.",
      },
    ],
    usageSteps: makeUsageSteps("Finance"),
    branchesTitle: "Explore Finance Branches",
    branchesBody:
      "Start with the money systems that change leverage fastest, then deepen the modeling and reporting layer.",
    branchCards: [
      {
        icon: DollarSign,
        title: "Cash Planning",
        description: "Create earlier visibility into runway, risk, and timing.",
        href: "/finance/cash-planning",
      },
      {
        icon: BarChart3,
        title: "Financial Modeling",
        description:
          "Test scenarios before the business pays to learn them live.",
        href: "/finance/financial-modeling",
      },
      {
        icon: Compass,
        title: "Scenario Planning",
        description:
          "Use best-case, base-case, and downside views to protect optionality.",
        href: "/finance/scenario-planning",
      },
      {
        icon: Target,
        title: "Pricing Architecture",
        description:
          "Tie revenue ambition to margin discipline and market logic.",
        href: "/finance/pricing-architecture",
      },
    ],
    closingTitle: "Ready to make finance usable?",
    closingBody:
      "Begin with the foundational modules, then move into cash planning and financial modeling while real decisions are still ahead of you.",
    closingPrimaryCta: {
      label: "Start Finance",
      href: modulesHref("finance"),
    },
    closingSecondaryCta: {
      label: "Open the Finance Map",
      href: learningMapHref("finance"),
    },
  },
  accounting: {
    academyLabel: "Accounting Academy",
    heroTitle: "Build accounting",
    heroAccent: "that keeps the numbers trustworthy",
    heroBody:
      "Learn how to close the books cleanly, manage controls, understand statements, and keep the financial picture usable for decisions.",
    heroChips: [
      "Month-end without drama",
      "Controls that reduce surprises",
      "Statements the team can trust",
    ],
    primaryCta: {
      label: "Begin Accounting Modules",
      href: modulesHref("accounting"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("accounting"),
    },
    overviewEyebrow: "What Accounting Is",
    overviewTitle:
      "Accounting is the discipline that keeps the numbers believable",
    overviewBody: [
      "Accounting is where the business turns transactions into a financial picture leadership can actually trust. It protects clarity around cash, obligations, reporting, and tax exposure.",
      "Good accounting is not just compliance. It is the operational discipline that keeps the financial layer from becoming guesswork.",
    ],
    visualKind: "accounting",
    visualTitle: "The Month-End Close Loop",
    visualCaption:
      "Controls, reconciliation, reporting, and calendar discipline make the books reviewable instead of fragile.",
    signalTitle: "Operate accounting as a recurring control system",
    signalBody:
      "Close speed, reconciliation quality, reporting accuracy, and cash controls matter because trust in the numbers compounds slowly and breaks quickly.",
    ecosystemTitle: "The Accounting Ecosystem",
    ecosystemBody:
      "Statements, controls, tax hygiene, payroll, and revenue recognition should reinforce each other instead of living as isolated admin tasks.",
    ecosystemSteps: [
      {
        step: "Capture",
        description: "Record the underlying activity cleanly and on time.",
      },
      {
        step: "Reconcile",
        description: "Match transactions to reality before issues stack up.",
      },
      {
        step: "Control",
        description: "Protect cash movement, approvals, and process integrity.",
      },
      {
        step: "Close",
        description:
          "Finish the period fast enough that the numbers still matter.",
      },
      {
        step: "Report",
        description: "Translate the statements into a usable management view.",
      },
      {
        step: "Comply",
        description: "Stay ahead of tax, payroll, and timing obligations.",
      },
    ],
    directionTitle: "Accounting direction for operating teams",
    directionBody:
      "The academy focuses on accounting as working infrastructure: clean close cycles, stronger controls, and clearer management reporting.",
    directionCards: [
      {
        icon: Calculator,
        title: "Statement Literacy",
        description:
          "Make the P&L, balance sheet, and cash movements legible enough to support real decisions.",
      },
      {
        icon: Shield,
        title: "Control Hygiene",
        description:
          "Use approvals, reconciliations, and policy discipline to reduce avoidable surprises.",
      },
      {
        icon: MessageSquare,
        title: "Management Reporting",
        description:
          "Turn accounting outputs into a reporting layer leadership can actually act on.",
      },
    ],
    usageSteps: makeUsageSteps("Accounting"),
    branchesTitle: "Explore Accounting Branches",
    branchesBody:
      "Focus on the recurring loops that keep the financial layer accurate, reviewable, and less fragile.",
    branchCards: [
      {
        icon: BarChart3,
        title: "Financial Statements",
        description:
          "Understand how activity turns into the core business picture.",
        href: "/accounting/financial-statements",
      },
      {
        icon: Activity,
        title: "Month-End Close",
        description:
          "Design a close rhythm that is faster, cleaner, and easier to trust.",
        href: "/accounting/month-end-close",
      },
      {
        icon: Shield,
        title: "Cash Controls",
        description:
          "Protect money movement with a system that is hard to abuse.",
        href: "/accounting/cash-controls",
      },
      {
        icon: MessageSquare,
        title: "Management Reporting",
        description:
          "Create a management view that connects finance and operations.",
        href: "/accounting/management-reporting",
      },
    ],
    closingTitle: "Ready to trust the numbers more?",
    closingBody:
      "Start with the foundations, then move into close discipline and reporting while the finance layer is still lightweight enough to improve quickly.",
    closingPrimaryCta: {
      label: "Start Accounting",
      href: modulesHref("accounting"),
    },
    closingSecondaryCta: {
      label: "Open the Accounting Map",
      href: learningMapHref("accounting"),
    },
  },
  operations: {
    academyLabel: "Operations Academy",
    heroTitle: "Build operations",
    heroAccent: "that scales without chaos",
    heroBody:
      "Learn how to design delivery systems, handoffs, SOPs, automations, and measurement loops so execution becomes more dependable as the business grows.",
    heroChips: [
      "Service delivery without firefighting",
      "Automations that remove repeat work",
      "Measurement tied to execution quality",
    ],
    primaryCta: {
      label: "Begin Operations Modules",
      href: modulesHref("operations"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("operations"),
    },
    overviewEyebrow: "What Operations Is",
    overviewTitle: "Operations is the system that keeps promises real",
    overviewBody: [
      "Operations turns plans into reliable execution. It defines how work gets accepted, moved, checked, escalated, and improved once the business is handling real volume.",
      "The goal is not bureaucracy. The goal is a delivery system that stays clear enough to trust while the pace increases.",
    ],
    visualKind: "operations",
    visualTitle: "The Delivery Engine",
    visualCaption:
      "Intake, handoff, delivery, review, and improvement make operations visible enough to scale.",
    signalTitle: "Operate with rhythm, capacity, and exception clarity",
    signalBody:
      "Operations gets stronger when handoffs, service quality, and review loops become obvious before the bottlenecks become emotional.",
    ecosystemTitle: "The Operations Ecosystem",
    ecosystemBody:
      "Delivery systems, automation, measurement, and compliance should strengthen each other instead of creating separate admin layers.",
    ecosystemSteps: [
      {
        step: "Intake",
        description:
          "Capture work clearly enough that downstream teams do not guess.",
      },
      {
        step: "Route",
        description: "Assign ownership and sequence without losing context.",
      },
      {
        step: "Deliver",
        description: "Move the work through the system with visible status.",
      },
      {
        step: "Check",
        description:
          "Use quality controls before errors reach customers or leaders.",
      },
      {
        step: "Review",
        description: "Look for bottlenecks, exceptions, and repeat failures.",
      },
      {
        step: "Improve",
        description:
          "Turn repeated friction into SOPs, tooling, or automation.",
      },
    ],
    directionTitle: "Operations direction for founder-speed teams",
    directionBody:
      "This academy treats operations as a leverage layer: service delivery, automation, and measurement designed for repeatability.",
    directionCards: [
      {
        icon: Settings,
        title: "Delivery Systems",
        description:
          "Design the process so work keeps moving even when the founder is not manually pushing every step.",
      },
      {
        icon: Workflow,
        title: "Automation Readiness",
        description:
          "Identify where workflows are stable enough to automate and where human review still matters.",
      },
      {
        icon: Activity,
        title: "Exception Handling",
        description:
          "Build escalation paths and review loops so operational surprises become easier to absorb.",
      },
    ],
    usageSteps: makeUsageSteps("Operations"),
    branchesTitle: "Explore Operations Branches",
    branchesBody:
      "Start with the delivery layer, then improve the measurement and automation systems around it.",
    branchCards: [
      {
        icon: Settings,
        title: "Service Delivery",
        description:
          "Build a working system for intake, handoffs, and execution quality.",
        href: "/operations/service-delivery",
      },
      {
        icon: Workflow,
        title: "Automations",
        description:
          "Take repeat work out of human heads and make it more dependable.",
        href: "/operations/automations",
      },
      {
        icon: Bot,
        title: "AI Workflows",
        description:
          "Use AI to compress cycle time without losing review discipline.",
        href: "/operations/ai-workflows",
      },
      {
        icon: Shield,
        title: "Compliance",
        description:
          "Keep the operational system fast without creating silent liabilities.",
        href: "/operations/compliance",
      },
    ],
    closingTitle: "Ready to make operations lighter and stronger?",
    closingBody:
      "Begin with the core modules, then move into service delivery and automations while the system is still small enough to redesign quickly.",
    closingPrimaryCta: {
      label: "Start Operations",
      href: modulesHref("operations"),
    },
    closingSecondaryCta: {
      label: "Open the Operations Map",
      href: learningMapHref("operations"),
    },
  },
  "data-analytics": {
    academyLabel: "Data & Analytics Academy",
    heroTitle: "Build analytics",
    heroAccent: "that changes decisions",
    heroBody:
      "Learn how to instrument the product, define metrics, build dashboards, and turn data into a decision system instead of a reporting habit.",
    heroChips: [
      "Instrumentation before dashboards",
      "Definitions that survive handoff",
      "Signal strong enough for action",
    ],
    primaryCta: {
      label: "Begin Data Modules",
      href: modulesHref("data-analytics"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("data-analytics"),
    },
    overviewEyebrow: "What Data & Analytics Is",
    overviewTitle:
      "Analytics is how the business learns from evidence at speed",
    overviewBody: [
      "Analytics makes behaviour visible. It connects product usage, commercial performance, and operational quality into a picture that leaders can interrogate instead of merely admire.",
      "The hard part is not building one dashboard. It is defining metrics, collecting the right data, and creating a review loop that improves decisions.",
    ],
    visualKind: "data-analytics",
    visualTitle: "The Measurement Pipeline",
    visualCaption:
      "Events, definitions, warehouse logic, and dashboards need one clean line of truth.",
    signalTitle: "Run analytics as a signal system, not a slide factory",
    signalBody:
      "Instrumentation quality, dashboard clarity, and reporting cadence matter because teams will act on whatever picture you make easiest to see.",
    ecosystemTitle: "The Data & Analytics Ecosystem",
    ecosystemBody:
      "Instrumentation, warehouse logic, dashboards, experimentation, and executive communication only work when the definitions stay aligned.",
    ecosystemSteps: [
      {
        step: "Instrument",
        description: "Capture the behaviour that actually matters.",
      },
      {
        step: "Define",
        description:
          "Agree on metric definitions before reporting them broadly.",
      },
      {
        step: "Model",
        description: "Transform raw data into decision-ready tables.",
      },
      {
        step: "Visualise",
        description: "Build dashboards that support decisions, not decoration.",
      },
      {
        step: "Review",
        description: "Bring the signal into real team and leadership cadences.",
      },
      {
        step: "Experiment",
        description:
          "Use analytics to learn faster, not just to report the past.",
      },
    ],
    directionTitle: "Data direction for founder-operating teams",
    directionBody:
      "The academy pushes analytics toward instrumentation, shared definitions, and decisions that can be justified with real evidence.",
    directionCards: [
      {
        icon: Activity,
        title: "Instrumentation Discipline",
        description:
          "Measure the underlying behaviour well enough that every dashboard has cleaner foundations.",
      },
      {
        icon: BarChart3,
        title: "Dashboard Clarity",
        description:
          "Design reporting so someone scanning the top line can understand what changed and why it matters.",
      },
      {
        icon: Database,
        title: "Warehouse Logic",
        description:
          "Create a data layer that is easier to trust, reuse, and explain across the business.",
      },
    ],
    usageSteps: makeUsageSteps("Data & Analytics"),
    branchesTitle: "Explore Data Branches",
    branchesBody:
      "Start with the foundations of measurement, then deepen the warehouse, dashboard, and experimentation layers.",
    branchCards: [
      {
        icon: Activity,
        title: "Instrumentation",
        description:
          "Capture the right events before you start debating the dashboard.",
        href: "/data-analytics/instrumentation",
      },
      {
        icon: BarChart3,
        title: "Dashboards",
        description:
          "Create reporting surfaces that support operational decisions quickly.",
        href: "/data-analytics/dashboards",
      },
      {
        icon: Database,
        title: "Warehouse Stack",
        description:
          "Make the underlying data model easier to inspect and reuse.",
        href: "/data-analytics/warehouse-stack",
      },
      {
        icon: FlaskConical,
        title: "Experimentation",
        description:
          "Use testing and signal review to learn faster than intuition alone.",
        href: "/data-analytics/experimentation",
      },
    ],
    closingTitle: "Ready to make analytics more useful?",
    closingBody:
      "Start with the foundations, then move into instrumentation and dashboards while the reporting system is still easy to reshape.",
    closingPrimaryCta: {
      label: "Start Data & Analytics",
      href: modulesHref("data-analytics"),
    },
    closingSecondaryCta: {
      label: "Open the Data Map",
      href: learningMapHref("data-analytics"),
    },
  },
  "customer-success": {
    academyLabel: "Customer Success Academy",
    heroTitle: "Build customer success",
    heroAccent: "that keeps revenue alive",
    heroBody:
      "Learn how to onboard well, measure health, prevent churn, and expand accounts without turning the function into reactive support.",
    heroChips: [
      "Onboarding speed matters",
      "Health signal before churn",
      "Renewals earned through outcomes",
    ],
    primaryCta: {
      label: "Begin Customer Success Modules",
      href: modulesHref("customer-success"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("customer-success"),
    },
    overviewEyebrow: "What Customer Success Is",
    overviewTitle:
      "Customer success protects revenue by turning adoption into trust",
    overviewBody: [
      "Customer success is not a softer version of support. It is the operating discipline that helps customers realise value quickly enough to stay, renew, and grow.",
      "That means onboarding well, reading health early, building review rhythms, and intervening before churn becomes obvious to everyone at once.",
    ],
    visualKind: "customer-success",
    visualTitle: "The Customer Health Journey",
    visualCaption:
      "Onboarding, adoption, health, renewal, and expansion form one revenue-protection system.",
    signalTitle: "Run customer success with health visibility",
    signalBody:
      "Activation speed, health signal, renewal confidence, and expansion readiness determine whether success work stays proactive.",
    ecosystemTitle: "The Customer Success Ecosystem",
    ecosystemBody:
      "Onboarding, support, renewal, and expansion only work when each stage leaves a clearer signal for the next one.",
    ecosystemSteps: [
      {
        step: "Onboard",
        description: "Get customers to first value quickly and clearly.",
      },
      {
        step: "Adopt",
        description: "Build habits around the product before usage drifts.",
      },
      {
        step: "Review",
        description: "Track health, risk, and outcomes in recurring rhythms.",
      },
      {
        step: "Support",
        description:
          "Resolve friction without losing the larger account picture.",
      },
      {
        step: "Renew",
        description: "Earn the next contract before the deadline arrives.",
      },
      {
        step: "Expand",
        description: "Grow the relationship through outcomes, not pressure.",
      },
    ],
    directionTitle: "Customer success direction for durable growth",
    directionBody:
      "This academy leans into health visibility, churn prevention, and systems that make renewal feel like the natural next step.",
    directionCards: [
      {
        icon: Users,
        title: "Onboarding That Sticks",
        description:
          "Get customers to value faster so the rest of the relationship starts from momentum, not confusion.",
      },
      {
        icon: HeartHandshake,
        title: "Health and Risk Signal",
        description:
          "Create a customer health layer strong enough to catch issues before they escalate into churn.",
      },
      {
        icon: RefreshCw,
        title: "Renewal and Expansion",
        description:
          "Make retention, review, and account growth part of one coherent success system.",
      },
    ],
    usageSteps: makeUsageSteps("Customer Success"),
    branchesTitle: "Explore Customer Success Branches",
    branchesBody:
      "Start with the retention levers that most influence trust, then deepen the systems around them.",
    branchCards: [
      {
        icon: Users,
        title: "Onboarding",
        description:
          "Accelerate time to value so success work starts with momentum.",
        href: "/customer-success/onboarding",
      },
      {
        icon: RefreshCw,
        title: "Renewals",
        description:
          "Protect recurring revenue with stronger review and timing discipline.",
        href: "/customer-success/renewals",
      },
      {
        icon: TrendingUp,
        title: "Churn Analysis",
        description:
          "Diagnose why customers leave and which upstream systems need repair.",
        href: "/customer-success/churn-analysis",
      },
      {
        icon: ArrowRight,
        title: "Expansion",
        description: "Grow accounts by tying deeper usage to better outcomes.",
        href: "/customer-success/expansion",
      },
    ],
    closingTitle: "Ready to make retention more deliberate?",
    closingBody:
      "Start with the core modules, then move into onboarding and churn analysis while the renewal system is still easy to improve.",
    closingPrimaryCta: {
      label: "Start Customer Success",
      href: modulesHref("customer-success"),
    },
    closingSecondaryCta: {
      label: "Open the Customer Success Map",
      href: learningMapHref("customer-success"),
    },
  },
  "ai-automation": {
    academyLabel: "AI & Automation Academy",
    heroTitle: "Build AI automation",
    heroAccent: "with approval and control",
    heroBody:
      "Learn how to spot automation candidates, design copilots and agents, define approval boundaries, and make tooling create leverage instead of hidden risk.",
    heroChips: [
      "Automation candidates with ROI",
      "Approval boundaries that stay sane",
      "Copilots before chaotic autonomy",
    ],
    primaryCta: {
      label: "Begin AI & Automation Modules",
      href: modulesHref("ai-automation"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("ai-automation"),
    },
    overviewEyebrow: "What AI / Automation Is",
    overviewTitle: "AI automation is leverage with bounded autonomy",
    overviewBody: [
      "The point of automation is not to replace every human step. It is to remove repeat work, improve cycle time, and keep human judgment where it matters most.",
      "That means better process mapping, clearer approvals, tighter monitoring, and enough operational discipline that the automations stay worth owning.",
    ],
    visualKind: "ai-automation",
    visualTitle: "The Automation Orbit",
    visualCaption:
      "Trigger, orchestrate, approve, act, and review. Leverage comes from a clean loop, not a clever demo.",
    signalTitle: "Operate automation with boundaries and review",
    signalBody:
      "Candidate quality, monitoring discipline, human approvals, and operator review determine whether automation keeps compounding or quietly degrades.",
    ecosystemTitle: "The AI & Automation Ecosystem",
    ecosystemBody:
      "Automations, copilots, agents, approvals, and operations need one shared system of control and measurement.",
    ecosystemSteps: [
      {
        step: "Discover",
        description:
          "Find the workflows where automation genuinely saves time or reduces errors.",
      },
      {
        step: "Design",
        description:
          "Map the trigger, the steps, and the required human checkpoints.",
      },
      {
        step: "Assist",
        description:
          "Use copilots where humans still need to steer the final outcome.",
      },
      {
        step: "Automate",
        description: "Move bounded repeat work into dependable workflows.",
      },
      {
        step: "Approve",
        description:
          "Add human review where risk or ambiguity is still meaningful.",
      },
      {
        step: "Monitor",
        description: "Track drift, failures, and operator trust over time.",
      },
    ],
    directionTitle: "Automation direction for real operator leverage",
    directionBody:
      "The academy emphasises workflow selection, approval architecture, and operating discipline rather than hype around autonomous agents.",
    directionCards: [
      {
        icon: Workflow,
        title: "Automation Candidate Quality",
        description:
          "Choose workflows that are stable enough to automate and painful enough to matter.",
      },
      {
        icon: Shield,
        title: "Approval Boundaries",
        description:
          "Keep the level of human review proportional to business risk and failure cost.",
      },
      {
        icon: Bot,
        title: "Copilots and Agents",
        description:
          "Use assistive AI and bounded automation where they genuinely improve throughput.",
      },
    ],
    usageSteps: makeUsageSteps("AI & Automation"),
    branchesTitle: "Explore AI & Automation Branches",
    branchesBody:
      "Start with workflow discovery, then deepen into copilots, agents, and the boundary layer around them.",
    branchCards: [
      {
        icon: Workflow,
        title: "Automations",
        description:
          "Design repeatable flows that remove work without losing control.",
        href: "/ai-automation/automations",
      },
      {
        icon: Bot,
        title: "Copilots",
        description:
          "Use assistive AI where human judgment still needs to stay close.",
        href: "/ai-automation/copilots",
      },
      {
        icon: Cpu,
        title: "Agents",
        description:
          "Understand where bounded autonomy is useful and where it is not.",
        href: "/ai-automation/agents",
      },
      {
        icon: Shield,
        title: "Approvals",
        description:
          "Design escalation and sign-off paths that keep the system safe enough to trust.",
        href: "/ai-automation/approvals",
      },
    ],
    closingTitle: "Ready to turn AI into leverage?",
    closingBody:
      "Begin with the foundational modules, then move into automations and approval design while the workflows are still easy to reshape.",
    closingPrimaryCta: {
      label: "Start AI & Automation",
      href: modulesHref("ai-automation"),
    },
    closingSecondaryCta: {
      label: "Open the AI & Automation Map",
      href: learningMapHref("ai-automation"),
    },
  },
  "ai-engineering": {
    academyLabel: "Frontier AI Engineer Academy",
    heroTitle: "Frontier AI engineering",
    heroAccent: "for already-technical builders",
    heroBody:
      "Learn the frontier stack: LLM systems, evals, retrieval, agents, platform rails, inference tradeoffs, and portfolio-grade capstones.",
    heroChips: [
      "Eval-first systems",
      "Retrieval, agents, and platform rails",
      "Portfolio-grade build paths",
    ],
    primaryCta: {
      label: "View the Blueprint",
      href: "/ai-engineering/frontier-blueprint",
    },
    secondaryCta: {
      label: "Explore Core Modules",
      href: modulesHref("ai-engineering"),
    },
    overviewEyebrow: "What Frontier AI Engineering Is",
    overviewTitle: "This is not a generic learn-AI path",
    overviewBody: [
      "The promise is a blended frontier role: product judgment plus platform discipline. You learn how modern AI features are designed, evaluated, shipped, and improved.",
      "That means stronger evals, better retrieval systems, bounded agents, deployment rails, and enough engineering depth to make the stack reliable.",
    ],
    visualKind: "ai-engineering",
    visualTitle: "The Frontier Stack",
    visualCaption:
      "Product, platform, retrieval, agents, and evaluation should reinforce each other.",
    signalTitle: "Operate frontier systems with release discipline",
    signalBody:
      "Model behavior, eval quality, system reliability, and deployment controls matter because AI features are only as useful as their operating rails.",
    ecosystemTitle: "The Frontier AI Ecosystem",
    ecosystemBody:
      "Product design, retrieval, agents, platform ops, and evals all feed into one frontier engineering role shape.",
    ecosystemSteps: [
      {
        step: "Design",
        description:
          "Shape the product and interaction model around the real use case.",
      },
      {
        step: "Retrieve",
        description: "Build inspectable knowledge systems and context flows.",
      },
      {
        step: "Orchestrate",
        description:
          "Use tools and agents with clear boundaries and failure handling.",
      },
      {
        step: "Evaluate",
        description:
          "Measure quality with rubrics, golden sets, and regressions.",
      },
      {
        step: "Deploy",
        description:
          "Ship with platform rails that support iteration and release confidence.",
      },
      {
        step: "Observe",
        description: "Learn from traces, errors, and user feedback over time.",
      },
    ],
    directionTitle: "Frontier builder direction",
    directionBody:
      "The academy emphasises the blended frontier role: product, platform, and research-to-production engineering in one operating system.",
    directionCards: [
      {
        icon: Cpu,
        title: "AI Product Engineering",
        description:
          "Own the user-facing layer: interaction design, model choice, evaluation, and feedback loops.",
      },
      {
        icon: Database,
        title: "Retrieval and Agents",
        description:
          "Build knowledge systems, tool use, and bounded autonomy that survive contact with production.",
      },
      {
        icon: Shield,
        title: "Platform and Reliability",
        description:
          "Ship prompts, models, and services with better release gates, observability, and cost discipline.",
      },
    ],
    usageSteps: makeUsageSteps("AI Engineering"),
    branchesTitle: "Explore Frontier Branches",
    branchesBody:
      "Start with the main stack, then go deeper where the product or platform is under real pressure.",
    branchCards: [
      {
        icon: Map,
        title: "Frontier Blueprint",
        description:
          "See the primary role shape and capability architecture in one view.",
        href: "/ai-engineering/frontier-blueprint",
      },
      {
        icon: Bot,
        title: "Agentic Systems",
        description:
          "Understand tool use, bounded autonomy, and production patterns.",
        href: "/ai-engineering/agentic-systems",
      },
      {
        icon: Database,
        title: "RAG Deep Dive",
        description:
          "Design retrieval systems that are inspectable, evaluable, and useful.",
        href: "/ai-engineering/rag-deep-dive",
      },
      {
        icon: Settings,
        title: "Platform Ops",
        description:
          "Build the rails that keep AI systems shippable over time.",
        href: "/ai-engineering/platform-ops",
      },
    ],
    closingTitle: "Ready to build the frontier stack?",
    closingBody:
      "Start with the core modules, then move into the blueprint, agents, retrieval, and platform work as your systems get more ambitious.",
    closingPrimaryCta: {
      label: "Open the Blueprint",
      href: "/ai-engineering/frontier-blueprint",
    },
    closingSecondaryCta: {
      label: "Start the Core Modules",
      href: modulesHref("ai-engineering"),
    },
  },
  leadership: {
    academyLabel: "Leadership Academy",
    heroTitle: "Build leadership",
    heroAccent: "that scales people without fog",
    heroBody:
      "Learn how to hire well, delegate clearly, run one-on-ones, give feedback, and design a team system that does not collapse into ambiguity.",
    heroChips: [
      "Hiring signal before charisma",
      "Delegation with ownership clarity",
      "Feedback that actually changes performance",
    ],
    primaryCta: {
      label: "Begin Leadership Modules",
      href: modulesHref("leadership"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("leadership"),
    },
    overviewEyebrow: "What Leadership Is",
    overviewTitle: "Leadership is the operating system for people quality",
    overviewBody: [
      "Leadership is how a business sets standards, transfers judgment, and keeps teams coordinated without making the founder the bottleneck for every decision.",
      "That means hiring well, defining ownership, creating healthy review rhythms, and building enough trust that feedback can move the work forward.",
    ],
    visualKind: "leadership",
    visualTitle: "The Leadership Radar",
    visualCaption:
      "Hiring, delegation, one-on-ones, feedback, and structure shape whether a team scales cleanly or gets noisier.",
    signalTitle: "Operate leadership with clarity and repetition",
    signalBody:
      "Leadership gets stronger when role clarity, review cadence, hiring quality, and performance conversations stop being improvised.",
    ecosystemTitle: "The Leadership Ecosystem",
    ecosystemBody:
      "Hiring, delegation, coaching, and organisation design all reinforce the quality of execution across the company.",
    ecosystemSteps: [
      {
        step: "Hire",
        description:
          "Bring in people with the right signal, not just the right confidence.",
      },
      {
        step: "Define",
        description: "Make ownership, standards, and expectations explicit.",
      },
      {
        step: "Delegate",
        description:
          "Transfer work and judgment without creating hidden ambiguity.",
      },
      {
        step: "Coach",
        description:
          "Use one-on-ones and feedback to improve quality steadily.",
      },
      {
        step: "Review",
        description:
          "Surface underperformance and friction early enough to intervene.",
      },
      {
        step: "Design",
        description:
          "Shape the team structure so decisions move at the right altitude.",
      },
    ],
    directionTitle: "Leadership direction for small businesses",
    directionBody:
      "This academy treats people leadership as a leverage system: clearer hiring, delegation, structure, and performance standards.",
    directionCards: [
      {
        icon: Users,
        title: "Hiring With Signal",
        description:
          "Define the role, evaluate the evidence, and reduce the odds of hiring for optimism alone.",
      },
      {
        icon: ArrowRight,
        title: "Delegation Design",
        description:
          "Move decisions and execution away from the founder without turning ownership muddy.",
      },
      {
        icon: MessageSquare,
        title: "Performance Conversations",
        description:
          "Use feedback, one-on-ones, and reviews to improve standards while trust is still intact.",
      },
    ],
    usageSteps: makeUsageSteps("Leadership"),
    branchesTitle: "Explore Leadership Branches",
    branchesBody:
      "Start with the people systems that most influence accountability, clarity, and team trust.",
    branchCards: [
      {
        icon: Users,
        title: "Hiring",
        description:
          "Improve the evidence and structure behind every role decision.",
        href: "/leadership/hiring",
      },
      {
        icon: ArrowRight,
        title: "Delegation",
        description:
          "Transfer work, authority, and standards with less ambiguity.",
        href: "/leadership/delegation",
      },
      {
        icon: MessageSquare,
        title: "One-on-Ones",
        description:
          "Make recurring conversations genuinely useful for the work.",
        href: "/leadership/one-on-ones",
      },
      {
        icon: Target,
        title: "Performance Management",
        description:
          "Set clearer standards and intervene earlier when performance drifts.",
        href: "/leadership/performance-management",
      },
    ],
    closingTitle: "Ready to lead with more clarity?",
    closingBody:
      "Start with the foundations, then move into delegation and performance while the team is still small enough to re-pattern quickly.",
    closingPrimaryCta: {
      label: "Start Leadership",
      href: modulesHref("leadership"),
    },
    closingSecondaryCta: {
      label: "Open the Leadership Map",
      href: learningMapHref("leadership"),
    },
  },
  capital: {
    academyLabel: "Capital Academy",
    heroTitle: "Build capital strategy",
    heroAccent: "without losing founder control",
    heroBody:
      "Learn how to run a raise, shape the narrative, manage diligence, understand terms, and allocate capital with clearer strategic intent.",
    heroChips: [
      "Fundraising process with fewer surprises",
      "Narrative tied to real economics",
      "Capital allocation after the raise",
    ],
    primaryCta: {
      label: "Begin Capital Modules",
      href: modulesHref("capital"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("capital"),
    },
    overviewEyebrow: "What Capital Strategy Is",
    overviewTitle:
      "Capital is how the company buys time, leverage, and options",
    overviewBody: [
      "Capital strategy is not just about getting a term sheet. It is about understanding what money is for, how the raise changes control, and where each dollar should go next.",
      "That means narrative clarity, investor targeting, diligence readiness, and enough financial judgment that the money creates leverage instead of pressure.",
    ],
    visualKind: "capital",
    visualTitle: "The Fundraising Pipeline",
    visualCaption:
      "Narrative, targets, meetings, diligence, terms, and post-raise allocation belong in one coherent system.",
    signalTitle: "Operate the raise with narrative and pipeline discipline",
    signalBody:
      "Investor quality, diligence readiness, term understanding, and allocation logic determine whether the raise actually helps the business.",
    ecosystemTitle: "The Capital Ecosystem",
    ecosystemBody:
      "Fundraising, investor communication, diligence, term structure, and capital allocation should reinforce each other from the start.",
    ecosystemSteps: [
      {
        step: "Narrate",
        description: "Clarify the story, proof, and use-of-funds logic.",
      },
      {
        step: "Target",
        description: "Build the right investor list before outreach begins.",
      },
      {
        step: "Run",
        description:
          "Manage the process with tighter rhythm and follow-through.",
      },
      {
        step: "Diligence",
        description: "Prepare materials so scrutiny creates less drag.",
      },
      {
        step: "Negotiate",
        description: "Understand how terms affect control and future options.",
      },
      {
        step: "Allocate",
        description:
          "Use the capital in ways that increase strategic leverage.",
      },
    ],
    directionTitle: "Capital direction for small businesses",
    directionBody:
      "The academy keeps capital practical: better fundraising process, sharper term understanding, and stronger post-raise discipline.",
    directionCards: [
      {
        icon: Landmark,
        title: "Fundraising Process",
        description:
          "Run the raise with cleaner targeting, more credible proof, and fewer avoidable surprises.",
      },
      {
        icon: FileText,
        title: "Term Logic",
        description:
          "Understand the structure of the deal well enough to protect future flexibility and control.",
      },
      {
        icon: DollarSign,
        title: "Capital Allocation",
        description:
          "Use capital as leverage for strategy, not as a temporary licence for looser discipline.",
      },
    ],
    usageSteps: makeUsageSteps("Capital"),
    branchesTitle: "Explore Capital Branches",
    branchesBody:
      "Start with the raise itself, then deepen the diligence, term, and allocation layers around it.",
    branchCards: [
      {
        icon: Landmark,
        title: "Fundraising",
        description:
          "Run a tighter raise with stronger pacing and investor targeting.",
        href: "/capital/fundraising",
      },
      {
        icon: Map,
        title: "Pitch Architecture",
        description:
          "Shape the story, proof, and commercial logic of the raise.",
        href: "/capital/pitch-architecture",
      },
      {
        icon: Search,
        title: "Due Diligence",
        description:
          "Prepare the business to survive investor scrutiny with less drag.",
        href: "/capital/due-diligence",
      },
      {
        icon: DollarSign,
        title: "Capital Allocation",
        description:
          "Use raised capital in ways that create stronger strategic leverage.",
        href: "/capital/capital-allocation",
      },
    ],
    closingTitle: "Ready to run capital with more control?",
    closingBody:
      "Start with the foundations, then move into fundraising and diligence while the next raise is still being shaped.",
    closingPrimaryCta: {
      label: "Start Capital",
      href: modulesHref("capital"),
    },
    closingSecondaryCta: {
      label: "Open the Capital Map",
      href: learningMapHref("capital"),
    },
  },
  legal: {
    academyLabel: "Legal & Risk Academy",
    heroTitle: "Build legal judgment",
    heroAccent: "before the stakes get higher",
    heroBody:
      "Learn how to handle contracts, privacy, IP, employment risk, and vendor exposure with enough clarity that legal no longer shows up only as a surprise.",
    heroChips: [
      "Contracts with better hygiene",
      "Privacy and vendor risk visible earlier",
      "Founder-friendly legal triage",
    ],
    primaryCta: { label: "Begin Legal Modules", href: modulesHref("legal") },
    secondaryCta: { label: "Explore the Map", href: learningMapHref("legal") },
    overviewEyebrow: "What Legal & Risk Is",
    overviewTitle:
      "Legal is how the business reduces ambiguity before it becomes cost",
    overviewBody: [
      "Legal work is not just a last-minute review step. It is the discipline of setting boundaries around contracts, privacy, IP, employment, and vendor risk before those issues become expensive.",
      "Founders do not need to become lawyers. They do need enough legal judgment to spot risk earlier, ask better questions, and escalate the right things.",
    ],
    visualKind: "legal",
    visualTitle: "The Risk Shield",
    visualCaption:
      "Contracts, privacy, IP, employment, and vendor exposure form layered protection around the business.",
    signalTitle: "Operate legal as a boundary system",
    signalBody:
      "Contract hygiene, privacy posture, employment process, and vendor review matter because risk is usually cheapest before it becomes visible.",
    ecosystemTitle: "The Legal & Risk Ecosystem",
    ecosystemBody:
      "Legal risk compounds across contracts, data, people, fundraising, and vendors, so the review system has to see the full surface area.",
    ecosystemSteps: [
      {
        step: "Contract",
        description:
          "Clarify obligations, approvals, and negotiation points early.",
      },
      {
        step: "Protect",
        description:
          "Treat IP and privacy as assets worth defending deliberately.",
      },
      {
        step: "Employ",
        description:
          "Reduce people risk through clearer process and documentation.",
      },
      {
        step: "Review",
        description:
          "Interrogate vendor and third-party exposure before it spreads.",
      },
      {
        step: "Raise",
        description:
          "Understand how legal posture affects fundraising speed and cost.",
      },
      {
        step: "Escalate",
        description:
          "Know what the founder can triage and what legal counsel should own.",
      },
    ],
    directionTitle: "Legal direction for founder-speed execution",
    directionBody:
      "The academy focuses on legal awareness as an operating advantage: fewer surprises, faster escalation, and stronger boundary-setting.",
    directionCards: [
      {
        icon: Shield,
        title: "Contract Hygiene",
        description:
          "Get cleaner templates, review rules, and negotiation posture before the volume rises.",
      },
      {
        icon: Users,
        title: "Employment and Vendor Risk",
        description:
          "Treat people and third-party relationships as sources of leverage and liability at the same time.",
      },
      {
        icon: MessageSquare,
        title: "Founder Triage",
        description:
          "Learn what to handle, what to document, and what to escalate before legal work becomes chaotic.",
      },
    ],
    usageSteps: makeUsageSteps("Legal"),
    branchesTitle: "Explore Legal Branches",
    branchesBody:
      "Start with the boundary areas that most often create silent exposure for growing companies.",
    branchCards: [
      {
        icon: Shield,
        title: "Contracts",
        description:
          "Make agreements clearer, faster to review, and less likely to surprise you.",
        href: "/legal/contracts",
      },
      {
        icon: Shield,
        title: "Privacy Compliance",
        description:
          "Treat privacy as a real operating constraint before it becomes an incident.",
        href: "/legal/privacy-compliance",
      },
      {
        icon: Users,
        title: "Employment Risk",
        description:
          "Reduce people risk through better process, documentation, and timing.",
        href: "/legal/employment-risk",
      },
      {
        icon: Shield,
        title: "Vendor Risk",
        description:
          "Review third-party exposure before it spreads through the system.",
        href: "/legal/vendor-risk",
      },
    ],
    closingTitle: "Ready to make legal less reactive?",
    closingBody:
      "Start with the foundations, then move into contracts and privacy while the business is still easy to clean up.",
    closingPrimaryCta: {
      label: "Start Legal",
      href: modulesHref("legal"),
    },
    closingSecondaryCta: {
      label: "Open the Legal Map",
      href: learningMapHref("legal"),
    },
  },
  "founder-performance": {
    academyLabel: "Founder Performance Academy",
    heroTitle: "Build founder performance",
    heroAccent: "that lasts longer than one hard week",
    heroBody:
      "Learn how to improve decision quality, design your time, manage energy, and stay useful under pressure without turning performance into vague self-help.",
    heroChips: [
      "Decision quality over pure intensity",
      "Energy management as an operating skill",
      "Time design that protects leverage",
    ],
    primaryCta: {
      label: "Begin Founder Performance Modules",
      href: modulesHref("founder-performance"),
    },
    secondaryCta: {
      label: "Explore the Map",
      href: learningMapHref("founder-performance"),
    },
    overviewEyebrow: "What Founder Performance Is",
    overviewTitle: "Founder performance is the system behind useful judgment",
    overviewBody: [
      "Founder performance is not about squeezing more work into a day. It is about protecting the conditions that let a founder think clearly, decide well, and stay steady under pressure.",
      "That means designing time, managing energy, building resilience, and improving the quality of the decisions that shape the company.",
    ],
    visualKind: "founder-performance",
    visualTitle: "The Founder Performance Wheel",
    visualCaption:
      "Decision quality, time design, energy, resilience, and relationships reinforce each other over a week.",
    signalTitle: "Operate yourself with the same care as the business",
    signalBody:
      "The strongest founders track energy, attention, recovery, and decision quality early enough to intervene before performance slips into avoidable volatility.",
    ecosystemTitle: "The Founder Performance Ecosystem",
    ecosystemBody:
      "Energy, time, resilience, relationships, and decision quality all shape how useful a founder remains under pressure.",
    ecosystemSteps: [
      {
        step: "Observe",
        description:
          "Notice where energy, time, and clarity are actually going.",
      },
      {
        step: "Design",
        description:
          "Protect the blocks of time that matter most for decision quality.",
      },
      {
        step: "Recover",
        description:
          "Build enough recovery that intensity can be repeated safely.",
      },
      {
        step: "Decide",
        description:
          "Improve judgment with better framing, reflection, and review.",
      },
      {
        step: "Relate",
        description:
          "Keep trust with team, partners, and stakeholders healthy.",
      },
      {
        step: "Sustain",
        description: "Make high performance durable instead of episodic.",
      },
    ],
    directionTitle: "Performance direction for founder-led pressure",
    directionBody:
      "The academy treats founder performance as a real operating discipline: clearer decisions, stronger energy management, and more deliberate time design.",
    directionCards: [
      {
        icon: Brain,
        title: "Decision Quality",
        description:
          "Improve the way choices are framed, documented, and reviewed under pressure.",
      },
      {
        icon: Zap,
        title: "Energy Management",
        description:
          "Treat physical and cognitive energy as a real business input, not an afterthought.",
      },
      {
        icon: Calendar,
        title: "Time Design",
        description:
          "Protect the work and relationships that create the most leverage across a week.",
      },
    ],
    usageSteps: makeUsageSteps("Founder Performance"),
    branchesTitle: "Explore Founder Performance Branches",
    branchesBody:
      "Start with the inner operating system that most affects clarity, steadiness, and useful execution.",
    branchCards: [
      {
        icon: Brain,
        title: "Decision Quality",
        description:
          "Make the highest-stakes decisions less reactive and more inspectable.",
        href: "/founder-performance/decision-quality",
      },
      {
        icon: Zap,
        title: "Energy Management",
        description: "Protect the capacity needed to keep showing up usefully.",
        href: "/founder-performance/energy-management",
      },
      {
        icon: Calendar,
        title: "Time Design",
        description:
          "Stop letting urgency eat the work that actually matters most.",
        href: "/founder-performance/time-design",
      },
      {
        icon: Shield,
        title: "Resilience",
        description:
          "Build the recovery and steadiness needed for longer cycles of pressure.",
        href: "/founder-performance/resilience",
      },
    ],
    closingTitle: "Ready to become a steadier operator?",
    closingBody:
      "Start with the foundations, then move into decision quality and time design while the pressure patterns are still changeable.",
    closingPrimaryCta: {
      label: "Start Founder Performance",
      href: modulesHref("founder-performance"),
    },
    closingSecondaryCta: {
      label: "Open the Founder Performance Map",
      href: learningMapHref("founder-performance"),
    },
  },
};

export function getSubjectHomeDefinition(
  subjectSlug: string,
): SubjectHomeDefinition {
  const definition = SUBJECT_HOME_DEFINITIONS[subjectSlug as DomainSlug];
  if (!definition) {
    throw new Error(
      `No subject home definition registered for: ${subjectSlug}`,
    );
  }
  return definition;
}
