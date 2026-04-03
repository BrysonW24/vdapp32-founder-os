"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign, TrendingUp, Users, BarChart3, AlertTriangle,
  CheckCircle2, Building2, Briefcase, Target, ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

const STAKEHOLDER_LANGUAGE = [
  {
    role: "CEO",
    cares: ["Revenue growth", "Market share", "Customer acquisition and retention", "Competitive advantage", "Brand reputation"],
    speaks: "Top-line revenue, customer count, market position, strategic differentiation.",
    donts: ["Don't talk about click-through rates", "Don't present campaign-level detail", "Don't use marketing jargon (MQLs, ROAS, CTR) without translating"],
    translate: "Instead of 'Our Meta campaign achieved 4.2x ROAS', say 'Our paid social investment generated $420K in revenue on $100K spend — that's our most profitable acquisition channel.'",
  },
  {
    role: "CFO",
    cares: ["Marketing ROI", "Customer Acquisition Cost", "Payback period", "Budget efficiency", "Forecasting accuracy"],
    speaks: "Margin, CAC, CLV, payback, marketing as % of revenue, cost per outcome.",
    donts: ["Don't present vanity metrics", "Don't ask for budget without ROI projections", "Don't ignore attribution uncertainty — acknowledge it"],
    translate: "Instead of 'We need $50K more for paid ads', say 'With $50K additional investment, we project 200 new customers at $250 CAC, with a 4-month payback based on our $1,200 average CLV.'",
  },
  {
    role: "Sales Leader",
    cares: ["Lead quality (not just quantity)", "Pipeline contribution", "Sales enablement materials", "Speed-to-lead", "Marketing-sourced vs marketing-influenced revenue"],
    speaks: "Pipeline value, qualified leads, close rates, deal velocity, competitive intelligence.",
    donts: ["Don't only report MQLs — report SALs and SQLs too", "Don't dump unqualified leads and call it success", "Don't work in isolation from the sales process"],
    translate: "Instead of 'Marketing generated 500 leads this month', say 'Marketing generated 120 qualified leads — 35 are in active sales conversations with a combined pipeline value of $280K.'",
  },
  {
    role: "Board / Investors",
    cares: ["Unit economics (CAC:CLV ratio)", "Growth rate", "Channel scalability", "Brand moat", "Efficiency metrics"],
    speaks: "Cohort analysis, payback curves, CAC trends, retention curves, market penetration.",
    donts: ["Don't present tactical updates", "Don't use uncontextualised numbers", "Don't mix vanity metrics with business metrics"],
    translate: "Instead of showing 50 campaign metrics, show: 'CAC decreased 18% this quarter while CLV increased 12%. Our CAC:CLV ratio is now 1:4.8, up from 1:3.2 last quarter. Marketing is getting more efficient as we scale.'",
  },
]

const METRICS_TRANSLATION = [
  { marketing: "Impressions", business: "Market reach — how many potential customers saw us", when: "Brand awareness reporting" },
  { marketing: "CTR (Click-Through Rate)", business: "Message relevance — are we saying the right thing to the right people?", when: "Campaign optimisation" },
  { marketing: "Conversion Rate", business: "Funnel efficiency — what percentage of interested people take action?", when: "Funnel analysis" },
  { marketing: "CPA / CAC", business: "Acquisition efficiency — how much does each new customer cost us?", when: "Budget justification, unit economics" },
  { marketing: "CLV", business: "Customer value — how much is each customer relationship worth over time?", when: "Strategic planning, pricing, retention investment" },
  { marketing: "ROAS", business: "Advertising profitability — for every dollar we spend on ads, how many dollars come back?", when: "Channel budget allocation" },
  { marketing: "Marketing ROI", business: "Total marketing return — is the overall marketing investment profitable?", when: "Executive reporting, board updates" },
  { marketing: "Pipeline contribution", business: "Revenue influence — how much of the sales pipeline was created or influenced by marketing?", when: "Marketing-sales alignment" },
  { marketing: "Churn rate", business: "Customer loss — what percentage of customers are we losing, and is it getting better?", when: "Retention strategy, investor reporting" },
  { marketing: "NPS", business: "Customer loyalty — would our customers recommend us? Predicts future growth.", when: "Product-market fit, brand health" },
]

const REPORT_STRUCTURES = [
  {
    name: "Weekly Channel Update",
    audience: "Marketing team",
    format: "Dashboard + 3 bullets",
    includes: ["Channel-level KPIs vs targets", "Top 3 wins and concerns", "Action items for next week"],
    time: "5 minutes to consume",
  },
  {
    name: "Monthly Marketing Report",
    audience: "CEO + Leadership",
    format: "Slide deck (5-8 slides)",
    includes: ["Revenue contribution and pipeline", "CAC and CLV trends", "Key campaign results", "Strategic recommendations", "Budget vs actual"],
    time: "15 minutes to present",
  },
  {
    name: "Quarterly Business Review",
    audience: "Board / Investors",
    format: "Executive memo + supporting data",
    includes: ["Unit economics trend (CAC:CLV)", "Growth rate and market penetration", "Channel scalability assessment", "Next quarter strategy and investment thesis", "Risk factors"],
    time: "30 minutes with Q&A",
  },
]

export default function ExecutiveCommunicationPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Foundation Layer</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Executive Communication
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The most common reason marketing budgets get cut isn&apos;t poor performance
          — it&apos;s poor communication. If leadership can&apos;t understand your impact,
          they can&apos;t justify your investment. Learn to translate marketing into
          the language of revenue, margin, and growth.
        </p>
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-2">
          <h3 className="font-serif font-semibold text-editorial-ink">The core skill</h3>
          <p className="text-sm text-editorial-muted leading-relaxed max-w-3xl">
            Every executive asks one question about marketing: <strong className="text-editorial-ink">&quot;Is it working?&quot;</strong>
            {" "}Your job is to answer that question in terms they care about — revenue,
            profitability, customer growth, and competitive position. Not clicks, not impressions,
            not followers. Business outcomes.
          </p>
        </CardContent>
      </Card>

      {/* Speaking to each stakeholder */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">How to speak to each stakeholder</h2>
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
                    <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-green font-medium">What they care about</h4>
                    {s.cares.map((c) => (
                      <div key={c} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                        <CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" /> {c}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-red font-medium">What NOT to do</h4>
                    {s.donts.map((d) => (
                      <div key={d} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                        <AlertTriangle className="h-3 w-3 text-editorial-red mt-0.5 shrink-0" /> {d}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-1">How to translate</p>
                  <p className="text-xs text-editorial-ink/80 leading-relaxed">{s.translate}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Metrics translation table */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Metrics translation guide</h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Every marketing metric has a business translation. Learn to present
          the business version, not the marketing version.
        </p>
        <div className="space-y-2">
          {METRICS_TRANSLATION.map((m) => (
            <Card key={m.marketing}>
              <CardContent className="p-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <Badge variant="secondary" className="text-[10px] shrink-0 w-fit font-mono">{m.marketing}</Badge>
                <ArrowRight className="h-3 w-3 text-editorial-muted shrink-0 hidden sm:block" />
                <p className="text-xs text-editorial-ink/80 flex-1">{m.business}</p>
                <Badge variant="outline" className="text-[10px] shrink-0 w-fit">{m.when}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Report structures */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Report structures that work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REPORT_STRUCTURES.map((r) => (
            <Card key={r.name} className="hover:-translate-y-[1px] hover:shadow-editorial-hover transition-all duration-200">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink text-sm">{r.name}</h3>
                <div className="space-y-1 text-xs">
                  <p className="text-editorial-muted"><strong className="text-editorial-ink">Audience:</strong> {r.audience}</p>
                  <p className="text-editorial-muted"><strong className="text-editorial-ink">Format:</strong> {r.format}</p>
                  <p className="text-editorial-muted"><strong className="text-editorial-ink">Time:</strong> {r.time}</p>
                </div>
                <div className="space-y-1">
                  {r.includes.map((item) => (
                    <div key={item} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                      <CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" /> {item}
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
            If you can&apos;t explain it in terms the CEO cares about, you can&apos;t defend the budget.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            The best marketers aren&apos;t just good at marketing. They&apos;re good at
            translating marketing into business impact — and that&apos;s what gets
            them promoted, funded, and trusted.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
