import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Resources",
  description:
    "Frontier AI resources across docs, papers, books, people, and toolchains for product and platform builders.",
}

const SECTIONS = [
  {
    title: "Docs and Cookbooks",
    items: ["OpenAI docs", "Anthropic docs", "Modal docs", "Weights & Biases docs", "vLLM docs"],
  },
  {
    title: "People to Learn From",
    items: ["Andrej Karpathy", "Lilian Weng", "Chip Huyen", "Simon Willison", "Hamel Husain"],
  },
  {
    title: "Books and Deep Dives",
    items: [
      "AI Engineering — Chip Huyen",
      "Designing Machine Learning Systems — Chip Huyen",
      "Full Stack Deep Learning",
      "Papers With Code",
      "Frontier lab engineering blogs and technical posts",
    ],
  },
  {
    title: "Toolchains to Know",
    items: ["DSPy", "LangGraph", "Ray", "CUDA / NVIDIA", "W&B", "vLLM"],
  },
]

export default function ResourcesPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Resource Stack
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Frontier AI resources
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          The point of this stack is not to collect links. It is to orient you around
          the docs, thinkers, books, and toolchains that shape modern product and
          platform work at the frontier.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((section) => (
          <Card key={section.title}>
            <CardHeader className="pb-2">
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {section.items.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-editorial-muted">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-editorial-green shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
