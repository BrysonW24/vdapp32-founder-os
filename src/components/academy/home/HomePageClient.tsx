"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Map,
  Layers,
  Rocket,
  Users,
  Palette,
  FileText,
  Megaphone,
  Mail,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import HeroScene from "@/components/academy/hero/HeroScene"
import { ZeroToHero } from "@/components/academy/svg/ZeroToHero"
import { MarketingFunnel } from "@/components/academy/svg/MarketingFunnel"
import { MarketingFlywheel } from "@/components/academy/svg/MarketingFlywheel"

const LEARNING_PATH = [
  { icon: BookOpen, title: "Start with Foundations", description: "Understand the core principles that underpin all marketing — what it is, why it matters, and how businesses use it to grow." },
  { icon: Map, title: "Explore the Map", description: "See how every marketing discipline connects to form a complete system. No part works in isolation." },
  { icon: Layers, title: "Work Through Modules", description: "Progress through structured modules with clear explanations, frameworks, and real examples." },
  { icon: Rocket, title: "Practice with Projects", description: "Apply what you learn with hands-on projects that build real marketing skills." },
]

const QUICK_START = [
  { icon: Users, title: "Customer", description: "Understand who you are marketing to and what they need.", color: "text-editorial-green", bgColor: "bg-editorial-green-soft", href: "/modules" },
  { icon: Palette, title: "Brand", description: "Build a clear identity that people recognise and trust.", color: "text-[#6d28d9]", bgColor: "bg-[#ede9fe]", href: "/modules" },
  { icon: FileText, title: "Content", description: "Create valuable material that attracts and educates your audience.", color: "text-editorial-blue", bgColor: "bg-editorial-blue-soft", href: "/modules" },
  { icon: Megaphone, title: "Paid", description: "Use advertising to reach the right people at the right time.", color: "text-editorial-amber", bgColor: "bg-editorial-amber-soft", href: "/modules" },
  { icon: Mail, title: "Email", description: "Build direct relationships with your audience through their inbox.", color: "text-editorial-red", bgColor: "bg-editorial-red-soft", href: "/modules" },
  { icon: BarChart3, title: "Analytics", description: "Measure what works and make smarter decisions with data.", color: "text-[#2563eb]", bgColor: "bg-[#dbeafe]", href: "/modules" },
]

const ECOSYSTEM = [
  { step: "Research", desc: "Understand your market" },
  { step: "Positioning", desc: "Define your place in it" },
  { step: "Messaging", desc: "Craft what you say" },
  { step: "Channels", desc: "Choose where to say it" },
  { step: "Content", desc: "Create the material" },
  { step: "Campaigns", desc: "Execute and launch" },
  { step: "Analytics", desc: "Measure the results" },
  { step: "Retention", desc: "Keep them coming back" },
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
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] sm:min-h-[65vh] flex items-center overflow-hidden">
        {/* Animated node system — positioned to the right on desktop, behind on mobile */}
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
              Marketing Academy
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Learn Marketing{" "}
              <span className="text-editorial-green">From Zero</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-base sm:text-lg text-editorial-muted leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              A structured visual academy to understand what marketing is, how the
              parts connect, and how to start practicing it.
            </motion.p>
            <motion.div
              className="mt-6 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/modules">
                  Begin Your Journey <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/learning-map">Explore the Map</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Zero to Hero journey ── */}
      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-2">
              Your Journey
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink">
              From <span className="text-editorial-muted">Zero</span> to{" "}
              <span className="text-editorial-green">Hero</span>
            </h2>
            <p className="text-sm text-editorial-muted mt-2 max-w-md mx-auto">
              Six months of focused practice. Each stage builds on the last.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ZeroToHero />
          </motion.div>
        </div>
      </section>

      {/* ── What is Marketing + Funnel Visual ── */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
            <motion.div {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-4">
                What is Marketing?
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-editorial-muted leading-relaxed">
                <p>
                  Marketing is how businesses understand what people need and communicate
                  the value of what they offer. It is the entire process of connecting a
                  product with the people who will benefit from it.
                </p>
                <p>
                  It answers three questions: Who are we trying to reach? What do they
                  care about? And how do we show them that what we offer solves their problem?
                </p>
              </div>
            </motion.div>

            {/* Animated marketing funnel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-4 sm:p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-editorial-muted text-center mb-4 font-medium">
                  The Marketing Funnel
                </p>
                <MarketingFunnel />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Ecosystem Flow + Flywheel ── */}
      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.4)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              The Marketing Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-editorial-muted max-w-lg mx-auto">
              Marketing is a connected system, not a single skill. Each part feeds into the next.
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
                  The Growth Flywheel
                </p>
                <MarketingFlywheel />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How to Use ── */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              How to Use This Academy
            </h2>
            <p className="text-sm text-editorial-muted max-w-md mx-auto">
              Four steps to get the most out of your learning journey.
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

      {/* ── Quick Start Cards ── */}
      <section className="py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(241,236,225,0.4)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-8" {...fadeInUp}>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-editorial-ink mb-2">
              Explore Marketing Branches
            </h2>
            <p className="text-sm text-editorial-muted max-w-md mx-auto">
              Six core areas that make up the modern marketing landscape.
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

      {/* ── Bottom CTA ── */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <Card className="glass-panel-strong max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8 text-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-editorial-ink">
                Ready to start?
              </h2>
              <p className="text-sm text-editorial-muted max-w-md mx-auto">
                Begin with Module 1 — &quot;What Marketing Actually Is&quot; — and work your
                way through the entire curriculum at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/modules/what-marketing-is/what-marketing-actually-is">
                    Start Lesson 1 <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/careers">Explore Career Paths</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
