import type { Metadata } from "next"
import { getModules } from "@/lib/content"
import ConstellationMap from "@/components/academy/progress/ConstellationMap"
import type { ConstellationModule } from "@/components/academy/progress/ConstellationMap"

export const metadata: Metadata = {
  title: "Learning Galaxy",
  description:
    "Explore the Frontier AI Engineer Academy as a 3D constellation across core frontier systems, robotics, and classical ML tracks.",
}

export default function LearningMapPage() {
  const rawModules = getModules("ai-engineering")

  const modules: ConstellationModule[] = rawModules.map((m) => ({
    slug: m.slug,
    title: m.title,
    category: m.category ?? m.domain ?? "general",
    relatedModules: m.relatedModules,
    levelNumber: m.levelNumber ?? m.order,
    order: m.order,
    status: m.status,
  }))

  return <ConstellationMap modules={modules} />
}
