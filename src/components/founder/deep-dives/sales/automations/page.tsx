"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Zap,
  ArrowRight,
  Mail,
  ShoppingCart,
  UserPlus,
  BarChart3,
  MessageSquare,
  Clock,
  DollarSign,
  TrendingUp,
  Repeat,
  Target,
  Eye,
  AlertTriangle,
  Building2,
  Users,
  Store,
  Laptop,
  CheckCircle2,
  XCircle,
  Workflow,
  Bot,
  Database,
  Globe,
  Megaphone,
  HeartHandshake,
  Shield,
  Lightbulb,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* --- Data ----------------------------------------------------------------- */

const WHAT_IT_IS = [
  {
    title: "Trigger",
    description: "Something happens — a lead visits pricing, a deal moves to a new stage, a prospect opens an email, or a renewal date approaches.",
    icon: Zap,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
  },
  {
    title: "Condition",
    description: "The system checks rules — is this a qualified lead? Have they been inactive for 14 days? Is the deal above $50K? Are they in the target segment?",
    icon: Target,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
  },
  {
    title: "Action",
    description: "The system does something — sends a follow-up email, creates a task for the AE, routes the lead, updates the deal stage, or alerts the manager.",
    icon: ArrowRight,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
  },
]

const WHY_BUILT = [
  { icon: Clock, label: "Save selling time", detail: "Automated follow-ups, lead routing, and CRM updates run 24/7. A 5-step follow-up sequence that takes 2 hours to build runs for years, freeing AEs to sell." },
  { icon: DollarSign, label: "Increase pipeline", detail: "Automated lead scoring routes hot prospects to AEs within minutes instead of hours. Speed-to-lead directly correlates with qualification rates." },
  { icon: Repeat, label: "Stay consistent", detail: "Every prospect gets the same quality experience — timely follow-ups, relevant content, professional proposals. No balls dropped between meetings." },
  { icon: TrendingUp, label: "Scale without headcount", detail: "A team of 5 AEs with great automation can outperform a team of 15 without it. Automation handles the admin; reps handle the conversations." },
  { icon: Eye, label: "Never miss a signal", detail: "Automations catch things humans miss — a prospect who visits pricing 3 times, a champion who changes companies, a deal that's been stuck for 30 days." },
  { icon: HeartHandshake, label: "Build relationships at scale", detail: "Timely, relevant communication builds trust. A congratulations note on a funding round or a check-in at the right moment shows prospects you're paying attention." },
]

const WHERE_IMPLEMENTED = [
  {
    area: "CRM & Pipeline",
    icon: UserPlus,
    examples: ["Lead scoring and routing", "Deal stage progression alerts", "Task creation for follow-ups", "Automatic contact enrichment", "Pipeline stagnation notifications", "Renewal and upsell reminders"],
    tools: ["Salesforce", "HubSpot", "Pipedrive"],
    businessImpact: "Automated lead routing reduces response time from hours to minutes. Speed-to-lead directly correlates with conversion rates — 5-minute response is 10x more effective than 30-minute.",
  },
  {
    area: "Outreach & Sequences",
    icon: Mail,
    examples: ["Multi-touch email sequences", "Call task scheduling", "LinkedIn connection requests", "Follow-up after no-show", "Post-meeting recap sends", "Re-engagement sequences for stalled opportunities"],
    tools: ["Salesloft", "Outreach", "Apollo", "HubSpot Sequences"],
    businessImpact: "Automated sequences ensure consistent follow-up. Reps who use sequences book 2-3x more meetings than those who follow up manually.",
  },
  {
    area: "Proposal & Contracts",
    icon: Globe,
    examples: ["Proposal generation from deal data", "E-signature routing", "Contract approval workflows", "Pricing calculator auto-population", "Order form creation", "Renewal contract generation"],
    tools: ["PandaDoc", "DocuSign", "Proposify", "DealHub"],
    businessImpact: "Automated proposal generation reduces deal cycle time by 2-5 days. E-signature routing cuts contract turnaround from weeks to hours.",
  },
  {
    area: "Analytics & Reporting",
    icon: BarChart3,
    examples: ["Pipeline dashboard distribution", "Activity report generation", "Forecast roll-up automation", "Win/loss analysis triggers", "Quota attainment alerts", "Deal velocity tracking"],
    tools: ["Clari", "Looker Studio", "Salesforce Reports", "Gong"],
    businessImpact: "Automated reporting saves managers 4-8 hours per week and ensures leadership always has current pipeline data.",
  },
  {
    area: "Customer Success",
    icon: HeartHandshake,
    examples: ["Onboarding sequence triggers", "Health score monitoring", "Churn risk alerts", "QBR scheduling", "Expansion signal detection", "NPS survey automation"],
    tools: ["Gainsight", "Salesforce", "Vitally", "ChurnZero"],
    businessImpact: "Automated health scoring identifies at-risk accounts 30-60 days earlier. Proactive outreach reduces churn by 15-25%.",
  },
  {
    area: "Workflow & Operations",
    icon: Workflow,
    examples: ["Cross-tool data sync", "Territory assignment automation", "Commission calculation", "Deal desk approval routing", "Competitive intelligence alerts", "New hire onboarding tasks"],
    tools: ["Zapier", "Make", "Workato", "LeanData"],
    businessImpact: "Connecting your tools eliminates manual data entry. A single Zapier workflow can save a sales ops team 10+ hours per month.",
  },
]

const REAL_EXAMPLES = [
  {
    company: "Salesforce",
    type: "Lead Scoring & Routing",
    description: "Salesforce assigns scores to leads based on behaviour (visited pricing = +25, downloaded ROI guide = +15, attended webinar = +10) and fit (company size, industry, tech stack). When a lead crosses the threshold, they're routed to the right AE within 5 minutes with full context.",
    result: "Reps focus on the top 20% of leads and close at 3x the rate of unscored leads.",
    lesson: "Automation bridges the gap between marketing and sales — it ensures the right rep gets the right lead at the right time.",
  },
  {
    company: "Gong",
    type: "Conversation Intelligence",
    description: "After every sales call, Gong automatically transcribes the conversation, identifies key topics discussed, flags risk signals (competitor mentions, budget concerns), and sends a summary to the AE and their manager. Follow-up tasks are auto-created based on next steps mentioned in the call.",
    result: "Teams using conversation intelligence close 25% more deals because they have better visibility into what happens on calls.",
    lesson: "The best automations turn unstructured data (conversations) into structured insights that drive action.",
  },
  {
    company: "Outreach",
    type: "Multi-Touch Sequences",
    description: "SDR teams run automated 12-touch sequences: Day 1 (email + LinkedIn), Day 3 (call), Day 5 (email), Day 8 (call + voicemail), continuing over 21 days. Each touch is personalised with merge fields. The system auto-advances prospects through the sequence and alerts reps when a prospect engages.",
    result: "Teams using automated sequences see 3x meeting rates vs manual follow-up. The consistency matters more than any individual message.",
    lesson: "Persistence wins in outbound — but only automation makes persistence at scale humanly possible.",
  },
  {
    company: "HubSpot",
    type: "Deal Stage Automation",
    description: "When a deal moves to 'Proposal Sent', the system automatically: (1) creates a follow-up task for 3 days later, (2) sends the prospect a case study relevant to their industry, (3) alerts the manager if the deal is above $50K, (4) starts a parallel approval workflow if custom pricing is needed.",
    result: "Deal velocity improved 18% because nothing falls through the cracks between stages.",
    lesson: "Stage-based automation ensures that your best practices happen every time, not just when reps remember.",
  },
  {
    company: "Mid-Market SaaS (Example)",
    type: "Full Revenue Stack",
    description: "A 15-person sales team running: (1) Automatic lead scoring and routing, (2) 4 outbound sequences for different personas, (3) Deal stage automation with follow-up tasks, (4) Proposal auto-generation from CRM data, (5) Churn risk alerts from usage data. Total setup: 2 weeks. Maintains itself with weekly tuning.",
    result: "Equivalent pipeline output of a 25-person team. AEs spend 75% of their time selling instead of 50%.",
    lesson: "You don't need to be an enterprise. A RevOps person with the right tools can build this in weeks.",
  },
]

const HOW_TO_BUILD = [
  {
    step: 1,
    title: "Map the sales process",
    description: "Before you touch any tool, draw the journey a deal takes — from first touch to closed won. Mark every moment where something should happen automatically: a follow-up, an alert, a data update, a notification.",
    tip: "Use sticky notes or a whiteboard. Think in terms of: What just happened? What should happen next? What could go wrong if nobody acts?",
  },
  {
    step: 2,
    title: "Identify the highest-value trigger points",
    description: "Not every moment needs an automation. Start with the moments that have the biggest pipeline or revenue impact: lead response time, follow-up after demos, stalled deal alerts, renewal reminders.",
    tip: "If you could only build 3 automations, which would move the needle most? Start there.",
  },
  {
    step: 3,
    title: "Choose your trigger, condition, action",
    description: "For each automation, define: What event triggers it? What conditions must be true? What action should the system take? Write this in plain English first.",
    tip: "Example: When [deal moves to Proposal stage] AND [deal value > $25K] AND [no activity in 5 days] THEN [create follow-up task for AE] AND [alert sales manager].",
  },
  {
    step: 4,
    title: "Write the content",
    description: "Draft the actual emails, notifications, or task descriptions. Keep it professional but human — prospects can tell when they're getting a robot email. Personalise with merge tags ({first_name}, {company}, {pain_point}).",
    tip: "Write like you're emailing a respected colleague, not filling out a form. The best automated messages don't feel automated.",
  },
  {
    step: 5,
    title: "Build in your tool",
    description: "Use your CRM's workflow builder or your outreach platform's sequence builder to create the automation. Connect the trigger, set conditions, add time delays, and link your content.",
    tip: "Start with the simplest version. You can add branches and conditions later once you see how it performs.",
  },
  {
    step: 6,
    title: "Test before you launch",
    description: "Send test versions to yourself. Walk through the flow as a prospect. Check: Does the trigger fire? Do the conditions work? Is the content right? Do the links work? Is the timing reasonable?",
    tip: "Create a test contact and trigger each automation manually. Check every email, every task, every notification.",
  },
  {
    step: 7,
    title: "Monitor and iterate",
    description: "After launch, watch the metrics: reply rates, task completion rates, pipeline velocity. Look for drop-off points. A/B test messaging. Refine timing and conditions.",
    tip: "The first version is never perfect. Plan to review every automation monthly for the first quarter, then quarterly after that.",
  },
]

const MATURITY_LEVELS = [
  {
    level: 1,
    name: "Manual",
    description: "Everything is done by hand. Follow-ups tracked in spreadsheets. Leads assigned by manager. No sequences, no scoring, no automated alerts.",
    typical: "Early-stage startup with 1-2 reps and no RevOps.",
    nextStep: "Set up lead routing and a basic follow-up sequence in your CRM or outreach tool.",
  },
  {
    level: 2,
    name: "Basic Automation",
    description: "A few key automations running: outbound sequences, basic lead routing, deal stage tasks. Still lots of manual CRM updates and reporting.",
    typical: "Growing startup with 5-10 reps and a part-time ops person.",
    nextStep: "Add lead scoring, deal stage automation, and automated pipeline reporting.",
  },
  {
    level: 3,
    name: "Integrated",
    description: "Multiple automations across the revenue stack, connected through CRM. Lead scoring, multi-channel sequences, deal alerts, automated reporting. RevOps manages the system.",
    typical: "Scale-up with 15-30 reps and a dedicated RevOps team.",
    nextStep: "Add conversation intelligence, advanced forecasting, and cross-team automation with CS.",
  },
  {
    level: 4,
    name: "Orchestrated",
    description: "Full-lifecycle automation with AI-powered insights. Predictive lead scoring, dynamic sequences, automated deal coaching, real-time forecasting. Sales operates as a revenue machine.",
    typical: "Mature sales org at a mid-to-large SaaS company.",
    nextStep: "Continuously optimise. Focus on AI-driven deal insights, automated enablement triggers, and revenue intelligence.",
  },
]

type TabId = "what" | "why" | "where" | "how" | "operations" | "examples" | "maturity"

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "what", label: "What It Is", icon: Lightbulb },
  { id: "why", label: "Why It Matters", icon: TrendingUp },
  { id: "where", label: "Where It Lives", icon: Globe },
  { id: "how", label: "How to Build", icon: Workflow },
  { id: "examples", label: "Real Examples", icon: Eye },
  { id: "maturity", label: "Maturity Model", icon: Layers },
]

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35 },
}

/* --- Page ----------------------------------------------------------------- */

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("what")

  return (
    <div className="container py-6 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Deep Dive
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Sales Automation
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Sales automation is how modern revenue teams deliver the right follow-up
          to the right prospect at the right time — CRM workflows, lead routing,
          follow-up sequences, pipeline alerts, proposal generation, and activity
          logging. It frees reps to sell instead of doing admin.
        </p>
      </div>

      {/* Tab bar */}
      <div className="sticky top-[80px] z-40 flex flex-wrap gap-2 p-2.5 rounded-[18px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.78)] backdrop-blur-[16px] shadow-editorial-soft">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm transition-all duration-200 border",
                activeTab === tab.id
                  ? "text-editorial-ink bg-white/96 border-[rgba(44,49,59,0.15)] shadow-sm"
                  : "text-editorial-muted bg-white/40 border-[rgba(44,49,59,0.06)] hover:bg-white/60 hover:text-editorial-ink"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "what" && (
          <motion.div key="what" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">What is sales automation?</h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Sales automation uses software to perform sales tasks automatically,
                based on triggers and rules you define. Instead of manually logging
                every activity, following up on every deal, and routing every lead,
                you build systems that do it for you. Every automation follows three steps:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {WHAT_IT_IS.map((item, i) => (
                <Card key={item.title} className="relative overflow-hidden">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", item.bg)}>
                        <item.icon className={cn("h-5 w-5", item.color)} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-editorial-muted">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="font-serif font-semibold text-editorial-ink">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{item.description}</p>
                    {i < 2 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="h-5 w-5 text-editorial-muted/30" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-panel-strong">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-editorial-ink mb-4">Example: Stalled Deal Recovery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  {[
                    { time: "Day 0", event: "Deal enters 'Proposal Sent' stage", type: "Trigger" },
                    { time: "Day 3", event: "System creates follow-up task for AE: 'Check in on proposal'", type: "Action" },
                    { time: "Day 7", event: "If no activity: auto-send relevant case study to prospect", type: "Action" },
                    { time: "Day 14", event: "If still no activity: alert sales manager, flag as at-risk deal", type: "Action" },
                  ].map((step, i) => (
                    <div key={i} className="space-y-1.5">
                      <Badge variant="secondary" className="text-[10px] font-mono">{step.time}</Badge>
                      <p className="text-editorial-ink/80">{step.event}</p>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted">{step.type}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-editorial-green mt-4 font-medium">
                  Result: Reduces average deal cycle time by 15-20% and prevents deals from silently dying in the pipeline.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-serif font-semibold text-editorial-green flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> What automation IS
                  </h3>
                  <ul className="space-y-2 text-sm text-editorial-ink/80">
                    <li>A system that runs the right follow-up at the right time</li>
                    <li>A way to scale personalised outreach</li>
                    <li>A tool that frees reps for conversations and strategy</li>
                    <li>A method to ensure consistency across the sales process</li>
                    <li>A competitive advantage for lean teams competing with large ones</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-serif font-semibold text-editorial-red flex items-center gap-2">
                    <XCircle className="h-4 w-4" /> What automation is NOT
                  </h3>
                  <ul className="space-y-2 text-sm text-editorial-ink/80">
                    <li>A replacement for genuine prospect research</li>
                    <li>An excuse to spam prospects with more messages</li>
                    <li>A set-it-and-forget-it system (it needs tuning)</li>
                    <li>A substitute for good sales strategy and discovery</li>
                    <li>Something only enterprise teams can afford</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "why" && (
          <motion.div key="why" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">Why sales teams build automations</h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Automation isn&apos;t about removing the human — it&apos;s about removing repetitive
                admin so reps can spend time on what actually requires skill: conversations,
                discovery, negotiation, and relationship-building.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_BUILT.map((item) => (
                <Card key={item.label} className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                        <item.icon className="h-4 w-4 text-editorial-green" />
                      </div>
                      <h3 className="font-serif font-semibold text-editorial-ink">{item.label}</h3>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="glass-panel-strong">
              <CardContent className="p-6 text-center space-y-3">
                <p className="text-4xl font-serif font-bold text-editorial-green">75%</p>
                <p className="text-sm text-editorial-muted max-w-md mx-auto">
                  Top-performing sales reps spend 75% of their time selling. Average
                  reps spend only 35% selling — the rest is CRM updates, email, and admin.
                  Automation closes that gap.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "where" && (
          <motion.div key="where" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">Where sales automations live</h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Automation touches every part of the revenue stack. Here&apos;s where it
                lives, what it does, and which tools power it.
              </p>
            </div>
            <div className="space-y-4">
              {WHERE_IMPLEMENTED.map((area) => (
                <Card key={area.area}>
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                      <div className="flex items-center gap-3 lg:w-48 shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft">
                          <area.icon className="h-5 w-5 text-editorial-green" />
                        </div>
                        <h3 className="font-serif font-semibold text-editorial-ink">{area.area}</h3>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {area.examples.map((ex) => (
                            <Badge key={ex} variant="secondary" className="text-[10px]">{ex}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-editorial-green font-medium">{area.businessImpact}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">Tools:</span>
                          {area.tools.map((tool) => (
                            <Badge key={tool} variant="outline" className="text-[10px]">{tool}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "how" && (
          <motion.div key="how" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">How to build a sales automation</h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Follow these 7 steps. Modern CRM and outreach tools use visual builders.
                The hard part is the thinking, not the clicking.
              </p>
            </div>
            <div className="space-y-4">
              {HOW_TO_BUILD.map((step) => (
                <Card key={step.step}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-editorial-green text-white text-sm font-bold font-serif">
                        {step.step}
                      </span>
                      <div className="space-y-2">
                        <h3 className="font-serif font-semibold text-editorial-ink">{step.title}</h3>
                        <p className="text-sm text-editorial-muted leading-relaxed">{step.description}</p>
                        <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                          <p className="text-xs text-editorial-amber"><strong>Tip:</strong> {step.tip}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "examples" && (
          <motion.div key="examples" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">Real-world sales automation examples</h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                These are automations running at real companies right now. Study
                the pattern, not just the tool — the principles work at any scale.
              </p>
            </div>
            <div className="space-y-4">
              {REAL_EXAMPLES.map((ex) => (
                <Card key={ex.company}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif font-semibold text-editorial-ink text-lg">{ex.company}</h3>
                        <Badge variant="secondary" className="text-[10px] mt-1">{ex.type}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-editorial-ink/80 leading-relaxed">{ex.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-1">Result</p>
                        <p className="text-xs text-editorial-ink/80">{ex.result}</p>
                      </div>
                      <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-amber mb-1">Lesson</p>
                        <p className="text-xs text-editorial-ink/80">{ex.lesson}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "maturity" && (
          <motion.div key="maturity" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">Automation maturity model</h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Every sales team is somewhere on this ladder. Understanding where you
                are helps you know what to build next — without overbuilding.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-[23px] top-4 bottom-4 w-px bg-[rgba(44,49,59,0.1)]" />
              <div className="space-y-4">
                {MATURITY_LEVELS.map((level) => (
                  <div key={level.level} className="relative pl-12">
                    <div className="absolute left-3 top-5 h-5 w-5 rounded-full bg-editorial-green flex items-center justify-center z-10">
                      <span className="text-white text-[10px] font-bold">{level.level}</span>
                    </div>
                    <Card>
                      <CardContent className="p-5 space-y-2">
                        <h3 className="font-serif font-semibold text-editorial-ink">Level {level.level}: {level.name}</h3>
                        <p className="text-sm text-editorial-muted leading-relaxed">{level.description}</p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-1">
                          <div className="rounded-[10px] bg-editorial-blue-soft/60 border border-editorial-blue/10 px-3 py-1.5">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-blue mb-0.5">Typical</p>
                            <p className="text-xs text-editorial-ink/80">{level.typical}</p>
                          </div>
                          <div className="rounded-[10px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-1.5">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-0.5">Next step</p>
                            <p className="text-xs text-editorial-ink/80">{level.nextStep}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom principle */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Automation multiplies your sales process. It doesn&apos;t replace it.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            Bad process automated just means you fail faster. Good process automated
            means you win at scale. Always start with the thinking.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
