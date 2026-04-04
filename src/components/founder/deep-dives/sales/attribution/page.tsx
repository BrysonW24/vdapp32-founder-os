"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  Target,
} from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
}

const MODELS = [
  {
    name: "Last-Touch Deal Attribution",
    description: "100% of the credit goes to the last meaningful sales touch before the deal advances or closes.",
    example: "Executive briefing -> commercial review -> signature. The executive briefing gets all the credit.",
    pros: ["Simple to explain", "Useful for quick inspection", "Easy to track in CRM notes"],
    cons: ["Over-credits the final event", "Ignores earlier influence", "Can distort investment decisions"],
    bias: "Favours late-stage touches like pricing calls, executive meetings, and procurement work.",
  },
  {
    name: "First-Source Attribution",
    description: "100% of the credit goes to the first source that created the opportunity or first serious engagement.",
    example: "Outbound email -> discovery -> demo -> close. Outbound gets all the credit.",
    pros: ["Useful for pipeline source analysis", "Helpful for territory and sourcing reviews"],
    cons: ["Ignores what actually moved the deal later", "Can over-credit the door-opener"],
    bias: "Favours sourcing functions such as outbound, partner introductions, or inbound programmes.",
  },
  {
    name: "Stage-Weighted Influence",
    description: "Credit is spread across major buying stages such as sourcing, discovery, evaluation, business case, and close.",
    example: "Outbound 20%, discovery 20%, demo 20%, business case 20%, executive alignment 20%.",
    pros: ["Acknowledges that deals are built over time", "Better than single-touch views"],
    cons: ["Still based on assumptions", "May flatten the importance of key moments"],
    bias: "Usually fairer than single-touch, but still needs judgment around weighting.",
  },
  {
    name: "Stakeholder Influence Mapping",
    description: "Tracks which interactions changed confidence across the buying committee, not only which stage happened last.",
    example: "Technical validation won over IT, ROI review won over finance, executive meeting won sponsorship.",
    pros: ["Matches how complex B2B decisions actually happen", "Improves deal strategy and postmortem quality"],
    cons: ["Harder to operationalise at scale", "Requires disciplined note taking"],
    bias: "Favours committee-aware analysis over channel-centric analysis.",
  },
  {
    name: "Data-Driven Influence",
    description: "Uses larger data sets to identify which moments, stakeholders, and sequences correlate most strongly with wins.",
    example: "Analysis shows deals with CFO ROI review plus security alignment close 2.4x more often than deals without both.",
    pros: ["Useful when enough clean data exists", "Can reveal repeatable win patterns"],
    cons: ["Needs disciplined CRM and activity data", "Correlation still needs interpretation"],
    bias: "Least biased when data quality is strong, but still needs human context.",
  },
]

const TESTS = [
  {
    test: "Territory holdout",
    how: "Run a sales motion in one segment or territory and withhold it in a comparable segment for a fixed period.",
    measures: "Whether the motion truly creates incremental pipeline or just captures demand that would have appeared anyway.",
    example: "An outbound play is tested in Region A but not Region B. If qualified pipeline lifts materially only in Region A, the motion is likely incremental.",
  },
  {
    test: "Sequence holdout",
    how: "Give one cohort the new follow-up or enablement sequence and leave another cohort on the current process.",
    measures: "Whether the new messaging or workflow changes meeting rates, progression, or win rates.",
    example: "Deals with a structured champion pack progress to proposal 18% more often than the control group.",
  },
  {
    test: "Executive-programme pilot",
    how: "Introduce an executive alignment motion only on a selected set of qualified deals and compare outcomes.",
    measures: "Whether executive involvement changes win rate, cycle time, or deal size.",
    example: "Deals with a CRO-to-CRO meeting close faster and carry less late-stage slippage than similar deals without one.",
  },
  {
    test: "Partner vs direct comparison",
    how: "Compare matched deals sourced or influenced by partners against direct-only deals with similar size and complexity.",
    measures: "Whether partner influence changes access, trust, or speed in a measurable way.",
    example: "Partner-supported opportunities reach security review faster and show stronger stakeholder coverage than direct-only deals.",
  },
]

export default function AttributionPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Foundation Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Deal Attribution and Win Analysis
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Complex B2B deals are rarely won by one moment. Attribution helps us decide
          which touches, stakeholders, and motions truly influenced the outcome instead
          of over-crediting whatever happened last.
        </p>
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-3">
          <h3 className="font-serif font-semibold text-editorial-ink">
            The problem with simplistic deal attribution
          </h3>
          <p className="text-sm text-editorial-muted leading-relaxed">
            A deal might involve outbound outreach, a discovery call, a multi-threaded
            demo, a CFO business case review, a security workshop, and an executive
            alignment meeting before signature. If you only credit the last touch, you
            will underinvest in the earlier moments that actually created confidence.
          </p>
          <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
            <p className="text-xs text-editorial-amber">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              <strong>The danger:</strong> weak attribution makes teams overvalue late-stage
              heroics and undervalue sourcing, qualification, and stakeholder work that
              made the close possible in the first place.
            </p>
          </div>
        </CardContent>
      </Card>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Attribution models compared
        </h2>
        <div className="space-y-3">
          {MODELS.map((model) => (
            <Card key={model.name}>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink">{model.name}</h3>
                <p className="text-sm text-editorial-muted">{model.description}</p>
                <div className="rounded-[10px] bg-editorial-canvas border border-[rgba(44,49,59,0.06)] px-3 py-2">
                  <p className="text-xs text-editorial-ink/70">
                    <strong>Example:</strong> {model.example}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    {model.pros.map((p) => (
                      <div key={p} className="flex items-start gap-1.5 text-xs text-editorial-green">
                        <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />
                        {p}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {model.cons.map((c) => (
                      <div key={c} className="flex items-start gap-1.5 text-xs text-editorial-red">
                        <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-editorial-blue">
                  <Eye className="h-3 w-3 inline mr-1" />
                  <strong>Bias:</strong> {model.bias}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Incrementality tests for sales motions
        </h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Attribution tells you who touched the deal. Incrementality asks the harder
          question: would the deal have progressed or closed without that motion?
        </p>
        <div className="space-y-3">
          {TESTS.map((test) => (
            <Card key={test.test}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                    <Target className="h-4 w-4 text-editorial-green" />
                  </div>
                  <h3 className="font-serif font-semibold text-editorial-ink">{test.test}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted block mb-1">
                      How it works
                    </span>
                    <p className="text-editorial-ink/80 leading-relaxed">{test.how}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted block mb-1">
                      What it measures
                    </span>
                    <p className="text-editorial-ink/80 leading-relaxed">{test.measures}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted block mb-1">
                      Example
                    </span>
                    <p className="text-editorial-ink/80 leading-relaxed">{test.example}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-serif font-semibold text-editorial-ink text-lg">
            When to use what
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-[12px] bg-editorial-blue-soft/60 border border-editorial-blue/10 p-3 space-y-1">
              <p className="text-xs text-editorial-blue font-medium">Use attribution when...</p>
              <p className="text-editorial-ink/80 text-xs">
                You need to understand which motions, touches, or stakeholders influenced
                deal progression and where your team is over- or under-investing.
              </p>
            </div>
            <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 p-3 space-y-1">
              <p className="text-xs text-editorial-green font-medium">Use incrementality when...</p>
              <p className="text-editorial-ink/80 text-xs">
                You need higher-confidence evidence that a programme or motion truly creates
                additional pipeline, progression, or revenue beyond what would happen anyway.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Attribution should improve judgment, not create false certainty.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            The strongest revenue teams combine attribution, win/loss review, and
            incrementality testing to understand what actually creates deal movement.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
