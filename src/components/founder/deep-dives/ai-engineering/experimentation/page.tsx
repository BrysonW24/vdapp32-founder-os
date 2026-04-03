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
  { icon: DollarSign, title: "Stop wasting compute on assumptions", detail: "Without testing, you're making $50K GPU decisions based on gut feeling. One ablation study on your model architecture can reveal that your preferred approach trains 40% slower for the same accuracy. The experiment costs a few hundred dollars in compute. The assumption would have cost tens of thousands." },
  { icon: TrendingUp, title: "Compound small improvements", detail: "A 2% accuracy improvement per experiment compounds rapidly. Testing isn't about finding one magic architecture — it's about systematically improving data quality, model design, and serving performance. The best ML teams run dozens of experiments per week." },
  { icon: Shield, title: "Separate intuition from evidence", detail: "The senior engineer thinks a larger model is better. The researcher prefers a novel attention mechanism. The PM wants to ship faster with a smaller model. None of them are wrong — they just haven't tested. Experiment results settle debates." },
  { icon: Brain, title: "Build institutional knowledge", detail: "Every experiment teaches something. Even 'failed' experiments are valuable because they tell you what doesn't work for your specific data and domain. Over time, your team builds a library of proven insights that new hires can learn from." },
  { icon: Users, title: "Empower the whole team", detail: "When anyone can propose a hypothesis and run an experiment, the best ideas come from everywhere — not just the most senior researcher in the room. Experimentation democratises decision-making in ML teams." },
  { icon: Eye, title: "Catch problems before they scale", detail: "A small offline evaluation with 1,000 examples can reveal a model failure mode before you deploy to 100,000 users. Experimentation is the cheapest form of quality assurance in ML." },
]

/* ─── THE SCIENTIFIC METHOD FOR ML ─── */
const METHOD_STEPS = [
  {
    step: 1, title: "Observe", icon: Eye,
    description: "Notice a pattern, problem, or opportunity in your model metrics. 'Our classification model has 85% accuracy but only 60% on the long-tail categories.' or 'Inference latency spikes during peak hours.'",
    tip: "Start with your evaluation metrics. Look for classes with poor recall, inputs where confidence is low, or production metrics that don't match offline performance. These are your experimentation goldmines.",
  },
  {
    step: 2, title: "Hypothesise", icon: Lightbulb,
    description: "Form a specific, testable prediction. Use the format: 'If we [change], then [metric] will [improve/decrease] because [reason].'",
    tip: "Bad hypothesis: 'Making the model bigger will improve accuracy.' Good hypothesis: 'If we increase the embedding dimension from 256 to 512 and add a second attention layer, F1 on long-tail categories will improve by 10% because the model currently lacks capacity to learn rare patterns.'",
    example: "If we add data augmentation (random crop + colour jitter) to our training pipeline, validation accuracy will increase by 5% because our model is currently overfitting to the training distribution.",
  },
  {
    step: 3, title: "Design the experiment", icon: FlaskConical,
    description: "Decide: what are you changing (the variable), what are you measuring (the metric), how will you evaluate (offline benchmark, online A/B test, shadow deployment), and what compute budget do you need?",
    tip: "Change ONE variable at a time. If you change the architecture AND the learning rate AND the data augmentation simultaneously, you won't know which change caused the result. This is why ablation studies matter.",
  },
  {
    step: 4, title: "Run the experiment", icon: Zap,
    description: "Train your variant model alongside the baseline. Use the same evaluation dataset, the same random seeds where possible, and the same compute environment. Log everything with your experiment tracker.",
    tip: "Use experiment tracking tools like Weights & Biases, MLflow, or Neptune. These handle logging, comparison, and reproducibility. Never run an experiment without tracking it — you'll forget what you changed.",
  },
  {
    step: 5, title: "Analyse results", icon: BarChart3,
    description: "Did the variant beat the baseline? By how much? Is the difference statistically significant? What's the confidence interval? Is the improvement worth the compute/latency trade-off? Check performance across all important slices, not just the aggregate.",
    tip: "A 0.1% accuracy improvement that doubles inference latency might not be worth it. Always consider practical significance alongside statistical significance. Check per-class performance — aggregate metrics can hide regressions on important categories.",
  },
  {
    step: 6, title: "Decide and document", icon: FileText,
    description: "Write a model card for the experiment. Document: hypothesis, methodology, results, decision (ship/no-ship), and what you learned. Feed the insight into your next hypothesis. Even negative results are valuable documentation.",
    tip: "Keep an experiment log. Every experiment should have: hypothesis, result, compute cost, training time, and the key learning. This becomes your team's most valuable knowledge base — and makes results reproducible.",
  },
]

/* ─── STATISTICAL SIGNIFICANCE ─── */
const STATS_CONCEPTS = [
  {
    term: "Statistical significance",
    plain: "The confidence that your result is real, not random noise.",
    detail: "When we say a model improvement is 'statistically significant at p < 0.05', it means there's less than a 5% chance the improvement happened by random variation in the evaluation data. We're 95% confident the change actually caused the improvement.",
    analogy: "Imagine flipping a coin. Getting 6 heads in a row could be luck. Getting 60 heads in 100 flips is almost certainly a biased coin. Statistical significance tells you when to trust the pattern in your evaluation metrics.",
  },
  {
    term: "p-value",
    plain: "The probability that your result happened by chance.",
    detail: "p = 0.05 means a 5% chance the metric improvement is random noise. p = 0.01 means 1% chance. In ML, we typically use p < 0.05 as the threshold for offline experiments, and stricter thresholds for online A/B tests on real users.",
    analogy: "Think of it as a lie detector for your evaluation metrics. A low p-value means your model improvement is probably real. A high p-value means it might just be noise from the specific test set.",
  },
  {
    term: "Sample size",
    plain: "How many evaluation examples you need for reliable results.",
    detail: "Too small a test set and you'll get noisy, unreliable metrics. The required sample size depends on your baseline accuracy and the minimum detectable effect. A model with 90% accuracy testing for a 1% improvement needs far more examples than a model with 50% accuracy testing for a 10% improvement.",
    analogy: "Evaluating on 50 examples gives you anecdotes. Evaluating on 5,000 gives you insight. Evaluating on 50,000 gives you confidence. Sample size determines whether your claim is 'I tried it once' or 'the evidence shows'.",
  },
  {
    term: "Confidence interval",
    plain: "The range within which the true metric probably falls.",
    detail: "'Model B achieves 92.3% accuracy +/- 0.8%' means the true accuracy is likely between 91.5% and 93.1%. Wider intervals mean less certainty. Narrower intervals mean more evaluation data and more confidence in the result.",
    analogy: "Weather forecast: 'Between 22C and 28C tomorrow' is a wide confidence interval. 'Between 24C and 25C' is narrow and much more useful. More evaluation data = narrower interval = better decisions.",
  },
  {
    term: "Type I Error (False positive)",
    plain: "Thinking a model is better when it actually isn't.",
    detail: "You declare Model B the winner, deploy it, and later realise it was just random variation in the test set. This happens when you evaluate on too few examples, cherry-pick metrics, or test on data that's not representative of production.",
    analogy: "Like celebrating a model's performance on a cherry-picked subset of easy examples. Too early to know if it's actually better on real-world data.",
  },
  {
    term: "Type II Error (False negative)",
    plain: "Thinking a model isn't better when it actually is.",
    detail: "You evaluate on too few examples and conclude 'no difference', missing a real improvement. This happens when evaluation datasets are too small to detect the effect.",
    analogy: "Like testing a medicine on 10 people, finding no effect, and concluding it doesn't work — when actually it does, you just didn't test on enough people.",
  },
  {
    term: "Minimum Detectable Effect (MDE)",
    plain: "The smallest improvement worth detecting.",
    detail: "Before running an experiment, decide: what's the smallest metric improvement that would justify deploying the new model? A 0.1% accuracy improvement on a high-traffic model might save millions. A 0.1% improvement on a low-traffic model might not be worth the deployment risk. MDE determines your required evaluation set size.",
    analogy: "If you're optimising a model serving 1M requests/day, you care about tiny improvements. If you're serving 100 requests/day, you need bigger lifts to justify the change. Set your bar to match what matters.",
  },
]

/* ─── TEST TYPES ─── */
const TEST_TYPES = [
  {
    name: "Model Comparison (A/B Offline)",
    description: "The simplest and most common ML experiment. Compare a baseline model against one variant on a held-out evaluation set. Change ONE thing — architecture, hyperparameter, or data preprocessing.",
    bestFor: "Comparing model architectures, hyperparameter tuning, data preprocessing changes, feature engineering.",
    example: "Baseline: ResNet-50 with standard augmentation. Variant: ResNet-50 with MixUp augmentation. Evaluate on 10,000 held-out images. Measure top-1 accuracy, per-class F1, and inference latency.",
    pros: ["Easy to set up and analyse", "Clear cause and effect (one variable)", "Fast — no need to deploy"],
    cons: ["Offline metrics may not match online performance", "Doesn't capture user interaction effects"],
    traffic: "None — uses evaluation dataset",
  },
  {
    name: "Ablation Study",
    description: "Start with your full model and systematically remove or disable components to understand their individual contribution. Essential for understanding why your model works.",
    bestFor: "Understanding which model components contribute most, justifying architectural complexity, writing papers.",
    example: "Full model: transformer with 12 layers, attention heads=8, MLP dim=2048. Ablate: (1) reduce to 6 layers, (2) reduce heads to 4, (3) halve MLP dim, (4) remove positional encoding. Measure accuracy drop for each.",
    pros: ["Reveals which components actually matter", "Prevents unnecessary complexity", "Essential for research papers"],
    cons: ["Computationally expensive — need to retrain multiple variants", "Interactions between components can be missed"],
    traffic: "None — offline evaluation",
  },
  {
    name: "Online A/B Test",
    description: "Deploy two model versions to real users simultaneously. Split traffic randomly between the models and measure real-world performance metrics (accuracy, user engagement, business KPIs).",
    bestFor: "Validating that offline improvements translate to real-world gains. Testing changes to recommendation, search, or ranking models.",
    example: "Route 50% of search traffic to the current ranking model, 50% to the new model. Measure click-through rate, time-to-result, and user satisfaction over 2 weeks.",
    pros: ["Measures real user impact", "Catches issues that offline evaluation misses", "Directly ties to business metrics"],
    cons: ["Risk of degrading user experience for the control group", "Takes days to weeks to reach significance", "Complex infrastructure needed"],
    traffic: "Medium — need enough users per variant for significance",
  },
  {
    name: "Shadow Deployment",
    description: "Deploy the new model alongside the production model, processing the same requests in parallel, but only serving the production model's results. Compare outputs without any user impact.",
    bestFor: "High-risk deployments (medical, financial), testing latency and reliability before going live, comparing outputs at scale.",
    example: "Production model handles all requests normally. Shadow model processes the same requests. Compare predictions, latency, error rates, and edge cases without any user-facing risk.",
    pros: ["Zero risk to users", "Tests on real production data distribution", "Catches infrastructure issues"],
    cons: ["Doubles compute cost during testing", "Can't measure user interaction effects", "Only works for request-response models"],
    traffic: "None — piggybacks on production traffic",
  },
  {
    name: "Canary Deployment",
    description: "Gradually roll out the new model to an increasing percentage of users — 1%, 5%, 10%, 50%, 100% — monitoring metrics at each stage. Roll back instantly if metrics degrade.",
    bestFor: "Safely deploying model updates to production. Any change to a model that serves real users.",
    example: "Deploy new recommendation model to 1% of users. Monitor for 24 hours. If click-through rate is stable and error rate is low, increase to 5%. Continue until 100% or roll back if issues appear.",
    pros: ["Minimises blast radius of a bad deployment", "Real-world validation at each stage", "Easy rollback"],
    cons: ["Slower than full deployment", "Small percentages may not have enough traffic for significance", "Requires good monitoring infrastructure"],
    traffic: "Low to start — gradual increase",
  },
]

/* ─── CULTURE OF EXPERIMENTATION ─── */
const CULTURE_PILLARS = [
  {
    pillar: "Make it safe to fail",
    icon: Shield,
    description: "If engineers are punished for experiments that don't beat the baseline, they'll only test safe, incremental changes. The breakthrough insights come from bold hypotheses. Google Brain, DeepMind, and OpenAI test things they expect to fail — because every experiment teaches something.",
    practice: "Celebrate the learning, not just the win. Share negative results in team meetings. Reframe: there are no failed experiments, only experiments that confirmed or rejected a hypothesis.",
  },
  {
    pillar: "Experiment velocity over experiment size",
    icon: Zap,
    description: "A team that runs 20 small experiments per week will learn faster than a team that runs 1 perfect experiment per month. Speed of learning is the competitive advantage, not the size of each experiment.",
    practice: "Set a target: 10+ experiments per week across the team. Most should be small and fast (hyperparameter sweeps, data augmentation tests). Reserve large experiments (architecture changes, new datasets) for when you have strong hypotheses.",
  },
  {
    pillar: "Everyone can propose a hypothesis",
    icon: Users,
    description: "The best experiment ideas often come from the engineer debugging a production issue, the data annotator who notices label inconsistencies, or the junior ML engineer who reads a new paper. Don't limit ideation to senior researchers.",
    practice: "Create a shared experiment backlog. Anyone on the team can add a hypothesis. Review and prioritise weekly. Track results for everyone to learn from.",
  },
  {
    pillar: "Prioritise with ICE scoring",
    icon: Target,
    description: "Not all experiment ideas are equal. Score each on: Impact (how much could this move the metric?), Confidence (how sure are you it'll work?), and Ease (how easy is it to run?). Run high-ICE experiments first.",
    practice: "Score each hypothesis 1-10 on Impact, Confidence, and Ease. Average = ICE score. Run the highest scores first. Review and re-score monthly.",
  },
  {
    pillar: "Document everything",
    icon: FileText,
    description: "An experiment without documentation is wasted compute. If someone leaves the team, the knowledge leaves too. Every experiment should have: hypothesis, methodology, results, learning, and next action. Use model cards.",
    practice: "Maintain a shared experiment tracker (W&B, MLflow, or even a spreadsheet). Monthly, review the top 5 learnings with the broader team. Quarterly, compile a 'What We've Learned' summary.",
  },
  {
    pillar: "Connect experiments to business outcomes",
    icon: DollarSign,
    description: "Leadership doesn't care that you ran 50 experiments. They care that those experiments reduced inference costs by $200K/year or improved recommendation quality by 15%. Always tie experiment results back to business impact.",
    practice: "For every winning experiment, calculate the estimated business impact: (metric improvement) x (number of affected users) x (revenue per user). Present this number alongside the technical metrics.",
  },
]

/* ─── REPORTING FRAMEWORK ─── */
const REPORTING_LEVELS = [
  {
    audience: "Your team (Weekly)",
    format: "Slack update or standup",
    includes: [
      "Experiments launched this week and their hypotheses",
      "Experiments concluded — results and next steps",
      "Experiment backlog prioritisation changes",
      "Models deployed or rolled back from recent experiments",
    ],
    tone: "Tactical, fast, action-oriented. 2-minute update.",
  },
  {
    audience: "Engineering leadership (Monthly)",
    format: "5-slide deck or 1-page memo",
    includes: [
      "Number of experiments run, success rate, and velocity trend",
      "Top 3 winning experiments with business impact estimates",
      "Top 3 learnings (even from negative results)",
      "Next month's experiment roadmap and priorities",
      "Cumulative impact: model quality improvements, latency reductions, cost savings",
    ],
    tone: "Strategic, insight-led. Focus on 'what did we learn and what's it worth to the business?'",
  },
  {
    audience: "Executive / Board (Quarterly)",
    format: "Executive memo or 3-slide appendix to engineering QBR",
    includes: [
      "Experimentation program ROI: compute investment vs business value generated",
      "Key technical insights that changed product direction",
      "Year-over-year model quality and efficiency trends",
      "How experimentation supports the broader AI/product strategy",
    ],
    tone: "Business impact. Tie to revenue, cost savings, user metrics. No jargon. 'Our experimentation program improved recommendation quality by 18%, driving an estimated $2.4M in annual incremental revenue.'",
  },
]

const RESULT_TEMPLATE = {
  sections: [
    { label: "Hypothesis", content: "If we [change], then [metric] will [improve] because [reason]." },
    { label: "Experiment design", content: "Type: [offline eval / online A/B / shadow]. Variable: [what changed]. Baseline: [current model]. Variant: [new model]. Metrics: [primary + secondary]. Duration/compute: [X GPU-hours / Y days]." },
    { label: "Results", content: "Baseline: [metric value]. Variant: [metric value]. Delta: [+/- X%]. Statistical significance: [p-value]. Confidence interval: [range]. Per-slice analysis: [any regressions on important segments]." },
    { label: "Decision", content: "[Ship/No-ship]. If no, why not (improvement too small, latency regression, edge-case failures, etc.)." },
    { label: "Business impact", content: "Estimated annual impact: [metric improvement] x [affected requests/users] x [value per unit] = $[amount]. Compute cost of experiment: $[amount]." },
    { label: "Key learning", content: "What did this teach us about our data, our model architecture, or our serving system? How does this inform future experiments?" },
    { label: "Next experiment", content: "Based on this learning, the next hypothesis to test is: [describe]." },
  ],
}

/* ─── SAMPLE SIZE CALCULATOR ─── */
function SampleSizeGuide() {
  return (
    <div className="space-y-3">
      <h4 className="font-serif font-semibold text-editorial-ink text-sm">Quick evaluation set size reference</h4>
      <p className="text-xs text-editorial-muted">How many evaluation examples you need per variant, based on your baseline accuracy and the minimum improvement you want to detect (at 95% confidence, 80% power):</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[rgba(44,49,59,0.08)]">
              <th className="text-left py-2 pr-4 text-editorial-muted font-medium">Baseline Acc</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">0.5% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">1% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">2% lift</th>
              <th className="text-center py-2 px-3 text-editorial-muted font-medium">5% lift</th>
            </tr>
          </thead>
          <tbody className="text-editorial-ink/80">
            {[
              { cr: "70%", s5: "~320K", s10: "~80K", s20: "~20K", s50: "~3.2K" },
              { cr: "80%", s5: "~245K", s10: "~61K", s20: "~15K", s50: "~2.5K" },
              { cr: "85%", s5: "~195K", s10: "~49K", s20: "~12K", s50: "~2K" },
              { cr: "90%", s5: "~138K", s10: "~35K", s20: "~8.6K", s50: "~1.4K" },
              { cr: "95%", s5: "~73K", s10: "~18K", s20: "~4.6K", s50: "~740" },
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
        Per variant. For comparing two models, you need this many examples evaluated by EACH model. Highlighted column (2% lift) is a practical starting point for most ML experiments.
      </p>
    </div>
  )
}

/* ─── PAGE ─── */
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
          The Art of ML Experimentation
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The best AI engineers don&apos;t guess — they experiment. This page teaches
          the scientific method applied to machine learning: how to form hypotheses,
          run statistically valid experiments, build an experimentation culture, and
          report results that drive engineering decisions.
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
              Every ML team makes decisions. The best ones make decisions backed
              by evidence. The difference between a junior and senior ML engineer
              is often this: one guesses, the other experiments.
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
                <p className="text-3xl font-serif font-bold text-editorial-green">10+ experiments per week</p>
                <p className="text-sm text-editorial-muted max-w-md mx-auto">
                  That&apos;s what top-performing ML teams run. Not 2-3 per quarter.
                  Per week. Velocity of learning is the single biggest predictor of
                  ML team performance.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── METHOD ─── */}
        {activeTab === "method" && (
          <motion.div key="method" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">The scientific method for machine learning</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              This is the same method scientists have used for 400 years. Applied to ML, it
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
              You don&apos;t need a statistics PhD. You need to understand 7 concepts
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
                  <AlertTriangle className="h-4 w-4" /> The 5 deadly sins of ML experimentation
                </h3>
                {[
                  { sin: "Evaluating on training data", fix: "Always use a held-out test set that the model has NEVER seen during training. Data leakage is the most common cause of misleading results." },
                  { sin: "Changing multiple variables at once", fix: "One variable per experiment. If you change the architecture AND the data AND the training schedule, you learned nothing about what worked." },
                  { sin: "Ignoring per-class performance", fix: "Aggregate accuracy can hide severe regressions on minority classes. Always check performance across all important slices." },
                  { sin: "Cherry-picking the best checkpoint", fix: "Define your evaluation protocol BEFORE training. Report results from the same stopping criterion applied consistently across all experiments." },
                  { sin: "Not documenting negative results", fix: "An experiment without documentation is wasted compute. Document everything, including 'no improvement' results — they prevent others from repeating the same work." },
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
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Types of ML experiments</h2>
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
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Building a culture of ML experimentation</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Tools and knowledge aren&apos;t enough. The highest-performing ML teams
              have a culture where experimentation is the default way of making
              decisions — not a special event.
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
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Reporting experiment results</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Running experiments is half the job. The other half is communicating results in
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
                  The reporting structure that earns trust
                </h3>
                <p className="text-sm text-editorial-muted leading-relaxed max-w-2xl">
                  Every experiment result should answer three questions in this order:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { num: "1", q: "What did we learn?", detail: "The insight, not the raw numbers. 'Data augmentation matters more than model size for our domain — doubling training data improved accuracy more than doubling parameters.'" },
                    { num: "2", q: "What's it worth?", detail: "The business impact. 'This improvement applied to our recommendation model would increase click-through rate by 8%, generating an estimated $450K/year in incremental revenue.'" },
                    { num: "3", q: "What do we do next?", detail: "The action. 'We're deploying the improved model via canary rollout this sprint and running a follow-up experiment on training data quality next.'" },
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
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Experiment report template</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">
              Use this template for every experiment you run. Consistency in documentation
              is what separates professional ML engineering from ad-hoc tinkering.
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

            {/* Model card template */}
            <Card>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-serif font-semibold text-editorial-ink">
                  Monthly experiment summary — slide structure
                </h3>
                <p className="text-xs text-editorial-muted">Use this 5-slide structure for your monthly leadership update:</p>
                <div className="space-y-2">
                  {[
                    { slide: 1, title: "Experimentation program health", content: "Experiments run, success rate, velocity trend (chart). One sentence: 'We ran X experiments this month with a Y% improvement rate, up/down from last month.'" },
                    { slide: 2, title: "Top 3 wins", content: "For each: one-line hypothesis, result, estimated business impact. Visual: metric charts before/after if applicable." },
                    { slide: 3, title: "Top 3 learnings", content: "Include experiments with negative results — these are often the most valuable insights. Frame as: 'We learned that...' not 'This experiment failed.'" },
                    { slide: 4, title: "Cumulative impact", content: "Running total of model quality improvements and cost savings from the experimentation program. Chart showing improvement trends over time." },
                    { slide: 5, title: "Next month's roadmap", content: "Top 5 experiments planned, ranked by ICE score. What metric each targets. Expected compute budget and timeline." },
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
                  ICE scoring template for experiment prioritisation
                </h3>
                <p className="text-xs text-editorial-muted">Score each proposed experiment 1-10 on these three dimensions. Average = ICE score. Run highest first.</p>
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
                        <td className="py-2 pr-4">Moves metric &lt;1%</td>
                        <td className="py-2 pr-4">Moves metric 1-5%</td>
                        <td className="py-2">Moves metric &gt;5%</td>
                      </tr>
                      <tr className="border-b border-[rgba(44,49,59,0.04)]">
                        <td className="py-2 pr-4 font-semibold text-editorial-blue">Confidence</td>
                        <td className="py-2 pr-4">Wild guess</td>
                        <td className="py-2 pr-4">Based on literature/data analysis</td>
                        <td className="py-2">Strong evidence or proven in similar domains</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-semibold text-editorial-amber">Ease</td>
                        <td className="py-2 pr-4">Needs new infrastructure + weeks of work</td>
                        <td className="py-2 pr-4">Needs some setup, days of compute</td>
                        <td className="py-2">Can run today with existing pipeline</td>
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
            The engineers who experiment the most, learn the fastest, and ship the best models.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            Start with one experiment this week. Document the result. Run another next week.
            In 6 months, you&apos;ll have a library of insights your competitors don&apos;t have.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
