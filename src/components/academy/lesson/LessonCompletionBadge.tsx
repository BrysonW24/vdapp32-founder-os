"use client"

import { useProgress } from "@/lib/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface Props {
  lessonSlug: string
}

export function LessonCompletionBadge({ lessonSlug }: Props) {
  const isComplete = useProgress((s) => s.completedLessons.includes(lessonSlug))

  if (!isComplete) return null

  return (
    <Badge className="bg-editorial-green-soft text-editorial-green border-transparent text-xs ml-2">
      <CheckCircle2 className="h-3 w-3 mr-1" />
      Completed
    </Badge>
  )
}
