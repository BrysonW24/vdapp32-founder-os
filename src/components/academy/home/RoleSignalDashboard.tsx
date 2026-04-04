"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  Database,
  Handshake,
  Presentation,
  Search,
  Shield,
  Target,
  Users,
} from "lucide-react"

const COMPLEXITY_SCORE = 81

const HUMAN_DEMAND = [
  { label: "Abstract reasoning", value: 68 },
  { label: "Systems thinking", value: 76 },
  { label: "Communication", value: 94 },
  { label: "Execution pressure", value: 89 },
  { label: "Ambiguity tolerance", value: 84 },
  { label: "Stamina / consistency", value: 91 },
] as const

const OPERATIONAL_STAKES = [
  { label: "Forecast", value: 84, color: "#386a58" },
  { label: "Deal loss", value: 89, color: "#a16a1f" },
  { label: "Credibility", value: 78, color: "#2f4f79" },
  { label: "Planning", value: 74, color: "#a0453f" },
] as const

const RAMP_CURVE = [
  { label: "Foundation", detail: "Prospecting", active: true },
  { label: "Functional", detail: "Discovery", active: true },
  { label: "Strong", detail: "Full-cycle", active: true },
  { label: "Elite", detail: "Strategic control", active: false },
] as const

const DEPENDENCY_NODES = [
  { label: "Prospect", x: 22, y: 82, color: "#386a58", icon: Search },
  { label: "Product", x: 56, y: 28, color: "#2f4f79", icon: Presentation },
  { label: "SEs", x: 126, y: 30, color: "#a16a1f", icon: Users },
  { label: "Legal", x: 154, y: 82, color: "#a0453f", icon: Shield },
  { label: "Forecast", x: 122, y: 136, color: "#2563eb", icon: BarChart3 },
  { label: "Buyer", x: 54, y: 136, color: "#6d28d9", icon: Handshake },
  { label: "AE", x: 88, y: 82, color: "#111827", icon: Target },
] as const

const DEPENDENCY_CONNECTIONS = [
  [0, 6],
  [1, 6],
  [2, 6],
  [3, 6],
  [4, 6],
  [5, 6],
  [0, 5],
  [1, 2],
  [3, 4],
] as const

const QUOTA_PRESSURE = 86

const DEAL_COMPLEXITY = [
  { label: "Discovery", active: true },
  { label: "Technical fit", active: true },
  { label: "Security", active: true },
  { label: "Legal", active: false },
  { label: "Procurement", active: false },
] as const

const RELATIONSHIP_DEPTH = [
  { label: "Champion", size: 64, color: "#386a58" },
  { label: "Buying group", size: 108, color: "#2f4f79" },
  { label: "Exec sponsor", size: 148, color: "#a16a1f" },
] as const

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.45 },
}

function polarToCartesian(cx: number, cy: number, radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  }
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

function MicroPanel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="h-full rounded-[28px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.8)] p-5 sm:p-6 shadow-editorial-soft backdrop-blur-[18px]"
      {...fadeInUp}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">{eyebrow}</p>
      <h3 className="mt-2 text-lg sm:text-xl font-serif font-semibold text-editorial-ink">{title}</h3>
      <div className="mt-5">{children}</div>
    </motion.div>
  )
}

function ComplexityGauge() {
  const startAngle = 150
  const sweep = 240
  const valueAngle = startAngle + (sweep * COMPLEXITY_SCORE) / 100
  const trackPath = describeArc(120, 118, 84, startAngle, startAngle + sweep)
  const valuePath = describeArc(120, 118, 84, startAngle, valueAngle)
  const valuePoint = polarToCartesian(120, 118, 74, valueAngle)

  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 240 168" className="w-full max-w-[280px] overflow-visible">
        <defs>
          <linearGradient id="salesComplexityArc" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#2f4f79" />
            <stop offset="55%" stopColor="#386a58" />
            <stop offset="100%" stopColor="#a16a1f" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((mark) => {
          const angle = startAngle + (sweep * mark) / 100
          const inner = polarToCartesian(120, 118, 91, angle)
          const outer = polarToCartesian(120, 118, 103, angle)
          const label = polarToCartesian(120, 118, 116, angle)
          return (
            <g key={mark}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(44,49,59,0.18)"
                strokeWidth={mark === 0 || mark === 100 ? 2 : 1}
              />
              <text
                x={label.x}
                y={label.y + 3}
                textAnchor="middle"
                fontSize="8"
                fill="rgba(44,49,59,0.55)"
              >
                {mark}
              </text>
            </g>
          )
        })}
        <path d={trackPath} fill="none" stroke="rgba(44,49,59,0.08)" strokeWidth={16} strokeLinecap="round" />
        <motion.path
          d={valuePath}
          fill="none"
          stroke="url(#salesComplexityArc)"
          strokeWidth={16}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.line
          x1="120"
          y1="118"
          x2={valuePoint.x}
          y2={valuePoint.y}
          stroke="#161b22"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
        />
        <circle cx="120" cy="118" r="6" fill="#161b22" />
      </svg>
      <div className="absolute inset-x-0 top-[54px] text-center">
        <div className="text-4xl font-serif font-bold text-editorial-ink leading-none">
          {COMPLEXITY_SCORE}
          <span className="ml-1 text-lg text-editorial-muted">/100</span>
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-editorial-muted">
          Complexity Index
        </div>
      </div>

      <div className="mt-1 flex w-full max-w-[280px] items-center justify-between text-[10px] uppercase tracking-[0.14em] text-editorial-muted">
        <span>Entry</span>
        <span className="text-editorial-ink/75">Role Difficulty</span>
        <span>Elite</span>
      </div>
      <p className="mt-3 max-w-[16rem] text-center text-xs leading-relaxed text-editorial-muted">
        Less technical than frontier AI, but still a high-pressure operating role with visible outcomes.
      </p>
    </div>
  )
}

function DependencySurface() {
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 176 164" className="h-[160px] w-[176px] shrink-0">
        {DEPENDENCY_CONNECTIONS.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={DEPENDENCY_NODES[from].x}
            y1={DEPENDENCY_NODES[from].y}
            x2={DEPENDENCY_NODES[to].x}
            y2={DEPENDENCY_NODES[to].y}
            stroke="rgba(44,49,59,0.12)"
            strokeWidth="1"
          />
        ))}
        {DEPENDENCY_NODES.map((node, index) => {
          const Icon = node.icon
          return (
            <motion.g
              key={node.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              animate={{ y: [0, -2, 0] }}
            >
              <circle cx={node.x} cy={node.y} r="16" fill="white" stroke={node.color} strokeWidth="1.5" />
              <foreignObject x={node.x - 7} y={node.y - 7} width="14" height="14">
                <div className="flex h-3.5 w-3.5 items-center justify-center">
                  <Icon className="h-3.5 w-3.5" style={{ color: node.color }} />
                </div>
              </foreignObject>
            </motion.g>
          )
        })}
      </svg>
      <div className="space-y-2 text-xs text-editorial-muted">
        <div className="text-xl font-serif font-semibold text-editorial-ink">High</div>
        <p className="max-w-[10rem] leading-relaxed">
          The role only works when buyers, internal teams, and forecast discipline stay aligned.
        </p>
      </div>
    </div>
  )
}

function HumanDemandProfile() {
  return (
    <div className="space-y-3">
      {HUMAN_DEMAND.map((item, index) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-editorial-ink">{item.label}</span>
            <span className="font-mono text-editorial-muted">{item.value}</span>
          </div>
          <div className="h-2.5 rounded-full bg-[rgba(44,49,59,0.06)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#386a58,#2f4f79)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function OperationalStakesChart() {
  return (
    <div className="flex h-[148px] items-end justify-between gap-3">
      {OPERATIONAL_STAKES.map((item, index) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="text-[10px] font-mono text-editorial-muted">{item.value}</div>
          <div className="flex h-[110px] w-full items-end rounded-[18px] bg-[rgba(44,49,59,0.05)] px-2 py-2">
            <motion.div
              className="w-full rounded-[12px]"
              style={{ backgroundColor: item.color }}
              initial={{ height: 0 }}
              whileInView={{ height: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            />
          </div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-editorial-muted text-center">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function RampCurveRail() {
  return (
    <div className="pt-2">
      <div className="relative">
        <div className="absolute left-4 right-4 top-3 h-[2px] bg-[rgba(44,49,59,0.08)]" />
        <div className="grid grid-cols-4 gap-2">
          {RAMP_CURVE.map((stage, index) => (
            <motion.div
              key={stage.label}
              className="relative"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div
                className={`mx-auto h-6 w-6 rounded-full border-2 ${
                  stage.active
                    ? "border-editorial-green bg-editorial-green"
                    : "border-[rgba(44,49,59,0.18)] bg-white"
                }`}
              />
              <div className="mt-4 text-center">
                <div className="text-xs font-semibold text-editorial-ink">{stage.label}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-editorial-muted">
                  {stage.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuotaPressureGauge() {
  const circumference = 2 * Math.PI * 42
  const offset = circumference * (1 - QUOTA_PRESSURE / 100)
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 120 120" className="h-[110px] w-[110px] -rotate-90">
        <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(44,49,59,0.08)" strokeWidth="12" />
        <motion.circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="#386a58"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </svg>
      <div>
        <div className="text-3xl font-serif font-bold text-editorial-ink">{QUOTA_PRESSURE}</div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-editorial-muted">Commercial pressure</div>
        <p className="mt-2 max-w-[10rem] text-xs leading-relaxed text-editorial-muted">
          The role carries a visible number and a visible target almost every day.
        </p>
      </div>
    </div>
  )
}

function DealComplexityRail() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {DEAL_COMPLEXITY.map((step, index) => (
          <div key={step.label} className="flex flex-1 items-center gap-2">
            <motion.div
              className={`flex-1 rounded-full px-2 py-2 text-center text-[10px] uppercase tracking-[0.12em] ${
                step.active
                  ? "bg-editorial-green text-white"
                  : "bg-[rgba(44,49,59,0.08)] text-editorial-muted"
              }`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              {step.label}
            </motion.div>
            {index < DEAL_COMPLEXITY.length - 1 ? (
              <div className="h-[2px] w-4 bg-[rgba(44,49,59,0.08)]" />
            ) : null}
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-editorial-muted">
        Enterprise deals become difficult when technical proof, security, legal, and procurement all enter the same motion.
      </p>
    </div>
  )
}

function RelationshipDepthRings() {
  return (
    <div className="flex items-center gap-5">
      <div className="relative flex h-[160px] w-[160px] items-center justify-center">
        {RELATIONSHIP_DEPTH.slice().reverse().map((ring) => (
          <motion.div
            key={ring.label}
            className="absolute rounded-full border"
            style={{
              width: ring.size,
              height: ring.size,
              borderColor: ring.color,
              backgroundColor: `${ring.color}10`,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          />
        ))}
        <div className="text-center">
          <div className="text-xl font-serif font-semibold text-editorial-ink">3 layers</div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-editorial-muted">of trust</div>
        </div>
      </div>
      <div className="space-y-2 text-xs text-editorial-muted">
        {RELATIONSHIP_DEPTH.map((ring) => (
          <div key={ring.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ring.color }} />
            <span>{ring.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RoleSignalDashboard() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,236,225,0.72),rgba(255,252,247,0.96))]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div className="mb-8 max-w-2xl sm:mb-10" {...fadeInUp}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted">
            Visual Role Map
          </p>
          <h2 className="mb-3 text-2xl font-serif font-bold text-editorial-ink sm:text-3xl">
            The same five signals, then the sales-specific pressure layer
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-editorial-muted sm:text-base">
            This keeps the academy family visually consistent while making the commercial
            shape of enterprise sales obvious fast.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MicroPanel eyebrow="Complexity Index" title="High coordination role">
            <ComplexityGauge />
          </MicroPanel>
          <MicroPanel eyebrow="Dependency Surface" title="Deals are team sports">
            <DependencySurface />
          </MicroPanel>
          <MicroPanel eyebrow="Human Demand Profile" title="The person matters here">
            <HumanDemandProfile />
          </MicroPanel>
          <MicroPanel eyebrow="Operational Stakes" title="Weak rigor leaks revenue">
            <OperationalStakesChart />
          </MicroPanel>

          <MicroPanel eyebrow="Ramp Curve" title="Fast starters still need repetition">
            <RampCurveRail />
          </MicroPanel>

          <MicroPanel eyebrow="Quota Pressure" title="Commercial pressure is visible">
            <QuotaPressureGauge />
          </MicroPanel>
          <MicroPanel eyebrow="Deal Complexity" title="Multi-threaded motions win here">
            <DealComplexityRail />
          </MicroPanel>

          <MicroPanel eyebrow="Relationship Depth" title="Champions are not enough">
            <RelationshipDepthRings />
          </MicroPanel>
        </div>
      </div>
    </section>
  )
}
