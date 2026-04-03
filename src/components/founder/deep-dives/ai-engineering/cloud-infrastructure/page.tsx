"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Cloud, Database, Layers, Zap, Shield, BarChart3, Settings,
  CheckCircle2, AlertTriangle, Server, HardDrive, Globe, DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

type TabId = "overview" | "aws" | "gcp" | "azure" | "data" | "cost"
const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: Cloud },
  { id: "aws", label: "AWS", icon: Server },
  { id: "gcp", label: "Google Cloud", icon: Globe },
  { id: "azure", label: "Azure", icon: Layers },
  { id: "data", label: "Data Platforms", icon: Database },
  { id: "cost", label: "Cost Management", icon: DollarSign },
]

const CLOUD_COMPARISON = {
  aws: {
    name: "Amazon Web Services (AWS)", color: "#a16a1f",
    strengths: ["Largest ecosystem — if you need it, AWS has it", "SageMaker is the most mature managed ML platform", "Bedrock for managed LLM access (Claude, Llama, Mistral)", "Best enterprise support and compliance certifications", "Most third-party integrations"],
    mlServices: [
      { name: "SageMaker", desc: "End-to-end ML platform: notebooks, training, tuning, deployment, monitoring" },
      { name: "Bedrock", desc: "Managed access to foundation models (Claude, Llama, Mistral, Stable Diffusion)" },
      { name: "EC2 + GPU instances", desc: "Raw GPU compute (A100, H100). Most flexible but you manage everything." },
      { name: "Lambda", desc: "Serverless compute for lightweight inference" },
      { name: "S3", desc: "Object storage for datasets, models, artifacts" },
      { name: "ECR + ECS/EKS", desc: "Container registry and orchestration for model serving" },
    ],
    bestFor: "Enterprise ML at scale. If your company is already on AWS, stay on AWS for ML. SageMaker + Bedrock covers 90% of needs.",
  },
  gcp: {
    name: "Google Cloud Platform (GCP)", color: "#386a58",
    strengths: ["Best AI/ML research heritage (TensorFlow, TPUs, Gemini)", "Vertex AI is the cleanest managed ML platform", "TPUs offer best price/performance for training", "BigQuery is the best serverless data warehouse", "Strongest for NLP and multi-modal (Google Research)"],
    mlServices: [
      { name: "Vertex AI", desc: "Unified ML platform: model garden, custom training, AutoML, pipelines, feature store" },
      { name: "Gemini API", desc: "Google's multi-modal models with long context (1M tokens)" },
      { name: "TPU pods", desc: "Google's custom AI chips. Best for large-scale training. 2-5x cost-efficient vs GPUs for training." },
      { name: "BigQuery ML", desc: "Train ML models directly in SQL on your data warehouse" },
      { name: "Cloud Run", desc: "Serverless containers — deploy model APIs with zero infra management" },
      { name: "GCS", desc: "Object storage. Integrates natively with BigQuery and Vertex." },
    ],
    bestFor: "Data-heavy ML workloads. If you use BigQuery for data, Vertex AI for ML is the natural extension. Best for research-oriented teams.",
  },
  azure: {
    name: "Microsoft Azure", color: "#2f4f79",
    strengths: ["Deepest OpenAI integration (Azure OpenAI Service)", "Best enterprise identity/security (Azure AD)", "Strong hybrid cloud (on-prem + cloud)", "Power BI integration for stakeholder reporting", "GitHub Copilot and VS Code ecosystem"],
    mlServices: [
      { name: "Azure OpenAI Service", desc: "GPT-4, DALL-E, Whisper with enterprise security, VPC, and compliance" },
      { name: "Azure ML", desc: "Managed ML platform: designer, automated ML, pipelines, endpoints" },
      { name: "Azure AI Studio", desc: "Build AI apps with prompt flow, RAG, and model catalog" },
      { name: "Azure Cognitive Services", desc: "Pre-built AI APIs: vision, speech, language, decision" },
      { name: "Azure Databricks", desc: "Managed Spark + MLflow for data engineering and ML" },
      { name: "Azure Blob Storage", desc: "Object storage for datasets and models" },
    ],
    bestFor: "Enterprise organisations already on Microsoft stack. Azure OpenAI gives you GPT-4 with enterprise compliance that direct OpenAI doesn't offer.",
  },
}

const DATA_PLATFORMS = [
  { name: "Snowflake", desc: "Cloud data warehouse with Cortex AI (built-in LLM access), Snowpark for ML, and strong governance. The dominant enterprise data platform.", strengths: ["Best data sharing and marketplace", "Cortex AI for in-warehouse LLM tasks", "Snowpark for Python/Java ML in Snowflake", "Multi-cloud (runs on AWS, GCP, Azure)"], bestFor: "Enterprises with large structured data estates. If your data is in Snowflake, build ML there.", cost: "Pay-per-query, can be expensive at scale" },
  { name: "Databricks", desc: "Unified data + AI platform built on Apache Spark. Lakehouse architecture combining data warehouse and data lake. MLflow for experiment tracking.", strengths: ["Best for unstructured + structured data together", "MLflow (open-source) for experiment tracking", "Unity Catalog for data governance", "Delta Lake for reliable data lakehouse", "Strong Spark ecosystem for large-scale processing"], bestFor: "Data engineering + ML teams that need to process massive datasets. The 'data + AI' platform.", cost: "DBU-based pricing, compute-heavy workloads can be expensive" },
  { name: "dbt (data build tool)", desc: "Transform raw data into analysis-ready tables using SQL. The standard for data transformation in modern data stacks. Not a database — it sits on top of your warehouse.", strengths: ["SQL-based transformations (accessible to analysts)", "Version control, testing, documentation built-in", "Works with Snowflake, BigQuery, Databricks, Redshift"], bestFor: "Data transformation layer. Every data team should use dbt. It makes your feature engineering reproducible and testable.", cost: "dbt Core is free. dbt Cloud is paid." },
  { name: "Apache Airflow", desc: "Workflow orchestration platform for scheduling and monitoring data pipelines. The standard for ETL/ELT job scheduling.", strengths: ["Python-native DAG definitions", "Massive operator library (AWS, GCP, Snowflake, etc.)", "Managed options: MWAA (AWS), Cloud Composer (GCP)"], bestFor: "Scheduling ML training pipelines, data ingestion, feature computation. The 'cron on steroids' for data teams.", cost: "Open-source. Managed versions cost varies." },
  { name: "Kafka / Streaming", desc: "Real-time data streaming for event-driven architectures. Essential for real-time ML features and online inference.", strengths: ["Real-time feature computation", "Event-driven ML pipelines", "Managed options: Confluent, AWS MSK"], bestFor: "Real-time ML systems: fraud detection, recommendations, dynamic pricing.", cost: "Managed Kafka can be expensive. Consider Redpanda as a lighter alternative." },
]

const COST_STRATEGIES = [
  { strategy: "Use spot/preemptible instances for training", savings: "60-90% off on-demand GPU prices", risk: "Instances can be interrupted. Use checkpointing to resume.", applies: "All training workloads that can handle interruptions" },
  { strategy: "Right-size your GPU instances", savings: "30-50%", risk: "Under-provisioning causes OOM errors. Profile first.", applies: "Match GPU memory to your model size. Don't use A100 for inference that fits on T4." },
  { strategy: "Quantise models for inference", savings: "50-75% compute reduction", risk: "Slight quality loss (usually <1% on benchmarks)", applies: "All production inference. INT8/INT4 quantisation is essentially free performance." },
  { strategy: "Use serverless for bursty workloads", savings: "Variable — no idle costs", risk: "Cold start latency (2-30 seconds)", applies: "Low-traffic APIs, batch processing, development environments" },
  { strategy: "Implement model caching", savings: "40-80% on repeated queries", risk: "Stale cache for time-sensitive data", applies: "RAG systems, chatbots, any system with repeated query patterns" },
  { strategy: "Set budget alerts and auto-shutdown", savings: "Prevents bill shock", risk: "None — pure risk mitigation", applies: "Every AI project. Set alerts at 50%, 80%, 100% of budget. Auto-stop training at budget limit." },
]

export default function CloudInfraPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  const [activeCloud, setActiveCloud] = useState<"aws" | "gcp" | "azure">("aws")

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Deep Dive</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">Cloud Infrastructure for AI</h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          AWS, GCP, Azure, Snowflake, Databricks — where to run your AI workloads,
          how to choose between platforms, and how to not go bankrupt on GPU bills.
          Infrastructure decisions compound. Choose wisely.
        </p>
      </div>

      <div className="sticky top-[80px] z-40 flex flex-wrap gap-2 p-2.5 rounded-[18px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.78)] backdrop-blur-[16px] shadow-editorial-soft">
        {TABS.map((tab) => { const Icon = tab.icon; return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm transition-all duration-200 border", activeTab === tab.id ? "text-editorial-ink bg-white/96 border-[rgba(44,49,59,0.15)] shadow-sm" : "text-editorial-muted bg-white/40 border-[rgba(44,49,59,0.06)] hover:bg-white/60")}>
            <Icon className="h-3.5 w-3.5" /><span className="hidden sm:inline">{tab.label}</span>
          </button>
        )})}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (<motion.div key="ov" {...fadeIn} className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">Choosing your cloud — the decision framework</h2>
          <Card className="glass-panel-strong"><CardContent className="p-6 space-y-3">
            <p className="text-sm text-editorial-muted leading-relaxed">The #1 rule: <strong className="text-editorial-ink">go where your data already lives.</strong> Migrating petabytes of data between clouds costs more than any ML compute savings. If your company uses AWS for everything, use AWS for ML. If your data is in BigQuery, use Vertex AI.</p>
            <p className="text-sm text-editorial-muted">The #2 rule: <strong className="text-editorial-ink">use managed services unless you have a strong reason not to.</strong> SageMaker, Vertex AI, and Azure ML handle 90% of the infrastructure complexity. Don&apos;t build your own training cluster unless you&apos;re at Netflix scale.</p>
          </CardContent></Card>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(["aws", "gcp", "azure"] as const).map((cloud) => {
              const c = CLOUD_COMPARISON[cloud]
              return (<Card key={cloud} className="cursor-pointer hover:-translate-y-[1px] hover:shadow-editorial-hover transition-all" onClick={() => { setActiveCloud(cloud); setActiveTab(cloud); }}>
                <CardContent className="p-5 space-y-2">
                  <h3 className="font-serif font-semibold text-sm" style={{ color: c.color }}>{c.name}</h3>
                  <p className="text-xs text-editorial-muted">{c.bestFor}</p>
                </CardContent>
              </Card>)
            })}
          </div>
        </motion.div>)}

        {(activeTab === "aws" || activeTab === "gcp" || activeTab === "azure") && (<motion.div key={activeTab} {...fadeIn} className="space-y-6">
          {(() => { const c = CLOUD_COMPARISON[activeTab]; return (<>
            <h2 className="text-2xl font-serif font-bold" style={{ color: c.color }}>{c.name}</h2>
            <div className="space-y-2">{c.strengths.map((s) => (<div key={s} className="flex items-start gap-1.5 text-sm text-editorial-ink/80"><CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-editorial-green" />{s}</div>))}</div>
            <h3 className="text-lg font-serif font-semibold text-editorial-ink">ML Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{c.mlServices.map((s) => (
              <Card key={s.name}><CardContent className="p-4"><h4 className="font-serif font-semibold text-editorial-ink text-sm">{s.name}</h4><p className="text-xs text-editorial-muted mt-1">{s.desc}</p></CardContent></Card>
            ))}</div>
            <Card className="glass-panel-strong"><CardContent className="p-5"><p className="text-sm text-editorial-green font-medium"><strong>Best for:</strong> {c.bestFor}</p></CardContent></Card>
          </>)})()}
        </motion.div>)}

        {activeTab === "data" && (<motion.div key="data" {...fadeIn} className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">Data platforms for AI</h2>
          {DATA_PLATFORMS.map((p) => (
            <Card key={p.name}><CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between"><h3 className="font-serif font-semibold text-editorial-ink text-lg">{p.name}</h3><Badge variant="secondary" className="text-[10px]">{p.cost}</Badge></div>
              <p className="text-sm text-editorial-muted">{p.desc}</p>
              <div className="space-y-1">{p.strengths.map((s) => (<div key={s} className="flex items-start gap-1.5 text-xs text-editorial-green"><CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />{s}</div>))}</div>
              <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2"><p className="text-xs text-editorial-green"><strong>Best for:</strong> {p.bestFor}</p></div>
            </CardContent></Card>
          ))}
        </motion.div>)}

        {activeTab === "cost" && (<motion.div key="cost" {...fadeIn} className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">Cost management — how to not go broke on GPUs</h2>
          <Card className="glass-panel-strong"><CardContent className="p-6 text-center space-y-2">
            <p className="text-3xl font-serif font-bold text-editorial-red">$72,000/month</p>
            <p className="text-sm text-editorial-muted">Cost of 8x A100 GPUs running 24/7 on-demand on AWS. This is why cost management matters.</p>
          </CardContent></Card>
          {COST_STRATEGIES.map((s) => (
            <Card key={s.strategy}><CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div><h3 className="font-serif font-semibold text-editorial-ink text-sm">{s.strategy}</h3><p className="text-xs text-editorial-muted mt-1">{s.applies}</p></div>
                <Badge variant="beginner" className="text-[10px] shrink-0">Save {s.savings}</Badge>
              </div>
              {s.risk !== "None — pure risk mitigation" && (<p className="text-xs text-editorial-amber mt-2"><AlertTriangle className="h-3 w-3 inline mr-1" /><strong>Risk:</strong> {s.risk}</p>)}
            </CardContent></Card>
          ))}
        </motion.div>)}
      </AnimatePresence>

      <Card className="glass-panel-strong"><CardContent className="p-6 text-center space-y-2">
        <p className="text-lg font-serif font-semibold text-editorial-ink">Infrastructure is a means, not an end.</p>
        <p className="text-sm text-editorial-muted max-w-lg mx-auto">The goal is shipping AI that works, not building the most sophisticated infrastructure. Use managed services, control costs, and invest your engineering time in the model and product — not the plumbing.</p>
      </CardContent></Card>
    </div>
  )
}
