"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FlaskConical, BarChart3, Target, CheckCircle2, AlertTriangle,
  ArrowRight, Lightbulb, TrendingUp, Users, Eye, Zap,
  FileText, Presentation, DollarSign, Clock, ChevronDown,
  Calculator, Scale, Layers, Brain, Sparkles, Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

/* --- Tab system --- */
type TabId = "why" | "method" | "stats" | "types" | "culture" | "reporting" | "templates"

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "why", label: "Why Experiment", icon: Lightbulb },
  { id: "method", label: "The Method", icon: FlaskConical },
  { id: "stats", label: "Measuring Results", icon: Calculator },
  { id: "types", label: "Test Types", icon: Layers },
  { id: "culture", label: "Building a Culture", icon: Users },
  { id: "reporting", label: "Reporting Results", icon: Presentation },
  { id: "templates", label: "Templates", icon: FileText },
]

/* --- WHY EXPERIMENT --- */
const WHY_POINTS = [
  { icon: DollarSign, title: "Stop guessing on outreach", detail: "Without testing, you're sending 500 cold emails based on a hunch. One A/B test on a subject line can reveal that your preferred version gets 40% fewer opens. The test costs you an hour. The assumption costs you 200 missed meetings." },
  { icon: TrendingUp, title: "Compound small improvements", detail: "A 5% improvement in connect rate per month compounds to 80% improvement in a year. Testing isn't about finding one big win — it's about systematically removing friction from your sales process, one experiment at a time." },
  { icon: Shield, title: "Separate opinions from evidence", detail: "The VP thinks a consultative opener works best. The SDR manager prefers a direct approach. The top AE swears by a provocative question. None of them are wrong — they just haven't tested. Data settles debates." },
  { icon: Brain, title: "Build institutional knowledge", detail: "Every test teaches something. Even 'failed' tests are valuable because they tell you what doesn't work with your ICP. Over time, your team builds a library of proven insights that new hires can learn from." },
  { icon: Users, title: "Empower the whole team", detail: "When anyone can propose a hypothesis and run a test, the best ideas come from everywhere — the new SDR might discover the best cold call opener because they see things with fresh eyes. Testing democratises decision-making." },
  { icon: Eye, title: "Catch problems before they scale", detail: "A small test with 50 prospects can reveal a messaging problem before you roll it out to 5,000. Testing is the cheapest form of insurance in your sales motion." },
]

/* --- THE SCIENTIFIC METHOD FOR SALES --- */
const METHOD_STEPS = [
  {
    step: 1, title: "Observe", icon: Eye,
    description: "Notice a pattern, problem, or opportunity in your sales data. 'Our cold email reply rate is 3%, but top performers get 8%.' or 'Nobody books a second meeting after the initial discovery call.'",
    tip: "Start with your CRM data. Look for low connect rates, drop-offs between pipeline stages, high no-show rates, or deals stalling at specific stages. These are your testing goldmines.",
  },
  {
    step: 2, title: "Hypothesise", icon: Lightbulb,
    description: "Form a specific, testable prediction. Use the format: 'If we [change], then [metric] will [improve/decrease] because [reason].'",
    tip: "Bad hypothesis: 'Better emails will get more replies.' Good hypothesis: 'If we lead with a specific pain point rather than a product feature, reply rates will increase by 15% because prospects care about their problems, not our features.'",
    example: "If we change the cold call opener from 'Do you have 30 seconds?' to a specific business trigger, connect-to-conversation rate will increase by 20% because relevance earns attention.",
  },
  {
    step: 3, title: "Design the test", icon: FlaskConical,
    description: "Decide: what are you testing (the variable), what are you measuring (the metric), how long will it run, and how many prospects/calls do you need for a reliable result?",
    tip: "Change ONE variable at a time. If you change the subject line AND the email body AND the CTA simultaneously, you won't know which change caused the result.",
  },
  {
    step: 4, title: "Run the experiment", icon: Zap,
    description: "Split your prospect list randomly into control (original approach) and variant (the new approach). Ensure equal distribution across similar segments. Don't peek at results too early.",
    tip: "Use your outreach platform's built-in A/B testing: Salesloft, Outreach, Apollo, or even a simple spreadsheet split. These handle the randomisation for you.",
  },
  {
    step: 5, title: "Analyse results", icon: BarChart3,
    description: "Did the variant beat the control? By how much? Is the difference statistically significant given your sample size? What's the practical significance — is the improvement worth changing the whole team's approach?",
    tip: "A 0.5% improvement in reply rate might not be worth retraining the team. But a 3% improvement in reply rate across 10,000 emails per month = 300 more conversations. Always consider practical significance.",
  },
  {
    step: 6, title: "Decide and document", icon: FileText,
    description: "Implement the winner across the team, document what you learned (including why you think it worked), and feed the insight into your next hypothesis. Even if the test 'failed', document the learning.",
    tip: "Keep a test log. Every test should have: hypothesis, result, sample size, duration, and the key learning. This becomes your sales team's most valuable knowledge base.",
  },
]

/* --- STATISTICAL SIGNIFICANCE --- */
const STATS_CONCEPTS = [
  {
    term: "Statistical significance",
    plain: "The confidence that your result is real, not random luck.",
    detail: "When we say a result is 'statistically significant at p < 0.05', it means there's less than a 5% chance the result happened by random variation. In other words, we're 95% confident the change actually caused the difference in your sales metrics.",
    analogy: "Imagine your top AE closes 5 deals in a row. Could be skill. Could be luck. But if they close 50 out of 60, that's almost certainly skill. Statistical significance tells you when to trust the pattern.",
  },
  {
    term: "p-value",
    plain: "The probability that your result happened by chance.",
    detail: "p = 0.05 means a 5% chance the result is random. p = 0.01 means 1% chance. In sales testing, we typically use p < 0.05 as the threshold. Below this, we consider the result 'significant'. Above it, we need more data.",
    analogy: "Think of it as a lie detector for your data. A low p-value means your data is probably telling the truth. A high p-value means the difference could just be noise.",
  },
  {
    term: "Sample size",
    plain: "How many prospects/calls you need in the test for reliable results.",
    detail: "Too small a sample and you'll get noisy, unreliable results. For email A/B tests, you typically need 500-1,000 sends per variant. For call script tests, you might need 100-200 calls per variant. The exact number depends on your baseline rate and the improvement you're testing for.",
    analogy: "Testing a call script on 5 calls gives you anecdotes. Testing on 50 gives you insight. Testing on 200 gives you confidence. Sample size determines whether you have a story or evidence.",
  },
  {
    term: "Confidence interval",
    plain: "The range within which the true result probably falls.",
    detail: "'The new email gets 8.2% reply rate, plus or minus 1.5%' means the true reply rate is likely between 6.7% and 9.7%. Wider intervals mean less certainty. Narrower intervals mean more data and more confidence.",
    analogy: "Sales forecast: '$800K-$1.2M this quarter' is a wide confidence interval. '$950K-$1.05M' is narrow and much more useful. More data = narrower interval = better decisions.",
  },
  {
    term: "Type I Error (False positive)",
    plain: "Thinking something works when it actually doesn't.",
    detail: "You declare the new cold call script the winner, roll it out to the whole team, and later realise it was just random variation. This happens when you peek at results too early or use too loose a threshold.",
    analogy: "Like seeing an SDR crush quota in their first month and assuming they'll always perform — it might just be beginner's luck with a good territory.",
  },
  {
    term: "Type II Error (False negative)",
    plain: "Thinking something doesn't work when it actually does.",
    detail: "You end a test too early and call it 'no difference', missing a real improvement. This happens when sample sizes are too small to detect the effect.",
    analogy: "Like trying a new discovery framework on 3 calls, finding it 'okay', and going back to the old way — when it actually works much better over 50 calls.",
  },
  {
    term: "Minimum Detectable Effect (MDE)",
    plain: "The smallest improvement worth detecting.",
    detail: "Before running a test, decide: what's the smallest lift that would be worth changing your process? A 1% improvement in reply rate across 50,000 emails/month is 500 more conversations. A 1% improvement across 500 emails/month is 5. Set your MDE based on the business impact.",
    analogy: "If you're measuring your AE team's win rate, you care about 2% changes. If you're measuring individual cold call connect rates, you might only care about 5%+ changes. Set your scale to match what matters.",
  },
]

/* --- TEST TYPES --- */
const TEST_TYPES = [
  {
    name: "A/B Email Test",
    description: "The simplest and most common. Split your prospect list 50/50 between two email variants. Test ONE change — subject line, opener, CTA, or send time.",
    bestFor: "Subject lines, email openers, CTAs, personalisation approaches, send times, email length.",
    example: "Email A: 'Quick question about [Company]' subject. Email B: '[Pain point] at [Company]?' subject. Send to 500 prospects each. Measure reply rate.",
    pros: ["Easy to set up in any outreach tool", "Clear cause and effect", "Fast to reach significance"],
    cons: ["Can only test one change at a time", "Slower for complex multi-touch sequences"],
    traffic: "Low — 500-1,000 sends per variant",
  },
  {
    name: "Call Script Test",
    description: "Test different opening lines, questions, or talk tracks on live calls. Requires discipline — reps must stick to the script for the assigned variant.",
    bestFor: "Cold call openers, discovery questions, objection responses, voicemail scripts, pricing presentations.",
    example: "Script A: 'Hi [Name], we help companies like [Similar Company] with [outcome].' Script B: 'Hi [Name], I noticed [trigger event]. Is [pain point] something your team is dealing with?' Track connect-to-meeting rate.",
    pros: ["Tests the most impactful part of sales — live conversations", "Immediate feedback", "Builds rep confidence in what works"],
    cons: ["Harder to control — reps naturally deviate", "Requires larger sample sizes (100+ calls per variant)", "Coaching needed to maintain script fidelity"],
    traffic: "Medium — 100-200 calls per variant",
  },
  {
    name: "Multi-Step Sequence Test",
    description: "Test two entirely different outreach sequences — different number of touches, different channels, different timing, different messaging themes.",
    bestFor: "When you want to test fundamentally different outreach strategies, not just individual message tweaks.",
    example: "Sequence A: 5-touch email-only over 14 days. Sequence B: 7-touch multi-channel (email + call + LinkedIn) over 21 days. Measure meetings booked per 100 prospects enrolled.",
    pros: ["Tests the full buyer journey, not just one touchpoint", "Can reveal that channel mix matters more than message copy"],
    cons: ["Harder to attribute which element caused the difference", "Requires larger sample sizes and longer test periods"],
    traffic: "Medium-High — 200-500 prospects per variant",
  },
  {
    name: "Demo Format Test",
    description: "Test different demo structures — show vs tell, problem-first vs product-first, interactive vs presentation, short vs long.",
    bestFor: "Demo flow, slide structure, pricing reveal timing, stakeholder engagement approaches.",
    example: "Demo A: Traditional walkthrough (45 min, feature-by-feature). Demo B: Problem-first discovery demo (30 min, only show features that address stated pain). Measure demo-to-proposal conversion rate.",
    pros: ["Directly impacts win rate and deal velocity", "Tests the highest-leverage moment in the sales cycle"],
    cons: ["Smaller sample sizes (deals are expensive)", "Harder to standardise — every prospect is different", "Takes weeks to see results"],
    traffic: "Low — 20-50 demos per variant, but each is high-value",
  },
  {
    name: "Pricing Presentation Test",
    description: "Test how you present pricing — anchoring strategies, packaging options, discount structures, payment terms.",
    bestFor: "Price anchoring, package naming, discount thresholds, proposal layouts, ROI calculator placement.",
    example: "Pricing A: Show 3 tiers, highlight middle tier. Pricing B: Show custom package first, then reveal standard pricing as alternative. Measure average deal size and close rate.",
    pros: ["Directly impacts revenue per deal", "Can reveal massive improvements in deal size"],
    cons: ["Requires careful controls — different deal sizes confound results", "Sales leadership must approve pricing experiments"],
    traffic: "Low — 30-50 proposals per variant",
  },
]

/* --- CULTURE OF EXPERIMENTATION --- */
const CULTURE_PILLARS = [
  {
    pillar: "Make it safe to fail",
    icon: Shield,
    description: "If reps are punished for tests that don't win, they'll only test safe, obvious ideas. The breakthrough insights come from bold hypotheses. The best sales orgs test everything — including approaches they expect to fail — because every test teaches something.",
    practice: "Celebrate the learning, not just the win. Share 'failed' tests in team meetings. Reframe: there are no failed tests, only tests that confirmed or rejected a hypothesis.",
  },
  {
    pillar: "Test velocity over test size",
    icon: Zap,
    description: "A team that runs 10 small tests per month will learn faster than a team that runs 1 perfect test per quarter. Speed of learning is the competitive advantage.",
    practice: "Set a target: 2-4 tests per week across the sales org. Most should be small and fast (email subject lines, call openers). Reserve complex tests (demo formats, pricing) for quarterly experiments.",
  },
  {
    pillar: "Everyone can propose a hypothesis",
    icon: Users,
    description: "The best test ideas often come from SDRs (they hear the first objection), customer success (they know what customers actually value), and new hires (they see things with fresh eyes). Don't limit ideation to sales leadership.",
    practice: "Create a shared 'Test Backlog' in Notion or your CRM. Anyone can add a hypothesis. Review and prioritise weekly in your sales standup.",
  },
  {
    pillar: "Prioritise with ICE scoring",
    icon: Target,
    description: "Not all test ideas are equal. Score each on: Impact (how much could this move the metric?), Confidence (how sure are you it'll work?), and Ease (how easy is it to run?). Execute high-ICE tests first.",
    practice: "Score each hypothesis 1-10 on Impact, Confidence, and Ease. Average = ICE score. Run the highest scores first. Review and re-score monthly.",
  },
  {
    pillar: "Document everything",
    icon: FileText,
    description: "A test without documentation is wasted effort. If a top AE leaves, the knowledge leaves too. Every test should have: hypothesis, methodology, results, learning, and next action.",
    practice: "Maintain a shared experiment log. Monthly, review the top 5 learnings with the broader team. Quarterly, compile a 'What We Know About Our Buyers' report.",
  },
  {
    pillar: "Connect tests to pipeline outcomes",
    icon: DollarSign,
    description: "Leadership doesn't care that you ran 50 tests. They care that those tests generated $500K in additional pipeline. Always tie experiment results back to pipeline and revenue impact.",
    practice: "For every winning test, calculate: estimated annual pipeline impact = (lift x baseline meetings/month x average deal size x 12). Present this number, not just the percentage lift.",
  },
]

/* --- REPORTING FRAMEWORK --- */
const REPORTING_LEVELS = [
  {
    audience: "Your team (Weekly)",
    format: "Slack update or standup",
    includes: [
      "Tests launched this week and their hypotheses",
      "Tests concluded — results and next steps",
      "Test backlog prioritisation changes",
      "Quick wins implemented from last week's results",
    ],
    tone: "Tactical, fast, action-oriented. 2-minute update.",
  },
  {
    audience: "Sales leadership (Monthly)",
    format: "5-slide deck or 1-page memo",
    includes: [
      "Number of tests run, win rate, and velocity trend",
      "Top 3 winning tests with pipeline impact estimates",
      "Top 3 learnings (even from 'losing' tests)",
      "Next month's testing roadmap and priorities",
      "Cumulative impact: total incremental pipeline from testing program",
    ],
    tone: "Strategic, insight-led. Focus on 'what did we learn about our buyers and what's it worth?'",
  },
  {
    audience: "Executive / Board (Quarterly)",
    format: "Executive memo or 3-slide appendix to sales QBR",
    includes: [
      "Testing program ROI: investment in testing vs incremental pipeline generated",
      "Key strategic insights that changed sales approach",
      "Year-over-year velocity and win rate trends",
      "How testing supports the broader revenue strategy",
    ],
    tone: "Business impact. Tie to pipeline, revenue, and win rate. 'Our testing program generated $1.2M in incremental pipeline this quarter.'",
  },
]

const RESULT_TEMPLATE = {
  sections: [
    { label: "Hypothesis", content: "If we [change], then [metric] will [improve] because [reason]." },
    { label: "Test design", content: "A/B test. Variable: [what changed]. Control: [original]. Variant: [new version]. Metric: [primary KPI]. Duration: [X days]. Sample: [N prospects/calls per variant]." },
    { label: "Results", content: "Control: [metric value]. Variant: [metric value]. Lift: [+/- X%]. Statistical significance: [p-value]. Confidence interval: [range]." },
    { label: "Winner", content: "[Control/Variant]. Roll out to team? [Yes/No]. If no, why not (practical significance too low, too hard to train, etc.)." },
    { label: "Pipeline impact", content: "Estimated annual impact: [lift] x [baseline conversations/month] x [average deal size] x [win rate] x 12 = $[amount] additional pipeline." },
    { label: "Key learning", content: "What did this teach us about our buyers, our messaging, or our process? How does this inform future tests?" },
    { label: "Next test", content: "Based on this learning, the next hypothesis to test is: [describe]." },
  ],
}

/* --- SAMPLE SIZE CALCULATOR --- */
function SampleSizeGuide() {
  return (
    <div className="space-y-3">
      <h4 className="font-serif font-semibold text-editorial-ink text-sm">Quick sample size reference</h4>
      <p className="text-xs text-editorial-muted">How many prospects/calls per variant you need, based on your baseline rate and the minimum lift you want to detect (at 95% confidence, 80% power):</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[rgba(44,49,59,0.08)]">
              <th className="text-left py-2 pr-4 text-editorial-muted font-medium">Baseline Rate</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">10% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">20% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">30% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">50% lift</th>
            </tr>
          </thead>
          <tbody className="text-editorial-ink/80">
            {[
              { cr: "2% (cold email reply)", s10: "~19K", s20: "~5K", s30: "~2.2K", s50: "~800" },
              { cr: "5% (connect rate)", s10: "~7.5K", s20: "~1.9K", s30: "~850", s50: "~310" },
              { cr: "10% (meeting rate)", s10: "~3.5K", s20: "~900", s30: "~400", s50: "~150" },
              { cr: "20% (demo-to-proposal)", s10: "~1.6K", s20: "~400", s30: "~180", s50: "~65" },
              { cr: "30% (win rate)", s10: "~900", s20: "~230", s30: "~100", s50: "~40" },
            ].map((row) => (
              <tr key={row.cr} className="border-b border-[rgba(44,49,59,0.04)]">
                <td className="py-2 pr-4 font-medium">{row.cr}</td>
                <td className="py-2 px-3 text-center">{row.s10}</td>
                <td className="py-2 px-3 text-center font-medium text-editorial-green">{row.s20}</td>
                <td className="py-2 px-3 text-center">{row.s30}</td>
                <td className="py-2 px-3 text-center">{row.s50}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-editorial-muted">
        Per variant. For an A/B test, you need this number for EACH variant (control + variant). Highlighted column (20% lift) is a practical starting point for most sales tests.
      </p>
    </div>
  )
}

/* --- PAGE --- */
export default function ExperimentationPage() {
  const [activeTab, setActiveTab] = useState<TabId>("why")

  return (
    <div className="container py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Deep Dive
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Sales Experimentation
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The best salespeople don&apos;t guess — they test. This page teaches
          the scientific method applied to sales: how to A/B test outreach, call
          scripts, email subject lines, demo formats, and pricing presentations.
          Testing what works in sales conversations is how you compound performance.
        </p>
      </div>

      {/* Pill nav */}
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
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* --- WHY --- */}
        {activeTab === "why" && (
          <motion.div key="why" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Why experimentation separates good from great</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Every sales team makes decisions. The best ones make decisions backed
              by evidence. The difference between a $150K AE and a $250K AE
              is often this: one guesses, the other tests.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_POINTS.map((item) => (
                <Card key={item.title} className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                        <item.icon className="h-4 w-4 text-editorial-green" />
                      </div>
                      <h3 className="font-serif font-semibold text-editorial-ink text-sm">{item.title}</h3>
                    </div>
                    <p className="text-xs text-editorial-muted leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="glass-panel-strong">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-serif font-bold text-editorial-green">2-4 tests per week</p>
                <p className="text-sm text-editorial-muted max-w-md mx-auto">
                  That&apos;s what top-performing sales teams run. Not 2-4 per quarter.
                  Per week. Velocity of learning is the single biggest predictor of
                  sales team performance.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* --- METHOD --- */}
        {activeTab === "method" && (
          <motion.div key="method" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">The scientific method for sales</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              This is the same method scientists have used for 400 years. Applied to sales, it
              turns guesswork into a systematic improvement engine.
            </p>
            <div className="space-y-4">
              {METHOD_STEPS.map((step) => (
                <Card key={step.step}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-editorial-green text-white text-sm font-bold font-serif">
                        {step.step}
                      </span>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <step.icon className="h-4 w-4 text-editorial-green" />
                          <h3 className="font-serif font-semibold text-editorial-ink">{step.title}</h3>
                        </div>
                        <p className="text-sm text-editorial-muted leading-relaxed">{step.description}</p>
                        <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                          <p className="text-xs text-editorial-amber"><strong>Tip:</strong> {step.tip}</p>
                        </div>
                        {step.example && (
                          <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                            <p className="text-xs text-editorial-green"><strong>Example:</strong> {step.example}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- STATS --- */}
        {activeTab === "stats" && (
          <motion.div key="stats" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Measuring results — explained simply</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              You don&apos;t need a statistics degree. You need to understand 7 concepts
              well enough to make good decisions and avoid common traps.
            </p>
            <div className="space-y-4">
              {STATS_CONCEPTS.map((concept) => (
                <Card key={concept.term}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif font-semibold text-editorial-ink">{concept.term}</h3>
                      <Badge variant="secondary" className="text-[10px] shrink-0">{concept.plain}</Badge>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{concept.detail}</p>
                    <div className="rounded-[12px] bg-editorial-blue-soft/60 border border-editorial-blue/10 px-3 py-2">
                      <p className="text-xs text-editorial-blue"><strong>Analogy:</strong> {concept.analogy}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sample size reference */}
            <Card className="glass-panel-strong">
              <CardContent className="p-6">
                <SampleSizeGuide />
              </CardContent>
            </Card>

            {/* Common mistakes */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-red flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> The 5 deadly sins of sales testing
                </h3>
                {[
                  { sin: "Peeking too early", fix: "Decide the sample size and duration BEFORE the test. Don't check results after 20 emails and declare a winner." },
                  { sin: "Testing too many things at once", fix: "One variable per test. If you change the subject line AND the body AND the CTA, you learned nothing about what worked." },
                  { sin: "Ignoring sample size requirements", fix: "Running a call script test with 10 calls per variant is anecdote, not evidence. Use the guide above." },
                  { sin: "Declaring winners without significance", fix: "If it's not statistically significant, run it longer or accept that there's no meaningful difference." },
                  { sin: "Not documenting results", fix: "A test without a write-up is a test you'll have to run again. Document everything, including 'no difference' results." },
                ].map((item) => (
                  <div key={item.sin} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-start gap-1.5 text-xs text-editorial-red">
                      <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" /> <strong>{item.sin}</strong>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs text-editorial-green">
                      <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" /> {item.fix}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* --- TEST TYPES --- */}
        {activeTab === "types" && (
          <motion.div key="types" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Types of sales experiments</h2>
            <div className="space-y-4">
              {TEST_TYPES.map((test) => (
                <Card key={test.name}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif font-semibold text-editorial-ink text-lg">{test.name}</h3>
                      <Badge variant="secondary" className="text-[10px] shrink-0">Sample: {test.traffic}</Badge>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{test.description}</p>
                    <div className="rounded-[10px] bg-editorial-canvas border border-[rgba(44,49,59,0.06)] px-3 py-2">
                      <p className="text-xs text-editorial-ink/80"><strong>Best for:</strong> {test.bestFor}</p>
                    </div>
                    <div className="rounded-[10px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                      <p className="text-xs text-editorial-green"><strong>Example:</strong> {test.example}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        {test.pros.map((p) => (
                          <div key={p} className="flex items-start gap-1.5 text-xs text-editorial-green">
                            <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" /> {p}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        {test.cons.map((c) => (
                          <div key={c} className="flex items-start gap-1.5 text-xs text-editorial-amber">
                            <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" /> {c}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- CULTURE --- */}
        {activeTab === "culture" && (
          <motion.div key="culture" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Building a culture of experimentation</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Tools and knowledge aren&apos;t enough. The highest-performing sales teams
              have a culture where testing is the default way of improving — not
              a special event.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CULTURE_PILLARS.map((item) => (
                <Card key={item.pillar} className="hover:-translate-y-[1px] hover:shadow-editorial-hover transition-all duration-200">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-editorial-blue-soft">
                        <item.icon className="h-4 w-4 text-editorial-blue" />
                      </div>
                      <h3 className="font-serif font-semibold text-editorial-ink text-sm">{item.pillar}</h3>
                    </div>
                    <p className="text-xs text-editorial-muted leading-relaxed">{item.description}</p>
                    <div className="rounded-[10px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-0.5">In practice</p>
                      <p className="text-xs text-editorial-ink/80">{item.practice}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- REPORTING --- */}
        {activeTab === "reporting" && (
          <motion.div key="reporting" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Reporting results like a top performer</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Running tests is half the job. The other half is communicating results in
              a way that drives action and builds trust with sales leadership.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {REPORTING_LEVELS.map((level) => (
                <Card key={level.audience} className="hover:-translate-y-[1px] hover:shadow-editorial-hover transition-all duration-200">
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-serif font-semibold text-editorial-ink text-sm">{level.audience}</h3>
                    <Badge variant="secondary" className="text-[10px]">{level.format}</Badge>
                    <div className="space-y-1.5">
                      {level.includes.map((item) => (
                        <div key={item} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                          <CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" /> {item}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-[10px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-1.5">
                      <p className="text-xs text-editorial-amber"><strong>Tone:</strong> {level.tone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* The golden rule */}
            <Card className="glass-panel-strong">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink text-lg">
                  The reporting formula that earns trust
                </h3>
                <p className="text-sm text-editorial-muted leading-relaxed max-w-2xl">
                  Every test result should answer three questions in this order:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { num: "1", q: "What did we learn?", detail: "The insight, not the data. 'Prospects respond 2x better to pain-based openers than feature-based openers.'" },
                    { num: "2", q: "What's it worth?", detail: "The business impact. 'Applied across all outbound sequences, this would generate an estimated 40 additional meetings per month — $600K in pipeline.'" },
                    { num: "3", q: "What do we do next?", detail: "The action. 'We're rolling out pain-based openers across all SDR sequences and testing the same principle in AE discovery calls next.'" },
                  ].map((item) => (
                    <div key={item.num} className="rounded-[14px] bg-editorial-green-soft/60 border border-editorial-green/10 p-4 space-y-1.5">
                      <span className="text-xl font-serif font-bold text-editorial-green">{item.num}</span>
                      <h4 className="font-serif font-semibold text-editorial-ink text-sm">{item.q}</h4>
                      <p className="text-xs text-editorial-ink/80 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* --- TEMPLATES --- */}
        {activeTab === "templates" && (
          <motion.div key="templates" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Test result template</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Use this template for every test you run. Consistency in documentation
              is what separates professional sales experimentation from ad-hoc guessing.
            </p>

            <Card className="glass-panel-strong">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-serif font-semibold text-editorial-ink">
                  Experiment Report Template
                </h3>
                <div className="space-y-3">
                  {RESULT_TEMPLATE.sections.map((section) => (
                    <div key={section.label} className="rounded-[12px] border border-[rgba(44,49,59,0.08)] p-3 space-y-1">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-green">{section.label}</p>
                      <p className="text-xs text-editorial-ink/60 font-mono leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stakeholder deck template */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-serif font-semibold text-editorial-ink">
                  Monthly testing report — slide structure
                </h3>
                <p className="text-xs text-editorial-muted">Use this 5-slide structure for your monthly sales leadership update:</p>
                <div className="space-y-2">
                  {[
                    { slide: 1, title: "Testing program health", content: "Tests run, win rate, velocity trend (chart). One sentence: 'We ran X tests this month with a Y% win rate, up from last month.'" },
                    { slide: 2, title: "Top 3 winners", content: "For each: one-line hypothesis, result, estimated pipeline impact. Visual: before/after metrics if applicable." },
                    { slide: 3, title: "Top 3 learnings", content: "Include tests that 'lost' — these are often the most valuable insights. Frame as: 'We learned that...' not 'This test failed.'" },
                    { slide: 4, title: "Cumulative impact", content: "Running total of incremental pipeline from testing program. Chart showing growth over time. ROI: testing investment vs pipeline generated." },
                    { slide: 5, title: "Next month's roadmap", content: "Top 5 tests planned, ranked by ICE score. What metric each targets. Expected timeline." },
                  ].map((slide) => (
                    <div key={slide.slide} className="flex items-start gap-3 rounded-[12px] bg-editorial-canvas border border-[rgba(44,49,59,0.06)] p-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-editorial-blue text-white text-xs font-bold">
                        {slide.slide}
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-editorial-ink">{slide.title}</p>
                        <p className="text-xs text-editorial-muted leading-relaxed">{slide.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ICE scoring template */}
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink">
                  ICE scoring template for test prioritisation
                </h3>
                <p className="text-xs text-editorial-muted">Score each proposed test 1-10 on these three dimensions. Average = ICE score. Run highest first.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[rgba(44,49,59,0.08)]">
                        <th className="text-left py-2 pr-4 text-editorial-muted font-medium">Dimension</th>
                        <th className="text-left py-2 pr-4 text-editorial-muted font-medium">Score 1-3</th>
                        <th className="text-left py-2 pr-4 text-editorial-muted font-medium">Score 4-6</th>
                        <th className="text-left py-2 text-editorial-muted font-medium">Score 7-10</th>
                      </tr>
                    </thead>
                    <tbody className="text-editorial-ink/80">
                      <tr className="border-b border-[rgba(44,49,59,0.04)]">
                        <td className="py-2 pr-4 font-semibold text-editorial-green">Impact</td>
                        <td className="py-2 pr-4">Moves metric &lt;5%</td>
                        <td className="py-2 pr-4">Moves metric 5-15%</td>
                        <td className="py-2">Moves metric &gt;15%</td>
                      </tr>
                      <tr className="border-b border-[rgba(44,49,59,0.04)]">
                        <td className="py-2 pr-4 font-semibold text-editorial-blue">Confidence</td>
                        <td className="py-2 pr-4">Wild guess</td>
                        <td className="py-2 pr-4">Based on data/research</td>
                        <td className="py-2">Strong evidence or proven elsewhere</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-editorial-amber">Ease</td>
                        <td className="py-2 pr-4">Needs enablement + training + weeks</td>
                        <td className="py-2 pr-4">Needs some setup, days</td>
                        <td className="py-2">Can launch today in outreach tool</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            The sales teams who test the most, learn the fastest, and close the biggest.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            Start with one test this week. Document the result. Run another next week.
            In 6 months, you&apos;ll have a library of insights your competitors don&apos;t have.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
