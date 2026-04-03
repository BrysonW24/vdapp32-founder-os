"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Workflow, Database, Users, Zap, BarChart3, Shield, Mail,
  ArrowRight, CheckCircle2, AlertTriangle, Layers, Target,
  Settings, RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

const MARTECH_LAYERS = [
  { layer: "CRM & Data", icon: Database, tools: ["HubSpot", "Salesforce", "Segment"], purpose: "Single source of truth for customer data. Every other tool feeds from or into this." },
  { layer: "Communication", icon: Mail, tools: ["Klaviyo", "Mailchimp", "Intercom"], purpose: "Outbound messaging — email, SMS, push, in-app. Connected to CRM for personalisation." },
  { layer: "Automation", icon: Zap, tools: ["Zapier", "Make", "HubSpot Workflows"], purpose: "Workflow engine connecting tools, triggering actions, syncing data across the stack." },
  { layer: "Analytics", icon: BarChart3, tools: ["GA4", "Mixpanel", "Looker Studio"], purpose: "Measurement and insight. Tracks what happened, why, and what to do about it." },
  { layer: "Acquisition", icon: Target, tools: ["Google Ads", "Meta Ads", "SEMrush"], purpose: "Paid and organic channels that bring people in. Connected to analytics for attribution." },
  { layer: "Content & Creative", icon: Layers, tools: ["Canva", "Figma", "Webflow", "WordPress"], purpose: "Where marketing assets are created and published. Connected to CRM for personalisation." },
]

const OPS_PILLARS = [
  {
    pillar: "Data Hygiene",
    icon: Database,
    description: "Clean, consistent, deduplicated data. If your CRM has 3 records for the same person or 40% of emails are invalid, nothing downstream works properly.",
    practices: [
      "Monthly data quality audit — check for duplicates, invalid emails, missing fields",
      "Standardised naming conventions for campaigns, lists, tags, and properties",
      "Automated data enrichment on new contact creation",
      "Regular purge of unengaged contacts (they hurt deliverability)",
      "Single field definitions — 'Lead Source' means the same thing everywhere",
    ],
  },
  {
    pillar: "Lead Management",
    icon: Users,
    description: "The system that moves people from anonymous visitor to qualified lead to customer. Includes scoring, routing, lifecycle stages, and handoff to sales.",
    practices: [
      "Lead scoring model based on fit (demographics) + intent (behaviour)",
      "Clear lifecycle stages: Subscriber → Lead → MQL → SQL → Customer",
      "Automated routing: MQLs assigned to the right sales rep within minutes",
      "SLA between marketing and sales: response time, follow-up cadence",
      "Feedback loop: sales tells marketing which leads convert (and which don't)",
    ],
  },
  {
    pillar: "Campaign Operations",
    icon: Settings,
    description: "The systems and processes that make campaigns repeatable. Templates, approval workflows, QA checklists, launch processes, and post-campaign analysis.",
    practices: [
      "Campaign request form — standardised brief with goals, audience, timeline, budget",
      "Template library for emails, landing pages, and ad formats",
      "QA checklist before every send: links, personalisation, mobile, tracking",
      "Post-campaign analysis template: what worked, what didn't, what next",
      "Campaign naming convention that makes reporting possible",
    ],
  },
  {
    pillar: "Integration Architecture",
    icon: Workflow,
    description: "How your tools talk to each other. The pipes that move data between CRM, email, ads, analytics, and billing. When integrations break, everything breaks.",
    practices: [
      "Document every integration: what data flows, which direction, how often",
      "Error monitoring on critical integrations (CRM ↔ email, ads ↔ analytics)",
      "Sync frequency matched to business need (real-time for lead routing, daily for reporting)",
      "Single customer ID across all platforms where possible",
      "Integration health dashboard reviewed weekly",
    ],
  },
  {
    pillar: "Reporting & Governance",
    icon: BarChart3,
    description: "The cadence and structure of how marketing reports on its work. Who gets what data, when, and in what format. Governance ensures consistency.",
    practices: [
      "Weekly: channel performance dashboard (automated)",
      "Monthly: full marketing report with insights and recommendations",
      "Quarterly: strategic review with budget reallocation proposals",
      "Canonical metric definitions documented and shared across the team",
      "Access controls: who can edit vs view dashboards and campaigns",
    ],
  },
]

const CRM_THINKING = [
  { concept: "Contact lifecycle", description: "Every person in your CRM is at a stage: subscriber, lead, MQL, SQL, customer, churned. Your marketing changes based on where they are." },
  { concept: "Properties over lists", description: "Don't manage contacts via 50 manual lists. Use properties (fields) and smart segments. 'Last purchase date > 90 days' is better than a static 'inactive' list." },
  { concept: "Activity timeline", description: "The CRM should show every touchpoint: emails opened, pages visited, forms filled, deals created. This context is what makes personalisation possible." },
  { concept: "Automation triggers", description: "CRM events trigger marketing actions. 'Deal closed' → send onboarding email. 'No login in 30 days' → send re-engagement. The CRM is the brain; automation is the nervous system." },
  { concept: "Revenue attribution", description: "Close the loop. When a deal closes, trace it back to the marketing touchpoints that created and nurtured it. This is how you prove marketing ROI." },
]

export default function MarketingOpsPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Foundation Layer</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Marketing Ops & CRM Thinking
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Modern marketing is systems-driven. Marketing ops builds the infrastructure
          that lets a team of 5 perform like a team of 50. CRM thinking is the
          discipline of treating every customer interaction as data that compounds.
        </p>
      </div>

      {/* Martech stack layers */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">The marketing technology stack</h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Every marketing team runs on a stack of connected tools. Understanding
          how these layers work together is the foundation of marketing ops.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MARTECH_LAYERS.map((layer) => (
            <Card key={layer.layer} className="hover:-translate-y-[1px] hover:shadow-editorial-hover transition-all duration-200">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                    <layer.icon className="h-4 w-4 text-editorial-green" />
                  </div>
                  <h3 className="font-serif font-semibold text-editorial-ink text-sm">{layer.layer}</h3>
                </div>
                <p className="text-xs text-editorial-muted leading-relaxed">{layer.purpose}</p>
                <div className="flex flex-wrap gap-1">
                  {layer.tools.map((t) => (
                    <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* 5 pillars */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">The 5 pillars of marketing ops</h2>
        {OPS_PILLARS.map((pillar) => (
          <Card key={pillar.pillar}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-blue-soft">
                  <pillar.icon className="h-4 w-4 text-editorial-blue" />
                </div>
                <h3 className="font-serif font-semibold text-editorial-ink">{pillar.pillar}</h3>
              </div>
              <p className="text-sm text-editorial-muted leading-relaxed">{pillar.description}</p>
              <div className="space-y-1.5">
                {pillar.practices.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-xs text-editorial-ink/80">
                    <CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" /> {p}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.section>

      {/* CRM thinking */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">CRM thinking</h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          A CRM isn&apos;t just a database of contacts. It&apos;s the system that lets
          you understand, segment, and communicate with every customer based on
          their actual behaviour and relationship with you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CRM_THINKING.map((item) => (
            <Card key={item.concept}>
              <CardContent className="p-4 space-y-1.5">
                <h4 className="font-serif font-semibold text-editorial-ink text-sm">{item.concept}</h4>
                <p className="text-xs text-editorial-muted leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Marketing ops is the difference between doing marketing and running a marketing machine.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            Without ops, every campaign is a one-off effort. With ops, every campaign
            builds on the last — because the data is clean, the tools are connected,
            and the processes are repeatable.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
