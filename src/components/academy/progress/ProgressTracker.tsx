"use client"

import { useEffect } from "react"
import { useProgress } from "@/lib/progress"

interface ProgressTrackerProps {
  slug: string
  type: "module" | "lesson" | "tool" | "framework"
  hasQuiz?: boolean
}

export function ProgressTracker({ slug, type, hasQuiz }: ProgressTrackerProps) {
  const { completeModule, completeLesson, viewTool, completeFramework } = useProgress()

  useEffect(() => {
    switch (type) {
      case "module":
        completeModule(slug)
        break
      case "lesson":
        // If lesson has a quiz, don't auto-complete — quiz handles it
        if (!hasQuiz) completeLesson(slug)
        break
      case "tool":
        viewTool(slug)
        break
      case "framework":
        completeFramework(slug)
        break
    }
  }, [slug, type, hasQuiz, completeModule, completeLesson, viewTool, completeFramework])

  return null
}
