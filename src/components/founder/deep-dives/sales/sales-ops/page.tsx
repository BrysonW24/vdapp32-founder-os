"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Workflow,
  Database,
  Users,
  Zap,
  BarChart3,
  Shield,
  Mail,
  CheckCircle2,
  Layers,
  Target,
  Settings,
} from "lucide-react"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

const SALES_TECH_LAYERS = [
  { layer: "CRM & Account Data", icon: Database, tools: ["Salesforce", "HubSpot", "Pipedrive"], purpose: "System of record for accounts, contacts, opportunities, and next steps. If this layer is weak, your forecast and handoffs will be fiction." },
  { layer: "Prospecting & Signals", icon: Target, tools: ["ZoomInfo", "Apollo", "LinkedIn Sales Navigator"], purpose: "Intent, contact data, trigger research, and account context that help reps work the right opportunities instead of chasing noise." },
  { layer: "Engagement & Workflow", icon: Mail, tools: ["Outreach", "Salesloft", "Apollo Sequences"], purpose: "Structured outbound, task orchestration, and cadence management that keep follow-up quality high without relying on memory." },
  { layer: "Revenue Intelligence", icon: BarChart3, tools: ["Gong", "Clari", "People.ai"], purpose: "Call insight, forecast risk, activity capture, and pipeline inspection. This is where raw selling activity becomes management signal." },
  { layer: "Enablement & Assets", icon: Layers, tools: ["Highspot", "Seismic", "Notion"], purpose: "Battlecards, decks, discovery notes, competitive messaging, and training assets that make sales execution repeatable across the team." },
  { layer: "Deal Desk & Handoff", icon: Workflow, tools: ["PandaDoc", "DocuSign", "DealHub"], purpose: "Proposals, approvals, contracts, legal checkpoints, and handoff into onboarding or customer success. This layer protects momentum near the close." },
]

const OPS_PILLARS = [
  {
    pillar: "Data Hygiene",
    icon: Database,
    description: "A clean CRM is not admin theatre. It is the foundation of forecasting, segmentation, routing, and managerial trust.",
    practices: [
      "Define stage exit criteria so every opportunity means the same thing across the team",
      "Standardise owner, account, contact, and pipeline fields before dashboards are built",
      "Run duplicate, stale-opportunity, and missing-next-step reviews every week",
      "Keep close dates honest instead of letting reps hide uncertainty in the future",
      "Document metric definitions so pipeline, commit, best case, and closed-won are not interpreted differently by each manager",
    ],
  },
  {
    pillar: "Lead & Opportunity Management",
    icon: Users,
    description: "Routing, qualification, and stage progression need operational clarity or pipeline turns into a queue of half-owned deals.",
    practices: [
      "Define what qualifies a lead, what creates an opportunity, and who owns each handoff",
      "Set SLAs for inbound response time and next-step completion after first meetings",
      "Use stage-specific required fields so qualification depth improves as the deal matures",
      "Track deal aging by stage so managers can intervene before momentum disappears",
      "Build clear ownership rules for partner-sourced, SDR-sourced, and AE-sourced pipeline",
    ],
  },
  {
    pillar: "Enablement Systems",
    icon: Settings,
    description: "Enablement is the operating system behind rep consistency: messaging, discovery frameworks, coaching loops, and asset access.",
    practices: [
      "Maintain a version-controlled message map for ICP, persona, pain, and proof points",
      "Tie onboarding to observable skills like discovery depth, demo tailoring, and forecast accuracy",
      "Review call recordings weekly and turn insights into enablement updates",
      "Publish a live asset library so reps always know which deck, case study, or mutual action plan is current",
      "Turn repeated objections into reusable plays rather than coaching each miss from scratch",
    ],
  },
  {
    pillar: "Automation Architecture",
    icon: Zap,
    description: "Automation should protect selling time and deal progression, not create more noise for the team.",
    practices: [
      "Automate repetitive admin work first: task creation, reminders, data sync, and recap distribution",
      "Trigger manager alerts only on meaningful risk signals such as stalled stages or multi-threading gaps",
      "Keep workflow logic simple enough that sales managers can understand and debug it",
      "Document every critical workflow so ops can trace what fires, when, and why",
      "Review workflow effectiveness quarterly instead of letting legacy automations accumulate forever",
    ],
  },
  {
    pillar: "Governance & Forecasting",
    icon: Shield,
    description: "Good ops protects trust. Leadership should know what the number means, where the risk lives, and how the team is measuring reality.",
    practices: [
      "Run a consistent inspection cadence: weekly pipeline review, fortnightly forecast review, monthly conversion analysis",
      "Separate pipeline coverage, commit confidence, and deal risk instead of blending them into one score",
      "Use evidence-based forecast categories tied to buying process milestones",
      "Control who can edit key fields and dashboards so numbers remain auditable",
      "Tie reporting to decisions: resourcing, coaching priorities, territory coverage, and quarter planning",
    ],
  },
]

const CRM_THINKING = [
  { concept: "Accounts before contacts", description: "In B2B sales, accounts are the commercial unit. Contacts matter, but opportunity quality usually depends on company fit, buying context, and stakeholder coverage." },
  { concept: "Opportunity as a hypothesis", description: "A deal record is not a trophy. It is a live hypothesis about a business problem, a buying motion, and a likely path to revenue. Keep it updated as evidence changes." },
  { concept: "Next step discipline", description: "Every active deal should have a date-bound next step with a named owner. If there is no next step, there is no momentum." },
  { concept: "Multi-threading visibility", description: "CRM quality should show whether you have access to economic buyers, champions, users, procurement, legal, and technical evaluators. Single-threaded deals are fragile deals." },
  { concept: "Handoff quality", description: "Closed-won is not the end of the workflow. Good ops carries the customer into onboarding with context, commitments, and expansion signal tracking intact." },
]

export default function SalesOpsPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Foundation Layer</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Sales Ops &amp; Enablement
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Modern revenue teams win when systems make good behavior easier:
          cleaner pipeline hygiene, faster handoffs, sharper coaching loops, and
          fewer hours lost to avoidable admin work.
        </p>
      </div>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">The sales operating stack</h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Sales ops is not one tool. It is a connected stack that turns activity,
          account data, deal progression, and coaching signal into a predictable revenue engine.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SALES_TECH_LAYERS.map((layer) => (
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
                  {layer.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-[10px]">{tool}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">The 5 pillars of sales ops</h2>
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
                {pillar.practices.map((practice) => (
                  <div key={practice} className="flex items-start gap-2 text-xs text-editorial-ink/80">
                    <CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" /> {practice}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">CRM thinking</h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          A CRM is where selling behavior becomes organizational memory. If the system
          cannot show who matters, what is at risk, and what happens next, it is not supporting the team.
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
            Great sales ops makes the right rep behavior the default behavior.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            When the stack is clean, the rules are clear, and the forecast is credible,
            reps spend less time remembering what to do and more time moving real deals forward.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
