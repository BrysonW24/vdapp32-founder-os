"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Search,
  Mail,
  MessageSquare,
  Presentation,
  Handshake,
  BarChart3,
  RefreshCw,
  ArrowRight,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface MapNode {
  id: string
  label: string
  icon: LucideIcon
  color: string
  bgColor: string
  description: string
  details: string
  connections: string[]
  href: string
}

const NODES: MapNode[] = [
  {
    id: "icp-accounts",
    label: "ICP & Accounts",
    icon: Building2,
    color: "#386a58",
    bgColor: "#e5f1ea",
    description: "Decide who is worth pursuing and why.",
    details:
      "Every strong sales motion starts with account selection. Define the ICP, understand what makes an account commercially attractive, and turn territory into a deliberate list instead of a random collection of logos.",
    connections: ["prospecting", "discovery", "expansion-revops"],
    href: "/modules/prospecting",
  },
  {
    id: "prospecting",
    label: "Prospecting",
    icon: Search,
    color: "#2f4f79",
    bgColor: "#e6eef8",
    description: "Research accounts, triggers, and likely pain.",
    details:
      "Prospecting is where pipeline quality begins. Great reps work from hypotheses, trigger events, account context, and persona-specific problems rather than sending generic volume for its own sake.",
    connections: ["icp-accounts", "outreach", "forecasting"],
    href: "/modules/prospecting",
  },
  {
    id: "outreach",
    label: "Outreach",
    icon: Mail,
    color: "#a16a1f",
    bgColor: "#f7ecd6",
    description: "Earn the first conversation with relevance.",
    details:
      "Outbound works when a message sounds like it was written after real thinking. Strong outreach connects account context, persona pain, and a believable reason to reply now.",
    connections: ["prospecting", "discovery", "demo-solutioning"],
    href: "/modules/outbound-outreach",
  },
  {
    id: "discovery",
    label: "Discovery",
    icon: MessageSquare,
    color: "#6d28d9",
    bgColor: "#ede9fe",
    description: "Diagnose pain, priority, and buying risk.",
    details:
      "Discovery turns curiosity into deal quality. The goal is not just to learn what the buyer says they want, but to uncover business impact, urgency, stakeholders, and the cost of doing nothing.",
    connections: ["icp-accounts", "outreach", "demo-solutioning", "deal-control"],
    href: "/modules/discovery-calls",
  },
  {
    id: "demo-solutioning",
    label: "Demo & Solutioning",
    icon: Presentation,
    color: "#2563eb",
    bgColor: "#dbeafe",
    description: "Translate buyer pain into a tailored path forward.",
    details:
      "A good demo is a business argument in visual form. It proves fit, shows workflow change, and gives the buying group confidence that the solution can survive internal scrutiny.",
    connections: ["outreach", "discovery", "deal-control", "forecasting"],
    href: "/modules/presentations-demos",
  },
  {
    id: "deal-control",
    label: "Deal Control",
    icon: Handshake,
    color: "#a0453f",
    bgColor: "#f7e5e2",
    description: "Manage next steps, risks, and commitments.",
    details:
      "Deals are won through disciplined progression. Mutual action plans, stakeholder mapping, procurement management, and clear next steps stop opportunities from drifting into false optimism.",
    connections: ["discovery", "demo-solutioning", "forecasting", "expansion-revops"],
    href: "/modules/closing",
  },
  {
    id: "forecasting",
    label: "Forecasting",
    icon: BarChart3,
    color: "#4338ca",
    bgColor: "#e0e7ff",
    description: "Know what is real, what is at risk, and why.",
    details:
      "Forecasting is decision-quality thinking, not spreadsheet theatre. It forces honest deal inspection, clean pipeline hygiene, and a sharper understanding of which opportunities are truly likely to close.",
    connections: ["prospecting", "demo-solutioning", "deal-control", "expansion-revops"],
    href: "/modules/pipeline-management",
  },
  {
    id: "expansion-revops",
    label: "Expansion & RevOps",
    icon: RefreshCw,
    color: "#0f766e",
    bgColor: "#ccfbf1",
    description: "Carry the account forward after the first close.",
    details:
      "The best sellers think beyond the signature. Expansion, renewals, handoff quality, and RevOps alignment determine whether initial pipeline becomes durable revenue and whether customer-facing teams learn fast enough to improve the whole system.",
    connections: ["icp-accounts", "deal-control", "forecasting"],
    href: "/modules/account-management",
  },
]

const NODE_ANGLES: Record<string, number> = {
  "icp-accounts": 90,
  prospecting: 45,
  outreach: 0,
  discovery: 315,
  "demo-solutioning": 270,
  "deal-control": 225,
  forecasting: 180,
  "expansion-revops": 135,
}

function getNodePosition(id: string, radius: number) {
  const angle = ((NODE_ANGLES[id] ?? 0) * Math.PI) / 180
  return { x: 50 + Math.cos(angle) * radius, y: 50 - Math.sin(angle) * radius }
}

export function SalesSystemMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const radius = 34

  const handleHover = useCallback((id: string | null) => setHoveredNode(id), [])
  const handleClick = useCallback((id: string) => setActiveNode((prev) => (prev === id ? null : id)), [])
  const handleClose = useCallback(() => setActiveNode(null), [])

  const activeData = NODES.find((n) => n.id === activeNode)

  return (
    <div>
      <div className="relative w-full max-w-xl mx-auto" style={{ aspectRatio: "1/1" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {NODES.flatMap((node) =>
            node.connections
              .filter((cId) => cId > node.id)
              .map((cId) => {
                const from = getNodePosition(node.id, radius)
                const to = getNodePosition(cId, radius)
                const isHighlighted =
                  hoveredNode === node.id ||
                  hoveredNode === cId ||
                  activeNode === node.id ||
                  activeNode === cId
                const isConnected =
                  activeNode &&
                  (NODES.find((n) => n.id === activeNode)?.connections.includes(node.id) ||
                    NODES.find((n) => n.id === activeNode)?.connections.includes(cId))
                const isDimmed = activeNode && !isHighlighted && !isConnected

                return (
                  <motion.line
                    key={`${node.id}-${cId}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#c4bfb4"
                    strokeWidth={isHighlighted ? 0.4 : 0.2}
                    strokeDasharray={isHighlighted ? "none" : "0.8 0.8"}
                    opacity={isDimmed ? 0.1 : isHighlighted ? 0.7 : 0.3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                )
              })
          )}

          <motion.circle
            cx={50}
            cy={50}
            r={6}
            fill="#386a58"
            stroke="white"
            strokeWidth={0.8}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
          />
          <text x={50} y={49} textAnchor="middle" fontSize="2.4" fontWeight="700" fill="white">
            Sales
          </text>
          <text x={50} y={52} textAnchor="middle" fontSize="1.8" fill="rgba(255,255,255,0.7)">
            System
          </text>

          {NODES.map((node, i) => {
            const pos = getNodePosition(node.id, radius)
            const isActive = activeNode === node.id
            const isHovered = hoveredNode === node.id
            const isConnected =
              activeNode &&
              NODES.find((n) => n.id === activeNode)?.connections.includes(node.id)
            const isDimmed = activeNode && !isActive && !isConnected

            return (
              <g
                key={node.id}
                onMouseEnter={() => handleHover(node.id)}
                onMouseLeave={() => handleHover(null)}
                onClick={() => handleClick(node.id)}
                className="cursor-pointer"
              >
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 7.5 : isHovered ? 7 : 6.5}
                  fill={node.bgColor}
                  stroke={isActive || isHovered ? node.color : "rgba(44,49,59,0.08)"}
                  strokeWidth={isActive ? 0.6 : 0.3}
                  opacity={isDimmed ? 0.3 : 1}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isDimmed ? 0.3 : 1 }}
                  transition={{
                    type: "spring",
                    delay: 0.15 + i * 0.06,
                    opacity: { duration: 0.2 },
                  }}
                />
                <circle
                  cx={pos.x}
                  cy={pos.y - 1.5}
                  r={1}
                  fill={node.color}
                  opacity={isDimmed ? 0.2 : 0.5}
                />
                <text
                  x={pos.x}
                  y={pos.y + 2.5}
                  textAnchor="middle"
                  fontSize="1.8"
                  fontWeight="600"
                  fill={node.color}
                  opacity={isDimmed ? 0.2 : 1}
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {activeData ? (
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="max-w-xl mx-auto">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-[10px]"
                      style={{ backgroundColor: activeData.bgColor }}
                    >
                      <activeData.icon className="h-4 w-4" style={{ color: activeData.color }} />
                    </div>
                    <CardTitle className="text-base">{activeData.label}</CardTitle>
                  </div>
                  <button onClick={handleClose} className="p-1 hover:bg-accent rounded-md">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{activeData.details}</p>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                    Connects to
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeData.connections.map((cId) => {
                      const relatedNode = NODES.find((n) => n.id === cId)
                      return relatedNode ? (
                        <Badge
                          key={cId}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent text-xs"
                          onClick={() => handleClick(cId)}
                        >
                          {relatedNode.label}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
                <Button asChild size="sm" className="w-full">
                  <Link href={activeData.href}>
                    Explore {activeData.label} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto"
          >
            <Card className="bg-editorial-canvas/50 border-dashed">
              <CardContent className="p-5 text-center text-sm text-muted-foreground">
                Click any node to see how it shapes the full sales motion.
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-xl mx-auto mt-8 space-y-2">
        {NODES.map((node) => {
          const Icon = node.icon
          return (
            <button
              key={node.id}
              onClick={() => handleClick(node.id)}
              className={cn(
                "flex items-center gap-3 w-full text-left px-3 py-3 rounded-[14px] transition-all duration-200",
                activeNode === node.id
                  ? "bg-white/80 shadow-sm border border-[rgba(44,49,59,0.1)]"
                  : "hover:bg-white/50"
              )}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-[10px] shrink-0"
                style={{ backgroundColor: node.bgColor }}
              >
                <Icon className="h-4 w-4" style={{ color: node.color }} />
              </div>
              <div className="space-y-0.5">
                <span className="block font-medium text-sm text-editorial-ink">{node.label}</span>
                <span className="block text-xs text-editorial-muted">{node.description}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
