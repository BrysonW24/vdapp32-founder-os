import Link from "next/link"
import { Metadata } from "next"
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Cloud,
  Cpu,
  GraduationCap,
  Handshake,
  Shield,
  Target,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "AE Blueprint",
  description:
    "A research-informed blueprint for the modern enterprise SaaS Account Executive: responsibilities, KPIs, capability stack, certifications, curriculum, and ramp milestones.",
}

const RESPONSIBILITY_PILLARS = [
  {
    icon: Briefcase,
    title: "Own the full cycle",
    description:
      "Source new pipeline, run discovery, guide demos, build business cases, negotiate commercials, and keep clean next steps all the way to signature.",
  },
  {
    icon: Users,
    title: "Orchestrate the deal team",
    description:
      "Partner with SDRs, sales engineers, partners, legal, finance, and customer success while multi-threading champions, evaluators, and executives.",
  },
  {
    icon: BarChart3,
    title: "Forecast like an operator",
    description:
      "Keep CRM data current, defend commit versus upside, understand stage conversion, and make the forecast credible to leadership every week.",
  },
  {
    icon: Shield,
    title: "Navigate enterprise friction",
    description:
      "Handle procurement, security review, legal redlines, RFPs, and mutual action plans without losing commercial momentum.",
  },
]

const KPI_CARDS = [
  {
    label: "Pipeline",
    title: "Self-sourced pipeline generated",
    description: "Outbound pipeline, meetings booked, and coverage against quota remain the leading indicators of future success.",
  },
  {
    label: "Conversion",
    title: "Win rate and stage progression",
    description: "AEs are measured on how efficiently they turn discovery into demos, proposals, commits, and closed ARR.",
  },
  {
    label: "Forecast",
    title: "Forecast accuracy",
    description: "Leaders care whether an AE can separate hope from evidence and call the quarter with discipline.",
  },
  {
    label: "Revenue",
    title: "Closed ARR and deal quality",
    description: "Bookings matter, but so do contract quality, expansion potential, and the health of what was sold.",
  },
  {
    label: "Execution",
    title: "Pipeline hygiene and follow-through",
    description: "Every real deal needs current next steps, contact roles, timing, and decision criteria in the CRM.",
  },
  {
    label: "Customer",
    title: "Retention and expansion signals",
    description: "Especially in SaaS, top AEs stay close enough to adoption and value realisation to protect future growth.",
  },
]

const CAPABILITY_STACK = [
  {
    icon: Cloud,
    title: "Product and domain fluency",
    points: [
      "Understand the product architecture well enough to speak credibly with technical buyers.",
      "Develop adjacent domain knowledge such as cloud, analytics, security, compliance, or industry workflows.",
    ],
  },
  {
    icon: Handshake,
    title: "Consultative selling skill",
    points: [
      "Use structured discovery, qualification, and negotiation rather than ad hoc charisma.",
      "Build urgency by quantifying the cost of the status quo, not by forcing pressure tactics.",
    ],
  },
  {
    icon: Cpu,
    title: "Technical collaboration",
    points: [
      "Know when to bring in a sales engineer and how to align business pain to technical solution design.",
      "Translate demos, proof-of-concepts, and security reviews into business confidence for the buyer.",
    ],
  },
  {
    icon: Building2,
    title: "Commercial and financial acumen",
    points: [
      "Build ROI narratives, justify pricing, and understand ARR, expansion, churn, and payback in plain language.",
      "Negotiate payment terms, multi-year structures, and give-get concessions without protecting only price.",
    ],
  },
  {
    icon: Target,
    title: "Tools and operating rhythm",
    points: [
      "Be sharp in Salesforce, Clari, LinkedIn Sales Navigator, Gong, and account research workflows.",
      "Run weekly pipeline inspection, close plans, and account planning as habits rather than one-off admin.",
    ],
  },
]

const CERTIFICATIONS = [
  {
    title: "Product credibility",
    items: [
      "Snowflake sales credential or equivalent product certification",
      "CrowdStrike Falcon or equivalent vendor enablement path",
    ],
  },
  {
    title: "Cloud credibility",
    items: [
      "AWS Cloud Practitioner",
      "Azure Fundamentals",
      "Google Cloud Digital Leader or Data Engineer track",
    ],
  },
  {
    title: "Security credibility",
    items: [
      "CompTIA Security+ for fundamentals",
      "CISSP only when experience makes it realistic",
    ],
  },
  {
    title: "Sales process mastery",
    items: [
      "MEDDPICC workshop or academy",
      "Challenger or Sandler training for messaging and control",
      "Salesforce Trailhead or admin fundamentals",
    ],
  },
]

const CURRICULUM_PHASES = [
  {
    phase: "Months 1-2",
    title: "Product, market, and buyer fundamentals",
    description:
      "Learn the company story, value proposition, competitive landscape, buyer personas, and the language used by technical and executive stakeholders.",
  },
  {
    phase: "Months 2-3",
    title: "Prospecting and outreach discipline",
    description:
      "Build lists, craft value hypotheses, run cold email and call blocks, and create the habit of self-sourced pipeline generation.",
  },
  {
    phase: "Months 3-4",
    title: "Discovery and solution mapping",
    description:
      "Practice structured discovery, MEDDIC-style qualification, stakeholder mapping, and pain-to-capability alignment with sales engineers.",
  },
  {
    phase: "Months 4-6",
    title: "Demos, business cases, and negotiation",
    description:
      "Run tailored demos, present ROI, handle objections, negotiate commercials, and turn deal momentum into close plans.",
  },
  {
    phase: "Months 6-9",
    title: "Forecasting, tools, and operator habits",
    description:
      "Sharpen CRM hygiene, forecast methodology, pipeline reviews, account planning, and the repeatable rhythms managers trust.",
  },
  {
    phase: "Months 9-12",
    title: "Enterprise strategy and account growth",
    description:
      "Handle procurement, legal and security reviews, strategic account plans, QBRs, expansion paths, and executive alignment.",
  },
]

const RAMP_CHECKPOINTS = [
  {
    window: "Days 0-30",
    focus: "Absorb the market and the message",
    targets: [
      "Shadow live discovery, demo, and negotiation calls.",
      "Learn the ICP, top competitors, and top 10 objections.",
      "Pass internal product knowledge and messaging checks.",
    ],
  },
  {
    window: "Days 31-90",
    focus: "Create early pipeline and run real meetings",
    targets: [
      "Book first meetings from outbound or sourced accounts.",
      "Run discovery with a manager or SE observing.",
      "Build an initial pipeline target with clear stage evidence.",
    ],
  },
  {
    window: "Days 91-180",
    focus: "Operate as a credible full-cycle AE",
    targets: [
      "Advance deals through demo, proposal, and negotiation stages.",
      "Call forecast categories with increasing accuracy.",
      "Close first deal or build enough late-stage pipeline to support the close.",
    ],
  },
  {
    window: "Months 6-12",
    focus: "Build enterprise readiness",
    targets: [
      "Handle multi-stakeholder deals with stronger executive alignment.",
      "Complete one meaningful certification in product, cloud, security, or methodology.",
      "Deliver account plans, QBR thinking, and a more defensible quarterly forecast.",
    ],
  },
]

export default function AEBlueprintPage() {
  return (
    <div className="container py-10 space-y-10">
      <div className="max-w-4xl">
        <Badge variant="secondary" className="mb-3">
          Research-Informed Direction
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          The Modern SaaS AE Blueprint
        </h1>
        <p className="text-editorial-muted mt-4 text-base sm:text-lg leading-relaxed max-w-3xl">
          This page translates enterprise SaaS AE expectations into the direction
          of the academy. It leans into the kind of responsibilities seen in
          high-performance software sales organisations: full-cycle ownership,
          technical credibility, clean forecasting, and the ability to move a
          complex buying committee toward confident action.
        </p>
      </div>

      <section className="space-y-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">
            What the role actually owns
          </h2>
          <p className="text-sm text-editorial-muted mt-2 leading-relaxed">
            A modern AE is not just a closer. The role blends seller, strategist,
            project manager, and internal quarterback.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {RESPONSIBILITY_PILLARS.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="h-full">
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
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">
            What leadership measures
          </h2>
          <p className="text-sm text-editorial-muted mt-2 leading-relaxed">
            The academy is now orienting more clearly around the metrics and habits
            that make an AE trustworthy to a sales manager, VP, and CRO.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {KPI_CARDS.map((item) => (
            <Card key={item.title} className="h-full">
              <CardContent className="p-5 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">
                  {item.label}
                </p>
                <h3 className="font-serif font-semibold text-editorial-ink text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-editorial-muted leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">
            Capability stack to build
          </h2>
          <p className="text-sm text-editorial-muted mt-2 leading-relaxed">
            The strongest AEs combine product fluency, sales craft, commercial
            judgment, and operator habits. Missing any one of these shows up in
            the forecast sooner or later.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {CAPABILITY_STACK.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.title} className="h-full">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-blue-soft">
                      <Icon className="h-5 w-5 text-editorial-blue" />
                    </div>
                    <h3 className="font-serif font-semibold text-editorial-ink text-base">
                      {item.title}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {item.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-[12px] bg-white/55 border border-[rgba(44,49,59,0.06)] px-3 py-2"
                      >
                        <p className="text-xs text-editorial-muted leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">
            Suggested credential path
          </h2>
          <p className="text-sm text-editorial-muted mt-2 leading-relaxed">
            Pair one domain credential with one sales methodology path and one
            tool competency. That combination builds confidence faster than
            collecting random certificates.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-editorial-amber-soft mb-3">
                  <GraduationCap className="h-5 w-5 text-editorial-amber" />
                </div>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {item.items.map((entry) => (
                  <p key={entry} className="text-xs text-editorial-muted leading-relaxed">
                    {entry}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">
            Zero to hero curriculum arc
          </h2>
          <p className="text-sm text-editorial-muted mt-2 leading-relaxed">
            The learning journey should feel like a real ramp: fundamentals first,
            then pipeline creation, then full-cycle execution, then enterprise depth.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CURRICULUM_PHASES.map((item) => (
            <Card key={item.title} className="h-full">
              <CardContent className="p-5 space-y-2">
                <Badge variant="secondary">{item.phase}</Badge>
                <h3 className="font-serif font-semibold text-editorial-ink text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-editorial-muted leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">
            Ramp checkpoints
          </h2>
          <p className="text-sm text-editorial-muted mt-2 leading-relaxed">
            A useful ramp is measured in outputs, not vibes. These checkpoints give
            the academy a clearer sense of what “good progress” looks like.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {RAMP_CHECKPOINTS.map((item) => (
            <Card key={item.window} className="h-full">
              <CardContent className="p-5 space-y-3">
                <Badge variant="secondary">{item.window}</Badge>
                <h3 className="font-serif font-semibold text-editorial-ink text-base">
                  {item.focus}
                </h3>
                <div className="space-y-2">
                  {item.targets.map((target) => (
                    <p key={target} className="text-xs text-editorial-muted leading-relaxed">
                      {target}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Card className="glass-panel-strong">
        <CardContent className="p-6 sm:p-8 text-center space-y-4">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">
            Use the academy like a real ramp plan
          </h2>
          <p className="text-sm text-editorial-muted max-w-2xl mx-auto leading-relaxed">
            Start with the modules, use the timeline to understand how skills stack,
            and then reinforce the whole journey with certifications, role-play, and
            call review. The goal is not to memorise sales jargon. The goal is to
            become an AE a manager would trust with real pipeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/sales/learn/modules">
                Explore Modules <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/sales/timeline">See the Ramp Timeline</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/sales/resources">Open Resources</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
