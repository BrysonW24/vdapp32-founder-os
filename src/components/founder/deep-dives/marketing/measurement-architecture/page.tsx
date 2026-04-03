"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3, Layers, Database, Eye, Target, AlertTriangle, CheckCircle2,
  ArrowRight, Lightbulb, Zap, Shield, Building2, DollarSign, TrendingUp,
  Heart, ShoppingCart, Route, GitBranch, Calculator, FlaskConical,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

const MEASUREMENT_LAYERS = [
  {
    layer: "Collection",
    icon: Database,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    what: "Getting data into your systems. Tags, pixels, events, UTM parameters, cookies, server-side tracking.",
    tools: ["Google Tag Manager", "GA4 events", "Meta Pixel", "Server-side tagging"],
    mistake: "Adding tracking after the campaign launches instead of before. If you don't set up measurement first, you're flying blind.",
    principle: "Measurement architecture comes BEFORE campaign planning, not after.",
  },
  {
    layer: "Storage",
    icon: Layers,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    what: "Where your data lives and how it's structured. Analytics platforms, data warehouses, CRM databases, CDP.",
    tools: ["Google Analytics 4", "BigQuery", "HubSpot CRM", "Segment"],
    mistake: "Data scattered across 10 tools with no single source of truth. When sales says one number and marketing says another, leadership trusts neither.",
    principle: "One source of truth for each metric. Define it once, reference it everywhere.",
  },
  {
    layer: "Processing",
    icon: Zap,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    what: "Transforming raw data into meaningful metrics. Attribution modelling, aggregation, calculated KPIs, data cleaning.",
    tools: ["Looker Studio", "dbt", "Google Sheets", "Excel"],
    mistake: "Calculating the same metric differently in different reports. If your email report says 500 conversions and your ads report says 300, you have a processing problem.",
    principle: "Every metric has ONE canonical definition. Document the formula, the source, and the refresh frequency.",
  },
  {
    layer: "Reporting",
    icon: BarChart3,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    what: "Turning processed data into dashboards, reports, and insights that people actually use to make decisions.",
    tools: ["Looker Studio", "Google Sheets", "Notion", "PowerPoint/Slides"],
    mistake: "Building a 50-metric dashboard that nobody looks at. More metrics does not mean more insight.",
    principle: "A dashboard should answer a specific question for a specific audience. If it can't, simplify it.",
  },
  {
    layer: "Action",
    icon: Target,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    what: "Using measurement to change behaviour — reallocating budget, pausing campaigns, doubling down on what works, alerting teams to anomalies.",
    tools: ["Automated alerts", "Weekly reviews", "Quarterly planning"],
    mistake: "Measuring everything and acting on nothing. Data without action is just overhead.",
    principle: "Every metric you track should have a clear 'if this, then that' action attached to it.",
  },
]

const WHY_FIRST = [
  { icon: Eye, title: "You can't optimise what you can't see", description: "If you launch a $10K ad campaign without conversion tracking, you'll never know if it worked. The money is gone and the learning is zero." },
  { icon: AlertTriangle, title: "Retrofit is expensive", description: "Adding measurement after launch means backfilling data (impossible for most channels), reconfiguring tools mid-flight, and losing weeks of clean data." },
  { icon: Building2, title: "Leadership expects numbers", description: "The first question a CEO asks about marketing: 'Is it working?' Without measurement architecture, you can't answer. That undermines trust and budget." },
  { icon: Shield, title: "Privacy requires planning", description: "Cookie consent, data retention, GDPR, the Australian Privacy Act — these affect what you CAN track. Architecture decisions must account for privacy from day one." },
]

const EVENT_TAXONOMY = [
  { category: "Awareness", events: ["page_view", "ad_impression", "video_view", "social_reach"], metric: "Impressions, Reach, Brand awareness lift" },
  { category: "Engagement", events: ["scroll_depth", "time_on_page", "content_download", "video_completion"], metric: "Engagement rate, Content consumption" },
  { category: "Conversion", events: ["form_submit", "add_to_cart", "purchase", "signup", "demo_request"], metric: "Conversion rate, CPA, Revenue" },
  { category: "Retention", events: ["repeat_purchase", "subscription_renewal", "feature_use", "NPS_response"], metric: "Churn rate, CLV, NPS, Repeat rate" },
  { category: "Referral", events: ["share", "referral_link_click", "review_submit", "invite_sent"], metric: "Viral coefficient, Referral rate" },
]

export default function MeasurementArchitecturePage() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Foundation Layer</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Measurement Architecture
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Most marketers learn channels first and measurement last. That&apos;s backwards.
          Measurement architecture is the foundation everything else sits on. Without
          it, you&apos;re spending money you can&apos;t account for.
        </p>
      </div>

      {/* Why measurement comes first */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Why measurement comes before channels
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

      {/* The 5 layers */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          The 5 layers of measurement architecture
        </h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Think of this like building a house. You can&apos;t put up walls (reporting)
          without a foundation (collection). Each layer depends on the one below it.
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
                    <span className="text-xs font-mono text-editorial-muted w-6">{String(i + 1).padStart(2, "0")}</span>
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", layer.bg)}>
                      <layer.icon className={cn("h-5 w-5", layer.color)} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-semibold text-editorial-ink">{layer.layer}</h3>
                      <ArrowRight className={cn("h-4 w-4 text-editorial-muted transition-transform", activeLayer === i && "rotate-90")} />
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
                              <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                            ))}
                          </div>
                          <div className="rounded-[12px] bg-editorial-red-soft/60 border border-editorial-red/10 px-3 py-2">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-red mb-0.5">Common mistake</p>
                            <p className="text-xs text-editorial-ink/80">{layer.mistake}</p>
                          </div>
                          <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-0.5">Principle</p>
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

      {/* Event taxonomy */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          What to measure: Event taxonomy
        </h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          A measurement architecture needs a clear taxonomy — a shared language for
          what events you track and what they mean. This maps to the AARRR funnel.
        </p>

        <div className="space-y-3">
          {EVENT_TAXONOMY.map((cat) => (
            <Card key={cat.category}>
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <Badge variant="beginner" className="shrink-0 w-fit">{cat.category}</Badge>
                <div className="flex flex-wrap gap-1.5 flex-1">
                  {cat.events.map((e) => (
                    <span key={e} className="text-xs font-mono text-editorial-ink/70 bg-editorial-canvas rounded-[8px] px-2 py-0.5">{e}</span>
                  ))}
                </div>
                <p className="text-xs text-editorial-muted shrink-0 sm:w-48 sm:text-right">{cat.metric}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Starter checklist */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-serif font-semibold text-editorial-ink text-lg">Measurement setup checklist</h3>
          <p className="text-sm text-editorial-muted">Before launching any marketing campaign, confirm these are in place:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Google Analytics 4 installed and configured",
              "Conversion events defined and firing correctly",
              "UTM parameter convention documented for the team",
              "Google Tag Manager set up with a clean container",
              "Attribution model chosen and documented",
              "Dashboard built with 3-5 key metrics per campaign goal",
              "Baseline metrics recorded (so you can measure change)",
              "Cookie consent / privacy banner implemented",
              "Reporting cadence agreed (daily/weekly/monthly)",
              "Anomaly alerts set for spend, CPA, and conversion rate",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5 text-editorial-green mt-0.5 shrink-0" />
                <span className="text-editorial-ink/80">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════
          ADVANCED MEASUREMENT LAYER
      ═══════════════════════════════════════════════════════════════ */}
      <div className="h-px bg-[rgba(44,49,59,0.08)] my-6" />

      <motion.section {...fadeIn} className="space-y-6">
        <div className="max-w-3xl">
          <Badge className="bg-editorial-amber-soft text-editorial-amber border-transparent text-xs mb-3">Advanced</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
            Advanced Marketing Measurement
          </h2>
          <p className="text-editorial-muted mt-3 text-base leading-relaxed max-w-2xl">
            This is where measurement becomes a competitive advantage. These metrics and
            frameworks separate marketers who report numbers from those who drive decisions.
            Master these, and you&apos;ll speak the language of CFOs and board rooms.
          </p>
        </div>

        {/* ── LTV / Customer Lifetime Value ── */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft">
                <DollarSign className="h-5 w-5 text-editorial-green" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">Customer Lifetime Value (LTV / CLV)</h3>
                <p className="text-xs text-editorial-muted">The single most important metric in marketing economics</p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              LTV is the total revenue a customer generates across their entire relationship with
              your business. It is the foundation of every acquisition budget decision. If you don&apos;t
              know your LTV, you cannot know how much to spend acquiring a customer.
            </p>

            <div className="rounded-[14px] bg-editorial-canvas p-4 space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-muted">Calculation Methods</p>

              <div className="space-y-2">
                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs font-semibold text-editorial-ink mb-1">Simple LTV</p>
                  <p className="text-sm font-mono text-editorial-green">Average Order Value × Purchase Frequency × Customer Lifespan</p>
                  <p className="text-xs text-editorial-muted mt-1">Example: $68 AOV × 4.2 purchases/year × 2.5 years = <strong>$714 LTV</strong></p>
                </div>

                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs font-semibold text-editorial-ink mb-1">Contribution-Margin LTV</p>
                  <p className="text-sm font-mono text-editorial-green">Simple LTV × Gross Margin %</p>
                  <p className="text-xs text-editorial-muted mt-1">Example: $714 × 65% margin = <strong>$464 profit-based LTV</strong>. This is what CFOs want.</p>
                </div>

                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs font-semibold text-editorial-ink mb-1">Cohort-Based LTV</p>
                  <p className="text-sm font-mono text-editorial-green">Sum of revenue per cohort month ÷ customers in cohort</p>
                  <p className="text-xs text-editorial-muted mt-1">Track customers by acquisition month. Plot cumulative revenue per cohort over time. The curve shape tells you when customers become profitable.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-1">The Golden Rule</p>
                <p className="text-xs text-editorial-ink/80"><strong>LTV:CAC ratio should be ≥ 3:1.</strong> Below 3:1, your unit economics are unsustainable. Above 5:1, you may be under-investing in growth.</p>
              </div>
              <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-amber mb-1">Payback Period</p>
                <p className="text-xs text-editorial-ink/80"><strong>How many months until a customer pays back their acquisition cost.</strong> Target: under 12 months. If payback is 18+ months, cash flow will strangle growth.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── ROAS ── */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-blue-soft">
                <TrendingUp className="h-5 w-5 text-editorial-blue" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">Return on Ad Spend (ROAS)</h3>
                <p className="text-xs text-editorial-muted">The real-time pulse of your paid media performance</p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              ROAS measures the revenue generated for every dollar spent on advertising. It&apos;s
              the metric that determines whether you scale, optimise, or kill a campaign.
              But raw ROAS is often misleading — understanding the nuances is what separates
              good media buyers from great ones.
            </p>

            <div className="rounded-[14px] bg-editorial-canvas p-4 space-y-3">
              <div className="rounded-[10px] bg-white/80 p-3">
                <p className="text-xs font-semibold text-editorial-ink mb-1">Platform ROAS</p>
                <p className="text-sm font-mono text-editorial-blue">Revenue attributed by platform ÷ Ad Spend</p>
                <p className="text-xs text-editorial-muted mt-1">What Meta or Google tells you. <strong>Always inflated</strong> because platforms take credit for conversions that would have happened anyway.</p>
              </div>
              <div className="rounded-[10px] bg-white/80 p-3">
                <p className="text-xs font-semibold text-editorial-ink mb-1">Blended ROAS</p>
                <p className="text-sm font-mono text-editorial-blue">Total Revenue ÷ Total Ad Spend (all channels)</p>
                <p className="text-xs text-editorial-muted mt-1">The big-picture view. Avoids double-counting across platforms. This is what the CFO should see.</p>
              </div>
              <div className="rounded-[10px] bg-white/80 p-3">
                <p className="text-xs font-semibold text-editorial-ink mb-1">Incremental ROAS (iROAS)</p>
                <p className="text-sm font-mono text-editorial-blue">Incremental Revenue (from geo-lift or holdout test) ÷ Ad Spend</p>
                <p className="text-xs text-editorial-muted mt-1"><strong>The gold standard.</strong> Measures only the revenue that would NOT have happened without the ad. Requires geo-lift tests or holdout experiments to calculate.</p>
              </div>
            </div>

            <div className="rounded-[12px] bg-editorial-red-soft/60 border border-editorial-red/10 p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-red mb-1">Critical Nuance</p>
              <p className="text-xs text-editorial-ink/80">A 5x ROAS on branded search looks great, but those customers were already looking for you — you&apos;re paying for conversions that were mostly free. A 2x ROAS on prospecting might be more valuable because it reaches people who had never heard of you. <strong>ROAS without context is dangerous.</strong></p>
            </div>
          </CardContent>
        </Card>

        {/* ── Retention Rate & Repeat Purchase Analysis ── */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#ede9fe]">
                <Heart className="h-5 w-5 text-[#6d28d9]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">Retention Rate & Repeat Purchase Analysis</h3>
                <p className="text-xs text-editorial-muted">Where profit actually lives</p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              Retention is the most underleveraged growth lever. A 5% increase in retention
              rate can increase profits by 25–95% (Bain & Company). Understanding WHICH
              customers come back, WHY, and WHEN is the difference between a business that
              grows and one that leaks.
            </p>

            <div className="rounded-[14px] bg-editorial-canvas p-4 space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-muted">Key Retention Metrics</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs font-semibold text-editorial-ink">Repeat Purchase Rate</p>
                  <p className="text-[11px] font-mono text-[#6d28d9]">Customers who bought 2+ times ÷ Total customers</p>
                  <p className="text-[11px] text-editorial-muted mt-1">E-commerce benchmark: 25-30%. World-class: 40%+.</p>
                </div>
                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs font-semibold text-editorial-ink">Purchase Frequency</p>
                  <p className="text-[11px] font-mono text-[#6d28d9]">Total orders ÷ Unique customers (in a period)</p>
                  <p className="text-[11px] text-editorial-muted mt-1">Tells you how often customers come back. Drives LTV directly.</p>
                </div>
                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs font-semibold text-editorial-ink">Time Between Purchases</p>
                  <p className="text-[11px] font-mono text-[#6d28d9]">Average days between order 1 and order 2</p>
                  <p className="text-[11px] text-editorial-muted mt-1">Use this to time your retention emails. If average is 45 days, send a nudge at day 35.</p>
                </div>
                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs font-semibold text-editorial-ink">Cohort Retention Curve</p>
                  <p className="text-[11px] font-mono text-[#6d28d9]">% of Month-0 customers still active in Month-N</p>
                  <p className="text-[11px] text-editorial-muted mt-1">Plot this curve. If it flattens, you have product-market fit. If it drops to zero, you have a leaky bucket.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Product-Level Analytics ── */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-amber-soft">
                <ShoppingCart className="h-5 w-5 text-editorial-amber" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">Product-Level Analytics</h3>
                <p className="text-xs text-editorial-muted">Entry products, retention drivers, and the portfolio view</p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              Not all products are equal. Some are &quot;entry products&quot; that bring customers in.
              Others are &quot;retention products&quot; that keep them coming back. The best businesses
              understand this portfolio and optimise marketing spend accordingly.
            </p>

            <div className="space-y-3">
              <div className="rounded-[14px] bg-editorial-canvas p-4 space-y-2">
                <h4 className="text-sm font-semibold text-editorial-ink flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-editorial-green text-white text-xs font-bold">1</span>
                  Entry Product Analysis
                </h4>
                <p className="text-xs text-editorial-muted leading-relaxed">
                  Which product does a customer buy FIRST? This is your entry product — the gateway to the brand.
                  Run this query: for every customer, find their first purchase and count by product.
                  Your top entry products should get the most acquisition marketing spend, even if their margins are lower.
                </p>
                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs font-mono text-editorial-muted">SELECT first_product, COUNT(DISTINCT customer_id), AVG(subsequent_orders)</p>
                  <p className="text-xs font-mono text-editorial-muted">FROM orders GROUP BY first_product ORDER BY count DESC</p>
                </div>
                <p className="text-xs text-editorial-muted"><strong>Key insight:</strong> A $15 entry product with 60% second-purchase rate is more valuable than a $50 entry product with 10% second-purchase rate.</p>
              </div>

              <div className="rounded-[14px] bg-editorial-canvas p-4 space-y-2">
                <h4 className="text-sm font-semibold text-editorial-ink flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-editorial-blue text-white text-xs font-bold">2</span>
                  Retention Product Analysis
                </h4>
                <p className="text-xs text-editorial-muted leading-relaxed">
                  Which products appear in REPEAT orders? These are retention drivers — they are what
                  keeps customers in the ecosystem. Often consumables, refills, or items that create habits.
                </p>
                <div className="rounded-[10px] bg-white/80 p-3">
                  <p className="text-xs text-editorial-muted"><strong>Method:</strong> For customers with 3+ orders, which products appear in orders 2-N most frequently? This reveals your &quot;sticky&quot; products — the ones that drive repurchase behaviour.</p>
                </div>
              </div>

              <div className="rounded-[14px] bg-editorial-canvas p-4 space-y-2">
                <h4 className="text-sm font-semibold text-editorial-ink flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-editorial-amber text-white text-xs font-bold">3</span>
                  Cross-Sell & Bundle Analysis
                </h4>
                <p className="text-xs text-editorial-muted leading-relaxed">
                  What products are frequently bought together? Market basket analysis reveals natural bundles.
                  If 40% of customers who buy Product A also buy Product B within 30 days, that&apos;s a
                  bundle opportunity and a post-purchase email trigger.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Customer Journey Measurement ── */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-blue-soft">
                <Route className="h-5 w-5 text-editorial-blue" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">Customer Journey Measurement</h3>
                <p className="text-xs text-editorial-muted">Map, test, and optimise the path from stranger to advocate</p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              The customer journey is not a funnel — it&apos;s a maze. People don&apos;t move linearly from
              awareness to purchase. They research, leave, come back, compare, ask friends, read reviews,
              and buy at 11pm on a Tuesday. Measuring the journey means tracking these messy, real paths.
            </p>

            <div className="space-y-3">
              <div className="rounded-[14px] bg-editorial-canvas p-4 space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-muted">Journey Metrics That Matter</p>
                <div className="space-y-2">
                  {[
                    { metric: "Time to First Purchase", desc: "How many days from first visit to first order. Shorter = better product-market fit or more effective nurture.", benchmark: "E-commerce avg: 3-7 days. Complex B2B: 30-90 days." },
                    { metric: "Touchpoints to Conversion", desc: "How many interactions (ad clicks, emails, site visits) before a purchase. Informs budget allocation and channel attribution.", benchmark: "Average: 6-8 touchpoints. More for high-consideration products." },
                    { metric: "Path Analysis", desc: "The most common sequences of channels before conversion. Shows which channel combinations work together.", benchmark: "Use GA4 Conversion Paths or build in a BI tool." },
                    { metric: "Drop-off Points", desc: "Where in the journey do people leave and never come back? Product page bounce? Cart abandonment? Checkout friction?", benchmark: "Cart abandonment avg: 70%. Checkout abandonment: 20-25%." },
                    { metric: "Assisted Conversions", desc: "Channels that appear in the journey but don't get last-click credit. Often social and content contribute here without being visible in last-click.", benchmark: "Check GA4 Model Comparison report." },
                  ].map((item) => (
                    <div key={item.metric} className="rounded-[10px] bg-white/80 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-editorial-ink">{item.metric}</p>
                          <p className="text-[11px] text-editorial-muted mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-editorial-blue mt-1">{item.benchmark}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[14px] bg-editorial-green-soft/60 border border-editorial-green/10 p-4 space-y-2">
                <p className="text-xs font-semibold text-editorial-green uppercase tracking-[0.12em]">How to Build a Journey Test</p>
                <ol className="space-y-1.5 text-xs text-editorial-ink/80">
                  <li className="flex gap-2"><span className="text-editorial-green font-bold shrink-0">1.</span> Map the current journey from data (GA4 paths, CRM touchpoints, email sequence)</li>
                  <li className="flex gap-2"><span className="text-editorial-green font-bold shrink-0">2.</span> Identify the biggest drop-off point (where are you losing the most people?)</li>
                  <li className="flex gap-2"><span className="text-editorial-green font-bold shrink-0">3.</span> Hypothesise why (too many steps? Wrong message? Missing social proof?)</li>
                  <li className="flex gap-2"><span className="text-editorial-green font-bold shrink-0">4.</span> Design an intervention (add a step, remove a step, change the message)</li>
                  <li className="flex gap-2"><span className="text-editorial-green font-bold shrink-0">5.</span> A/B test the new journey against the old one</li>
                  <li className="flex gap-2"><span className="text-editorial-green font-bold shrink-0">6.</span> Measure: did conversion rate improve? Did time-to-purchase decrease?</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Advanced Attribution ── */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-amber-soft">
                <GitBranch className="h-5 w-5 text-editorial-amber" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">Advanced Attribution & Incrementality</h3>
                <p className="text-xs text-editorial-muted">The hard truth about what actually caused the sale</p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              Attribution answers: &quot;Which marketing touchpoint deserves credit for this sale?&quot;
              But the honest answer is: no model is perfect. The best approach is to use
              multiple lenses and triangulate. Here&apos;s the hierarchy from least to most reliable.
            </p>

            <div className="space-y-2">
              {[
                { level: "Basic", model: "Last-Click Attribution", reliability: 1, desc: "100% credit to the last touchpoint before conversion. Simple but misleading — ignores everything that built awareness and consideration." },
                { level: "Better", model: "Multi-Touch Attribution (MTA)", reliability: 2, desc: "Spreads credit across touchpoints (linear, time-decay, position-based). Better than last-click but still relies on trackable clicks — misses offline, word-of-mouth, and view-through." },
                { level: "Good", model: "Marketing Mix Modelling (MMM)", reliability: 3, desc: "Statistical regression on aggregate data — correlates spend with revenue at the channel level. Works for offline channels too. But slow (needs 2+ years of data) and doesn't capture creative-level insights." },
                { level: "Best", model: "Incrementality Testing", reliability: 4, desc: "Geo-lift tests, holdout groups, or randomised controlled experiments. Measures what would NOT have happened without the marketing. The only method that proves causation, not just correlation." },
              ].map((item) => (
                <div key={item.model} className="rounded-[14px] bg-editorial-canvas p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={cn(
                      "text-[10px] border-transparent",
                      item.reliability === 1 ? "bg-editorial-red-soft text-editorial-red" :
                      item.reliability === 2 ? "bg-editorial-amber-soft text-editorial-amber" :
                      item.reliability === 3 ? "bg-editorial-blue-soft text-editorial-blue" :
                      "bg-editorial-green-soft text-editorial-green"
                    )}>
                      {item.level}
                    </Badge>
                    <p className="text-sm font-semibold text-editorial-ink">{item.model}</p>
                  </div>
                  <p className="text-xs text-editorial-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 p-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-1">The Triangulation Principle</p>
              <p className="text-xs text-editorial-ink/80">No single attribution model tells the full truth. The best practice is to triangulate: use MTA for day-to-day optimisation, MMM for quarterly budget allocation, and incrementality tests for high-stakes decisions. <strong>If all three agree, act with confidence. If they disagree, dig deeper.</strong></p>
            </div>
          </CardContent>
        </Card>

        {/* ── Unit Economics Dashboard ── */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft">
                <Calculator className="h-5 w-5 text-editorial-green" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">Unit Economics: The CMO&apos;s Financial Dashboard</h3>
                <p className="text-xs text-editorial-muted">The numbers that determine whether the business model works</p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              Unit economics answers: &quot;For every customer we acquire, do we make money?&quot; This is
              the bridge between marketing metrics and business metrics. If you can speak
              unit economics fluently, you will earn the CFO&apos;s trust and the CEO&apos;s attention.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[rgba(44,49,59,0.08)]">
                    <th className="text-left py-2 pr-4 font-semibold text-editorial-ink">Metric</th>
                    <th className="text-left py-2 pr-4 font-semibold text-editorial-ink">Formula</th>
                    <th className="text-left py-2 pr-4 font-semibold text-editorial-ink">Target</th>
                    <th className="text-left py-2 font-semibold text-editorial-ink">Why It Matters</th>
                  </tr>
                </thead>
                <tbody className="text-editorial-muted">
                  <tr className="border-b border-[rgba(44,49,59,0.04)]">
                    <td className="py-2.5 pr-4 font-medium text-editorial-ink">CAC</td>
                    <td className="py-2.5 pr-4 font-mono">Total marketing spend ÷ new customers</td>
                    <td className="py-2.5 pr-4">Depends on LTV (target LTV:CAC ≥ 3:1)</td>
                    <td className="py-2.5">How much it costs to acquire one customer</td>
                  </tr>
                  <tr className="border-b border-[rgba(44,49,59,0.04)]">
                    <td className="py-2.5 pr-4 font-medium text-editorial-ink">LTV</td>
                    <td className="py-2.5 pr-4 font-mono">AOV × Frequency × Lifespan × Margin</td>
                    <td className="py-2.5 pr-4">≥ 3× CAC</td>
                    <td className="py-2.5">Total value of one customer relationship</td>
                  </tr>
                  <tr className="border-b border-[rgba(44,49,59,0.04)]">
                    <td className="py-2.5 pr-4 font-medium text-editorial-ink">Payback Period</td>
                    <td className="py-2.5 pr-4 font-mono">CAC ÷ (Monthly revenue per customer × Margin)</td>
                    <td className="py-2.5 pr-4">&lt; 12 months</td>
                    <td className="py-2.5">How quickly you recover acquisition cost</td>
                  </tr>
                  <tr className="border-b border-[rgba(44,49,59,0.04)]">
                    <td className="py-2.5 pr-4 font-medium text-editorial-ink">Contribution Margin</td>
                    <td className="py-2.5 pr-4 font-mono">(Revenue − Variable Costs) ÷ Revenue</td>
                    <td className="py-2.5 pr-4">≥ 60% for D2C</td>
                    <td className="py-2.5">Profit available after variable costs to cover fixed costs</td>
                  </tr>
                  <tr className="border-b border-[rgba(44,49,59,0.04)]">
                    <td className="py-2.5 pr-4 font-medium text-editorial-ink">MER</td>
                    <td className="py-2.5 pr-4 font-mono">Total Revenue ÷ Total Marketing Spend</td>
                    <td className="py-2.5 pr-4">≥ 5× (overall)</td>
                    <td className="py-2.5">Marketing Efficiency Ratio — the simplest big-picture metric</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-medium text-editorial-ink">CAC Payback by Channel</td>
                    <td className="py-2.5 pr-4 font-mono">Channel CAC ÷ Monthly contribution per customer</td>
                    <td className="py-2.5 pr-4">Varies</td>
                    <td className="py-2.5">Reveals which channels acquire customers who pay back fastest</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ── Experimentation Framework ── */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#ede9fe]">
                <FlaskConical className="h-5 w-5 text-[#6d28d9]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-editorial-ink text-lg">Building an Experimentation Engine</h3>
                <p className="text-xs text-editorial-muted">The system that turns measurement into compounding improvement</p>
              </div>
            </div>

            <p className="text-sm text-editorial-muted leading-relaxed">
              Measurement without experimentation is just reporting. The goal is to build a system
              where you constantly test, learn, and compound small improvements into transformative results.
              A 1% weekly improvement compounds to a 67% improvement in a year.
            </p>

            <div className="rounded-[14px] bg-editorial-canvas p-4 space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-muted">The Test Prioritisation Framework</p>
              <div className="space-y-2">
                {[
                  { score: "Impact", q: "If this test wins, how much revenue or efficiency does it create?", weight: "40%" },
                  { score: "Confidence", q: "How confident are we in our hypothesis based on existing data?", weight: "30%" },
                  { score: "Ease", q: "How quickly and cheaply can we run this test?", weight: "30%" },
                ].map((item) => (
                  <div key={item.score} className="rounded-[10px] bg-white/80 p-3 flex items-start gap-3">
                    <Badge variant="outline" className="shrink-0 text-[10px] mt-0.5">{item.weight}</Badge>
                    <div>
                      <p className="text-xs font-semibold text-editorial-ink">{item.score}</p>
                      <p className="text-[11px] text-editorial-muted">{item.q}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-editorial-muted">Score each factor 1–10, then multiply: Impact × Confidence × Ease = ICE score. Run the highest-scoring tests first. This prevents &quot;testing what&apos;s easy&quot; instead of &quot;testing what matters.&quot;</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 p-3 text-center">
                <p className="text-lg font-bold font-serif text-editorial-green">2-3</p>
                <p className="text-[10px] text-editorial-muted uppercase tracking-wider">Tests per week target</p>
              </div>
              <div className="rounded-[12px] bg-editorial-blue-soft/60 border border-editorial-blue/10 p-3 text-center">
                <p className="text-lg font-bold font-serif text-editorial-blue">95%</p>
                <p className="text-[10px] text-editorial-muted uppercase tracking-wider">Statistical confidence threshold</p>
              </div>
              <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 p-3 text-center">
                <p className="text-lg font-bold font-serif text-editorial-amber">100%</p>
                <p className="text-[10px] text-editorial-muted uppercase tracking-wider">Test results documented</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Measure first. Market second.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            The order matters. If you can&apos;t measure it, you can&apos;t improve it, you
            can&apos;t justify it, and you can&apos;t defend the budget when someone asks.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
