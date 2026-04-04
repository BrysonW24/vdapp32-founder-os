"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
} from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
}

const STAKEHOLDER_LANGUAGE = [
  {
    role: "CEO",
    cares: [
      "Growth quality",
      "Strategic momentum",
      "Execution confidence",
      "Competitive position",
      "Risk reduction",
    ],
    donts: [
      "Do not drown them in feature detail",
      "Do not speak only in rep activity metrics",
      "Do not describe the product before the business problem",
    ],
    translate:
      "Instead of 'Our reps saved five hours a week in admin,' say 'We can redeploy rep time into pipeline creation and improve planning confidence ahead of the next quarter.'",
  },
  {
    role: "CFO",
    cares: [
      "Payback period",
      "Forecast reliability",
      "Margin protection",
      "Cash impact",
      "Commercial risk",
    ],
    donts: [
      "Do not use vague ROI language with no assumptions",
      "Do not hide the cost of implementation or services",
      "Do not answer a finance question with product excitement",
    ],
    translate:
      "Instead of 'The platform improves coaching,' say 'The investment reduces manual admin, improves forecast accuracy, and pays back within two quarters under conservative assumptions.'",
  },
  {
    role: "CRO / VP Sales",
    cares: [
      "Pipeline quality",
      "Win rate",
      "Sales cycle health",
      "Forecast accuracy",
      "Rep productivity",
    ],
    donts: [
      "Do not talk only about top-of-funnel volume",
      "Do not present a tool as valuable without workflow change",
      "Do not ignore manager adoption and process discipline",
    ],
    translate:
      "Instead of 'The team will get better insights,' say 'Managers will inspect deals earlier, improve qualification, and reduce late-quarter forecast surprises.'",
  },
  {
    role: "CIO / CTO",
    cares: [
      "Security",
      "Data integrity",
      "Integration effort",
      "Operational reliability",
      "Governance",
    ],
    donts: [
      "Do not hand-wave technical risk",
      "Do not guess on architecture questions",
      "Do not minimise implementation effort to make the deal sound easier",
    ],
    translate:
      "Instead of 'It is easy to set up,' say 'We can integrate with your existing stack using standard APIs, preserve permission control, and phase rollout without disrupting the core workflow.'",
  },
]

const METRICS_TRANSLATION = [
  {
    sales: "Pipeline Coverage",
    business: "Do we have enough qualified future revenue to hit the target with confidence?",
    when: "Quarter planning",
  },
  {
    sales: "Win Rate",
    business: "How efficiently are we turning qualified demand into revenue?",
    when: "Sales effectiveness review",
  },
  {
    sales: "Sales Cycle Length",
    business: "How long does capital stay tied up before revenue lands?",
    when: "Operating rhythm and cash planning",
  },
  {
    sales: "Forecast Accuracy",
    business: "How much can leadership trust our revenue planning decisions?",
    when: "Executive and board review",
  },
  {
    sales: "Average Contract Value",
    business: "What level of economic value are we winning per deal?",
    when: "Segmentation and pricing review",
  },
  {
    sales: "Ramp Time",
    business: "How quickly does hiring turn into productive capacity?",
    when: "Headcount planning",
  },
  {
    sales: "Net Revenue Retention",
    business: "Are existing customers becoming more valuable over time?",
    when: "Board and growth review",
  },
  {
    sales: "Stage Conversion",
    business: "Where does the buying process break down and need intervention?",
    when: "Manager inspection",
  },
]

const REPORT_STRUCTURES = [
  {
    name: "Weekly Deal Review",
    audience: "Frontline manager",
    format: "One-page view",
    includes: [
      "Commit deals and biggest risks",
      "Stage slippage and aging",
      "Decision-maker coverage gaps",
      "Actions due before next review",
    ],
    time: "10 minutes to absorb",
  },
  {
    name: "Monthly Forecast Readout",
    audience: "Leadership team",
    format: "5-7 slides",
    includes: [
      "Target vs commit vs upside",
      "Coverage and conversion trends",
      "Biggest forecast assumptions",
      "Interventions required this month",
    ],
    time: "15 minutes to present",
  },
  {
    name: "Quarterly Executive Review",
    audience: "CEO, CFO, Board",
    format: "Executive memo + short deck",
    includes: [
      "Revenue outcome vs plan",
      "Forecast reliability",
      "Efficiency and payback trends",
      "Major risks and next-quarter priorities",
    ],
    time: "30 minutes with Q&A",
  },
]

export default function ExecutiveCommunicationPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Foundation Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Communicating with Executives
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Executive selling is a translation skill. Senior buyers do not want more
          product detail. They want commercial clarity: what problem matters, what the
          consequence is, what return is likely, and what risk still remains.
        </p>
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-2">
          <h3 className="font-serif font-semibold text-editorial-ink">The core skill</h3>
          <p className="text-sm text-editorial-muted leading-relaxed max-w-3xl">
            Every executive is asking some version of the same question:
            {" "}
            <strong className="text-editorial-ink">
              what business outcome changes if we make this decision now?
            </strong>
            {" "}
            The rep who can answer that cleanly gets access, trust, and momentum.
          </p>
        </CardContent>
      </Card>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          How to speak to each stakeholder
        </h2>
        <div className="space-y-4">
          {STAKEHOLDER_LANGUAGE.map((s) => (
            <Card key={s.role}>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-blue-soft">
                    <Building2 className="h-5 w-5 text-editorial-blue" />
                  </div>
                  <h3 className="font-serif font-semibold text-editorial-ink text-lg">{s.role}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-green font-medium">
                      What they care about
                    </h4>
                    {s.cares.map((c) => (
                      <div key={c} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                        <CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-red font-medium">
                      What not to do
                    </h4>
                    {s.donts.map((d) => (
                      <div key={d} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                        <AlertTriangle className="h-3 w-3 text-editorial-red mt-0.5 shrink-0" />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-1">
                    How to translate
                  </p>
                  <p className="text-xs text-editorial-ink/80 leading-relaxed">{s.translate}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Metrics translation guide
        </h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Most sales metrics become stronger when translated into planning, risk, and
          operating language. That is what executives actually buy into.
        </p>
        <div className="space-y-2">
          {METRICS_TRANSLATION.map((m) => (
            <Card key={m.sales}>
              <CardContent className="p-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <Badge variant="secondary" className="text-[10px] shrink-0 w-fit font-mono">
                  {m.sales}
                </Badge>
                <ArrowRight className="h-3 w-3 text-editorial-muted shrink-0 hidden sm:block" />
                <p className="text-xs text-editorial-ink/80 flex-1">{m.business}</p>
                <Badge variant="outline" className="text-[10px] shrink-0 w-fit">
                  {m.when}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Report structures that work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REPORT_STRUCTURES.map((r) => (
            <Card key={r.name} className="hover:-translate-y-[1px] hover:shadow-editorial-hover transition-all duration-200">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink text-sm">{r.name}</h3>
                <div className="space-y-1 text-xs">
                  <p className="text-editorial-muted">
                    <strong className="text-editorial-ink">Audience:</strong> {r.audience}
                  </p>
                  <p className="text-editorial-muted">
                    <strong className="text-editorial-ink">Format:</strong> {r.format}
                  </p>
                  <p className="text-editorial-muted">
                    <strong className="text-editorial-ink">Time:</strong> {r.time}
                  </p>
                </div>
                <div className="space-y-1">
                  {r.includes.map((item) => (
                    <div key={item} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                      <CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            If you cannot explain the decision in executive language, the deal stays fragile.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            The best enterprise reps are translators. They connect product capability to
            planning confidence, commercial return, and strategic movement.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
