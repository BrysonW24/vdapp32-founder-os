"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Database, Search, FileText, Layers, Zap, AlertTriangle, CheckCircle2,
  ArrowRight, Settings, BarChart3, Shield, Bot, Sparkles, Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

type TabId = "what" | "architecture" | "chunking" | "embeddings" | "retrieval" | "advanced" | "eval"

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "what", label: "What is RAG", icon: Database },
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "chunking", label: "Chunking", icon: FileText },
  { id: "embeddings", label: "Embeddings", icon: Sparkles },
  { id: "retrieval", label: "Retrieval", icon: Search },
  { id: "advanced", label: "Advanced Patterns", icon: Settings },
  { id: "eval", label: "Evaluation", icon: BarChart3 },
]

const RAG_STACK = [
  { layer: "Data Sources", icon: FileText, color: "#386a58", items: ["PDFs, docs, web pages", "Databases, APIs", "Code repositories", "Confluence, Notion, Slack"], desc: "Where your knowledge lives. RAG connects LLMs to YOUR data." },
  { layer: "Ingestion & Chunking", icon: Layers, color: "#2f4f79", items: ["Document parsing (Unstructured, LlamaParse)", "Chunk strategy (fixed, semantic, recursive)", "Metadata extraction", "Overlap and context windows"], desc: "Break documents into digestible pieces the model can reason over." },
  { layer: "Embedding & Indexing", icon: Sparkles, color: "#6d28d9", items: ["Embedding models (OpenAI, Cohere, BGE)", "Vector database (Pinecone, Weaviate, Chroma)", "Hybrid indexing (vector + keyword)", "Metadata filtering"], desc: "Convert text to vectors and store in a searchable index." },
  { layer: "Retrieval", icon: Search, color: "#a16a1f", items: ["Similarity search (cosine, dot product)", "Hybrid search (vector + BM25)", "Re-ranking (Cohere, cross-encoder)", "Query transformation"], desc: "Find the most relevant chunks for a given question." },
  { layer: "Generation", icon: Bot, color: "#a0453f", items: ["LLM (Claude, GPT-4, Llama)", "System prompt with retrieved context", "Citation and source attribution", "Streaming response"], desc: "The LLM synthesises an answer using retrieved context." },
  { layer: "Evaluation & Monitoring", icon: BarChart3, color: "#2563eb", items: ["Faithfulness (does the answer match the context?)", "Relevance (did we retrieve the right chunks?)", "Answer quality (is it actually helpful?)", "Latency and cost tracking"], desc: "Measure whether RAG is actually working — not just vibes." },
]

const CHUNKING_STRATEGIES = [
  { name: "Fixed-size chunks", desc: "Split every N tokens (e.g., 512 tokens with 50-token overlap). Simplest approach.", pros: ["Easy to implement", "Predictable chunk sizes", "Works for most use cases"], cons: ["Cuts mid-sentence/paragraph", "No semantic awareness", "Important context can be split across chunks"], when: "Start here. Good enough for 80% of RAG applications." },
  { name: "Recursive character splitting", desc: "Split on paragraph breaks, then sentences, then words. Preserves natural boundaries.", pros: ["Respects document structure", "Better semantic coherence", "LangChain's default for good reason"], cons: ["Variable chunk sizes", "May produce very small chunks", "Doesn't understand document hierarchy"], when: "Default for most production RAG. Use LangChain's RecursiveCharacterTextSplitter." },
  { name: "Semantic chunking", desc: "Use embeddings to detect topic shifts. Split when the embedding similarity between consecutive sentences drops below a threshold.", pros: ["Chunks are semantically coherent", "Each chunk covers one topic", "Best retrieval quality"], cons: ["Requires embedding computation during ingestion", "Slower to process", "More complex to implement"], when: "When retrieval quality matters more than speed. Worth it for production systems." },
  { name: "Document-structure-aware", desc: "Parse document structure (headings, sections, tables) and chunk based on the document's own organisation.", pros: ["Preserves document hierarchy", "Tables and lists stay intact", "Headers provide natural metadata"], cons: ["Requires document parsing (Unstructured, LlamaParse)", "Format-dependent", "PDFs are notoriously messy"], when: "Documents with clear structure (technical docs, legal contracts, manuals)." },
  { name: "Parent-child chunking", desc: "Index small chunks for retrieval precision but return the parent (larger) chunk for generation context.", pros: ["Best of both worlds — precise retrieval, rich context", "LLM gets more context without irrelevant noise"], cons: ["More complex index structure", "Higher storage requirements"], when: "When you need both retrieval precision AND generation quality. LlamaIndex supports this natively." },
]

const EMBEDDING_MODELS = [
  { name: "text-embedding-3-large (OpenAI)", dims: 3072, quality: "Excellent", cost: "$0.13/M tokens", note: "Best general-purpose. Supports dimension reduction (use 1536 or 256 for cost savings)." },
  { name: "text-embedding-3-small (OpenAI)", dims: 1536, quality: "Very Good", cost: "$0.02/M tokens", note: "Great cost/quality tradeoff. Start here for most projects." },
  { name: "voyage-3 (Voyage AI)", dims: 1024, quality: "Excellent", cost: "$0.06/M tokens", note: "Top of MTEB leaderboard. Excellent for code and technical content." },
  { name: "BGE-large-en-v1.5 (BAAI)", dims: 1024, quality: "Very Good", cost: "Free (self-hosted)", note: "Best open-source option. Run locally with no API costs." },
  { name: "Cohere embed-v3", dims: 1024, quality: "Excellent", cost: "$0.10/M tokens", note: "Strong multilingual support. Pairs well with Cohere's reranker." },
]

const ADVANCED_PATTERNS = [
  { name: "Query Transformation", desc: "Rewrite the user's query before retrieval. Techniques: HyDE (generate a hypothetical answer, embed that instead), multi-query (generate multiple query variations and merge results), step-back prompting (ask a more general question first).", why: "Users ask bad questions. Query transformation improves retrieval by 20-40%.", example: "User asks: 'Why is my model slow?' → HyDE generates a hypothetical answer about inference optimisation → that embedding matches technical docs better than the vague question." },
  { name: "Re-ranking", desc: "After initial retrieval (top-50), use a cross-encoder model to re-rank results by actual relevance to the query. Return top-5.", why: "Bi-encoder retrieval (embedding similarity) is fast but approximate. Cross-encoder re-ranking is slow but precise. Combining both gives you speed AND quality.", example: "Retrieve 50 chunks with vector search (fast). Re-rank with Cohere Rerank or a cross-encoder (accurate). Return top 5. Typically improves answer quality by 15-25%." },
  { name: "Agentic RAG", desc: "An AI agent decides WHEN to retrieve, WHAT to search for, and WHETHER the results are sufficient. If not, it reformulates and searches again.", why: "Simple RAG always retrieves. Agentic RAG reasons about whether retrieval is needed, what to search for, and when to stop. More intelligent, more accurate, more expensive.", example: "Agent receives question → decides it needs context → searches vector DB → evaluates results → decides it needs more specific info → reformulates query → searches again → synthesises answer from both result sets." },
  { name: "Graph RAG", desc: "Build a knowledge graph from your documents. Use graph traversal + vector search for retrieval. Captures relationships between entities.", why: "Vector search finds similar text. Graph RAG finds connected concepts. If your documents describe relationships (org charts, product dependencies, legal references), graph RAG captures what vector search misses.", example: "Question: 'What teams depend on the Auth service?' — Vector search might miss this. Graph RAG traverses the dependency graph and finds all connected teams." },
  { name: "Self-RAG / Corrective RAG", desc: "The LLM evaluates its own retrieval and generation. If the retrieved context is irrelevant or the answer is unfaithful, it re-retrieves or abstains.", why: "Regular RAG blindly trusts retrieved context. Self-RAG adds a quality gate: 'Is this context actually relevant? Is my answer actually supported by the context?' Reduces hallucination significantly.", example: "Model retrieves context → evaluates relevance (score: 0.3, too low) → re-retrieves with modified query → evaluates again (score: 0.8, good) → generates answer → checks faithfulness → returns with confidence score." },
]

const EVAL_METRICS = [
  { metric: "Faithfulness", desc: "Does the generated answer accurately reflect the retrieved context? No hallucinated facts.", how: "Compare claims in the answer against the source chunks. Use an LLM-as-judge or NLI model.", target: "> 0.9" },
  { metric: "Context Relevance", desc: "Did the retrieval step find chunks that are actually relevant to the question?", how: "Score each retrieved chunk for relevance to the query. Average across chunks.", target: "> 0.7" },
  { metric: "Answer Relevance", desc: "Does the answer actually address the user's question?", how: "Generate hypothetical questions from the answer. Measure similarity to the original question.", target: "> 0.8" },
  { metric: "Context Precision", desc: "Are the relevant chunks ranked higher than irrelevant ones in retrieval results?", how: "Check if the most useful chunks appear in the top positions.", target: "> 0.7" },
  { metric: "Answer Correctness", desc: "Is the answer factually correct (compared to a ground truth)?", how: "Compare against human-annotated reference answers. Use semantic similarity + factual overlap.", target: "> 0.8" },
]

export default function RAGDeepDivePage() {
  const [activeTab, setActiveTab] = useState<TabId>("what")

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Deep Dive</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          RAG: Retrieval-Augmented Generation
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          RAG is the most important pattern in production AI today. It lets LLMs answer
          questions using YOUR data — documents, databases, knowledge bases — without
          fine-tuning. This guide covers everything from basic architecture to
          production-grade patterns.
        </p>
      </div>

      {/* Pill nav */}
      <div className="sticky top-[80px] z-40 flex flex-wrap gap-2 p-2.5 rounded-[18px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.78)] backdrop-blur-[16px] shadow-editorial-soft">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm transition-all duration-200 border",
              activeTab === tab.id ? "text-editorial-ink bg-white/96 border-[rgba(44,49,59,0.15)] shadow-sm" : "text-editorial-muted bg-white/40 border-[rgba(44,49,59,0.06)] hover:bg-white/60"
            )}>
              <Icon className="h-3.5 w-3.5" /><span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "what" && (
          <motion.div key="what" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">What is RAG and why does it matter?</h2>
            <Card className="glass-panel-strong">
              <CardContent className="p-6 space-y-3">
                <p className="text-sm text-editorial-muted leading-relaxed">LLMs are powerful but they have two fundamental limitations: they don&apos;t know about YOUR data, and their training data has a cutoff date. RAG solves both by retrieving relevant information from your own sources and injecting it into the LLM&apos;s context at query time.</p>
                <p className="text-sm text-editorial-muted leading-relaxed">Think of it like an open-book exam. The LLM is the student. Your documents are the textbook. RAG lets the student look up the answer in the textbook before responding — instead of relying entirely on memory (which may be wrong or outdated).</p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Without RAG", items: ["LLM relies on training data only", "Can't access your private data", "Knowledge cutoff date", "Hallucinations on specific facts", "One-size-fits-all answers"], color: "text-editorial-red" },
                { title: "With RAG", items: ["LLM uses YOUR documents as source", "Answers grounded in real data", "Always current (re-index anytime)", "Citations and source attribution", "Domain-specific, accurate answers"], color: "text-editorial-green" },
              ].map((col) => (
                <Card key={col.title}>
                  <CardContent className="p-5 space-y-2">
                    <h3 className={cn("font-serif font-semibold", col.color)}>{col.title}</h3>
                    {col.items.map((item) => (
                      <div key={item} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                        {col.color === "text-editorial-red" ? <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0 text-editorial-red" /> : <CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0 text-editorial-green" />}
                        {item}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "architecture" && (
          <motion.div key="arch" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">The RAG architecture stack</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">Every RAG system follows this 6-layer pattern. Understanding each layer is the difference between a demo and a production system.</p>
            <div className="space-y-3">
              {RAG_STACK.map((layer, i) => (
                <Card key={layer.layer}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold font-serif" style={{ backgroundColor: layer.color }}>{i + 1}</span>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-serif font-semibold text-editorial-ink">{layer.layer}</h3>
                        <p className="text-xs text-editorial-muted">{layer.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.items.map((item) => (<Badge key={item} variant="secondary" className="text-[10px]">{item}</Badge>))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "chunking" && (
          <motion.div key="chunk" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Chunking strategies</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">Chunking is where most RAG systems succeed or fail. How you split your documents determines retrieval quality. Get this wrong and no amount of model quality will save you.</p>
            {CHUNKING_STRATEGIES.map((s) => (
              <Card key={s.name}>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-serif font-semibold text-editorial-ink">{s.name}</h3>
                  <p className="text-sm text-editorial-muted">{s.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">{s.pros.map((p) => (<div key={p} className="flex items-start gap-1.5 text-xs text-editorial-green"><CheckCircle2 className="h-3 w-3 mt-0.5 shrink-0" />{p}</div>))}</div>
                    <div className="space-y-1">{s.cons.map((c) => (<div key={c} className="flex items-start gap-1.5 text-xs text-editorial-amber"><AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />{c}</div>))}</div>
                  </div>
                  <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                    <p className="text-xs text-editorial-green"><strong>When to use:</strong> {s.when}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === "embeddings" && (
          <motion.div key="embed" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Embedding models compared</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">Embeddings convert text into vectors that capture semantic meaning. The choice of embedding model affects retrieval quality, cost, and latency.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-[rgba(44,49,59,0.08)]">
                  <th className="text-left py-2 pr-3 text-editorial-muted font-medium">Model</th>
                  <th className="text-center py-2 px-2 text-editorial-muted font-medium">Dims</th>
                  <th className="text-center py-2 px-2 text-editorial-muted font-medium">Quality</th>
                  <th className="text-center py-2 px-2 text-editorial-muted font-medium">Cost</th>
                  <th className="text-left py-2 pl-2 text-editorial-muted font-medium">Notes</th>
                </tr></thead>
                <tbody>{EMBEDDING_MODELS.map((m) => (
                  <tr key={m.name} className="border-b border-[rgba(44,49,59,0.04)]">
                    <td className="py-2 pr-3 font-medium text-editorial-ink">{m.name}</td>
                    <td className="py-2 px-2 text-center font-mono">{m.dims}</td>
                    <td className="py-2 px-2 text-center">{m.quality}</td>
                    <td className="py-2 px-2 text-center font-mono">{m.cost}</td>
                    <td className="py-2 pl-2 text-editorial-muted">{m.note}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "retrieval" && (
          <motion.div key="ret" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Retrieval strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Dense retrieval (vector search)", desc: "Embed the query, find nearest neighbours in vector space. Captures semantic similarity — 'car' matches 'automobile'.", tool: "Pinecone, Weaviate, ChromaDB" },
                { name: "Sparse retrieval (BM25/keyword)", desc: "Traditional keyword matching with TF-IDF weighting. Exact matches — 'Model X' finds 'Model X', not 'electric car'.", tool: "Elasticsearch, Typesense" },
                { name: "Hybrid search", desc: "Combine dense + sparse with weighted fusion (RRF). Best of both: semantic understanding + exact matching.", tool: "Weaviate, Pinecone (built-in hybrid)" },
                { name: "Re-ranking", desc: "Retrieve top-50 with fast search, then re-rank with a cross-encoder for precision. 2-stage pipeline.", tool: "Cohere Rerank, cross-encoder models" },
              ].map((s) => (
                <Card key={s.name}>
                  <CardContent className="p-5 space-y-2">
                    <h3 className="font-serif font-semibold text-editorial-ink text-sm">{s.name}</h3>
                    <p className="text-xs text-editorial-muted leading-relaxed">{s.desc}</p>
                    <Badge variant="outline" className="text-[10px]">{s.tool}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "advanced" && (
          <motion.div key="adv" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Advanced RAG patterns</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">Basic RAG gets you 70% of the way. These patterns get you to 95%.</p>
            {ADVANCED_PATTERNS.map((p) => (
              <Card key={p.name}>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-serif font-semibold text-editorial-ink text-lg">{p.name}</h3>
                  <p className="text-sm text-editorial-muted leading-relaxed">{p.desc}</p>
                  <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                    <p className="text-xs text-editorial-amber"><strong>Why it matters:</strong> {p.why}</p>
                  </div>
                  <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                    <p className="text-xs text-editorial-green"><strong>Example:</strong> {p.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === "eval" && (
          <motion.div key="eval" {...fadeIn} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-editorial-ink">Evaluating RAG systems</h2>
            <p className="text-sm text-editorial-muted max-w-2xl">If you can&apos;t measure it, you can&apos;t improve it. Use these metrics with RAGAS, DeepEval, or LlamaIndex&apos;s eval module.</p>
            <div className="space-y-3">
              {EVAL_METRICS.map((m) => (
                <Card key={m.metric}>
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="sm:w-36 shrink-0">
                      <h3 className="font-serif font-semibold text-editorial-ink text-sm">{m.metric}</h3>
                      <Badge variant="beginner" className="text-[10px] mt-1">Target: {m.target}</Badge>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-xs text-editorial-ink/80">{m.desc}</p>
                      <p className="text-[10px] text-editorial-muted"><strong>How:</strong> {m.how}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="glass-panel-strong">
              <CardContent className="p-6 space-y-2">
                <h3 className="font-serif font-semibold text-editorial-ink">Tools for RAG evaluation</h3>
                <div className="flex flex-wrap gap-2">
                  {["RAGAS", "DeepEval", "LlamaIndex Evaluators", "TruLens", "Langsmith", "Phoenix (Arize)"].map((t) => (
                    <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">RAG is not a feature. It&apos;s an architecture decision.</p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">Get chunking, retrieval, and evaluation right — and you have a production AI system. Get them wrong — and you have a hallucination machine with extra steps.</p>
        </CardContent>
      </Card>
    </div>
  )
}
