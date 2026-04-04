import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  Bot,
  Database,
  FileSearch,
  GitBranch,
  ShieldCheck,
} from "lucide-react"

export const metadata = {
  title: "AI Development Workflows",
  description:
    "Engineering workflows for eval pipelines, retrieval ingestion, agent tool loops, release review, and incident response.",
}

const WORKFLOWS = [
  {
    icon: ShieldCheck,
    title: "Prompt CI and Eval Gates",
    description:
      "Treat prompt updates like code changes: run eval suites, compare regressions, and block release when quality or latency degrades.",
  },
  {
    icon: Database,
    title: "Retrieval Ingestion Loops",
    description:
      "Ingest documents, enrich metadata, version the index, and trace failures back to chunking, freshness, or ownership issues.",
  },
  {
    icon: Bot,
    title: "Agent Tool Loops",
    description:
      "Design tool use with retries, logging, approval checkpoints, and bounded permissions instead of letting agents run unobserved.",
  },
  {
    icon: GitBranch,
    title: "Release Review",
    description:
      "Bundle prompts, retrieval settings, model changes, and fallbacks into a release packet that can be explained, tested, and rolled back.",
  },
  {
    icon: Activity,
    title: "Failure Analysis and Incident Triage",
    description:
      "Classify hallucinations, latency spikes, bad tool calls, and stale retrieval separately so the team can fix the real layer instead of guessing.",
  },
  {
    icon: FileSearch,
    title: "Post-Launch Review",
    description:
      "Feed runtime traces, thumbs-up or correction data, and support tickets back into product decisions and future eval sets.",
  },
]

const PRINCIPLES = [
  "Automate the repeatable parts, but keep humans in the loop for risky actions and releases.",
  "Track failures by category. “The model was bad” is rarely specific enough to be useful.",
  "If a workflow cannot be explained or rolled back, it is not ready for production use.",
]

export default function AIWorkflowsPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Workflow Layer
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          AI Development Workflows
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Frontier AI teams do not win by chaining together demos. They win by building
          workflows for evaluation, retrieval, release review, failure analysis, and
          supervised autonomy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WORKFLOWS.map((workflow) => {
          const Icon = workflow.icon
          return (
            <Card key={workflow.title} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft mb-3">
                  <Icon className="h-5 w-5 text-editorial-green" />
                </div>
                <CardTitle>{workflow.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-editorial-muted leading-relaxed">
                {workflow.description}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-3">
          <h2 className="text-xl font-serif font-bold text-editorial-ink">Workflow Principles</h2>
          {PRINCIPLES.map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-editorial-muted">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-editorial-green shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
