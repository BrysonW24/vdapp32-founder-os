"use client"

import { useRef, useMemo, useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Stars, Float, Line } from "@react-three/drei"
import * as THREE from "three"
import { useProgress, DOMAIN_GROUPS } from "@/lib/progress"
import { cn } from "@/lib/utils"
import { ArrowRight, Check, Sparkles } from "lucide-react"
import Link from "next/link"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ConstellationModule {
  slug: string
  title: string
  category: string
  relatedModules: string[]
  levelNumber: number
  order: number
  status: string
}

interface DomainCluster {
  key: string
  label: string
  color: string
  modules: string[]
}

type ModuleState = "completed" | "available" | "locked"

// ---------------------------------------------------------------------------
// Layout helpers — spiral galaxy positions
// ---------------------------------------------------------------------------

const CLUSTER_ANGLES: Record<string, number> = {
  foundations: 0,
  customers: (2 * Math.PI) / 5,
  channels: (4 * Math.PI) / 5,
  analytics: (6 * Math.PI) / 5,
  strategy: (8 * Math.PI) / 5,
}

function computeStarPositions(
  modules: ConstellationModule[],
  clusters: DomainCluster[]
): Map<string, THREE.Vector3> {
  const positions = new Map<string, THREE.Vector3>()

  clusters.forEach((cluster) => {
    const baseAngle = CLUSTER_ANGLES[cluster.key] ?? 0
    const clusterRadius = 6
    const cx = Math.cos(baseAngle) * clusterRadius
    const cz = Math.sin(baseAngle) * clusterRadius

    cluster.modules.forEach((slug, i) => {
      const count = cluster.modules.length
      // Spread modules in a small cluster around the cluster center
      const subAngle = baseAngle + ((i - (count - 1) / 2) * 0.35)
      const subRadius = 1.2 + (i % 3) * 0.6
      const x = cx + Math.cos(subAngle) * subRadius
      const z = cz + Math.sin(subAngle) * subRadius
      // Slight vertical variation for depth
      const y = (i % 2 === 0 ? 0.3 : -0.3) + Math.sin(i * 1.7) * 0.5
      positions.set(slug, new THREE.Vector3(x, y, z))
    })
  })

  return positions
}

// ---------------------------------------------------------------------------
// Star node component
// ---------------------------------------------------------------------------

interface StarNodeProps {
  position: THREE.Vector3
  module: ConstellationModule
  state: ModuleState
  color: string
  isHovered: boolean
  isSelected: boolean
  onHover: (slug: string | null) => void
  onClick: (slug: string) => void
}

function StarNode({
  position,
  module,
  state,
  color,
  isHovered,
  isSelected,
  onHover,
  onClick,
}: StarNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const pulseRef = useRef(0)

  const baseSize = state === "completed" ? 0.22 : state === "available" ? 0.18 : 0.1
  const emissiveIntensity = state === "completed" ? 1.5 : state === "available" ? 0.6 : 0.1
  const colorObj = useMemo(() => new THREE.Color(color), [color])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    pulseRef.current += delta

    if (state === "available") {
      const pulse = 1 + Math.sin(pulseRef.current * 2) * 0.15
      meshRef.current.scale.setScalar(pulse)
    }

    if (isHovered || isSelected) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(1.4, 1.4, 1.4),
        delta * 8
      )
    } else if (state !== "available") {
      meshRef.current.scale.lerp(
        new THREE.Vector3(1, 1, 1),
        delta * 4
      )
    }

    if (glowRef.current) {
      const glowPulse = state === "completed"
        ? 1 + Math.sin(pulseRef.current * 1.5) * 0.2
        : state === "available"
        ? 0.6 + Math.sin(pulseRef.current * 2.5) * 0.3
        : 0.15
      glowRef.current.scale.setScalar(glowPulse)
    }
  })

  return (
    <group position={position}>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[baseSize * 3, 16, 16]} />
        <meshBasicMaterial
          color={colorObj}
          transparent
          opacity={state === "completed" ? 0.08 : state === "available" ? 0.04 : 0.01}
          depthWrite={false}
        />
      </mesh>

      {/* Main star sphere */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(module.slug) }}
        onPointerLeave={(e) => { e.stopPropagation(); onHover(null) }}
        onClick={(e) => { e.stopPropagation(); onClick(module.slug) }}
      >
        <sphereGeometry args={[baseSize, 16, 16]} />
        <meshStandardMaterial
          color={colorObj}
          emissive={colorObj}
          emissiveIntensity={emissiveIntensity}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Completed tick or pulse ring */}
      {state === "completed" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[baseSize * 1.6, baseSize * 1.8, 32]} />
          <meshBasicMaterial
            color={colorObj}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Hover label */}
      {(isHovered || isSelected) && (
        <Html
          center
          distanceFactor={12}
          style={{ pointerEvents: "none" }}
        >
          <div className="whitespace-nowrap rounded-lg bg-[#fffdf8]/90 backdrop-blur-sm border border-[rgba(44,49,59,0.1)] px-3 py-1.5 text-center shadow-lg">
            <p className="text-xs font-semibold text-editorial-ink">{module.title}</p>
            <p className="text-[10px] mt-0.5" style={{ color }}>
              {state === "completed" ? "Completed" : state === "available" ? "Available" : "Locked"}
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}

// ---------------------------------------------------------------------------
// Constellation lines between related modules
// ---------------------------------------------------------------------------

interface ConstellationLinesProps {
  modules: ConstellationModule[]
  positions: Map<string, THREE.Vector3>
  clusterModules: string[]
  color: string
  completedModules: string[]
}

function ConstellationLines({
  modules,
  positions,
  clusterModules,
  color,
  completedModules,
}: ConstellationLinesProps) {
  const linesRef = useRef<THREE.Group>(null)

  const lineSegments = useMemo(() => {
    const segments: { start: THREE.Vector3; end: THREE.Vector3; bothComplete: boolean }[] = []
    const visited = new Set<string>()

    for (const mod of modules) {
      if (!clusterModules.includes(mod.slug)) continue
      const startPos = positions.get(mod.slug)
      if (!startPos) continue

      for (const relSlug of mod.relatedModules) {
        if (!clusterModules.includes(relSlug)) continue
        const pairKey = [mod.slug, relSlug].sort().join("-")
        if (visited.has(pairKey)) continue
        visited.add(pairKey)

        const endPos = positions.get(relSlug)
        if (!endPos) continue

        segments.push({
          start: startPos,
          end: endPos,
          bothComplete:
            completedModules.includes(mod.slug) &&
            completedModules.includes(relSlug),
        })
      }
    }

    return segments
  }, [modules, positions, clusterModules, completedModules])

  return (
    <group ref={linesRef}>
      {lineSegments.map((seg, i) => (
        <Line
          key={i}
          points={[seg.start.toArray(), seg.end.toArray()]}
          color={color}
          transparent
          opacity={seg.bothComplete ? 0.5 : 0.12}
          lineWidth={seg.bothComplete ? 1.5 : 0.5}
          depthWrite={false}
        />
      ))}
    </group>
  )
}

// ---------------------------------------------------------------------------
// Cluster label
// ---------------------------------------------------------------------------

interface ClusterLabelProps {
  label: string
  color: string
  position: THREE.Vector3
}

function ClusterLabel({ label, color, position }: ClusterLabelProps) {
  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
      <Html
        center
        position={[position.x, position.y + 1.8, position.z]}
        distanceFactor={15}
        style={{ pointerEvents: "none" }}
      >
        <div className="whitespace-nowrap">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70"
            style={{ color }}
          >
            {label}
          </p>
        </div>
      </Html>
    </Float>
  )
}

// ---------------------------------------------------------------------------
// Camera auto-drift
// ---------------------------------------------------------------------------

function CameraRig() {
  const { camera } = useThree()
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta * 0.08
    // Gentle circular drift
    camera.position.x += Math.sin(timeRef.current) * 0.001
    camera.position.z += Math.cos(timeRef.current) * 0.001
  })

  return null
}

// ---------------------------------------------------------------------------
// Scene content
// ---------------------------------------------------------------------------

interface SceneProps {
  modules: ConstellationModule[]
  clusters: DomainCluster[]
  hoveredSlug: string | null
  selectedSlug: string | null
  onHover: (slug: string | null) => void
  onSelect: (slug: string) => void
}

function Scene({
  modules,
  clusters,
  hoveredSlug,
  selectedSlug,
  onHover,
  onSelect,
}: SceneProps) {
  const { completedModules } = useProgress()

  const positions = useMemo(
    () => computeStarPositions(modules, clusters),
    [modules, clusters]
  )

  const clusterCenters = useMemo(() => {
    const centers = new Map<string, THREE.Vector3>()
    clusters.forEach((cluster) => {
      const vecs = cluster.modules
        .map((slug) => positions.get(slug))
        .filter(Boolean) as THREE.Vector3[]
      if (vecs.length === 0) return
      const center = new THREE.Vector3()
      vecs.forEach((v) => center.add(v))
      center.divideScalar(vecs.length)
      centers.set(cluster.key, center)
    })
    return centers
  }, [clusters, positions])

  const getModuleState = useCallback(
    (slug: string): ModuleState => {
      if (completedModules.includes(slug)) return "completed"
      // Simple unlock: first module is always available; a module is available
      // if at least one of its related modules or the previous module in order is complete
      const mod = modules.find((m) => m.slug === slug)
      if (!mod) return "locked"
      if (mod.order === 1) return "available"
      // Available if any prerequisite (lower order in same cluster) is complete
      const cluster = clusters.find((c) => c.modules.includes(slug))
      if (!cluster) return "available"
      const idx = cluster.modules.indexOf(slug)
      if (idx === 0) return "available"
      const prevSlug = cluster.modules[idx - 1]
      if (completedModules.includes(prevSlug)) return "available"
      // Also available if any related module is complete
      if (mod.relatedModules.some((r) => completedModules.includes(r))) return "available"
      // First three modules per cluster are always available to avoid deadlocks
      if (idx < 3) return "available"
      return "locked"
    },
    [completedModules, modules, clusters]
  )

  const getModuleColor = useCallback(
    (slug: string): string => {
      for (const cluster of clusters) {
        if (cluster.modules.includes(slug)) return cluster.color
      }
      return "#ffffff"
    },
    [clusters]
  )

  return (
    <>
      {/* Lighting — bright for light theme */}
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#386a58" />

      {/* Subtle background particles */}
      <Stars
        radius={80}
        depth={60}
        count={800}
        factor={1.5}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* Constellation lines per cluster */}
      {clusters.map((cluster) => (
        <ConstellationLines
          key={cluster.key}
          modules={modules}
          positions={positions}
          clusterModules={cluster.modules}
          color={cluster.color}
          completedModules={completedModules}
        />
      ))}

      {/* Star nodes */}
      {modules.map((mod) => {
        const pos = positions.get(mod.slug)
        if (!pos) return null
        return (
          <StarNode
            key={mod.slug}
            position={pos}
            module={mod}
            state={getModuleState(mod.slug)}
            color={getModuleColor(mod.slug)}
            isHovered={hoveredSlug === mod.slug}
            isSelected={selectedSlug === mod.slug}
            onHover={onHover}
            onClick={onSelect}
          />
        )
      })}

      {/* Cluster labels */}
      {clusters.map((cluster) => {
        const center = clusterCenters.get(cluster.key)
        if (!center) return null
        return (
          <ClusterLabel
            key={cluster.key}
            label={cluster.label}
            color={cluster.color}
            position={center}
          />
        )
      })}

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={22}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
        autoRotate
        autoRotateSpeed={0.15}
        dampingFactor={0.08}
        enableDamping
      />

      <CameraRig />
    </>
  )
}

// ---------------------------------------------------------------------------
// Sidebar panel (2D overlay)
// ---------------------------------------------------------------------------

interface SidebarProps {
  modules: ConstellationModule[]
  clusters: DomainCluster[]
  selectedSlug: string | null
  onClose: () => void
}

function Sidebar({ modules, clusters, selectedSlug, onClose }: SidebarProps) {
  const router = useRouter()
  const { completedModules } = useProgress()

  const selectedModule = selectedSlug
    ? modules.find((m) => m.slug === selectedSlug) ?? null
    : null

  const selectedCluster = selectedModule
    ? clusters.find((c) => c.modules.includes(selectedModule.slug))
    : null

  // Compute domain completion percentages
  const domainStats = useMemo(
    () =>
      clusters.map((cluster) => {
        const completed = cluster.modules.filter((s) =>
          completedModules.includes(s)
        ).length
        return {
          ...cluster,
          completed,
          total: cluster.modules.length,
          pct: Math.round((completed / cluster.modules.length) * 100),
        }
      }),
    [clusters, completedModules]
  )

  // Find next incomplete module
  const nextIncomplete = useMemo(() => {
    for (const cluster of clusters) {
      for (const slug of cluster.modules) {
        if (!completedModules.includes(slug)) {
          return modules.find((m) => m.slug === slug) ?? null
        }
      }
    }
    return null
  }, [clusters, completedModules, modules])

  const totalCompleted = completedModules.length
  const totalModules = modules.length

  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-[#fffdf8]/90 backdrop-blur-xl border-l border-[rgba(44,49,59,0.08)] overflow-y-auto z-10 flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-[rgba(44,49,59,0.08)]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-editorial-ink uppercase tracking-wider">
            Galaxy Progress
          </h2>
          <span className="text-xs text-editorial-muted">
            {totalCompleted}/{totalModules} modules
          </span>
        </div>

        {/* Overall progress bar */}
        <div className="h-1.5 rounded-full bg-editorial-canvas/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
            style={{ width: `${(totalCompleted / totalModules) * 100}%` }}
          />
        </div>
      </div>

      {/* Domain stats */}
      <div className="p-5 space-y-3 border-b border-[rgba(44,49,59,0.08)]">
        {domainStats.map((stat) => (
          <div key={stat.key} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-xs text-editorial-ink/70">{stat.label}</span>
              </div>
              <span className="text-[10px] text-editorial-muted">
                {stat.completed}/{stat.total}
              </span>
            </div>
            <div className="h-1 rounded-full bg-editorial-canvas/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${stat.pct}%`,
                  backgroundColor: stat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Selected module detail */}
      {selectedModule ? (
        <div className="p-5 flex-1 space-y-4">
          <div>
            {selectedCluster && (
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1"
                style={{ color: selectedCluster.color }}
              >
                {selectedCluster.label}
              </p>
            )}
            <h3 className="text-base font-semibold text-editorial-ink">
              {selectedModule.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              {completedModules.includes(selectedModule.slug) ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                  <Check className="w-3 h-3" /> Completed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-editorial-muted bg-editorial-canvas/50 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" /> Available
                </span>
              )}
              <span className="text-[10px] text-editorial-muted/60">
                Level {selectedModule.levelNumber}
              </span>
            </div>
          </div>

          {/* Related modules */}
          {selectedModule.relatedModules.length > 0 && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-editorial-muted/60 mb-2">
                Connected Modules
              </p>
              <div className="space-y-1">
                {selectedModule.relatedModules.map((relSlug) => {
                  const relMod = modules.find((m) => m.slug === relSlug)
                  if (!relMod) return null
                  const isComplete = completedModules.includes(relSlug)
                  return (
                    <button
                      key={relSlug}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs text-editorial-muted hover:text-editorial-ink hover:bg-editorial-canvas/50 transition-colors"
                      onClick={() => onClose()}
                    >
                      {isComplete ? (
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-white/20 shrink-0" />
                      )}
                      {relMod.title}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <button
            onClick={() => router.push(`/modules/${selectedModule.slug}`)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:brightness-110"
            style={{
              backgroundColor: selectedCluster?.color ?? "#386a58",
            }}
          >
            {completedModules.includes(selectedModule.slug)
              ? "Review Module"
              : "Start Module"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="p-5 flex-1 flex flex-col justify-center items-center text-center">
          <div className="w-10 h-10 rounded-full bg-editorial-canvas/50 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5 text-editorial-muted/40" />
          </div>
          <p className="text-xs text-editorial-muted mb-4 max-w-[200px]">
            Click a star to explore that module. Rotate the galaxy by dragging.
          </p>

          {nextIncomplete && (
            <Link
              href={`/modules/${nextIncomplete.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white bg-editorial-canvas hover:bg-editorial-canvas/80 transition-colors"
            >
              Continue Learning
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile fallback — 2D constellation
// ---------------------------------------------------------------------------

interface MobileFallbackProps {
  modules: ConstellationModule[]
  clusters: DomainCluster[]
}

function MobileFallback({ modules, clusters }: MobileFallbackProps) {
  const { completedModules } = useProgress()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f7f3ea] px-4 py-6 space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-serif font-bold text-editorial-ink mb-1">
          Learning Galaxy
        </h1>
        <p className="text-xs text-editorial-muted">
          {completedModules.length}/{modules.length} modules completed
        </p>
      </div>

      {clusters.map((cluster) => (
        <div key={cluster.key} className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: cluster.color }}
            />
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: cluster.color }}
            >
              {cluster.label}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {cluster.modules.map((slug) => {
              const mod = modules.find((m) => m.slug === slug)
              if (!mod) return null
              const isComplete = completedModules.includes(slug)

              return (
                <button
                  key={slug}
                  onClick={() => router.push(`/modules/${slug}`)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs transition-all border",
                    isComplete
                      ? "bg-editorial-canvas border-[rgba(44,49,59,0.1)] text-editorial-ink"
                      : "bg-editorial-canvas/50 border-[rgba(44,49,59,0.08)] text-editorial-muted hover:bg-white/8"
                  )}
                >
                  {isComplete ? (
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: cluster.color }} />
                  ) : (
                    <div
                      className="w-3.5 h-3.5 rounded-full border shrink-0"
                      style={{ borderColor: cluster.color + "60" }}
                    />
                  )}
                  <span className="line-clamp-2">{mod.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface ConstellationMapProps {
  modules: ConstellationModule[]
}

export default function ConstellationMap({ modules }: ConstellationMapProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const clusters: DomainCluster[] = useMemo(
    () =>
      Object.entries(DOMAIN_GROUPS).map(([key, group]) => ({
        key,
        label: group.label,
        color: group.color,
        modules: group.modules,
      })),
    []
  )

  const handleSelect = useCallback((slug: string) => {
    setSelectedSlug((prev) => (prev === slug ? null : slug))
  }, [])

  if (isMobile) {
    return <MobileFallback modules={modules} clusters={clusters} />
  }

  return (
    <div className="relative w-full h-screen bg-[#f7f3ea] overflow-hidden">
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 8, 14], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "#f7f3ea" }}
      >
        <Scene
          modules={modules}
          clusters={clusters}
          hoveredSlug={hoveredSlug}
          selectedSlug={selectedSlug}
          onHover={setHoveredSlug}
          onSelect={handleSelect}
        />
      </Canvas>

      {/* Title overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h1 className="text-2xl font-serif font-bold text-editorial-ink mb-1">
          Learning Galaxy
        </h1>
        <p className="text-xs text-editorial-muted/60">
          Your constellation of marketing knowledge
        </p>
      </div>

      {/* Back to modules link */}
      <div className="absolute top-6 left-6 mt-16 z-10">
        <Link
          href="/modules"
          className="inline-flex items-center gap-1.5 text-xs text-editorial-muted hover:text-editorial-ink/70 transition-colors"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          All Modules
        </Link>
      </div>

      {/* Sidebar */}
      <Sidebar
        modules={modules}
        clusters={clusters}
        selectedSlug={selectedSlug}
        onClose={() => setSelectedSlug(null)}
      />
    </div>
  )
}
