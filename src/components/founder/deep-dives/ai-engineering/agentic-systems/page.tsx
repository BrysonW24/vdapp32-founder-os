"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot, Zap, Target, Layers, Shield, Eye, Brain, Settings,
  ArrowRight, CheckCircle2, AlertTriangle, Workflow, Search,
  FileText, Code, MessageSquare, Database,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

type TabId = "what" | "patterns" | "tools" | "multi" | "safety" | "production"
const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "what", label: "What Are Agents", icon: Bot },
  { id: "patterns", label: "Agent Patterns", icon: Workflow },
  { id: "tools", label: "Tool Use", icon: Settings },
  { id: "multi", label: "Multi-Agent", icon: Layers },
  { id: "safety", label: "Safety & Guardrails", icon: Shield },
  { id: "production", label: "Production", icon: Zap },
]

const AGENT_PATTERNS = [
  { name: "ReAct (Reason + Act)", desc: "The agent thinks step by step, decides which tool to use, observes the result, then reasons about the next step. The foundational agent loop.", example: "Question: 'What's the weather in Sydney and should I bring an umbrella?' → Think: I need weather data → Act: call weather API → Observe: 22°C, 80% rain chance → Think: High rain probability → Answer: 'Yes, bring an umbrella. It's 22°C with 80% chance of rain in Sydney.'", tools: ["LangChain ReAct agent", "Claude tool use", "OpenAI function calling"] },
  { name: "Plan and Execute", desc: "The agent first creates a complete plan (list of steps), then executes each step. Better for complex multi-step tasks where the full plan matters.", example: "Task: 'Research competitor pricing and create a comparison table' → Plan: [1. Search for competitors, 2. Visit each pricing page, 3. Extract pricing tiers, 4. Format as table, 5. Add analysis] → Execute each step sequentially.", tools: ["LangChain Plan-and-Execute", "AutoGPT pattern"] },
  { name: "Reflection / Self-Critique", desc: "The agent generates an output, then critiques its own work and iterates. Improves quality through self-evaluation loops.", example: "Write code → Run tests → Tests fail → Agent reads error → Fixes code → Tests pass → Agent reviews code quality → Refactors → Final output.", tools: ["Reflexion pattern", "LangGraph cycles"] },
  { name: "Tool-Augmented Generation", desc: "The LLM decides when to call external tools (APIs, databases, calculators, search) during generation. Extends capabilities beyond text.", example: "User asks about stock price → LLM calls financial API → Gets real-time data → Formats answer with current price, change, and chart description.", tools: ["Claude tool use", "OpenAI function calling", "Anthropic MCP"] },
  { name: "Autonomous Coding Agent", desc: "An agent that can read codebases, write code, run tests, debug, and iterate — operating as an autonomous software engineer.", example: "Claude Code reads your codebase, understands the architecture, writes a feature, runs tests, fixes failures, and submits a clean PR — with human review as the final gate.", tools: ["Claude Code", "Cursor Composer", "Devin", "SWE-Agent"] },
]

const MULTI_AGENT = [
  { name: "Supervisor pattern", desc: "One 'supervisor' agent delegates tasks to specialised worker agents and coordinates results. Like a manager assigning work to a team.", agents: ["Supervisor (orchestrator)", "Researcher (web search)", "Writer (content generation)", "Reviewer (quality check)"], when: "Complex workflows where different steps require different capabilities." },
  { name: "Debate / Adversarial", desc: "Two agents take opposing positions and debate. A judge agent evaluates the arguments and decides the best answer.", agents: ["Proposer (generates answer)", "Critic (finds flaws)", "Judge (decides winner)"], when: "When you need high-confidence answers on ambiguous or controversial topics." },
  { name: "Pipeline / Sequential", desc: "Agents are chained in sequence. Each agent's output becomes the next agent's input. Assembly line of AI workers.", agents: ["Researcher → Writer → Editor → Publisher"], when: "Structured workflows with clear stages (content creation, data processing)." },
  { name: "Swarm / Collaborative", desc: "Multiple agents work on the same problem simultaneously, sharing findings and building on each other's work. Like a research team.", agents: ["Agent A explores approach 1", "Agent B explores approach 2", "Synthesiser merges insights"], when: "When exploration breadth matters — research, brainstorming, complex analysis." },
]

const TOOL_CATEGORIES = [
  { category: "Information retrieval", tools: ["Web search (Tavily, SerpAPI)", "RAG (vector DB search)", "Database queries (SQL, GraphQL)", "API calls (any REST/GraphQL endpoint)"], icon: Search },
  { category: "Code execution", tools: ["Python interpreter", "Shell commands", "Container execution", "Jupyter kernels"], icon: Code },
  { category: "File operations", tools: ["Read/write files", "Parse documents (PDF, DOCX)", "Generate spreadsheets", "Create visualisations"], icon: FileText },
  { category: "Communication", tools: ["Send emails", "Post to Slack", "Create calendar events", "Generate reports"], icon: MessageSquare },
  { category: "Data & storage", tools: ["Database CRUD", "Vector DB operations", "File storage (S3, GCS)", "Cache management"], icon: Database },
]

const SAFETY_PRINCIPLES = [
  { principle: "Human-in-the-loop", desc: "For high-stakes actions (sending emails, modifying data, deploying code), require human approval before execution. The agent proposes; the human decides.", level: "Essential" },
  { principle: "Sandboxing", desc: "Run agent code in isolated environments (Docker, E2B, Modal). Never give agents access to production systems without containment.", level: "Essential" },
  { principle: "Budget limits", desc: "Set token budgets, API call limits, and execution timeouts. A runaway agent loop can burn through $1,000 in minutes.", level: "Essential" },
  { principle: "Action allowlists", desc: "Define exactly which tools an agent CAN use. Default deny — agents only have tools explicitly granted to them.", level: "Important" },
  { principle: "Audit trails", desc: "Log every tool call, every decision, every output. If an agent does something unexpected, you need to trace why.", level: "Important" },
  { principle: "Graceful degradation", desc: "When an agent fails or is uncertain, it should say so — not make up an answer or take a risky action. 'I'm not confident' is better than a wrong action.", level: "Important" },
]

export default function AgenticSystemsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("what")
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Deep Dive</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">Agentic AI Systems</h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Agents are AI systems that can reason, plan, use tools, and take actions autonomously.
          They&apos;re the frontier of applied AI — from coding agents that write software to
          research agents that explore problems independently. This page covers architectures,
          patterns, safety, and production deployment.
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
        {activeTab === "what" && (
          <motion.div key="what" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">What makes something an &quot;agent&quot;?</h2>
            <Card className="glass-panel-strong"><CardContent className="p-6 space-y-3">
              <p className="text-sm text-editorial-muted leading-relaxed">An AI agent is an LLM that can: (1) <strong>reason</strong> about a problem, (2) <strong>plan</strong> a sequence of steps, (3) <strong>use tools</strong> to interact with external systems, and (4) <strong>iterate</strong> based on results. A chatbot answers questions. An agent solves problems.</p>
              <p className="text-sm text-editorial-muted leading-relaxed">The core loop is: <strong>Perceive → Think → Act → Observe → Repeat</strong>. The agent reads the situation, decides what to do, takes action (calling a tool, writing code, searching the web), observes the result, and decides the next step. This loop continues until the task is complete or the agent decides it can&apos;t proceed.</p>
            </CardContent></Card>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Chatbot", desc: "Answers questions from its training data. No tools, no planning, no memory between turns.", level: "Level 0" },
                { label: "RAG System", desc: "Retrieves context before answering. Grounded in data but still reactive — responds to queries, doesn't take actions.", level: "Level 1" },
                { label: "Agent", desc: "Plans, reasons, uses tools, takes actions, and iterates. Can complete complex multi-step tasks autonomously.", level: "Level 2" },
              ].map((item) => (
                <Card key={item.label}><CardContent className="p-4 space-y-1.5">
                  <Badge variant="secondary" className="text-[10px]">{item.level}</Badge>
                  <h3 className="font-serif font-semibold text-editorial-ink text-sm">{item.label}</h3>
                  <p className="text-xs text-editorial-muted">{item.desc}</p>
                </CardContent></Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "patterns" && (
          <motion.div key="patterns" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Agent architecture patterns</h2>
            {AGENT_PATTERNS.map((p) => (
              <Card key={p.name}><CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink text-lg">{p.name}</h3>
                <p className="text-sm text-editorial-muted">{p.desc}</p>
                <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                  <p className="text-xs text-editorial-green"><strong>Example:</strong> {p.example}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">{p.tools.map((t) => (<Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>))}</div>
              </CardContent></Card>
            ))}
          </motion.div>
        )}

        {activeTab === "tools" && (
          <motion.div key="tools" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Tool use — how agents interact with the world</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">Tools are how agents go beyond text generation. The LLM decides WHEN to use a tool, WHICH tool to use, and WHAT arguments to pass. The tool executes and returns results.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOOL_CATEGORIES.map((cat) => (
                <Card key={cat.category}><CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-editorial-blue-soft"><cat.icon className="h-4 w-4 text-editorial-blue" /></div>
                    <h3 className="font-serif font-semibold text-editorial-ink text-sm">{cat.category}</h3>
                  </div>
                  {cat.tools.map((t) => (<div key={t} className="flex items-start gap-1.5 text-xs text-editorial-ink/80"><CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" />{t}</div>))}
                </CardContent></Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "multi" && (
          <motion.div key="multi" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Multi-agent systems</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">One agent is powerful. Multiple agents working together can solve problems no single agent can handle. These patterns define how agents collaborate.</p>
            {MULTI_AGENT.map((ma) => (
              <Card key={ma.name}><CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink">{ma.name}</h3>
                <p className="text-sm text-editorial-muted">{ma.desc}</p>
                <div className="flex flex-wrap gap-1.5">{ma.agents.map((a) => (<Badge key={a} variant="secondary" className="text-[10px]">{a}</Badge>))}</div>
                <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                  <p className="text-xs text-editorial-amber"><strong>When to use:</strong> {ma.when}</p>
                </div>
              </CardContent></Card>
            ))}
          </motion.div>
        )}

        {activeTab === "safety" && (
          <motion.div key="safety" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Safety & guardrails</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">Agents that can act in the real world need guardrails. An unconstrained agent with production database access is a disaster waiting to happen.</p>
            {SAFETY_PRINCIPLES.map((s) => (
              <Card key={s.principle}><CardContent className="p-4 flex items-start gap-3">
                <Badge variant={s.level === "Essential" ? "beginner" : "intermediate"} className="text-[10px] shrink-0 mt-0.5">{s.level}</Badge>
                <div><h3 className="font-serif font-semibold text-editorial-ink text-sm">{s.principle}</h3><p className="text-xs text-editorial-muted mt-1">{s.desc}</p></div>
              </CardContent></Card>
            ))}
          </motion.div>
        )}

        {activeTab === "production" && (
          <motion.div key="prod" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Production agent systems</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">Real-world agent deployments at scale.</p>
            {[
              { company: "Claude Code (Anthropic)", desc: "An autonomous coding agent that reads your entire codebase, plans implementations, writes code, runs tests, fixes failures, and iterates — with human approval gates for destructive operations.", lesson: "The human-in-the-loop pattern is what makes autonomous coding safe. The agent proposes; the engineer reviews." },
              { company: "Devin (Cognition)", desc: "A fully autonomous software engineer that can handle entire tickets end-to-end — from reading the issue to deploying the fix. Uses sandboxed browser, terminal, and code editor.", lesson: "Sandboxed execution environments are essential. Devin can't accidentally break production because it runs in containers." },
              { company: "Cursor Composer", desc: "Multi-file code editing agent that understands your project structure, makes coordinated changes across files, and applies them with your approval.", lesson: "Agents work best when they understand context. Cursor's codebase indexing gives the agent the context it needs." },
              { company: "Google Gemini Agents", desc: "Agentic capabilities in Google Workspace — agents that can search your Drive, draft emails, create presentations, and coordinate across tools based on natural language instructions.", lesson: "Enterprise agents need tight integration with existing tools and strict permission scoping." },
            ].map((ex) => (
              <Card key={ex.company}><CardContent className="p-5 space-y-3">
                <h3 className="font-serif font-semibold text-editorial-ink">{ex.company}</h3>
                <p className="text-sm text-editorial-muted">{ex.desc}</p>
                <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                  <p className="text-xs text-editorial-green"><strong>Key lesson:</strong> {ex.lesson}</p>
                </div>
              </CardContent></Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="glass-panel-strong"><CardContent className="p-6 text-center space-y-2">
        <p className="text-lg font-serif font-semibold text-editorial-ink">Agents are the most powerful and most dangerous AI pattern.</p>
        <p className="text-sm text-editorial-muted max-w-lg mx-auto">Power without guardrails is a liability. Build agents that are capable AND safe — with human oversight, sandboxing, and clear boundaries.</p>
      </CardContent></Card>
    </div>
  )
}
