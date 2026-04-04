import type { Metadata } from "next"
import { getModules } from "@/lib/content"
import { SalesSystemMap } from "@/components/academy/progress/SalesSystemMap"
import ConstellationMap from "@/components/academy/progress/ConstellationMap"
import type { ConstellationModule } from "@/components/academy/progress/ConstellationMap"

export const metadata: Metadata = {
  title: "The Sales System — Sales Academy",
  description:
    "Sales is not one thing. It is a connected system. Explore how every discipline connects and track your progress across the academy.",
}

export default function LearningMapPage() {
  const rawModules = getModules("sales")

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
      {/* Sales System Map */}
      <section className="container py-10 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
            System View
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
            The Sales System
          </h1>
          <p className="text-editorial-muted mt-4 text-base sm:text-lg leading-relaxed">
            Sales is a coordinated commercial system. Explore how account strategy,
            prospecting, discovery, deal control, forecasting, and expansion fit together.
          </p>
        </div>
        <SalesSystemMap />
      </section>

      {/* Divider */}
      <div className="container">
        <div className="h-px bg-[rgba(44,49,59,0.08)] my-4" />
        <div className="text-center py-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-2">
            Your Learning Galaxy
          </p>
          <p className="text-sm text-editorial-muted max-w-md mx-auto">
            Track your progress across all {modules.length} modules. Each star represents a module — completed stars glow brighter.
          </p>
        </div>
      </div>

      {/* Three.js Constellation Map */}
      <ConstellationMap modules={modules} />
    </>
  )
}
