import type { Metadata } from "next"
import { getModules } from "@/lib/content"
import { MarketingSystemMap } from "@/components/academy/progress/MarketingSystemMap"
import ConstellationMap from "@/components/academy/progress/ConstellationMap"
import type { ConstellationModule } from "@/components/academy/progress/ConstellationMap"

export const metadata: Metadata = {
  title: "The Marketing System — Marketing Academy",
  description:
    "Marketing is not one thing. It is a connected system. Explore how every discipline connects and track your progress across 26 modules.",
}

export default function LearningMapPage() {
  const rawModules = getModules("marketing")

  const modules: ConstellationModule[] = rawModules.map((m) => ({
    slug: m.slug,
    title: m.title,
    category: m.category ?? m.domain ?? "general",
    relatedModules: m.relatedModules,
    levelNumber: m.levelNumber ?? m.order,
    order: m.order,
    status: m.status,
  }))

  return (
    <>
      {/* Original Marketing System Map */}
      <section className="container py-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
            System View
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
            The Marketing System
          </h1>
          <p className="text-editorial-muted mt-4 text-base sm:text-lg leading-relaxed">
            Marketing is not one thing. It is a connected system. Click any node to see its
            details and connections.
          </p>
        </div>
        <MarketingSystemMap />
      </section>

      {/* Divider */}
      <div className="container">
        <div className="h-px bg-[rgba(44,49,59,0.08)] my-4" />
        <div className="text-center py-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-2">
            Your Learning Galaxy
          </p>
          <p className="text-sm text-editorial-muted max-w-md mx-auto">
            Track your progress across all 26 modules. Each star represents a module — completed stars glow brighter.
          </p>
        </div>
      </div>

      {/* Three.js Constellation Map */}
      <ConstellationMap modules={modules} />
    </>
  )
}
