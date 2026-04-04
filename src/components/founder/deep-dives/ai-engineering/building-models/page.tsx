"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Brain, Database, Layers, BarChart3, Settings, Zap, Target,
  CheckCircle2, AlertTriangle, ArrowRight, Code, Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

type TabId = "overview" | "data" | "training" | "evaluation" | "finetuning" | "deployment"
const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: Brain },
  { id: "data", label: "Data Prep", icon: Database },
  { id: "training", label: "Training", icon: Zap },
  { id: "evaluation", label: "Evaluation", icon: BarChart3 },
  { id: "finetuning", label: "Fine-tuning", icon: Settings },
  { id: "deployment", label: "Serving", icon: Layers },
]

const MODEL_TYPES = [
  { name: "Classical ML", examples: "Linear regression, decision trees, random forests, XGBoost, SVM", when: "Tabular data, structured features, interpretability required, limited compute", tools: "scikit-learn, XGBoost, LightGBM" },
  { name: "Deep Learning (CNNs)", examples: "Image classification, object detection, segmentation", when: "Image and video data, spatial patterns", tools: "PyTorch, TensorFlow, torchvision" },
  { name: "Deep Learning (RNNs/LSTMs)", examples: "Time series, sequential data, older NLP", when: "Sequential data where order matters (largely replaced by Transformers for NLP)", tools: "PyTorch, TensorFlow" },
  { name: "Transformers", examples: "GPT, BERT, T5, ViT, Whisper", when: "NLP, code, multi-modal, any sequence data. The dominant architecture.", tools: "Hugging Face Transformers, PyTorch" },
  { name: "Diffusion Models", examples: "Stable Diffusion, DALL-E, Midjourney", when: "Image generation, video generation, audio synthesis", tools: "diffusers (Hugging Face), PyTorch" },
  { name: "Reinforcement Learning", examples: "Game AI, robotics, recommendation optimisation", when: "Sequential decision-making where you learn from rewards/penalties", tools: "Gymnasium, Stable Baselines3, Ray RLlib" },
]

const TRAINING_STEPS = [
  { step: 1, title: "Define the problem", desc: "Classification? Regression? Generation? The problem type determines the model architecture, loss function, and evaluation metrics.", tip: "Start with the simplest model that could work. Don't reach for a Transformer when logistic regression solves it." },
  { step: 2, title: "Prepare data", desc: "Clean, split (train/validation/test), normalise, encode, and create data loaders. This is 60-80% of the work.", tip: "Never leak test data into training. Use stratified splits for imbalanced classes. Track data versions with DVC." },
  { step: 3, title: "Choose architecture", desc: "Select a model architecture. For most tasks, start with a pre-trained model and fine-tune — don't train from scratch.", tip: "Hugging Face Model Hub has 400K+ pre-trained models. Find one close to your task and adapt it." },
  { step: 4, title: "Configure training", desc: "Set hyperparameters: learning rate, batch size, epochs, optimiser (Adam is usually the right default), loss function, regularisation.", tip: "Learning rate is the most important hyperparameter. Too high = divergence. Too low = slow convergence. Use a learning rate finder." },
  { step: 5, title: "Train and monitor", desc: "Run training. Monitor loss curves (train AND validation). Watch for overfitting (train loss drops, val loss rises). Log everything.", tip: "Use W&B or MLflow to track experiments. You WILL need to compare runs. Don't rely on terminal output." },
  { step: 6, title: "Evaluate on held-out test set", desc: "Only after you're happy with validation performance. The test set is used ONCE to report final performance. Not for tuning.", tip: "If you tune on the test set, your reported numbers are optimistic. This is the most common mistake in ML." },
  { step: 7, title: "Iterate", desc: "Didn't meet your target? Diagnose: more data? Better features? Different architecture? Hyperparameter tuning? Error analysis on failure cases.", tip: "Error analysis is more valuable than hyperparameter tuning. Look at the examples your model gets wrong. That tells you what to fix." },
]

const FINETUNING_APPROACHES = [
  { name: "Full fine-tuning", desc: "Update ALL model weights on your dataset. Most flexible but requires the most compute and data.", compute: "High (full GPU cluster)", data: "10K-100K+ examples", risk: "Catastrophic forgetting — model loses general knowledge", when: "Domain-specific models (medical, legal, code) with large datasets" },
  { name: "LoRA (Low-Rank Adaptation)", desc: "Freeze most weights, add small trainable matrices to specific layers. 90%+ parameter-efficient.", compute: "Low-Medium (single GPU)", data: "1K-10K examples", risk: "Limited adaptation — may not capture deep domain knowledge", when: "Most fine-tuning tasks. Start here. LoRA + QLoRA on a single A100 is the standard." },
  { name: "QLoRA", desc: "LoRA on a quantised (4-bit) model. Fine-tune a 70B model on a single GPU.", compute: "Very low (single consumer GPU)", data: "1K-10K examples", risk: "Slight quality loss from quantisation", when: "When you have limited GPU budget. Democratised fine-tuning." },
  { name: "Prompt tuning / Prefix tuning", desc: "Learn soft prompt tokens that steer the model. Model weights are frozen entirely.", compute: "Very low", data: "100-1K examples", risk: "Limited expressiveness — can only steer, not deeply adapt", when: "Quick domain adaptation, multi-tenant scenarios where each tenant needs a different behaviour" },
  { name: "RLHF / DPO", desc: "Align model outputs with human preferences using reinforcement learning or direct preference optimisation.", compute: "High", data: "10K+ preference pairs", risk: "Complex training, reward hacking", when: "Chat models, safety alignment, instruction following" },
]

const SERVING_OPTIONS = [
  { name: "API-based (OpenAI, Anthropic, Bedrock)", pros: ["Zero infrastructure management", "Always latest models", "Global availability"], cons: ["Per-token cost at scale", "Data privacy concerns", "Vendor lock-in"], cost: "$$-$$$", best: "Prototyping, most production apps, when data privacy is managed" },
  { name: "Self-hosted (vLLM, TGI, TensorRT-LLM)", pros: ["Full control", "No per-token costs at scale", "Data stays on-prem"], cons: ["GPU infrastructure required", "Ops burden", "Need to manage scaling"], cost: "$$$-$$$$", best: "High-volume inference, sensitive data, custom models" },
  { name: "Serverless GPU (Modal, Replicate, RunPod)", pros: ["Pay-per-use GPU", "No idle costs", "Easy scaling"], cons: ["Cold start latency", "Limited customisation", "Per-second pricing adds up"], cost: "$$", best: "Bursty workloads, experimentation, side projects" },
  { name: "Edge deployment (ONNX, TF Lite, Core ML)", pros: ["No network latency", "Works offline", "Privacy by default"], cons: ["Model size constraints", "Limited compute", "Complex optimisation"], cost: "$", best: "Mobile apps, IoT, privacy-critical applications" },
]

export default function BuildingModelsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Deep Dive</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">Building & Training Models</h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          From data preparation to training to evaluation to deployment. This covers the
          full lifecycle of building a machine learning model — from classical ML to
          fine-tuning LLMs.
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
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">Model types — when to use what</h2>
          <div className="space-y-3">{MODEL_TYPES.map((m) => (
            <Card key={m.name}><CardContent className="p-4">
              <h3 className="font-serif font-semibold text-editorial-ink text-sm">{m.name}</h3>
              <p className="text-xs text-editorial-muted mt-1"><strong>Examples:</strong> {m.examples}</p>
              <p className="text-xs text-editorial-muted"><strong>When:</strong> {m.when}</p>
              <div className="flex flex-wrap gap-1 mt-2">{m.tools.split(", ").map((t) => (<Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>))}</div>
            </CardContent></Card>
          ))}</div>
        </motion.div>)}

        {activeTab === "training" && (<motion.div key="train" {...fadeIn} className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">The training lifecycle</h2>
          {TRAINING_STEPS.map((s) => (
            <Card key={s.step}><CardContent className="p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-editorial-green text-white text-sm font-bold">{s.step}</span>
                <div className="space-y-2">
                  <h3 className="font-serif font-semibold text-editorial-ink">{s.title}</h3>
                  <p className="text-sm text-editorial-muted">{s.desc}</p>
                  <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2"><p className="text-xs text-editorial-amber"><strong>Tip:</strong> {s.tip}</p></div>
                </div>
              </div>
            </CardContent></Card>
          ))}
        </motion.div>)}

        {activeTab === "finetuning" && (<motion.div key="ft" {...fadeIn} className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">Fine-tuning approaches</h2>
          {FINETUNING_APPROACHES.map((f) => (
            <Card key={f.name}><CardContent className="p-5 space-y-3">
              <h3 className="font-serif font-semibold text-editorial-ink text-lg">{f.name}</h3>
              <p className="text-sm text-editorial-muted">{f.desc}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div><span className="text-editorial-muted block text-[10px] uppercase tracking-wide">Compute</span><span className="text-editorial-ink">{f.compute}</span></div>
                <div><span className="text-editorial-muted block text-[10px] uppercase tracking-wide">Data needed</span><span className="text-editorial-ink">{f.data}</span></div>
                <div><span className="text-editorial-muted block text-[10px] uppercase tracking-wide">Risk</span><span className="text-editorial-red">{f.risk}</span></div>
                <div><span className="text-editorial-muted block text-[10px] uppercase tracking-wide">Best for</span><span className="text-editorial-green">{f.when}</span></div>
              </div>
            </CardContent></Card>
          ))}
        </motion.div>)}

        {activeTab === "deployment" && (<motion.div key="deploy" {...fadeIn} className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">Model serving options</h2>
          {SERVING_OPTIONS.map((s) => (
            <Card key={s.name}><CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between"><h3 className="font-serif font-semibold text-editorial-ink">{s.name}</h3><Badge variant="secondary" className="text-[10px]">{s.cost}</Badge></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">{s.pros.map((p) => (<div key={p} className="flex items-start gap-1.5 text-xs text-editorial-green"><CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />{p}</div>))}</div>
                <div className="space-y-1">{s.cons.map((c) => (<div key={c} className="flex items-start gap-1.5 text-xs text-editorial-amber"><AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />{c}</div>))}</div>
              </div>
              <p className="text-xs text-editorial-green"><strong>Best for:</strong> {s.best}</p>
            </CardContent></Card>
          ))}
        </motion.div>)}

        {(activeTab === "data" || activeTab === "evaluation") && (<motion.div key={activeTab} {...fadeIn} className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">{activeTab === "data" ? "Data preparation" : "Model evaluation"}</h2>
          <Card className="glass-panel-strong"><CardContent className="p-6">
            <p className="text-sm text-editorial-muted">See the dedicated <a href={activeTab === "data" ? "/modules/data-fundamentals" : "/measurement-architecture"} className="text-editorial-green underline">module page</a> for comprehensive coverage of {activeTab === "data" ? "data preparation, cleaning, feature engineering, and pipeline design" : "evaluation metrics, benchmarks, and measurement architecture"}.</p>
          </CardContent></Card>
        </motion.div>)}
      </AnimatePresence>

      <Card className="glass-panel-strong"><CardContent className="p-6 text-center space-y-2">
        <p className="text-lg font-serif font-semibold text-editorial-ink">Start with the simplest model that could work. Then improve.</p>
        <p className="text-sm text-editorial-muted max-w-lg mx-auto">The best ML engineers don&apos;t reach for the most complex architecture first. They start simple, measure, diagnose, and iterate. Complexity is earned, not assumed.</p>
      </CardContent></Card>
    </div>
  )
}
