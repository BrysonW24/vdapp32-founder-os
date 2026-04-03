"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Wrench,
  Target,
  HelpCircle,
  AlertTriangle,
  TrendingUp,
  RotateCcw,
  Sparkles,
  ArrowRight,
  DollarSign,
  Users,
  Presentation,
  Mail,
  Search,
  Play,
  Eye,
  Brain,
  Shield,
  Handshake,
  Map,
  Network,
  Building2,
} from "lucide-react"

/* ═══════════════════════════════════════════════════
   COMPANY PROFILE
═══════════════════════════════════════════════════ */
const COMPANY = {
  name: "Northstar Cloud",
  tagline: "Operational resilience for complex software teams",
  description: "A Sydney-based B2B SaaS company selling workflow automation and incident-response orchestration software to mid-market and enterprise technology teams. You have just joined as an Account Executive to help open and scale the ANZ motion.",
  stats: [
    { label: "ARR", value: "$4.8M" },
    { label: "Average ACV", value: "$42K" },
    { label: "Win Rate", value: "26%" },
    { label: "Avg Sales Cycle", value: "96 days" },
    { label: "Territory Accounts", value: "180" },
    { label: "NRR", value: "118%" },
  ],
}

/* ═══════════════════════════════════════════════════
   STAGES DATA
═══════════════════════════════════════════════════ */
interface Decision {
  question: string
  options: { label: string; feedback: string; quality: "best" | "good" | "okay" }[]
  insight: string
}

interface Stage {
  id: number
  week: string
  title: string
  icon: typeof Play
  color: string
  brief: string
  scenario: string
  questionsToAsk: string[]
  toolsToUse: { name: string; why: string }[]
  decision: Decision
  deliverable: string
  mentorTip: string
  goalCheck: string
  boundaryLesson: string
}

const STAGES: Stage[] = [
  {
    id: 1,
    week: "Week 1",
    title: "Territory Handoff",
    icon: Play,
    color: "#386a58",
    brief: "You inherit a new patch, a number, and a reputation to build. Your first week is about deciding where focus belongs.",
    scenario:
      "The VP Sales walks you through the ANZ territory. There are 180 named accounts, a few old closed-lost opportunities, several noisy inbound leads, and one solutions engineer shared across the region.\n\nThe temptation is to start emailing immediately. The better move is to understand where Northstar already wins, which accounts fit the product best, and what kind of deal motion the team can realistically support in the next 90 days.",
    questionsToAsk: [
      "What patterns show up in closed-won deals: size, trigger, role, urgency, tech stack?",
      "Which accounts in territory were previously worked and why did they stall or lose?",
      "How much self-sourced pipeline is expected from this role versus SDR or partner-sourced?",
      "What resources can I reliably call on: solutions engineering, executive sponsors, legal, CS?",
      "What would make my first quarter feel undeniably successful to leadership?",
    ],
    toolsToUse: [
      { name: "Salesforce", why: "Review prior pipeline, stage history, account ownership, and closed-lost notes before you touch the territory" },
      { name: "Gong", why: "Listen to win and loss calls so you inherit messaging and objections, not just account names" },
      { name: "Notion", why: "Create a territory brief with segments, account hypotheses, and deal priorities for the first 30 days" },
    ],
    decision: {
      question: "It is Friday afternoon. How do you frame your first 30 days to the VP Sales?",
      options: [
        { label: "Launch broad outbound across all 180 accounts so activity volume looks strong immediately", feedback: "This creates motion but not leverage. Without account prioritization, you will burn time on low-fit logos and teach the team nothing useful about where you can actually win.", quality: "okay" },
        { label: "Build a tiered territory plan: top 25 strategic accounts, next 50 opportunistic accounts, and clear hypotheses for each segment", feedback: "This is the strongest opening move. It creates focus, gives leadership confidence, and turns the first quarter into a learning system rather than a random burst of activity.", quality: "best" },
        { label: "Wait for SDR-sourced meetings first so you can learn from live conversations before picking targets", feedback: "There is some logic here, but it gives away control. Strong AEs learn from inbound and SDR work while still building their own point of view on where the best pipeline should come from.", quality: "good" },
      ],
      insight: "Territory planning is not admin. It is the first strategic decision of the quarter. Good AEs decide where not to spend time before they decide where to attack.",
    },
    deliverable: "A 30-day territory memo with target segments, top 25 accounts, historic deal patterns, and first-wave priorities",
    mentorTip: "If your territory plan cannot explain why these accounts matter now, it is just a list. A real plan links fit, trigger, value hypothesis, and resource constraints.",
    goalCheck: "Can you explain the top 10 accounts in your patch and why they deserve attention now, not later?",
    boundaryLesson: "You do not control every internal resource. Prioritize the accounts where the company can actually support the motion instead of promising an enterprise process for every logo.",
  },
  {
    id: 2,
    week: "Week 2",
    title: "Account Prioritisation",
    icon: Search,
    color: "#2f4f79",
    brief: "The territory is too large to work account-by-account. You need a ruthless priority model.",
    scenario:
      "Your first pass shows dozens of plausible accounts, but one rises quickly: HarborPay, a fast-growing payments platform that just expanded into NZ and is hiring incident response and site reliability roles.\n\nThis is the kind of account where Northstar could matter, but only if you can connect trigger, pain, and business impact before you reach out.",
    questionsToAsk: [
      "What changed recently at HarborPay that creates urgency now?",
      "What operational pain is most likely inside their environment: outages, alert fatigue, incident handoffs, compliance response?",
      "Which buyer roles are likely to care first: engineering, SRE, security, operations, leadership?",
      "What proof points do we have that resemble this account's complexity or stage?",
      "What would make this account top-tier enough to deserve multi-threaded effort from day one?",
    ],
    toolsToUse: [
      { name: "LinkedIn Sales Navigator", why: "Map the likely buying committee and identify role changes, promotions, and likely champions" },
      { name: "ZoomInfo", why: "Confirm org structure, technology signals, and team expansion that suggest operational complexity" },
      { name: "Company filings and news", why: "Tie your outreach to strategic events like expansion, hiring, compliance pressure, or reliability incidents" },
    ],
    decision: {
      question: "What most justifies putting HarborPay into your top tier?",
      options: [
        { label: "They look like a recognizable logo that would help your credibility if won", feedback: "Logo value matters, but it is not enough. Chasing a recognizable brand without a business reason is how reps create exciting but low-probability pipeline.", quality: "okay" },
        { label: "They have a visible operational change and a plausible pain pattern that your team can quantify and solve", feedback: "Correct. Priority should come from fit plus timing plus credible pain, not just company size or brand prestige.", quality: "best" },
        { label: "Their team is hiring quickly, so they are probably buying a lot of software in general", feedback: "That is directionally useful, but too vague on its own. A strong priority call requires a sharper hypothesis about where the pain lives and how Northstar changes the business outcome.", quality: "good" },
      ],
      insight: "Great account selection is rarely about who looks impressive. It is about who is most likely to have a problem you can prove, solve, and close with available resources.",
    },
    deliverable: "A one-page HarborPay account brief covering trigger, likely pains, stakeholder map, and first outreach angle",
    mentorTip: "If the account brief sounds like it could apply to 50 companies, it is not specific enough yet.",
    goalCheck: "Can you explain why HarborPay deserves strategic effort in one sentence without using buzzwords like innovation or transformation?",
    boundaryLesson: "Do not mistake research for progress forever. Once the hypothesis is credible, move to outreach and let real conversations sharpen the truth.",
  },
  {
    id: 3,
    week: "Week 3",
    title: "First Outbound Wave",
    icon: Mail,
    color: "#6d28d9",
    brief: "Now you need to earn the first conversation without sounding like every other rep in their inbox.",
    scenario:
      "You have the HarborPay hypothesis, a shortlist of stakeholders, and enough context to write with intent. The risk is defaulting to a generic sequence once the pressure to produce activity shows up.\n\nYour aim is to create a first-wave outbound plan that feels focused, credible, and worth a response from both technical and commercial stakeholders.",
    questionsToAsk: [
      "Which role is most likely to feel the pain first, and which role will approve action later?",
      "What specific trigger gives you permission to reach out now?",
      "What insight can you lead with that shows you understand their environment?",
      "What is the easiest next step to ask for without overcommitting the buyer?",
      "How will you adapt the message across champion, manager, and executive layers?",
    ],
    toolsToUse: [
      { name: "Apollo", why: "Organize contacts, test messaging, and track engagement without losing the account narrative" },
      { name: "Claude for Sales", why: "Pressure-test your message structure and sharpen language around the buyer's likely pain" },
      { name: "Notion", why: "Track message variants, persona hypotheses, and response themes across the account" },
    ],
    decision: {
      question: "How do you structure the first outbound sequence into HarborPay?",
      options: [
        { label: "Use the company's default 6-touch sequence with minor personalization so you can move fast", feedback: "Speed matters, but this wastes your account work. Minor personalization is still generic when the buyer has seen the same pattern from every vendor in category.", quality: "okay" },
        { label: "Send a short, account-specific sequence that leads with the trigger, the operational cost, and a low-friction discussion prompt", feedback: "Best approach. It respects the buyer's time, proves relevance, and makes the ask easier to say yes to without forcing a product conversation too early.", quality: "best" },
        { label: "Call first without emailing so you can create urgency live before they ignore you", feedback: "This can work if you truly have a sharp reason to call, but without some setup you risk sounding premature. Pairing smart written context with targeted calling is usually stronger.", quality: "good" },
      ],
      insight: "Outbound quality is not about writing longer emails. It is about reducing the distance between the buyer's world and the reason you are reaching out.",
    },
    deliverable: "A multi-threaded first-wave sequence for HarborPay with role-specific messaging and call prompts",
    mentorTip: "A great first email often sounds like a note from someone who did their homework, not a miniature brochure.",
    goalCheck: "Would a skeptical engineering leader believe you understand why their team might care right now?",
    boundaryLesson: "Do not overstate certainty. Lead with a sharp hypothesis, not a claim that you already know their internal reality better than they do.",
  },
  {
    id: 4,
    week: "Week 4",
    title: "The First Meeting",
    icon: Users,
    color: "#a16a1f",
    brief: "A Director of Reliability replies and agrees to a 30-minute meeting. You now need to turn interest into a real discovery path.",
    scenario:
      "The Director of Reliability, Priya, responds: 'Happy to compare notes. We are rethinking incident handoffs after some painful quarters.' That is a good signal, but not a deal yet.\n\nThe first meeting can either create clarity and next steps or collapse into a polite product tour that never earns a second conversation.",
    questionsToAsk: [
      "What outcome would make this first meeting useful for Priya?",
      "What happened in the 'painful quarters' and who felt it most directly?",
      "What have they already tried and why is the issue still unresolved?",
      "Who else becomes involved if this problem is truly important?",
      "What next step would prove the conversation is real rather than merely curious?",
    ],
    toolsToUse: [
      { name: "Gong", why: "Review strong first-call examples from top reps before you run the meeting" },
      { name: "Northstar discovery template", why: "Keep the meeting anchored around pain, impact, stakeholders, and urgency rather than product features" },
      { name: "Google Docs", why: "Capture live notes and tentative next steps you can turn into a recap immediately after the call" },
    ],
    decision: {
      question: "How do you open the first meeting?",
      options: [
        { label: "Start with a polished company overview so Priya understands who Northstar is before you ask questions", feedback: "This feels safe, but it burns the most valuable minutes before you know whether the issue is real. Buyers remember relevance faster than logos or slides.", quality: "okay" },
        { label: "Set an agenda, confirm why Priya took the meeting, and ask for context before bringing in product", feedback: "Exactly right. It creates alignment, earns trust, and protects the rest of the conversation from becoming a generic demo disguised as discovery.", quality: "best" },
        { label: "Jump straight into probing pain with no agenda so you can maximize time on discovery", feedback: "The instinct is good, but skipping the frame can make the call feel less controlled. A short agenda often increases candor because the buyer knows what the meeting is for.", quality: "good" },
      ],
      insight: "The first meeting is less about product and more about permission: permission to go deeper, permission to bring in other stakeholders, and permission to keep the process moving.",
    },
    deliverable: "A first-call note set with pain themes, early qualification signal, and a proposed second-step agenda",
    mentorTip: "Great discovery starts by lowering buyer defensiveness. Agenda, context, and calm control help people tell you the truth faster.",
    goalCheck: "Did the call end with a meaningful next step owned by both sides?",
    boundaryLesson: "Curiosity is not qualification. A good conversation is only valuable if it creates evidence that the deal deserves more time.",
  },
  {
    id: 5,
    week: "Week 5",
    title: "Discovery & Qualification",
    icon: MessageSquare,
    color: "#386a58",
    brief: "Priya agrees to a deeper session with her engineering manager and an operations lead. Now you need to qualify the deal honestly.",
    scenario:
      "The second conversation reveals incident fatigue, unclear handoffs between engineering and operations, and leadership pressure after two recent service disruptions. There is pain, but pain alone does not make a qualified opportunity.\n\nYou need to confirm how serious the problem is, what it costs, how the buying group thinks, and whether this will actually get prioritized.",
    questionsToAsk: [
      "What does a bad incident week cost in engineering time, customer risk, and leadership attention?",
      "Who owns this initiative internally if they decide to act?",
      "What has to be true before budget appears or gets reallocated?",
      "What technical or security concerns could kill momentum later if ignored now?",
      "How will the team decide whether doing nothing is acceptable for another quarter?",
    ],
    toolsToUse: [
      { name: "MEDDIC notes", why: "Structure what you know around pain, metrics, decision process, champions, and risk rather than trusting memory" },
      { name: "Gong scorecard", why: "Review whether you are asking deep enough questions or accepting surface pain too quickly" },
      { name: "Spreadsheet model", why: "Start translating operational pain into hours, incidents, customer impact, or escalation cost" },
    ],
    decision: {
      question: "What is the most important qualification move at this point?",
      options: [
        { label: "Create the opportunity immediately because multiple stakeholders are now engaged", feedback: "Stakeholder presence is encouraging, but it is not enough on its own. Opportunities created too early often pollute the forecast and hide weak qualification behind activity.", quality: "okay" },
        { label: "Quantify impact and decision process before you treat the deal as forecast-worthy pipeline", feedback: "Best choice. Qualification is about decision quality, not enthusiasm. Quantified pain and a credible buying path separate real pipeline from interesting conversations.", quality: "best" },
        { label: "Move to demo planning because the buyer has already admitted the current process is broken", feedback: "A demo may be the next step, but if you skip impact and decision process you will struggle later when budget, urgency, or ownership become ambiguous.", quality: "good" },
      ],
      insight: "Qualification is not about being pessimistic. It is about protecting time and forecast quality by demanding evidence before you emotionally commit to the deal.",
    },
    deliverable: "A qualification brief covering problem cost, stakeholders, timeline risk, and current MEDDIC confidence",
    mentorTip: "A deal becomes real when the buyer begins making internal decisions, not when they agree that the problem sounds important.",
    goalCheck: "Can you explain why this deal should exist in pipeline beyond 'they seemed interested'?",
    boundaryLesson: "Do not manufacture certainty to please management. Honest qualification earns more trust than optimistic fiction.",
  },
  {
    id: 6,
    week: "Week 6",
    title: "Multi-Thread the Deal",
    icon: Network,
    color: "#2f4f79",
    brief: "Priya looks promising, but you are still one-thread deep. If the deal depends on a single champion, it is fragile.",
    scenario:
      "You know Priya cares, but enterprise deals do not close because one smart operator likes the product. You need coverage across technical evaluators, the economic buyer, procurement, and the people who live with the workflow after launch.\n\nThe goal is not to spray meetings everywhere. It is to sequence the right stakeholder conversations before the deal hits its first political obstacle.",
    questionsToAsk: [
      "Who signs off on this category of spend or project priority?",
      "Who could quietly block this later: security, architecture, procurement, finance?",
      "What does Priya need internally to carry this forward credibly?",
      "Which stakeholder will care most about business risk versus workflow detail?",
      "What proof does each role need to move from curiosity to commitment?",
    ],
    toolsToUse: [
      { name: "LinkedIn Sales Navigator", why: "Map reporting lines and likely stakeholder relationships before you ask for intros" },
      { name: "Mutual stakeholder map", why: "Track who matters, what they care about, and where you still have exposure" },
      { name: "Gong snippets", why: "Reuse strong proof points from similar buyers for different stakeholder conversations" },
    ],
    decision: {
      question: "How do you approach multi-threading without undermining your champion?",
      options: [
        { label: "Go directly around Priya and email every likely stakeholder immediately so you control the narrative", feedback: "This may create coverage, but it also risks damaging trust with the person currently helping you. Multi-threading without coordination can look like political carelessness.", quality: "okay" },
        { label: "Co-create the stakeholder plan with Priya and explain why each conversation reduces deal risk", feedback: "Best approach. It protects the champion relationship while framing stakeholder expansion as a way to help the buying process succeed, not as a power move.", quality: "best" },
        { label: "Stay with Priya only until she asks for help bringing in others", feedback: "This preserves trust but leaves the deal exposed for too long. Strong reps gently create the case for broader access before risk shows up in the late stages.", quality: "good" },
      ],
      insight: "Multi-threading is not about more meetings. It is about reducing dependency risk by matching the right proof to the right stakeholder before urgency fades.",
    },
    deliverable: "A stakeholder map with roles, likely concerns, current access, and next intros required",
    mentorTip: "If you cannot say who the economic buyer is, the deal is still early no matter how many friendly meetings you have had.",
    goalCheck: "Are you still single-threaded, or do you have a credible path into technical, financial, and executive evaluation?",
    boundaryLesson: "Do not treat champions as gatekeepers to outmaneuver. Treat them as partners whose internal credibility you are trying to strengthen.",
  },
  {
    id: 7,
    week: "Week 7",
    title: "Demo Strategy",
    icon: Presentation,
    color: "#6d28d9",
    brief: "The buyer is ready to see the platform, but a generic demo will waste the opening you earned.",
    scenario:
      "You now have access to Priya, her engineering manager, and an operations lead. A solutions engineer can join one demo this week, but only if the meeting is worth it.\n\nYour job is to translate discovery into a buying conversation: what to show, what to skip, what each stakeholder must believe by the end, and how to avoid turning the session into a feature parade.",
    questionsToAsk: [
      "Which discovery themes must the demo prove, not merely mention?",
      "What is the buyer's current workflow and where does it break under pressure?",
      "Which stakeholder needs strategic confidence versus hands-on technical proof?",
      "What should the solutions engineer handle versus what should you keep in the commercial lane?",
      "What commitment do you want at the end of the demo: pilot, security review, MAP alignment, business case session?",
    ],
    toolsToUse: [
      { name: "Demo plan", why: "Sequence the story around buyer pain, workflow proof, and next-step ownership rather than product breadth" },
      { name: "Solutions engineer prep", why: "Align the technical narrative with the commercial narrative so the buyer hears one story" },
      { name: "Mutual agenda", why: "Share the demo structure in advance so the buyer knows the session is tailored, not canned" },
    ],
    decision: {
      question: "What demo format gives you the strongest chance of momentum?",
      options: [
        { label: "Run the standard company demo so the buyer sees the full platform and your SE can stay efficient", feedback: "Efficiency matters, but this often signals that the rep did not truly absorb discovery. Generic demos create polite interest and weak follow-through.", quality: "okay" },
        { label: "Tailor the demo around the buyer's three core workflow failures and define a clear post-demo decision path", feedback: "Exactly right. A tailored demo turns product into proof and gives the buying group a reason to keep moving after the meeting ends.", quality: "best" },
        { label: "Keep the demo mostly technical so engineering trusts the product before you return to value later", feedback: "Technical proof is important, but if you lose the business story the deal can become a technical evaluation with no commercial urgency.", quality: "good" },
      ],
      insight: "The best demos do not prove that the product is impressive. They prove that the product is relevant to the buyer's pain, workflow, and risk.",
    },
    deliverable: "A demo strategy doc with audience, buyer pains, proof points, technical responsibilities, and desired next step",
    mentorTip: "Every feature you show should answer an explicit discovery insight. If it does not, it is probably clutter.",
    goalCheck: "Can each stakeholder leave the demo knowing why change is worth the effort, not just what the software does?",
    boundaryLesson: "Do not use the SE as a substitute for commercial clarity. Technical depth helps, but it cannot rescue a weak deal narrative.",
  },
  {
    id: 8,
    week: "Week 8",
    title: "Business Case & Champion Enablement",
    icon: DollarSign,
    color: "#a16a1f",
    brief: "The demo landed well. Now the buyer needs help selling the project internally.",
    scenario:
      "Priya says the team can see the fit, but leadership will ask for a stronger business argument. This is where many deals slow down. Reps keep talking about product while buyers need a case for action.\n\nYou need to equip Priya with a quantified business case and enough internal language to advocate when you are not in the room.",
    questionsToAsk: [
      "What metrics would leadership actually care about: downtime cost, escalation time, burnout, compliance exposure, customer impact?",
      "Which assumptions can the buyer validate internally without overcomplicating the model?",
      "What risks does leadership associate with taking action versus waiting another quarter?",
      "What objections is Priya likely to hear when she socializes this internally?",
      "What materials would make the internal conversation easier: ROI summary, workflow diagram, peer proof, implementation scope?",
    ],
    toolsToUse: [
      { name: "ROI model", why: "Turn incident pain into financial or operational impact that leadership can compare against cost" },
      { name: "Champion deck", why: "Give your champion a concise narrative and proof points for internal conversations you will not attend" },
      { name: "Customer proof", why: "Anchor the business case in similar customers who achieved measurable outcomes" },
    ],
    decision: {
      question: "How do you help Priya build internal momentum?",
      options: [
        { label: "Send a generic ROI calculator and let her adapt it because she knows the internal numbers better than you", feedback: "This under-supports the buyer at the exact moment they need help. Generic calculators create work instead of momentum.", quality: "okay" },
        { label: "Co-build a simple business case with Priya, using credible assumptions and a short champion pack she can reuse internally", feedback: "Best move. It makes the buying work easier, keeps the numbers grounded, and helps your champion carry the case in rooms where you are absent.", quality: "best" },
        { label: "Push for a pricing conversation immediately so the buyer is forced to discuss budget and priority sooner", feedback: "Budget matters, but jumping there too early can expose price before the value case is strong enough to defend it.", quality: "good" },
      ],
      insight: "Champion enablement is a real selling skill. Deals often slow down not because the buyer disagrees, but because they cannot yet explain the project persuasively to others.",
    },
    deliverable: "A buyer-ready business case summary and champion pack with quantified outcomes, proof, and internal talking points",
    mentorTip: "If your champion has to translate your case from scratch, you have left too much of the deal burden on the buyer.",
    goalCheck: "Could Priya walk into a leadership meeting tomorrow and explain why this project matters in business terms?",
    boundaryLesson: "Avoid false precision. Credible ranges and well-explained assumptions are better than invented certainty.",
  },
  {
    id: 9,
    week: "Week 9",
    title: "Mutual Action Plan",
    icon: Map,
    color: "#386a58",
    brief: "The deal has momentum, but it still needs structure or it will drift into 'we'll come back to this.'",
    scenario:
      "You have good energy, multiple stakeholders, and a believable business case. This is exactly when reps start getting sloppy because the deal feels real enough to relax.\n\nInstead, you need a written path to decision: evaluation steps, owners, dates, dependencies, and what 'done' means at each point.",
    questionsToAsk: [
      "What must happen before the buyer can say yes with confidence?",
      "Which internal steps are already known: security review, procurement, legal, executive approval, pilot criteria?",
      "Where has the buyer's team missed deadlines on projects like this before?",
      "What date actually matters to the business, and what makes it important?",
      "What would cause the plan to slip even if everyone remains positive on the deal?",
    ],
    toolsToUse: [
      { name: "Mutual action plan template", why: "Translate goodwill into concrete commitments, dates, and responsibilities" },
      { name: "Shared doc", why: "Give both sides a single place to track movement instead of relying on memory from calls" },
      { name: "Follow-up recap", why: "Lock in the plan immediately after the meeting while alignment is fresh" },
    ],
    decision: {
      question: "How formal should the action plan be?",
      options: [
        { label: "Keep it verbal for now so the deal does not feel overly process-heavy or high-pressure", feedback: "Verbal next steps sound collaborative, but they decay fast. Ambiguity is the friend of stalled deals.", quality: "okay" },
        { label: "Make the plan explicit, shared, and date-bound so both sides can manage risk before it becomes delay", feedback: "Correct. A mutual action plan is not bureaucracy. It is clarity that protects momentum and surfaces blockers while there is still time to solve them.", quality: "best" },
        { label: "Create an internal-only action plan for yourself and wait to share details later if the buyer asks", feedback: "Internal planning helps, but it misses the point. A mutual plan works because the buyer also sees, edits, and owns it.", quality: "good" },
      ],
      insight: "Momentum is rarely lost in one dramatic moment. It usually leaks away through vague ownership, unspoken dependencies, and next steps that were never real.",
    },
    deliverable: "A shared mutual action plan with dates, owners, decision milestones, and known risk points",
    mentorTip: "The MAP should make the buying process easier for the customer, not merely easier for your CRM notes.",
    goalCheck: "Can both sides point to a named decision path rather than just saying the deal is progressing well?",
    boundaryLesson: "Do not confuse buyer politeness with buyer commitment. Commitment has owners, dates, and evidence.",
  },
  {
    id: 10,
    week: "Week 10",
    title: "Security, Legal & Procurement",
    icon: Shield,
    color: "#2f4f79",
    brief: "The commercial case is strong. Now the operational and legal machine gets involved.",
    scenario:
      "Security sends a questionnaire. Procurement asks about terms. Legal wants to review the paper. The buyer still wants to move, but this is the phase where weak rep control shows up fast.\n\nYou need to keep the deal moving on parallel tracks rather than letting each internal function become a reason for delay.",
    questionsToAsk: [
      "Who inside the buyer organization owns security, legal, and procurement coordination?",
      "Which requests are true blockers versus standard process that can run in parallel?",
      "What internal support do you need from your own team right now?",
      "What parts of the MAP become critical during paper process?",
      "How will you maintain executive and champion attention while these workstreams run?",
    ],
    toolsToUse: [
      { name: "Security response library", why: "Speed up questionnaire turnaround without inventing answers mid-deal" },
      { name: "Deal desk process", why: "Coordinate legal, pricing, and approval decisions on your side before they become urgent" },
      { name: "MAP tracker", why: "Keep every dependency visible while multiple workstreams progress at once" },
    ],
    decision: {
      question: "What is the right rep posture once the deal enters security and procurement?",
      options: [
        { label: "Step back and let internal teams handle it because the technical and legal specialists own this phase", feedback: "This is one of the most common late-stage mistakes. Specialists are essential, but if the AE disappears, momentum and context disappear with them.", quality: "okay" },
        { label: "Run the process actively: keep owners aligned, unblock dependencies, and maintain champion and executive engagement in parallel", feedback: "Best approach. Late-stage control is about orchestration, not personal heroics. You keep the threads moving together.", quality: "best" },
        { label: "Push hard on the buyer every few days so they feel urgency even while the paper process drags", feedback: "Urgency matters, but pressure without useful coordination often makes the rep feel noisy rather than helpful.", quality: "good" },
      ],
      insight: "Late-stage deals are operational projects. The AE stays accountable for momentum even when specialists enter the room.",
    },
    deliverable: "A late-stage workstream tracker covering security, legal, procurement, owners, blockers, and next decisions",
    mentorTip: "The rep who can summarize the exact state of every late-stage thread becomes hard to displace from the deal.",
    goalCheck: "Do you know which open item is actually critical path versus merely administratively incomplete?",
    boundaryLesson: "Never bluff technical, legal, or security answers. Fast honesty beats confident inaccuracy every time.",
  },
  {
    id: 11,
    week: "Week 11",
    title: "Negotiation & Forecast",
    icon: Handshake,
    color: "#6d28d9",
    brief: "The buyer asks for pricing movement and leadership wants to know whether this deal belongs in commit.",
    scenario:
      "HarborPay is serious, but now comes the hard commercial moment: pricing pressure, final stakeholder nerves, and a forecast call where your manager wants clear judgment, not hopeful storytelling.\n\nYou need to negotiate without collapsing value and forecast without lying to yourself or leadership.",
    questionsToAsk: [
      "What is the buyer really asking for: lower price, lower risk, easier approval, or more flexibility?",
      "What can you trade that preserves value: term length, scope, start date, referenceability, payment timing?",
      "What evidence puts this in commit versus best case right now?",
      "What is still unresolved in the MAP that should influence forecast confidence?",
      "If this slips, what will the real reason be?",
    ],
    toolsToUse: [
      { name: "Pricing guardrails", why: "Know what you can trade before emotion takes over in the negotiation" },
      { name: "Forecast notes", why: "Document evidence for commit, best case, and risk so the manager hears reasoning instead of optimism" },
      { name: "Deal desk", why: "Get approvals aligned before the buyer assumes every requested concession is available" },
    ],
    decision: {
      question: "The buyer asks for a 20% discount to get the deal through. What is your best move?",
      options: [
        { label: "Offer the discount quickly to protect momentum and reduce the chance of late-stage delay", feedback: "This protects short-term comfort but weakens value and teaches the buyer that pressure gets concessions without reciprocal commitment.", quality: "okay" },
        { label: "Trade, do not give: protect price where possible and exchange any concession for concrete commercial movement", feedback: "Best approach. Negotiation is about preserving value while helping the buyer get to yes. Concessions without trade usually create weaker deals and weaker future behavior.", quality: "best" },
        { label: "Refuse any movement at all so the buyer understands the product's value", feedback: "Holding value is important, but inflexibility can ignore real procurement dynamics. Strong negotiation is controlled movement, not stubbornness for its own sake.", quality: "good" },
      ],
      insight: "Forecast honesty and negotiation discipline are linked. Reps who panic in negotiation often over-forecast because they cannot bear uncertainty.",
    },
    deliverable: "A negotiation plan with trade options, walk-away lines, and a written forecast rationale",
    mentorTip: "Commit is a statement of evidence, not confidence. If you cannot explain why the deal is commit, it probably is not.",
    goalCheck: "Could your manager repeat your forecast logic to the VP and sound credible?",
    boundaryLesson: "Do not let quarter pressure turn forecast into fiction. Strong operators protect trust first, then the number.",
  },
  {
    id: 12,
    week: "Week 12",
    title: "Close, Handoff & Expansion",
    icon: TrendingUp,
    color: "#a16a1f",
    brief: "The deal is ready to close. Now prove you can finish professionally and set up future revenue, not just a signature.",
    scenario:
      "HarborPay signs. Most new reps celebrate and vanish. Stronger AEs use the close to deepen trust, protect onboarding, and create the conditions for future expansion.\n\nThis is where you prove you are building durable revenue, not just chasing quarter-end dopamine.",
    questionsToAsk: [
      "What commitments were made during the deal that onboarding needs to know immediately?",
      "Who owns executive alignment during implementation and early value realization?",
      "What success markers in the first 90 days would make future expansion plausible?",
      "Which stakeholders should remain engaged post-signature so the relationship does not collapse to one thread again?",
      "What did this deal teach you about the territory, ICP, and future forecast quality?",
    ],
    toolsToUse: [
      { name: "Closed-won handoff template", why: "Transfer discovery context, risks, commitments, and success criteria cleanly to onboarding and CS" },
      { name: "Executive recap", why: "Reinforce alignment, implementation expectations, and the first-value milestones at the moment of signature" },
      { name: "Expansion map", why: "Capture adjacent teams, use cases, and timing windows while context is still fresh" },
    ],
    decision: {
      question: "What is the most senior way to handle the first week after signature?",
      options: [
        { label: "Celebrate the win, mark it closed-won, and move fully back to pipeline generation because that is what the next quarter depends on", feedback: "You do need to keep selling, but abandoning handoff quality creates preventable churn risk and destroys future expansion leverage.", quality: "okay" },
        { label: "Run a disciplined handoff, confirm success criteria, and capture expansion paths while the buying context is still vivid", feedback: "Best approach. It protects the customer experience, builds internal trust, and turns one win into a platform for durable revenue.", quality: "best" },
        { label: "Let customer success take over immediately because post-sale is their world now", feedback: "Partnership with CS is correct, but full detachment is not. Strong AEs remain accountable for a clean transition and thoughtful expansion positioning.", quality: "good" },
      ],
      insight: "The strongest deals feel coherent before and after signature. Clean handoff is part of good selling, not an optional courtesy.",
    },
    deliverable: "A closed-won handoff pack with success criteria, risk notes, executive recap, and expansion hypotheses",
    mentorTip: "Your reputation compounds when implementation teams say, 'This rep set us up to win,' not when they say, 'We had to rediscover everything after close.'",
    goalCheck: "Have you created the conditions for adoption, executive confidence, and future expansion rather than just a booked number?",
    boundaryLesson: "Closed-won is not the end of accountability. It is the handoff from one kind of ownership to another.",
  },
]

/* ═══════════════════════════════════════════════════
   PERSISTENCE
═══════════════════════════════════════════════════ */
const STORAGE_KEY = "sales-ae-sim-progress-v2"

function loadProgress(): Record<number, number> {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  } catch {
    return {}
  }
}

function saveProgress(p: Record<number, number>) {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
}

/* ═══════════════════════════════════════════════════
   JOURNEY MAP SVG
═══════════════════════════════════════════════════ */
function JourneyMap({ stages, activeStage, completedStages, onSelect }: {
  stages: Stage[]
  activeStage: number
  completedStages: Set<number>
  onSelect: (id: number) => void
}) {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)
  const nodePositions = stages.map((_, i) => ({
    x: 50 + Math.sin(i * 0.8) * 28,
    y: 8 + i * (84 / (stages.length - 1)),
  }))
  const previewStage = stages.find((stage) => stage.id === (hoveredStage ?? activeStage)) ?? stages[0]

  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="rounded-[18px] border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_rgba(56,106,88,0.06)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-editorial-green mb-2">
            {hoveredStage !== null ? "Hovered Stage Preview" : "Current Stage Preview"}
          </p>
          <h3 className="text-lg font-serif font-bold">
            {previewStage.week} · {previewStage.title}
          </h3>
          <p className="text-sm text-editorial-muted leading-relaxed mt-2">
            {previewStage.brief}
          </p>
          <p className="text-xs text-editorial-muted mt-3">
            <span className="font-semibold text-editorial-ink">You’ll be expected to leave with:</span>{" "}
            {previewStage.deliverable}
          </p>
        </div>

        <div className="rounded-[18px] border border-white/70 bg-white/75 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-editorial-blue mb-2">
            How To Read The Map
          </p>
          <div className="space-y-2 text-sm text-editorial-muted">
            <p><span className="font-semibold text-editorial-ink">Hover</span> any node for a preview.</p>
            <p><span className="font-semibold text-editorial-ink">Click</span> an unlocked week to open it.</p>
            <p><span className="font-semibold text-editorial-ink">Answer</span> the decision point to unlock the next stage.</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-5xl" style={{ aspectRatio: "1/1.75" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {nodePositions.map((pos, i) => {
            if (i === 0) return null
            const prev = nodePositions[i - 1]
            const midY = (prev.y + pos.y) / 2
            const isCompleted = completedStages.has(stages[i - 1].id)
            return (
              <motion.path
                key={`path-${i}`}
                d={`M ${prev.x} ${prev.y} C ${prev.x} ${midY}, ${pos.x} ${midY}, ${pos.x} ${pos.y}`}
                fill="none"
                stroke={isCompleted ? "#386a58" : "#e5e5e5"}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray={isCompleted ? "none" : "1.5 1"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              />
            )
          })}

          {nodePositions.map((pos, i) => {
            const stage = stages[i]
            const isCompleted = completedStages.has(stage.id)
            const isActive = activeStage === stage.id
            const isLocked = !isCompleted && stage.id > 1 && !completedStages.has(stage.id - 1) && activeStage !== stage.id
            const canAccess = !isLocked

            return (
              <g key={stage.id}>
                <title>{`${stage.week}: ${stage.title} — ${stage.brief}`}</title>

                {isActive && (
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="5.4"
                    fill="none"
                    stroke={stage.color}
                    strokeWidth="0.45"
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? "4.3" : "3.7"}
                  fill={isCompleted ? stage.color : isActive ? stage.color : isLocked ? "#e5e5e5" : "#f7f3ea"}
                  stroke={isCompleted || isActive ? stage.color : isLocked ? "#d4d4d4" : stage.color}
                  strokeWidth={isActive ? "0.65" : "0.5"}
                  className={cn(canAccess && "cursor-pointer")}
                  onClick={() => canAccess && onSelect(stage.id)}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  whileHover={canAccess ? { scale: 1.15 } : {}}
                  whileTap={canAccess ? { scale: 0.95 } : {}}
                  style={isActive ? { filter: `drop-shadow(0 0 4px ${stage.color}40)` } : {}}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: i * 0.06 }}
                />

                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  fontSize="2.8"
                  fill={isCompleted || isActive ? "white" : isLocked ? "#a3a3a3" : stage.color}
                  className="pointer-events-none select-none"
                >
                  {isCompleted ? "✓" : isLocked ? "🔒" : stage.id}
                </text>

                <text
                  x={pos.x + (i % 2 === 0 ? -5 : 5)}
                  y={pos.y + 0.9}
                  textAnchor={i % 2 === 0 ? "end" : "start"}
                  fontSize="2.2"
                  fill={isActive ? "#1d2126" : "#65655f"}
                  fontWeight={isActive ? "600" : "400"}
                  className="pointer-events-none select-none"
                >
                  {stage.title}
                </text>
                <text
                  x={pos.x + (i % 2 === 0 ? -5 : 5)}
                  y={pos.y + 3.5}
                  textAnchor={i % 2 === 0 ? "end" : "start"}
                  fontSize="1.45"
                  fill="#a3a3a3"
                  className="pointer-events-none select-none"
                >
                  {stage.week}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   STAGE DETAIL PANEL
═══════════════════════════════════════════════════ */
function StageDetail({ stage, onDecision, selectedChoice, onNext, onPrev, isFirst, isLast, isCompleted }: {
  stage: Stage
  onDecision: (idx: number) => void
  selectedChoice: number | null
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
  isCompleted: boolean
}) {
  const Icon = stage.icon

  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-[12px]"
            style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-muted">{stage.week}</p>
            <h2 className="text-2xl font-bold font-serif">{stage.title}</h2>
          </div>
          {isCompleted && (
            <Badge className="ml-auto bg-editorial-green-soft text-editorial-green border-transparent">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
            </Badge>
          )}
        </div>
        <p className="text-editorial-muted leading-relaxed italic">{stage.brief}</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Eye className="h-4 w-4 text-editorial-green" /> The Situation
          </h3>
          {stage.scenario.split("\n\n").map((p, i) => (
            <p key={i} className="text-sm text-editorial-muted leading-relaxed mb-3 last:mb-0">{p}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <HelpCircle className="h-4 w-4 text-editorial-blue" /> Questions You Should Be Asking
          </h3>
          <ul className="space-y-2">
            {stage.questionsToAsk.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <MessageSquare className="h-3.5 w-3.5 text-editorial-blue mt-0.5 shrink-0" />
                <span className="text-editorial-muted">{q}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <Wrench className="h-4 w-4 text-editorial-amber" /> Tools for This Stage
          </h3>
          <div className="space-y-3">
            {stage.toolsToUse.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0 mt-0.5">{t.name}</Badge>
                <p className="text-sm text-editorial-muted">{t.why}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-editorial-amber/30 bg-editorial-amber-soft/20">
        <CardContent className="p-5 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-editorial-amber" /> Decision Point
          </h3>
          <p className="text-sm font-medium">{stage.decision.question}</p>

          {selectedChoice === null && (
            <div className="rounded-[14px] border border-editorial-blue/15 bg-white/80 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-editorial-blue mb-1">
                To Unlock The Next Week
              </p>
              <p className="text-sm text-editorial-muted leading-relaxed">
                Choose one answer below. Once you answer this decision point, you can move forward to the next stage.
              </p>
            </div>
          )}

          <div className="space-y-2">
            {stage.decision.options.map((opt, i) => {
              const isSelected = selectedChoice === i
              const showFeedback = selectedChoice !== null
              const qualityColor = opt.quality === "best" ? "border-editorial-green bg-editorial-green-soft/40" : opt.quality === "good" ? "border-editorial-blue bg-editorial-blue-soft/40" : "border-editorial-amber bg-editorial-amber-soft/40"
              const qualityLabel = opt.quality === "best" ? "Best approach" : opt.quality === "good" ? "Good thinking" : "Common mistake"

              return (
                <motion.button
                  key={i}
                  onClick={() => onDecision(i)}
                  disabled={showFeedback && !isSelected}
                  className={cn(
                    "w-full text-left rounded-[14px] border-2 p-4 transition-all duration-200",
                    isSelected && showFeedback ? qualityColor : "border-transparent bg-white/80 hover:bg-white hover:border-editorial-ink/10",
                    showFeedback && !isSelected && "opacity-40"
                  )}
                  whileHover={!showFeedback ? { scale: 1.01 } : {}}
                  whileTap={!showFeedback ? { scale: 0.99 } : {}}
                >
                  <p className="text-sm font-medium">{opt.label}</p>
                  {isSelected && showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-3 border-t border-current/10"
                    >
                      <Badge className="mb-2 text-[10px]">{qualityLabel}</Badge>
                      <p className="text-xs text-editorial-muted leading-relaxed">{opt.feedback}</p>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {selectedChoice !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[14px] bg-white/80 p-4 border border-editorial-ink/5"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Lightbulb className="h-3.5 w-3.5 text-editorial-amber" />
                <h4 className="text-xs font-medium uppercase tracking-[0.12em] text-editorial-amber">Key Insight</h4>
              </div>
              <p className="text-xs text-editorial-muted leading-relaxed">{stage.decision.insight}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-editorial-green" /> Your Deliverable
          </h3>
          <p className="text-sm text-editorial-muted">{stage.deliverable}</p>
        </CardContent>
      </Card>

      <Card className="border-editorial-green/20 bg-editorial-green-soft/30">
        <CardContent className="p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4 text-editorial-green" />
            <h3 className="text-sm font-semibold text-editorial-green">Mentor Tip</h3>
          </div>
          <p className="text-sm text-editorial-muted leading-relaxed">{stage.mentorTip}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-editorial-blue" /> Goal Check
          </h3>
          <p className="text-sm text-editorial-muted">{stage.goalCheck}</p>
        </CardContent>
      </Card>

      <Card className="border-editorial-amber/20 bg-editorial-amber-soft/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="h-4 w-4 text-editorial-amber" />
            <h3 className="text-sm font-semibold text-editorial-amber">Know Your Boundaries</h3>
          </div>
          <p className="text-sm text-editorial-muted leading-relaxed">{stage.boundaryLesson}</p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-1.5"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        {selectedChoice !== null && (
          <Button
            size="sm"
            onClick={onNext}
            className="flex items-center gap-1.5 bg-editorial-green hover:bg-editorial-green/90"
          >
            {isLast ? "Complete Simulation" : "Next Stage"} <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export function SimulationClient() {
  const [activeStage, setActiveStage] = useState(1)
  const [choices, setChoices] = useState<Record<number, number>>({})
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set())
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const saved = loadProgress()
    if (Object.keys(saved).length > 0) {
      setChoices(saved)
      const completed = new Set(Object.keys(saved).map(Number))
      setCompletedStages(completed)
      const firstIncomplete = STAGES.find((s) => !completed.has(s.id))
      if (firstIncomplete) setActiveStage(firstIncomplete.id)
      else setActiveStage(STAGES.length)
    }
  }, [])

  const handleDecision = useCallback((stageId: number, choiceIdx: number) => {
    setChoices((prev) => ({ ...prev, [stageId]: choiceIdx }))
  }, [])

  const handleNext = useCallback(() => {
    setCompletedStages((prev) => {
      const next = new Set(prev)
      next.add(activeStage)
      return next
    })
    saveProgress({ ...choices })
    if (activeStage < STAGES.length) {
      setActiveStage(activeStage + 1)
    }
  }, [activeStage, choices])

  const handlePrev = useCallback(() => {
    if (activeStage > 1) setActiveStage(activeStage - 1)
  }, [activeStage])

  const handleReset = useCallback(() => {
    setChoices({})
    setCompletedStages(new Set())
    setActiveStage(1)
    setShowIntro(true)
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY)
  }, [])

  const currentStage = STAGES.find((s) => s.id === activeStage)
  const progressPct = (completedStages.size / STAGES.length) * 100

  return (
    <div className="container py-10 space-y-8">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-editorial-green-soft text-editorial-green border-transparent text-xs">Interactive Simulation</Badge>
          {completedStages.size > 0 && (
            <Badge variant="outline" className="text-xs">{completedStages.size}/{STAGES.length} completed</Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif">Welcome to {COMPANY.name}</h1>
        <p className="text-editorial-muted mt-2 leading-relaxed">
          You have just joined as an Account Executive in a new ANZ patch. One territory.
          One strategic deal to navigate. Build pipeline, run a disciplined enterprise motion,
          and prove you can carry a complex SaaS opportunity from first signal to clean handoff.
        </p>
      </div>

      <div className="space-y-2">
        <div className="h-2 rounded-full bg-editorial-canvas overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-editorial-green"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-[10px] uppercase tracking-[0.18em] text-editorial-muted">
          <span>Territory</span>
          <span>Evaluation</span>
          <span>Closed Won</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6"
          >
            <section className="overflow-hidden rounded-[32px] border border-editorial-green/15 bg-[radial-gradient(circle_at_top,_rgba(56,106,88,0.14),_rgba(255,255,255,0.96)_42%,_rgba(247,243,234,0.92)_100%)] px-6 py-8 sm:px-10 sm:py-12 text-center shadow-[0_24px_80px_rgba(56,106,88,0.08)]">
              <Badge className="bg-editorial-green-soft text-editorial-green border-transparent text-xs mb-4">
                Northstar Cloud Simulation
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight max-w-4xl mx-auto">
                Land the deal. Control the journey. Earn the expansion.
              </h2>
              <p className="text-editorial-muted leading-relaxed mt-4 max-w-3xl mx-auto text-sm sm:text-base">
                You’re the new ANZ AE at {COMPANY.name}, a Sydney-based B2B SaaS company selling workflow automation and incident-response orchestration to reliability, operations, platform, and security teams. Your mission is to build the patch, win HarborPay, and prove you can run a disciplined enterprise motion from first signal to clean handoff.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-editorial-muted">
                <Badge variant="outline" className="bg-white/80">Mid-market + enterprise motion</Badge>
                <Badge variant="outline" className="bg-white/80">Shared solutions engineer</Badge>
                <Badge variant="outline" className="bg-white/80">Business case + procurement</Badge>
                <Badge variant="outline" className="bg-white/80">12-week guided journey</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8 max-w-3xl mx-auto">
                {COMPANY.stats.map((stat) => (
                  <div key={stat.label} className="rounded-[14px] border border-white/70 bg-white/80 p-4 text-left">
                    <p className="text-lg font-bold font-serif">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <Card className="overflow-hidden border-editorial-green/15 bg-[radial-gradient(circle_at_top,_rgba(56,106,88,0.1),_rgba(255,255,255,0.95)_45%,_rgba(247,243,234,0.92)_100%)]">
              <CardContent className="p-5 sm:p-8 space-y-6">
                <div className="max-w-3xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-editorial-green mb-2">
                    Simulation Overview
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                    See the whole revenue journey before you step into it
                  </h2>
                  <p className="text-editorial-muted mt-3 leading-relaxed">
                    This map shows the full 12-stage path from territory handoff to close, handoff, and expansion. Hover any point for a preview, click an unlocked stage to jump in, and use the weekly decisions to move the story forward.
                  </p>
                </div>

                <div className="rounded-[28px] border border-white/70 bg-white/70 p-4 sm:p-6 shadow-[0_20px_60px_rgba(56,106,88,0.08)]">
                  <JourneyMap
                    stages={STAGES}
                    activeStage={activeStage}
                    completedStages={completedStages}
                    onSelect={(id) => {
                      setActiveStage(id)
                      setShowIntro(false)
                    }}
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-[16px] border border-editorial-ink/8 bg-white/80 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-editorial-blue mb-2">What You’ll Practice</p>
                    <p className="text-sm text-editorial-muted leading-relaxed">
                      Prioritisation, discovery, multi-threading, demo strategy, business case work, negotiation, and clean post-sale handoff.
                    </p>
                  </div>
                  <div className="rounded-[16px] border border-editorial-ink/8 bg-white/80 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-editorial-amber mb-2">How Progress Works</p>
                    <p className="text-sm text-editorial-muted leading-relaxed">
                      Each week ends with a decision point. Answer it to unlock the next stage and keep your AE journey moving.
                    </p>
                  </div>
                  <div className="rounded-[16px] border border-editorial-ink/8 bg-white/80 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-editorial-green mb-2">What Good Looks Like</p>
                    <p className="text-sm text-editorial-muted leading-relaxed">
                      You’re not trying to click through. You’re learning what strong judgment looks like at each step of a real B2B SaaS motion.
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    onClick={() => setShowIntro(false)}
                    className="bg-editorial-green hover:bg-editorial-green/90 text-white px-8"
                  >
                    {completedStages.size > 0 ? `Resume ${currentStage?.week ?? "Simulation"}` : "Start Territory Handoff"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <div className="space-y-8">
          <div className="flex justify-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowIntro(true)}
              className="text-editorial-muted"
            >
              <ChevronLeft className="h-4 w-4 mr-1.5" />
              Back to Simulation Overview
            </Button>
          </div>

          <Card className="overflow-hidden border-editorial-green/15 bg-[radial-gradient(circle_at_top,_rgba(56,106,88,0.1),_rgba(255,255,255,0.95)_45%,_rgba(247,243,234,0.9)_100%)]">
            <CardContent className="p-5 sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-6">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-editorial-green mb-2">
                    12-stage AE journey map
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                    From territory handoff to clean expansion
                  </h2>
                  <p className="text-editorial-muted mt-3 leading-relaxed">
                    This is the full deal path, not just Week 1. Click any unlocked node to revisit it, and answer the current decision point below to unlock the next week in the sequence.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-[14px] border border-editorial-ink/8 bg-white/80 px-4 py-3">
                    <p className="text-lg font-bold font-serif">{activeStage}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-editorial-muted">Current Week</p>
                  </div>
                  <div className="rounded-[14px] border border-editorial-ink/8 bg-white/80 px-4 py-3">
                    <p className="text-lg font-bold font-serif">{completedStages.size}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-editorial-muted">Completed</p>
                  </div>
                  <div className="rounded-[14px] border border-editorial-ink/8 bg-white/80 px-4 py-3">
                    <p className="text-lg font-bold font-serif">{STAGES.length}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-editorial-muted">Total Weeks</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/70 bg-white/70 p-4 sm:p-6 shadow-[0_20px_60px_rgba(56,106,88,0.08)]">
                <JourneyMap
                  stages={STAGES}
                  activeStage={activeStage}
                  completedStages={completedStages}
                  onSelect={setActiveStage}
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-editorial-muted leading-relaxed">
                  {choices[activeStage] === undefined
                    ? "Choose an answer in the Decision Point below to unlock the next week."
                    : "This stage is answered. Use Next Stage below to keep moving, or click another unlocked week in the map."}
                </p>
                {completedStages.size > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-xs text-editorial-muted self-start sm:self-auto"
                  >
                    <RotateCcw className="h-3 w-3 mr-1.5" /> Reset Progress
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mx-auto max-w-5xl min-w-0">
            <AnimatePresence mode="wait">
              {currentStage && (
                <StageDetail
                  key={currentStage.id}
                  stage={currentStage}
                  onDecision={(idx) => handleDecision(currentStage.id, idx)}
                  selectedChoice={choices[currentStage.id] ?? null}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  isFirst={currentStage.id === 1}
                  isLast={currentStage.id === STAGES.length}
                  isCompleted={completedStages.has(currentStage.id)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
