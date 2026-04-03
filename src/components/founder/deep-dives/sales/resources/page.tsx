"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  BookOpen,
  Globe,
  User,
  Building,
  Palette,
  FileText,
  Radio,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ResourceCategory = {
  slug: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  items: { name: string; description: string; type: string; url?: string }[]
}

const CATEGORIES: ResourceCategory[] = [
  {
    slug: "courses",
    label: "Courses & Certifications",
    icon: GraduationCap,
    items: [
      { name: "Snowflake Sales Credential", description: "Product-specific credibility for data cloud and analytics selling. Strong fit if you want the academy to mirror modern technical SaaS AE expectations.", type: "Vendor credential" },
      { name: "CrowdStrike University / Falcon Training", description: "Useful reference for security-platform selling and the level of product fluency expected in cybersecurity account executive roles.", type: "Vendor credential" },
      { name: "AWS Cloud Practitioner", description: "A strong first cloud certification for sellers who need enough technical context to speak credibly with data, platform, and IT stakeholders.", type: "Foundation cert" },
      { name: "Azure Fundamentals (AZ-900)", description: "Helpful for sellers working in Microsoft-heavy buying environments or selling into cloud transformation conversations.", type: "Foundation cert" },
      { name: "CompTIA Security+", description: "A practical baseline for security concepts, compliance language, and common buyer concerns in cybersecurity or regulated-industry selling.", type: "Foundation cert" },
      { name: "Salesforce Trailhead", description: "Free training on Salesforce CRM, forecast hygiene, opportunity management, and the operating discipline every AE needs.", type: "Free certification" },
      { name: "MEDDIC / MEDDPICC Academy", description: "Qualification training used by many enterprise SaaS teams that need stronger deal inspection, forecast confidence, and stakeholder mapping.", type: "Paid" },
      { name: "Challenger or Sandler Training", description: "Excellent for sharpening discovery, commercial teaching, objection handling, and negotiation under pressure.", type: "Paid" },
    ],
  },
  {
    slug: "blogs",
    label: "Blogs & Research",
    icon: Globe,
    items: [
      { name: "Gong Labs", description: "Data-driven sales research from millions of real sales conversations. What top performers do differently on calls, in emails, and in negotiations.", type: "Blog + Research" },
      { name: "Sales Hacker", description: "Tactical articles on prospecting, closing, sales ops, and leadership. Community-driven content from practitioners, not theorists.", type: "Blog + Community" },
      { name: "SaaStr Blog", description: "Jason Lemkin's blog on SaaS sales and go-to-market strategy. Essential reading for anyone selling software.", type: "Blog" },
      { name: "Bravado Sales Community", description: "Anonymous, verified community of sales professionals sharing real comp data, interview insights, and career advice.", type: "Community" },
      { name: "The Sales Blog (Anthony Iannarino)", description: "Daily practical writing on consultative selling, prospecting, and sales leadership from a veteran practitioner.", type: "Blog" },
      { name: "Jill Konrath Newsletter", description: "Strategic insights on selling to busy decision-makers. Her agile selling methodology is used by enterprise teams globally.", type: "Newsletter" },
    ],
  },
  {
    slug: "books",
    label: "Essential Books",
    icon: BookOpen,
    items: [
      { name: "SPIN Selling — Neil Rackham", description: "The original research-backed sales methodology. Situation, Problem, Implication, Need-payoff. Based on studying 35,000 sales calls. Still the gold standard.", type: "Must-read" },
      { name: "The Challenger Sale — Dixon & Adamson", description: "Research showing that top performers teach, tailor, and take control. Challenges the 'relationship selling' orthodoxy with data.", type: "Must-read" },
      { name: "New Sales. Simplified. — Mike Weinberg", description: "One of the clearest books on building pipeline through disciplined prospecting, account targeting, and direct outreach.", type: "Practical" },
      { name: "Gap Selling — Keenan", description: "Modern sales methodology focused on identifying the gap between where a prospect is and where they want to be. Practical and punchy.", type: "Must-read" },
      { name: "Influence — Robert Cialdini", description: "The psychology of persuasion. Six principles (reciprocity, commitment, social proof, authority, liking, scarcity) that underpin all selling.", type: "Classic" },
      { name: "Never Split the Difference — Chris Voss", description: "FBI hostage negotiator's guide to negotiation. Tactical empathy, mirroring, and labelling techniques that work in every sales conversation.", type: "Must-read" },
      { name: "Fanatical Prospecting — Jeb Blount", description: "The definitive guide to pipeline generation. Covers cold calling, email, social, and the mental game of outbound.", type: "Practical" },
      { name: "Meddicc — Andy Whyte", description: "Deep dive into the MEDDIC qualification framework. Essential reading for anyone selling into enterprise accounts.", type: "Framework" },
    ],
  },
  {
    slug: "thinkers",
    label: "Authors & Thinkers to Follow",
    icon: User,
    items: [
      { name: "Jeb Blount", description: "Prolific author and speaker on prospecting, objection handling, and sales EQ. His content is practical and immediately actionable.", type: "Books + Podcast" },
      { name: "John Barrows", description: "Sales trainer to Salesforce, LinkedIn, and Dropbox. Tactical, no-BS approach to modern B2B selling. Follow his training content.", type: "Training + Newsletter" },
      { name: "Chris Voss", description: "Former FBI hostage negotiator. His negotiation techniques have transformed how top salespeople handle pricing and objections.", type: "Books + Masterclass" },
      { name: "Keenan (A Sales Guy)", description: "Creator of Gap Selling. Provocative, data-driven, and cuts through sales BS. His LinkedIn content is consistently excellent.", type: "Books + LinkedIn" },
      { name: "Morgan Ingram", description: "Top voice in modern SDR and outbound sales. Practical video content on cold calling, LinkedIn selling, and personal branding for reps.", type: "Video + LinkedIn" },
      { name: "Matt Dixon", description: "Co-author of The Challenger Sale and The JOLT Effect. His research challenges conventional sales wisdom with data from millions of interactions.", type: "Research + Books" },
    ],
  },
  {
    slug: "companies",
    label: "Companies to Watch",
    icon: Building,
    items: [
      { name: "Snowflake", description: "Study how a data cloud company sells technical transformation to both data practitioners and executive buyers. Great model for high-context, high-value SaaS selling.", type: "Data Cloud Sales" },
      { name: "CrowdStrike", description: "A strong benchmark for security-platform selling, category creation, technical trust, and multi-stakeholder enterprise deal orchestration.", type: "Cybersecurity Sales" },
      { name: "Salesforce", description: "Study their enterprise sales motion, partner ecosystem, and how they train one of the world's largest direct sales organisations.", type: "Enterprise Sales" },
      { name: "Gong", description: "Watch how they use conversation data, deal inspection, and coaching to tighten messaging and forecast discipline.", type: "Revenue Intelligence" },
      { name: "HubSpot", description: "Study their inbound plus outbound hybrid motion and how they scale from SMB into larger accounts without losing clarity.", type: "SaaS + Mid-Market" },
      { name: "Outreach / Salesloft", description: "The platforms powering modern outbound. Their own prospecting systems are worth studying if you want stronger pipeline generation habits.", type: "Sales Engagement" },
    ],
  },
  {
    slug: "design",
    label: "Design & UX Learning",
    icon: Palette,
    items: [
      { name: "Nielsen Norman Group (NN/g)", description: "The gold standard for UX research and design principles. Research-led articles on IA, navigation, personas, usability testing, and service design.", type: "Research + Courses" },
      { name: "Laws of UX", description: "A collection of design principles that designers and salespeople should know. Clean visual explanations of each law.", type: "Reference" },
      { name: "Refactoring UI", description: "Practical design tips for developers and non-designers. Teaches you to make things look professional without being a designer.", type: "Guide" },
      { name: "Figma Community", description: "Free templates, UI kits, and design systems. Great for learning by examining how professionals structure their work.", type: "Templates" },
    ],
  },
  {
    slug: "templates",
    label: "Templates & Communities",
    icon: FileText,
    items: [
      { name: "HubSpot Template Library", description: "Free templates for sales playbooks, outreach templates, buyer personas, email templates, and more. Solid starting points.", type: "Free templates" },
      { name: "Notion Sales Templates", description: "Community-created sales templates in Notion: pipeline trackers, deal reviews, account plans, and coaching docs.", type: "Free templates" },
      { name: "r/sales (Reddit)", description: "Active community of salespeople sharing experiences, asking questions, and discussing strategy. Good for real-world perspectives.", type: "Community" },
      { name: "Sales Twitter/X", description: "Follow practitioners who share outreach ideas, negotiation lessons, and deal learnings in the open. Useful for staying current on the craft.", type: "Community" },
      { name: "Superpath", description: "Community for sales professionals. Job board, Slack group, and newsletter focused on sales careers.", type: "Community + Jobs" },
    ],
  },
  {
    slug: "market-watch",
    label: "Market Watch Sources",
    icon: Radio,
    items: [
      { name: "Google Trends", description: "See what people are searching for in real-time. Essential for spotting emerging topics, seasonal trends, and market shifts.", type: "Free tool" },
      { name: "Statista", description: "Statistics and market data across industries. Useful for supporting sales plans and presentations with hard numbers.", type: "Freemium" },
      { name: "SimilarWeb", description: "Competitive intelligence on website traffic, audience, and sales channels. See what's working for competitors.", type: "Freemium" },
      { name: "IBISWorld", description: "Australian industry reports with market size, growth, and competitive landscape data. Excellent for market analysis.", type: "Paid" },
    ],
  },
]

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("courses")
  const active = CATEGORIES.find((c) => c.slug === activeCategory)

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold">Sales Resources</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A curated learning operating system — the best courses, books, podcasts,
          blogs, and communities to accelerate your sales career.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          return (
            <Button
              key={cat.slug}
              variant={activeCategory === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.slug)}
              className="flex items-center gap-1.5"
            >
              <Icon className="h-3.5 w-3.5" />
              {cat.label}
            </Button>
          )
        })}
      </div>

      {/* Active category */}
      {active && (
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <active.icon className="h-5 w-5 text-primary" />
            {active.label}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {active.items.map((item) => (
              <Card key={item.name} className="hover:bg-accent/50 transition-colors">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <Badge variant="secondary" className="text-[10px] shrink-0 ml-2">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Principle */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-semibold">
            This is a learning OS, not a link dump.
          </p>
          <p className="text-muted-foreground mt-2 text-sm max-w-lg mx-auto">
            Every resource here was chosen because it teaches something you
            can&apos;t easily learn elsewhere. Pair one sales methodology, one tool
            skill, and one domain credential so your growth compounds instead of
            scattering across random content.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
