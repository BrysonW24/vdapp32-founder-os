"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Sprout, BookOpen, Lightbulb, Wrench, FlaskConical, Target,
  Brain, Rocket, BarChart3, Users, Crown, Sparkles,
  ChevronDown, CheckCircle2, Clock, Star, TrendingUp,
  MessageSquare, Palette, Zap, Shield, DollarSign,
} from "lucide-react"

/* ═══════════════════════════════════════════════════
   TIMELINE DATA
═══════════════════════════════════════════════════ */

interface Milestone {
  id: string
  month: string
  duration: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  feeling: string
  whatYouKnow: string[]
  whatYouDo: string[]
  toolsYouUse: string[]
  mindsetShift: string
  proofOfCompetence: string
  aiSkill: string
  commonStuck: string
  howToUnstick: string
}

const MILESTONES: Milestone[] = [
  {
    id: "month-1",
    month: "Month 1",
    duration: "Weeks 1–4",
    title: "The Blank Page",
    subtitle: "Everything is new and nothing makes sense yet",
    icon: Sprout,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    feeling: "Overwhelmed but curious. You don't know what you don't know. Terms like STP, CTR, and ROAS sound like a foreign language. That's completely normal — every marketer started here.",
    whatYouKnow: [
      "Marketing is not just ads — it's the entire system of understanding customers and communicating value",
      "The 4Ps exist (Product, Price, Place, Promotion) and they're the controllable levers",
      "Every business has customers, and understanding them comes before everything else",
      "There's a difference between brand marketing and performance marketing",
    ],
    whatYouDo: [
      "Read through the Foundations modules — absorb, don't memorise",
      "Pick one brand you admire and study everything they do (website, social, emails, ads)",
      "Set up free accounts: Google Analytics demo, Canva, Notion",
      "Write your first customer persona (it will be rough — that's fine)",
    ],
    toolsYouUse: ["Google (research)", "Notion (notes)", "Canva (first designs)", "YouTube (tutorials)"],
    mindsetShift: "Stop thinking 'I need to learn everything.' Start thinking 'I need to understand the shape of the system.' You're building a mental map, not memorising a textbook.",
    proofOfCompetence: "You can explain what marketing is to a friend in 60 seconds without saying 'ads' or 'social media.' You can name the 4Ps and describe what each one means with a real example.",
    aiSkill: "Use ChatGPT or Claude to explain concepts you don't understand. Ask: 'Explain [concept] like I'm starting my first marketing job.' AI is your 24/7 tutor right now.",
    commonStuck: "Feeling like there's too much to learn and you'll never catch up.",
    howToUnstick: "You're not behind — you're at the beginning. Focus on ONE module per week. Depth beats breadth at this stage. Nobody expects you to know everything in month one.",
  },
  {
    id: "month-2",
    month: "Month 2",
    duration: "Weeks 5–8",
    title: "First Proof of Concept",
    subtitle: "You stop reading and start doing — your first real output",
    icon: FlaskConical,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    feeling: "Nervous but excited. You're about to put something real into the world. It won't be perfect. It doesn't need to be. The gap between knowing the theory and doing the work is where growth happens.",
    whatYouKnow: [
      "How to write a basic marketing brief (objective, audience, message, channels, budget)",
      "The difference between organic and paid marketing",
      "What SEO is and why it matters for long-term growth",
      "How email marketing works and why it has the highest ROI",
      "Basic social media strategy — content pillars, platform differences",
    ],
    whatYouDo: [
      "Complete Project 1: Brand Audit — analyse a real brand's marketing",
      "Build a 30-day social media content calendar for a real or fictional brand",
      "Write a 5-email welcome sequence (even if you never send it)",
      "Set up Google Analytics on any website (even a free blog)",
      "Run your first A/B test — even if it's just two Instagram captions",
    ],
    toolsYouUse: ["Canva (content creation)", "Mailchimp or Klaviyo (email)", "Google Analytics 4", "Instagram / LinkedIn (organic posting)"],
    mindsetShift: "Move from 'I'm learning marketing' to 'I'm practising marketing.' The difference is output. Reading about email marketing doesn't count — writing an email sequence does.",
    proofOfCompetence: "You have 3 tangible outputs: a brand audit document, a content calendar, and a welcome email sequence. These are portfolio pieces, even if they're for practice.",
    aiSkill: "Use AI to generate first drafts. Write a prompt like: 'Write 5 subject lines for a welcome email for a sustainable skincare brand targeting 25-35 year old Australian women.' Then edit and refine — AI drafts, you direct.",
    commonStuck: "Your first content feels generic or your email copy sounds like everyone else's.",
    howToUnstick: "That's because you're copying patterns instead of applying your brand insight. Go back to your persona and positioning work. What would YOUR brand say that no competitor would? Specificity beats quality at this stage.",
  },
  {
    id: "month-3",
    month: "Month 3",
    duration: "Weeks 9–12",
    title: "The Toolkit Click",
    subtitle: "Tools stop being confusing and start being useful",
    icon: Wrench,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    feeling: "Growing confidence. You start recognising which tool to reach for in different situations. Google Analytics isn't scary anymore. You know what UTM parameters are. You can navigate Meta Ads Manager without panicking.",
    whatYouKnow: [
      "GA4 navigation: traffic sources, conversion paths, audience reports",
      "How paid ads work: auction system, targeting, bidding, creative testing",
      "The difference between CPC, CPM, CPA, and ROAS — and when each matters",
      "How CRM and email platforms connect to the customer journey",
      "Why frameworks exist — they're thinking tools, not academic exercises",
    ],
    whatYouDo: [
      "Run a real (small budget) paid ad — even $50 on Meta or Google",
      "Set up a Klaviyo or Mailchimp automation flow",
      "Use SEMrush or Ahrefs to research keywords for a topic",
      "Build your first dashboard in Looker Studio or Google Sheets",
      "Complete the Brand Audit and SEO Content Strategy projects",
    ],
    toolsYouUse: ["Meta Ads Manager", "Google Ads", "SEMrush or Ahrefs", "Klaviyo", "Looker Studio"],
    mindsetShift: "Stop asking 'what tool should I use?' Start asking 'what am I trying to achieve, and which tool solves that specific problem?' Tools are means, not ends. A screwdriver is useless if you need to hammer a nail.",
    proofOfCompetence: "You've spent real money on an ad and can explain what happened — even if the ROAS was terrible. You understand WHY it performed the way it did and what you'd change next time.",
    aiSkill: "Use AI to analyse data. Paste a GA4 export into Claude and ask: 'What are the 3 most important insights from this data? What would you investigate next?' AI accelerates analysis — you provide the judgment.",
    commonStuck: "Tool paralysis — there are too many tools and you don't know which to invest time in.",
    howToUnstick: "You only need 5 tools right now: analytics (GA4), email (Klaviyo/Mailchimp), design (Canva), ads (Meta), and notes (Notion). Master these before adding anything else. Breadth of tools is a trap.",
  },
  {
    id: "month-4",
    month: "Month 4",
    duration: "Weeks 13–16",
    title: "Framework Thinking",
    subtitle: "You stop following recipes and start thinking in systems",
    icon: Brain,
    color: "text-[#6d28d9]",
    bg: "bg-[#ede9fe]",
    feeling: "A shift happens. You start seeing marketing as a connected system, not a list of tasks. When someone says 'we need more leads,' you don't immediately think 'run ads.' You think: 'What's the conversion rate? Where's the funnel leaking? Is this an acquisition problem or a retention problem?'",
    whatYouKnow: [
      "SWOT, PESTEL, Porter's Five Forces — and when to use each",
      "The customer journey is not a funnel — it's messy, non-linear, and multi-touch",
      "Why positioning is the most important strategic decision in marketing",
      "How to calculate LTV, CAC, and why LTV:CAC ratio matters",
      "The Binet & Field 60/40 split between brand and performance",
    ],
    whatYouDo: [
      "Complete a full competitive analysis using SimilarWeb and SEMrush",
      "Build a customer journey map with real touchpoints and data",
      "Write a positioning statement that passes the 'competitor test'",
      "Calculate unit economics for a real or hypothetical business",
      "Start the Paid Ad Campaign project with a real budget",
    ],
    toolsYouUse: ["SimilarWeb", "SEMrush", "Google Sheets (financial modelling)", "Figma (journey mapping)", "Claude (strategy synthesis)"],
    mindsetShift: "Move from 'what should I post?' to 'what is the strategy?' Tactics without strategy is noise. Every piece of content, every ad, every email should trace back to a strategic objective.",
    proofOfCompetence: "You can look at a business and diagnose its top 3 marketing problems within an hour. You can explain WHY a framework applies to a specific situation, not just recite what it is.",
    aiSkill: "Use AI as a strategy sparring partner. Prompt: 'I'm positioning [brand] as [positioning]. Play devil's advocate — what are the 3 biggest weaknesses in this position and how might a competitor attack it?' AI stress-tests your thinking.",
    commonStuck: "Knowing the frameworks but not knowing when to apply them. Everything feels theoretical.",
    howToUnstick: "Pick ONE real business and apply EVERY framework to it. Do the full SWOT, PESTEL, Porter's Five Forces, customer journey map, and positioning statement for the same company. The repetition on one case makes the frameworks click.",
  },
  {
    id: "month-5",
    month: "Month 5",
    duration: "Weeks 17–20",
    title: "Resourcefulness",
    subtitle: "You learn to find answers, not wait for them",
    icon: Rocket,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    feeling: "Independent. When you hit a problem, you don't freeze — you research. You know where to find answers: Google documentation, industry blogs, YouTube walkthroughs, AI tools, and community forums. You're becoming self-sufficient.",
    whatYouKnow: [
      "How to diagnose why a campaign underperformed (creative? targeting? landing page? offer?)",
      "When to use Google Ads vs Meta Ads vs SEO vs email — and why",
      "How to read a P&L and explain marketing's contribution to revenue",
      "The difference between correlation and causation in marketing data",
      "How to write a marketing brief that an agency could execute from",
    ],
    whatYouDo: [
      "Run a multi-channel campaign: paid + email + organic working together",
      "Build a marketing dashboard that a CEO would actually look at",
      "Conduct a CRO audit on a real website using Hotjar",
      "Present a campaign report to someone and defend your recommendations",
      "Complete the Analytics Dashboard and CRO Audit projects",
    ],
    toolsYouUse: ["Hotjar (UX analysis)", "Looker Studio (dashboards)", "Slack / Loom (async communication)", "Google Slides (presentations)", "Zapier (basic automation)"],
    mindsetShift: "Stop looking for 'the right answer' and start looking for 'the best available answer with current data.' Marketing is decision-making under uncertainty. Perfectionism is the enemy. A 70% confident decision today beats a 95% confident decision in 3 months.",
    proofOfCompetence: "You can take a marketing problem you've never seen before, research it for 2 hours, and come back with a structured recommendation. You don't need someone to tell you what to do — you figure it out.",
    aiSkill: "Use Google Gemini or Claude to create presentation decks. Prompt: 'Create a 10-slide marketing strategy presentation for [brand]. Include: situation analysis, target audience, positioning, channel strategy, budget allocation, and KPIs. Use data points where possible.' Then refine with real data and your strategic judgment.",
    commonStuck: "Impostor syndrome — you feel like you're 'winging it' and someone will find out.",
    howToUnstick: "Everyone wings it. The difference between a junior and senior marketer isn't certainty — it's the ability to make decisions with incomplete information and learn from the outcome. Document your reasoning, make the call, review the results. That IS the job.",
  },
  {
    id: "month-6",
    month: "Month 6",
    duration: "Weeks 21–24",
    title: "Strategic Operator",
    subtitle: "You don't just run campaigns — you think about the business",
    icon: Target,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    feeling: "Capable. You can hold a conversation with a CMO, understand what a CFO cares about, and explain marketing's value in business terms. You're not an expert — but you're dangerous. You know enough to contribute meaningfully and you know what you don't know.",
    whatYouKnow: [
      "How to build a quarterly marketing plan with OKRs and budget allocation",
      "Why retention is more profitable than acquisition and how to measure it",
      "How attribution works (and why no model is perfect)",
      "The difference between brand equity and brand awareness",
      "How to present marketing results to executives in their language",
    ],
    whatYouDo: [
      "Complete the Capstone: Run Marketing Like a CMO",
      "Build a full go-to-market strategy for a product launch",
      "Create a 12-month marketing plan with phased budget",
      "Present to someone in a leadership role and get real feedback",
      "Write a marketing investment case that a CFO would approve",
    ],
    toolsYouUse: ["All tools from months 1–5 with confidence", "Claude / Gemini (strategy documents)", "Figma (presentations)", "Google Sheets (financial models)", "Notion (knowledge base)"],
    mindsetShift: "Move from 'I'm learning marketing' to 'I'm a marketer.' The difference is identity. You don't need permission to call yourself a marketer. You have outputs, knowledge, and judgment. The learning never stops — but the foundation is built.",
    proofOfCompetence: "Your Capstone project is a 20-30 page marketing plan that covers market analysis, positioning, channel strategy, CRM lifecycle, budget, KPIs, and executive presentations. It's portfolio-ready and demonstrably strategic.",
    aiSkill: "Use AI as a production multiplier. Create an entire campaign brief, ad copy variations, email sequence, landing page wireframe, and measurement plan in a single AI-assisted session. You provide the strategy and judgment — AI provides the first-draft speed. The key: your prompts are now specific, strategic, and backed by evidence. Not 'write me an ad' but 'write 5 Meta ad headlines for [positioning] targeting [persona] with [key benefit], emphasising [proof point], in a [tone] voice. Max 40 characters.'",
    commonStuck: "Not knowing what to do next — the structured curriculum is over.",
    howToUnstick: "Marketing is a practice, not a course. Find a real business to help — a friend's startup, a local shop, a side project, or volunteer for a non-profit. Real constraints (budget, deadlines, stakeholders) teach faster than any course. And keep reading: Marketing Week, Lenny's Newsletter, and the Ehrenberg-Bass Institute's research.",
  },
]

const BEYOND: { month: string; title: string; desc: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { month: "Month 9", title: "Specialist Depth", desc: "You've picked a lane — performance, content, brand, or product marketing — and you're going deep. You can hold your own against people with 3+ years of experience in that area because you've combined structured learning with intense practice.", icon: Star, color: "text-editorial-amber" },
  { month: "Year 1", title: "T-Shaped Marketer", desc: "Broad knowledge across all channels, deep expertise in 1-2. You can lead a campaign end-to-end, manage a small budget, and present results to stakeholders without hand-holding. You're hireable at any startup or agency.", icon: TrendingUp, color: "text-editorial-green" },
  { month: "Year 2", title: "Strategic Contributor", desc: "You're not just executing — you're influencing strategy. You can diagnose business problems through a marketing lens, propose solutions backed by data, and manage a team or agency. You think in systems and speak in revenue.", icon: Crown, color: "text-[#6d28d9]" },
]

/* ═══════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════ */

export default function TimelinePage() {
  const [expanded, setExpanded] = useState<string | null>("month-1")

  return (
    <div className="container py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">
          Your Learning Journey
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          How Long Does It Take to Get Good?
        </h1>
        <p className="text-editorial-muted mt-4 text-base leading-relaxed max-w-2xl">
          Six months of focused practice — 15 to 20 hours per week — takes you from
          &quot;what is marketing?&quot; to &quot;here is my strategic plan backed by data.&quot;
          This timeline shows what that journey actually looks like, month by month.
          The messy middle, the breakthroughs, and the proof points along the way.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-editorial-muted">
        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> ~15-20 hrs/week</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-editorial-green" /> Proof of competence at each stage</span>
        <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-editorial-amber" /> AI skill progression included</span>
      </div>

      {/* Visual timeline line + milestones */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-px bg-[rgba(44,49,59,0.1)]" />

        <div className="space-y-4">
          {MILESTONES.map((m, i) => {
            const Icon = m.icon
            const isExpanded = expanded === m.id

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative pl-14 sm:pl-20"
              >
                {/* Node on timeline */}
                <div
                  className={cn(
                    "absolute left-2.5 sm:left-5.5 top-5 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border-2 border-white shadow-sm z-10",
                    m.bg
                  )}
                >
                  <Icon className={cn("h-2.5 w-2.5 sm:h-3 sm:w-3", m.color)} />
                </div>

                {/* Card */}
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    isExpanded ? "ring-2 ring-editorial-green/40 shadow-editorial" : "hover:-translate-y-[1px] hover:shadow-editorial-hover"
                  )}
                  onClick={() => setExpanded(isExpanded ? null : m.id)}
                >
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn("border-transparent text-[10px]", m.bg, m.color)}>{m.month}</Badge>
                          <span className="text-[10px] text-editorial-muted">{m.duration}</span>
                        </div>
                        <h3 className="font-serif font-bold text-editorial-ink text-lg">{m.title}</h3>
                        <p className="text-sm text-editorial-muted mt-0.5">{m.subtitle}</p>
                      </div>
                      <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="h-4 w-4 text-editorial-muted shrink-0 mt-2" />
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-5 pt-5 border-t border-[rgba(44,49,59,0.06)] mt-4">
                            {/* How it feels */}
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-muted mb-1.5">How it feels</p>
                              <p className="text-sm text-editorial-muted leading-relaxed italic">{m.feeling}</p>
                            </div>

                            {/* What you know */}
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-green mb-2 flex items-center gap-1.5">
                                <BookOpen className="h-3 w-3" /> What you know by now
                              </p>
                              <ul className="space-y-1.5">
                                {m.whatYouKnow.map((item, j) => (
                                  <li key={j} className="flex items-start gap-2 text-sm text-editorial-muted">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-editorial-green mt-0.5 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* What you do */}
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-blue mb-2 flex items-center gap-1.5">
                                <Zap className="h-3 w-3" /> What you actually do
                              </p>
                              <ul className="space-y-1.5">
                                {m.whatYouDo.map((item, j) => (
                                  <li key={j} className="flex items-start gap-2 text-sm text-editorial-muted">
                                    <span className="text-editorial-blue font-mono text-xs mt-0.5 shrink-0">{String(j + 1).padStart(2, "0")}</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Tools */}
                            <div>
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-amber mb-2 flex items-center gap-1.5">
                                <Wrench className="h-3 w-3" /> Tools you&apos;re using
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {m.toolsYouUse.map((tool) => (
                                  <Badge key={tool} variant="outline" className="text-[10px]">{tool}</Badge>
                                ))}
                              </div>
                            </div>

                            {/* Mindset shift */}
                            <div className="rounded-[14px] bg-[#ede9fe]/60 border border-[#6d28d9]/10 p-4">
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#6d28d9] mb-1.5 flex items-center gap-1.5">
                                <Brain className="h-3 w-3" /> Mindset shift
                              </p>
                              <p className="text-sm text-editorial-ink/80 leading-relaxed">{m.mindsetShift}</p>
                            </div>

                            {/* AI skill */}
                            <div className="rounded-[14px] bg-editorial-green-soft/60 border border-editorial-green/10 p-4">
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-green mb-1.5 flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3" /> AI skill at this stage
                              </p>
                              <p className="text-sm text-editorial-ink/80 leading-relaxed">{m.aiSkill}</p>
                            </div>

                            {/* Proof of competence */}
                            <div className="rounded-[14px] bg-editorial-amber-soft/60 border border-editorial-amber/10 p-4">
                              <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-amber mb-1.5 flex items-center gap-1.5">
                                <Shield className="h-3 w-3" /> Proof of competence
                              </p>
                              <p className="text-sm text-editorial-ink/80 leading-relaxed">{m.proofOfCompetence}</p>
                            </div>

                            {/* Common stuck point */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="rounded-[14px] bg-editorial-red-soft/40 border border-editorial-red/10 p-3">
                                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-editorial-red mb-1">Where people get stuck</p>
                                <p className="text-xs text-editorial-ink/80">{m.commonStuck}</p>
                              </div>
                              <div className="rounded-[14px] bg-editorial-blue-soft/40 border border-editorial-blue/10 p-3">
                                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-editorial-blue mb-1">How to unstick</p>
                                <p className="text-xs text-editorial-ink/80">{m.howToUnstick}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}

          {/* Beyond 6 months */}
          <div className="relative pl-14 sm:pl-20 pt-4">
            <div className="absolute left-2.5 sm:left-5.5 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-editorial-canvas border-2 border-white shadow-sm z-10">
              <TrendingUp className="h-3 w-3 text-editorial-muted" />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-editorial-ink">Beyond the first 6 months</h3>
              <p className="text-sm text-editorial-muted leading-relaxed max-w-2xl">
                The structured learning phase is over, but the growth compounds. Here&apos;s what the next 18 months look like for someone who keeps practising.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BEYOND.map((b) => {
                  const BIcon = b.icon
                  return (
                    <Card key={b.month} className="hover:-translate-y-[1px] hover:shadow-editorial-hover transition-all duration-200">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <BIcon className={cn("h-4 w-4", b.color)} />
                          <Badge variant="outline" className="text-[10px]">{b.month}</Badge>
                        </div>
                        <h4 className="font-serif font-semibold text-editorial-ink text-sm">{b.title}</h4>
                        <p className="text-xs text-editorial-muted leading-relaxed">{b.desc}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing */}
      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-3">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            The timeline is real. The effort is yours.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto leading-relaxed">
            Six months of focused work — not passive watching, but active doing — will
            put you ahead of most marketing graduates. The difference is practice, not theory.
            Start with Month 1. Do the work. The competence follows.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
