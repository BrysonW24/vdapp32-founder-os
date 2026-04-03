"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Zap,
  ArrowRight,
  Mail,
  ShoppingCart,
  UserPlus,
  BarChart3,
  MessageSquare,
  Clock,
  DollarSign,
  TrendingUp,
  Repeat,
  Target,
  Eye,
  AlertTriangle,
  Building2,
  Users,
  Store,
  Laptop,
  CheckCircle2,
  XCircle,
  Workflow,
  Bot,
  Database,
  Globe,
  Megaphone,
  HeartHandshake,
  Shield,
  Lightbulb,
  Layers,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Data ────────────────────────────────────────────────────────────── */

const WHAT_IT_IS = [
  {
    title: "Trigger",
    description: "Something happens — a customer signs up, abandons a cart, clicks a link, or reaches a date milestone.",
    icon: Zap,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
  },
  {
    title: "Condition",
    description: "The system checks rules — is this a first-time buyer? Have they been inactive for 30 days? Are they in segment X?",
    icon: Target,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
  },
  {
    title: "Action",
    description: "The system does something — sends an email, tags a contact, updates a CRM field, notifies a team member, or starts another workflow.",
    icon: ArrowRight,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
  },
]

const WHY_BUILT = [
  { icon: Clock, label: "Save time", detail: "Automated emails run 24/7 without anyone pressing send. A 5-email welcome sequence that takes 4 hours to build runs for years." },
  { icon: DollarSign, label: "Increase revenue", detail: "Abandoned cart emails recover 5-15% of lost sales. Upsell flows increase average order value by 10-30%." },
  { icon: Repeat, label: "Stay consistent", detail: "Every customer gets the same quality experience, whether it's their first day or their hundredth. No balls dropped." },
  { icon: TrendingUp, label: "Scale without headcount", detail: "A team of 2 can deliver personalised experiences to 50,000 customers. Without automation, you'd need 20 people." },
  { icon: Eye, label: "Never miss a signal", detail: "Automations catch things humans miss — a lead who visits pricing 3 times, a customer going cold, a spike in support tickets." },
  { icon: HeartHandshake, label: "Build relationships", detail: "Timely, relevant communication builds trust. A birthday email or a re-engagement nudge shows customers you're paying attention." },
]

const WHERE_IMPLEMENTED = [
  {
    area: "Email & SMS",
    icon: Mail,
    examples: ["Welcome sequences", "Abandoned cart recovery", "Post-purchase follow-ups", "Re-engagement campaigns", "Birthday/anniversary emails", "Win-back sequences"],
    tools: ["Klaviyo", "Mailchimp", "HubSpot", "ConvertKit"],
    businessImpact: "Email automations generate $38 for every $1 spent on average. They're the highest-ROI marketing channel.",
  },
  {
    area: "CRM & Sales",
    icon: UserPlus,
    examples: ["Lead scoring and routing", "Deal stage progression", "Task creation for sales reps", "Automatic contact enrichment", "Pipeline notifications", "Contract renewal reminders"],
    tools: ["HubSpot", "Salesforce", "Pipedrive"],
    businessImpact: "Automated lead routing reduces response time from hours to minutes. Speed-to-lead directly correlates with conversion rates.",
  },
  {
    area: "Social Media",
    icon: Megaphone,
    examples: ["Scheduled posting across platforms", "Auto-responses to DMs", "Content recycling workflows", "Engagement monitoring alerts", "UGC collection and approval"],
    tools: ["Hootsuite", "Buffer", "Later", "Sprout Social"],
    businessImpact: "Scheduling saves 6+ hours per week. Consistent posting increases follower growth by 2-3x.",
  },
  {
    area: "Advertising",
    icon: Globe,
    examples: ["Automated bid adjustments", "Dynamic retargeting audiences", "Budget pacing rules", "Performance alert thresholds", "Creative rotation rules", "Lookalike audience refreshes"],
    tools: ["Google Ads", "Meta Ads", "TikTok Ads"],
    businessImpact: "Smart bidding outperforms manual bidding by 15-30% on average. Retargeting automations recover lost traffic.",
  },
  {
    area: "Analytics & Reporting",
    icon: BarChart3,
    examples: ["Scheduled dashboard distribution", "Anomaly detection alerts", "Weekly performance summaries", "Custom metric calculations", "Cross-channel attribution", "Goal tracking notifications"],
    tools: ["Google Analytics", "Looker Studio", "Mixpanel"],
    businessImpact: "Automated reporting saves 4-8 hours per week and ensures leadership always has current data.",
  },
  {
    area: "Customer Support",
    icon: MessageSquare,
    examples: ["Chatbot first-response", "Ticket routing and tagging", "FAQ auto-responses", "Satisfaction survey triggers", "Escalation rules", "SLA monitoring"],
    tools: ["Intercom", "Zendesk", "HubSpot Service Hub"],
    businessImpact: "Chatbots handle 40-80% of routine queries. Automated routing reduces resolution time by 50%.",
  },
  {
    area: "Workflow & Operations",
    icon: Workflow,
    examples: ["Cross-tool data sync", "New employee onboarding tasks", "Campaign approval workflows", "Asset version control", "Inventory alerts", "Invoice generation"],
    tools: ["Zapier", "Make", "n8n", "Power Automate"],
    businessImpact: "Connecting your tools eliminates manual data entry. A single Zapier workflow can save 10+ hours per month.",
  },
  {
    area: "Content & SEO",
    icon: Database,
    examples: ["Content publishing workflows", "Internal linking suggestions", "Rank tracking alerts", "Content decay monitoring", "Broken link detection", "Schema markup generation"],
    tools: ["Ahrefs", "SEMrush", "WordPress", "Webflow"],
    businessImpact: "Content decay alerts prevent organic traffic loss. Automated publishing keeps your content calendar on track.",
  },
]

const REAL_EXAMPLES = [
  {
    company: "Airbnb",
    type: "Email Automation",
    description: "When a guest searches but doesn't book, Airbnb triggers a personalised email sequence showing similar listings in the same area, with social proof ('This place was booked 12 times this week'). The automation adjusts based on price sensitivity, travel dates, and previous browsing behaviour.",
    result: "Estimated 10-15% of bookings are influenced by automated email sequences.",
    lesson: "Personalisation at scale — the automation uses behavioural data to feel hand-written.",
  },
  {
    company: "Spotify",
    type: "Lifecycle Automation",
    description: "Spotify's 'Discover Weekly' is an automated playlist generated every Monday based on listening history, collaborative filtering, and audio analysis. The 'Wrapped' campaign is an automated year-end data story personalised to each of their 600M+ users.",
    result: "Discover Weekly drives 40% of all new artist discoveries on the platform.",
    lesson: "The best automations feel like a product feature, not marketing.",
  },
  {
    company: "Dollar Shave Club",
    type: "Abandoned Cart + Retention",
    description: "Their subscription model triggers a multi-touch sequence when a cart is abandoned: email at 1 hour (reminder), 24 hours (social proof), 72 hours (10% discount). For active subscribers, they automate reorder reminders, cross-sell suggestions, and churn-risk interventions based on order frequency changes.",
    result: "Cart recovery emails convert at 8-12%. Churn prevention automations reduced cancellations by 20%.",
    lesson: "Layered automations — different messages at different times create a conversation, not a nag.",
  },
  {
    company: "HubSpot",
    type: "Lead Scoring + Nurture",
    description: "HubSpot assigns scores to leads based on behaviour (downloaded ebook = +10, visited pricing = +25, attended webinar = +15). When a lead crosses a threshold, they're automatically routed to sales with a context summary. Below threshold, they enter a nurture sequence of educational content.",
    result: "Sales reps focus on the top 20% of leads and close at 3x the rate of unscored leads.",
    lesson: "Automation bridges the gap between marketing and sales — it doesn't replace either team.",
  },
  {
    company: "Canva",
    type: "Product-Led Growth Automation",
    description: "When a free user creates their first design, Canva triggers an onboarding flow: tips for their specific use case, template suggestions, and a prompt to try Pro features. If they share a design, the recipient gets a personalised invitation to try Canva. Every viral loop is automated.",
    result: "Canva's freemium-to-paid conversion is driven primarily by automated in-product experiences.",
    lesson: "The strongest automations are invisible — they feel like the product just understands you.",
  },
  {
    company: "Small E-commerce Store (Example)",
    type: "Full Lifecycle Stack",
    description: "A small Shopify store running: (1) Welcome email on signup with 10% off, (2) Abandoned cart 3-email sequence, (3) Post-purchase thank you + review request at day 7, (4) Cross-sell recommendation at day 14, (5) Win-back sequence if no purchase in 60 days. Total setup: 1 day. Runs forever.",
    result: "Adds 15-25% revenue lift on top of baseline sales with zero ongoing effort.",
    lesson: "You don't need to be a big company. A solo marketer with Klaviyo can build this in a day.",
  },
]

const HOW_TO_BUILD = [
  {
    step: 1,
    title: "Map the customer journey",
    description: "Before you touch any tool, draw the journey your customer takes — from first hearing about you to becoming a repeat buyer. Mark every moment where they might need a nudge, a reminder, or information.",
    tip: "Use sticky notes or a whiteboard. Think in terms of: What just happened? What do they need next? What could go wrong?",
  },
  {
    step: 2,
    title: "Identify the highest-value trigger points",
    description: "Not every moment needs an automation. Start with the moments that have the biggest revenue or retention impact: cart abandonment, first purchase, going inactive, subscription renewal.",
    tip: "If you could only build 3 automations, which would move the needle most? Start there.",
  },
  {
    step: 3,
    title: "Choose your trigger → condition → action",
    description: "For each automation, define: What event triggers it? What conditions must be true? What action should the system take? Write this in plain English first.",
    tip: "Example: When [cart abandoned for 1 hour] AND [cart value > $50] AND [not already a customer] → Send [abandoned cart email #1].",
  },
  {
    step: 4,
    title: "Write the content",
    description: "Draft the actual emails, SMS messages, notifications, or alerts. Keep it human — people can tell when they're getting a robot email. Personalise with merge tags ({first_name}, {product_name}, {cart_value}).",
    tip: "Write like you're texting a friend who asked for advice, not like you're writing a corporate memo.",
  },
  {
    step: 5,
    title: "Build in your tool",
    description: "Use your chosen platform's visual workflow builder (Klaviyo, HubSpot, Mailchimp, Zapier) to create the flow. Connect the trigger, set the conditions, add time delays between actions, and link your content.",
    tip: "Start with the simplest version. You can add branches and conditions later once you see how it performs.",
  },
  {
    step: 6,
    title: "Test before you launch",
    description: "Send test versions to yourself. Walk through the flow as a customer. Check: Does the trigger fire? Do the conditions work? Is the content right? Do the links work? Is the timing reasonable?",
    tip: "Create a test contact and trigger each automation manually. Check every email, every delay, every condition.",
  },
  {
    step: 7,
    title: "Monitor and iterate",
    description: "After launch, watch the metrics: open rates, click rates, conversion rates, unsubscribe rates. Look for drop-off points. A/B test subject lines and content. Refine timing.",
    tip: "The first version is never perfect. Plan to review every automation monthly for the first quarter, then quarterly after that.",
  },
]

const BUSINESS_OPS_CONNECTIONS = [
  {
    department: "Sales",
    icon: DollarSign,
    connection: "Marketing automations generate and qualify leads before they reach sales. Lead scoring ensures reps only spend time on high-intent prospects. Automated handoff includes context: what content they downloaded, what pages they visited, what emails they opened.",
    outcome: "Sales close faster because they start conversations with context, not cold.",
  },
  {
    department: "Customer Success",
    icon: HeartHandshake,
    connection: "Post-purchase automations handle onboarding, education, and check-ins. Churn risk signals trigger proactive outreach. NPS surveys are sent automatically at key milestones.",
    outcome: "Support teams focus on complex issues while automations handle routine touchpoints.",
  },
  {
    department: "Product",
    icon: Layers,
    connection: "Automated user behaviour tracking feeds product decisions. Feature adoption data identifies what's working. In-app messaging guides users to value faster.",
    outcome: "Product teams build what users actually need, not what they guess.",
  },
  {
    department: "Finance",
    icon: BarChart3,
    connection: "Automated reporting ties marketing spend to revenue. Attribution models show which channels drive profitable customers. Budget pacing alerts prevent overspend.",
    outcome: "Finance gets clear ROI data. Marketing gets budget justified.",
  },
  {
    department: "Operations",
    icon: Workflow,
    connection: "Cross-tool automations eliminate manual data entry between CRM, email, analytics, and billing. Inventory alerts trigger marketing campaigns. Order status updates run automatically.",
    outcome: "Fewer errors, less busywork, faster execution across the entire business.",
  },
  {
    department: "Leadership",
    icon: Building2,
    connection: "Automated dashboards and weekly summaries give executives real-time visibility into marketing performance. Anomaly alerts surface issues before they become crises.",
    outcome: "Leaders make faster, data-informed decisions without waiting for manual reports.",
  },
]

const MATURITY_LEVELS = [
  {
    level: 1,
    name: "Manual",
    description: "Everything is done by hand. Emails sent one by one. Data copied between spreadsheets. No triggers, no workflows.",
    typical: "Startup with 1 person doing marketing part-time.",
    nextStep: "Set up a welcome email automation and an abandoned cart sequence.",
  },
  {
    level: 2,
    name: "Basic Automation",
    description: "A few key automations running: welcome sequence, abandoned cart, basic lead capture. Maybe social scheduling. Still lots of manual work.",
    typical: "Small business with a solo marketer or small team.",
    nextStep: "Add post-purchase flows, lead scoring, and connect your CRM to your email platform.",
  },
  {
    level: 3,
    name: "Integrated",
    description: "Multiple automations across channels, connected through a CRM. Lead scoring, lifecycle emails, retargeting audiences synced. Reporting partially automated.",
    typical: "Growing business with a marketing team of 3-5.",
    nextStep: "Add advanced segmentation, predictive analytics, and cross-channel orchestration.",
  },
  {
    level: 4,
    name: "Orchestrated",
    description: "Full-lifecycle automation with AI-powered personalisation. Predictive lead scoring, dynamic content, automated attribution, real-time decisioning. Marketing operates as a system.",
    typical: "Mature marketing team at a medium-to-large company.",
    nextStep: "Continuously optimise. Focus on incrementality testing and automation governance.",
  },
]

type TabId = "what" | "why" | "where" | "how" | "operations" | "examples" | "maturity"

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "what", label: "What It Is", icon: Lightbulb },
  { id: "why", label: "Why It Matters", icon: TrendingUp },
  { id: "where", label: "Where It Lives", icon: Globe },
  { id: "how", label: "How to Build", icon: Workflow },
  { id: "operations", label: "Business Ops", icon: Building2 },
  { id: "examples", label: "Real Examples", icon: Eye },
  { id: "maturity", label: "Maturity Model", icon: Layers },
]

/* ─── Fade helper ─────────────────────────────────────────────────── */
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35 },
}

/* ─── Page ────────────────────────────────────────────────────────── */

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("what")

  return (
    <div className="container py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Deep Dive
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          Automations in Marketing
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Marketing automation is how modern businesses deliver the right message
          to the right person at the right time — without doing it manually every
          single time. It connects marketing to every part of the business.
        </p>
      </div>

      {/* Tab bar — pill nav style from vd-os-dashboard */}
      <div className="sticky top-[80px] z-40 flex flex-wrap gap-2 p-2.5 rounded-[18px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.78)] backdrop-blur-[16px] shadow-editorial-soft">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm transition-all duration-200 border",
                activeTab === tab.id
                  ? "text-editorial-ink bg-white/96 border-[rgba(44,49,59,0.15)] shadow-sm"
                  : "text-editorial-muted bg-white/40 border-[rgba(44,49,59,0.06)] hover:bg-white/60 hover:text-editorial-ink"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {/* ─── WHAT IT IS ─── */}
        {activeTab === "what" && (
          <motion.div key="what" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                What is marketing automation?
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Marketing automation uses software to perform marketing tasks automatically,
                based on triggers and rules you define. Instead of manually sending every
                email, updating every spreadsheet, and monitoring every campaign, you build
                systems that do it for you. Every automation follows three steps:
              </p>
            </div>

            {/* Trigger → Condition → Action visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {WHAT_IT_IS.map((item, i) => (
                <Card key={item.title} className="relative overflow-hidden">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", item.bg)}>
                        <item.icon className={cn("h-5 w-5", item.color)} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-editorial-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-serif font-semibold text-editorial-ink">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{item.description}</p>
                    {i < 2 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="h-5 w-5 text-editorial-muted/30" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Simple example walkthrough */}
            <Card className="glass-panel-strong">
              <CardContent className="p-6">
                <h3 className="font-serif font-semibold text-editorial-ink mb-4">
                  Example: Abandoned Cart Recovery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  {[
                    { time: "0 min", event: "Customer adds item to cart and leaves the site", type: "Trigger" },
                    { time: "1 hour", event: "System sends email: 'You left something behind' with product image and link back", type: "Action" },
                    { time: "24 hours", event: "If no purchase: send email with social proof: '432 people bought this today'", type: "Action" },
                    { time: "72 hours", event: "If still no purchase: send final email with 10% off discount code", type: "Action" },
                  ].map((step, i) => (
                    <div key={i} className="space-y-1.5">
                      <Badge variant="secondary" className="text-[10px] font-mono">{step.time}</Badge>
                      <p className="text-editorial-ink/80">{step.event}</p>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted">{step.type}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-editorial-green mt-4 font-medium">
                  Result: Recovers 5-15% of abandoned carts. On a store doing $100K/month, that&apos;s $5,000-$15,000 in recovered revenue — automatically.
                </p>
              </CardContent>
            </Card>

            {/* What automation is NOT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-serif font-semibold text-editorial-green flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> What automation IS
                  </h3>
                  <ul className="space-y-2 text-sm text-editorial-ink/80">
                    <li>A system that runs the right process at the right time</li>
                    <li>A way to scale personalised communication</li>
                    <li>A tool that frees humans for strategy and creativity</li>
                    <li>A method to ensure consistency across touchpoints</li>
                    <li>A competitive advantage for small teams competing with big ones</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 space-y-3">
                  <h3 className="font-serif font-semibold text-editorial-red flex items-center gap-2">
                    <XCircle className="h-4 w-4" /> What automation is NOT
                  </h3>
                  <ul className="space-y-2 text-sm text-editorial-ink/80">
                    <li>A replacement for understanding your customer</li>
                    <li>An excuse to spam people with more messages</li>
                    <li>A set-it-and-forget-it system (it needs monitoring)</li>
                    <li>A substitute for good marketing strategy</li>
                    <li>Something only big companies can afford (most tools have free tiers)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ─── WHY IT MATTERS ─── */}
        {activeTab === "why" && (
          <motion.div key="why" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                Why businesses build automations
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Automation isn&apos;t about removing humans — it&apos;s about removing repetitive tasks
                so humans can focus on what actually requires thinking, creativity, and judgment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_BUILT.map((item) => (
                <Card key={item.label} className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                        <item.icon className="h-4 w-4 text-editorial-green" />
                      </div>
                      <h3 className="font-serif font-semibold text-editorial-ink">{item.label}</h3>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ROI callout */}
            <Card className="glass-panel-strong">
              <CardContent className="p-6 text-center space-y-3">
                <p className="text-4xl font-serif font-bold text-editorial-green">451%</p>
                <p className="text-sm text-editorial-muted max-w-md mx-auto">
                  Average ROI for companies using marketing automation. Businesses with
                  mature automation generate 2x the leads at 33% lower cost per lead.
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">Source: Annuitas Group / Nucleus Research</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── WHERE IT LIVES ─── */}
        {activeTab === "where" && (
          <motion.div key="where" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                Where automations are implemented
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Automation touches every channel in the marketing mix. Here&apos;s where it
                lives, what it does, and which tools power it.
              </p>
            </div>

            <div className="space-y-4">
              {WHERE_IMPLEMENTED.map((area) => (
                <Card key={area.area}>
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                      <div className="flex items-center gap-3 lg:w-48 shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-green-soft">
                          <area.icon className="h-5 w-5 text-editorial-green" />
                        </div>
                        <h3 className="font-serif font-semibold text-editorial-ink">{area.area}</h3>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {area.examples.map((ex) => (
                            <Badge key={ex} variant="secondary" className="text-[10px]">{ex}</Badge>
                          ))}
                        </div>
                        <p className="text-sm text-editorial-green font-medium">{area.businessImpact}</p>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">Tools:</span>
                          {area.tools.map((tool) => (
                            <Badge key={tool} variant="outline" className="text-[10px]">{tool}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── HOW TO BUILD ─── */}
        {activeTab === "how" && (
          <motion.div key="how" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                How to build a marketing automation
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Follow these 7 steps. You don&apos;t need to be technical — modern tools
                use visual drag-and-drop builders. The hard part is the thinking, not
                the clicking.
              </p>
            </div>

            <div className="space-y-4">
              {HOW_TO_BUILD.map((step) => (
                <Card key={step.step}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-editorial-green text-white text-sm font-bold font-serif">
                        {step.step}
                      </span>
                      <div className="space-y-2">
                        <h3 className="font-serif font-semibold text-editorial-ink">{step.title}</h3>
                        <p className="text-sm text-editorial-muted leading-relaxed">{step.description}</p>
                        <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                          <p className="text-xs text-editorial-amber"><strong>Tip:</strong> {step.tip}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── BUSINESS OPS ─── */}
        {activeTab === "operations" && (
          <motion.div key="ops" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                How automation connects to business operations
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Marketing automation doesn&apos;t operate in a silo. It touches sales,
                support, product, finance, and leadership. When built well, it becomes
                the nervous system of the business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BUSINESS_OPS_CONNECTIONS.map((dept) => (
                <Card key={dept.department} className="hover:-translate-y-[2px] hover:shadow-editorial-hover transition-all duration-200">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-editorial-blue-soft">
                        <dept.icon className="h-4 w-4 text-editorial-blue" />
                      </div>
                      <h3 className="font-serif font-semibold text-editorial-ink">{dept.department}</h3>
                    </div>
                    <p className="text-sm text-editorial-muted leading-relaxed">{dept.connection}</p>
                    <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                      <p className="text-xs text-editorial-green font-medium">{dept.outcome}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* The nervous system metaphor */}
            <Card className="glass-panel-strong">
              <CardContent className="p-6 text-center space-y-2">
                <h3 className="font-serif font-semibold text-editorial-ink text-lg">
                  Think of automation as the nervous system
                </h3>
                <p className="text-sm text-editorial-muted max-w-xl mx-auto leading-relaxed">
                  Just like your nervous system automatically handles breathing, blinking,
                  and reflexes so your brain can focus on thinking — marketing automation
                  handles routine operations so your team can focus on strategy, creativity,
                  and relationships.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── REAL EXAMPLES ─── */}
        {activeTab === "examples" && (
          <motion.div key="examples" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                Real-world automation examples
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                These are automations running at real companies right now. Study
                the pattern, not just the tool — the principles work at any scale.
              </p>
            </div>

            <div className="space-y-4">
              {REAL_EXAMPLES.map((ex) => (
                <Card key={ex.company}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif font-semibold text-editorial-ink text-lg">{ex.company}</h3>
                        <Badge variant="secondary" className="text-[10px] mt-1">{ex.type}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-editorial-ink/80 leading-relaxed">{ex.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-[12px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-1">Result</p>
                        <p className="text-xs text-editorial-ink/80">{ex.result}</p>
                      </div>
                      <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-amber mb-1">Lesson</p>
                        <p className="text-xs text-editorial-ink/80">{ex.lesson}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── MATURITY MODEL ─── */}
        {activeTab === "maturity" && (
          <motion.div key="maturity" {...fadeIn} className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-serif font-bold text-editorial-ink">
                Automation maturity model
              </h2>
              <p className="text-editorial-muted mt-3 leading-relaxed">
                Every business is somewhere on this ladder. Understanding where you
                are helps you know what to build next — without overbuilding.
              </p>
            </div>

            {/* Visual maturity ladder */}
            <div className="relative">
              <div className="absolute left-[23px] top-4 bottom-4 w-px bg-[rgba(44,49,59,0.1)]" />
              <div className="space-y-4">
                {MATURITY_LEVELS.map((level) => (
                  <div key={level.level} className="relative pl-12">
                    <div className="absolute left-3 top-5 h-5 w-5 rounded-full bg-editorial-green flex items-center justify-center z-10">
                      <span className="text-white text-[10px] font-bold">{level.level}</span>
                    </div>
                    <Card>
                      <CardContent className="p-5 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-serif font-semibold text-editorial-ink">
                            Level {level.level}: {level.name}
                          </h3>
                        </div>
                        <p className="text-sm text-editorial-muted leading-relaxed">{level.description}</p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-1">
                          <div className="rounded-[10px] bg-editorial-blue-soft/60 border border-editorial-blue/10 px-3 py-1.5">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-blue mb-0.5">Typical</p>
                            <p className="text-xs text-editorial-ink/80">{level.typical}</p>
                          </div>
                          <div className="rounded-[10px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-1.5">
                            <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-green mb-0.5">Next step</p>
                            <p className="text-xs text-editorial-ink/80">{level.nextStep}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom principle */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Automation multiplies your strategy. It doesn&apos;t replace it.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            Bad strategy automated just means you fail faster. Good strategy automated
            means you win at scale. Always start with the thinking.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
