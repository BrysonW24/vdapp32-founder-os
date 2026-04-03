"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DOMAINS } from "@/types/curriculum"

interface PlaybookCardProps {
  slug: string
  title: string
  domain: string
  summary: string
  difficulty: string
  timeToComplete: string
}

export function PlaybookCard({
  slug,
  title,
  domain,
  summary,
  difficulty,
  timeToComplete,
}: PlaybookCardProps) {
  const domainMeta = DOMAINS.find((d) => d.slug === domain)

  return (
    <Link href={`/playbooks/${slug}`} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Card className={cn("relative h-full overflow-hidden transition-colors hover:border-primary/40")}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              {domainMeta && (
                <Badge
                  className="border-transparent text-[11px]"
                  style={{
                    backgroundColor: `${domainMeta.color}18`,
                    color: domainMeta.color,
                  }}
                >
                  {domainMeta.label}
                </Badge>
              )}
              <Badge
                variant={
                  difficulty === "beginner"
                    ? "beginner"
                    : difficulty === "intermediate"
                      ? "intermediate"
                      : "advanced"
                }
              >
                {difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="line-clamp-2">{summary}</CardDescription>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{timeToComplete}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
