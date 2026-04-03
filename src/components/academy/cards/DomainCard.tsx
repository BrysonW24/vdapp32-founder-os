"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DomainCardProps {
  slug: string
  name: string
  tagline: string
  color: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  playbookCount: number
  systemCount: number
  moduleCount: number
  hasContent: boolean
}

export function DomainCard({
  slug,
  name,
  tagline,
  color,
  icon: Icon,
  playbookCount,
  systemCount,
  moduleCount,
  hasContent,
}: DomainCardProps) {
  return (
    <Link
      href={hasContent ? `/domains/${slug}` : "#"}
      className={cn("block", !hasContent && "cursor-default")}
      aria-disabled={!hasContent}
      tabIndex={!hasContent ? -1 : undefined}
    >
      <motion.div
        whileHover={hasContent ? { scale: 1.02 } : {}}
        whileTap={hasContent ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Card
          className={cn(
            "relative h-full overflow-hidden transition-colors",
            hasContent && "hover:border-primary/40"
          )}
          style={{ borderLeftWidth: 4, borderLeftColor: hasContent ? color : undefined }}
        >
          {!hasContent && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">Coming Soon</span>
              </div>
            </div>
          )}

          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 mb-1">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${color}18` }}
              >
                <Icon className="h-4.5 w-4.5" style={{ color }} />
              </div>
              <CardTitle className="text-lg">{name}</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-editorial-muted leading-relaxed line-clamp-2 mb-3">
              {tagline}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{playbookCount} playbook{playbookCount !== 1 ? "s" : ""}</span>
              <span className="text-border">·</span>
              <span>{systemCount} system{systemCount !== 1 ? "s" : ""}</span>
              <span className="text-border">·</span>
              <span>{moduleCount} module{moduleCount !== 1 ? "s" : ""}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
