"use client";

import Link from "next/link";
import { useId } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  FolderKanban,
  Layers3,
  RefreshCw,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeroScene from "@/components/academy/hero/HeroScene";
import {
  getSubjectHomeDefinition,
  type SubjectHomeDirectionCard,
  type SubjectHomeUsageStep,
} from "@/lib/subject-home-definitions";
import {
  SubjectFocusVisual,
  SubjectFlowVisual,
} from "@/components/founder/classic/shared/SubjectAcademyVisuals";
import type {
  BusinessSystem,
  DomainMeta,
  Framework,
  Module,
  Playbook,
  Project,
  SubjectManifest,
  Tool,
} from "@/types/curriculum";

interface SubjectAcademyHomeProps {
  subject: SubjectManifest;
  modules: Module[];
  playbooks: Playbook[];
  systems: BusinessSystem[];
  tools: Tool[];
  projects: Project[];
  frameworks: Framework[];
  domainMeta: DomainMeta | null;
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

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const, amount: 0.25 },
  transition: { duration: 0.52 },
};

function SectionIntro({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  body: string;
  align?: "center" | "left";
}) {
  const alignmentClass =
    align === "center" ? "max-w-2xl mx-auto text-center" : "max-w-xl";

  return (
    <motion.div className={alignmentClass} {...fadeInUp}>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-3">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-editorial-muted leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
}

function MetricChart({
  accentColor,
  bars,
}: {
  accentColor: string;
  bars: number[];
}) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 220 92"
      className="h-20 w-full"
      role="img"
      aria-label="operating signal chart"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <rect
        x="8"
        y="18"
        width="204"
        height="58"
        rx="20"
        fill={withAlpha(accentColor, 0.08)}
      />
      {bars.map((value, index) => (
        <g key={index}>
          <rect
            x="22"
            y={24 + index * 14}
            width="176"
            height="8"
            rx="4"
            fill="rgba(29,33,38,0.08)"
          />
          <rect
            x="22"
            y={24 + index * 14}
            width={value}
            height="8"
            rx="4"
            fill={`url(#${gradientId})`}
          />
        </g>
      ))}
      <circle
        cx="188"
        cy="30"
        r="14"
        fill="white"
        stroke={withAlpha(accentColor, 0.22)}
      />
      <text
        x="188"
        y="35"
        textAnchor="middle"
        fill="#1d2126"
        fontSize="11"
        fontWeight="700"
      >
        KPI
      </text>
    </svg>
  );
}

function RhythmTimeline({ accentColor }: { accentColor: string }) {
  return (
    <svg
      viewBox="0 0 220 80"
      className="h-16 w-full"
      role="img"
      aria-label="operating rhythm timeline"
    >
      <rect
        x="10"
        y="14"
        width="200"
        height="52"
        rx="18"
        fill={withAlpha(accentColor, 0.08)}
      />
      <path
        d="M30 40h160"
        stroke={withAlpha(accentColor, 0.34)}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
      {[40, 90, 140, 190].map((x, index) => (
        <g key={x}>
          <circle
            cx={x}
            cy="40"
            r="11"
            fill="white"
            stroke={withAlpha(accentColor, 0.3)}
          />
          <circle cx={x} cy="40" r="4" fill={accentColor} fillOpacity="0.7" />
          <text
            x={x}
            y="64"
            textAnchor="middle"
            fill="#1d2126"
            fontSize="10"
            fontWeight="600"
          >
            W{index + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

function DelegationOrbit({ accentColor }: { accentColor: string }) {
  return (
    <svg
      viewBox="0 0 220 92"
      className="h-20 w-full"
      role="img"
      aria-label="delegation and automation orbit"
    >
      <circle
        cx="110"
        cy="46"
        r="20"
        fill="white"
        stroke={withAlpha(accentColor, 0.25)}
      />
      <circle
        cx="54"
        cy="46"
        r="14"
        fill={withAlpha(accentColor, 0.12)}
        stroke={withAlpha(accentColor, 0.22)}
      />
      <circle
        cx="166"
        cy="46"
        r="14"
        fill={withAlpha(accentColor, 0.12)}
        stroke={withAlpha(accentColor, 0.22)}
      />
      <path
        d="M68 46h26M126 46h26"
        stroke={withAlpha(accentColor, 0.56)}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <text
        x="110"
        y="51"
        textAnchor="middle"
        fill="#1d2126"
        fontSize="11"
        fontWeight="700"
      >
        Owner
      </text>
      <text
        x="54"
        y="50"
        textAnchor="middle"
        fill="#1d2126"
        fontSize="10"
        fontWeight="700"
      >
        Delegate
      </text>
      <text
        x="166"
        y="50"
        textAnchor="middle"
        fill="#1d2126"
        fontSize="10"
        fontWeight="700"
      >
        Automate
      </text>
    </svg>
  );
}

function DirectionCard({
  accentColor,
  card,
}: {
  accentColor: string;
  card: SubjectHomeDirectionCard;
}) {
  const Icon = card.icon;

  return (
    <motion.div {...fadeInUp}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-[12px]"
            style={{ backgroundColor: withAlpha(accentColor, 0.12) }}
          >
            <Icon className="h-5 w-5" style={{ color: accentColor }} />
          </div>
          <CardTitle className="text-lg">{card.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {card.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function UsageStepCard({
  accentColor,
  step,
  index,
}: {
  accentColor: string;
  step: SubjectHomeUsageStep;
  index: number;
}) {
  const Icon = step.icon;

  return (
    <motion.div {...fadeInUp}>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="mb-1 flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-[10px]"
              style={{ backgroundColor: withAlpha(accentColor, 0.12) }}
            >
              <Icon className="h-4 w-4" style={{ color: accentColor }} />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-editorial-muted">
              Step {index + 1}
            </span>
          </div>
          <CardTitle className="text-base">{step.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xs leading-relaxed">
            {step.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function SubjectAcademyHome({
  subject,
  modules,
  playbooks,
  systems,
  tools,
  projects,
  frameworks,
  domainMeta,
}: SubjectAcademyHomeProps) {
  const definition = getSubjectHomeDefinition(subject.slug);
  const accentColor = subject.color;
  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0,
  );
  const heroStats = [
    { icon: BookOpen, label: `${modules.length} modules` },
    { icon: Layers3, label: `${totalLessons} lessons` },
    { icon: RefreshCw, label: `${systems.length} systems` },
    { icon: Wrench, label: `${tools.length} tools` },
    { icon: FolderKanban, label: `${projects.length} projects` },
  ];

  const metrics = domainMeta?.coreMetrics.slice(0, 4) ?? [];
  const metricBars = metrics.map((_, index) => 88 + index * 24);
  const weeklyRhythm = domainMeta?.weeklyRhythm.slice(0, 3) ?? [];
  const monthlyRhythm = domainMeta?.monthlyRhythm.slice(0, 3) ?? [];
  const delegationItems = domainMeta?.whatToDelegate.slice(0, 3) ?? [];
  const automationItems = domainMeta?.whatToAutomate.slice(0, 3) ?? [];

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[64vh] sm:min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center sm:justify-end sm:pr-8 opacity-35 sm:opacity-60">
          <HeroScene />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#f7f3ea]/96 via-[#f7f3ea]/84 to-transparent" />
        <div
          className="absolute inset-0 z-[1] opacity-90"
          style={{
            background: `radial-gradient(circle at 78% 32%, ${withAlpha(accentColor, 0.14)}, transparent 34%), radial-gradient(circle at 18% 82%, ${withAlpha(accentColor, 0.08)}, transparent 28%)`,
          }}
        />

        <div className="container relative z-10 mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-2xl">
            <motion.p
              className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              {definition.academyLabel}
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-editorial-ink leading-[0.94] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {definition.heroTitle}{" "}
              <span style={{ color: accentColor }}>
                {definition.heroAccent}
              </span>
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-base sm:text-lg text-editorial-muted leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
            >
              {definition.heroBody}
            </motion.p>
            <motion.div
              className="mt-6 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link href={definition.primaryCta.href}>
                  {definition.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={definition.secondaryCta.href}>
                  {definition.secondaryCta.label}
                </Link>
              </Button>
            </motion.div>
            <motion.div
              className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-editorial-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
            >
              {definition.heroChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[rgba(44,49,59,0.08)] bg-white/66 px-3 py-1"
                >
                  {chip}
                </span>
              ))}
            </motion.div>
            <motion.div
              className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-editorial-muted"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.44 }}
            >
              {heroStats.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(44,49,59,0.08)] bg-white/70 px-3 py-1"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-8 items-center max-w-6xl mx-auto">
            <div>
              <SectionIntro
                eyebrow={definition.overviewEyebrow}
                title={definition.overviewTitle}
                body={definition.overviewBody[0]}
                align="left"
              />
              <motion.p
                className="mt-4 max-w-2xl text-sm sm:text-base text-editorial-muted leading-relaxed"
                {...fadeInUp}
              >
                {definition.overviewBody[1]}
              </motion.p>
              <motion.div className="mt-6 flex flex-wrap gap-3" {...fadeInUp}>
                {[
                  `${frameworks.length} mental models`,
                  `${playbooks.length} playbooks`,
                  `${subject.deepDivePages.length} deep dives`,
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.74)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-editorial-muted"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div {...fadeInUp}>
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-2">
                        {definition.visualTitle}
                      </p>
                      <CardTitle className="text-lg">
                        Subject focal diagram
                      </CardTitle>
                    </div>
                    <div
                      className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: withAlpha(accentColor, 0.12) }}
                    >
                      <Sparkles
                        className="h-5 w-5"
                        style={{ color: accentColor }}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-[20px] bg-[rgba(247,243,234,0.85)] p-4">
                    <SubjectFocusVisual
                      kind={definition.visualKind}
                      accentColor={accentColor}
                    />
                  </div>
                  <p className="text-sm text-editorial-muted leading-relaxed">
                    {definition.visualCaption}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.42)]" />
        <div className="container relative z-10 mx-auto px-4">
          <SectionIntro
            eyebrow="Operating Signals"
            title={definition.signalTitle}
            body={definition.signalBody}
          />

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-4 max-w-6xl mx-auto">
            <motion.div {...fadeInUp}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                    Key Metrics
                  </p>
                  <CardTitle className="text-lg">Signal dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MetricChart accentColor={accentColor} bars={metricBars} />
                  <div className="space-y-3">
                    {metrics.map((metric, index) => (
                      <div key={metric.name} className="space-y-1.5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-editorial-ink">
                            {metric.name}
                          </p>
                          <span className="rounded-full bg-[rgba(255,255,255,0.85)] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-editorial-muted">
                            {metric.frequency}
                          </span>
                        </div>
                        <p className="text-xs text-editorial-muted leading-relaxed">
                          {metric.description}
                        </p>
                        <div className="flex items-center justify-between gap-3">
                          <div className="h-2 flex-1 rounded-full bg-[rgba(29,33,38,0.07)]">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${56 + index * 10}%`,
                                background: `linear-gradient(90deg, ${withAlpha(
                                  accentColor,
                                  0.28,
                                )}, ${withAlpha(accentColor, 0.82)})`,
                              }}
                            />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-editorial-muted">
                            {metric.target}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                    Weekly Rhythm
                  </p>
                  <CardTitle className="text-lg">
                    Cadence and review loop
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RhythmTimeline accentColor={accentColor} />
                  <div className="space-y-3">
                    {weeklyRhythm.map((entry) => (
                      <div
                        key={entry.day}
                        className="rounded-[16px] bg-[rgba(255,255,255,0.66)] p-3"
                      >
                        <div className="mb-1 flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-editorial-ink">
                            {entry.day}
                          </p>
                          <span className="text-[10px] uppercase tracking-[0.16em] text-editorial-muted">
                            {entry.duration}
                          </span>
                        </div>
                        <p className="text-xs text-editorial-muted leading-relaxed">
                          {entry.activity}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {monthlyRhythm.map((entry) => (
                      <div
                        key={entry.week}
                        className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-white/72 p-3"
                      >
                        <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">
                          Week {entry.week}
                        </p>
                        <p className="mt-1 text-sm font-medium text-editorial-ink">
                          {entry.focus}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                    Leverage Design
                  </p>
                  <CardTitle className="text-lg">
                    Delegate and automate with care
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <DelegationOrbit accentColor={accentColor} />
                  <div className="grid grid-cols-1 gap-3">
                    <div className="rounded-[18px] bg-[rgba(255,255,255,0.68)] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <ArrowRight
                          className="h-4 w-4"
                          style={{ color: accentColor }}
                        />
                        <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                          What to delegate
                        </p>
                      </div>
                      <div className="space-y-2">
                        {delegationItems.map((item) => (
                          <div key={item.task}>
                            <p className="text-sm font-medium text-editorial-ink">
                              {item.task}
                            </p>
                            <p className="text-xs text-editorial-muted leading-relaxed">
                              {item.toWhom}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[18px] bg-[rgba(255,255,255,0.68)] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Sparkles
                          className="h-4 w-4"
                          style={{ color: accentColor }}
                        />
                        <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                          What to automate
                        </p>
                      </div>
                      <div className="space-y-2">
                        {automationItems.map((item) => (
                          <div key={item.task}>
                            <p className="text-sm font-medium text-editorial-ink">
                              {item.task}
                            </p>
                            <p className="text-xs text-editorial-muted leading-relaxed">
                              {item.tool} • saves ~{item.savesHoursPerWeek}{" "}
                              hrs/week
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <SectionIntro
            eyebrow="The Ecosystem"
            title={definition.ecosystemTitle}
            body={definition.ecosystemBody}
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 max-w-6xl mx-auto items-center">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader className="pb-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                    System Flow
                  </p>
                  <CardTitle className="text-lg">
                    How the parts connect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-[20px] bg-[rgba(247,243,234,0.82)] p-4">
                    <SubjectFlowVisual
                      accentColor={accentColor}
                      steps={definition.ecosystemSteps}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="space-y-3" {...fadeInUp}>
              {definition.ecosystemSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="rounded-[18px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.72)] p-4"
                >
                  <div className="mb-1 flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-mono"
                      style={{
                        backgroundColor: withAlpha(accentColor, 0.12),
                        color: accentColor,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-base font-serif font-semibold text-editorial-ink">
                      {step.step}
                    </p>
                  </div>
                  <p className="text-sm text-editorial-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.34)]" />
        <div className="container relative z-10 mx-auto px-4">
          <SectionIntro
            eyebrow="Direction"
            title={definition.directionTitle}
            body={definition.directionBody}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {definition.directionCards.map((card) => (
              <DirectionCard
                key={card.title}
                accentColor={accentColor}
                card={card}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <SectionIntro
            eyebrow="How To Use This Academy"
            title="A practical path through the subject"
            body="Use the academy like an operating system: foundations first, map second, modules third, and real application while the work is still live."
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {definition.usageSteps.map((step, index) => (
              <UsageStepCard
                key={step.title}
                accentColor={accentColor}
                step={step}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.42)]" />
        <div className="container relative z-10 mx-auto px-4">
          <SectionIntro
            eyebrow="Branch Explorer"
            title={definition.branchesTitle}
            body={definition.branchesBody}
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {definition.branchCards.map((branch) => {
              const Icon = branch.icon;
              return (
                <motion.div key={branch.title} {...fadeInUp}>
                  <Link href={branch.href} className="block group h-full">
                    <Card className="h-full hover:-translate-y-[2px] hover:shadow-editorial-hover">
                      <CardHeader className="pb-3">
                        <div
                          className="mb-3 flex h-10 w-10 items-center justify-center rounded-[12px]"
                          style={{
                            backgroundColor: withAlpha(accentColor, 0.12),
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: accentColor }}
                          />
                        </div>
                        <CardTitle className="text-lg group-hover:text-editorial-green transition-colors">
                          {branch.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <CardDescription className="text-sm leading-relaxed">
                          {branch.description}
                        </CardDescription>
                        <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-editorial-green">
                          Explore
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto" {...fadeInUp}>
            <Card className="glass-panel-strong">
              <CardContent className="p-6 sm:p-8 text-center space-y-4">
                <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted">
                  Ready to start?
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink">
                  {definition.closingTitle}
                </h2>
                <p className="max-w-xl mx-auto text-sm sm:text-base text-editorial-muted leading-relaxed">
                  {definition.closingBody}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  <Button asChild size="lg" className="gap-2">
                    <Link href={definition.closingPrimaryCta.href}>
                      {definition.closingPrimaryCta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href={definition.closingSecondaryCta.href}>
                      {definition.closingSecondaryCta.label}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
