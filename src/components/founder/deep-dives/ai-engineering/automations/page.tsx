"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Zap,
  ArrowRight,
  Database,
  Settings,
  BarChart3,
  MessageSquare,
  Clock,
  DollarSign,
  TrendingUp,
  Repeat,
  Target,
  Eye,
  AlertTriangle,
  Building2,
  Users,
  Laptop,
  CheckCircle2,
  XCircle,
  Workflow,
  Bot,
  Globe,
  Shield,
  Lightbulb,
  Layers,
  Cpu,
  GitBranch,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Data ────────────────────────────────────────────────────────────── */

const WHAT_IT_IS = [
  {
    title: "Trigger",
    description: "Something happens — new data arrives, a training job completes, model performance drops below a threshold, or a scheduled retraining window opens.",
    icon: Zap,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
  },
  {
    title: "Condition",
    description: "The system checks rules — is the data quality score above 95%? Has model accuracy dropped by more than 2%? Is there enough new training data since the last retrain?",
    icon: Target,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
  },
  {
    title: "Action",
    description: "The system does something — triggers a retraining pipeline, deploys a new model version, sends an alert, rolls back to a previous model, or updates a feature store.",
    icon: ArrowRight,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
  },
]

const WHY_BUILT = [
  { icon: Clock, label: "Save engineering time", detail: "Automated ML pipelines run 24/7 without human intervention. A retraining pipeline that takes 2 hours to configure manually can run automatically every week for years." },
  { icon: DollarSign, label: "Reduce model staleness", detail: "Models degrade over time as data distributions shift. Automated retraining catches drift early, maintaining model quality without waiting for a human to notice the problem." },
  { icon: Repeat, label: "Ensure reproducibility", detail: "Automated pipelines produce the same result every time. No more 'it works on my machine' — every training run uses the same environment, data processing, and evaluation criteria." },
  { icon: TrendingUp, label: "Scale without headcount", detail: "A team of 3 ML engineers can maintain 50 production models with proper automation. Without it, you'd need 20 people manually monitoring, retraining, and deploying." },
  { icon: Eye, label: "Never miss a degradation", detail: "Automated monitoring catches things humans miss — a subtle data drift, a gradual accuracy decline, a latency spike during peak hours, or a feature store going stale." },
  { icon: Shield, label: "Reduce deployment risk", detail: "Automated canary deployments, rollback triggers, and health checks ensure that bad models never make it to 100% of users. Safety nets that work while you sleep." },
]

const WHERE_IMPLEMENTED = [
  {
    area: "Data Pipelines",
    icon: Database,
    examples: ["Automated data ingestion and validation", "Feature computation and storage", "Data quality monitoring and alerting", "Schema evolution handling", "Training/evaluation data splitting", "Data versioning and lineage tracking"],
    tools: ["Apache Airflow", "Prefect", "dbt", "Great Expectations"],
    businessImpact: "Automated data pipelines ensure your models always train on fresh, validated data. Stale or corrupted data is the number one cause of model failures.",
  },
  {
    area: "Training Pipelines",
    icon: Cpu,
    examples: ["Scheduled model retraining", "Hyperparameter optimisation sweeps", "Distributed training orchestration", "Training checkpoint management", "Resource allocation and GPU scheduling", "Experiment tracking and logging"],
    tools: ["Kubeflow", "MLflow", "Weights & Biases", "Ray Train"],
    businessImpact: "Automated training pipelines turn model improvement from a manual process into a continuous one. Teams with automated training ship improvements 5x faster.",
  },
  {
    area: "Evaluation & Testing",
    icon: BarChart3,
    examples: ["Automated model evaluation on benchmark suites", "Regression testing against previous versions", "Bias and fairness evaluation", "Performance profiling (latency, memory, throughput)", "A/B test orchestration and analysis", "Model card generation"],
    tools: ["pytest", "Deepchecks", "Evidently AI", "Great Expectations"],
    businessImpact: "Automated evaluation prevents bad models from reaching production. It catches regressions that manual review would miss.",
  },
  {
    area: "Deployment & Serving",
    icon: Globe,
    examples: ["Automated model packaging and containerisation", "Canary and blue-green deployments", "Auto-scaling based on traffic patterns", "A/B routing between model versions", "Feature flag management for model rollouts", "Automated rollback on metric degradation"],
    tools: ["Seldon", "BentoML", "KServe", "TensorFlow Serving"],
    businessImpact: "Automated deployment reduces the time from 'model is ready' to 'model is serving users' from days to minutes. Rollback automation prevents bad deployments from causing damage.",
  },
  {
    area: "Monitoring & Observability",
    icon: Eye,
    examples: ["Real-time prediction quality monitoring", "Data drift and concept drift detection", "Latency and throughput alerting", "Cost tracking per model per endpoint", "Feature importance tracking over time", "Automated incident response"],
    tools: ["Evidently AI", "WhyLabs", "Prometheus", "Grafana"],
    businessImpact: "Monitoring automation catches model degradation before users notice. Teams with automated monitoring detect issues hours or days earlier than manual review.",
  },
  {
    area: "Feature Stores",
    icon: Layers,
    examples: ["Automated feature computation and refresh", "Point-in-time correct feature serving", "Feature validation and schema enforcement", "Online/offline feature consistency checks", "Feature usage tracking and deprecation", "Automated backfill for new features"],
    tools: ["Feast", "Tecton", "Hopsworks", "Databricks Feature Store"],
    businessImpact: "Feature store automation ensures training and serving use the same feature logic. Feature drift is a leading cause of train-serve skew.",
  },
  {
    area: "CI/CD for ML",
    icon: GitBranch,
    examples: ["Automated model testing on pull requests", "Training pipeline validation", "Model performance gates before deployment", "Infrastructure-as-code for ML environments", "Automated documentation generation", "Dependency and environment management"],
    tools: ["GitHub Actions", "GitLab CI", "DVC", "CML"],
    businessImpact: "CI/CD for ML brings software engineering best practices to model development. Teams with ML CI/CD have 3x fewer production incidents.",
  },
]

const REAL_EXAMPLES = [
  {
    company: "Netflix",
    type: "Recommendation Pipeline",
    description: "Netflix's recommendation system is fully automated — data pipelines ingest viewing behaviour in real-time, models retrain on fresh data continuously, A/B tests run automatically on new model versions, and the winning model is deployed via canary rollout. The entire cycle from data to deployment is automated.",
    result: "Netflix estimates their recommendation system saves $1B/year in customer retention through personalised content surfacing.",
    lesson: "End-to-end automation means the system improves continuously without manual intervention. The competitive moat is the pipeline, not any single model.",
  },
  {
    company: "Spotify",
    type: "Discover Weekly Automation",
    description: "Every Monday, Spotify automatically generates personalised playlists for 600M+ users. The pipeline ingests listening data, runs collaborative filtering and content-based models, generates playlists, runs quality checks, and delivers to users — all fully automated.",
    result: "Discover Weekly drives 40% of all new artist discoveries on the platform. The automation handles 600M personalised playlists weekly.",
    lesson: "The best ML automation feels like a product feature, not infrastructure. Users don't know (or care) about the pipeline — they just love the playlists.",
  },
  {
    company: "Google",
    type: "Automated ML Pipelines (TFX)",
    description: "Google built TensorFlow Extended (TFX) — a production ML pipeline framework that automates data validation, feature engineering, model training, evaluation, and serving. It powers thousands of models across Search, Ads, YouTube, Gmail, and Maps.",
    result: "TFX enables Google to maintain thousands of production models with relatively small ML platform teams. New models can go from prototype to production in days instead of months.",
    lesson: "Invest in ML platform infrastructure early. The teams that automate their ML infrastructure can iterate 10x faster than teams doing everything manually.",
  },
  {
    company: "Uber",
    type: "Michelangelo ML Platform",
    description: "Uber's Michelangelo platform automates the entire ML lifecycle — feature computation in their feature store, distributed training, model evaluation, deployment with automatic canary rollouts, and monitoring with automated rollback. It supports thousands of models for pricing, ETAs, fraud detection, and more.",
    result: "Michelangelo reduced time-to-production for new models from months to days. Automated monitoring catches 95% of model issues before they impact users.",
    lesson: "ML automation at scale requires treating ML infrastructure as a product with its own roadmap, SLAs, and dedicated engineering team.",
  },
  {
    company: "Shopify",
    type: "Automated Fraud Detection",
    description: "Shopify's fraud detection system automatically retrains on new transaction patterns, evaluates against precision/recall thresholds, and deploys updates via shadow deployment followed by canary rollout. When data drift is detected, the pipeline automatically triggers a retrain cycle.",
    result: "Automated retraining keeps fraud detection models current as fraud patterns evolve. False positive rates stayed below 0.5% despite rapidly changing attack vectors.",
    lesson: "For adversarial domains (fraud, security, abuse), automated retraining isn't optional — it's survival. Manual retraining simply can't keep up with attackers.",
  },
  {
    company: "Small Startup (Example)",
    type: "Full MLOps Stack",
    description: "A 3-person ML team running: (1) Daily data pipeline with Great Expectations validation, (2) Weekly automated retraining with MLflow tracking, (3) Automated evaluation against benchmark suite, (4) Canary deployment via GitHub Actions, (5) Monitoring with Evidently and PagerDuty alerts. Total setup: 2 weeks. Runs continuously.",
    result: "3 engineers maintaining 8 production models with 99.9% uptime and automatic improvement cycles.",
    lesson: "You don't need to be a big company. A small team with the right automation can operate like a much larger one. Start with monitoring and retraining — those give the highest ROI.",
  },
]

const HOW_TO_BUILD = [
  {
    step: 1,
    title: "Map the ML lifecycle",
    description: "Before you automate anything, draw the journey your model takes — from raw data to production predictions. Mark every step where manual intervention is currently required.",
    tip: "Use a whiteboard. Think in terms of: What data do we need? How do we process it? How do we train? How do we evaluate? How do we deploy? How do we monitor?",
  },
  {
    step: 2,
    title: "Identify the highest-value automation points",
    description: "Not every step needs automation on day one. Start with the steps that cause the most pain or risk: monitoring (catch problems early), evaluation (prevent bad deployments), and retraining (keep models fresh).",
    tip: "If you could only automate 3 things, which would reduce the most manual toil? Start there.",
  },
  {
    step: 3,
    title: "Define your trigger → condition → action",
    description: "For each automation, define: What event triggers it? What conditions must be true? What action should the system take? Write this in plain language first before touching any code.",
    tip: "Example: When [model accuracy drops below 90%] AND [there's at least 10K new training examples] AND [last retrain was >7 days ago] → Trigger [retraining pipeline].",
  },
  {
    step: 4,
    title: "Build the pipeline code",
    description: "Implement the pipeline using your chosen orchestration tool (Airflow, Prefect, Kubeflow). Make each step idempotent — it should produce the same result if run twice. Add comprehensive logging.",
    tip: "Start with the simplest version that works. You can add branches, conditions, and optimisations later once you see how it performs in practice.",
  },
  {
    step: 5,
    title: "Add validation gates",
    description: "Never deploy a model without automated checks. Validate data quality before training. Validate model quality before deployment. Validate serving health after deployment. Each gate should have clear pass/fail criteria.",
    tip: "Define your quality gates BEFORE building the pipeline. What accuracy threshold must be met? What latency budget? What fairness criteria?",
  },
  {
    step: 6,
    title: "Test the pipeline end-to-end",
    description: "Run the full pipeline on a test dataset. Verify every step: Does data validation catch bad data? Does training produce a valid model? Does evaluation correctly compare against the baseline? Does deployment work? Does monitoring fire alerts?",
    tip: "Create a test dataset with known issues (missing values, label errors, distribution shift) and verify your pipeline handles each case correctly.",
  },
  {
    step: 7,
    title: "Monitor and iterate",
    description: "After launch, watch the pipeline health: How often does retraining trigger? What's the success rate? Are quality gates catching real issues or generating false alarms? Tune thresholds and add new automation as you learn.",
    tip: "The first version is never perfect. Plan to review your ML pipeline monthly for the first quarter, then quarterly after that. Keep a log of incidents and near-misses.",
  },
]

const BUSINESS_OPS_CONNECTIONS = [
  {
    department: "Product Engineering",
    icon: Cpu,
    connection: "ML automation provides product teams with reliable, up-to-date AI features without manual ML engineering intervention. Automated deployment means new model improvements reach users faster. Feature flags allow product managers to control ML feature rollouts.",
    outcome: "Product teams ship AI features faster because they don't wait on ML engineers for every deployment.",
  },
  {
    department: "Data Engineering",
    icon: Database,
    connection: "ML pipelines consume data pipelines. Automated data quality checks catch upstream issues before they corrupt model training. Feature stores provide a shared layer between data engineering and ML engineering.",
    outcome: "Data and ML teams operate independently but stay in sync through automated contracts and validation.",
  },
  {
    department: "Platform/DevOps",
    icon: Settings,
    connection: "ML automation runs on top of platform infrastructure — Kubernetes clusters, GPU pools, object storage. Automated scaling ensures compute is available when training runs. Cost monitoring prevents runaway GPU bills.",
    outcome: "Platform teams can manage ML infrastructure the same way they manage application infrastructure — with automation and observability.",
  },
  {
    department: "Finance",
    icon: DollarSign,
    connection: "Automated cost tracking per model and per pipeline makes ML spend transparent. Automated resource scheduling (train during off-peak hours) reduces costs. ROI tracking ties model improvements to business metrics.",
    outcome: "Finance gets clear visibility into ML spend and can justify investments based on measured business impact.",
  },
  {
    department: "Security & Compliance",
    icon: Shield,
    connection: "Automated bias and fairness evaluation ensures models meet compliance requirements. Data lineage tracking shows exactly what data trained which model. Audit logs document every model change and deployment.",
    outcome: "Compliance and audit teams can verify ML systems meet regulatory requirements without manual review of every model update.",
  },
  {
    department: "Leadership",
    icon: Building2,
    connection: "Automated dashboards give executives real-time visibility into model health, improvement trends, and business impact. Anomaly alerts surface critical issues before they become crises.",
    outcome: "Leaders make faster, data-informed decisions about AI investments without waiting for manual reports from the ML team.",
  },
]

const MATURITY_LEVELS = [
  {
    level: 1,
    name: "Manual",
    description: "Everything is done by hand. Models trained in notebooks. Deployment via manual file copy. Monitoring by occasionally checking dashboards. No version control for models.",
    typical: "Early-stage startup with 1 ML engineer.",
    nextStep: "Add experiment tracking (MLflow or W&B) and automated evaluation on a held-out test set.",
  },
  {
    level: 2,
    name: "Basic Automation",
    description: "Key pipelines automated: scheduled retraining, basic evaluation, simple deployment scripts. Still lots of manual steps. Monitoring mostly reactive.",
    typical: "Growing startup with a small ML team of 2-3.",
    nextStep: "Add data validation, automated deployment with canary rollouts, and proactive monitoring with alerts.",
  },
  {
    level: 3,
    name: "Integrated",
    description: "Full CI/CD for ML. Automated data validation, training, evaluation, deployment, and monitoring. Feature store in place. Quality gates prevent bad models from shipping.",
    typical: "Scale-up with a dedicated ML platform team of 3-5.",
    nextStep: "Add automated retraining triggered by drift detection, A/B testing infrastructure, and cost optimisation.",
  },
  {
    level: 4,
    name: "Orchestrated",
    description: "Full lifecycle automation with intelligent orchestration. Automated drift detection triggers retraining. Canary deployments auto-promote or auto-rollback. Self-healing pipelines. The ML system operates autonomously.",
    typical: "Mature ML organisation at a medium-to-large company.",
    nextStep: "Continuously optimise. Focus on reducing compute costs, improving pipeline reliability to 99.9%, and automating model governance.",
  },
]

type TabId = "what" | "why" | "where" | "how" | "operations" | "examples" | "maturity"

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "what", label: "What It Is", icon: Lightbulb },
  { id: "why", label: "Why It Matters", icon: TrendingUp },
  { id: "where", label: "Where It Lives", icon: Globe },
  { id: "how", label: "How to Build", icon: Workflow },
  { id: "operations", label: "Business Ops", icon: Building2 },
  { id: "examples", label: "Real Examples", icon: Eye },
  { id: "maturity", label: "Maturity Model", icon: Layers },
]

/* ─── Fade helper ─────────────────────────────────────────────────── */
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35 },
}

/* ─── Page ────────────────────────────────────────────────────────── */

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("what")

  return (
    <div className="container py-6 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Deep Dive
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          ML Pipeline Automation
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          ML automation is how modern AI teams deliver reliable, continuously
          improving models to production — without manually babysitting every
          training run, deployment, and monitoring check.
        </p>
      </div>

      {/* Tab bar */}
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
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {/* ─── WHAT IT IS ─── */}
        {activeTab === "what" && (
          <motion.div key="what" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                What is ML pipeline automation?
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                ML pipeline automation uses software to perform ML lifecycle tasks automatically,
                based on triggers and rules you define. Instead of manually retraining models,
                copying weights to production servers, and staring at dashboards, you build
                systems that do it for you. Every automation follows three steps:
              </p>
            </div>

            {/* Trigger → Condition → Action visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {WHAT_IT_IS.map((item, i) => (
                <Card key={item.title} className="relative overflow-hidden">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", item.bg)}>
                        <item.icon className={cn("h-5 w-5", item.color)} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-editorial-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-serif font-semibold text-editorial-ink">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{item.description}</p>
                    {i < 2 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="h-5 w-5 text-editorial-muted/30" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Simple example walkthrough */}
            <Card className="glass-panel-strong">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-editorial-ink mb-4">
                  Example: Automated Model Retraining
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  {[
                    { time: "Day 1", event: "Data drift monitoring detects distribution shift in incoming features", type: "Trigger" },
                    { time: "Day 1", event: "Pipeline validates new data quality: schema check, completeness, freshness", type: "Condition" },
                    { time: "Day 2", event: "Retraining pipeline runs on GPU cluster, logs metrics to experiment tracker", type: "Action" },
                    { time: "Day 3", event: "New model passes evaluation gates → canary deployment to 5% of traffic", type: "Action" },
                  ].map((step, i) => (
                    <div key={i} className="space-y-1.5">
                      <Badge variant="secondary" className="text-[10px] font-mono">{step.time}</Badge>
                      <p className="text-editorial-ink/80">{step.event}</p>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted">{step.type}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-editorial-green mt-4 font-medium">
                  Result: Model quality maintained automatically. Without automation, drift would go unnoticed for weeks, degrading predictions for millions of users.
                </p>
              </CardContent>
            </Card>

            {/* What automation is NOT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-serif font-semibold text-editorial-green flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> What ML automation IS
                  </h3>
                  <ul className="space-y-2 text-sm text-editorial-ink/80">
                    <li>A system that runs the right pipeline at the right time</li>
                    <li>A way to scale model quality and reliability</li>
                    <li>A tool that frees engineers for research and experimentation</li>
                    <li>A method to ensure reproducibility across deployments</li>
                    <li>A competitive advantage for small teams operating at scale</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-serif font-semibold text-editorial-red flex items-center gap-2">
                    <XCircle className="h-4 w-4" /> What ML automation is NOT
                  </h3>
                  <ul className="space-y-2 text-sm text-editorial-ink/80">
                    <li>A replacement for understanding your data and models</li>
                    <li>An excuse to skip evaluation and testing</li>
                    <li>A set-it-and-forget-it system (pipelines need monitoring too)</li>
                    <li>A substitute for good ML engineering practices</li>
                    <li>Something only big companies can afford (open-source tools are excellent)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ─── WHY IT MATTERS ─── */}
        {activeTab === "why" && (
          <motion.div key="why" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                Why teams build ML automation
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                ML automation isn&apos;t about removing engineers — it&apos;s about removing repetitive tasks
                so engineers can focus on what actually requires thinking, creativity, and judgment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_BUILT.map((item) => (
                <Card key={item.label} className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                        <item.icon className="h-4 w-4 text-editorial-green" />
                      </div>
                      <h3 className="font-serif font-semibold text-editorial-ink">{item.label}</h3>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ROI callout */}
            <Card className="glass-panel-strong">
              <CardContent className="p-6 text-center space-y-3">
                <p className="text-4xl font-serif font-bold text-editorial-green">87%</p>
                <p className="text-sm text-editorial-muted max-w-md mx-auto">
                  Of ML models never make it to production. The primary blocker isn&apos;t model
                  quality — it&apos;s lack of infrastructure and automation. Teams with MLOps
                  automation deploy 5x more models to production.
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">Source: Gartner / MLOps Community Survey</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── WHERE IT LIVES ─── */}
        {activeTab === "where" && (
          <motion.div key="where" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                Where ML automation lives
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Automation touches every layer of the ML stack. Here&apos;s where it
                lives, what it does, and which tools power it.
              </p>
            </div>

            <div className="space-y-4">
              {WHERE_IMPLEMENTED.map((area) => (
                <Card key={area.area}>
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                      <div className="flex items-center gap-3 lg:w-48 shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft">
                          <area.icon className="h-5 w-5 text-editorial-green" />
                        </div>
                        <h3 className="font-serif font-semibold text-editorial-ink">{area.area}</h3>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {area.examples.map((ex) => (
                            <Badge key={ex} variant="secondary" className="text-[10px]">{ex}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-editorial-green font-medium">{area.businessImpact}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">Tools:</span>
                          {area.tools.map((tool) => (
                            <Badge key={tool} variant="outline" className="text-[10px]">{tool}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── HOW TO BUILD ─── */}
        {activeTab === "how" && (
          <motion.div key="how" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                How to build ML pipeline automation
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Follow these 7 steps. The hard part is the thinking — defining what
                to automate and what quality gates to enforce — not the tooling.
              </p>
            </div>

            <div className="space-y-4">
              {HOW_TO_BUILD.map((step) => (
                <Card key={step.step}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-editorial-green text-white text-sm font-bold font-serif">
                        {step.step}
                      </span>
                      <div className="space-y-2">
                        <h3 className="font-serif font-semibold text-editorial-ink">{step.title}</h3>
                        <p className="text-sm text-editorial-muted leading-relaxed">{step.description}</p>
                        <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                          <p className="text-xs text-editorial-amber"><strong>Tip:</strong> {step.tip}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── BUSINESS OPS ─── */}
        {activeTab === "operations" && (
          <motion.div key="ops" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                How ML automation connects to business operations
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                ML automation doesn&apos;t operate in a silo. It touches product engineering,
                data teams, platform, finance, and leadership. When built well, it becomes
                the backbone of the organisation&apos;s AI capability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BUSINESS_OPS_CONNECTIONS.map((dept) => (
                <Card key={dept.department} className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-blue-soft">
                        <dept.icon className="h-4 w-4 text-editorial-blue" />
                      </div>
                      <h3 className="font-serif font-semibold text-editorial-ink">{dept.department}</h3>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{dept.connection}</p>
                    <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                      <p className="text-xs text-editorial-green font-medium">{dept.outcome}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* The nervous system metaphor */}
            <Card className="glass-panel-strong">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-serif font-semibold text-editorial-ink text-lg">
                  Think of ML automation as the nervous system
                </h3>
                <p className="text-sm text-editorial-muted max-w-xl mx-auto leading-relaxed">
                  Just like your nervous system automatically handles breathing, reflexes,
                  and homeostasis so your brain can focus on thinking — ML automation
                  handles data validation, retraining, deployment, and monitoring so your
                  engineers can focus on research, experimentation, and innovation.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── REAL EXAMPLES ─── */}
        {activeTab === "examples" && (
          <motion.div key="examples" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                Real-world ML automation examples
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                These are ML automation systems running at real companies right now. Study
                the pattern, not just the tool — the principles work at any scale.
              </p>
            </div>

            <div className="space-y-4">
              {REAL_EXAMPLES.map((ex) => (
                <Card key={ex.company}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif font-semibold text-editorial-ink text-lg">{ex.company}</h3>
                        <Badge variant="secondary" className="text-[10px] mt-1">{ex.type}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-editorial-ink/80 leading-relaxed">{ex.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-1">Result</p>
                        <p className="text-xs text-editorial-ink/80">{ex.result}</p>
                      </div>
                      <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-amber mb-1">Lesson</p>
                        <p className="text-xs text-editorial-ink/80">{ex.lesson}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── MATURITY MODEL ─── */}
        {activeTab === "maturity" && (
          <motion.div key="maturity" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                ML automation maturity model
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Every team is somewhere on this ladder. Understanding where you
                are helps you know what to build next — without overbuilding.
              </p>
            </div>

            {/* Visual maturity ladder */}
            <div className="relative">
              <div className="absolute left-[23px] top-4 bottom-4 w-px bg-[rgba(44,49,59,0.1)]" />
              <div className="space-y-4">
                {MATURITY_LEVELS.map((level) => (
                  <div key={level.level} className="relative pl-12">
                    <div className="absolute left-3 top-5 h-5 w-5 rounded-full bg-editorial-green flex items-center justify-center z-10">
                      <span className="text-white text-[10px] font-bold">{level.level}</span>
                    </div>
                    <Card>
                      <CardContent className="p-5 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-serif font-semibold text-editorial-ink">
                            Level {level.level}: {level.name}
                          </h3>
                        </div>
                        <p className="text-sm text-editorial-muted leading-relaxed">{level.description}</p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-1">
                          <div className="rounded-[10px] bg-editorial-blue-soft/60 border border-editorial-blue/10 px-3 py-1.5">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-blue mb-0.5">Typical</p>
                            <p className="text-xs text-editorial-ink/80">{level.typical}</p>
                          </div>
                          <div className="rounded-[10px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-1.5">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-0.5">Next step</p>
                            <p className="text-xs text-editorial-ink/80">{level.nextStep}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom principle */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Automation multiplies your engineering. It doesn&apos;t replace it.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            Bad ML practices automated just means you fail faster. Good engineering
            automated means you ship reliable AI at scale. Always start with the thinking.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
