"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Phone,
  Users,
  Target,
  Bot,
  Briefcase,
  ArrowUpRight,
  Star,
  Building2,
  Zap,
  Heart,
  Handshake,
  Settings,
  Presentation,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* --- Sales Specialisations ------------------------------------------------ */

interface Specialisation {
  slug: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  salaryRange: string
  demandLevel: "Very High" | "High" | "Medium" | "Growing"
  closenessToRevenue: number
  description: string
  whatYouDo: string[]
  dayToDay: string[]
  tools: string[]
  whyItMatters: string
  careerPath: string[]
  bestFor: string
}

const SPECIALISATIONS: Specialisation[] = [
  {
    slug: "ae-mid-market",
    title: "Account Executive (Mid-Market)",
    icon: Briefcase,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    salaryRange: "$120K-$200K AUD OTE",
    demandLevel: "Very High",
    closenessToRevenue: 5,
    description: "Mid-market AEs own the full sales cycle in a modern SaaS motion. They generate part of their own pipeline, run discovery, coordinate technical validation, build business cases, negotiate commercials, and are trusted to forecast the quarter with discipline.",
    whatYouDo: [
      "Source 30-50% of your own pipeline through outbound, referrals, and smart account research",
      "Run discovery calls to uncover pain points, budget, technical requirements, and decision-making processes",
      "Deliver tailored demos with clear business outcomes, often alongside a Solutions Engineer",
      "Build and present business cases that justify the investment and quantify ROI",
      "Negotiate pricing, terms, and contract structures while protecting long-term value",
      "Manage a pipeline of 20-50 opportunities with accurate stages, next steps, and forecast categories",
    ],
    dayToDay: [
      "Morning: Review pipeline, prep for 3-4 discovery or demo calls",
      "Midday: Back-to-back calls — discovery, demo, and negotiation meetings",
      "Afternoon: Follow-up emails, proposal writing, CRM updates, pipeline review with manager",
    ],
    tools: ["Salesforce", "Clari", "Gong", "LinkedIn Sales Navigator", "ZoomInfo"],
    whyItMatters: "Account Executives are the revenue engine. They do not just close revenue; they create confidence in the forecast. Every deal that closes, every dollar of new ARR, and every credible commit call flows through an AE. It is the most directly accountable role in any B2B company.",
    careerPath: ["SDR → Mid-Market AE → Senior AE → Enterprise AE → Sales Manager → VP Sales"],
    bestFor: "People who thrive on human connection, can handle rejection, love the thrill of closing, and want direct control over their earnings.",
  },
  {
    slug: "enterprise-ae",
    title: "Enterprise Account Executive",
    icon: Building2,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    salaryRange: "$150K-$300K AUD OTE",
    demandLevel: "High",
    closenessToRevenue: 5,
    description: "Enterprise AEs sell technically complex platforms into large organisations. Sales cycles run 6-18 months with 10+ stakeholders, procurement, security review, and executive alignment. They are judged on net-new ARR, account strategy, and forecast discipline.",
    whatYouDo: [
      "Map complex organisations to identify all decision-makers and influencers",
      "Build executive-level relationships with CxOs and VPs",
      "Orchestrate internal teams — solutions engineers, product, legal, finance, and executive sponsors",
      "Navigate procurement processes, security reviews, partner motions, and legal negotiations",
      "Develop strategic account plans and mutual action plans for each target enterprise",
      "Build vertical-specific business cases that land with both operators and economic buyers",
      "Manage 5-15 high-value opportunities with long cycles and defensible forecast categories",
    ],
    dayToDay: [
      "Morning: Executive breakfast meeting with prospect CTO, prep board-ready business case",
      "Midday: Internal deal strategy session with solutions engineer and VP Sales",
      "Afternoon: Contract redline review with legal, follow-up on RFP response",
    ],
    tools: ["Salesforce", "Clari", "Gong", "LinkedIn Sales Navigator", "DocuSign", "Highspot"],
    whyItMatters: "Enterprise deals are transformational revenue. One enterprise win can change the quarter, but only if the AE can blend technical credibility with commercial discipline. These AEs shape company strategy because they sit at the intersection of product, customer, market, and executive buying dynamics.",
    careerPath: ["Mid-Market AE → Enterprise AE → Strategic AE → VP Sales → CRO"],
    bestFor: "Patient strategists who love complex problem-solving, relationship-building at senior levels, and coordinating teams to win big.",
  },
  {
    slug: "sdr-bdr",
    title: "SDR / BDR",
    icon: Phone,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    salaryRange: "$80K-$120K AUD OTE",
    demandLevel: "Very High",
    closenessToRevenue: 4,
    description: "Sales Development Representatives (SDRs) and Business Development Representatives (BDRs) are the top-of-funnel engine. They prospect, cold call, send outbound emails, and qualify leads before handing them to AEs. It's the training ground for every great AE and sales leader.",
    whatYouDo: [
      "Research target accounts and identify key decision-makers",
      "Execute outbound sequences — cold calls, emails, LinkedIn messages",
      "Qualify inbound leads using frameworks like BANT or MEDDIC",
      "Book discovery meetings for Account Executives",
      "Maintain accurate CRM records and activity metrics",
      "Hit daily activity targets: 50-80 calls, 30-50 emails, 10-20 LinkedIn touches",
    ],
    dayToDay: [
      "Morning: Power hour — 25+ cold calls to target accounts",
      "Midday: Personalised email sequences, LinkedIn outreach, lead research",
      "Afternoon: Qualification calls, CRM updates, prep for tomorrow's target list",
    ],
    tools: ["Salesloft", "Outreach", "LinkedIn Sales Navigator", "ZoomInfo", "Salesforce"],
    whyItMatters: "SDRs fuel the entire revenue machine. Without pipeline generation, AEs have nobody to sell to. The SDR role teaches the fundamentals — rejection handling, qualifying, time management — that make great sales careers. Most VP Sales started here.",
    careerPath: ["SDR/BDR → Mid-Market AE → Senior AE → Enterprise AE or Sales Manager"],
    bestFor: "High-energy people who are resilient, competitive, coachable, and ready to learn sales from the ground up.",
  },
  {
    slug: "solutions-engineer",
    title: "Solutions Engineer / Sales Engineer",
    icon: Settings,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    salaryRange: "$130K-$200K AUD OTE",
    demandLevel: "High",
    closenessToRevenue: 4,
    description: "Solutions Engineers (SEs) are the technical half of the sales team. They partner with AEs to deliver product demonstrations, build custom proof-of-concepts, answer technical questions, and design solutions that map to the customer's architecture and requirements.",
    whatYouDo: [
      "Deliver tailored product demonstrations that connect features to business outcomes",
      "Build proof-of-concept environments for complex evaluations",
      "Answer technical questions from IT, security, and engineering stakeholders",
      "Design implementation architectures and integration plans",
      "Translate technical capabilities into business value for non-technical buyers",
      "Partner with AEs to develop deal strategy and overcome technical objections",
    ],
    dayToDay: [
      "Morning: Prep custom demo environment for enterprise prospect",
      "Midday: Joint call with AE — technical deep-dive with prospect's engineering team",
      "Afternoon: Build proof-of-concept, respond to security questionnaire, update deal notes",
    ],
    tools: ["Demo environments", "Salesforce", "Confluence", "Postman", "Jira"],
    whyItMatters: "In technical sales, the SE is the credibility builder. Buyers trust the SE because they speak their language. A great SE can turn a lukewarm demo into a must-have purchase. They bridge the gap between what the product does and what the customer needs.",
    careerPath: ["SE → Senior SE → Principal SE → SE Manager → VP Solutions Engineering"],
    bestFor: "People who love technology AND people, can simplify complex concepts, and enjoy the puzzle of matching solutions to problems.",
  },
  {
    slug: "csm",
    title: "Customer Success Manager",
    icon: Heart,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    salaryRange: "$90K-$150K AUD OTE",
    demandLevel: "High",
    closenessToRevenue: 4,
    description: "Customer Success Managers own the post-sale relationship. They ensure customers achieve their desired outcomes, drive adoption, identify expansion opportunities, and prevent churn. In SaaS, CSMs are directly responsible for net revenue retention — the metric investors care about most.",
    whatYouDo: [
      "Onboard new customers and drive time-to-value",
      "Conduct quarterly business reviews (QBRs) with key stakeholders",
      "Monitor product usage data to identify churn risks and expansion signals",
      "Build and execute success plans tailored to each account's goals",
      "Identify and close upsell and cross-sell opportunities",
      "Act as the voice of the customer internally — feeding insights to product and sales",
    ],
    dayToDay: [
      "Morning: Review health scores, follow up on at-risk accounts",
      "Midday: QBR with key account, onboarding call with new customer",
      "Afternoon: Usage data analysis, expansion opportunity write-ups, product feedback session",
    ],
    tools: ["Gainsight", "Salesforce", "Pendo", "Zoom", "Looker"],
    whyItMatters: "Acquiring a new customer costs 5-25x more than retaining one. CSMs protect and grow existing revenue. Net revenue retention above 120% — driven by great CS — is the single strongest predictor of SaaS company valuation.",
    careerPath: ["CSM → Senior CSM → CS Manager → VP Customer Success → CCO"],
    bestFor: "Empathetic relationship-builders who love helping people succeed and can balance customer advocacy with commercial outcomes.",
  },
  {
    slug: "sales-manager",
    title: "Sales Manager",
    icon: Users,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    salaryRange: "$140K-$220K AUD OTE",
    demandLevel: "High",
    closenessToRevenue: 5,
    description: "Sales Managers lead and develop a team of 5-10 AEs. They coach reps, run pipeline reviews, set strategy, hire talent, and are accountable for their team's quota. The transition from individual contributor to manager is one of the most important in a sales career.",
    whatYouDo: [
      "Coach AEs on deal strategy, objection handling, and closing techniques",
      "Run weekly pipeline reviews and forecast accurately to leadership",
      "Hire, onboard, and ramp new sales reps",
      "Set territory plans and account assignments",
      "Remove blockers on key deals — join calls, escalate to executives",
      "Build and maintain a high-performance team culture",
    ],
    dayToDay: [
      "Morning: 1:1 coaching sessions with two AEs, review call recordings in Gong",
      "Midday: Team pipeline review, deal strategy sessions on top 5 opportunities",
      "Afternoon: Forecast update to VP Sales, interview a candidate, team training session",
    ],
    tools: ["Salesforce", "Gong", "Clari", "Lattice", "Google Sheets"],
    whyItMatters: "A great sales manager is the single biggest factor in team performance. Research shows that reps under strong managers outperform by 15-20%. Managers multiply revenue not by selling themselves, but by making 8 reps better every day.",
    careerPath: ["Senior AE → Sales Manager → Director of Sales → VP Sales → CRO"],
    bestFor: "Former top AEs who get more satisfaction from developing others than closing their own deals. Patient coaches who love building systems and culture.",
  },
  {
    slug: "vp-sales",
    title: "VP Sales",
    icon: TrendingUp,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    salaryRange: "$200K-$350K AUD OTE",
    demandLevel: "Medium",
    closenessToRevenue: 5,
    description: "The VP Sales owns the entire revenue number. They design the go-to-market strategy, build the sales organisation, set comp plans, align with marketing and product, and report directly to the CEO or CRO. This is where sales meets business strategy.",
    whatYouDo: [
      "Design and execute the go-to-market sales strategy",
      "Build and structure the sales organisation — teams, territories, roles",
      "Set quotas, compensation plans, and incentive structures",
      "Forecast revenue accurately to the board and investors",
      "Align sales with marketing, product, and customer success",
      "Hire and develop sales managers and senior leaders",
    ],
    dayToDay: [
      "Morning: Board prep — revenue forecast, pipeline analysis, strategic narrative",
      "Midday: Cross-functional sync with CMO and VP Product on GTM alignment",
      "Afternoon: Skip-level 1:1s with AEs, review comp plan for next quarter, talent pipeline review",
    ],
    tools: ["Clari", "Salesforce", "Gong", "Board decks", "Financial models"],
    whyItMatters: "The VP Sales translates company strategy into revenue execution. When a company hits its number, the VP Sales built the machine that delivered it. When it misses, they own that too. This is the most high-stakes, high-reward leadership role in sales.",
    careerPath: ["Director of Sales → VP Sales → SVP Sales → CRO → CEO"],
    bestFor: "Strategic leaders who think in systems, can operate at both 30,000 feet and street level, and thrive under pressure with high accountability.",
  },
  {
    slug: "rev-ops",
    title: "Revenue Operations",
    icon: BarChart3,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    salaryRange: "$110K-$180K AUD",
    demandLevel: "Growing",
    closenessToRevenue: 4,
    description: "Revenue Operations (RevOps) is the infrastructure that makes sales scalable. RevOps owns the CRM, reporting, territory planning, compensation administration, and process optimisation. They are to sales what DevOps is to engineering — the force multiplier.",
    whatYouDo: [
      "Design and maintain CRM architecture, workflows, and automation",
      "Build sales dashboards, pipeline reports, and forecast models",
      "Administer territory assignments and quota distribution",
      "Optimise the sales process — identify bottlenecks, improve conversion rates",
      "Manage sales technology stack (CRM, engagement tools, analytics)",
      "Support compensation plan design and commission calculations",
    ],
    dayToDay: [
      "Morning: Fix broken Salesforce workflow, update forecast dashboard",
      "Midday: Territory re-balancing analysis, meeting with VP Sales on process change",
      "Afternoon: Build pipeline conversion report, evaluate new sales tool, commission audit",
    ],
    tools: ["Salesforce Admin", "Looker/Tableau", "Excel/Sheets", "Clari", "LeanData"],
    whyItMatters: "RevOps is the fastest-growing function in B2B sales. As sales teams scale, the complexity of data, tools, and processes grows exponentially. RevOps makes the machine run. Without it, AEs spend 30% of their time on admin instead of selling.",
    careerPath: ["Sales Ops Analyst → RevOps Manager → Director RevOps → VP Revenue Operations → CRO"],
    bestFor: "Analytical, systems-thinking people who love process improvement, data, and making other people's jobs easier.",
  },
  {
    slug: "sales-enablement",
    title: "Sales Enablement",
    icon: Presentation,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    salaryRange: "$100K-$160K AUD",
    demandLevel: "Growing",
    closenessToRevenue: 3,
    description: "Sales Enablement designs and delivers the training, content, playbooks, and tools that make sales reps more effective. They bridge the gap between what the company builds and what reps need to sell it. Enablement directly impacts ramp time, win rates, and deal size.",
    whatYouDo: [
      "Design and deliver onboarding programs for new sales hires",
      "Create sales playbooks, battle cards, and objection-handling guides",
      "Build and maintain a content library — case studies, ROI calculators, one-pagers",
      "Run ongoing training on product updates, competitive intelligence, and selling skills",
      "Analyse win/loss data to identify skill gaps and content needs",
      "Partner with product marketing on messaging and positioning for sales",
    ],
    dayToDay: [
      "Morning: Run new hire training session on discovery methodology",
      "Midday: Update competitive battle card, review call recordings for coaching themes",
      "Afternoon: Build new product launch playbook, meet with PM on upcoming feature release",
    ],
    tools: ["Highspot", "Gong", "Seismic", "Notion", "Loom"],
    whyItMatters: "Companies with formal enablement have 15% higher win rates. Enablement reduces ramp time from 9 months to 4-5 months. When reps have the right content, training, and tools, they spend time selling instead of searching for answers.",
    careerPath: ["Enablement Specialist → Enablement Manager → Director of Enablement → VP Sales Enablement"],
    bestFor: "Teachers and communicators who understand sales but prefer to multiply others rather than carry a quota themselves.",
  },
]

const AE_EXPECTATIONS = [
  {
    icon: Target,
    title: "Create pipeline",
    description: "Expectations now lean harder into self-sourced pipeline, meetings booked, and targeted account research rather than passive dependency on inbound.",
  },
  {
    icon: Handshake,
    title: "Run the full cycle",
    description: "Discovery, demos, ROI stories, negotiation, and expansion thinking all belong to the AE role, even when specialists join the deal.",
  },
  {
    icon: BarChart3,
    title: "Forecast cleanly",
    description: "Leaders value AEs who keep Salesforce current, call commit versus upside clearly, and know why a deal is real.",
  },
  {
    icon: Zap,
    title: "Coordinate complexity",
    description: "Technical teammates, legal, finance, procurement, and multi-threaded buyers are now part of the job, not edge cases.",
  },
]

/* --- Revenue proximity visualisation helper --- */

function RevenueBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted w-28 shrink-0">Revenue Impact</span>
      <div className="flex gap-0.5 flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              i < value ? "bg-editorial-green" : "bg-editorial-canvas"
            )}
          />
        ))}
      </div>
    </div>
  )
}

/* --- Sorting/filtering --- */

type SortBy = "revenue" | "salary" | "demand"

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "revenue", label: "Closest to Revenue" },
  { value: "salary", label: "Highest Earning" },
  { value: "demand", label: "Most In-Demand" },
]

const DEMAND_ORDER: Record<string, number> = {
  "Very High": 4,
  "High": 3,
  "Growing": 2,
  "Medium": 1,
}

function parseSalaryMax(range: string): number {
  const match = range.match(/\$(\d+)K/g)
  if (!match || match.length < 2) return 0
  return parseInt(match[1].replace("$", "").replace("K", ""))
}

/* --- Page --- */

export default function CareersPage() {
  const [sortBy, setSortBy] = useState<SortBy>("revenue")
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const sorted = [...SPECIALISATIONS].sort((a, b) => {
    if (sortBy === "revenue") return b.closenessToRevenue - a.closenessToRevenue
    if (sortBy === "salary") return parseSalaryMax(b.salaryRange) - parseSalaryMax(a.salaryRange)
    return (DEMAND_ORDER[b.demandLevel] ?? 0) - (DEMAND_ORDER[a.demandLevel] ?? 0)
  })

  const active = SPECIALISATIONS.find((s) => s.slug === activeSlug)

  return (
    <div className="container py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Career Guide
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Sales Specialisations
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Sales isn&apos;t one job — it&apos;s a family of specialisations, each with
          different skills, tools, earning potential, and proximity to the revenue
          number. Understanding the landscape helps you choose where to build your career.
        </p>
      </div>

      {/* Why this matters callout */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6">
          <h3 className="font-serif font-semibold text-editorial-ink mb-3">
            Why &quot;closeness to revenue&quot; matters
          </h3>
          <p className="text-sm text-editorial-muted leading-relaxed max-w-3xl">
            Some sales roles directly close deals — they can say &quot;I brought in
            $2M this quarter.&quot; Others build the infrastructure, enablement, and
            systems that make closing possible. Both matter. But if you want to be
            valued quickly, understand which roles sit closest to the number the CEO
            cares about most: revenue. The closer you are to the close, the higher
            your earning potential through variable compensation.
          </p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <div className="max-w-3xl">
          <h3 className="font-serif font-semibold text-editorial-ink text-xl">
            What modern SaaS companies expect from AEs
          </h3>
          <p className="text-sm text-editorial-muted mt-2 leading-relaxed">
            The academy is now pointing more directly at enterprise SaaS AE work:
            stronger technical collaboration, tighter forecasting, and clearer ownership
            of pipeline generation and business cases.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {AE_EXPECTATIONS.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="h-full">
                <CardContent className="p-5 space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft">
                    <Icon className="h-5 w-5 text-editorial-green" />
                  </div>
                  <h4 className="font-serif font-semibold text-editorial-ink text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs text-editorial-muted leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Sort controls */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.18em] text-editorial-muted block">Sort by</span>
        <div className="flex gap-2">
          {SORT_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={sortBy === opt.value ? "default" : "secondary"}
              size="sm"
              onClick={() => setSortBy(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Specialisation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((spec) => {
          const Icon = spec.icon
          return (
            <motion.div
              key={spec.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={cn(
                  "cursor-pointer hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200",
                  activeSlug === spec.slug && "ring-2 ring-editorial-green"
                )}
                onClick={() => setActiveSlug(activeSlug === spec.slug ? null : spec.slug)}
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", spec.bg)}>
                        <Icon className={cn("h-5 w-5", spec.color)} />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-editorial-ink text-sm">{spec.title}</h3>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          <Badge variant="secondary" className="text-[10px]">
                            {spec.demandLevel} demand
                          </Badge>
                          <Badge variant="outline" className="text-[10px] border-editorial-green/20 text-editorial-green">
                            <DollarSign className="mr-1 h-3 w-3" />
                            {spec.salaryRange}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-editorial-muted leading-relaxed line-clamp-2">{spec.description}</p>

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-editorial-muted">Comp / OTE (AU)</span>
                      <span className="font-medium text-editorial-ink">{spec.salaryRange}</span>
                    </div>
                    <RevenueBar value={spec.closenessToRevenue} />
                  </div>

                  <p className="text-[10px] text-editorial-green font-medium flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" /> {spec.bestFor.split(",")[0]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-panel-strong overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-editorial-ink">{active.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="beginner">{active.salaryRange}</Badge>
                      <Badge variant="secondary">{active.demandLevel} demand</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveSlug(null)}>Close</Button>
                </div>

                <p className="text-sm text-editorial-ink/80 leading-relaxed">{active.description}</p>

                {/* Why it matters */}
                <div className="rounded-[14px] bg-editorial-green-soft/60 border border-editorial-green/10 p-4">
                  <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-green mb-2">Why this matters to the business</h4>
                  <p className="text-sm text-editorial-ink/80 leading-relaxed">{active.whyItMatters}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* What you do */}
                  <div className="space-y-2">
                    <h4 className="font-serif font-semibold text-editorial-ink text-sm">What you actually do</h4>
                    <ul className="space-y-1.5">
                      {active.whatYouDo.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-editorial-muted">
                          <div className="h-1 w-1 rounded-full bg-editorial-green mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Day to day */}
                  <div className="space-y-2">
                    <h4 className="font-serif font-semibold text-editorial-ink text-sm">A typical day</h4>
                    {active.dayToDay.map((item) => (
                      <div key={item} className="rounded-[10px] bg-white/50 border border-[rgba(44,49,59,0.06)] px-3 py-2">
                        <p className="text-xs text-editorial-ink/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools + Career path */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-muted mb-2">Tools used</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {active.tools.map((t) => (
                        <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-muted mb-2">Career path</h4>
                    <p className="text-xs text-editorial-ink/80">{active.careerPath[0]}</p>
                  </div>
                </div>

                <RevenueBar value={active.closenessToRevenue} />

                <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                  <p className="text-xs text-editorial-amber"><Star className="h-3 w-3 inline mr-1" /><strong>Best for:</strong> {active.bestFor}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The big picture */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-xl font-serif font-bold text-editorial-ink">
            How the specialisations connect
          </h3>
          <p className="text-sm text-editorial-muted leading-relaxed max-w-3xl">
            No specialisation works alone. SDRs fill the pipeline that AEs close.
            Solutions Engineers build the technical credibility that makes deals possible.
            Customer Success protects and expands the revenue AEs brought in. RevOps makes
            the machine run smoothly. Enablement makes every rep better. Sales Managers
            multiply performance across the team. The VP ties it all to business strategy.
          </p>
          <div className="rounded-[14px] bg-editorial-canvas border border-[rgba(44,49,59,0.08)] p-4">
            <p className="text-xs text-editorial-muted text-center">
              <strong className="text-editorial-ink">The best sales professionals start by carrying a bag</strong> —
              learning the fundamentals of prospecting, qualifying, and closing. Then they
              specialise in the area that matches their strengths. Start in the field, then
              find your lane.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom principle */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Choose the specialisation that matches your energy.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            The highest earners aren&apos;t the ones who picked the &quot;best&quot; role.
            They&apos;re the ones who went all-in on something they genuinely found
            energising — because sustained effort beats talent every time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
