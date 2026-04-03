"use client"

const NODES = [
  { label: "Customer", color: "#10b981", angle: 0 },
  { label: "Brand", color: "#a855f7", angle: 60 },
  { label: "Content", color: "#06b6d4", angle: 120 },
  { label: "Paid", color: "#f59e0b", angle: 180 },
  { label: "Email", color: "#f43f5e", angle: 240 },
  { label: "Analytics", color: "#3b82f6", angle: 300 },
]

const CENTER_X = 200
const CENTER_Y = 200
const RADIUS = 130
const NODE_RADIUS = 24
const CENTER_RADIUS = 36

function getNodePosition(angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    x: CENTER_X + RADIUS * Math.cos(rad),
    y: CENTER_Y + RADIUS * Math.sin(rad),
  }
}

export function HeroFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[400px] max-h-[400px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
          {NODES.map((node) => (
            <radialGradient key={`glow-${node.label}`} id={`glow-${node.label}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={node.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={node.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Center glow */}
        <circle cx={CENTER_X} cy={CENTER_Y} r={80} fill="url(#center-glow)">
          <animate attributeName="r" values="75;85;75" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Connection lines */}
        {NODES.map((node) => {
          const pos = getNodePosition(node.angle)
          return (
            <line
              key={`line-${node.label}`}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={pos.x}
              y2={pos.y}
              stroke={node.color}
              strokeWidth="1.5"
              strokeOpacity="0.25"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.15;0.35;0.15"
                dur="3s"
                repeatCount="indefinite"
                begin={`${NODES.indexOf(node) * 0.5}s`}
              />
            </line>
          )
        })}

        {/* Center node */}
        <circle cx={CENTER_X} cy={CENTER_Y} r={CENTER_RADIUS} fill="#14b8a6" opacity="0.9">
          <animate attributeName="r" values="34;38;34" dur="4s" repeatCount="indefinite" />
        </circle>
        <text
          x={CENTER_X}
          y={CENTER_Y + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="10"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Marketing
        </text>

        {/* Orbit nodes */}
        {NODES.map((node, i) => {
          const pos = getNodePosition(node.angle)
          return (
            <g key={node.label}>
              {/* Glow */}
              <circle cx={pos.x} cy={pos.y} r={40} fill={`url(#glow-${node.label})`}>
                <animate
                  attributeName="r"
                  values="36;44;36"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                />
              </circle>
              {/* Node circle */}
              <circle cx={pos.x} cy={pos.y} r={NODE_RADIUS} fill={node.color} opacity="0.85">
                <animate
                  attributeName="opacity"
                  values="0.75;0.95;0.75"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                />
              </circle>
              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="8"
                fontWeight="500"
                fontFamily="system-ui, sans-serif"
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
