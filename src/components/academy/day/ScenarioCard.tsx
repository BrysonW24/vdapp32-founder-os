"use client"

import type { DayInLife } from "@/types/curriculum"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Building2, Users, Store, Laptop } from "lucide-react"

const SETTING_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  corporation: Building2,
  "medium-business": Users,
  "small-business": Store,
  freelancer: Laptop,
}

interface ScenarioCardProps {
  scenario: DayInLife
  isActive: boolean
  onClick: () => void
}

export function ScenarioCard({ scenario, isActive, onClick }: ScenarioCardProps) {
  const Icon = SETTING_ICONS[scenario.slug] ?? Building2

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isActive && "ring-2 ring-primary border-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-sm">{scenario.title}</h3>
        </div>
        <p className="text-xs text-muted-foreground">{scenario.companySize}</p>
        <Badge variant="secondary" className="text-xs">
          {scenario.salary}
        </Badge>
      </CardContent>
    </Card>
  )
}
