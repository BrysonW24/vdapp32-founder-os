"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { DOMAINS } from "@/types/curriculum"

const FREQUENCY_LABELS: Record<string, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  quarterly: "Quarterly",
  "as-needed": "As Needed",
}

const OWNER_LABELS: Record<string, string> = {
  founder: "Founder",
  hire: "Hire",
  contractor: "Contractor",
  automated: "Automated",
}

interface SystemCardProps {
  slug: string
  title: string
  domain: string
  summary: string
  frequency: string
  owner: string
}

export function SystemCard({
  slug,
  title,
  domain,
  summary,
  frequency,
  owner,
}: SystemCardProps) {
  const domainMeta = DOMAINS.find((d) => d.slug === domain)

  return (
    <Link href={`/systems/${slug}`} className="block">
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
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {FREQUENCY_LABELS[frequency] ?? frequency}
              </span>
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="line-clamp-2">{summary}</CardDescription>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-[10px] px-2 py-0">
                {OWNER_LABELS[owner] ?? owner}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
