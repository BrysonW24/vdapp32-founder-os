"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot, FileText, Search, Repeat, BarChart3, Shield, CheckCircle2,
  AlertTriangle, Zap, Eye, Lightbulb, Palette, Mail, Megaphone,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

const AI_ROLES = [
  {
    role: "Drafting",
    icon: FileText,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    description: "AI generates first drafts of copy, emails, social posts, blog outlines, and ad variants. You edit and refine — the AI does the blank-page work.",
    examples: ["Blog post first drafts from a brief", "20 subject line variations for A/B testing", "Social post variations across platforms", "Ad copy alternatives from a positioning statement"],
    humanRole: "Edit for brand voice, accuracy, and strategic intent. AI writes fast; you write right.",
    timesSaved: "60-80% reduction in first-draft time",
  },
  {
    role: "Research",
    icon: Search,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    description: "AI summarises competitive landscapes, analyses industry reports, synthesises customer reviews, and identifies trends from large datasets.",
    examples: ["Summarise 50 competitor reviews to find common complaints", "Identify trending topics in your industry from the last 30 days", "Analyse a brand's messaging across all their channels", "Research market size and growth data for a new segment"],
    humanRole: "Validate findings. AI can summarise but can't judge business relevance or strategic fit.",
    timesSaved: "70-90% reduction in initial research time",
  },
  {
    role: "Repurposing",
    icon: Repeat,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    description: "AI transforms one piece of content into many formats. A blog post becomes social threads, email excerpts, video scripts, and slide decks.",
    examples: ["Blog post → 10 social media posts", "Webinar recording → summary blog + email sequence", "Case study → sales one-pager + social proof snippets", "Long report → executive summary + key findings cards"],
    humanRole: "Ensure each format is genuinely adapted for its platform, not just copy-pasted shorter.",
    timesSaved: "5x more content from the same source material",
  },
  {
    role: "Analysis",
    icon: BarChart3,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    description: "AI spots patterns in campaign data, identifies anomalies, generates insight summaries, and suggests optimisations.",
    examples: ["Analyse email performance and recommend send time changes", "Identify which customer segments are churning and why", "Summarise weekly campaign performance with actionable insights", "Find correlations between content topics and conversion rates"],
    humanRole: "Validate insights against business context. AI finds patterns; you decide what they mean.",
    timesSaved: "4-8 hours per week on reporting and analysis",
  },
  {
    role: "Quality Assurance",
    icon: Shield,
    color: "text-editorial-red",
    bg: "bg-editorial-red-soft",
    description: "AI reviews content for errors, brand consistency, accessibility, SEO optimisation, and compliance before publishing.",
    examples: ["Check email for broken links, spelling, and brand voice consistency", "Review landing page copy against SEO best practices", "Verify ad copy meets platform character limits and policies", "Scan content for potential legal or compliance issues"],
    humanRole: "Final sign-off. AI catches mechanical errors; you judge strategic and ethical questions.",
    timesSaved: "50% reduction in QA time with higher catch rate",
  },
  {
    role: "Automation Design",
    icon: Zap,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    description: "AI helps design, build, and optimise automation workflows — suggesting triggers, conditions, and actions based on your goals.",
    examples: ["Design an abandoned cart flow based on your product type", "Suggest lead scoring criteria from your conversion data", "Build a re-engagement sequence for inactive subscribers", "Recommend workflow improvements from performance data"],
    humanRole: "Review logic, set business rules, approve send conditions. AI suggests; you decide.",
    timesSaved: "3-5x faster workflow creation",
  },
]

const WORKFLOW_EXAMPLES = [
  {
    name: "Content Production Pipeline",
    icon: FileText,
    steps: [
      { agent: "Human", action: "Write content brief with goals, audience, and key messages" },
      { agent: "AI", action: "Generate first draft from brief (Claude/ChatGPT)" },
      { agent: "Human", action: "Edit for voice, accuracy, and strategy" },
      { agent: "AI", action: "Optimise for SEO (check keywords, meta, headings)" },
      { agent: "AI", action: "Repurpose into 5 social posts + email excerpt" },
      { agent: "Human", action: "Review all versions, approve for publishing" },
      { agent: "AI", action: "Schedule across platforms (Buffer/Hootsuite)" },
    ],
  },
  {
    name: "Campaign Analysis Workflow",
    icon: BarChart3,
    steps: [
      { agent: "AI", action: "Pull data from GA4, Meta Ads, and Klaviyo" },
      { agent: "AI", action: "Calculate KPIs: CTR, CPA, ROAS, conversion rate" },
      { agent: "AI", action: "Generate anomaly alerts and trend summaries" },
      { agent: "Human", action: "Review insights, add business context" },
      { agent: "Human", action: "Decide: scale, pause, or adjust campaigns" },
      { agent: "AI", action: "Format into weekly report for leadership" },
      { agent: "Human", action: "Add strategic narrative, send to stakeholders" },
    ],
  },
  {
    name: "Customer Research Sprint",
    icon: Search,
    steps: [
      { agent: "Human", action: "Define research questions and customer segment" },
      { agent: "AI", action: "Analyse 200 customer reviews for themes and sentiment" },
      { agent: "AI", action: "Summarise competitor positioning across 10 brands" },
      { agent: "AI", action: "Generate draft personas from data patterns" },
      { agent: "Human", action: "Validate with real customer interviews (3-5 calls)" },
      { agent: "Human", action: "Refine personas and strategic implications" },
      { agent: "AI", action: "Create visual persona cards and presentation" },
    ],
  },
]

export default function AIWorkflowsPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Foundation Layer</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          AI Workflow Design
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          AI doesn&apos;t replace marketers — it changes what they spend time on.
          The skill is knowing where AI should help and where human judgment
          is non-negotiable. This page maps the territory.
        </p>
      </div>

      {/* The AI role framework */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-3">
          <h3 className="font-serif font-semibold text-editorial-ink">The principle</h3>
          <p className="text-sm text-editorial-muted leading-relaxed">
            AI is best at: speed, scale, pattern recognition, and first drafts.
            Humans are best at: strategy, judgment, brand voice, relationships, and
            ethical decisions. The ideal workflow uses AI for the 80% that&apos;s mechanical
            and reserves human attention for the 20% that requires thinking.
          </p>
        </CardContent>
      </Card>

      {/* 6 AI roles */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Where AI helps in marketing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_ROLES.map((role) => (
            <Card key={role.role} className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", role.bg)}>
                    <role.icon className={cn("h-5 w-5", role.color)} />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-editorial-ink">{role.role}</h3>
                    <Badge variant="secondary" className="text-[10px]">{role.timesSaved}</Badge>
                  </div>
                </div>
                <p className="text-xs text-editorial-muted leading-relaxed">{role.description}</p>
                <div className="space-y-1">
                  {role.examples.map((ex) => (
                    <div key={ex} className="flex items-start gap-1.5 text-xs text-editorial-ink/70">
                      <Bot className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" /> {ex}
                    </div>
                  ))}
                </div>
                <div className="rounded-[10px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-amber mb-0.5">Human stays responsible for</p>
                  <p className="text-xs text-editorial-ink/80">{role.humanRole}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Workflow examples */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Example AI+Human workflows</h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          These show how AI and human work alternate in real marketing processes.
          Notice the pattern: AI does volume work, human does judgment work.
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
                        step.agent === "AI" ? "bg-editorial-green-soft text-editorial-green border-transparent" : "bg-editorial-blue-soft text-editorial-blue border-transparent"
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

      {/* What AI should NOT do */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">What AI should NOT do in marketing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { task: "Set strategy", why: "AI can inform strategy with data, but strategic direction requires business judgment, market intuition, and stakeholder alignment." },
            { task: "Make final brand voice decisions", why: "Brand voice is a feeling, not a formula. AI can mimic tone but can't decide what your brand should sound like." },
            { task: "Handle crisis communication", why: "Crises require empathy, speed, and judgment under pressure. A wrong AI-generated response can escalate a crisis instantly." },
            { task: "Replace customer relationships", why: "Trust is built human-to-human. AI can support relationships (timely emails, recommendations) but can't replace genuine connection." },
            { task: "Make ethical judgment calls", why: "Should you target this vulnerable audience? Is this claim misleading? AI doesn't have moral reasoning. Humans must decide." },
            { task: "Publish without human review", why: "AI hallucinates, makes factual errors, and can be off-brand. Every AI output should be reviewed before it reaches customers." },
          ].map((item) => (
            <Card key={item.task}>
              <CardContent className="p-4 space-y-1.5">
                <h4 className="text-sm font-serif font-semibold text-editorial-red flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" /> {item.task}
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
            AI multiplies your capability. It doesn&apos;t replace your judgment.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            The best AI-enabled marketers aren&apos;t the ones using the most AI tools.
            They&apos;re the ones who know exactly where AI adds value and where it
            doesn&apos;t — and build workflows around that clarity.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
