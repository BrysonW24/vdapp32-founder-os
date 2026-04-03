"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/curriculum"

interface ProjectCardProps {
  project: Project
}

function DifficultyMeter({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">Difficulty</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 w-2.5 rounded-sm transition-colors",
              i < value
                ? value <= 3
                  ? "bg-emerald-500"
                  : value <= 6
                    ? "bg-amber-500"
                    : "bg-rose-500"
                : "bg-muted"
            )}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-foreground">{value}/10</span>
    </div>
  )
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Card className="h-full hover:border-primary/40 transition-colors">
          <CardHeader className="pb-3">
            <DifficultyMeter value={project.difficulty} />
            <CardTitle className="text-lg mt-2">{project.title}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>

            <div className="flex flex-wrap gap-1.5">
              {project.skillsLearned.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="outline" className="text-[11px]">
                  {skill}
                </Badge>
              ))}
              {project.skillsLearned.length > 4 && (
                <Badge variant="outline" className="text-[11px]">
                  +{project.skillsLearned.length - 4}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{project.estimatedHours} hour{project.estimatedHours !== 1 ? "s" : ""}</span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
