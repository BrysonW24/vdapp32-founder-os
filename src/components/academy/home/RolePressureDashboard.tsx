"use client"

import { motion } from "framer-motion"
import {
  BrainCircuit,
  Cpu,
  Database,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react"

const COMPLEXITY_SCORE = 91

const HUMAN_DEMAND = [
  { label: "Abstract reasoning", value: 95 },
  { label: "Systems thinking", value: 93 },
  { label: "Focus depth", value: 90 },
  { label: "Ambiguity tolerance", value: 88 },
  { label: "Execution pressure", value: 94 },
  { label: "Communication", value: 76 },
] as const

const SYSTEMS_LOAD = [
  { label: "Evals", value: 92, color: "#386a58" },
  { label: "Inference", value: 89, color: "#2f4f79" },
  { label: "Retrieval", value: 83, color: "#a16a1f" },
  { label: "Deployment", value: 87, color: "#2563eb" },
  { label: "Observability", value: 81, color: "#a0453f" },
  { label: "Safety", value: 76, color: "#6d28d9" },
] as const

const RESEARCH_PRODUCTION = {
  research: 42,
  production: 58,
} as const

const TOOLCHAIN_BREADTH = [
  "Python",
  "PyTorch",
  "Model APIs",
  "Vector DBs",
  "Eval harnesses",
  "Tracing",
  "CI / CD",
  "GPU / CUDA",
] as const

const OPERATIONAL_STAKES = [
  { label: "Reliability", value: 94, color: "#386a58" },
  { label: "Safety", value: 88, color: "#a0453f" },
  { label: "Abuse", value: 84, color: "#2f4f79" },
  { label: "Latency", value: 73, color: "#a16a1f" },
] as const

const RAMP_CURVE = [
  { label: "0-3", detail: "Core stack", active: true },
  { label: "3-6", detail: "RAG + evals", active: true },
  { label: "6-12", detail: "Agents + infra", active: true },
  { label: "12+", detail: "Elite edge", active: false },
] as const

const DEPENDENCY_NODES = [
  { label: "Math", x: 22, y: 82, color: "#2f4f79", icon: BrainCircuit },
  { label: "ML", x: 54, y: 28, color: "#386a58", icon: BrainCircuit },
  { label: "Systems", x: 122, y: 26, color: "#a16a1f", icon: Cpu },
  { label: "Infra", x: 152, y: 78, color: "#2563eb", icon: Layers3 },
  { label: "Safety", x: 126, y: 136, color: "#a0453f", icon: ShieldCheck },
  { label: "Domain", x: 56, y: 136, color: "#6d28d9", icon: Database },
  { label: "People", x: 88, y: 82, color: "#111827", icon: Users },
] as const

const DEPENDENCY_CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [1, 6],
  [2, 6],
  [3, 6],
  [4, 6],
  [5, 6],
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
  const endAngle = startAngle + sweep
  const valueAngle = startAngle + (sweep * COMPLEXITY_SCORE) / 100
  const valuePoint = polarToCartesian(120, 118, 74, valueAngle)
  const trackPath = describeArc(120, 118, 84, startAngle, endAngle)
  const valuePath = describeArc(120, 118, 84, startAngle, valueAngle)

  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 240 168" className="w-full max-w-[280px] overflow-visible">
        <defs>
          <linearGradient id="complexityArc" x1="0%" x2="100%" y1="0%" y2="0%">
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
          stroke="url(#complexityArc)"
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
        <span>Foundation</span>
        <span className="text-editorial-ink/75">Role Difficulty</span>
        <span>Elite</span>
      </div>
      <p className="mt-3 max-w-[16rem] text-center text-xs leading-relaxed text-editorial-muted">
        High coordination, high judgment, and very little room for weak systems thinking.
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
        <div className="text-xl font-serif font-semibold text-editorial-ink">Very high</div>
        <p className="max-w-[10rem] leading-relaxed">
          8+ technical families and multiple humans have to line up before the work is truly strong.
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

function SystemsLoadChart() {
  return (
    <div>
      <div className="flex h-4 overflow-hidden rounded-full bg-[rgba(44,49,59,0.06)]">
        {SYSTEMS_LOAD.map((item, index) => (
          <motion.div
            key={item.label}
            className="h-full"
            style={{ backgroundColor: item.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${100 / SYSTEMS_LOAD.length}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {SYSTEMS_LOAD.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-editorial-ink">{item.label}</span>
            </div>
            <span className="font-mono text-editorial-muted">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResearchProductionSplit() {
  return (
    <div>
      <div className="flex h-5 overflow-hidden rounded-full bg-[rgba(44,49,59,0.06)]">
        <motion.div
          className="flex items-center justify-start bg-[#2f4f79] px-3 text-[10px] uppercase tracking-[0.12em] text-white"
          initial={{ width: 0 }}
          whileInView={{ width: `${RESEARCH_PRODUCTION.research}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          Research
        </motion.div>
        <motion.div
          className="flex items-center justify-end bg-[#386a58] px-3 text-[10px] uppercase tracking-[0.12em] text-white"
          initial={{ width: 0 }}
          whileInView={{ width: `${RESEARCH_PRODUCTION.production}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          Production
        </motion.div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-[18px] border border-[rgba(44,49,59,0.06)] bg-white/70 px-3 py-3">
          <div className="font-serif text-xl font-semibold text-editorial-ink">
            {RESEARCH_PRODUCTION.research}%
          </div>
          <div className="mt-1 uppercase tracking-[0.14em] text-editorial-muted">Research depth</div>
        </div>
        <div className="rounded-[18px] border border-[rgba(44,49,59,0.06)] bg-white/70 px-3 py-3">
          <div className="font-serif text-xl font-semibold text-editorial-ink">
            {RESEARCH_PRODUCTION.production}%
          </div>
          <div className="mt-1 uppercase tracking-[0.14em] text-editorial-muted">Production depth</div>
        </div>
      </div>
    </div>
  )
}

function ToolchainBreadthGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {TOOLCHAIN_BREADTH.map((tool, index) => (
        <motion.div
          key={tool}
          className="rounded-[16px] border border-[rgba(44,49,59,0.06)] bg-white/72 px-3 py-3 text-xs text-editorial-ink"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
        >
          {tool}
        </motion.div>
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
                <div className="text-xs font-semibold text-editorial-ink">{stage.label} mo</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-editorial-muted">
                  {stage.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <p className="mt-5 text-xs leading-relaxed text-editorial-muted">
        Serious competitiveness is a long curve. The fastest believable story is not
        &ldquo;learn AI&rdquo; but stack real systems, real projects, and real judgment over time.
      </p>
    </div>
  )
}

export function RolePressureDashboard() {
  return (
    <section className="py-10 sm:py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,236,225,0.72),rgba(255,252,247,0.96))]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="max-w-2xl mb-8 sm:mb-10" {...fadeInUp}>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
            Visual Pressure Map
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-3">
            How hard is the path, and what kind of human does it demand?
          </h2>
          <p className="text-sm sm:text-base text-editorial-muted leading-relaxed max-w-xl">
            The first row stays consistent across the academy family. The second row is
            where the AI role shows its own fingerprint.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MicroPanel eyebrow="Complexity Index" title="Elite barrier score">
            <ComplexityGauge />
          </MicroPanel>

          <MicroPanel eyebrow="Dependency Surface" title="Multi-disciplinary by default">
            <DependencySurface />
          </MicroPanel>

          <MicroPanel eyebrow="Human Demand Profile" title="This role stretches the person too">
            <HumanDemandProfile />
          </MicroPanel>

          <MicroPanel eyebrow="Operational Stakes" title="Weak engineering gets expensive fast">
            <OperationalStakesChart />
          </MicroPanel>

          <MicroPanel eyebrow="Ramp Curve" title="A 12-24 month serious climb">
            <RampCurveRail />
          </MicroPanel>

          <MicroPanel eyebrow="Research–Production Split" title="You need both muscles">
            <ResearchProductionSplit />
          </MicroPanel>

          <MicroPanel eyebrow="Systems Load" title="The hard part is the moving system">
            <SystemsLoadChart />
          </MicroPanel>

          <MicroPanel eyebrow="Toolchain Breadth" title="The stack gets wide fast">
            <ToolchainBreadthGrid />
          </MicroPanel>
        </div>
      </div>
    </section>
  )
}
