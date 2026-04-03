"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  Database,
  Eye,
  FlaskConical,
  Layers,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
}

const MEASUREMENT_LAYERS = [
  {
    layer: "Collection",
    icon: Database,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    what: "Getting reliable selling data into the system: activities, meetings, stakeholders, stage changes, notes, and outcome signals.",
    tools: ["Salesforce", "HubSpot CRM", "Gong", "Outreach"],
    mistake: "Reps log activity inconsistently, so managers try to forecast from partial data and intuition.",
    principle: "If the input discipline is weak, every downstream metric becomes suspicious.",
  },
  {
    layer: "Storage",
    icon: Layers,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    what: "Defining the CRM or revenue platform as the source of truth for pipeline, contacts, ownership, and stage history.",
    tools: ["Salesforce", "HubSpot", "Clari"],
    mistake: "Critical deal facts live across CRM, spreadsheets, and private notes, so no one trusts one number.",
    principle: "Every core revenue metric should have one canonical source.",
  },
  {
    layer: "Processing",
    icon: Zap,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    what: "Turning raw events into useful metrics like stage conversion, coverage, aging, forecast variance, and rep productivity.",
    tools: ["Clari", "Looker", "Salesforce Reports", "Sheets"],
    mistake: "Different teams calculate the same metric differently and argue about whose number is correct.",
    principle: "Metrics need one definition, one formula, and one owner.",
  },
  {
    layer: "Reporting",
    icon: BarChart3,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    what: "Presenting the right metrics to the right audience: rep dashboards, manager inspections, executive forecasting, and board-level summaries.",
    tools: ["Clari", "Looker", "Slides", "CRM dashboards"],
    mistake: "Teams build one huge dashboard that nobody can act from quickly.",
    principle: "Reporting should answer a decision, not just display a number.",
  },
  {
    layer: "Action",
    icon: Target,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    what: "Using the metrics to coach reps, reclassify forecasts, fix process gaps, change territory focus, and improve the whole revenue motion.",
    tools: ["Forecast calls", "Pipeline reviews", "1:1 coaching", "QBRs"],
    mistake: "Teams measure everything, talk about everything, and change nothing.",
    principle: "A metric earns its place when it clearly changes behaviour or investment.",
  },
]

const WHY_FIRST = [
  {
    icon: Eye,
    title: "You cannot coach what you cannot see",
    description: "Without reliable stage, activity, and stakeholder data, managers are guessing at the real reason deals stall.",
  },
  {
    icon: AlertTriangle,
    title: "Bad data compounds quietly",
    description: "Weak CRM discipline does not only hurt reporting. It damages forecasting, hiring decisions, and quarter planning.",
  },
  {
    icon: Building2,
    title: "Leadership needs a credible number",
    description: "The first executive question is usually some version of 'Are we going to hit the number?' Measurement architecture exists so that answer is trustworthy.",
  },
  {
    icon: Shield,
    title: "Process trust is fragile",
    description: "Once teams stop trusting definitions and dashboards, everything gets rebuilt in spreadsheets and private judgment.",
  },
]

const EVENT_TAXONOMY = [
  {
    category: "Pipeline Creation",
    events: ["account_targeted", "outreach_sent", "meeting_booked", "opportunity_created"],
    metric: "Meetings created, sourced pipeline, opportunity conversion",
  },
  {
    category: "Qualification",
    events: ["discovery_completed", "champion_identified", "economic_buyer_mapped", "meddic_updated"],
    metric: "Qualification quality, stakeholder coverage, stage readiness",
  },
  {
    category: "Evaluation",
    events: ["demo_delivered", "technical_review_started", "security_review_started", "business_case_presented"],
    metric: "Stage conversion, time in stage, risk visibility",
  },
  {
    category: "Commercial",
    events: ["proposal_sent", "procurement_active", "legal_review_started", "forecast_category_changed"],
    metric: "Commit quality, slip risk, commercial velocity",
  },
  {
    category: "Post-Sale",
    events: ["onboarding_started", "renewal_due", "expansion_signal_flagged", "upsell_closed"],
    metric: "Retention, expansion timing, NRR influence",
  },
]

const ADVANCED_METRICS = [
  {
    title: "Pipeline Coverage and Conversion",
    detail: "Coverage alone is weak if stage conversion is poor. Track both together so you know whether the gap is top-of-funnel or middle-of-funnel quality.",
    bullets: [
      "Coverage by quarter and segment",
      "Stage-to-stage conversion by rep and team",
      "Aging by stage to spot slippage early",
    ],
  },
  {
    title: "Forecast Accuracy and Commit Quality",
    detail: "Forecasting is a trust system. Measure how often commit closes as called, how much deals slip, and whether optimism or sandbagging patterns are showing up.",
    bullets: [
      "Commit vs actual by period",
      "Slip rate on late-stage deals",
      "Forecast variance by manager and segment",
    ],
  },
  {
    title: "Ramp and Productivity",
    detail: "A rep is not productive when they finish onboarding. They are productive when they create and progress real pipeline. Measure that path directly.",
    bullets: [
      "Time to first meeting, opportunity, and close",
      "Ramp productivity against tenured rep benchmarks",
      "Coaching intervention impact over time",
    ],
  },
  {
    title: "Expansion and Retention Signals",
    detail: "Revenue quality does not end at closed won. Track account health, adoption, and whitespace signals so growth is not dependent on net-new only.",
    bullets: [
      "Renewal risk visibility before contract date",
      "Expansion signals by account segment",
      "NRR contribution by owner and motion",
    ],
  },
  {
    title: "Win/Loss and No-Decision Analysis",
    detail: "Closed lost is not one bucket. Split losses by competitor, no decision, budget, timing, and stakeholder failure so the team can improve the right thing.",
    bullets: [
      "No-decision rate by segment",
      "Loss reason quality and completeness",
      "Stakeholder coverage differences between wins and losses",
    ],
  },
]

export default function MeasurementArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Foundation Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Sales Metrics Architecture
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Measurement is not a reporting afterthought. It is the operating structure that
          makes pipeline, forecasting, coaching, and expansion more predictable.
        </p>
      </div>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Why measurement comes before scale
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WHY_FIRST.map((item) => (
            <Card key={item.title} className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-amber-soft">
                    <item.icon className="h-4 w-4 text-editorial-amber" />
                  </div>
                  <h3 className="font-serif font-semibold text-editorial-ink text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-editorial-muted leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          The 5 layers of measurement architecture
        </h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Each layer depends on the one below it. Weak collection creates weak storage,
          weak storage creates weak reporting, and weak reporting leads to weak decisions.
        </p>

        <div className="space-y-3">
          {MEASUREMENT_LAYERS.map((layer, i) => (
            <Card
              key={layer.layer}
              className={cn(
                "cursor-pointer transition-all duration-200",
                activeLayer === i ? "ring-2 ring-editorial-green" : "hover:-translate-y-[1px] hover:shadow-editorial-hover"
              )}
              onClick={() => setActiveLayer(activeLayer === i ? null : i)}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-editorial-muted w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", layer.bg)}>
                      <layer.icon className={cn("h-5 w-5", layer.color)} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-semibold text-editorial-ink">{layer.layer}</h3>
                      <Badge variant="outline" className="text-[10px]">
                        Click to inspect
                      </Badge>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{layer.what}</p>

                    <AnimatePresence>
                      {activeLayer === i && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3 pt-3"
                        >
                          <div className="flex flex-wrap gap-1.5">
                            {layer.tools.map((t) => (
                              <Badge key={t} variant="outline" className="text-[10px]">
                                {t}
                              </Badge>
                            ))}
                          </div>
                          <div className="rounded-[12px] bg-editorial-red-soft/60 border border-editorial-red/10 px-3 py-2">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-red mb-0.5">
                              Common mistake
                            </p>
                            <p className="text-xs text-editorial-ink/80">{layer.mistake}</p>
                          </div>
                          <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-0.5">
                              Principle
                            </p>
                            <p className="text-xs text-editorial-ink/80 font-medium">{layer.principle}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Event taxonomy
        </h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          A strong measurement system needs shared event language so every stage of the
          revenue motion can be measured consistently.
        </p>
        <div className="space-y-3">
          {EVENT_TAXONOMY.map((cat) => (
            <Card key={cat.category}>
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <Badge variant="beginner" className="shrink-0 w-fit">
                  {cat.category}
                </Badge>
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {cat.events.map((e) => (
                    <span
                      key={e}
                      className="text-xs font-mono text-editorial-ink/70 bg-editorial-canvas rounded-[8px] px-2 py-0.5"
                    >
                      {e}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-editorial-muted shrink-0 sm:w-56 sm:text-right">
                  {cat.metric}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-serif font-semibold text-editorial-ink text-lg">
            Sales metrics setup checklist
          </h3>
          <p className="text-sm text-editorial-muted">
            Before scaling the team, confirm these operating basics are in place:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Stage exit criteria are defined and used consistently",
              "Required CRM fields exist for qualification and close risk",
              "Forecast categories are documented and manager-enforced",
              "Loss reasons and no-decision reasons are captured cleanly",
              "Pipeline aging and slip alerts are visible each week",
              "Coverage and conversion are reviewed together, not separately",
              "Handoffs from closed won to onboarding are measurable",
              "Expansion and renewal signals are visible before contract deadlines",
              "Metric definitions have clear owners",
              "Dashboards are role-specific rather than one-size-fits-all",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-editorial-green mt-0.5 shrink-0" />
                <span className="text-editorial-ink/80">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="h-px bg-[rgba(44,49,59,0.08)] my-6" />

      <motion.section {...fadeIn} className="space-y-6">
        <div className="max-w-3xl">
          <Badge className="bg-editorial-amber-soft text-editorial-amber border-transparent text-xs mb-3">
            Advanced
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
            Advanced Revenue Measurement
          </h2>
          <p className="text-editorial-muted mt-3 text-base leading-relaxed max-w-2xl">
            Once the foundation is clean, measurement stops being admin and starts
            becoming a competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADVANCED_METRICS.map((item) => (
            <Card key={item.title}>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink">{item.title}</h3>
                <p className="text-sm text-editorial-muted leading-relaxed">{item.detail}</p>
                <div className="space-y-1.5">
                  {item.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2 text-xs text-editorial-ink/80">
                      <TrendingUp className="h-3.5 w-3.5 text-editorial-blue mt-0.5 shrink-0" />
                      {bullet}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#ede9fe]">
                <FlaskConical className="h-5 w-5 text-[#6d28d9]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">
                  Building an experimentation loop
                </h3>
                <p className="text-xs text-editorial-muted">
                  Measurement becomes powerful when it changes behaviour repeatedly.
                </p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              Good teams do not only observe metrics. They test changes against them:
              new discovery standards, new follow-up sequences, new demo flows, new
              manager inspection cadences, and new stakeholder strategies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  title: "Impact",
                  text: "If this change works, how much pipeline quality, conversion, or forecast reliability improves?",
                },
                {
                  title: "Confidence",
                  text: "How much evidence do we already have that this is the real problem worth testing?",
                },
                {
                  title: "Ease",
                  text: "Can the team test this quickly enough that the learning still matters this quarter?",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[12px] bg-editorial-canvas p-4 space-y-1.5">
                  <p className="text-xs font-semibold text-editorial-ink">{item.title}</p>
                  <p className="text-xs text-editorial-muted leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Measure first. Scale second.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            When the measurement layer is sound, pipeline reviews get sharper, coaching gets
            faster, and forecasts become something the business can actually trust.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
