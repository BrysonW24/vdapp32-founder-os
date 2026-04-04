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
    title: "Sales Mindset & Fundamentals",
    subtitle: "What sales actually is — and the value creation mindset that separates the best",
    icon: Sprout,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    feeling: "Overwhelmed but curious. You might think sales is about being pushy or 'always be closing.' It's not. You're discovering that great sales is about understanding people, solving real problems, and creating value. Terms like ACV, ARR, and MQL sound foreign. That's completely normal — every top closer started here.",
    whatYouKnow: [
      "Sales is not about persuasion — it's about helping buyers make confident decisions",
      "The difference between transactional sales and consultative/solution selling",
      "How B2B sales cycles work: prospecting, discovery, demo, proposal, negotiation, close",
      "Why activity metrics matter early on — calls, emails, meetings booked — before you can optimise for outcomes",
    ],
    whatYouDo: [
      "Read through the Sales Foundations modules — absorb the shape of the sales process, don't memorise scripts",
      "Shadow 3-5 sales calls (discovery, demo, negotiation) and take detailed notes on structure",
      "Set up your CRM (HubSpot or Salesforce) and learn to log activities properly from day one",
      "Write your first cold email and cold call script — they'll be rough, and that's fine",
    ],
    toolsYouUse: ["HubSpot or Salesforce (CRM)", "LinkedIn (research)", "Notion (call notes)", "Gong or Chorus (call recordings)"],
    mindsetShift: "Stop thinking 'I need to learn to sell.' Start thinking 'I need to learn to help buyers buy.' The best AEs don't push — they guide. Your job is to understand someone's problem better than they understand it themselves, then show them a path forward.",
    proofOfCompetence: "You can explain the B2B sales cycle to a friend in 60 seconds. You can describe the difference between a lead, an opportunity, and a closed deal. You've listened to 5+ recorded sales calls and can identify the discovery, pitch, and close phases.",
    aiSkill: "Use ChatGPT or Claude to explain sales concepts you don't understand. Ask: 'Explain MEDDIC like I'm starting my first AE role.' AI is your 24/7 sales coach right now — use it to debrief after every call.",
    commonStuck: "Feeling like sales is 'not for you' because you're introverted or don't like being pushy.",
    howToUnstick: "The best salespeople are curious listeners, not loud talkers. Introversion is a superpower in sales — you naturally ask questions and listen to answers. Sales is a skill, not a personality type. Focus on understanding, not performing.",
  },
  {
    id: "month-2",
    month: "Month 2",
    duration: "Weeks 5–8",
    title: "Understanding Buyers",
    subtitle: "Buyer psychology, stakeholder mapping, and how decisions actually get made",
    icon: Users,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    feeling: "Eye-opening. You start realising that deals aren't won or lost based on your product — they're won or lost based on how well you understand the buyer's world. You begin to see that every deal has multiple stakeholders, hidden agendas, and internal politics you need to navigate.",
    whatYouKnow: [
      "Buyers don't buy features — they buy outcomes and the removal of pain",
      "Every B2B deal has a champion, an economic buyer, a technical evaluator, and often a blocker",
      "The buyer's journey has three stages: problem awareness, solution exploration, and decision/commitment",
      "Status quo bias is your biggest competitor — most deals are lost to 'do nothing,' not to a rival vendor",
      "Procurement, legal, and IT all have different concerns and different definitions of 'value'",
    ],
    whatYouDo: [
      "Build a stakeholder map for a real or practice deal — identify champion, economic buyer, and potential blockers",
      "Research 10 target accounts deeply: org structure, recent news, likely pain points, tech stack",
      "Practice writing personalised value hypotheses: 'Based on [trigger], I believe [company] may be struggling with [problem]'",
      "Role-play a discovery call with a colleague where you ask zero product questions and only explore the buyer's world",
      "Study 3 lost deals in your CRM and identify where the buyer's decision process broke down",
    ],
    toolsYouUse: ["LinkedIn Sales Navigator (stakeholder research)", "ZoomInfo or Apollo (contact data)", "Gong (analysing buyer language)", "Miro or FigJam (stakeholder mapping)"],
    mindsetShift: "Stop thinking about what YOU want to say. Start thinking about what the BUYER needs to hear. Every interaction should be framed from their perspective: their goals, their risks, their internal politics. If you can't articulate why this matters to them in their language, you haven't done enough research.",
    proofOfCompetence: "You can map the buying committee for any deal and explain each stakeholder's priorities and concerns. You can describe the difference between a champion and a coach. You've written 5 personalised value hypotheses that reference real business triggers.",
    aiSkill: "Use AI to research accounts before calls. Prompt: 'I'm selling [product] to [company]. Based on their recent [news/earnings/job postings], what are 3 likely business challenges they face and how might our solution help?' AI accelerates research — you provide the judgment on what's relevant.",
    commonStuck: "Talking to the wrong person — spending weeks nurturing someone who can't actually sign off on the deal.",
    howToUnstick: "Ask early and directly: 'Who else is typically involved in a decision like this?' and 'Walk me through how your company has bought software like this before.' Multi-threading (building relationships with multiple stakeholders) is insurance against single-threaded deals dying silently.",
  },
  {
    id: "month-3",
    month: "Month 3",
    duration: "Weeks 9–12",
    title: "Prospecting & Outreach",
    subtitle: "Finding prospects, cold email, cold calling, and LinkedIn — building your own pipeline",
    icon: Rocket,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    feeling: "Uncomfortable but empowering. Cold outreach is the part of sales that scares most people. You'll get rejected — a lot. But you're learning that pipeline is the lifeblood of sales, and the reps who prospect consistently always outperform those who wait for inbound leads to land in their lap.",
    whatYouKnow: [
      "The difference between inbound, outbound, and partner-sourced pipeline — and why you need to own your own",
      "How to write a cold email that gets replies: relevance > cleverness, and personalisation means research, not just using their first name",
      "Cold calling structure: pattern interrupt, reason for the call, qualifying question, ask for the meeting",
      "LinkedIn is a research tool first and an outreach channel second — warm up before you pitch",
      "Sequencing matters: multi-channel (email + call + LinkedIn) dramatically outperforms single-channel",
    ],
    whatYouDo: [
      "Build a target account list of 50 companies with a clear ICP (Ideal Customer Profile) thesis",
      "Write and send 100 personalised cold emails across 3 different sequence variations",
      "Make 50 cold calls using a structured opening and track your connect rate and conversion rate",
      "Optimise your LinkedIn profile for selling (headline, summary, content) and send 30 connection requests with personalised notes",
      "A/B test 2 different email subject lines and 2 different call openers — measure which performs better",
    ],
    toolsYouUse: ["Apollo.io or Outreach (sequencing)", "LinkedIn Sales Navigator", "Phone + dialler (cold calling)", "Vidyard or Loom (video prospecting)", "Google Sheets (tracking results)"],
    mindsetShift: "Stop waiting for leads to come to you. Start building your own pipeline. The AEs who consistently hit quota are the ones who prospect even when they have a full pipeline. Outbound is a muscle — the more you use it, the stronger it gets. Rejection is data, not failure.",
    proofOfCompetence: "You've sent 100+ personalised cold emails and can report your open rate, reply rate, and meeting conversion rate. You've made 50+ cold calls and can deliver your opener without reading from a script. You have at least 3-5 meetings booked from your own outbound efforts.",
    aiSkill: "Use AI to draft personalised email variations at scale. Prompt: 'Write 3 cold email variations for [persona] at [company type] referencing [specific pain point]. Keep each under 100 words. Tone: direct and helpful, not salesy.' Then customise each with account-specific research you've done manually.",
    commonStuck: "Sending generic emails and getting zero replies. Or avoiding the phone entirely because rejection feels personal.",
    howToUnstick: "Generic outreach gets generic results. Spend 5 minutes researching each prospect before writing. Reference something specific: a recent hire, a company announcement, or an industry trend. For cold calling, reframe rejection: a 'no' just means 'not now' or 'not relevant.' You need 15-20 dials to get one conversation — that's the math, not a reflection of your ability.",
  },
  {
    id: "month-4",
    month: "Month 4",
    duration: "Weeks 13–16",
    title: "Discovery Mastery",
    subtitle: "Running discovery calls, SPIN questions, and qualifying deals with MEDDIC",
    icon: Brain,
    color: "text-[#6d28d9]",
    bg: "bg-[#ede9fe]",
    feeling: "A shift happens. You stop talking about your product and start asking the questions that unlock real deals. Discovery is where good AEs separate from great ones. You're learning that the quality of your questions determines the quality of your pipeline — and ultimately, your close rate.",
    whatYouKnow: [
      "SPIN Selling: Situation, Problem, Implication, Need-payoff — the gold standard for discovery questioning",
      "MEDDIC qualification: Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion",
      "A great discovery call is 70% listening, 30% asking — you should talk less than the prospect",
      "The difference between surface-level pain ('we need better reporting') and root-cause pain ('we are missing forecast by 20% because nobody trusts the pipeline data')",
      "Not every deal should be in your pipeline — disqualifying bad fits early is a sign of maturity, not weakness",
    ],
    whatYouDo: [
      "Run 10+ discovery calls using a structured SPIN framework and record every one for self-review",
      "Qualify 5 deals using the full MEDDIC framework and document gaps you need to fill",
      "Practice 'implication questions' — the questions that help prospects quantify the cost of inaction",
      "Build a personal discovery question bank organised by persona and pain point",
      "Review your recorded calls and score yourself: talk-time ratio, number of open questions, depth of pain uncovered",
    ],
    toolsYouUse: ["Gong or Chorus (call recording + analytics)", "CRM (deal qualification fields)", "Notion (discovery question bank)", "Miro (deal strategy mapping)", "Claude (call debrief analysis)"],
    mindsetShift: "Move from 'let me tell you about our product' to 'help me understand your world.' The best discovery calls feel like a conversation with a trusted adviser, not an interrogation. Your prospect should leave thinking 'that person really understood my situation' — not 'that was a good pitch.'",
    proofOfCompetence: "You can run a 30-minute discovery call where the prospect does 70%+ of the talking. You can MEDDIC-qualify a deal and clearly articulate what's missing. You've identified and disqualified at least one deal that wasn't a real fit — and you can explain why that was the right call.",
    aiSkill: "Use AI to debrief after every discovery call. Paste your notes and prompt: 'Based on this discovery call, what MEDDIC criteria have I confirmed, and what gaps remain? What 3 questions should I ask in the follow-up to strengthen this deal?' AI gives you a second opinion on your qualification.",
    commonStuck: "Rushing through discovery to get to the demo because you're excited about the product or anxious to 'move the deal forward.'",
    howToUnstick: "A demo without discovery is a product tour — and product tours don't close deals. Force yourself to end discovery calls WITHOUT pitching. Say: 'I've learned a lot today. Let me go back and think about how we might help, and I'll come back with something specific to your situation.' This builds trust and gives you time to build a tailored pitch.",
  },
  {
    id: "month-5",
    month: "Month 5",
    duration: "Weeks 17–20",
    title: "Demos & Presentations",
    subtitle: "Tell-show-tell demos, storytelling, and handling technical questions with confidence",
    icon: Lightbulb,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    feeling: "Confident but sharpening. You've done the discovery work, and now you know how to translate what you've learned into a demo that actually resonates. You're not showing every feature — you're showing the 3 things that solve their specific problem. Demos feel less like presentations and more like conversations.",
    whatYouKnow: [
      "Tell-Show-Tell: state the problem, show how you solve it, reinforce the outcome — this is the demo structure that works",
      "A great demo is 20% product and 80% connecting the product to the buyer's specific pain and desired outcomes",
      "Storytelling in sales: 'A customer like you was facing [same problem]. Here's what they did and the result they got.'",
      "How to handle technical questions you can't answer: 'Great question — let me get our SE to give you the precise answer on that'",
      "Demo environment management: always have a clean, pre-loaded instance ready — never demo from a broken sandbox",
    ],
    whatYouDo: [
      "Deliver 10+ tailored demos using the tell-show-tell structure — no generic feature walkthroughs",
      "Build 3 customer stories you can weave into any demo: problem, solution, quantified result",
      "Practice handling the 5 most common technical questions for your product until your answers are crisp",
      "Record yourself demoing and watch it back — identify filler words, pacing issues, and moments where you lost the audience",
      "Co-present with a Solutions Engineer on 2-3 deals and learn how to hand off technical depth smoothly",
    ],
    toolsYouUse: ["Demo environment (clean sandbox)", "Zoom or Google Meet (screen share)", "Gong (demo recording + review)", "Google Slides or Pitch (deck support)", "Loom (async demo follow-ups)"],
    mindsetShift: "Stop showing features. Start showing outcomes. Your buyer doesn't care about your platform's architecture — they care about whether it solves their problem and what life looks like after they buy. Every click in the demo should be preceded by: 'You told me [pain] — here's how this changes that.'",
    proofOfCompetence: "You can deliver a 20-minute demo where every feature shown traces directly back to something the buyer said in discovery. You can tell at least 3 customer stories from memory with specific metrics. You've advanced 5+ deals from demo to proposal stage.",
    aiSkill: "Use AI to prep demo scripts. Prompt: 'Based on this discovery call summary, build me a demo agenda that addresses their top 3 pains in priority order. For each, write the tell-show-tell narrative.' Then customise with your product knowledge and the buyer's exact language.",
    commonStuck: "Showing too many features because you're nervous about silence, or defaulting to a generic demo when you have enough discovery intel to tailor.",
    howToUnstick: "Less is more. Pick the 3 features that map to their top 3 pains and go deep on those. If you catch yourself showing something they didn't ask about, stop and ask: 'Is this relevant to what you're trying to solve?' Their answer will tell you whether to continue or move on.",
  },
  {
    id: "month-6",
    month: "Month 6",
    duration: "Weeks 21–24",
    title: "Objection Handling",
    subtitle: "Common objections, reframing techniques, and building urgency without pressure",
    icon: Shield,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    feeling: "Battle-tested. Objections used to freeze you. Now you welcome them — because an objection is a buying signal. Someone who objects is engaged. Someone who says nothing and ghosts you was never real. You're learning to hold your ground, reframe concerns, and create urgency through business impact, not artificial deadlines.",
    whatYouKnow: [
      "The 4 objection categories: price/budget, timing, authority ('I need to check with my boss'), and need ('we're not sure this is a priority')",
      "The acknowledge-question-reframe pattern: 'I hear you — can I ask what's driving that concern?' then reframe around business impact",
      "Price objections are rarely about price — they're about perceived value relative to the cost",
      "Urgency comes from quantifying the cost of inaction: 'Every month you delay, that's $X in lost [revenue/efficiency]'",
      "The difference between a real objection and a brush-off — real objections deserve exploration, brush-offs deserve qualification questions",
    ],
    whatYouDo: [
      "Build an objection handling playbook: the 10 most common objections for your product, with 2-3 response variations each",
      "Role-play objection handling with a colleague — have them throw the hardest objections at you until your responses are natural",
      "Review 5 lost deals and identify the objection that killed each one — could it have been handled differently?",
      "Practice the 'negative reverse': 'It sounds like this might not be the right fit — is that fair?' to draw out the real concern",
      "Create urgency in 3 live deals by quantifying the cost of the status quo with the champion",
    ],
    toolsYouUse: ["Gong (objection pattern analysis)", "CRM (lost deal analysis)", "Notion (objection playbook)", "Role-play with peers", "Claude (objection response drafting)"],
    mindsetShift: "Stop fearing objections. Start treating them as information. An objection tells you exactly what the buyer is worried about — which means it tells you exactly what you need to address to move the deal forward. The AEs who lose deals aren't the ones who get objections — they're the ones who avoid them.",
    proofOfCompetence: "You can handle any common objection without breaking composure. You've turned at least 2 'stalled' deals back into active opportunities by reframing the buyer's concerns. Your objection playbook is a living document with real responses that have worked in practice.",
    aiSkill: "Use AI to prepare for tough conversations. Prompt: 'The buyer just said [exact objection]. Give me 3 different ways to respond: one that explores the concern deeper, one that reframes around business impact, and one that uses a customer story.' Practice these before the call.",
    commonStuck: "Caving on price at the first sign of pushback, or going silent when a buyer says 'it's too expensive.'",
    howToUnstick: "When a buyer says 'it's too expensive,' the correct response is NOT a discount. It's a question: 'Too expensive compared to what?' or 'Help me understand — is this a budget issue, or are you not sure it's worth the investment?' Most price objections dissolve when you reanchor the conversation around the cost of the problem, not the cost of the solution.",
  },
  {
    id: "month-7",
    month: "Month 7",
    duration: "Weeks 25–28",
    title: "Pipeline Management",
    subtitle: "CRM mastery, forecasting accuracy, and understanding deal velocity",
    icon: BarChart3,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    feeling: "Methodical. You start treating your pipeline like a portfolio — diversified, regularly pruned, and rigorously qualified. You know your numbers: average deal size, win rate, sales cycle length, and how many opportunities you need at each stage to hit your number. Sales becomes a system, not a guessing game.",
    whatYouKnow: [
      "Pipeline coverage: you need 3-4x your quota in qualified pipeline to hit your number consistently",
      "The sales velocity formula: (number of deals x average deal size x win rate) / sales cycle length = revenue velocity",
      "Forecast categories: commit (90%+), best case (60-80%), pipeline (30-50%), upside (<30%) — and what evidence supports each",
      "CRM hygiene matters: close dates, deal stages, next steps, and contact roles must be accurate or your forecast is fiction",
      "The 'dead zone' — deals that have been stuck at the same stage for 2x your average cycle time are probably dead. Kill them.",
    ],
    whatYouDo: [
      "Audit your entire pipeline: remove deals with no next steps, no champion, or no recent engagement",
      "Build a personal pipeline dashboard: stage distribution, aging, coverage by quarter, and velocity trend",
      "Practice forecasting: submit a commit, best case, and upside call for the quarter and defend it to your manager",
      "Implement a weekly pipeline review habit: 30 minutes every Monday to update stages, next steps, and close dates",
      "Identify your top 5 deals and create a specific 'close plan' for each: what needs to happen, who needs to agree, by when",
    ],
    toolsYouUse: ["Salesforce or HubSpot (pipeline views + reports)", "Clari or Aviso (forecasting)", "Google Sheets (personal tracker)", "Gong (deal health signals)", "Notion (close plans)"],
    mindsetShift: "Stop hoping deals will close. Start knowing which ones will and why. Hope is not a strategy. Every deal in your pipeline should have a clear next step, a known decision process, and an identified champion. If it doesn't have those three things, it's not a real opportunity — it's a wish.",
    proofOfCompetence: "You can walk someone through your pipeline in 5 minutes and explain the status, risk, and next step for every deal. Your forecast is within 10% of actual results. You've proactively killed at least 3 zombie deals and reallocated that time to real opportunities.",
    aiSkill: "Use AI to analyse pipeline patterns. Prompt: 'Here are my last 20 closed deals with their stage durations and outcomes. What patterns do you see? Where am I losing deals most often? What would you recommend I change?' AI helps you see trends you might miss when you're inside the data every day.",
    commonStuck: "A bloated pipeline full of deals that will never close, but you keep them because removing them feels like admitting failure.",
    howToUnstick: "A clean pipeline is a healthy pipeline. Set a rule: if a deal has no meaningful next step and no activity in 14 days, it goes to 'closed lost' or 'nurture.' This feels painful but it's liberating — you'll spend time on deals that can actually close instead of chasing ghosts. Your win rate will go up even if your pipeline gets smaller.",
  },
  {
    id: "month-8",
    month: "Month 8",
    duration: "Weeks 29–32",
    title: "Negotiation & Closing",
    subtitle: "Negotiation tactics, asking for the business, and navigating commercial terms",
    icon: DollarSign,
    color: "text-[#6d28d9]",
    bg: "bg-[#ede9fe]",
    feeling: "Exciting and nerve-wracking. This is where the deal comes together — or falls apart. You're learning that negotiation isn't a battle, it's a collaborative process to find terms that work for both sides. The close isn't a single magical moment — it's the natural conclusion of a well-run sales process.",
    whatYouKnow: [
      "Never negotiate against yourself — if the buyer asks for a discount, ask what they'd give in return (longer term, case study, faster signature)",
      "The best time to negotiate is when you have maximum leverage: after they've confirmed you're the preferred vendor but before the contract is signed",
      "Commercial terms to understand: payment terms (net 30/60/90), annual vs monthly billing, auto-renewal, SLA commitments, and termination clauses",
      "Anchoring: the first number on the table sets the frame. Lead with your standard pricing, not a discounted opening",
      "If you have to discount, discount on the first year and protect the out-year pricing — this protects long-term revenue",
    ],
    whatYouDo: [
      "Negotiate 5+ deals to close, practising the 'give to get' framework — every concession comes with a counter-ask",
      "Build a negotiation prep sheet: your walk-away point, ideal outcome, 3 tradeable items, and the buyer's likely asks",
      "Practice the direct close: 'Based on everything we've discussed, I'd like to propose we move forward. Here's what that looks like.'",
      "Shadow a senior AE through 2-3 contract negotiations to see how they handle procurement pushback",
      "Close at least 2 deals this month — experience is the only teacher for negotiation",
    ],
    toolsYouUse: ["CRM (deal tracking)", "DocuSign or PandaDoc (proposals + signatures)", "Google Sheets (negotiation prep)", "Legal review templates", "Slack (internal deal strategy)"],
    mindsetShift: "Stop thinking 'I don't want to be pushy.' Start thinking 'I owe it to this buyer to help them make a decision.' If you've done great discovery, delivered a tailored demo, and the solution genuinely solves their problem — asking for the business isn't pushy, it's helpful. Indecision costs them money every day they delay.",
    proofOfCompetence: "You've closed 2+ deals with negotiated terms. You can explain why you offered the terms you did and what you got in return. You can run a negotiation without giving away margin at the first sign of pressure. You have a repeatable close process, not a prayer.",
    aiSkill: "Use AI to war-game negotiations. Prompt: 'I'm about to negotiate with [buyer role] at [company size]. They'll likely push back on [price/terms]. Give me 3 negotiation scenarios and the optimal response for each. Include what to give and what to ask for in return.' Then rehearse before the call.",
    commonStuck: "Fear of asking for the close. You do everything right but never actually ask: 'Shall we move forward?'",
    howToUnstick: "Closing is not a trick — it's a question. If the buyer has confirmed the problem is real, the solution fits, and the ROI makes sense, the close is simply: 'It sounds like we're aligned. What do we need to do to get this started?' If they hesitate, that's an objection — handle it. But you have to ask the question to get the answer.",
  },
  {
    id: "month-9",
    month: "Month 9",
    duration: "Weeks 33–36",
    title: "Account Management",
    subtitle: "Expanding existing accounts — upsell, cross-sell, and running QBRs that drive growth",
    icon: Star,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    feeling: "Strategic. You realise that closing the deal is just the beginning. The real revenue — and the real relationships — come from expanding existing accounts. You start thinking about customer lifetime value, not just initial contract value. You're becoming a trusted adviser, not just a seller.",
    whatYouKnow: [
      "It's 5-7x cheaper to expand an existing customer than to acquire a new one",
      "Net revenue retention (NRR) is the metric that separates good sales orgs from great ones — 120%+ NRR means accounts grow over time",
      "QBRs (Quarterly Business Reviews) are your best expansion tool: review outcomes, show ROI, identify new use cases, and plant seeds for the upsell",
      "Cross-sell vs upsell: cross-sell is selling a different product to the same buyer; upsell is selling more of the same or a higher tier",
      "Executive sponsors change — you need to continuously multi-thread within accounts or risk losing your champion",
    ],
    whatYouDo: [
      "Run a QBR for an existing customer: review against their original goals, present ROI data, and propose an expansion plan",
      "Build an account plan for your top 3 accounts: whitespace analysis, growth targets, key contacts, and risk flags",
      "Identify and pitch one upsell and one cross-sell opportunity in your existing book of business",
      "Map the org chart of your largest account — find new departments or use cases you're not serving yet",
      "Build a customer health scorecard: usage data, NPS, support tickets, renewal date, and expansion signals",
    ],
    toolsYouUse: ["Gainsight or ChurnZero (customer health)", "CRM (account plans)", "Google Slides (QBR decks)", "Looker or Tableau (usage dashboards)", "Slack (customer communication)"],
    mindsetShift: "Move from 'close and move on' to 'close and grow.' The best AEs treat every closed deal as the opening chapter, not the final page. Your closed customers are your warmest pipeline — they already trust you, they already use the product, and they can introduce you to other teams and other budget holders.",
    proofOfCompetence: "You've run a QBR that led to an expansion conversation. You have account plans for your top 3 customers with specific growth targets. You've generated at least one upsell or cross-sell opportunity from an existing account. Your customers would recommend you by name.",
    aiSkill: "Use AI to prep QBR presentations. Prompt: 'Build a QBR agenda for [customer] who bought [product] 6 months ago. Their original goals were [goals]. Here's their usage data: [data]. Create a narrative that shows progress, identifies gaps, and sets up an expansion conversation for [new product/tier].' AI drafts the structure, you add the relationship context.",
    commonStuck: "Treating existing customers as 'done deals' and only focusing on new logos because that's what gets celebrated.",
    howToUnstick: "New logos are exciting but expansion is where the compounding happens. Block 2 hours per week for account management — proactive outreach, QBR prep, and relationship building. Set a personal goal: 30% of your pipeline should come from existing accounts. Your manager will notice, and your customers will thank you.",
  },
  {
    id: "month-10",
    month: "Month 10",
    duration: "Weeks 37–40",
    title: "Enterprise Selling",
    subtitle: "Complex deals, buying committees, procurement, and the long game",
    icon: Crown,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    feeling: "Patient and strategic. Enterprise deals are a different game. Cycles are 6-12 months. There are 8-15 stakeholders. Procurement has its own process. Legal will redline your contract. You're learning that enterprise selling is chess, not checkers — every move matters, and you have to think 3 steps ahead.",
    whatYouKnow: [
      "Enterprise deals require a 'deal team' — AE, SE, executive sponsor, legal, and sometimes professional services",
      "The MEDDPICC framework adds Paper Process and Competition to MEDDIC — critical for enterprise qualification",
      "Procurement operates on a different timeline and has different priorities (risk mitigation, compliance, cost reduction) than your champion",
      "Mutual action plans (MAPs) keep complex deals on track: shared document with milestones, owners, and dates for both sides",
      "Executive alignment is non-negotiable — your VP or CRO meeting their VP or C-suite signals seriousness and accelerates decisions",
    ],
    whatYouDo: [
      "Build and manage a mutual action plan for a complex deal with 5+ stakeholders",
      "Navigate a procurement process: RFP response, security questionnaire, legal review, and commercial negotiation",
      "Arrange an executive-to-executive meeting between your leadership and the buyer's leadership",
      "Run a deal strategy session with your internal team: SE, manager, and exec sponsor all aligned on the plan",
      "Manage a competitive evaluation: build a battle card, position against 2 competitors, and win on value, not price",
    ],
    toolsYouUse: ["Salesforce (enterprise deal management)", "Google Docs (mutual action plans)", "Looker or BI tools (ROI models)", "Security questionnaire tools (Vanta, Drata)", "Slack (deal room collaboration)"],
    mindsetShift: "Stop trying to speed up enterprise deals. Start trying to remove friction from the buyer's process. Enterprise sales isn't slow because buyers are indecisive — it's slow because there are 12 people who all need to say yes and zero who need to say no. Your job is to make it easy for each stakeholder to say yes.",
    proofOfCompetence: "You've managed a deal with 5+ stakeholders and a 90+ day sales cycle to close. You can navigate a procurement process without panicking. You've built a mutual action plan and used it to keep both sides accountable. You understand why enterprise deals die — and you've saved at least one from stalling.",
    aiSkill: "Use AI to draft RFP responses and security questionnaires. Prompt: 'Here is the RFP question: [question]. Based on our product capabilities [capabilities], draft a response that is specific, compliant, and differentiating. Include a customer proof point.' AI handles the first draft of repetitive procurement tasks — you review and customise.",
    commonStuck: "Losing deals at the procurement stage because you don't understand the buyer's internal process.",
    howToUnstick: "Ask your champion: 'Walk me through exactly what happens after you decide you want to buy. Who signs? What approvals are needed? Has procurement killed deals like this before? What can I do to make their job easier?' Map the paper process early — not after the verbal yes. Many deals die between 'we want to buy' and a signed contract because the AE assumed the hard part was over.",
  },
  {
    id: "month-11",
    month: "Month 11",
    duration: "Weeks 41–44",
    title: "Sales Leadership",
    subtitle: "Coaching, hiring, managing a team, and scaling what works",
    icon: MessageSquare,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    feeling: "Reflective. You start thinking beyond your own quota. How do you help others succeed? How do you hire well? How do you build a team culture that wins? Leadership in sales isn't about being the best closer — it's about making everyone around you better. Some of the best AEs struggle with this transition, but you're preparing for it early.",
    whatYouKnow: [
      "The best sales managers are coaches, not closers — they make their team better, not themselves",
      "Hiring for sales: look for coachability, curiosity, resilience, and work ethic over experience",
      "1:1 meeting structure: pipeline review, deal coaching, skill development, career growth — in that order",
      "Sales playbooks must be living documents — codify what works, update what doesn't, and make it easy for new hires to ramp",
      "Metrics cascade: company revenue target → team quota → individual quota → activity targets → leading indicators. Everyone should see how their work connects to the number.",
    ],
    whatYouDo: [
      "Mentor a newer AE: shadow their calls, give feedback, and help them build their first pipeline",
      "Document your sales process as a repeatable playbook: ICP, outreach templates, discovery framework, demo structure, and close process",
      "Run a mock 1:1 coaching session: review a real deal, diagnose the gap, and coach the rep to a specific next action",
      "Interview 2-3 sales candidates (even in a practice setting) and evaluate them on coachability, not just confidence",
      "Build a ramp plan: what should a new AE know by week 2, 4, 8, and 12?",
    ],
    toolsYouUse: ["Gong (coaching moments + call libraries)", "Notion or Google Docs (playbook documentation)", "Lattice or 15Five (1:1 management)", "CRM (team pipeline views)", "Loom (async coaching feedback)"],
    mindsetShift: "Move from 'my quota' to 'our number.' The shift from individual contributor to leader is one of the hardest in any career. You go from being measured on what you sell to being measured on what your team sells. Your success is now their success — and their failures are your failures to coach around.",
    proofOfCompetence: "You've mentored someone and they booked a meeting or closed a deal using your guidance. You've documented a repeatable sales process that another person could follow. You can evaluate a sales candidate in an interview and articulate why they'd succeed or struggle. You think about team performance, not just your own.",
    aiSkill: "Use AI to build training materials. Prompt: 'Create a 30-day onboarding plan for a new SDR/AE joining a [product type] company selling to [persona]. Include daily activities, learning milestones, role-play scenarios, and assessment checkpoints.' AI creates the framework — you fill it with your company's specific process and tribal knowledge.",
    commonStuck: "Trying to do everything yourself because it's faster than coaching someone else to do it.",
    howToUnstick: "If you do it, it gets done once. If you teach someone, it gets done forever. Yes, coaching takes longer in the short term. But a team of 5 reps executing at 80% of your level produces 4x more than you alone at 100%. The math is clear. Invest in others — it's the highest-leverage activity in sales.",
  },
  {
    id: "month-12",
    month: "Month 12",
    duration: "Weeks 45–48",
    title: "Revenue Operations",
    subtitle: "Full-cycle revenue thinking, marketing-sales alignment, and operating like a CRO",
    icon: Target,
    color: "text-[#6d28d9]",
    bg: "bg-[#ede9fe]",
    feeling: "Complete. You see the whole picture now. Sales isn't a department — it's part of a revenue engine that starts with marketing, flows through sales, and continues through customer success. You think in systems: how leads are generated, how they're qualified, how they move through the pipeline, how customers expand, and where the bottlenecks are. You're dangerous in the best possible way.",
    whatYouKnow: [
      "The full revenue engine: demand generation creates pipeline, sales converts qualified opportunities, and customer success retains and expands",
      "Marketing-sales alignment: shared ICP definition, SLA on lead response time, feedback loop on lead quality, and joint pipeline targets",
      "Unit economics drive strategy: CAC, LTV, payback period, magic number, and gross margin all inform how you sell and at what price",
      "Revenue forecasting isn't just bottom-up (deal-by-deal) — it's also top-down (market size, win rates, ASP) and the two should converge",
      "Tech stack matters: CRM, marketing automation, revenue intelligence, CPQ, and billing all need to be connected for accurate data",
    ],
    whatYouDo: [
      "Build a full revenue model: from lead generation through to renewal, with conversion rates and revenue at each stage",
      "Run a marketing-sales alignment session: define shared ICP, agree on lead scoring criteria, and set an SLA for lead follow-up",
      "Present a quarterly revenue review to leadership: results vs target, pipeline health, forecast accuracy, and strategic recommendations",
      "Identify the #1 bottleneck in your revenue engine and propose a fix backed by data",
      "Create your own '12-month revenue plan' that integrates new business, expansion, and retention targets",
    ],
    toolsYouUse: ["CRM + marketing automation (HubSpot/Salesforce + Marketo/Pardot)", "BI tools (Looker, Tableau)", "Revenue intelligence (Clari, Gong)", "Google Sheets (revenue modelling)", "Notion (strategic planning)"],
    mindsetShift: "Move from 'I'm a salesperson' to 'I'm a revenue operator.' The best CROs don't just manage a sales team — they orchestrate the entire revenue engine. Marketing, sales, CS, and product all contribute to revenue. Understanding how these functions connect — and where they break — is what separates a quota carrier from a revenue leader.",
    proofOfCompetence: "You can build a revenue model from scratch that a CFO would review seriously. You can identify where the funnel is leaking and propose a data-backed fix. You've presented to leadership and held your own in a strategic conversation. Your 12-month plan covers new business, expansion, and retention — not just one.",
    aiSkill: "Use AI as a strategic thinking partner. Prompt: 'Here's our revenue data for the last 4 quarters: [data]. Identify the 3 biggest risks to hitting our annual target and recommend specific actions for each. Consider pipeline coverage, win rate trends, average deal size changes, and sales cycle length.' AI surfaces patterns in data — you apply judgment and organisational context to decide what to act on.",
    commonStuck: "Staying in the 'individual contributor' mindset — focused only on your own deals instead of thinking about the system.",
    howToUnstick: "Zoom out. Spend one hour per week studying something outside your lane: marketing attribution, customer success metrics, product usage data, or financial modelling. The AEs who become VPs and CROs are the ones who understood the whole machine, not just their gear. Start building that perspective now — your future self will thank you.",
  },
]

const BEYOND: { month: string; title: string; desc: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { month: "Year 1.5", title: "Senior AE / Enterprise AE", desc: "You consistently hit 110%+ of quota. You manage complex, multi-stakeholder deals with 6-figure ACVs. You mentor newer reps and contribute to the sales playbook. Hiring managers fight over you because you combine execution with strategic thinking.", icon: Star, color: "text-editorial-amber" },
  { month: "Year 2-3", title: "Sales Manager / Team Lead", desc: "You're leading a team of 4-8 AEs. You coach deals, run forecast calls, and own a team number. Your reps improve measurably under your guidance. You've hired at least 2 people and both are performing. You think in systems: pipeline generation, conversion rates, and ramp time.", icon: TrendingUp, color: "text-editorial-green" },
  { month: "Year 3-5", title: "Director / VP of Sales / CRO", desc: "You own the revenue number for the company. You build and scale sales teams, design compensation plans, and partner with marketing and CS to drive net revenue retention. You think in quarterly and annual cycles, not just deal-by-deal. You're a business leader who happens to have come up through sales.", icon: Crown, color: "text-[#6d28d9]" },
]

const RAMP_CHECKPOINTS: {
  window: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bg: string
  targets: string[]
}[] = [
  {
    window: "Days 0-30",
    title: "Learn the product, market, and buyer language",
    icon: BookOpen,
    color: "text-editorial-green",
    bg: "bg-editorial-green-soft",
    targets: [
      "Shadow calls and learn the ICP, competitive set, and deal stages.",
      "Pass core product and messaging checks without sounding scripted.",
    ],
  },
  {
    window: "Days 31-90",
    title: "Generate first pipeline and run real meetings",
    icon: Rocket,
    color: "text-editorial-amber",
    bg: "bg-editorial-amber-soft",
    targets: [
      "Book meetings from your own outreach and run discovery with confidence.",
      "Build early pipeline with documented next steps and manager-reviewed qualification.",
    ],
  },
  {
    window: "Days 91-180",
    title: "Operate as a full-cycle AE",
    icon: BarChart3,
    color: "text-editorial-blue",
    bg: "bg-editorial-blue-soft",
    targets: [
      "Advance deals through demo, proposal, and negotiation with better forecast calls.",
      "Close the first deal or create enough late-stage pipeline to support that close.",
    ],
  },
  {
    window: "Months 6-12",
    title: "Build enterprise depth",
    icon: Target,
    color: "text-[#6d28d9]",
    bg: "bg-[#ede9fe]",
    targets: [
      "Handle multi-stakeholder planning, procurement friction, and executive alignment.",
      "Add one meaningful credential in product, cloud, security, or methodology.",
    ],
  },
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
          Your Sales Career Journey
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-editorial-ink leading-[0.95] tracking-tight">
          From First Call to Enterprise SaaS AE
        </h1>
        <p className="text-editorial-muted mt-4 text-base leading-relaxed max-w-2xl">
          Twelve months of focused practice — 15 to 20 hours per week — takes you from
          &quot;what is B2B sales?&quot; to &quot;I can carry a number, defend a forecast, and
          run a real SaaS deal with technical and commercial confidence.&quot; This
          timeline shows what that journey actually looks like, month by month:
          the rejection, the breakthroughs, and the proof points along the way.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-editorial-muted">
        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> ~15-20 hrs/week</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-editorial-green" /> Proof of competence at each stage</span>
        <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-editorial-amber" /> AI skill progression included</span>
      </div>

      <section className="space-y-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-serif font-bold text-editorial-ink">
            Ramp checkpoints that matter
          </h2>
          <p className="text-sm text-editorial-muted mt-2 leading-relaxed">
            If you are aiming for Snowflake or CrowdStrike style AE work, these are
            the checkpoints worth caring about in the first year.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {RAMP_CHECKPOINTS.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.window} className="h-full">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", item.bg)}>
                      <Icon className={cn("h-5 w-5", item.color)} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted">
                        {item.window}
                      </p>
                      <h3 className="font-serif font-semibold text-editorial-ink text-base">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {item.targets.map((target) => (
                      <p key={target} className="text-xs text-editorial-muted leading-relaxed">
                        {target}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

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

          {/* Beyond 12 months */}
          <div className="relative pl-14 sm:pl-20 pt-4">
            <div className="absolute left-2.5 sm:left-5.5 top-8 flex h-6 w-6 items-center justify-center rounded-full bg-editorial-canvas border-2 border-white shadow-sm z-10">
              <TrendingUp className="h-3 w-3 text-editorial-muted" />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-editorial-ink">Beyond the first 12 months</h3>
              <p className="text-sm text-editorial-muted leading-relaxed max-w-2xl">
                The structured learning phase is over, but the growth compounds. Here&apos;s what the next few years look like for someone who keeps practising, keeps closing, and keeps learning.
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
            Twelve months of focused work — not passive reading, but active selling — will
            put you ahead of most people with 3 years of unfocused experience. The difference is deliberate practice, not time served.
            Start with Month 1. Make the calls. Close the deals. The competence follows.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
