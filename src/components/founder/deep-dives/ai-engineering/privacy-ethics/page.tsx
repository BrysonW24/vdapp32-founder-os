"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield, Eye, Lock, AlertTriangle, CheckCircle2, Globe,
  Users, Database, Bot, FileText, Scale, Heart,
} from "lucide-react"
import { cn } from "@/lib/utils"

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } }

const PRIVACY_LAWS = [
  {
    name: "Australian Privacy Act 1988 (APPs)",
    scope: "Australian businesses with >$3M revenue (and many below)",
    keyRules: [
      "Must tell people what data you collect, why, and how you use it",
      "Can only collect data reasonably necessary for your purpose",
      "Must give people access to their data and let them correct it",
      "Must take reasonable steps to protect data from breaches",
      "Must notify the OAIC of eligible data breaches within 30 days",
      "Cross-border data transfers must ensure equivalent protection",
    ],
    engineeringImpact: "Your email lists, CRM data, analytics tracking, and ad targeting all fall under this act. You need consent for direct communication with users.",
  },
  {
    name: "GDPR (EU/UK)",
    scope: "Applies if you market to or collect data from EU/UK residents — even from Australia",
    keyRules: [
      "Explicit consent required before collecting personal data",
      "Right to be forgotten — people can request full data deletion",
      "Data processing must have a lawful basis (consent, legitimate interest, contract)",
      "Data Protection Impact Assessments required for high-risk processing",
      "72-hour breach notification requirement",
      "Fines up to 4% of global revenue or €20M",
    ],
    engineeringImpact: "If you have any EU customers or website visitors, GDPR applies. Cookie consent banners, email opt-in, and data deletion processes are mandatory.",
  },
  {
    name: "CAN-SPAM / ACMA Spam Act",
    scope: "All commercial electronic messages (email, SMS) in Australia and the US",
    keyRules: [
      "Must include a working unsubscribe mechanism in every commercial email",
      "Must honour unsubscribe requests within 5 business days (AU) / 10 days (US)",
      "Must include your physical business address",
      "Must not use misleading subject lines or sender names",
      "Must identify the message as an advertisement",
      "Consent is required — inferred consent (existing business relationship) or express consent",
    ],
    engineeringImpact: "Every email, every SMS, every automated message must comply. Penalties in Australia can reach $2.1M per day for serious breaches.",
  },
]

const COOKIE_CONSENT = [
  { type: "Strictly Necessary", needsConsent: false, example: "Session cookies, security tokens, shopping cart", impact: "Always allowed. These make the site function." },
  { type: "Analytics", needsConsent: true, example: "Google Analytics, Hotjar, Mixpanel", impact: "Requires opt-in in EU. Without consent, you lose ~30-40% of analytics data." },
  { type: "Tracking / Targeting", needsConsent: true, example: "Meta Pixel, Google Ads, retargeting cookies", impact: "Requires explicit opt-in. Without consent, retargeting and attribution break." },
  { type: "Functional", needsConsent: true, example: "Language preferences, saved settings, chat widgets", impact: "Usually low-risk but technically requires consent in strict jurisdictions." },
]

const AI_ETHICS = [
  {
    principle: "Transparency",
    icon: Eye,
    description: "If AI generated it, say so. Don't pretend AI-written content was authored by a human. Don't use AI-generated fake testimonials or reviews.",
    rule: "Disclose AI involvement when it matters to trust. Your audience deserves to know.",
  },
  {
    principle: "Accuracy",
    icon: CheckCircle2,
    description: "AI hallucinates. It invents statistics, fabricates quotes, and generates plausible-sounding nonsense. Every AI output used in customer-facing material must be fact-checked by a human.",
    rule: "Never publish AI-generated claims without verification. One wrong statistic destroys credibility.",
  },
  {
    principle: "Bias Awareness",
    icon: Scale,
    description: "AI models reflect biases in their training data. This affects targeting, content generation, and personalisation. If your AI consistently generates content that skews toward one demographic, it's a bias problem.",
    rule: "Audit AI outputs for representation, fairness, and inclusivity. Especially in targeting and creative.",
  },
  {
    principle: "Data Minimisation",
    icon: Database,
    description: "Just because AI can process more data doesn't mean it should. Collect only what's necessary. Process only what's justified. Delete when the purpose is fulfilled.",
    rule: "More data ≠ better AI. Targeted, consented data outperforms mass surveillance every time.",
  },
  {
    principle: "Human Oversight",
    icon: Users,
    description: "AI should assist decisions, not make them unilaterally. Especially for targeting vulnerable audiences, pricing, personalisation at sensitive moments, and crisis communication.",
    rule: "Every automated system that touches customers needs a human review checkpoint.",
  },
  {
    principle: "Consent for Personalisation",
    icon: Heart,
    description: "Personalisation powered by AI feels helpful when expected and creepy when it isn't. The line between 'they understand me' and 'they're watching me' is consent.",
    rule: "Personalise based on data people knowingly gave you. Don't use inferred or scraped data without disclosure.",
  },
]

const PRACTICAL_CHECKLIST = [
  { area: "Email", items: ["Working unsubscribe in every email", "Consent captured at signup", "Physical address in footer", "Non-misleading subject lines", "Suppression list maintained"] },
  { area: "Website", items: ["Cookie consent banner (if targeting EU/UK)", "Privacy policy page — plain English, not legalese", "Terms of service page", "Secure (HTTPS) connection", "Data collection disclosure"] },
  { area: "Ads", items: ["Pixel fires only with consent (EU)", "Custom audiences use hashed data", "No targeting children or vulnerable groups without safeguards", "Ad content is truthful and not misleading"] },
  { area: "CRM", items: ["Consent recorded per contact", "Unsubscribes processed within 5 business days", "Data deletion request process in place", "Data retention policy documented", "Access controls on sensitive data"] },
  { area: "AI Usage", items: ["AI-generated content reviewed before publishing", "No fabricated testimonials or fake social proof", "Bias checks on AI-generated targeting and creative", "Disclosure when AI materially contributes to customer communication", "Human override available on all automated decisions"] },
]

export default function PrivacyEthicsPage() {
  return (
    <div className="container py-6 space-y-8">
      <div className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-editorial-muted mb-3">Foundation Layer</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          AI Ethics &amp; Responsible AI
        </h1>
        <p className="text-editorial-muted mt-4 text-lg leading-relaxed max-w-2xl">
          Modern AI systems make decisions that affect real people. Building
          responsibly means understanding bias, fairness, safety, and alignment.
          Ethical AI isn&apos;t optional — it&apos;s the foundation of trustworthy,
          sustainable AI engineering.
        </p>
      </div>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 space-y-2">
          <h3 className="font-serif font-semibold text-editorial-ink flex items-center gap-2">
            <Shield className="h-5 w-5 text-editorial-green" /> Why this matters for your career
          </h3>
          <p className="text-sm text-editorial-muted leading-relaxed max-w-3xl">
            A privacy breach can end an engineering career, destroy customer trust, and
            cost millions in fines. The Australian Privacy Act, GDPR, and spam laws
            aren&apos;t suggestions — they&apos;re legally enforceable. Engineers who understand
            privacy are more valuable because they build sustainable, compliant systems
            that won&apos;t blow up.
          </p>
        </CardContent>
      </Card>

      {/* Privacy laws */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Privacy laws you need to know</h2>
        <div className="space-y-4">
          {PRIVACY_LAWS.map((law) => (
            <Card key={law.name}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif font-semibold text-editorial-ink">{law.name}</h3>
                  <Badge variant="secondary" className="text-[10px] shrink-0">{law.scope.split(" — ")[0]}</Badge>
                </div>
                <p className="text-xs text-editorial-muted">{law.scope}</p>
                <div className="space-y-1.5">
                  {law.keyRules.map((r) => (
                    <div key={r} className="flex items-start gap-2 text-xs text-editorial-ink/80">
                      <Lock className="h-3 w-3 text-editorial-blue mt-0.5 shrink-0" /> {r}
                    </div>
                  ))}
                </div>
                <div className="rounded-[12px] bg-editorial-amber-soft/60 border border-editorial-amber/10 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-amber mb-0.5">Engineering impact</p>
                  <p className="text-xs text-editorial-ink/80">{law.engineeringImpact}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Cookie consent */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Cookie consent explained</h2>
        <div className="space-y-2">
          {COOKIE_CONSENT.map((c) => (
            <Card key={c.type}>
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 sm:w-48 shrink-0">
                  <div className={cn("h-2 w-2 rounded-full", c.needsConsent ? "bg-editorial-amber" : "bg-editorial-green")} />
                  <span className="text-sm font-serif font-semibold text-editorial-ink">{c.type}</span>
                </div>
                <Badge variant={c.needsConsent ? "intermediate" : "beginner"} className="text-[10px] shrink-0 w-fit">
                  {c.needsConsent ? "Consent required" : "Always allowed"}
                </Badge>
                <p className="text-xs text-editorial-muted flex-1">{c.impact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* AI ethics */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Responsible AI in engineering</h2>
        <p className="text-sm text-editorial-muted max-w-2xl">
          AI makes development faster and more powerful. That power comes with
          responsibility. These principles keep your AI usage ethical and sustainable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_ETHICS.map((item) => (
            <Card key={item.principle} className="hover:-translate-y-[1px] hover:shadow-editorial-hover transition-all duration-200">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-editorial-green-soft">
                    <item.icon className="h-4 w-4 text-editorial-green" />
                  </div>
                  <h3 className="font-serif font-semibold text-editorial-ink text-sm">{item.principle}</h3>
                </div>
                <p className="text-xs text-editorial-muted leading-relaxed">{item.description}</p>
                <div className="rounded-[10px] bg-editorial-green-soft/60 border border-editorial-green/10 px-3 py-1.5">
                  <p className="text-xs text-editorial-green font-medium">{item.rule}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Practical checklist */}
      <motion.section {...fadeIn} className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-editorial-ink">Compliance checklist by area</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRACTICAL_CHECKLIST.map((area) => (
            <Card key={area.area}>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-serif font-semibold text-editorial-ink text-sm">{area.area}</h3>
                <div className="space-y-1.5">
                  {area.items.map((item) => (
                    <div key={item} className="flex items-start gap-1.5 text-xs text-editorial-ink/80">
                      <CheckCircle2 className="h-3 w-3 text-editorial-green mt-0.5 shrink-0" /> {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-lg font-serif font-semibold text-editorial-ink">
            Trust is your most valuable engineering asset. Privacy is how you protect it.
          </p>
          <p className="text-sm text-editorial-muted max-w-lg mx-auto">
            Customers who trust you share more data, engage more deeply, buy more
            often, and forgive mistakes. Privacy compliance isn&apos;t a cost — it&apos;s
            an investment in the relationship that makes everything else work.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
