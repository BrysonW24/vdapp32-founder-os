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

/* ─── Tab system ─── */
type TabId = "why" | "method" | "stats" | "types" | "culture" | "reporting" | "templates"

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "why", label: "Why Experiment", icon: Lightbulb },
  { id: "method", label: "The Method", icon: FlaskConical },
  { id: "stats", label: "Statistical Significance", icon: Calculator },
  { id: "types", label: "Test Types", icon: Layers },
  { id: "culture", label: "Building a Culture", icon: Users },
  { id: "reporting", label: "Reporting Results", icon: Presentation },
  { id: "templates", label: "Templates", icon: FileText },
]

/* ─── WHY EXPERIMENT ─── */
const WHY_POINTS = [
  { icon: DollarSign, title: "Stop wasting money on assumptions", detail: "Without testing, you're making $50K decisions based on gut feeling. One A/B test on a landing page headline can reveal that your preferred version converts 40% worse than the alternative. The test costs $200 in ad spend. The assumption would have cost $20,000 in lost revenue." },
  { icon: TrendingUp, title: "Compound small improvements", detail: "A 5% improvement per month compounds to 80% improvement in a year. Testing isn't about finding one big win — it's about systematically removing friction, one experiment at a time. The best marketing teams run 2-4 tests per week." },
  { icon: Shield, title: "Separate opinions from evidence", detail: "The CEO thinks the blue button looks better. The designer prefers green. The marketer likes red. None of them are wrong — they just haven't tested. Data settles debates. Results don't have opinions." },
  { icon: Brain, title: "Build institutional knowledge", detail: "Every test teaches something. Even 'failed' tests are valuable because they tell you what doesn't work. Over time, your team builds a library of proven insights that new hires can learn from." },
  { icon: Users, title: "Empower the whole team", detail: "When anyone can propose a hypothesis and run a test, the best ideas come from everywhere — not just the most senior person in the room. Testing democratises decision-making." },
  { icon: Eye, title: "Catch problems before they scale", detail: "A small test with 1,000 users can reveal a UX problem before you roll it out to 100,000. Testing is the cheapest form of insurance." },
]

/* ─── THE SCIENTIFIC METHOD FOR MARKETING ─── */
const METHOD_STEPS = [
  {
    step: 1, title: "Observe", icon: Eye,
    description: "Notice a pattern, problem, or opportunity in your data. 'Our landing page has a 2% conversion rate, but industry average is 4%.' or 'Nobody clicks the secondary CTA.'",
    tip: "Start with your analytics. Look for pages with high traffic but low conversion, emails with low open rates, or ads with high impressions but low CTR. These are your testing goldmines.",
  },
  {
    step: 2, title: "Hypothesise", icon: Lightbulb,
    description: "Form a specific, testable prediction. Use the format: 'If we [change], then [metric] will [improve/decrease] because [reason].'",
    tip: "Bad hypothesis: 'Making the page better will increase conversions.' Good hypothesis: 'If we move the CTA above the fold and change the copy from \"Learn More\" to \"Start Free Trial\", conversion rate will increase by 15% because users currently don't see the CTA without scrolling.'",
    example: "If we change the email subject line from a statement to a question, open rate will increase by 10% because questions create curiosity loops.",
  },
  {
    step: 3, title: "Design the test", icon: FlaskConical,
    description: "Decide: what are you testing (the variable), what are you measuring (the metric), how long will it run, and how much traffic/sample do you need for statistical significance?",
    tip: "Change ONE variable at a time. If you change the headline AND the image AND the CTA simultaneously, you won't know which change caused the result.",
  },
  {
    step: 4, title: "Run the experiment", icon: Zap,
    description: "Split your audience randomly into control (original) and variant (the change). Ensure equal distribution. Don't peek at results too early — let the test reach significance.",
    tip: "Use your platform's built-in testing tools: Google Optimize, Optimizely, VWO, or even Mailchimp's A/B testing. These handle the randomisation and statistical calculations for you.",
  },
  {
    step: 5, title: "Analyse results", icon: BarChart3,
    description: "Did the variant beat the control? By how much? Is the difference statistically significant (p < 0.05)? What's the confidence interval? What's the practical significance — is the improvement worth implementing?",
    tip: "A 0.1% improvement that's statistically significant might not be worth the engineering effort to implement. Always consider practical significance alongside statistical significance.",
  },
  {
    step: 6, title: "Decide and document", icon: FileText,
    description: "Implement the winner, document what you learned (including why you think it worked), and feed the insight into your next hypothesis. Even if the test 'failed', document the learning.",
    tip: "Keep a test log. Every test should have: hypothesis, result, statistical significance, sample size, duration, and the key learning. This becomes your team's most valuable knowledge base.",
  },
]

/* ─── STATISTICAL SIGNIFICANCE ─── */
const STATS_CONCEPTS = [
  {
    term: "Statistical significance",
    plain: "The confidence that your result is real, not random luck.",
    detail: "When we say a result is 'statistically significant at p < 0.05', it means there's less than a 5% chance the result happened by random variation. In other words, we're 95% confident the change actually caused the difference.",
    analogy: "Imagine flipping a coin. Getting 6 heads in a row could be luck. Getting 60 heads in 100 flips is almost certainly a biased coin. Statistical significance tells you when to trust the pattern.",
  },
  {
    term: "p-value",
    plain: "The probability that your result happened by chance.",
    detail: "p = 0.05 means a 5% chance the result is random. p = 0.01 means 1% chance. In marketing, we typically use p < 0.05 as the threshold. Below this, we consider the result 'significant'. Above it, we need more data or a bigger effect.",
    analogy: "Think of it as a lie detector for your data. A low p-value means your data is probably telling the truth. A high p-value means it might be lying.",
  },
  {
    term: "Sample size",
    plain: "How many people you need in the test for reliable results.",
    detail: "Too small a sample and you'll get noisy, unreliable results. The required sample size depends on your baseline conversion rate and the minimum detectable effect (the smallest improvement you care about). A page with 2% conversion testing for a 10% relative lift needs ~30,000 visitors per variant.",
    analogy: "Surveying 5 people about a restaurant gives you anecdotes. Surveying 500 gives you insight. Surveying 5,000 gives you confidence. Sample size determines whether your opinion is 'I tried it once' or 'the evidence shows'.",
  },
  {
    term: "Confidence interval",
    plain: "The range within which the true result probably falls.",
    detail: "'Variant B converts at 4.2% ± 0.5%' means the true conversion rate is likely between 3.7% and 4.7%. Wider intervals mean less certainty. Narrower intervals mean more data and more confidence.",
    analogy: "Weather forecast: 'Between 22°C and 28°C tomorrow' is a wide confidence interval. 'Between 24°C and 25°C' is narrow and much more useful. More data = narrower interval = better decisions.",
  },
  {
    term: "Type I Error (False positive)",
    plain: "Thinking something works when it actually doesn't.",
    detail: "You declare Variant B the winner, implement it, and later realise it was just random variation. This happens when you peek at results too early or use a p-value threshold that's too loose.",
    analogy: "Like celebrating a sports team's winning streak after 3 games. Too early to know if they're actually good or just got lucky opponents.",
  },
  {
    term: "Type II Error (False negative)",
    plain: "Thinking something doesn't work when it actually does.",
    detail: "You end a test too early and call it 'no difference', missing a real improvement. This happens when sample sizes are too small to detect the effect.",
    analogy: "Like tasting a new recipe once, finding it 'okay', and never trying it again — when actually it's great and you just had an off day.",
  },
  {
    term: "Minimum Detectable Effect (MDE)",
    plain: "The smallest improvement worth detecting.",
    detail: "Before running a test, decide: what's the smallest lift that would be worth implementing? A 0.5% improvement on a $10M/year page is $50K — probably worth it. A 0.5% improvement on a $10K/year page is $50 — probably not. MDE determines your required sample size.",
    analogy: "If you're weighing luggage at the airport, you care about being 1kg over. If you're weighing trucks, you don't care about 1kg. Set your scale to match what matters.",
  },
]

/* ─── TEST TYPES ─── */
const TEST_TYPES = [
  {
    name: "A/B Test",
    description: "The simplest and most common. Split traffic 50/50 between the original (A) and one variant (B). Test ONE change.",
    bestFor: "Headlines, CTAs, images, email subject lines, pricing display, button colours.",
    example: "Landing page A: 'Start Your Free Trial' button. Landing page B: 'Get Started — It's Free' button. Run until 10,000 visitors per variant. Measure conversion rate.",
    pros: ["Easy to set up and analyse", "Clear cause and effect (one variable)", "Fast to reach significance"],
    cons: ["Can only test one change at a time", "Slower for complex pages with many possible improvements"],
    traffic: "Low — 2 variants means you need less traffic per test",
  },
  {
    name: "A/B/C Test (Multi-variant)",
    description: "Test multiple variants against the control simultaneously. A is control, B and C are different changes.",
    bestFor: "When you have multiple strong hypotheses and enough traffic to test them all at once.",
    example: "Email A: Original subject. Email B: Question-format subject. Email C: Emoji + urgency subject. Split list into thirds.",
    pros: ["Test multiple ideas simultaneously", "Faster exploration when you have many hypotheses"],
    cons: ["Needs 3x the sample size of a simple A/B test", "Harder to interpret — was B better than C because of wording or length?"],
    traffic: "Medium — each variant needs full sample size",
  },
  {
    name: "Multivariate Test (MVT)",
    description: "Test multiple variables simultaneously to find the best combination. E.g., test 3 headlines × 2 images × 2 CTAs = 12 combinations.",
    bestFor: "High-traffic pages where you want to optimise multiple elements at once and understand interactions between them.",
    example: "Test headline (3 options) × hero image (2 options) × CTA text (2 options) = 12 combinations. Requires ~120,000 visitors total.",
    pros: ["Finds the optimal combination, not just individual winners", "Reveals interaction effects (some combinations work better together)"],
    cons: ["Requires massive traffic", "Complex to analyse", "Takes a long time to reach significance"],
    traffic: "Very high — exponential with each variable added",
  },
  {
    name: "Split URL Test",
    description: "Send traffic to entirely different page designs (different URLs) rather than modifying elements on the same page.",
    bestFor: "Testing completely different page layouts, designs, or user flows — not just individual element changes.",
    example: "50% of traffic → current pricing page. 50% → redesigned pricing page with different structure, layout, and messaging.",
    pros: ["Can test radical redesigns", "No flickering or CLS issues", "Clear comparison of fundamentally different approaches"],
    cons: ["Harder to attribute which specific change drove the result", "Requires building two full pages"],
    traffic: "Low — same as A/B (2 variants)",
  },
  {
    name: "Bandit Testing",
    description: "An adaptive algorithm that automatically shifts more traffic to the winning variant as results come in, maximising conversions during the test.",
    bestFor: "Time-sensitive campaigns where you can't afford to lose conversions during the test period (sales, launches).",
    example: "Launch 4 ad creatives. The algorithm starts 25/25/25/25, then shifts to 10/10/10/70 as one variant clearly wins — maximising revenue while still learning.",
    pros: ["Minimises lost revenue during testing", "Great for short campaigns", "Self-optimising"],
    cons: ["Harder to reach statistical significance", "Can declare winners too early", "Less rigorous than classical A/B"],
    traffic: "Low — algorithm adapts in real-time",
  },
]

/* ─── CULTURE OF EXPERIMENTATION ─── */
const CULTURE_PILLARS = [
  {
    pillar: "Make it safe to fail",
    icon: Shield,
    description: "If people are punished for tests that don't win, they'll only test safe, obvious ideas. The breakthrough insights come from bold hypotheses. Netflix tests everything — including things they expect to fail — because every test teaches something.",
    practice: "Celebrate the learning, not just the win. Share 'failed' tests in team meetings. Reframe: there are no failed tests, only tests that confirmed or rejected a hypothesis.",
  },
  {
    pillar: "Test velocity over test size",
    icon: Zap,
    description: "A team that runs 20 small tests per month will learn faster than a team that runs 1 perfect test. Speed of learning is the competitive advantage, not the size of each test.",
    practice: "Set a target: 2-4 tests per week. Most should be small and fast. Reserve big, complex tests for high-impact pages quarterly.",
  },
  {
    pillar: "Everyone can propose a hypothesis",
    icon: Users,
    description: "The best test ideas often come from customer support (they hear complaints), sales (they hear objections), and junior team members (they see things with fresh eyes). Don't limit ideation to senior marketers.",
    practice: "Create a shared 'Test Backlog' in Notion or Asana. Anyone in the company can add a hypothesis. Review and prioritise weekly.",
  },
  {
    pillar: "Prioritise with ICE scoring",
    icon: Target,
    description: "Not all test ideas are equal. Score each on: Impact (how much could this move the metric?), Confidence (how sure are you it'll work?), and Ease (how easy is it to implement?). Run high-ICE tests first.",
    practice: "Score each hypothesis 1-10 on Impact, Confidence, and Ease. Average = ICE score. Run the highest scores first. Review and re-score monthly.",
  },
  {
    pillar: "Document everything",
    icon: FileText,
    description: "A test without documentation is wasted effort. If someone leaves the company, the knowledge leaves too. Every test should have: hypothesis, methodology, results, learning, and next action.",
    practice: "Maintain a shared experiment log. Monthly, review the top 5 learnings with the broader team. Quarterly, compile a 'What We've Learned' report for leadership.",
  },
  {
    pillar: "Connect tests to business outcomes",
    icon: DollarSign,
    description: "Leadership doesn't care that you ran 50 tests. They care that those tests generated $200K in incremental revenue. Always tie experiment results back to business impact.",
    practice: "For every winning test, calculate: estimated annual revenue impact = (lift × baseline metric × time). Present this number, not just the percentage lift.",
  },
]

/* ─── REPORTING FRAMEWORK ─── */
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
    audience: "Marketing leadership (Monthly)",
    format: "5-slide deck or 1-page memo",
    includes: [
      "Number of tests run, win rate, and velocity trend",
      "Top 3 winning tests with revenue impact estimates",
      "Top 3 learnings (even from 'losing' tests)",
      "Next month's testing roadmap and priorities",
      "Cumulative impact: total incremental revenue from testing program",
    ],
    tone: "Strategic, insight-led. Focus on 'what did we learn and what's it worth?'",
  },
  {
    audience: "Executive / Board (Quarterly)",
    format: "Executive memo or 3-slide appendix to marketing QBR",
    includes: [
      "Testing program ROI: investment in testing vs incremental revenue generated",
      "Key strategic insights that changed marketing direction",
      "Year-over-year velocity and win rate trends",
      "How testing supports the broader growth strategy",
    ],
    tone: "Business impact. Tie to revenue, CAC, CLV. No jargon. 'Our testing program generated $340K in incremental revenue this quarter on $12K in testing costs.'",
  },
]

const RESULT_TEMPLATE = {
  sections: [
    { label: "Hypothesis", content: "If we [change], then [metric] will [improve] because [reason]." },
    { label: "Test design", content: "A/B test. Variable: [what changed]. Control: [original]. Variant: [new version]. Metric: [primary KPI]. Duration: [X days]. Sample: [N visitors/emails per variant]." },
    { label: "Results", content: "Control: [metric value]. Variant: [metric value]. Lift: [+/- X%]. Statistical significance: [p-value]. Confidence interval: [range]." },
    { label: "Winner", content: "[Control/Variant]. Implement? [Yes/No]. If no, why not (practical significance too low, implementation cost too high, etc.)." },
    { label: "Revenue impact", content: "Estimated annual impact: [lift] × [baseline conversions/month] × [average order value] × 12 = $[amount]." },
    { label: "Key learning", content: "What did this teach us about our customers, our messaging, or our funnel? How does this inform future tests?" },
    { label: "Next test", content: "Based on this learning, the next hypothesis to test is: [describe]." },
  ],
}

/* ─── SAMPLE SIZE CALCULATOR ─── */
function SampleSizeGuide() {
  return (
    <div className="space-y-3">
      <h4 className="font-serif font-semibold text-editorial-ink text-sm">Quick sample size reference</h4>
      <p className="text-xs text-editorial-muted">How many visitors per variant you need, based on your baseline conversion rate and the minimum lift you want to detect (at 95% confidence, 80% power):</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[rgba(44,49,59,0.08)]">
              <th className="text-left py-2 pr-4 text-editorial-muted font-medium">Baseline CR</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">5% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">10% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">20% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">50% lift</th>
            </tr>
          </thead>
          <tbody className="text-editorial-ink/80">
            {[
              { cr: "1%", s5: "~3.1M", s10: "~780K", s20: "~196K", s50: "~31K" },
              { cr: "2%", s5: "~1.5M", s10: "~385K", s20: "~96K", s50: "~15K" },
              { cr: "5%", s5: "~600K", s10: "~150K", s20: "~38K", s50: "~6K" },
              { cr: "10%", s5: "~285K", s10: "~72K", s20: "~18K", s50: "~3K" },
              { cr: "20%", s5: "~127K", s10: "~32K", s20: "~8K", s50: "~1.3K" },
            ].map((row) => (
              <tr key={row.cr} className="border-b border-[rgba(44,49,59,0.04)]">
                <td className="py-2 pr-4 font-medium">{row.cr}</td>
                <td className="py-2 px-3 text-center">{row.s5}</td>
                <td className="py-2 px-3 text-center">{row.s10}</td>
                <td className="py-2 px-3 text-center font-medium text-editorial-green">{row.s20}</td>
                <td className="py-2 px-3 text-center">{row.s50}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-editorial-muted">
        Per variant. For an A/B test, you need this number for EACH variant (control + variant). Highlighted column (20% lift) is a practical starting point for most marketing tests.
      </p>
    </div>
  )
}

/* ─── PAGE ─── */
export default function ExperimentationPage() {
  const [activeTab, setActiveTab] = useState<TabId>("why")

  return (
    <div className="container py-6 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Deep Dive
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          The Art of Experimentation
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The best marketers in the world don&apos;t guess — they test. This page teaches
          the scientific method applied to marketing: how to form hypotheses, run
          statistically valid experiments, build a testing culture, and report results
          that get you promoted.
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
        {/* ─── WHY ─── */}
        {activeTab === "why" && (
          <motion.div key="why" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Why experimentation separates good from great</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Every marketing team makes decisions. The best ones make decisions backed
              by evidence. The difference between a $100K marketer and a $200K marketer
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
                  That&apos;s what top-performing marketing teams run. Not 2-4 per quarter.
                  Per week. Velocity of learning is the single biggest predictor of
                  marketing team performance.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── METHOD ─── */}
        {activeTab === "method" && (
          <motion.div key="method" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">The scientific method for marketing</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              This is the same method scientists have used for 400 years. Applied to marketing, it
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

        {/* ─── STATS ─── */}
        {activeTab === "stats" && (
          <motion.div key="stats" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Statistical significance — explained simply</h2>
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
                  <AlertTriangle className="h-4 w-4" /> The 5 deadly sins of testing
                </h3>
                {[
                  { sin: "Peeking too early", fix: "Decide the sample size and duration BEFORE the test. Don't check results daily and stop when it 'looks good'." },
                  { sin: "Testing too many things at once", fix: "One variable per test. If you change 3 things, you learned nothing about what worked." },
                  { sin: "Ignoring sample size requirements", fix: "Use a sample size calculator. Running a test with 200 visitors when you need 20,000 is a waste of time." },
                  { sin: "Declaring winners at p = 0.08", fix: "0.05 is the threshold. If it's not significant, run it longer or accept that there's no difference." },
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

        {/* ─── TEST TYPES ─── */}
        {activeTab === "types" && (
          <motion.div key="types" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Types of marketing experiments</h2>
            <div className="space-y-4">
              {TEST_TYPES.map((test) => (
                <Card key={test.name}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif font-semibold text-editorial-ink text-lg">{test.name}</h3>
                      <Badge variant="secondary" className="text-[10px] shrink-0">Traffic: {test.traffic}</Badge>
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

        {/* ─── CULTURE ─── */}
        {activeTab === "culture" && (
          <motion.div key="culture" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Building a culture of experimentation</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Tools and knowledge aren&apos;t enough. The highest-performing marketing teams
              have a culture where testing is the default way of making decisions — not
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

        {/* ─── REPORTING ─── */}
        {activeTab === "reporting" && (
          <motion.div key="reporting" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Reporting results like a top performer</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Running tests is half the job. The other half is communicating results in
              a way that drives action and builds trust. Different audiences need
              different levels of detail.
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
                  The reporting formula that gets you promoted
                </h3>
                <p className="text-sm text-editorial-muted leading-relaxed max-w-2xl">
                  Every test result should answer three questions in this order:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { num: "1", q: "What did we learn?", detail: "The insight, not the data. 'Customers respond 2x better to questions than statements in email subject lines.'" },
                    { num: "2", q: "What's it worth?", detail: "The business impact. 'This insight applied to all email campaigns would generate an estimated $45K/year in incremental revenue.'" },
                    { num: "3", q: "What do we do next?", detail: "The action. 'We're implementing question-format subjects across all automated flows and testing the same principle in ad headlines next.'" },
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

        {/* ─── TEMPLATES ─── */}
        {activeTab === "templates" && (
          <motion.div key="templates" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Test result template</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Use this template for every test you run. Consistency in documentation
              is what separates professional testing from ad-hoc experiments.
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
                <p className="text-xs text-editorial-muted">Use this 5-slide structure for your monthly leadership update:</p>
                <div className="space-y-2">
                  {[
                    { slide: 1, title: "Testing program health", content: "Tests run, win rate, velocity trend (chart). One sentence: 'We ran X tests this month with a Y% win rate, up/down from last month.'" },
                    { slide: 2, title: "Top 3 winners", content: "For each: one-line hypothesis, result, estimated revenue impact. Visual: before/after screenshot if applicable." },
                    { slide: 3, title: "Top 3 learnings", content: "Include tests that 'lost' — these are often the most valuable insights. Frame as: 'We learned that...' not 'This test failed.'" },
                    { slide: 4, title: "Cumulative impact", content: "Running total of incremental revenue from testing program. Chart showing growth over time. ROI: testing investment vs revenue generated." },
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
                        <td className="py-2 pr-4">Needs dev + design + weeks</td>
                        <td className="py-2 pr-4">Needs some setup, days</td>
                        <td className="py-2">Can launch today with existing tools</td>
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
            The marketers who test the most, learn the fastest, and win the biggest.
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
