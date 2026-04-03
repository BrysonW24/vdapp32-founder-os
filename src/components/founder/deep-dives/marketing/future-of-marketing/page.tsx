"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  TrendingUp,
  Eye,
  Shield,
  Search,
  Bot,
  Users,
  Lightbulb,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = [
  { slug: "now", label: "Now", description: "What's happening in marketing today" },
  { slug: "1-2-years", label: "1-2 Years", description: "Near-term shifts already in motion" },
  { slug: "5-years", label: "5 Years", description: "The medium-term trajectory" },
  { slug: "10-years", label: "10 Years", description: "Scenario-based thinking about the future" },
]

const NOW_SHIFTS = [
  {
    icon: Bot,
    title: "AI is becoming standard infrastructure",
    description: "AI is no longer a differentiator — it's baseline. 80% of marketers use AI for content creation, 75% for media production. The difference isn't whether you use AI, it's how well you operationalise it.",
  },
  {
    icon: Shield,
    title: "Brand trust matters more than ever",
    description: "The internet is flooding with AI-generated content. Distinctiveness, authenticity, and earned trust are the new competitive moats. Generic content gets ignored; genuine brand voice cuts through.",
  },
  {
    icon: Search,
    title: "Search is fragmenting",
    description: "92% of marketers are optimising for both traditional search and AI-powered discovery. Nearly 30% report decreased search traffic as consumers use AI tools for research instead of Google.",
  },
  {
    icon: Eye,
    title: "Visibility beyond blue links",
    description: "Being discoverable now means appearing in AI answers, featured snippets, social search, and voice assistants — not just ranking #1 on Google.",
  },
  {
    icon: TrendingUp,
    title: "61% say biggest disruption in 20 years",
    description: "Marketers themselves recognise this moment. The shift from experimentation to integration is happening now. The winners are the teams who build systems, not the ones running one-off experiments.",
  },
]

const NEAR_TERM = [
  {
    icon: Target,
    title: "Integration over experimentation",
    description: "Think with Google frames 2026 as the move from AI experimentation to AI integration. Teams that embed AI into daily workflows will outpace those still running pilots.",
  },
  {
    icon: Shield,
    title: "Stricter editorial and brand control",
    description: "More AI-assisted production, but with stronger guardrails. Brand voice guidelines, editorial review processes, and human-in-the-loop workflows become essential.",
  },
  {
    icon: Users,
    title: "First-party data becomes critical",
    description: "As third-party cookies disappear and privacy regulations tighten, owning your customer data and building direct relationships (email, community, loyalty) is the new foundation.",
  },
  {
    icon: Sparkles,
    title: "AI-scaled personalisation",
    description: "McKinsey highlights AI-scaled personalisation as the next frontier. Not just 'Hi {first_name}' — but dynamically personalised content, offers, and journeys at scale.",
  },
]

const FIVE_YEAR = [
  {
    icon: Users,
    title: "Marketers become orchestrators",
    description: "Less like channel operators, more like system designers. The marketer's job shifts from 'run the Facebook ads' to 'design the customer experience system and direct AI agents to execute it.'",
  },
  {
    icon: Eye,
    title: "Marketers become editors",
    description: "With AI generating first drafts of everything, the highest-value human skill becomes editorial judgment — knowing what's good, what's on-brand, and what resonates.",
  },
  {
    icon: Target,
    title: "Marketers become measurement translators",
    description: "Translating AI-generated analytics into executive-level insight becomes a core skill. The gap between data and decision is where humans add the most value.",
  },
  {
    icon: Shield,
    title: "Marketers become brand governors",
    description: "As AI creates more touchpoints, someone needs to ensure brand consistency, ethical standards, and quality control across all of them. That's the marketer.",
  },
]

const TEN_YEAR = [
  {
    title: "Execution becomes highly automated",
    description: "Routine campaign creation, optimisation, and reporting run autonomously. The human role shifts to strategy, judgment, and creative direction.",
  },
  {
    title: "Differentiation shifts to judgment and taste",
    description: "When everyone has the same AI tools, competitive advantage comes from originality, cultural intuition, brand vision, and strategic courage.",
  },
  {
    title: "Marketing and product experience merge",
    description: "The line between 'marketing' and 'product experience' blurs. The best marketers design experiences, not just campaigns.",
  },
  {
    title: "Commercial translators emerge",
    description: "The strongest marketers become the bridge between AI systems, customer behaviour, and executive priorities — people who know what matters, why it matters, and how to direct systems around it.",
  },
]

export default function FutureOfMarketingPage() {
  const [activeTab, setActiveTab] = useState("now")

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold">Future of Marketing</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Understand where marketing is today, where it&apos;s heading, and what
          skills will matter most. The future marketer isn&apos;t the person who
          clicks the most buttons — it&apos;s the person who knows what matters.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <Button
            key={tab.slug}
            variant={activeTab === tab.slug ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.slug)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "now" && (
          <motion.div
            key="now"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold">What&apos;s happening right now</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Based on HubSpot&apos;s 2026 State of Marketing, Google&apos;s marketing
                predictions, and industry signals.
              </p>
            </div>
            <div className="space-y-3">
              {NOW_SHIFTS.map((shift) => (
                <Card key={shift.title}>
                  <CardContent className="p-5 flex items-start gap-4">
                    <shift.icon className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">{shift.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{shift.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "1-2-years" && (
          <motion.div
            key="near"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold">1-2 Year Outlook</h2>
              <p className="text-muted-foreground text-sm mt-1">
                The likely near-term pattern: more integration, less experimentation
                theatre. More AI-assisted production, but stricter editorial control.
              </p>
            </div>
            <div className="space-y-3">
              {NEAR_TERM.map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-5 flex items-start gap-4">
                    <item.icon className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-secondary/50">
              <CardContent className="p-5">
                <p className="font-semibold text-sm">What this means for your learning</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Focus on: classic channels, AI search discoverability, first-party
                  data thinking, workflow design, and human review discipline. These
                  are the skills that compound.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "5-years" && (
          <motion.div
            key="five"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold">5-Year Trajectory</h2>
              <p className="text-muted-foreground text-sm mt-1">
                AI is moving into agentic systems. Marketing leaders are being pushed
                toward value realisation, operating models, and governance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FIVE_YEAR.map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-5 flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "10-years" && (
          <motion.div
            key="ten"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold">10-Year Scenarios</h2>
              <Badge variant="secondary">Speculative — presented as scenarios, not predictions</Badge>
              <p className="text-muted-foreground text-sm mt-2">
                These are directional signals, not certainties. The pace of change
                makes long-range prediction difficult, but the trajectory is clear.
              </p>
            </div>
            <div className="space-y-3">
              {TEN_YEAR.map((item) => (
                <Card key={item.title} className="border-dashed">
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-6 text-center">
                <p className="text-lg font-semibold">
                  The future marketer is not the person who clicks the most buttons.
                </p>
                <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
                  It&apos;s the person who knows what matters, why it matters, and
                  how to direct systems around it.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
