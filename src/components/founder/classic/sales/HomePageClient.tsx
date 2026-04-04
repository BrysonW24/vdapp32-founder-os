"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Map,
  Layers,
  Rocket,
  Phone,
  Search,
  Presentation,
  Handshake,
  BarChart3,
  Users,
  Database,
  Shield,
  Target,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import HeroScene from "@/components/academy/hero/HeroScene"
import { RoleSignalDashboard } from "@/components/academy/home/RoleSignalDashboard"
import { SalesPipeline } from "@/components/academy/svg/SalesPipeline"
import { RevenueFlywheel } from "@/components/academy/svg/RevenueFlywheel"

const LEARNING_PATH = [
  { icon: BookOpen, title: "Start with Foundations", description: "Understand how enterprise SaaS sales works: buyer problems, value creation, pipeline mechanics, and why the best AEs guide rather than push." },
  { icon: Map, title: "Study the System", description: "See how prospecting, discovery, demos, forecasting, legal, security, and expansion connect into one revenue engine." },
  { icon: Layers, title: "Work Through Modules", description: "Progress through structured modules built around the responsibilities, KPIs, and stakeholder management expected of modern AEs." },
  { icon: Rocket, title: "Practice Like a Rep", description: "Use projects, role-plays, and deal scenarios to build full-cycle skills you can carry into live enterprise and mid-market motions." },
]

const QUICK_START = [
  { icon: Search, title: "Prospecting", description: "Find and engage the right buyers before your competitors do.", color: "text-editorial-green", bgColor: "bg-editorial-green-soft", href: "/sales/learn/modules" },
  { icon: Phone, title: "Discovery", description: "Uncover real pain points and build urgency through great questions.", color: "text-[#6d28d9]", bgColor: "bg-[#ede9fe]", href: "/sales/learn/modules" },
  { icon: Presentation, title: "Demos", description: "Deliver compelling presentations that connect your solution to their problems.", color: "text-editorial-blue", bgColor: "bg-editorial-blue-soft", href: "/sales/learn/modules" },
  { icon: Handshake, title: "Negotiation", description: "Navigate pricing, terms, and objections to close deals that stick.", color: "text-editorial-amber", bgColor: "bg-editorial-amber-soft", href: "/sales/learn/modules" },
  { icon: BarChart3, title: "Pipeline", description: "Build and manage a healthy pipeline that delivers predictable revenue.", color: "text-editorial-red", bgColor: "bg-editorial-red-soft", href: "/sales/learn/modules" },
  { icon: Users, title: "Accounts", description: "Grow existing accounts through cross-sell, upsell, and strategic expansion.", color: "text-[#2563eb]", bgColor: "bg-[#dbeafe]", href: "/sales/learn/modules" },
]

const ECOSYSTEM = [
  { step: "Prospect", desc: "Find the right buyers" },
  { step: "Qualify", desc: "Confirm fit and budget" },
  { step: "Discover", desc: "Uncover real pain" },
  { step: "Present", desc: "Show the solution" },
  { step: "Handle Objections", desc: "Address concerns" },
  { step: "Negotiate", desc: "Align on terms" },
  { step: "Close", desc: "Win the deal" },
  { step: "Expand", desc: "Grow the account" },
]

const AE_BLUEPRINT = [
  {
    icon: Briefcase,
    title: "Full-Cycle Ownership",
    description: "Modern AEs are expected to source pipeline, run discovery, coordinate demos, build business cases, negotiate terms, and protect expansion opportunities.",
  },
  {
    icon: Target,
    title: "KPIs That Matter",
    description: "This academy now leans harder into meetings booked, self-sourced pipeline, win rate, forecast accuracy, and closed ARR instead of generic activity alone.",
  },
  {
    icon: Database,
    title: "Technical + Tool Fluency",
    description: "We are treating CRM discipline, forecast tools, cloud or security context, and credible collaboration with sales engineers as core AE skills.",
  },
  {
    icon: Shield,
    title: "Enterprise Readiness",
    description: "Expect more emphasis on mutual action plans, procurement, legal and security review, executive selling, and multi-stakeholder deal orchestration.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.5 },
}

export function HomePageClient() {
  return (
    <div className="flex flex-col">
      {/* -- Hero -- */}
      <section className="relative min-h-[60vh] sm:min-h-[65vh] flex items-center overflow-hidden">
        {/* Animated node system -- positioned to the right on desktop, behind on mobile */}
        <div className="absolute inset-0 z-0 flex items-center justify-center sm:justify-end sm:pr-8 opacity-40 sm:opacity-60">
          <HeroScene />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#f7f3ea]/95 via-[#f7f3ea]/75 to-transparent" />

        <div className="container relative z-10 mx-auto px-4 py-10 sm:py-16">
          <div className="max-w-xl">
            <motion.p
              className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Sales Academy
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Master Enterprise SaaS Sales{" "}
              <span className="text-editorial-green">From Zero</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-base sm:text-lg text-editorial-muted leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              A structured visual academy for becoming a modern Account
              Executive in software sales. Learn how to prospect, run technical
              discovery, build ROI cases, forecast accurately, and close
              multi-stakeholder deals.
            </motion.p>
            <motion.div
              className="mt-6 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/sales/learn/modules">
                  Begin Your Journey <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/sales/ae-blueprint">View AE Blueprint</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- What is Sales + Pipeline Visual -- */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
            <motion.div {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-4">
                What is Sales?
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-editorial-muted leading-relaxed">
                <p>
                  Sales is the process of creating value for buyers by understanding their
                  problems and connecting them with solutions that genuinely help. It is how
                  businesses turn conversations into revenue and relationships into growth.
                </p>
                <p>
                  Great sales answers three questions: Who has a problem we can solve? What
                  does that problem really cost them? And how do we help them see that our
                  solution is worth the investment?
                </p>
              </div>
            </motion.div>

            {/* Animated sales pipeline */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-4 sm:p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted text-center mb-4 font-medium">
                  The Sales Pipeline
                </p>
                <SalesPipeline />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <RoleSignalDashboard />

      {/* -- Ecosystem Flow + Flywheel -- */}
      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.4)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              The Sales Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-editorial-muted max-w-lg mx-auto">
              Sales is a connected system, not a single skill. Each stage builds on the last
              and feeds into the next.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
            {/* 8-step flow */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-3">
              {ECOSYSTEM.map((item, i) => (
                <motion.div
                  key={item.step}
                  className="flex flex-col items-center text-center p-3 rounded-[16px] bg-[rgba(255,255,255,0.78)] border border-[rgba(44,49,59,0.06)] backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(87,73,47,0.1)" }}
                >
                  <span className="text-[10px] font-mono text-editorial-muted mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif font-semibold text-editorial-ink text-sm">{item.step}</span>
                  <span className="text-[11px] text-editorial-muted mt-0.5">{item.desc}</span>
                </motion.div>
              ))}
            </div>

            {/* Flywheel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-4 sm:p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted text-center mb-2 font-medium">
                  The Revenue Flywheel
                </p>
                <RevenueFlywheel />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -- Research-Informed Direction -- */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8 max-w-2xl mx-auto" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              Research-Informed AE Direction
            </h2>
            <p className="text-sm sm:text-base text-editorial-muted leading-relaxed">
              This academy is being shaped around enterprise SaaS AE expectations:
              full-cycle ownership, commercial discipline, technical credibility,
              and the ability to navigate buyers, internal teams, and the forecast.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {AE_BLUEPRINT.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft mb-3">
                        <Icon className="h-5 w-5 text-editorial-green" />
                      </div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Button asChild variant="secondary" size="lg">
              <Link href="/sales/ae-blueprint">
                See the Full Blueprint <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* -- How to Use -- */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              How to Use This Academy
            </h2>
            <p className="text-sm text-editorial-muted max-w-md mx-auto">
              Four steps to get the most out of your sales learning journey.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {LEARNING_PATH.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                          <Icon className="h-4 w-4 text-editorial-green" />
                        </div>
                        <span className="text-[10px] font-mono text-editorial-muted">Step {i + 1}</span>
                      </div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs leading-relaxed">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* -- Quick Start Cards -- */}
      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.4)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              Explore Sales Branches
            </h2>
            <p className="text-sm text-editorial-muted max-w-md mx-auto">
              Six core areas that make up the modern B2B sales landscape.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {QUICK_START.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Link href={item.href} className="block group">
                    <Card className="h-full hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
                      <CardContent className="p-4 sm:p-5">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${item.bgColor} mb-3`}>
                          <Icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <h3 className="font-serif font-semibold text-editorial-ink text-sm group-hover:text-editorial-green transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-editorial-muted leading-relaxed mt-1">
                          {item.description}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-editorial-green opacity-0 group-hover:opacity-100 transition-opacity">
                          Explore <ArrowRight className="h-2.5 w-2.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* -- Bottom CTA -- */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <Card className="glass-panel-strong max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8 text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-editorial-ink">
                Ready to start?
              </h2>
              <p className="text-sm text-editorial-muted max-w-md mx-auto">
                Begin with Module 1 — &quot;What Sales Actually Is&quot; — and work your
                way through the entire curriculum at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/sales/learn/modules">
                    Start Lesson 1 <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/sales/ae-blueprint">Explore the AE Blueprint</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
