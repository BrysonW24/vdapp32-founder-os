"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Clock3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSubjectHomeDefinition } from "@/lib/subject-home-definitions";
import type {
  DayInLife,
  DomainMeta,
  DomainSlug,
  SubjectManifest,
} from "@/types/curriculum";

interface SubjectRoleMapSectionProps {
  subject: SubjectManifest;
  scenarios: DayInLife[];
  domainMeta: DomainMeta | null;
  introOverride?: {
    eyebrow?: string;
    title: string;
    body: string;
  };
}

const SUBJECT_COMPLEXITY_BASELINES: Record<DomainSlug, number> = {
  strategy: 78,
  product: 81,
  sales: 81,
  marketing: 75,
  finance: 80,
  accounting: 73,
  operations: 76,
  leadership: 84,
  "customer-success": 77,
  legal: 82,
  "data-analytics": 83,
  "ai-automation": 86,
  "ai-engineering": 91,
  capital: 87,
  "founder-performance": 74,
};

const SUBJECT_TRAIT_BIASES: Record<
  DomainSlug,
  {
    abstract: number;
    systems: number;
    communication: number;
    ambiguity: number;
    consistency: number;
  }
> = {
  strategy: {
    abstract: 10,
    systems: 11,
    communication: 8,
    ambiguity: 11,
    consistency: 4,
  },
  product: {
    abstract: 8,
    systems: 10,
    communication: 7,
    ambiguity: 9,
    consistency: 5,
  },
  sales: {
    abstract: 2,
    systems: 5,
    communication: 18,
    ambiguity: 9,
    consistency: 10,
  },
  marketing: {
    abstract: 4,
    systems: 7,
    communication: 14,
    ambiguity: 8,
    consistency: 7,
  },
  finance: {
    abstract: 9,
    systems: 9,
    communication: 5,
    ambiguity: 5,
    consistency: 11,
  },
  accounting: {
    abstract: 5,
    systems: 8,
    communication: 4,
    ambiguity: 2,
    consistency: 14,
  },
  operations: {
    abstract: 4,
    systems: 12,
    communication: 8,
    ambiguity: 5,
    consistency: 10,
  },
  leadership: {
    abstract: 5,
    systems: 10,
    communication: 18,
    ambiguity: 10,
    consistency: 10,
  },
  "customer-success": {
    abstract: 3,
    systems: 7,
    communication: 17,
    ambiguity: 8,
    consistency: 11,
  },
  legal: {
    abstract: 9,
    systems: 9,
    communication: 10,
    ambiguity: 7,
    consistency: 12,
  },
  "data-analytics": {
    abstract: 12,
    systems: 11,
    communication: 3,
    ambiguity: 6,
    consistency: 8,
  },
  "ai-automation": {
    abstract: 8,
    systems: 12,
    communication: 6,
    ambiguity: 8,
    consistency: 8,
  },
  "ai-engineering": {
    abstract: 15,
    systems: 15,
    communication: 1,
    ambiguity: 10,
    consistency: 8,
  },
  capital: {
    abstract: 8,
    systems: 8,
    communication: 14,
    ambiguity: 10,
    consistency: 8,
  },
  "founder-performance": {
    abstract: 4,
    systems: 6,
    communication: 10,
    ambiguity: 8,
    consistency: 14,
  },
};

const PANEL_PALETTE = [
  "#386a58",
  "#2f4f79",
  "#a16a1f",
  "#6d28d9",
  "#a0453f",
  "#0f766e",
];

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, amount: 0.25 },
  transition: { duration: 0.48 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function withAlpha(hex: string, alpha: number) {
  const sanitized = hex.replace("#", "");
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : sanitized;

  const value = Number.parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getScenarioLabel(scenario: DayInLife) {
  const parts = scenario.title.split(" - ");
  if (parts.length > 1) {
    return parts[parts.length - 1];
  }

  return titleCaseFromSlug(scenario.slug);
}

function shortLabel(label: string, maxLength = 14) {
  if (label.length <= maxLength) {
    return label;
  }

  const trimmed = label
    .replace(/^the\s+/i, "")
    .replace(/\band\b/gi, "&")
    .replace(/\boperations\b/gi, "Ops")
    .replace(/\bmanagement\b/gi, "Mgmt");

  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, maxLength - 1)}…`;
}

function toCircleLabel(label: string) {
  const compact = shortLabel(label, 10);
  if (compact.length <= 10) {
    return compact;
  }

  const words = compact.split(" ");
  if (words.length > 1) {
    return words
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  }

  return compact.slice(0, 3).toUpperCase();
}

function getRoleWeight(
  scenario: DayInLife,
  scenarioIndex: number,
  totalScenarios: number,
) {
  const normalizedIndex =
    totalScenarios > 1 ? scenarioIndex / (totalScenarios - 1) : 0.5;
  let weight = (normalizedIndex - 0.45) * 10;

  if (
    /(enterprise|series-a|executive|head|director|cfo|chief|big-tech|lead)/.test(
      scenario.slug,
    )
  ) {
    weight += 5;
  }

  if (
    /(startup|founder|freelancer|pre-seed|small-business|sdr-bdr|analyst)/.test(
      scenario.slug,
    )
  ) {
    weight -= 4;
  }

  return weight;
}

function getMetricBase(frequency: string) {
  if (frequency === "daily") return 87;
  if (frequency === "weekly") return 79;
  if (frequency === "monthly") return 72;
  if (frequency === "quarterly") return 66;
  return 70;
}

function parseClockValue(time: string) {
  const match = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);

  if (!match) {
    return null;
  }

  const hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2] ?? "0", 10);
  const meridiem = match[3].toUpperCase();
  let normalizedHours = hours % 12;

  if (meridiem === "PM") {
    normalizedHours += 12;
  }

  return normalizedHours * 60 + minutes;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angle: number,
) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function RoleMicroPanel({
  eyebrow,
  title,
  accentColor,
  children,
}: {
  eyebrow: string;
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="h-full rounded-[28px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.82)] p-5 sm:p-6 shadow-editorial-soft backdrop-blur-[18px]"
      {...fadeInUp}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-serif font-semibold text-editorial-ink sm:text-xl">
        {title}
      </h3>
      <div
        className="mt-4 h-px w-12"
        style={{ backgroundColor: withAlpha(accentColor, 0.22) }}
      />
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

function ComplexityGauge({
  score,
  accentColor,
  caption,
}: {
  score: number;
  accentColor: string;
  caption: string;
}) {
  const startAngle = 150;
  const sweep = 240;
  const valueAngle = startAngle + (sweep * score) / 100;
  const trackPath = describeArc(120, 118, 84, startAngle, startAngle + sweep);
  const valuePath = describeArc(120, 118, 84, startAngle, valueAngle);
  const valuePoint = polarToCartesian(120, 118, 74, valueAngle);

  return (
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 240 168"
        className="w-full max-w-[280px] overflow-visible"
      >
        <defs>
          <linearGradient
            id={`role-complexity-${accentColor.replace("#", "")}`}
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor={withAlpha(accentColor, 0.95)} />
            <stop offset="55%" stopColor="#2f4f79" />
            <stop offset="100%" stopColor="#a16a1f" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((mark) => {
          const angle = startAngle + (sweep * mark) / 100;
          const inner = polarToCartesian(120, 118, 91, angle);
          const outer = polarToCartesian(120, 118, 103, angle);
          const label = polarToCartesian(120, 118, 116, angle);
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
          );
        })}
        <path
          d={trackPath}
          fill="none"
          stroke="rgba(44,49,59,0.08)"
          strokeWidth={16}
          strokeLinecap="round"
        />
        <motion.path
          d={valuePath}
          fill="none"
          stroke={`url(#role-complexity-${accentColor.replace("#", "")})`}
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
        <div className="text-4xl font-serif font-bold leading-none text-editorial-ink">
          {score}
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
        {caption}
      </p>
    </div>
  );
}

function DependencySurface({
  centerLabel,
  nodes,
  accentColor,
  caption,
}: {
  centerLabel: string;
  nodes: { label: string; color: string }[];
  accentColor: string;
  caption: string;
}) {
  const positions = [
    { x: 24, y: 82 },
    { x: 56, y: 28 },
    { x: 124, y: 28 },
    { x: 154, y: 82 },
    { x: 122, y: 136 },
    { x: 56, y: 136 },
  ];

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 176 164" className="h-[160px] w-[176px] shrink-0">
        {positions.slice(0, nodes.length).map((point, index) => (
          <line
            key={`link-${index}`}
            x1={point.x}
            y1={point.y}
            x2="88"
            y2="82"
            stroke={withAlpha(accentColor, 0.18)}
            strokeWidth="1.2"
          />
        ))}
        <line
          x1={positions[0].x}
          y1={positions[0].y}
          x2={positions[5].x}
          y2={positions[5].y}
          stroke="rgba(44,49,59,0.08)"
          strokeWidth="1"
        />
        <line
          x1={positions[1].x}
          y1={positions[1].y}
          x2={positions[2].x}
          y2={positions[2].y}
          stroke="rgba(44,49,59,0.08)"
          strokeWidth="1"
        />
        <line
          x1={positions[3].x}
          y1={positions[3].y}
          x2={positions[4].x}
          y2={positions[4].y}
          stroke="rgba(44,49,59,0.08)"
          strokeWidth="1"
        />

        {nodes.map((node, index) => {
          const point = positions[index];
          return (
            <motion.g
              key={node.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              animate={{ y: [0, -2, 0] }}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="17"
                fill="white"
                stroke={node.color}
                strokeWidth="1.5"
              />
              <text
                x={point.x}
                y={point.y + 3}
                textAnchor="middle"
                fontSize="8"
                fontWeight="700"
                fill={node.color}
              >
                {toCircleLabel(node.label)}
              </text>
            </motion.g>
          );
        })}

        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <circle
            cx="88"
            cy="82"
            r="19"
            fill="white"
            stroke={accentColor}
            strokeWidth="1.8"
          />
          <text
            x="88"
            y="78"
            textAnchor="middle"
            fontSize="7"
            fontWeight="700"
            fill="#111827"
          >
            {toCircleLabel(centerLabel)}
          </text>
          <text
            x="88"
            y="88"
            textAnchor="middle"
            fontSize="5.5"
            fill="rgba(44,49,59,0.55)"
          >
            role
          </text>
        </motion.g>
      </svg>
      <div className="space-y-2 text-xs text-editorial-muted">
        <div className="text-xl font-serif font-semibold text-editorial-ink">
          Multi-surface
        </div>
        <p className="max-w-[10rem] leading-relaxed">{caption}</p>
      </div>
    </div>
  );
}

function HumanDemandProfile({
  values,
  accentColor,
}: {
  values: { label: string; value: number }[];
  accentColor: string;
}) {
  return (
    <div className="space-y-3">
      {values.map((item, index) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-editorial-ink">{item.label}</span>
            <span className="font-mono text-editorial-muted">{item.value}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[rgba(44,49,59,0.06)]">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accentColor}, #2f4f79)`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${item.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function OperationalStakesChart({
  stakes,
}: {
  stakes: { label: string; value: number; color: string }[];
}) {
  return (
    <div className="flex h-[148px] items-end justify-between gap-3">
      {stakes.map((item, index) => (
        <div
          key={item.label}
          className="flex flex-1 flex-col items-center gap-2"
        >
          <div className="text-[10px] font-mono text-editorial-muted">
            {item.value}
          </div>
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
          <div className="text-center text-[10px] uppercase tracking-[0.14em] text-editorial-muted">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function DailyRhythmStrip({
  schedule,
  accentColor,
}: {
  schedule: DayInLife["schedule"];
  accentColor: string;
}) {
  const visibleEntries = schedule.slice(0, 4);
  const minutes = visibleEntries
    .map((entry) => parseClockValue(entry.time))
    .filter((value): value is number => value !== null);
  const minMinutes = minutes.length > 0 ? Math.min(...minutes) : 8 * 60;
  const maxMinutes = minutes.length > 0 ? Math.max(...minutes) : 16 * 60;
  const span = Math.max(maxMinutes - minMinutes, 60);

  return (
    <div className="space-y-3">
      {visibleEntries.map((entry, index) => {
        const clockValue = parseClockValue(entry.time);
        const offset =
          clockValue === null
            ? 0
            : clamp(((clockValue - minMinutes) / span) * 62, 0, 62);
        const width = clamp(
          24 + (index + 1) * 8 + entry.activity.length * 0.12,
          30,
          92,
        );

        return (
          <motion.div
            key={`${entry.time}-${entry.activity}`}
            className="rounded-[18px] bg-white/72 p-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-editorial-ink">
                {entry.time}
              </p>
              <span className="text-[10px] uppercase tracking-[0.14em] text-editorial-muted">
                block {index + 1}
              </span>
            </div>
            <div className="relative mb-2 h-2 rounded-full bg-[rgba(44,49,59,0.06)]">
              <motion.div
                className="absolute top-0 h-2 rounded-full"
                style={{
                  left: `${offset}%`,
                  backgroundColor: accentColor,
                }}
                initial={{ width: 0 }}
                whileInView={{
                  width: `${clamp(width - offset, 18, 100 - offset)}%`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              />
            </div>
            <p className="text-xs leading-relaxed text-editorial-muted">
              {shortLabel(entry.activity, 88)}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

function ResponsibilityMix({
  items,
}: {
  items: { label: string; value: number; color: string; detail: string }[];
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const circumference = 2 * Math.PI * 40;
  let currentOffset = 0;

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 120 120" className="h-[112px] w-[112px] -rotate-90">
        <circle
          cx="60"
          cy="60"
          r="40"
          fill="none"
          stroke="rgba(44,49,59,0.08)"
          strokeWidth="14"
        />
        {items.map((item, index) => {
          const ratio = item.value / Math.max(total, 1);
          const dashLength = ratio * circumference;
          const circle = (
            <motion.circle
              key={item.label}
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke={item.color}
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: -currentOffset }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
            />
          );
          currentOffset += dashLength;
          return circle;
        })}
      </svg>
      <div className="space-y-2 text-xs text-editorial-muted">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-editorial-ink">{item.label}</span>
              <span className="font-mono text-editorial-muted">
                {item.value}
              </span>
            </div>
            <p className="mt-0.5 pl-4 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemMotionRail({
  steps,
  activeCount,
  accentColor,
  caption,
}: {
  steps: { step: string; description: string }[];
  activeCount: number;
  accentColor: string;
  caption: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <div key={step.step} className="flex flex-1 items-center gap-2">
            <motion.div
              className="flex-1 rounded-full px-2 py-2 text-center text-[10px] uppercase tracking-[0.12em]"
              style={{
                backgroundColor:
                  index < activeCount ? accentColor : "rgba(44,49,59,0.08)",
                color: index < activeCount ? "white" : "#6b7280",
              }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              {shortLabel(step.step, 12)}
            </motion.div>
            {index < steps.length - 1 ? (
              <div className="h-[2px] w-4 bg-[rgba(44,49,59,0.08)]" />
            ) : null}
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-editorial-muted">{caption}</p>
    </div>
  );
}

function CareerOrbit({
  careerPath,
  accentColor,
}: {
  careerPath: string[];
  accentColor: string;
}) {
  const visiblePath = careerPath.slice(0, 4);
  const ringSizes = [58, 88, 118, 148];

  return (
    <div className="flex items-center gap-5">
      <div className="relative flex h-[160px] w-[160px] items-center justify-center">
        {visiblePath
          .slice()
          .reverse()
          .map((step, index) => (
            <motion.div
              key={step}
              className="absolute rounded-full border"
              style={{
                width: ringSizes[index],
                height: ringSizes[index],
                borderColor:
                  PANEL_PALETTE[
                    (visiblePath.length - 1 - index) % PANEL_PALETTE.length
                  ],
                backgroundColor: withAlpha(accentColor, 0.04 + index * 0.02),
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            />
          ))}
        <div className="text-center">
          <div className="text-xl font-serif font-semibold text-editorial-ink">
            {visiblePath.length} stages
          </div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-editorial-muted">
            of depth
          </div>
        </div>
      </div>
      <div className="space-y-2 text-xs text-editorial-muted">
        {visiblePath.map((step, index) => (
          <div key={step} className="flex items-start gap-2">
            <span
              className="mt-1 h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: PANEL_PALETTE[index % PANEL_PALETTE.length],
              }}
            />
            <span>{shortLabel(step, 42)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SubjectRoleMapSection({
  subject,
  scenarios,
  domainMeta,
  introOverride,
}: SubjectRoleMapSectionProps) {
  const definition = getSubjectHomeDefinition(subject.slug);
  const [activeSlug, setActiveSlug] = useState(scenarios[0]?.slug ?? "");

  if (scenarios.length === 0) {
    return null;
  }

  const activeScenario =
    scenarios.find((scenario) => scenario.slug === activeSlug) ?? scenarios[0];
  const activeIndex = scenarios.findIndex(
    (scenario) => scenario.slug === activeScenario.slug,
  );
  const roleWeight = getRoleWeight(
    activeScenario,
    activeIndex,
    scenarios.length,
  );
  const complexityScore = clamp(
    Math.round(
      SUBJECT_COMPLEXITY_BASELINES[subject.slug as DomainSlug] +
        roleWeight +
        activeScenario.challenges.length * 1.5 +
        Math.max(activeScenario.schedule.length - 6, 0) * 1.1 -
        activeScenario.rewards.length * 0.45,
    ),
    58,
    96,
  );
  const traitBias = SUBJECT_TRAIT_BIASES[subject.slug as DomainSlug];
  const humanDemand = [
    {
      label: "Abstract reasoning",
      value: clamp(
        Math.round(
          complexityScore - 14 + traitBias.abstract + roleWeight * 0.4,
        ),
        52,
        98,
      ),
    },
    {
      label: "Systems thinking",
      value: clamp(
        Math.round(
          complexityScore - 10 + traitBias.systems + roleWeight * 0.35,
        ),
        54,
        98,
      ),
    },
    {
      label: "Communication",
      value: clamp(
        Math.round(
          60 +
            traitBias.communication +
            activeScenario.responsibilities.length * 1.8,
        ),
        54,
        98,
      ),
    },
    {
      label: "Execution pressure",
      value: clamp(
        Math.round(complexityScore - 4 + activeScenario.schedule.length * 1.2),
        58,
        98,
      ),
    },
    {
      label: "Ambiguity tolerance",
      value: clamp(
        Math.round(
          58 + traitBias.ambiguity + activeScenario.challenges.length * 2,
        ),
        52,
        97,
      ),
    },
    {
      label: "Stamina / consistency",
      value: clamp(
        Math.round(
          60 + traitBias.consistency + activeScenario.schedule.length * 1.7,
        ),
        55,
        98,
      ),
    },
  ];

  const operationalStakesSource =
    domainMeta?.coreMetrics.slice(0, 4).map((metric, index) => ({
      label: shortLabel(metric.name, 12),
      value: clamp(
        Math.round(
          getMetricBase(metric.frequency) +
            roleWeight * 0.5 +
            activeScenario.responsibilities.length * 1.2 -
            index * 2,
        ),
        54,
        97,
      ),
      color: PANEL_PALETTE[index % PANEL_PALETTE.length],
    })) ??
    definition.branchCards.slice(0, 4).map((branch, index) => ({
      label: shortLabel(branch.title, 12),
      value: clamp(complexityScore - 8 + index * 3, 54, 94),
      color: PANEL_PALETTE[index % PANEL_PALETTE.length],
    }));

  const dependencySource = [
    ...definition.branchCards.map((branch) => branch.title),
    ...definition.ecosystemSteps.map((step) => step.step),
  ]
    .filter((value, index, values) => values.indexOf(value) === index)
    .slice(0, 6);

  const dependencyLabels = dependencySource.map((label, index) => ({
    label,
    color: PANEL_PALETTE[index % PANEL_PALETTE.length],
  }));

  const responsibilityMix = [
    {
      label: "Responsibilities",
      value: activeScenario.responsibilities.length,
      color: PANEL_PALETTE[0],
      detail: shortLabel(
        activeScenario.responsibilities[0] ?? "Own the core work.",
        68,
      ),
    },
    {
      label: "Challenges",
      value: activeScenario.challenges.length,
      color: PANEL_PALETTE[2],
      detail: shortLabel(
        activeScenario.challenges[0] ?? "Pressure stays visible.",
        68,
      ),
    },
    {
      label: "Rewards",
      value: activeScenario.rewards.length,
      color: PANEL_PALETTE[1],
      detail: shortLabel(
        activeScenario.rewards[0] ?? "Good work compounds.",
        68,
      ),
    },
  ];

  const motionSteps = definition.ecosystemSteps.slice(0, 5);
  const activeStepCount = clamp(
    Math.round(
      2 +
        (activeIndex / Math.max(scenarios.length - 1, 1)) * 2 +
        (/(enterprise|executive|director|lead|cfo|head)/.test(
          activeScenario.slug,
        )
          ? 1
          : 0),
    ),
    2,
    motionSteps.length,
  );

  const intro = introOverride ?? {
    eyebrow: "Visual Role Map",
    title: definition.signalTitle,
    body: definition.signalBody,
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,236,225,0.72),rgba(255,252,247,0.96))]" />
      <div className="container relative z-10 mx-auto px-4">
        <motion.div className="mb-8 max-w-3xl sm:mb-10" {...fadeInUp}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted">
            {intro.eyebrow ?? "Visual Role Map"}
          </p>
          <h2 className="mb-3 text-2xl font-serif font-bold text-editorial-ink sm:text-3xl">
            {intro.title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-editorial-muted sm:text-base">
            {intro.body}
          </p>
        </motion.div>

        <motion.div
          className="mb-6 flex gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label={`${subject.name} role scenarios`}
          {...fadeInUp}
        >
          {scenarios.map((scenario) => {
            const isActive = scenario.slug === activeScenario.slug;
            return (
              <button
                key={scenario.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSlug(scenario.slug)}
                className="min-w-fit rounded-full border px-4 py-2 text-left transition-colors"
                style={{
                  borderColor: isActive
                    ? withAlpha(subject.color, 0.42)
                    : "rgba(44,49,59,0.08)",
                  backgroundColor: isActive
                    ? withAlpha(subject.color, 0.12)
                    : "rgba(255,255,255,0.74)",
                  color: isActive ? "#1d2126" : "#6b7280",
                }}
              >
                <span className="block text-xs font-semibold uppercase tracking-[0.16em]">
                  {getScenarioLabel(scenario)}
                </span>
                <span className="mt-0.5 block text-[11px]">
                  {scenario.companySize}
                </span>
              </button>
            );
          })}
        </motion.div>

        <motion.div {...fadeInUp}>
          <Card className="mb-8 overflow-hidden border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.82)]">
            <CardContent className="grid gap-5 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-6">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: withAlpha(subject.color, 0.12) }}
                  >
                    <Briefcase
                      className="h-5 w-5"
                      style={{ color: subject.color }}
                    />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                      Selected role
                    </p>
                    <h3 className="text-xl font-serif font-semibold text-editorial-ink">
                      {activeScenario.title}
                    </h3>
                  </div>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-editorial-muted">
                  {activeScenario.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:items-end">
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {[
                    activeScenario.setting,
                    activeScenario.companySize,
                    activeScenario.salary,
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[rgba(44,49,59,0.08)] bg-white/80 px-3 py-1 text-xs uppercase tracking-[0.14em] text-editorial-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-editorial-muted">
                    <Clock3 className="h-3.5 w-3.5" />
                    {activeScenario.schedule.length} time blocks
                  </div>
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/${subject.slug}/day-in-the-life`}>
                      Open Day In The Life
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <RoleMicroPanel
            eyebrow="Complexity Index"
            title="The role has a distinct weight"
            accentColor={subject.color}
          >
            <ComplexityGauge
              score={complexityScore}
              accentColor={subject.color}
              caption={shortLabel(
                activeScenario.challenges[0] ??
                  "This role asks for judgment, stamina, and repeated clean execution.",
                110,
              )}
            />
          </RoleMicroPanel>

          <RoleMicroPanel
            eyebrow="Dependency Surface"
            title="The work touches more than one system"
            accentColor={subject.color}
          >
            <DependencySurface
              centerLabel={getScenarioLabel(activeScenario)}
              nodes={dependencyLabels}
              accentColor={subject.color}
              caption={shortLabel(
                activeScenario.responsibilities[0] ??
                  "The role works best when adjacent systems stay aligned.",
                104,
              )}
            />
          </RoleMicroPanel>

          <RoleMicroPanel
            eyebrow="Human Demand Profile"
            title="The person still matters here"
            accentColor={subject.color}
          >
            <HumanDemandProfile
              values={humanDemand}
              accentColor={subject.color}
            />
          </RoleMicroPanel>

          <RoleMicroPanel
            eyebrow="Operational Stakes"
            title="Weak rigor shows up fast"
            accentColor={subject.color}
          >
            <OperationalStakesChart stakes={operationalStakesSource} />
          </RoleMicroPanel>

          <RoleMicroPanel
            eyebrow="Daily Rhythm"
            title="The day has a repeatable beat"
            accentColor={subject.color}
          >
            <DailyRhythmStrip
              schedule={activeScenario.schedule}
              accentColor={subject.color}
            />
          </RoleMicroPanel>

          <RoleMicroPanel
            eyebrow="Work Mix"
            title="The role splits across three loads"
            accentColor={subject.color}
          >
            <ResponsibilityMix items={responsibilityMix} />
          </RoleMicroPanel>

          <RoleMicroPanel
            eyebrow="System Motion"
            title="Different roles lean on different stages"
            accentColor={subject.color}
          >
            <SystemMotionRail
              steps={motionSteps}
              activeCount={activeStepCount}
              accentColor={subject.color}
              caption={shortLabel(
                definition.ecosystemSteps[Math.max(activeStepCount - 1, 0)]
                  ?.description ??
                  "The selected role puts pressure on a specific part of the operating loop.",
                110,
              )}
            />
          </RoleMicroPanel>

          <RoleMicroPanel
            eyebrow="Career Depth"
            title="This role sits inside a longer path"
            accentColor={subject.color}
          >
            <CareerOrbit
              careerPath={activeScenario.careerPath}
              accentColor={subject.color}
            />
          </RoleMicroPanel>
        </div>

        <motion.div
          className="mt-6 flex items-center gap-2 text-xs text-editorial-muted"
          {...fadeInUp}
        >
          <Sparkles className="h-3.5 w-3.5" style={{ color: subject.color }} />
          <span>
            Switch roles to see how the pressure shape, rhythm, and operating
            emphasis change across {subject.shortName}.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
