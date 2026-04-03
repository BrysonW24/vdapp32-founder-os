"use client"

import Link from "next/link"
import {
  BookOpen,
  Wrench,
  FolderKanban,
  Play,
  ArrowRight,
  Clock,
  Layers,
  BarChart3,
  Calendar,
  Users,
  Bot,
  FileText,
  RefreshCw,
} from "lucide-react"
import type {
  SubjectManifest,
  Module,
  Playbook,
  BusinessSystem,
  Tool,
  Project,
  Framework,
  DomainMeta,
  PromptPack,
  Template,
} from "@/types/curriculum"
import { SUBJECT_GROUP_LABELS, type SubjectGroup } from "@/types/curriculum"

interface SubjectOverviewProps {
  subject: SubjectManifest
  modules: Module[]
  playbooks: Playbook[]
  systems: BusinessSystem[]
  tools: Tool[]
  projects: Project[]
  frameworks?: Framework[]
  domainMeta?: DomainMeta | null
  prompts?: PromptPack[]
  templates?: Template[]
}

export function SubjectOverview({
  subject,
  modules,
  playbooks,
  systems,
  tools,
  projects,
  frameworks = [],
  domainMeta,
  prompts = [],
  templates = [],
}: SubjectOverviewProps) {
  const slug = subject.slug
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)
  const hasAnyContent =
    modules.length > 0 ||
    playbooks.length > 0 ||
    systems.length > 0 ||
    tools.length > 0 ||
    projects.length > 0 ||
    frameworks.length > 0 ||
    prompts.length > 0 ||
    templates.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-8">
        <div
          className="inline-block h-2 w-12 rounded-full mb-4"
          style={{ backgroundColor: subject.color }}
        />
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-editorial-ink mb-3">
          {subject.name}
        </h1>
        <p className="text-editorial-muted text-lg max-w-2xl">
          {subject.tagline}
        </p>
        {hasAnyContent && (
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-editorial-muted">
            {playbooks.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Play className="h-4 w-4" /> {playbooks.length} playbooks
              </span>
            )}
            {systems.length > 0 && (
              <span className="flex items-center gap-1.5">
                <RefreshCw className="h-4 w-4" /> {systems.length} systems
              </span>
            )}
            {modules.length > 0 && (
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {modules.length} modules
              </span>
            )}
            {totalLessons > 0 && (
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4" /> {totalLessons} lessons
              </span>
            )}
            {tools.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Wrench className="h-4 w-4" /> {tools.length} tools
              </span>
            )}
          </div>
        )}
      </div>

      {/* Empty state for skeleton subjects */}
      {!hasAnyContent && !domainMeta && (
        <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-10 sm:p-14 text-center">
          <div
            className="inline-block h-3 w-16 rounded-full mb-5"
            style={{ backgroundColor: subject.color, opacity: 0.4 }}
          />
          <h2 className="font-serif text-2xl font-semibold text-editorial-ink mb-2">
            {subject.name} is being built
          </h2>
          <p className="text-editorial-muted max-w-md mx-auto mb-4">
            This domain is part of the{" "}
            <span className="font-medium text-editorial-ink">
              {SUBJECT_GROUP_LABELS[subject.group as SubjectGroup]}
            </span>{" "}
            cluster. Content is on the way.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-editorial-green hover:underline"
          >
            Back to dashboard <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* Operating Rhythm — from domain-meta */}
      {domainMeta && (
        <div className="mb-10">
          <h2 className="font-serif text-2xl font-semibold text-editorial-ink mb-5">
            Operating Rhythm
          </h2>

          {/* Core Metrics */}
          {domainMeta.coreMetrics.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3 flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" /> Key Metrics
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {domainMeta.coreMetrics.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-4"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-editorial-ink text-sm">
                        {m.name}
                      </p>
                      <span className="text-[10px] uppercase tracking-wider text-editorial-muted">
                        {m.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-editorial-muted mb-1.5">
                      {m.description}
                    </p>
                    <p className="text-xs font-medium text-editorial-green">
                      Target: {m.target}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly & Monthly Rhythm */}
          <div className="grid gap-4 sm:grid-cols-2">
            {domainMeta.weeklyRhythm.length > 0 && (
              <div className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-5">
                <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Weekly Rhythm
                </h3>
                <div className="space-y-2.5">
                  {domainMeta.weeklyRhythm.map((r, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-editorial-ink w-16">
                          {r.day}
                        </span>
                        <span className="text-xs text-editorial-muted">
                          {r.duration}
                        </span>
                      </div>
                      <p className="text-sm text-editorial-muted pl-16 -mt-0.5">
                        {r.activity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {domainMeta.monthlyRhythm.length > 0 && (
              <div className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-5">
                <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-3 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Monthly Rhythm
                </h3>
                <div className="space-y-2.5">
                  {domainMeta.monthlyRhythm.map((r, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-editorial-ink w-16">
                          Week {r.week}
                        </span>
                        <span className="text-xs text-editorial-amber font-medium">
                          {r.focus}
                        </span>
                      </div>
                      <p className="text-sm text-editorial-muted pl-16 -mt-0.5">
                        {r.deliverable}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {hasAnyContent && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <QuickAction
            href={`/${slug}/playbooks`}
            label="Playbooks"
            description="Step-by-step operational guides"
            count={playbooks.length}
            color={subject.color}
          />
          <QuickAction
            href={`/${slug}/systems`}
            label="Systems"
            description="Frameworks & repeatable processes"
            count={systems.length}
            color={subject.color}
          />
          <QuickAction
            href={`/${slug}/tools`}
            label="Tools"
            description="What to use, when, and why"
            count={tools.length}
            color={subject.color}
          />
          <QuickAction
            href={`/${slug}/learn`}
            label="Learn"
            description="Modules & structured lessons"
            count={modules.length}
            color={subject.color}
          />
        </div>
      )}

      {/* Playbooks Section */}
      {playbooks.length > 0 && (
        <Section
          title="Quick Playbooks"
          subtitle="Pick one and execute right now"
          viewAllHref={`/${slug}/playbooks`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {playbooks.slice(0, 3).map((pb) => (
              <Link
                key={pb.slug}
                href={`/${slug}/playbooks/${pb.slug}`}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-5 hover:shadow-editorial-hover transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green">
                    {pb.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-editorial-muted">
                    <Clock className="h-3 w-3" />
                    {pb.timeToComplete}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
                  {pb.title}
                </h3>
                <p className="text-sm text-editorial-muted line-clamp-2">
                  {pb.summary}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Systems */}
      {systems.length > 0 && (
        <Section
          title="Key Systems"
          subtitle="Repeatable processes for this domain"
          viewAllHref={`/${slug}/systems`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {systems.slice(0, 4).map((sys) => (
              <Link
                key={sys.slug}
                href={`/${slug}/systems/${sys.slug}`}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-5 hover:shadow-editorial-hover transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-blue-soft text-editorial-blue">
                    {sys.frequency}
                  </span>
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-amber-soft text-editorial-amber">
                    {sys.owner}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
                  {sys.title}
                </h3>
                <p className="text-sm text-editorial-muted line-clamp-2">
                  {sys.summary}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Delegation & Automation — from domain-meta */}
      {domainMeta &&
        (domainMeta.whatToDelegate.length > 0 ||
          domainMeta.whatToAutomate.length > 0) && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-semibold text-editorial-ink mb-5">
              Delegation & Automation
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {domainMeta.whatToDelegate.length > 0 && (
                <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-6">
                  <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-4 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" /> What to Delegate
                  </h3>
                  <div className="space-y-4">
                    {domainMeta.whatToDelegate.map((d, i) => (
                      <div key={i}>
                        <p className="font-semibold text-editorial-ink text-sm">
                          {d.task}
                        </p>
                        <p className="text-xs text-editorial-muted mt-0.5">
                          When: {d.when}
                        </p>
                        <p className="text-xs text-editorial-amber mt-0.5">
                          To: {d.toWhom}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {domainMeta.whatToAutomate.length > 0 && (
                <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-6">
                  <h3 className="text-xs uppercase tracking-[0.18em] text-editorial-muted mb-4 flex items-center gap-1.5">
                    <Bot className="h-3.5 w-3.5" /> What to Automate
                  </h3>
                  <div className="space-y-4">
                    {domainMeta.whatToAutomate.map((a, i) => (
                      <div key={i}>
                        <p className="font-semibold text-editorial-ink text-sm">
                          {a.task}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-editorial-blue">
                            {a.tool}
                          </span>
                          <span className="text-xs text-editorial-green font-medium">
                            Saves ~{a.savesHoursPerWeek}h/week
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Frameworks */}
      {frameworks.length > 0 && (
        <Section
          title="Frameworks & Mental Models"
          subtitle="Decision tools and thinking patterns"
          viewAllHref={`/${slug}/systems`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {frameworks.slice(0, 6).map((fw) => (
              <div
                key={fw.slug}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-5"
              >
                <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-blue-soft text-editorial-blue mb-2">
                  {fw.category}
                </span>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
                  {fw.name}
                </h3>
                <p className="text-sm text-editorial-muted line-clamp-2">
                  {fw.summary}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Domain-meta-only state — subject has operating rhythm but no content yet */}
      {!hasAnyContent && domainMeta && (
        <div className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-8 text-center mb-12">
          <p className="text-editorial-muted mb-1">
            Playbooks, systems, and modules for {subject.name} are being built.
          </p>
          <p className="text-sm text-editorial-muted">
            The operating rhythm above shows how this domain runs day-to-day.
          </p>
        </div>
      )}

      {/* Tools */}
      {tools.length > 0 && (
        <Section
          title="Tools"
          subtitle="What to use, when, and why"
          viewAllHref={`/${slug}/tools`}
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(0, 6).map((tool) => (
              <Link
                key={tool.slug}
                href={`/${slug}/tools/${tool.slug}`}
                className="rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] p-4 hover:shadow-editorial-soft transition-shadow"
              >
                <h4 className="font-semibold text-editorial-ink mb-0.5">
                  {tool.name}
                </h4>
                <p className="text-xs text-editorial-muted line-clamp-1">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* AI Prompts */}
      {prompts.length > 0 && (
        <Section
          title="AI Prompts"
          subtitle="Ready-to-use prompts for this domain"
          viewAllHref={`/${slug}/tools`}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {prompts.map((pack) => (
              <div
                key={pack.slug}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4 text-editorial-blue" />
                  <span className="text-xs text-editorial-muted">
                    {pack.prompts.length} prompts
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
                  {pack.title}
                </h3>
                <p className="text-sm text-editorial-muted line-clamp-2">
                  {pack.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Templates */}
      {templates.length > 0 && (
        <Section
          title="Templates"
          subtitle="Ready-to-use documents and canvases"
          viewAllHref={`/${slug}/tools`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((tpl) => (
              <div
                key={tpl.slug}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-editorial-muted" />
                  <span className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium bg-editorial-blue-soft text-editorial-blue">
                    {tpl.format}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
                  {tpl.title}
                </h3>
                <p className="text-sm text-editorial-muted line-clamp-2">
                  {tpl.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Learning */}
      {modules.length > 0 && (
        <Section
          title="Learn"
          subtitle={`${modules.length} modules with ${totalLessons} lessons`}
          viewAllHref={`/${slug}/learn/modules`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.slice(0, 6).map((mod) => (
              <Link
                key={mod.slug}
                href={`/${slug}/learn/modules/${mod.slug}`}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-5 hover:shadow-editorial-hover transition-shadow"
              >
                <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-green-soft text-editorial-green mb-2">
                  {mod.level}
                </span>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
                  {mod.title}
                </h3>
                <p className="text-sm text-editorial-muted line-clamp-2">
                  {mod.shortSummary}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section
          title="Projects"
          subtitle="Learn by building real deliverables"
          viewAllHref={`/${slug}/projects`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((proj) => (
              <Link
                key={proj.slug}
                href={`/${slug}/projects/${proj.slug}`}
                className="rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft p-5 hover:shadow-editorial-hover transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-editorial-amber-soft text-editorial-amber">
                    Difficulty {proj.difficulty}/10
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-editorial-ink mb-1">
                  {proj.title}
                </h3>
                <p className="text-sm text-editorial-muted line-clamp-2">
                  {proj.description}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

function QuickAction({
  href,
  label,
  description,
  count,
  color,
}: {
  href: string
  label: string
  description: string
  count: number
  color: string
}) {
  const isEmpty = count === 0
  return (
    <Link
      href={href}
      className={`rounded-[22px] border border-[rgba(44,49,59,0.08)] p-5 transition-shadow group ${
        isEmpty
          ? "bg-[rgba(255,255,255,0.4)] opacity-60"
          : "bg-[rgba(255,255,255,0.78)] shadow-editorial-soft backdrop-blur-[18px] hover:shadow-editorial-hover"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="inline-block h-2 w-6 rounded-full"
          style={{ backgroundColor: color, opacity: isEmpty ? 0.3 : 1 }}
        />
        <span className="text-xs text-editorial-muted">
          {isEmpty ? "—" : count}
        </span>
      </div>
      <h3
        className={`font-serif text-lg font-semibold mb-0.5 transition-colors ${
          isEmpty
            ? "text-editorial-muted"
            : "text-editorial-ink group-hover:text-editorial-green"
        }`}
      >
        {label}
      </h3>
      <p className="text-xs text-editorial-muted">{description}</p>
    </Link>
  )
}

function Section({
  title,
  subtitle,
  viewAllHref,
  children,
}: {
  title: string
  subtitle: string
  viewAllHref: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-12">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-editorial-ink">
            {title}
          </h2>
          <p className="text-sm text-editorial-muted">{subtitle}</p>
        </div>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 text-sm text-editorial-green hover:underline"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      {children}
    </div>
  )
}
