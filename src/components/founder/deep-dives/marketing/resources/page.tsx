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
      { name: "Google Skillshop", description: "Free training by Google product experts. Get certified in Google Ads, Analytics, and more. The industry standard for platform skills.", type: "Free certification" },
      { name: "HubSpot Academy", description: "Free globally-recognised certifications in inbound marketing, content marketing, email marketing, social media, and CRM. Excellent for beginners.", type: "Free certification" },
      { name: "Meta Blueprint", description: "Free self-guided training for Facebook, Instagram, Messenger, and WhatsApp advertising. Essential if you'll run Meta Ads.", type: "Free certification" },
      { name: "Coursera — Marketing Specialisations", description: "University-level marketing courses from Wharton, Northwestern, and others. The Digital Marketing Specialisation by Illinois is a strong starting point.", type: "Freemium" },
      { name: "CXL Institute", description: "Advanced digital marketing courses taught by practitioners. Covers conversion optimisation, growth, and analytics at a deep level.", type: "Paid" },
      { name: "Semrush Academy", description: "Free courses on SEO, content marketing, PPC, and social media with practical tool-based exercises.", type: "Free" },
    ],
  },
  {
    slug: "blogs",
    label: "Blogs & Research",
    icon: Globe,
    items: [
      { name: "HubSpot Blog", description: "The gold standard marketing blog. Covers every topic with depth, data, and templates. Read the State of Marketing Report annually.", type: "Blog" },
      { name: "Think with Google", description: "Google's marketing insights platform. Trends, research, case studies, and data-driven recommendations from Google's own research teams.", type: "Research" },
      { name: "Moz Blog", description: "The original SEO blog. Whiteboard Friday videos are legendary for learning SEO concepts visually.", type: "Blog" },
      { name: "Content Marketing Institute", description: "Deep-dive articles on content strategy, creation, and measurement. Their annual B2B/B2C content marketing research reports are essential reading.", type: "Blog + Research" },
      { name: "Marketing Brew", description: "Daily newsletter covering marketing news, campaigns, and industry moves. Good for staying current without drowning in content.", type: "Newsletter" },
      { name: "Stratechery by Ben Thompson", description: "Strategic analysis of technology and media businesses. Not marketing-specific but develops the strategic thinking marketers need.", type: "Newsletter (paid)" },
    ],
  },
  {
    slug: "books",
    label: "Essential Books",
    icon: BookOpen,
    items: [
      { name: "Marketing Management — Kotler, Keller & Chernev", description: "The comprehensive academic textbook. Dense but complete. Use it as a reference, not a cover-to-cover read. This is what MBA students study.", type: "Textbook" },
      { name: "This Is Marketing — Seth Godin", description: "A modern, human-centred view of marketing. Short, punchy, and shifts your mindset from 'how do I sell more' to 'how do I serve better.'", type: "Must-read" },
      { name: "Obviously Awesome — April Dunford", description: "The best book on positioning. Period. Practical framework you can apply immediately to any product or service.", type: "Must-read" },
      { name: "The Brand Gap — Marty Neumeier", description: "A visual, fast read on what brand is and how to build one. Bridges the gap between business strategy and creative execution.", type: "Quick read" },
      { name: "Influence — Robert Cialdini", description: "The psychology of persuasion. Six principles (reciprocity, commitment, social proof, authority, liking, scarcity) that underpin all marketing.", type: "Classic" },
      { name: "Building a StoryBrand — Donald Miller", description: "How to use storytelling frameworks to clarify your messaging. Practical and immediately applicable to websites, emails, and campaigns.", type: "Practical" },
      { name: "Hooked — Nir Eyal", description: "How products create habits. Essential for understanding retention, engagement, and product-led growth.", type: "Product + Marketing" },
    ],
  },
  {
    slug: "thinkers",
    label: "Authors & Thinkers to Follow",
    icon: User,
    items: [
      { name: "Seth Godin", description: "Daily blog on marketing, leadership, and making a difference. His thinking shapes how modern marketers approach their work.", type: "Blog + Books" },
      { name: "Mark Ritson", description: "Australian marketing professor and Mini MBA creator. Provocative, data-driven, and cuts through marketing BS. Follow his Marketing Week columns.", type: "Columns + Course" },
      { name: "April Dunford", description: "World's leading expert on product positioning. Her frameworks are used by startups and enterprises alike.", type: "Books + Talks" },
      { name: "Rand Fishkin", description: "Founder of Moz and SparkToro. Transparent about the realities of marketing, SEO, and building businesses. Follow his newsletter.", type: "Newsletter + Video" },
      { name: "Ann Handley", description: "Chief Content Officer at MarketingProfs. The leading voice on content marketing and writing for business.", type: "Books + Newsletter" },
      { name: "Byron Sharp", description: "Author of 'How Brands Grow.' His evidence-based approach challenges conventional marketing wisdom. Based at the Ehrenberg-Bass Institute in Adelaide.", type: "Academic + Books" },
    ],
  },
  {
    slug: "companies",
    label: "Companies to Watch",
    icon: Building,
    items: [
      { name: "HubSpot", description: "Watch how they practice what they preach — their content strategy, product marketing, and community building are world-class.", type: "SaaS + Content" },
      { name: "Canva", description: "Australian-born design platform. Study their product-led growth, freemium model, and brand positioning.", type: "Product-led Growth" },
      { name: "Atlassian", description: "Australian B2B giant. Study their bottom-up GTM strategy, developer marketing, and flywheel growth model.", type: "B2B + PLG" },
      { name: "Shopify", description: "E-commerce platform that excels at content marketing, partner ecosystem building, and brand positioning.", type: "E-commerce + Content" },
      { name: "Duolingo", description: "Master class in brand personality, social media, and gamification. Study their TikTok strategy.", type: "Brand + Social" },
    ],
  },
  {
    slug: "design",
    label: "Design & UX Learning",
    icon: Palette,
    items: [
      { name: "Nielsen Norman Group (NN/g)", description: "The gold standard for UX research and design principles. Research-led articles on IA, navigation, personas, usability testing, and service design.", type: "Research + Courses" },
      { name: "Laws of UX", description: "A collection of design principles that designers and marketers should know. Clean visual explanations of each law.", type: "Reference" },
      { name: "Refactoring UI", description: "Practical design tips for developers and non-designers. Teaches you to make things look professional without being a designer.", type: "Guide" },
      { name: "Figma Community", description: "Free templates, UI kits, and design systems. Great for learning by examining how professionals structure their work.", type: "Templates" },
    ],
  },
  {
    slug: "templates",
    label: "Templates & Communities",
    icon: FileText,
    items: [
      { name: "HubSpot Template Library", description: "Free templates for marketing plans, content calendars, buyer personas, email templates, and more. Solid starting points.", type: "Free templates" },
      { name: "Notion Marketing Templates", description: "Community-created marketing templates in Notion: content calendars, campaign trackers, brand guidelines, and more.", type: "Free templates" },
      { name: "r/marketing (Reddit)", description: "Active community of marketers sharing experiences, asking questions, and discussing strategy. Good for real-world perspectives.", type: "Community" },
      { name: "Marketing Twitter/X", description: "Follow practitioners who share real campaigns, results, and learnings. More valuable than most courses for staying current.", type: "Community" },
      { name: "Superpath", description: "Community for content marketers. Job board, Slack group, and newsletter focused on content strategy careers.", type: "Community + Jobs" },
    ],
  },
  {
    slug: "market-watch",
    label: "Market Watch Sources",
    icon: Radio,
    items: [
      { name: "Google Trends", description: "See what people are searching for in real-time. Essential for spotting emerging topics, seasonal trends, and market shifts.", type: "Free tool" },
      { name: "Statista", description: "Statistics and market data across industries. Useful for supporting marketing plans and presentations with hard numbers.", type: "Freemium" },
      { name: "SimilarWeb", description: "Competitive intelligence on website traffic, audience, and marketing channels. See what's working for competitors.", type: "Freemium" },
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
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          A curated learning operating system — the best courses, books, blogs,
          thinkers, and communities to accelerate your marketing education.
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
            can&apos;t easily learn elsewhere. Start with the free certifications,
            read one book per month, and follow 3-5 practitioners to stay current.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
