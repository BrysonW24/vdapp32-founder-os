"use client"

import { useState } from "react"
import { Briefcase, AlertTriangle, Star, TrendingUp } from "lucide-react"
import type { DayInLife } from "@/types/curriculum"
import { ScenarioCard } from "@/components/academy/day/ScenarioCard"
import { TimelineView } from "@/components/academy/day/TimelineView"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SubjectDayInLifeClientProps {
  scenarios: DayInLife[]
}

export function SubjectDayInLifeClient({
  scenarios,
}: SubjectDayInLifeClientProps) {
  const [activeSlug, setActiveSlug] = useState(scenarios[0]?.slug ?? "")
  const active = scenarios.find((scenario) => scenario.slug === activeSlug)

  if (scenarios.length === 0) {
    return (
      <p className="text-editorial-muted text-center py-12">
        Scenarios coming soon.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.slug}
            scenario={scenario}
            isActive={scenario.slug === activeSlug}
            onClick={() => setActiveSlug(scenario.slug)}
          />
        ))}
      </div>

      {active && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-editorial-ink">
              {active.title}
            </h2>
            <p className="text-editorial-muted text-sm">{active.description}</p>
            <TimelineView scenario={active} />
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm text-editorial-ink">
                  <Briefcase className="h-4 w-4 text-editorial-green" />
                  Responsibilities
                </h3>
                <ul className="space-y-1.5">
                  {active.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-editorial-muted flex items-start gap-2"
                    >
                      <div className="h-1 w-1 rounded-full bg-editorial-green mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm text-editorial-ink">
                  <AlertTriangle className="h-4 w-4 text-editorial-amber" />
                  Challenges
                </h3>
                <ul className="space-y-1.5">
                  {active.challenges.map((item) => (
                    <li key={item} className="text-xs text-editorial-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm text-editorial-ink">
                  <Star className="h-4 w-4 text-editorial-amber" />
                  Rewards
                </h3>
                <ul className="space-y-1.5">
                  {active.rewards.map((item) => (
                    <li key={item} className="text-xs text-editorial-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm text-editorial-ink">
                  <TrendingUp className="h-4 w-4 text-editorial-blue" />
                  Career Path
                </h3>
                <div className="space-y-1.5">
                  {active.careerPath.map((step, index) => (
                    <div key={step} className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {index + 1}
                      </Badge>
                      <span className="text-editorial-muted">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
