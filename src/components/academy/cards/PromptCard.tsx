"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DOMAINS } from "@/types/curriculum"

interface PromptCardProps {
  slug: string
  title: string
  domain: string
  description: string
  promptCount: number
}

export function PromptCard({
  slug,
  title,
  domain,
  description,
  promptCount,
}: PromptCardProps) {
  const domainMeta = DOMAINS.find((d) => d.slug === domain)

  return (
    <Link href={`/prompts#${slug}`} className="block">
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
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessageSquare className="h-3 w-3" />
              <span>{promptCount} prompt{promptCount !== 1 ? "s" : ""}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
