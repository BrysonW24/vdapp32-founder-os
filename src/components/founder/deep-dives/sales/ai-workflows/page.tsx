"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  BarChart3,
  Bot,
  FileText,
  Lightbulb,
  Mail,
  Repeat,
  Search,
  Shield,
  Users,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
}

const AI_ROLES = [
  {
    role: "Account Research",
    icon: Search,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    description: "AI accelerates pre-call prep by summarising company signals, recent changes, hiring patterns, and likely pain hypotheses before the rep joins the conversation.",
    examples: [
      "Summarise the last 90 days of company news for a target account",
      "Map likely stakeholders based on role titles and org changes",
      "Draft three value hypotheses from hiring and expansion signals",
      "Pull likely competitor categories from public review data",
    ],
    humanRole: "Decide what is commercially relevant. AI can gather clues; the rep still needs judgment.",
    timesSaved: "50-70% faster prep",
  },
  {
    role: "Message Drafting",
    icon: FileText,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    description: "AI creates first drafts for cold emails, follow-ups, agenda notes, recap emails, and champion enablement documents so reps can start from something strong instead of a blank page.",
    examples: [
      "Draft three outbound email angles for one persona",
      "Turn call notes into a clean follow-up with next steps",
      "Create an executive summary from a technical evaluation",
      "Draft a one-page internal business case for the champion",
    ],
    humanRole: "Rewrite for accuracy, relevance, and deal context. The rep owns the final message.",
    timesSaved: "60-80% faster drafting",
  },
  {
    role: "Call Preparation",
    icon: Users,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    description: "AI helps reps prepare meeting plans, discovery questions, demo agendas, and objection scenarios tailored to the account.",
    examples: [
      "Generate discovery questions based on the buyer's likely priorities",
      "Build a multi-stakeholder demo agenda from discovery notes",
      "List likely objections for finance, IT, and operations",
      "Create a negotiation prep sheet with tradeables and risks",
    ],
    humanRole: "Choose what to use. AI can offer options, but the rep must decide which path fits the deal.",
    timesSaved: "3-5x faster prep",
  },
  {
    role: "Conversation Analysis",
    icon: Repeat,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    description: "AI reviews calls and meeting notes to surface missing qualification evidence, objection patterns, stakeholder gaps, and follow-up actions.",
    examples: [
      "Identify missing MEDDIC elements from a discovery call",
      "Summarise the top three risks from a late-stage meeting",
      "Flag unanswered technical questions from a demo",
      "Suggest follow-up questions after a stalled deal review",
    ],
    humanRole: "Validate the interpretation. AI can spot patterns, but humans decide what matters most.",
    timesSaved: "4-8 hours per week",
  },
  {
    role: "Deal Inspection",
    icon: BarChart3,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    description: "AI helps managers and reps inspect pipeline by spotting stale deals, weak forecasts, missing stakeholders, and inconsistent stage movement.",
    examples: [
      "Flag deals with no credible next step in the last 14 days",
      "Compare rep forecast calls to actual outcomes for bias patterns",
      "Surface stuck deals missing economic buyer access",
      "Summarise why recent losses cluster in one stage",
    ],
    humanRole: "Make the coaching call. AI can highlight risk; leaders still decide how to act on it.",
    timesSaved: "Better inspection quality at the same cadence",
  },
  {
    role: "Workflow Automation",
    icon: Zap,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    description: "AI and automation reduce manual admin by turning repetitive selling tasks into repeatable workflows across CRM, email, enablement, and handoffs.",
    examples: [
      "Create follow-up tasks when a deal enters proposal stage",
      "Auto-summarise calls into CRM notes and action items",
      "Trigger no-show recovery emails with calendar rescheduling links",
      "Route stalled opportunities into manager inspection queues",
    ],
    humanRole: "Approve the logic and guardrails. Automation should amplify good process, not automate bad process.",
    timesSaved: "More selling time, less admin drag",
  },
]

const WORKFLOW_EXAMPLES = [
  {
    name: "Strategic Account Prep",
    icon: Search,
    steps: [
      { agent: "Human", action: "Choose the account, persona, and commercial question to answer" },
      { agent: "AI", action: "Summarise company changes, hiring signals, and likely pressures" },
      { agent: "AI", action: "Draft three value hypotheses and likely stakeholder concerns" },
      { agent: "Human", action: "Select the strongest angle and add real account judgment" },
      { agent: "AI", action: "Draft outreach and a discovery-question pack from that angle" },
      { agent: "Human", action: "Send the outreach and use the prep in the live call" },
    ],
  },
  {
    name: "Post-Call Follow-Through",
    icon: Mail,
    steps: [
      { agent: "AI", action: "Summarise the call and list unanswered questions" },
      { agent: "AI", action: "Map missing qualification evidence and next-step risks" },
      { agent: "Human", action: "Review the summary and correct anything inaccurate" },
      { agent: "AI", action: "Draft the follow-up email with owners and dates" },
      { agent: "Human", action: "Tighten the message, send it, and confirm the next meeting" },
      { agent: "AI", action: "Push the final summary and actions into the CRM" },
    ],
  },
  {
    name: "Weekly Forecast Inspection",
    icon: BarChart3,
    steps: [
      { agent: "AI", action: "Flag aged deals, weak next steps, and commit-risk indicators" },
      { agent: "AI", action: "Compare stage movement to historic close patterns" },
      { agent: "Human", action: "Review flagged deals and choose which ones need inspection" },
      { agent: "AI", action: "Draft manager questions for each risk deal" },
      { agent: "Human", action: "Run the forecast call and make the final judgment" },
      { agent: "AI", action: "Document decisions and follow-up actions after the meeting" },
    ],
  },
]

const DO_NOT_AUTOMATE = [
  {
    task: "Invent account facts",
    why: "If AI guesses instead of knowing, the rep will look careless. Buyer trust is too fragile for fake precision.",
  },
  {
    task: "Make the final forecast call",
    why: "Forecasting is a leadership judgment built on context, not only pattern detection.",
  },
  {
    task: "Replace live customer relationships",
    why: "Trust still grows through human accountability, especially in complex commercial decisions.",
  },
  {
    task: "Send external messages without review",
    why: "AI drafts fast, but it can still miss context, tone, or factual detail that matters to the deal.",
  },
  {
    task: "Answer security or legal questions it cannot verify",
    why: "Confident but inaccurate answers create major deal risk late in the cycle.",
  },
  {
    task: "Make ethical or commercial judgment alone",
    why: "Humans still own who to pursue, what to promise, and how much risk to accept.",
  },
]

export default function AIWorkflowsPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Foundation Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          AI for Sales
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          AI changes how sellers prepare, inspect, and follow through. The edge is not
          using the most AI. The edge is knowing exactly where AI speeds up the work
          and where human judgment still decides the deal.
        </p>
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-3">
          <h3 className="font-serif font-semibold text-editorial-ink">The principle</h3>
          <p className="text-sm text-editorial-muted leading-relaxed">
            AI is strongest at speed, synthesis, and first drafts. Humans are strongest at
            judgment, trust, and live commercial decision-making. The best sales workflows
            combine both on purpose instead of replacing one with the other blindly.
          </p>
        </CardContent>
      </Card>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Where AI helps in sales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_ROLES.map((role) => (
            <Card
              key={role.role}
              className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200"
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", role.bg)}>
                    <role.icon className={cn("h-5 w-5", role.color)} />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-editorial-ink">{role.role}</h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {role.timesSaved}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-editorial-muted leading-relaxed">{role.description}</p>
                <div className="space-y-1">
                  {role.examples.map((ex) => (
                    <div key={ex} className="flex items-start gap-1.5 text-xs text-editorial-ink/70">
                      <Bot className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" />
                      {ex}
                    </div>
                  ))}
                </div>
                <div className="rounded-[10px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-amber mb-0.5">
                    Human stays responsible for
                  </p>
                  <p className="text-xs text-editorial-ink/80">{role.humanRole}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Example AI + human workflows
        </h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Good sales workflows alternate between machine speed and human judgment.
          The AI gathers, drafts, and summarises. The seller decides, adapts, and
          owns the customer interaction.
        </p>
        {WORKFLOW_EXAMPLES.map((wf) => (
          <Card key={wf.name}>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                  <wf.icon className="h-4 w-4 text-editorial-green" />
                </div>
                <h3 className="font-serif font-semibold text-editorial-ink">{wf.name}</h3>
              </div>
              <div className="space-y-2">
                {wf.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Badge
                      className={cn(
                        "text-[10px] shrink-0 w-14 justify-center",
                        step.agent === "AI"
                          ? "bg-editorial-green-soft text-editorial-green border-transparent"
                          : "bg-editorial-blue-soft text-editorial-blue border-transparent"
                      )}
                    >
                      {step.agent}
                    </Badge>
                    <p className="text-xs text-editorial-ink/80 leading-relaxed">{step.action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          What AI should not do in sales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DO_NOT_AUTOMATE.map((item) => (
            <Card key={item.task}>
              <CardContent className="p-4 space-y-1.5">
                <h4 className="text-sm font-serif font-semibold text-editorial-red flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {item.task}
                </h4>
                <p className="text-xs text-editorial-muted leading-relaxed">{item.why}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            AI multiplies reps who already think clearly.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            The strongest teams use AI to compress prep, sharpen inspection, and reduce admin,
            while keeping judgment, relationships, and commercial accountability human.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
