"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  Megaphone,
  FileText,
  Mail,
  Search,
  Globe,
  Palette,
  Users,
  Target,
  Bot,
  ShoppingCart,
  Briefcase,
  ArrowUpRight,
  Star,
  Building2,
  Zap,
  Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Marketing Specialisations ──────────────────────────────────── */

interface Specialisation {
  slug: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  salaryRange: string
  demandLevel: "Very High" | "High" | "Medium" | "Growing"
  closenessToRevenue: number // 1-5, 5 = closest to bottom line
  description: string
  whatYouDo: string[]
  dayToDay: string[]
  tools: string[]
  whyItMatters: string
  careerPath: string[]
  bestFor: string
}

const SPECIALISATIONS: Specialisation[] = [
  {
    slug: "performance",
    title: "Performance Marketing",
    icon: BarChart3,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    salaryRange: "$80K–$160K AUD",
    demandLevel: "Very High",
    closenessToRevenue: 5,
    description: "Performance marketers run paid advertising campaigns on Google, Meta, TikTok, and other platforms. They manage budgets, optimise targeting, test creative, and are directly accountable for revenue and ROI. This is the closest marketing role to the business P&L.",
    whatYouDo: [
      "Plan and run paid campaigns across search, social, and display",
      "Manage advertising budgets from $5K to $500K+ per month",
      "Optimise campaigns daily based on ROAS, CPA, and conversion data",
      "A/B test ad creative, audiences, and landing pages",
      "Build attribution models and report on marketing ROI",
      "Work directly with finance to justify marketing spend",
    ],
    dayToDay: [
      "Morning: Check dashboards — CPA, ROAS, spend pacing",
      "Midday: Launch new ad variants, pause underperformers",
      "Afternoon: Report to leadership on campaign performance",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics", "Looker Studio"],
    whyItMatters: "Performance marketing is the engine that converts marketing spend into revenue. When the CEO asks 'what did our marketing investment return?', this is the team that answers. It's the most directly measurable and highest-accountability marketing discipline.",
    careerPath: ["Paid Media Specialist → Paid Media Manager → Head of Performance → VP Growth / CMO"],
    bestFor: "People who love data, optimisation, and seeing direct cause-and-effect between spend and revenue.",
  },
  {
    slug: "growth",
    title: "Growth Marketing",
    icon: TrendingUp,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    salaryRange: "$90K–$180K AUD",
    demandLevel: "Very High",
    closenessToRevenue: 5,
    description: "Growth marketers sit at the intersection of marketing, product, and data. They own the full funnel — acquisition, activation, retention, revenue, and referral. They run experiments across every touchpoint to find scalable growth levers.",
    whatYouDo: [
      "Design and run experiments across the entire customer journey",
      "Identify and prioritise the highest-impact growth opportunities",
      "Build and optimise funnels, onboarding flows, and retention loops",
      "Analyse data to find patterns and predict customer behaviour",
      "Work cross-functionally with product, engineering, and sales",
      "Own key metrics: CAC, CLV, activation rate, retention rate",
    ],
    dayToDay: [
      "Morning: Review experiment results, update hypothesis backlog",
      "Midday: Cross-functional sync with Product on onboarding flow",
      "Afternoon: Design next week's experiments, analyse cohort data",
    ],
    tools: ["Mixpanel", "Google Analytics", "Amplitude", "Optimizely"],
    whyItMatters: "Growth marketers drive the metrics that matter most to investors and leadership. They think in systems, not campaigns — finding compounding levers that build on each other over time.",
    careerPath: ["Growth Analyst → Growth Manager → Head of Growth → VP Growth / CMO"],
    bestFor: "People who are analytical, experimental, and comfortable working across product and marketing.",
  },
  {
    slug: "content",
    title: "Content Marketing",
    icon: FileText,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    salaryRange: "$65K–$130K AUD",
    demandLevel: "High",
    closenessToRevenue: 3,
    description: "Content marketers create valuable, educational, and entertaining content that attracts and engages audiences. They build trust over time through blogs, videos, podcasts, and social content. Content is the foundation that fuels every other marketing channel.",
    whatYouDo: [
      "Develop content strategy aligned with business goals",
      "Write blog posts, guides, case studies, and whitepapers",
      "Create or brief video, podcast, and visual content",
      "Manage editorial calendars and publishing workflows",
      "Measure content performance and optimise for SEO",
      "Build and nurture an audience over time",
    ],
    dayToDay: [
      "Morning: Write or edit a blog post, review freelancer drafts",
      "Midday: Keyword research, plan next month's content calendar",
      "Afternoon: Publish content, promote on social, review analytics",
    ],
    tools: ["WordPress", "Webflow", "Ahrefs", "Google Search Console", "Canva"],
    whyItMatters: "Content builds the trust layer that makes every other channel work better. Ads convert better when the brand has credibility. Sales close faster when prospects have already read your content. It's a compounding asset.",
    careerPath: ["Content Writer → Content Manager → Head of Content → VP Content / Editorial Director"],
    bestFor: "People who love writing, storytelling, and building long-term audience relationships.",
  },
  {
    slug: "seo",
    title: "SEO & Search",
    icon: Search,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    salaryRange: "$75K–$150K AUD",
    demandLevel: "High",
    closenessToRevenue: 4,
    description: "SEO specialists make websites visible in search engines. They combine technical knowledge (site structure, speed, crawlability) with content strategy (keyword research, topic authority) to drive organic traffic — the highest-ROI marketing channel.",
    whatYouDo: [
      "Conduct keyword research and competitive analysis",
      "Optimise website content, structure, and technical performance",
      "Build and execute link-building strategies",
      "Monitor rankings, traffic, and search algorithm updates",
      "Collaborate with content and dev teams on SEO requirements",
      "Analyse search intent and plan content to match it",
    ],
    dayToDay: [
      "Morning: Check Search Console for new queries and rank changes",
      "Midday: Technical audit, brief developers on fixes needed",
      "Afternoon: Content optimisation, keyword research for new pages",
    ],
    tools: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog"],
    whyItMatters: "Organic search is free recurring traffic. A well-ranking page can drive revenue for years without ongoing ad spend. SEO is one of the few marketing channels with genuinely compounding returns.",
    careerPath: ["SEO Analyst → SEO Manager → Head of SEO → VP Digital / CMO"],
    bestFor: "People who are analytical, patient, and enjoy the puzzle of ranking content.",
  },
  {
    slug: "social",
    title: "Social Media Marketing",
    icon: Megaphone,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    salaryRange: "$55K–$110K AUD",
    demandLevel: "High",
    closenessToRevenue: 2,
    description: "Social media marketers build and engage audiences on platforms like Instagram, TikTok, LinkedIn, and Facebook. They create content, manage communities, and increasingly drive direct sales through social commerce.",
    whatYouDo: [
      "Create and schedule social content across platforms",
      "Engage with followers, respond to comments and DMs",
      "Analyse social metrics and adjust strategy",
      "Collaborate with influencers and brand partners",
      "Stay current with platform trends and algorithm changes",
      "Build and manage community engagement",
    ],
    dayToDay: [
      "Morning: Post content, respond to overnight comments/DMs",
      "Midday: Film or create content for the week ahead",
      "Afternoon: Review analytics, plan next week's calendar",
    ],
    tools: ["Buffer", "Hootsuite", "Later", "Canva", "TikTok"],
    whyItMatters: "Social media is where your audience lives. It builds brand awareness, drives engagement, and increasingly drives direct sales. It's also the fastest feedback loop in marketing — you know within hours what resonates.",
    careerPath: ["Social Media Coordinator → Social Media Manager → Head of Social → Director of Brand"],
    bestFor: "People who are creative, culturally tuned in, and enjoy fast-paced community building.",
  },
  {
    slug: "email",
    title: "Email & Lifecycle Marketing",
    icon: Mail,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    salaryRange: "$70K–$140K AUD",
    demandLevel: "High",
    closenessToRevenue: 5,
    description: "Email and lifecycle marketers own the direct-to-customer communication channel. They build automated sequences, segment audiences, and drive retention and repeat purchases. Email consistently delivers the highest ROI of any marketing channel.",
    whatYouDo: [
      "Design and build email automation flows (welcome, cart, nurture, win-back)",
      "Segment audiences based on behaviour and preferences",
      "Write email copy and design templates",
      "A/B test subject lines, content, and send times",
      "Analyse deliverability, open rates, and revenue attribution",
      "Own retention metrics: repeat purchase rate, churn, CLV",
    ],
    dayToDay: [
      "Morning: Review email performance dashboards, check deliverability",
      "Midday: Build new automated flow or optimise existing sequence",
      "Afternoon: Write next week's newsletter, review A/B test results",
    ],
    tools: ["Klaviyo", "Mailchimp", "HubSpot", "Litmus"],
    whyItMatters: "Email generates $36-42 for every $1 spent. It's the only channel you truly own — you're not renting attention from an algorithm. Lifecycle marketers directly impact retention, which directly impacts profitability.",
    careerPath: ["Email Specialist → Lifecycle Manager → Head of CRM → VP Retention / CMO"],
    bestFor: "People who are detail-oriented, love automation, and want direct revenue accountability.",
  },
  {
    slug: "brand",
    title: "Brand Marketing",
    icon: Palette,
    color: "text-editorial-red",
    bg: "bg-editorial-red-soft",
    salaryRange: "$70K–$150K AUD",
    demandLevel: "Medium",
    closenessToRevenue: 2,
    description: "Brand marketers define how a company looks, sounds, and feels. They own brand identity, messaging, campaigns, and creative direction. Brand work is harder to measure directly but creates the trust and recognition that makes everything else easier.",
    whatYouDo: [
      "Develop and maintain brand guidelines and identity",
      "Plan and execute brand campaigns",
      "Oversee creative direction across all touchpoints",
      "Conduct brand health research and tracking",
      "Manage brand partnerships and sponsorships",
      "Ensure brand consistency across all channels",
    ],
    dayToDay: [
      "Morning: Review creative briefs, give feedback on campaigns",
      "Midday: Brand strategy session, competitive brand analysis",
      "Afternoon: Partner coordination, brand guidelines update",
    ],
    tools: ["Figma", "Canva", "Adobe Creative Suite", "Brand tracking tools"],
    whyItMatters: "Brand is the long game. It's why people choose Apple over Samsung at a higher price, or why Patagonia commands loyalty. Brand work compounds over years and creates pricing power, customer loyalty, and competitive moats.",
    careerPath: ["Brand Coordinator → Brand Manager → Head of Brand → CMO / Creative Director"],
    bestFor: "People who think strategically, care deeply about consistency, and value long-term brand building.",
  },
  {
    slug: "product",
    title: "Product Marketing",
    icon: ShoppingCart,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    salaryRange: "$85K–$170K AUD",
    demandLevel: "Very High",
    closenessToRevenue: 5,
    description: "Product marketers are the bridge between product and market. They define positioning, craft messaging, enable sales teams, and launch products. They understand both the customer and the product deeply enough to connect the two.",
    whatYouDo: [
      "Define product positioning and messaging frameworks",
      "Launch new products and features to market",
      "Create sales enablement materials (decks, battle cards, FAQs)",
      "Conduct competitive intelligence and market research",
      "Gather and synthesise customer feedback",
      "Own go-to-market strategy for product launches",
    ],
    dayToDay: [
      "Morning: Sync with Product on upcoming feature release",
      "Midday: Write positioning document for new market segment",
      "Afternoon: Train sales team on competitive talking points",
    ],
    tools: ["Notion", "Google Slides", "Gong", "Customer interview tools"],
    whyItMatters: "Product marketing determines whether a product succeeds or fails in the market. You can build the best product in the world — if the positioning is wrong or sales can't articulate the value, it won't sell.",
    careerPath: ["PMM Associate → Product Marketing Manager → Head of PMM → VP Marketing / CMO"],
    bestFor: "People who love strategy, can translate technical features into customer benefits, and enjoy cross-functional work.",
  },
  {
    slug: "ai-marketing",
    title: "AI & Marketing Technology",
    icon: Bot,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    salaryRange: "$90K–$200K+ AUD",
    demandLevel: "Growing",
    closenessToRevenue: 4,
    description: "The newest marketing specialisation. AI marketing specialists build and manage the automation, personalisation, and intelligence systems that make modern marketing scalable. They sit at the intersection of marketing strategy and technology.",
    whatYouDo: [
      "Implement and optimise marketing automation platforms",
      "Build AI-powered personalisation and recommendation systems",
      "Design and maintain the martech stack",
      "Create workflows that connect tools and automate processes",
      "Analyse data to build predictive models and segments",
      "Evaluate and deploy new AI tools for the marketing team",
    ],
    dayToDay: [
      "Morning: Review automation performance, fix broken workflows",
      "Midday: Evaluate new AI tool, build business case for adoption",
      "Afternoon: Build predictive audience segment, train team on new tool",
    ],
    tools: ["HubSpot", "Zapier", "Make", "ChatGPT", "Claude", "Segment"],
    whyItMatters: "This is the fastest-growing marketing discipline. As AI reshapes every channel, the marketers who can harness it effectively will be the most valuable people in any marketing team. It's not about replacing marketers — it's about multiplying their impact.",
    careerPath: ["Marketing Ops Specialist → Martech Manager → Head of Marketing Ops → VP Marketing Technology"],
    bestFor: "People who are tech-curious, love building systems, and want to be at the frontier of how marketing works.",
  },
]

/* ─── Revenue proximity visualisation helper ─── */

function RevenueBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted w-28 shrink-0">Revenue Impact</span>
      <div className="flex gap-0.5 flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              i < value ? "bg-editorial-green" : "bg-editorial-canvas"
            )}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Sorting/filtering ─── */

type SortBy = "revenue" | "salary" | "demand"

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "revenue", label: "Closest to Revenue" },
  { value: "salary", label: "Highest Earning" },
  { value: "demand", label: "Most In-Demand" },
]

const DEMAND_ORDER: Record<string, number> = {
  "Very High": 4,
  "High": 3,
  "Growing": 2,
  "Medium": 1,
}

function parseSalaryMax(range: string): number {
  const match = range.match(/\$(\d+)K/g)
  if (!match || match.length < 2) return 0
  return parseInt(match[1].replace("$", "").replace("K", ""))
}

/* ─── Page ─── */

export default function CareersPage() {
  const [sortBy, setSortBy] = useState<SortBy>("revenue")
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  const sorted = [...SPECIALISATIONS].sort((a, b) => {
    if (sortBy === "revenue") return b.closenessToRevenue - a.closenessToRevenue
    if (sortBy === "salary") return parseSalaryMax(b.salaryRange) - parseSalaryMax(a.salaryRange)
    return (DEMAND_ORDER[b.demandLevel] ?? 0) - (DEMAND_ORDER[a.demandLevel] ?? 0)
  })

  const active = SPECIALISATIONS.find((s) => s.slug === activeSlug)

  return (
    <div className="container py-6 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Career Guide
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Marketing Specialisations
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Marketing isn&apos;t one job — it&apos;s a family of specialisations, each with
          different skills, tools, earning potential, and proximity to the business
          bottom line. Understanding the landscape helps you choose where to focus.
        </p>
      </div>

      {/* Why this matters callout */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6">
          <h3 className="font-serif font-semibold text-editorial-ink mb-3">
            Why &quot;closeness to revenue&quot; matters
          </h3>
          <p className="text-sm text-editorial-muted leading-relaxed max-w-3xl">
            Some marketing roles directly drive measurable revenue — they can say
            &quot;I spent $10K and generated $50K.&quot; Others build brand, trust, and
            awareness that makes everything else work but are harder to measure directly.
            Both matter. But if you want to be valued quickly, understand which roles
            sit closest to the number the CEO cares about most: revenue. The closer
            you are to the bottom line, the easier it is to justify your salary, get
            budget, and advance your career.
          </p>
        </CardContent>
      </Card>

      {/* Sort controls */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.18em] text-editorial-muted block">Sort by</span>
        <div className="flex gap-2">
          {SORT_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={sortBy === opt.value ? "default" : "secondary"}
              size="sm"
              onClick={() => setSortBy(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Specialisation cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((spec) => {
          const Icon = spec.icon
          return (
            <motion.div
              key={spec.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={cn(
                  "cursor-pointer hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200",
                  activeSlug === spec.slug && "ring-2 ring-editorial-green"
                )}
                onClick={() => setActiveSlug(activeSlug === spec.slug ? null : spec.slug)}
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", spec.bg)}>
                        <Icon className={cn("h-5 w-5", spec.color)} />
                      </div>
                      <div>
                        <h3 className="font-serif font-semibold text-editorial-ink text-sm">{spec.title}</h3>
                        <Badge variant="secondary" className="text-[10px] mt-0.5">
                          {spec.demandLevel} demand
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-editorial-muted leading-relaxed line-clamp-2">{spec.description}</p>

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-editorial-muted">Salary (AU)</span>
                      <span className="font-medium text-editorial-ink">{spec.salaryRange}</span>
                    </div>
                    <RevenueBar value={spec.closenessToRevenue} />
                  </div>

                  <p className="text-[10px] text-editorial-green font-medium flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" /> {spec.bestFor.split(",")[0]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-panel-strong overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-editorial-ink">{active.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="beginner">{active.salaryRange}</Badge>
                      <Badge variant="secondary">{active.demandLevel} demand</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveSlug(null)}>Close</Button>
                </div>

                <p className="text-sm text-editorial-ink/80 leading-relaxed">{active.description}</p>

                {/* Why it matters */}
                <div className="rounded-[14px] bg-editorial-green-soft/60 border border-editorial-green/10 p-4">
                  <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-green mb-2">Why this matters to the business</h4>
                  <p className="text-sm text-editorial-ink/80 leading-relaxed">{active.whyItMatters}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* What you do */}
                  <div className="space-y-2">
                    <h4 className="font-serif font-semibold text-editorial-ink text-sm">What you actually do</h4>
                    <ul className="space-y-1.5">
                      {active.whatYouDo.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-editorial-muted">
                          <div className="h-1 w-1 rounded-full bg-editorial-green mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Day to day */}
                  <div className="space-y-2">
                    <h4 className="font-serif font-semibold text-editorial-ink text-sm">A typical day</h4>
                    {active.dayToDay.map((item) => (
                      <div key={item} className="rounded-[10px] bg-white/50 border border-[rgba(44,49,59,0.06)] px-3 py-2">
                        <p className="text-xs text-editorial-ink/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools + Career path */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-muted mb-2">Tools used</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {active.tools.map((t) => (
                        <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.12em] text-editorial-muted mb-2">Career path</h4>
                    <p className="text-xs text-editorial-ink/80">{active.careerPath[0]}</p>
                  </div>
                </div>

                <RevenueBar value={active.closenessToRevenue} />

                <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                  <p className="text-xs text-editorial-amber"><Star className="h-3 w-3 inline mr-1" /><strong>Best for:</strong> {active.bestFor}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The big picture */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-xl font-serif font-bold text-editorial-ink">
            How the specialisations connect
          </h3>
          <p className="text-sm text-editorial-muted leading-relaxed max-w-3xl">
            No specialisation works alone. Content feeds SEO and social. Performance
            marketing amplifies content. Email retains customers that paid ads acquired.
            Brand makes everything convert better. Product marketing makes the product
            sellable. Growth stitches it all together. AI & martech makes it all scale.
          </p>
          <div className="rounded-[14px] bg-editorial-canvas border border-[rgba(44,49,59,0.08)] p-4">
            <p className="text-xs text-editorial-muted text-center">
              <strong className="text-editorial-ink">The best marketers start as generalists</strong> —
              learning a bit of everything — and then specialise in 1-2 areas where they
              go deep. Start broad, then narrow. The breadth gives you context; the depth
              gives you value.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bottom principle */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Choose the specialisation that matches your curiosity.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            The highest earners aren&apos;t the ones who picked the &quot;best&quot; niche.
            They&apos;re the ones who went deep on something they genuinely found interesting
            — because sustained effort beats talent every time.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
