"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  TrendingUp,
  Eye,
  Shield,
  Search,
  Bot,
  Users,
  Target,
  Network,
} from "lucide-react"

const TABS = [
  { slug: "now", label: "Now", description: "What is changing in sales today" },
  { slug: "1-2-years", label: "1-2 Years", description: "Near-term shifts already underway" },
  { slug: "5-years", label: "5 Years", description: "How the role evolves as systems mature" },
  { slug: "10-years", label: "10 Years", description: "Long-range patterns and durable human advantage" },
]

const NOW_SHIFTS = [
  {
    icon: Bot,
    title: "AI is becoming baseline sales infrastructure",
    description: "Top reps are already using AI for account research, call preparation, recap drafting, and deal inspection. The edge is no longer access to AI. The edge is workflow design and judgment.",
  },
  {
    icon: Shield,
    title: "Buyer trust is harder to earn",
    description: "Generic outreach is easier to create than ever, which makes researched relevance more valuable than ever. Credibility, clarity, and specificity are now competitive assets.",
  },
  {
    icon: Search,
    title: "Buyers arrive more informed",
    description: "Most serious evaluators do substantial independent research before they meet a rep. Sellers win when they add synthesis, commercial insight, and decision structure rather than reciting features.",
  },
  {
    icon: Eye,
    title: "Async selling is permanent",
    description: "Video recaps, digital sales rooms, shared docs, and post-call summaries are no longer optional extras. They are part of how complex buying groups move decisions forward between meetings.",
  },
  {
    icon: Users,
    title: "Multi-threading is a core skill, not an advanced one",
    description: "Modern deals are rarely single-threaded. Sellers need to build consensus across users, managers, technical evaluators, finance, procurement, and executive sponsors earlier in the cycle.",
  },
]

const NEAR_TERM = [
  {
    icon: Target,
    title: "Precision beats volume in outbound",
    description: "The next wave of outbound separates teams that merely automate from teams that combine signal, account context, and differentiated messaging. Personalization without point of view will stop working.",
  },
  {
    icon: Sparkles,
    title: "Manager review gets AI-assisted",
    description: "Coaching, forecast inspection, and deal reviews will be supported by AI summaries, risk detection, and pattern analysis. Human managers still decide what matters and what action to take.",
  },
  {
    icon: Network,
    title: "Revenue teams align around the same operating truth",
    description: "RevOps, sales, marketing, and customer success will share cleaner lifecycle definitions, tighter handoffs, and common metrics because fragmented systems are too expensive to maintain.",
  },
  {
    icon: Shield,
    title: "Governance becomes part of selling discipline",
    description: "As more workflow is automated, data quality, messaging rules, legal review, and AI usage policy become frontline sales concerns rather than back-office topics.",
  },
]

const FIVE_YEAR = [
  {
    icon: Users,
    title: "AEs become orchestrators of complex decisions",
    description: "The seller's job keeps moving away from presentation and toward coordination: aligning stakeholders, sequencing proof, managing risk, and keeping buying momentum alive.",
  },
  {
    icon: Eye,
    title: "Differentiation shifts toward commercial insight",
    description: "When product information is easy to access, value comes from diagnosing business problems, quantifying cost, and helping the buyer make a confident decision.",
  },
  {
    icon: Target,
    title: "Forecasting becomes a strategic skill",
    description: "Boards and executives will keep rewarding teams that can distinguish signal from hope. Clean pipeline and honest forecasting will matter as much as raw activity volume.",
  },
  {
    icon: Network,
    title: "Post-sale thinking becomes part of pre-sale excellence",
    description: "Expansion potential, onboarding risk, adoption barriers, and long-term account value will increasingly shape how strong reps qualify and position deals before signature.",
  },
]

const TEN_YEAR = [
  {
    title: "Routine selling work becomes highly automated",
    description: "Prospecting research, note capture, task creation, and first-draft communication will be heavily automated. Human time shifts toward diagnosis, decision navigation, negotiation, and trust.",
  },
  {
    title: "Human judgment becomes more visible, not less",
    description: "As systems handle more execution, the sales professionals who stand out will be the ones with sharper thinking, stronger commercial taste, better stakeholder management, and better timing.",
  },
  {
    title: "Revenue roles blur around lifecycle ownership",
    description: "The line between acquiring, expanding, and retaining revenue keeps softening. The best commercial leaders understand the whole lifecycle and design teams around it intentionally.",
  },
  {
    title: "The durable advantage stays profoundly human",
    description: "Courage to challenge, empathy under pressure, political awareness, and the ability to create clarity in uncertain decisions remain difficult to automate. Those traits compound in every era.",
  },
]

export default function FutureOfSalesPage() {
  const [activeTab, setActiveTab] = useState("now")

  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold">Future of Sales</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Understand how the role is changing now, what becomes more automated,
          and which skills grow more valuable as sales becomes more data-rich, AI-assisted, and multi-threaded.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
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
              <h2 className="text-xl font-semibold">What&apos;s changing right now</h2>
              <p className="text-muted-foreground text-sm mt-1">
                The role is becoming more research-heavy, more system-supported, and less tolerant of generic execution.
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
                Expect less experimentation theatre and more operational integration across the commercial stack.
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
                  Double down on account selection, discovery depth, multi-threading,
                  business-case building, forecast honesty, and AI-assisted preparation.
                  These are the skills most likely to compound.
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
                Sales keeps moving toward orchestration, commercial insight, and tighter lifecycle accountability.
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
              <h2 className="text-xl font-semibold">10-Year Outlook</h2>
              <p className="text-muted-foreground text-sm mt-1">
                The workflow automates heavily, but the human edge concentrates in judgment, trust, and decision leadership.
              </p>
            </div>
            <div className="space-y-3">
              {TEN_YEAR.map((item) => (
                <Card key={item.title}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
