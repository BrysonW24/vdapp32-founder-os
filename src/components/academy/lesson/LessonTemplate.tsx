import Link from "next/link"
import type { Lesson, Module } from "@/types/curriculum"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Target,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { LessonCompletionBadge } from "./LessonCompletionBadge"
import { QuizSection } from "./QuizSection"
import { PerspectiveToggle } from "./PerspectiveToggle"

interface LessonTemplateProps {
  lesson: Lesson
  module: Module
  subjectSlug?: string
  subjectName?: string
}

export function LessonTemplate({ lesson, module, subjectSlug, subjectName }: LessonTemplateProps) {
  const base = subjectSlug ? `/${subjectSlug}/learn/modules` : "/modules"

  return (
    <div className="container max-w-4xl py-6 sm:py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground overflow-hidden">
        {subjectSlug && subjectName && (
          <>
            <Link href={`/${subjectSlug}`} className="hover:text-foreground transition-colors shrink-0">
              {subjectName}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          </>
        )}
        <Link href={base} className="hover:text-foreground transition-colors shrink-0">
          Modules
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link
          href={`${base}/${module.slug}`}
          className="hover:text-foreground transition-colors truncate"
        >
          {module.title}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <span className="text-foreground truncate">{lesson.title}</span>
      </nav>

      {/* Title */}
      <div>
        <div className="flex items-center flex-wrap gap-2">
          <Badge variant={module.level}>{module.level}</Badge>
          <LessonCompletionBadge lessonSlug={lesson.slug} />
        </div>
        <h1 className="text-3xl font-bold mt-3">{lesson.title}</h1>
      </div>

      {/* Objective */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-5">
          <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-sm text-primary mb-1">Objective</p>
            <p className="text-sm">{lesson.objective}</p>
          </div>
        </CardContent>
      </Card>

      {/* What this is */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          What this is
        </h2>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {lesson.beginnerExplanation}
        </div>
      </section>

      {/* Why it matters */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-academy-amber" />
          Why it matters
        </h2>
        <p className="text-muted-foreground leading-relaxed">{module.whyItMatters}</p>
      </section>

      {/* Going deeper — with optional executive lens toggle */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Going deeper</h2>
        {lesson.perspectives ? (
          <PerspectiveToggle
            perspectives={lesson.perspectives}
            defaultContent={lesson.deeperExplanation}
          />
        ) : (
          <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {lesson.deeperExplanation}
          </div>
        )}
      </section>

      {/* Key Takeaways */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          Key Takeaways
        </h2>
        <ol className="space-y-2 list-decimal list-inside">
          {lesson.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="text-muted-foreground leading-relaxed">
              {takeaway}
            </li>
          ))}
        </ol>
      </section>

      {/* Real Example */}
      <Card className="bg-secondary/50">
        <CardContent className="p-5 space-y-2">
          <h3 className="font-semibold">Real Example</h3>
          <p className="text-muted-foreground leading-relaxed">{lesson.example}</p>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-academy-rose" />
          Common Mistakes
        </h2>
        <ul className="space-y-2">
          {lesson.commonMistakes.map((mistake, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-muted-foreground"
            >
              <span className="text-academy-rose mt-1 shrink-0">&#x2717;</span>
              {mistake}
            </li>
          ))}
        </ul>
      </section>

      {/* Exercise */}
      <Card className="border-academy-teal/30 bg-academy-teal/5">
        <CardContent className="p-5 space-y-2">
          <h3 className="font-semibold text-primary">Your Exercise</h3>
          <p className="text-muted-foreground leading-relaxed">{lesson.exercise}</p>
        </CardContent>
      </Card>

      {/* Quiz / Knowledge Check */}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <QuizSection quiz={lesson.quiz} lessonSlug={lesson.slug} />
      )}

      {/* Frameworks */}
      {lesson.frameworks.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-semibold">Related Frameworks</h3>
          <div className="flex flex-wrap gap-2">
            {lesson.frameworks.map((fw) => (
              <Link key={fw} href={subjectSlug ? `/${subjectSlug}/toolkit` : "/toolkit"}>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                  {fw}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Next Lesson */}
      {lesson.nextLesson && (
        <div className="flex justify-end pt-4">
          <Button asChild>
            <Link
              href={`${base}/${lesson.moduleSlug}/${lesson.nextLesson}`}
              className="flex items-center gap-2"
            >
              Next Lesson
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
