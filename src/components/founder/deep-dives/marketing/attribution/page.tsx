"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3, ArrowRight, AlertTriangle, CheckCircle2, Eye, Target,
  DollarSign, Lightbulb, TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

const MODELS = [
  {
    name: "Last-Click Attribution",
    description: "100% credit goes to the last touchpoint before conversion.",
    example: "Customer sees Instagram ad → reads blog → clicks Google ad → buys. Google Ads gets 100% credit.",
    pros: ["Simple to implement", "Easy to understand", "Default in most tools"],
    cons: ["Ignores everything that happened before the final click", "Over-credits bottom-of-funnel channels", "Makes brand and content look worthless"],
    bias: "Over-credits: Search ads, retargeting. Under-credits: Social, content, brand.",
  },
  {
    name: "First-Click Attribution",
    description: "100% credit goes to the first touchpoint that introduced the customer.",
    example: "Customer sees Instagram ad → reads blog → clicks Google ad → buys. Instagram gets 100% credit.",
    pros: ["Values discovery and awareness", "Useful for understanding acquisition sources"],
    cons: ["Ignores the nurture and conversion journey", "Over-credits top-of-funnel channels"],
    bias: "Over-credits: Social, display, brand. Under-credits: Search, email, retargeting.",
  },
  {
    name: "Linear Attribution",
    description: "Credit is split equally across every touchpoint in the journey.",
    example: "4 touchpoints = 25% credit each. Every interaction gets the same weight.",
    pros: ["Acknowledges the full journey", "No single channel is ignored"],
    cons: ["Treats all touchpoints as equally important (they're not)", "A casual glance at a banner ad gets the same credit as a demo request"],
    bias: "Moderately fair but lacks nuance. Better than single-touch but still simplistic.",
  },
  {
    name: "Time-Decay Attribution",
    description: "Touchpoints closer to conversion get more credit. Earlier touchpoints get less.",
    example: "Instagram ad (5%) → Blog (10%) → Email (25%) → Google ad (60%). Recency is rewarded.",
    pros: ["Recognises that recent interactions are more influential", "More realistic than linear"],
    cons: ["Still undervalues awareness and discovery", "The discount rate is often arbitrary"],
    bias: "Favours bottom-funnel. Better than last-click but still discounts brand work.",
  },
  {
    name: "Data-Driven / Algorithmic",
    description: "Machine learning analyses your actual conversion paths and assigns credit based on statistical impact.",
    example: "The algorithm finds that email after blog visit converts at 3x the normal rate — email gets extra credit for those paths.",
    pros: ["Most accurate", "Based on your actual data, not assumptions", "Accounts for cross-channel effects"],
    cons: ["Requires significant data volume (1000+ conversions)", "Black box — harder to explain to stakeholders", "Only available in advanced tools"],
    bias: "Least biased when data is sufficient. The gold standard for mature teams.",
  },
]

const INCREMENTALITY_TESTS = [
  {
    test: "Geo holdout test",
    how: "Run ads in City A but not City B (similar demographics). Compare conversion rates between the two.",
    measures: "The true lift from advertising — what would NOT have happened without the ad.",
    example: "You run Google Ads in Sydney but not Melbourne for 4 weeks. Sydney's sales lift 12% vs Melbourne's 3% organic growth. True incremental lift: 9%.",
  },
  {
    test: "Ghost ads / PSA test",
    how: "Show real ads to one group and public service announcements (PSAs) to a control group. Both groups are targeted identically.",
    measures: "Whether the ad creative actually changed behaviour or whether those people would have converted anyway.",
    example: "Retargeting test: 60% of the 'retargeted' group would have bought anyway. Real retargeting lift: only 40% of reported conversions.",
  },
  {
    test: "Spend on/off test",
    how: "Pause a channel entirely for 2-4 weeks and measure the impact on total conversions.",
    measures: "The true dependency on a specific channel. Often reveals that some 'high-performing' channels aren't actually driving incremental sales.",
    example: "Pause branded search ads for 2 weeks. If organic search picks up 90% of those clicks, branded search was mostly capturing existing demand — not creating it.",
  },
  {
    test: "Conversion lift study",
    how: "Platform-native experiments (Meta, Google) that split audiences into exposed vs holdout groups.",
    measures: "The incremental lift from seeing the ad versus not seeing it.",
    example: "Meta conversion lift study shows a 4.2% lift in purchases from ad exposure. That's the true incremental value — not the last-click attribution number.",
  },
]

export default function AttributionPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Foundation Layer</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Attribution vs Incrementality
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Attribution asks &quot;which channel gets credit?&quot; Incrementality asks
          &quot;did this actually cause the sale?&quot; Understanding the difference prevents
          you from over-investing in channels that look good on paper but aren&apos;t
          actually driving growth.
        </p>
      </div>

      {/* The core problem */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-3">
          <h3 className="font-serif font-semibold text-editorial-ink">The problem with attribution</h3>
          <p className="text-sm text-editorial-muted leading-relaxed">
            A customer sees your Instagram ad on Monday, reads your blog on Wednesday,
            gets your email on Thursday, and Googles your brand name on Friday to buy.
            Which channel &quot;caused&quot; the sale? All of them contributed. None of them is
            the whole story. Attribution models try to assign credit — but every model
            has a bias, and that bias affects where you spend money.
          </p>
          <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
            <p className="text-xs text-editorial-amber">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              <strong>The danger:</strong> If you only use last-click attribution, you&apos;ll
              cut your Instagram and content budget (they look like they do nothing) and
              pour money into Google branded search (which gets all the credit but was
              just the final step). You&apos;ll starve the top of your funnel and wonder
              why leads dried up 3 months later.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Attribution models */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Attribution models compared</h2>
        <div className="space-y-3">
          {MODELS.map((model) => (
            <Card key={model.name}>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink">{model.name}</h3>
                <p className="text-sm text-editorial-muted">{model.description}</p>
                <div className="rounded-[10px] bg-editorial-canvas border border-[rgba(44,49,59,0.06)] px-3 py-2">
                  <p className="text-xs text-editorial-ink/70"><strong>Example:</strong> {model.example}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    {model.pros.map((p) => (
                      <div key={p} className="flex items-start gap-1.5 text-xs text-editorial-green">
                        <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" /> {p}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {model.cons.map((c) => (
                      <div key={c} className="flex items-start gap-1.5 text-xs text-editorial-red">
                        <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" /> {c}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-editorial-blue"><Eye className="h-3 w-3 inline mr-1" /><strong>Bias:</strong> {model.bias}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Incrementality */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">
          Incrementality: the harder but more honest question
        </h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          Attribution tells you who touched the ball. Incrementality tells you who
          actually scored the goal. The question isn&apos;t &quot;which channel was last?&quot;
          — it&apos;s &quot;would this sale have happened WITHOUT this channel?&quot;
        </p>
        <div className="space-y-3">
          {INCREMENTALITY_TESTS.map((test) => (
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
                    <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted block mb-1">How it works</span>
                    <p className="text-editorial-ink/80 leading-relaxed">{test.how}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted block mb-1">What it measures</span>
                    <p className="text-editorial-ink/80 leading-relaxed">{test.measures}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted block mb-1">Example</span>
                    <p className="text-editorial-ink/80 leading-relaxed">{test.example}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Decision framework */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-serif font-semibold text-editorial-ink text-lg">When to use what</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-[12px] bg-editorial-blue-soft/60 border border-editorial-blue/10 p-3 space-y-1">
              <p className="text-xs text-editorial-blue font-medium">Use attribution when...</p>
              <p className="text-editorial-ink/80 text-xs">You need to make quick daily/weekly optimisation decisions within a channel. Which ad set is performing? Which keyword converts?</p>
            </div>
            <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 p-3 space-y-1">
              <p className="text-xs text-editorial-green font-medium">Use incrementality when...</p>
              <p className="text-editorial-ink/80 text-xs">You need to make strategic budget allocation decisions. Should we invest more in social? Is branded search worth the spend? What&apos;s the true value of display?</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Attribution is your compass. Incrementality is your map.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            Use both. Attribution for daily navigation. Incrementality for strategic
            direction. Neither alone tells the full truth.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
