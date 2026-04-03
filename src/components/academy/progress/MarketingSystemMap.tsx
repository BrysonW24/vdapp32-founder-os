"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Crosshair, MessageSquare, Radio, FileText,
  Zap, BarChart3, Heart, ArrowRight, X,
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
    id: "research", label: "Research", icon: Search,
    color: "#386a58", bgColor: "#e5f1ea",
    description: "Understand your market, customers, and competitors.",
    details: "Research is the foundation of everything. Before you position, message, or advertise, you need to understand who your customers are, what they care about, and what alternatives they have.",
    connections: ["positioning", "analytics", "retention"],
    href: "/modules",
  },
  {
    id: "positioning", label: "Positioning", icon: Crosshair,
    color: "#6d28d9", bgColor: "#ede9fe",
    description: "Define where you stand in the market.",
    details: "Positioning is how you carve out a unique space in your customer's mind. It answers: who is this for, what category is it in, and why is it different?",
    connections: ["research", "messaging", "channels"],
    href: "/modules",
  },
  {
    id: "messaging", label: "Messaging", icon: MessageSquare,
    color: "#2f4f79", bgColor: "#e6eef8",
    description: "Craft what you say and how you say it.",
    details: "Messaging translates your positioning into words people understand and care about. It covers your value proposition, taglines, and the voice and tone of your brand.",
    connections: ["positioning", "content", "channels"],
    href: "/modules",
  },
  {
    id: "channels", label: "Channels", icon: Radio,
    color: "#a16a1f", bgColor: "#f7ecd6",
    description: "Choose where to reach your audience.",
    details: "Channels are the platforms where your marketing lives — social media, search engines, email, events, partnerships. The right channel depends on where your audience spends time.",
    connections: ["positioning", "messaging", "content", "campaigns"],
    href: "/modules",
  },
  {
    id: "content", label: "Content", icon: FileText,
    color: "#2563eb", bgColor: "#dbeafe",
    description: "Create valuable material for your audience.",
    details: "Content is the material you create to attract, educate, and convert. Blog posts, videos, case studies, social posts, guides — good content builds trust and authority.",
    connections: ["messaging", "channels", "campaigns"],
    href: "/modules",
  },
  {
    id: "campaigns", label: "Campaigns", icon: Zap,
    color: "#c2410c", bgColor: "#ffedd5",
    description: "Execute coordinated marketing efforts.",
    details: "Campaigns bring everything together into coordinated efforts with a specific goal — a product launch, a seasonal promotion, a brand awareness push.",
    connections: ["channels", "content", "analytics"],
    href: "/modules",
  },
  {
    id: "analytics", label: "Analytics", icon: BarChart3,
    color: "#4338ca", bgColor: "#e0e7ff",
    description: "Measure results and learn from data.",
    details: "Analytics tells you what is working and what is not. Traffic, conversions, engagement, revenue — data-driven decisions separate good marketers from great ones.",
    connections: ["research", "campaigns", "retention"],
    href: "/modules",
  },
  {
    id: "retention", label: "Retention", icon: Heart,
    color: "#a0453f", bgColor: "#f7e5e2",
    description: "Keep customers coming back.",
    details: "Retention is the most profitable marketing activity. It costs 5-7x less to keep a customer than to acquire a new one. Loyalty, email flows, and customer experience live here.",
    connections: ["research", "analytics", "content"],
    href: "/modules",
  },
]

const NODE_ANGLES: Record<string, number> = {
  research: 90,
  positioning: 45,
  messaging: 0,
  channels: 315,
  content: 270,
  campaigns: 225,
  analytics: 180,
  retention: 135,
}

function getNodePosition(id: string, radius: number) {
  const angle = ((NODE_ANGLES[id] ?? 0) * Math.PI) / 180
  return { x: 50 + Math.cos(angle) * radius, y: 50 - Math.sin(angle) * radius }
}

export function MarketingSystemMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const radius = 34

  const handleHover = useCallback((id: string | null) => setHoveredNode(id), [])
  const handleClick = useCallback((id: string) => setActiveNode((prev) => (prev === id ? null : id)), [])
  const handleClose = useCallback(() => setActiveNode(null), [])

  const activeData = NODES.find((n) => n.id === activeNode)

  return (
    <div>
      {/* Interactive Map */}
      <div className="relative w-full max-w-xl mx-auto" style={{ aspectRatio: "1/1" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Connection lines */}
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

          {/* Center node */}
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
          <text
            x={50}
            y={49}
            textAnchor="middle"
            fontSize="2.4"
            fontWeight="700"
            fill="white"
          >
            Marketing
          </text>
          <text
            x={50}
            y={52}
            textAnchor="middle"
            fontSize="1.8"
            fill="rgba(255,255,255,0.7)"
          >
            System
          </text>

          {/* Nodes */}
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
                  fontSize="2.2"
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

      {/* Detail panel */}
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
                      <activeData.icon
                        className="h-4 w-4"
                        style={{ color: activeData.color }}
                      />
                    </div>
                    <CardTitle className="text-base">{activeData.label}</CardTitle>
                  </div>
                  <button onClick={handleClose} className="p-1 hover:bg-accent rounded-md">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeData.details}
                </p>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                    Connects to
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeData.connections.map((cId) => {
                      const cn = NODES.find((n) => n.id === cId)
                      return cn ? (
                        <Badge
                          key={cId}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent text-xs"
                          onClick={() => handleClick(cId)}
                        >
                          {cn.label}
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
                Click any node to see its details and connections.
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node list */}
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
              <span className="font-medium text-sm text-editorial-ink">{node.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
