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
  Circle,
  Lock,
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
  BookOpen,
  DollarSign,
  Users,
  BarChart3,
  Megaphone,
  Palette,
  Map,
  Mail,
  Search,
  Play,
  Eye,
  Brain,
} from "lucide-react"

/* ═══════════════════════════════════════════════════
   COMPANY PROFILE
═══════════════════════════════════════════════════ */
const COMPANY = {
  name: "Bloom & Co.",
  tagline: "Thoughtful skincare, native to Australia",
  description: "A Melbourne-based D2C sustainable skincare brand. Founded 18 months ago by two friends who left corporate beauty. 12 SKUs (cleansers, serums, moisturisers, SPF). Revenue: $420K last year, growing 15% QoQ. Team: founder/CEO, one part-time social media person, you (the new marketer). Shopify store + Instagram presence. No paid ads yet. Email list: 2,400 subscribers. Average order value: $68. Repeat purchase rate: 22%.",
  stats: [
    { label: "Revenue (last 12mo)", value: "$420K" },
    { label: "Monthly growth", value: "15% QoQ" },
    { label: "Products", value: "12 SKUs" },
    { label: "Email list", value: "2,400" },
    { label: "Avg order value", value: "$68" },
    { label: "Repeat purchase", value: "22%" },
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
  icon: typeof BookOpen
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
    id: 1, week: "Week 1", title: "Your First Day", icon: Play, color: "#386a58",
    brief: "You just walked into Bloom & Co. The founder, Mia, hands you a laptop and a flat white. 'We need someone who can actually grow this thing,' she says. 'Where do you start?'",
    scenario: "It is tempting to jump straight into tactics — posting on social, running ads, redesigning the website. But the best marketers resist that urge. Your first week is about listening, learning, and understanding the business before you touch anything.\n\nYou need to figure out: What has been tried before? What worked? What does Mia think the problem is? Who are the customers? Where does the revenue actually come from? What does the P&L look like?",
    questionsToAsk: [
      "What is our gross margin on each product line?",
      "Who are our best customers — what do they look like, where did they come from?",
      "What marketing has been tried before, and what were the results?",
      "What does the founder think the biggest growth opportunity is?",
      "Can I get access to Shopify analytics, GA4, and the email platform?",
      "Is there a brand guidelines document or is it all in Mia's head?",
    ],
    toolsToUse: [
      { name: "Google Analytics 4", why: "Understand traffic sources, conversion rates, and user behaviour on the Shopify store" },
      { name: "Notion", why: "Create your marketing knowledge base — document everything you learn this week" },
      { name: "Shopify Analytics", why: "Revenue by product, customer geography, repeat purchase data" },
    ],
    decision: {
      question: "It is Friday afternoon of your first week. Mia asks: 'So, what should we focus on first?' What do you recommend?",
      options: [
        { label: "Run Facebook ads immediately — we need more traffic", feedback: "Too early. You do not understand the customer well enough to target ads effectively. You will waste budget on the wrong audience. A common mistake — jumping to tactics before strategy.", quality: "okay" },
        { label: "Conduct a full brand and market audit before spending any money", feedback: "Excellent instinct. Understanding the landscape before acting means every dollar you spend later will be more effective. This is what strategic marketers do — diagnose before prescribing.", quality: "best" },
        { label: "Fix the email welcome sequence — we are losing 2,400 potential repeat buyers", feedback: "Good thinking — email has the highest ROI and you already have a list. But without understanding who those subscribers are and what they want, your sequence might miss the mark. Research first, then optimise.", quality: "good" },
      ],
      insight: "The best marketers spend their first two weeks in 'discovery mode.' They resist the pressure to show quick wins and instead build a foundation of understanding that makes everything that follows more effective. Mark Ritson calls this 'market orientation before strategy.'",
    },
    deliverable: "One-page business snapshot: revenue breakdown, customer profile, channel performance, and top 3 hypotheses for growth",
    mentorTip: "Never skip the diagnosis phase. The CEO will pressure you for quick wins — that is normal. But the marketer who understands the business deeply will outperform the one who launches campaigns blindly. Take notes in your first week like a journalist.",
    goalCheck: "Can you explain Bloom & Co.'s business model, target customer, and competitive position in 60 seconds? If yes, you are ready for Week 2.",
    boundaryLesson: "You cannot access paid ad accounts without finance approval. You cannot change the website without the founder's sign-off. You CAN access all analytics and data platforms. Know what you own and what needs approval.",
  },
  {
    id: 2, week: "Week 2", title: "Know Your Market", icon: Search, color: "#2f4f79",
    brief: "Time to understand the battlefield. Who are the competitors? What does the market look like? Where are the gaps?",
    scenario: "Bloom & Co. exists in a crowded market — Australian natural skincare. Competitors range from established players like Aesop and Sukin to dozens of indie brands on Instagram. You need to figure out where Bloom & Co. fits and where the whitespace is.\n\nThis is not about copying competitors. It is about understanding the landscape so you can position Bloom & Co. uniquely. A perceptual map will help you visualise where every brand sits on axes like price vs. naturalness, or clinical vs. lifestyle.",
    questionsToAsk: [
      "Who does Mia consider our biggest competitors — and why?",
      "What do our customers say about why they chose us over alternatives?",
      "Are there customer segments nobody is serving well?",
      "What price point does each competitor sit at?",
      "What channels are competitors strongest on?",
    ],
    toolsToUse: [
      { name: "SimilarWeb", why: "Compare competitor website traffic, traffic sources, and audience demographics" },
      { name: "Google Trends", why: "Search interest trends for 'natural skincare australia', 'sustainable beauty', etc." },
      { name: "SEMrush", why: "Competitor keyword analysis — what are they ranking for that we are not?" },
    ],
    decision: {
      question: "Your competitive analysis reveals that most indie skincare brands compete on 'natural ingredients.' Bloom & Co. does too. How do you differentiate?",
      options: [
        { label: "Compete on price — undercut the competition", feedback: "Dangerous. Skincare has strong margins and price competition erodes them. You would also be competing with Sukin and Aldi brands. A race to the bottom is not a strategy — it is a surrender.", quality: "okay" },
        { label: "Lean into Australian-native botanicals as a unique ingredient story", feedback: "Strong positioning. 'Native Australian botanicals' is specific, ownable, and hard to copy. It connects sustainability with a unique Australian identity. This is differentiation that compounds over time.", quality: "best" },
        { label: "Focus on clinical results and dermatologist endorsements", feedback: "Good direction but expensive and slow. Getting clinical validation takes months and significant investment. It is a viable long-term play but not the right first move for a brand at this stage.", quality: "good" },
      ],
      insight: "Positioning is not about being better — it is about being different. The best positions are specific, ownable, and hard to copy. 'Natural skincare' is generic. 'Skincare powered by native Australian botanicals' is a category of one.",
    },
    deliverable: "Competitive landscape document with perceptual map, SWOT analysis, and 3 strategic opportunities identified",
    mentorTip: "Use the SWOT framework but do not stop there. The most valuable output of competitive analysis is finding the gap — the thing customers want that nobody is delivering well. That gap is your opportunity.",
    goalCheck: "Can you draw a 2×2 perceptual map from memory showing where Bloom & Co. and 5 competitors sit? Can you articulate Bloom & Co.'s unique position in one sentence?",
    boundaryLesson: "Market research can go on forever. Set a time limit — one week maximum for competitive analysis. You need enough to make decisions, not enough to write a PhD thesis. Perfectionism is the enemy of progress.",
  },
  {
    id: 3, week: "Week 3", title: "Find Your Customer", icon: Users, color: "#6d28d9",
    brief: "You have a hypothesis about the market. Now you need to understand who actually buys Bloom & Co. products — and who should.",
    scenario: "Mia thinks the customer is '25-40 year old women who care about sustainability.' That is a start, but it is too broad to market to effectively. You need to build real personas from real data — not assumptions.\n\nDig into Shopify data: who buys the most? Who has the highest LTV? Who came from which channel? Then layer in qualitative research: send a survey to the email list, read product reviews, check what customers say on social media.",
    questionsToAsk: [
      "Can we survey our existing customers? What incentive should we offer?",
      "What do product reviews say about why people love (or do not love) the products?",
      "Which customer segment has the highest repeat purchase rate?",
      "Are there customers we are attracting who we should not be targeting?",
      "What does the Instagram audience look like versus the actual buyer?",
    ],
    toolsToUse: [
      { name: "Hotjar", why: "Session recordings and heatmaps on the Shopify store — see where people drop off" },
      { name: "Google Analytics 4", why: "Audience demographics, acquisition channels, and behaviour flow" },
      { name: "Claude", why: "Synthesise survey responses and review data into persona frameworks" },
    ],
    decision: {
      question: "Your research reveals two distinct customer groups: (A) 'Conscious Professionals' — 28-38, high income, want premium sustainable beauty, shop intentionally. (B) 'Eco-Curious Students' — 19-25, lower income, discovering sustainability, price-sensitive. Who do you target first?",
      options: [
        { label: "Target both equally — why limit ourselves?", feedback: "Trying to speak to everyone means you speak to no one. The 28-year-old professional and the 19-year-old student want different messaging, different price points, and different channels. Pick one to lead with.", quality: "okay" },
        { label: "Lead with Conscious Professionals — higher AOV and LTV", feedback: "Smart choice. They match Bloom & Co.'s premium price point ($68 AOV), have higher lifetime value, and are easier to reach through targeted channels. You can expand to the second segment later when you have more budget and brand equity.", quality: "best" },
        { label: "Lead with Eco-Curious Students — larger market size", feedback: "The market is larger but the economics are harder. Students are more price-sensitive, spend less per order, and churn faster. Building a premium brand with a value-seeking audience creates tension in your positioning.", quality: "good" },
      ],
      insight: "Targeting is about saying no. It feels counterintuitive to ignore a potential customer group, but focus is what makes limited budgets work harder. You can always expand later — you cannot undo confused positioning.",
    },
    deliverable: "3 buyer personas with demographics, psychographics, media habits, purchase triggers, and objections — backed by data, not assumptions",
    mentorTip: "The persona is only useful if it changes what you do. If your persona says 'reads long-form content' but you are only posting short Instagram captions, there is a disconnect. Every persona insight should map to a tactical implication.",
    goalCheck: "Can you describe your primary persona — their morning routine, what they read, what frustrates them about skincare, and what would make them switch brands — without looking at your document?",
    boundaryLesson: "You cannot force the CEO to agree with your targeting. If Mia insists on targeting students too, present the data and make your case, but ultimately respect the decision. Good marketers influence through evidence, not authority.",
  },
  {
    id: 4, week: "Week 4", title: "Set Your Goals", icon: Target, color: "#a16a1f",
    brief: "Before you do anything, you need to know what success looks like. Goals first, tactics second.",
    scenario: "Mia says she wants to 'grow the business.' That is not a goal — it is a wish. Your job is to translate that wish into specific, measurable marketing objectives that tie directly to business outcomes.\n\nStart with the business goal (revenue), work backwards to marketing goals (traffic, conversion, retention), and then set KPIs for each channel. This is the measurement framework that will guide every decision for the next quarter.",
    questionsToAsk: [
      "What revenue target does the business need to hit this quarter to be sustainable?",
      "What does the founder consider a successful outcome from marketing in 90 days?",
      "Is the priority new customer acquisition or increasing repeat purchases?",
      "What is the maximum we can spend to acquire a customer and still be profitable?",
      "Do we have product launches or seasonal moments coming up?",
    ],
    toolsToUse: [
      { name: "Google Sheets", why: "Build a simple marketing model: revenue target → required customers → required traffic → required budget" },
      { name: "Google Analytics 4", why: "Baseline current conversion rates and traffic to set realistic targets" },
      { name: "Claude", why: "Stress-test your assumptions — ask it to challenge your targets and find gaps in your logic" },
    ],
    decision: {
      question: "The business needs $180K in revenue next quarter to reach profitability. Current run rate is $140K. You need to find $40K in incremental revenue. Where does it come from?",
      options: [
        { label: "All from new customer acquisition via paid ads", feedback: "Risky. Acquiring $40K in new revenue at a $68 AOV means ~590 new customers. At an estimated CPA of $35-50, that is $20-30K in ad spend — on a channel you have never tested. High risk, high cost.", quality: "okay" },
        { label: "Split: 60% from increasing repeat purchases (email/retention), 40% from new acquisition", feedback: "This is the smart split. You already have 2,400 email subscribers and a 22% repeat rate. Improving that to 30% is cheaper and faster than cold acquisition. New acquisition fills the top of funnel. This is balanced, lower-risk, and plays to your existing assets.", quality: "best" },
        { label: "Focus entirely on increasing AOV through bundles and upsells", feedback: "Good contribution but probably cannot deliver $40K alone. Increasing AOV from $68 to $80 helps, but you still need enough orders to hit the target. This should be part of the strategy, not the whole strategy.", quality: "good" },
      ],
      insight: "Great goals pass three tests: (1) Is it specific and measurable? (2) Does it tie to a business outcome? (3) Can you influence it with marketing? 'Increase brand awareness' fails test 1. 'Increase website traffic by 40%' passes all three.",
    },
    deliverable: "Q1 OKR document with 3 objectives, 3 key results each, and a simple marketing model showing how they connect to revenue",
    mentorTip: "The biggest mistake in goal setting is picking goals you cannot actually influence. If 80% of your revenue comes from organic search but you are setting goals around Instagram followers, there is a disconnect. Goals should match your highest-leverage channels.",
    goalCheck: "Can you explain the mathematical connection between your marketing KPIs and the $180K revenue target? If the numbers do not add up, your plan will not work.",
    boundaryLesson: "You need the founder to agree on goals before you start executing. If you set aggressive targets that the founder does not buy into, you will be measured against expectations you set alone. Align early, align often.",
  },
  {
    id: 5, week: "Week 5", title: "Position & Message", icon: Megaphone, color: "#386a58",
    brief: "You know the market, the customer, and the goals. Now craft the story that makes Bloom & Co. the obvious choice.",
    scenario: "Positioning is the most important strategic decision in marketing. It determines everything downstream — what you say, where you say it, how you price, and who you attract. Get it right and marketing becomes dramatically easier. Get it wrong and no amount of budget will fix it.\n\nYour positioning needs to pass the 'competitor test': if a competitor could say the same thing, it is not sharp enough. 'Natural skincare' is not positioning — it is a category label. 'Native Australian botanicals for the consciously beautiful' is positioning.",
    questionsToAsk: [
      "What is the one thing Bloom & Co. does that nobody else can claim?",
      "How do customers describe us to their friends?",
      "If we had to charge 50% more, what would justify it?",
      "What emotional benefit do our customers get beyond the functional product?",
      "What would we never do — what is off-brand?",
    ],
    toolsToUse: [
      { name: "Claude", why: "Generate positioning statement variations and pressure-test them against competitor positions" },
      { name: "Canva", why: "Create a visual messaging framework document to share with the team" },
      { name: "Figma", why: "Design a brand messaging hierarchy — tagline, value prop, key messages, proof points" },
    ],
    decision: {
      question: "You have developed three positioning concepts for Bloom & Co. Which one do you recommend to Mia?",
      options: [
        { label: "'Affordable natural skincare for everyone'", feedback: "This is a race to the bottom. 'Affordable' and 'for everyone' are the opposite of premium positioning. It undercuts your $68 AOV and invites price competition with mass-market brands. Positioning should create value, not destroy it.", quality: "okay" },
        { label: "'Skincare born from the Australian bush — native botanicals, conscious beauty'", feedback: "This is strong. It is specific (Australian native botanicals), emotional (born from the bush), and ownable (no competitor has this exact story). It supports premium pricing and creates a distinctive brand world. This is a position you can build on for years.", quality: "best" },
        { label: "'Clean, clinical skincare that actually works'", feedback: "Good direction but requires significant investment in clinical proof points. Without dermatologist endorsements and clinical trials, this claim is hard to substantiate and could attract regulatory scrutiny. The 'actually works' angle also implies competitors do not, which can feel combative.", quality: "good" },
      ],
      insight: "Positioning is a commitment, not a campaign. The best brands maintain their positioning for decades. Volvo has owned 'safety' since the 1960s. Your positioning should be specific enough to be distinctive but broad enough to grow into.",
    },
    deliverable: "Positioning statement, messaging matrix (by audience × by channel), brand voice guidelines, and a one-page brand brief",
    mentorTip: "Test your positioning with real people outside the company. Read it to five people and ask what they picture. If they all picture the same thing, your positioning is clear. If they picture five different things, it is too vague.",
    goalCheck: "Can you articulate Bloom & Co.'s positioning in one sentence that no competitor could copy? Can you describe the brand voice in three adjectives?",
    boundaryLesson: "Positioning requires founder buy-in. This is the founder's brand — they must believe in the direction. Present options, make your recommendation with evidence, but be prepared to iterate. The best positioning is co-created.",
  },
  {
    id: 6, week: "Week 6", title: "Choose Your Channels", icon: BarChart3, color: "#2f4f79",
    brief: "You have $5,000/month to spend. Where does each dollar go? This is where strategy becomes real.",
    scenario: "Channel selection is where most marketers go wrong. They spread thin across every platform instead of dominating a few. With $5,000/month, you cannot be everywhere — so you need to be strategic about where you show up.\n\nThe framework: match each channel to a funnel stage and a business objective. Awareness channels (social, content) at the top. Consideration channels (email, retargeting) in the middle. Conversion channels (search ads, landing pages) at the bottom. Retention channels (email flows, loyalty) post-purchase.",
    questionsToAsk: [
      "Where is our target customer already spending time online?",
      "Which channels have we tried before and what happened?",
      "What is our content creation capacity — who can produce what?",
      "Do we have enough product imagery and video for paid social?",
      "What is our break-even CPA based on gross margins?",
    ],
    toolsToUse: [
      { name: "Meta Ads Manager", why: "Set up your first campaign structure — even before spending, learn the interface" },
      { name: "Klaviyo", why: "Build out your email automation flows — welcome, abandoned cart, post-purchase" },
      { name: "Google Ads", why: "Research branded and non-branded search volume for your category" },
    ],
    decision: {
      question: "You have $5,000/month. How do you allocate it?",
      options: [
        { label: "$5,000 all on Instagram ads — that is where our audience is", feedback: "Single-channel dependency is risky. If Instagram changes its algorithm or your account gets restricted, you lose everything. Also, Instagram ads without email capture means you are renting attention, not building an asset.", quality: "okay" },
        { label: "$2,000 Meta Ads (awareness + retargeting), $1,500 email platform + flows, $1,000 content creation, $500 testing budget", feedback: "This is a balanced, strategic allocation. Paid social for acquisition, email for retention (your highest-ROI channel), content for organic growth, and a testing budget for experimentation. You are building multiple growth levers, not depending on one.", quality: "best" },
        { label: "$3,000 Google Ads (search), $2,000 SEO content", feedback: "Good channels but the split is wrong for this stage. Google Search is great for capturing existing demand, but if people are not searching for 'native Australian skincare' yet, your volume will be low. SEO is a 6-month play — you need faster wins too.", quality: "good" },
      ],
      insight: "The Binet and Field 60/40 rule suggests 60% of budget on brand building and 40% on performance marketing for long-term growth. At $5,000/month, you are heavily performance-weighted — that is okay at this stage. As budget grows, shift toward brand.",
    },
    deliverable: "Channel plan with budget allocation, KPIs per channel, content requirements, and a 30-day launch timeline",
    mentorTip: "The channel that feels most comfortable is not always the right channel. Many marketers default to what they know (usually social media) instead of what the data says will work. Let customer behaviour and business economics guide channel selection, not personal preference.",
    goalCheck: "For each channel in your plan, can you state: (1) the objective, (2) the target audience, (3) the success metric, and (4) the break-even point? If any channel cannot answer all four, reconsider it.",
    boundaryLesson: "You will need finance to approve the budget. Prepare a one-page investment case: 'If we spend $X, we project $Y in revenue with a Z-month payback period.' Speak their language — ROI, not impressions.",
  },
  {
    id: 7, week: "Week 7", title: "Build the Engine", icon: Palette, color: "#6d28d9",
    brief: "Strategy is done. Now build the content, emails, and campaigns that bring the strategy to life.",
    scenario: "This is where many marketers thrive — and where many strategies die. The gap between 'great strategy document' and 'live, working marketing engine' is execution quality. Every piece of content, every email, every ad must reflect the positioning and serve a specific purpose in the funnel.\n\nBuild in this order: (1) Email flows first — they generate revenue immediately from your existing list. (2) Content calendar — plan 30 days of social content aligned to your content pillars. (3) Paid ad creative — design your first campaign assets. (4) Landing pages — optimise the path from ad click to purchase.",
    questionsToAsk: [
      "Do we have a content library — product photos, lifestyle imagery, video assets?",
      "Who approves content before it goes live? What is the turnaround?",
      "Do we have Klaviyo templates or are we starting from scratch?",
      "What tone does the founder want in email copy — educational, playful, premium?",
      "Can I get UGC (user-generated content) from existing customers?",
    ],
    toolsToUse: [
      { name: "Klaviyo", why: "Build: welcome sequence (5 emails), abandoned cart flow (3 emails), post-purchase flow (2 emails)" },
      { name: "Canva", why: "Create social media templates, ad creative variants, email headers" },
      { name: "Later", why: "Schedule 30 days of social content across Instagram and TikTok" },
    ],
    decision: {
      question: "You are building the welcome email sequence. What approach do you take for the 5 emails?",
      options: [
        { label: "5 product promotion emails with discount codes", feedback: "Discount-heavy sequences train customers to wait for sales. They erode your premium positioning and your margins. A welcome sequence should build relationship and brand value, not just push product.", quality: "okay" },
        { label: "Email 1: Welcome + brand story. Email 2: Founder's why. Email 3: Best-seller social proof. Email 4: Ingredient education. Email 5: First purchase incentive.", feedback: "This is textbook. You build trust, tell the brand story, establish credibility through social proof, educate on your unique ingredients (native botanicals), and only offer an incentive after you have established value. The discount in email 5 converts warm leads, not cold ones.", quality: "best" },
        { label: "A single welcome email then add them to the regular newsletter", feedback: "You are leaving money on the table. Automated sequences convert 3-5x better than single emails because they nurture the relationship over time. A welcome sequence is one of the highest-ROI marketing assets you can build.", quality: "good" },
      ],
      insight: "The best email sequences follow the 'give-give-give-ask' principle. Build value and trust first. The ask (buy now, use this discount) comes only after you have established why the brand is worth paying attention to.",
    },
    deliverable: "Live welcome email sequence, 30-day content calendar, 3 ad creative variants, and an optimised landing page",
    mentorTip: "Execution speed matters, but not at the cost of quality. A mediocre email sequence launched today is worse than a great one launched next week. Take the time to get the copy, design, and flow logic right — these assets run on autopilot for months.",
    goalCheck: "Is every piece of content you have created clearly connected to your positioning? Does every email serve a purpose in the customer journey? If something does not serve the strategy, cut it.",
    boundaryLesson: "You need founder approval on brand voice and creative direction. Send Mia the first email draft and the content calendar for review. Getting sign-off early prevents rework later. Never surprise the founder with live content they have not seen.",
  },
  {
    id: 8, week: "Week 8", title: "Launch Day", icon: Play, color: "#a16a1f",
    brief: "Everything is built. It is time to go live. Launch the campaigns, activate the flows, and watch real data come in.",
    scenario: "Launch day is exciting — and nerve-wracking. You are about to spend real money and real customers will see your work. The key is to launch small, learn fast, and resist the urge to change everything after 24 hours.\n\nPaid ads have a 'learning phase' — the first 48-72 hours where the algorithm is figuring out who to show your ads to. Performance will be volatile. Do not panic. Do not turn things off. Let the data accumulate before making changes.",
    questionsToAsk: [
      "Is tracking set up correctly? Meta Pixel? GA4 events? UTM parameters?",
      "Is the welcome email sequence active and tested with a real email?",
      "Are the landing pages mobile-optimised and loading in under 3 seconds?",
      "Do I have a monitoring checklist — what do I check daily?",
      "Who do I alert if something breaks?",
    ],
    toolsToUse: [
      { name: "Meta Ads Manager", why: "Launch your first campaign, monitor learning phase, check delivery" },
      { name: "Google Analytics 4", why: "Real-time view to confirm traffic is flowing and events are firing" },
      { name: "Hotjar", why: "Watch session recordings of the first visitors — are they behaving as expected?" },
    ],
    decision: {
      question: "It is Day 3. Your Meta Ads are showing a CPA of $52 — above your $40 target. CTR is 1.8% (decent). What do you do?",
      options: [
        { label: "Kill the campaign — $52 CPA is too high", feedback: "Too early to judge. Three days of data with a small budget does not give you statistical significance. The learning phase needs at least 50 conversion events to optimise properly. Killing campaigns too early is one of the most expensive mistakes in paid media.", quality: "okay" },
        { label: "Let it run through the full learning phase (7 days / 50 conversions), then assess", feedback: "Correct. The algorithm needs data to optimise. Your CTR is healthy (1.8% is above average for e-commerce), which means the creative is working but targeting needs time to refine. Set a review point at day 7 with a clear decision framework.", quality: "best" },
        { label: "Immediately change the targeting and creative to try to improve CPA", feedback: "Changing variables during the learning phase resets it. You are essentially starting over each time you make a major change. Small budget adjustments are okay, but creative and targeting changes should wait until you have enough data to diagnose the real problem.", quality: "good" },
      ],
      insight: "Patience is the most underrated skill in paid media. The learning phase exists for a reason. Set clear decision criteria before launch: 'If CPA is above $X after Y conversions, we adjust targeting. If CTR is below Z%, we change creative.' Decide in advance, not in the moment.",
    },
    deliverable: "Launch checklist (completed), daily monitoring dashboard, and a Week 1 performance snapshot with initial observations",
    mentorTip: "The best thing you can do on launch day is check everything works — and then step away. Obsessively refreshing dashboards every 15 minutes does not improve performance. Set up alerts for anomalies and check metrics at set times: morning and end of day.",
    goalCheck: "Are all tracking systems confirmed working? Can you see real conversions flowing through from ad click to purchase? If tracking is broken, nothing else matters.",
    boundaryLesson: "When things do not go perfectly on launch day (and they will not), resist the urge to hide it. Tell Mia: 'CPA is above target in the learning phase, which is normal. Here is our decision framework for when to adjust.' Transparency builds trust.",
  },
  {
    id: 9, week: "Week 9", title: "Read the Numbers", icon: BarChart3, color: "#386a58",
    brief: "The campaigns have been running for two weeks. Time to read the data, find the story, and decide what to do next.",
    scenario: "Raw data is not insight. Your dashboards show hundreds of metrics — impressions, clicks, CTR, CPA, ROAS, open rates, conversion rates, bounce rates. The skill is knowing which numbers matter and what story they tell together.\n\nStart with the north-star metric: are we on track for the $180K revenue target? Then work down: what is each channel contributing? Where are we beating expectations? Where are we underperforming? Why?",
    questionsToAsk: [
      "Is the $180K quarterly revenue target on track based on current run rate?",
      "Which channel is delivering the best ROAS? Which is the worst?",
      "What is the actual CPA by channel versus our target?",
      "Are email flows generating attributable revenue?",
      "What does the funnel look like — where are we losing people?",
    ],
    toolsToUse: [
      { name: "Google Analytics 4", why: "Multi-channel performance, conversion paths, and attribution analysis" },
      { name: "Looker Studio", why: "Build a live marketing dashboard that updates automatically" },
      { name: "Klaviyo", why: "Email flow performance — open rates, click rates, revenue per recipient" },
    ],
    decision: {
      question: "After two weeks, your data shows: Meta Ads ROAS is 2.8x (below the 3x target), but email flows are generating 35% of total revenue at almost zero marginal cost. What is your recommendation?",
      options: [
        { label: "Cut Meta Ads spend and put it all into email", feedback: "Email is performing well, but it is converting your existing list — a finite asset. Without new customer acquisition (which ads provide), your email list will shrink over time as people unsubscribe. You need both acquisition and retention.", quality: "okay" },
        { label: "Optimise Meta Ads creative to improve ROAS while scaling email — they feed each other", feedback: "Exactly right. Meta Ads bring new people into the funnel, email converts and retains them. A 2.8x ROAS is close to target and can likely be improved with creative testing. The insight is that email is your hidden growth engine — make sure every ad click captures an email address.", quality: "best" },
        { label: "Increase Meta Ads budget significantly — more spend equals more revenue", feedback: "Not necessarily. ROAS often decreases as you scale spend because you exhaust the most responsive audience segments first. Scaling too fast before optimising is a common and expensive mistake. Optimise first, then scale.", quality: "good" },
      ],
      insight: "The most dangerous metric is the one you look at in isolation. A 2.8x ROAS looks mediocre until you factor in that 40% of ad-acquired customers join the email list and buy again within 60 days — making the true ROAS closer to 4.5x when you include downstream value.",
    },
    deliverable: "Marketing performance report: channel-by-channel analysis, funnel visualization, key insights, and recommended optimisations",
    mentorTip: "When presenting data to the founder, lead with the story, not the spreadsheet. 'We are on track for $170K — 94% of target — with email emerging as our strongest revenue channel' is better than a table of 50 metrics. Executives want narrative, not noise.",
    goalCheck: "Can you explain the relationship between your paid acquisition CPA, email conversion rate, and overall revenue trajectory? If you cannot connect the dots across channels, you are looking at metrics, not insight.",
    boundaryLesson: "Attribution is imperfect. Do not pretend you know exactly which touchpoint caused each sale. Be honest about what the data shows and what it cannot show. 'Our best estimate is...' is more credible than false precision.",
  },
  {
    id: 10, week: "Week 10", title: "Report to Leadership", icon: Megaphone, color: "#2f4f79",
    brief: "Mia asks: 'So, is marketing working?' You have 10 minutes to answer. Make it count.",
    scenario: "This is the moment that separates good marketers from great ones. You have all the data, all the insights, all the recommendations. Now you need to translate it into language the founder — and eventually a board — will understand and act on.\n\nThe Pyramid Principle: lead with the conclusion. Do not walk through your process — walk them through the answer. 'Marketing is working. We are at 94% of our revenue target. Here is what is driving it, what is not, and what I recommend we change.'",
    questionsToAsk: [
      "What does the founder really want to know? (Usually: is it working? Should we spend more or less?)",
      "What decisions need to be made after this presentation?",
      "How much financial detail does the founder want to see?",
      "Are there any sensitive topics — underperforming channels, budget overruns?",
      "What is the one takeaway I want the founder to remember?",
    ],
    toolsToUse: [
      { name: "Google Slides", why: "Build a concise 8-slide executive update" },
      { name: "Looker Studio", why: "Embed or screenshot the live dashboard for visual context" },
      { name: "Claude", why: "Draft the narrative structure and pressure-test your recommendations" },
    ],
    decision: {
      question: "During your presentation, Mia interrupts: 'Our Instagram follower count hasn't grown much. Are we failing on social?' How do you respond?",
      options: [
        { label: "Apologise and promise to focus more on growing followers", feedback: "Do not apologise for the wrong metric. Follower count is a vanity metric — it does not directly drive revenue. By apologising, you are validating a metric that does not matter and committing resources to something that will not move the business forward.", quality: "okay" },
        { label: "Reframe: 'Followers are a lagging indicator. Our social engagement rate is 4.2% (3x industry average) and social-referred revenue is up 28%. Let me show you the metrics that matter.'", feedback: "Perfect response. You acknowledged the concern, reframed with better metrics, and redirected to business outcomes. This is executive communication at its best — respectful, data-driven, and focused on what actually matters. Mia will trust your judgement more, not less.", quality: "best" },
        { label: "Show her a plan to grow followers through a giveaway campaign", feedback: "Giveaway followers are low-quality — they follow for the prize, not the brand. You would inflate a vanity metric at the cost of audience quality. Address the underlying concern (is social working?) with better metrics instead of chasing the wrong number.", quality: "good" },
      ],
      insight: "Executive communication is about managing the frame, not just presenting data. When a stakeholder asks about the wrong metric, your job is to respectfully redirect them to the right one — with evidence. This builds credibility and positions you as a strategic thinker, not just a reporter.",
    },
    deliverable: "Executive marketing update: 8 slides covering results vs goals, channel performance, key insight, recommended changes, and next quarter outlook",
    mentorTip: "Practice your presentation out loud — at least twice. Time it. Cut anything that does not serve the 'so what?' If a slide does not change a decision or build confidence, remove it. Eight great slides beat twenty okay ones.",
    goalCheck: "Can you deliver your marketing update in under 10 minutes, answer tough questions without getting defensive, and leave the founder more confident in marketing than before?",
    boundaryLesson: "You will not always get the answer the founder wants. If marketing is underperforming, say so honestly and present a plan to fix it. Hiding bad news destroys trust faster than bad results do.",
  },
  {
    id: 11, week: "Week 11", title: "Test & Optimise", icon: Brain, color: "#6d28d9",
    brief: "You have a baseline. Now make it better. Run experiments, test assumptions, and compound small improvements into big gains.",
    scenario: "The biggest unlock in marketing is realising that everything is a hypothesis until tested. Your ad creative, your email subject lines, your landing page layout, your pricing — all of these can be improved through systematic experimentation.\n\nThe key is test velocity: how many experiments can you run per week? Companies like Booking.com run thousands simultaneously. At Bloom & Co.'s scale, aim for 2-3 tests per week across channels. Document everything. Small improvements compound dramatically over time.",
    questionsToAsk: [
      "What has the highest potential impact if we improve it?",
      "Where do we have enough volume to reach statistical significance?",
      "What assumptions are we making that we have not validated?",
      "What would need to be true for our strategy to fail?",
      "What is the one metric that, if improved by 20%, would transform the business?",
    ],
    toolsToUse: [
      { name: "Meta Ads Manager", why: "A/B test ad creative — test 3 visual concepts against each other" },
      { name: "Klaviyo", why: "Test email subject lines, send times, and content formats" },
      { name: "Hotjar", why: "Identify landing page friction points through heatmaps and recordings" },
    ],
    decision: {
      question: "You have bandwidth to run one major test this week. Which do you choose?",
      options: [
        { label: "Test a new Instagram Reel format (educational vs lifestyle)", feedback: "Interesting test but lower commercial impact. Social content format tests improve engagement but the path from engagement to revenue is long and hard to measure. Save this for when your conversion infrastructure is fully optimised.", quality: "okay" },
        { label: "Test the product page layout — moving reviews above the fold", feedback: "High impact. The product page is the closest point to conversion. Social proof (reviews) above the fold has been shown to increase conversion rates by 10-30% in e-commerce studies. This test directly impacts revenue and is easy to measure.", quality: "best" },
        { label: "Test email send times — morning vs evening", feedback: "Low effort, low risk, but also lower impact than conversion-focused tests. Send time optimisation might improve open rates by 5-10%, but it does not change whether the email content is compelling enough to drive a purchase. Optimise for impact first.", quality: "good" },
      ],
      insight: "Prioritise experiments by expected revenue impact, not by ease. A 10% improvement in conversion rate on a page that gets 5,000 visits/month is worth more than a 50% improvement on a page that gets 100 visits/month. Always multiply improvement × volume × value.",
    },
    deliverable: "Test plan with 5 experiments: hypothesis, test design, success metric, sample size needed, and timeline. Plus results from Week 11 tests.",
    mentorTip: "Document every test result — wins and losses. After 3 months, you will have a 'what works for our audience' playbook that is worth more than any best-practice guide. Your data, your audience, your learnings.",
    goalCheck: "Are you running at least 2 tests per week? Are you documenting results? Can you show how test learnings have improved your key metrics over the past month?",
    boundaryLesson: "Some tests will fail — and that is the point. A test that disproves a hypothesis is just as valuable as one that confirms it. Never hide failed tests. Share them openly — they prevent the team from making the same mistake.",
  },
  {
    id: 12, week: "Week 12", title: "The Quarterly Review", icon: TrendingUp, color: "#a16a1f",
    brief: "Quarter one is over. Time to step back, assess everything, and plan Q2 with the wisdom of 12 weeks of real data.",
    scenario: "This is the moment where you stop being a new hire and start being a marketing leader. You have 12 weeks of data, wins, losses, and learnings. The quarterly review is not just a report — it is a strategic planning session.\n\nLook at the quarter through three lenses: (1) What worked and should be doubled down on? (2) What did not work and why? (3) What do we still not know and need to test in Q2? The most senior thing you can do is be honest about all three.",
    questionsToAsk: [
      "Did we hit the $180K revenue target? If not, why not?",
      "Which channel delivered the best ROI — and can we scale it?",
      "What surprised us — what worked that we did not expect?",
      "What did we learn about our customer that changes our approach?",
      "If the budget is cut by 20% next quarter, what do we protect?",
    ],
    toolsToUse: [
      { name: "Looker Studio", why: "Pull the full quarter dashboard — compare actual vs target for every KPI" },
      { name: "Google Sheets", why: "Build the Q2 budget model incorporating Q1 learnings and actual performance data" },
      { name: "Claude", why: "Synthesise 12 weeks of data into a coherent narrative for the quarterly review presentation" },
    ],
    decision: {
      question: "Mia tells you the board wants to cut marketing budget by 20% for Q2 due to cash flow concerns. What do you do?",
      options: [
        { label: "Accept the cut and reduce spend across all channels equally", feedback: "Across-the-board cuts are lazy strategy. They punish your best-performing channels equally with your worst. If email generates 35% of revenue at almost zero cost and Meta Ads generate 15% at high cost, cutting them equally makes no sense.", quality: "okay" },
        { label: "Present a 'protect and cut' plan: protect high-ROI channels (email, top-performing ads), cut underperformers, and show projected revenue impact of each scenario", feedback: "This is how a CMO thinks. You are not just accepting the cut — you are showing the business impact of different scenarios. 'If we cut Channel X, we lose $Y in projected revenue. If we protect Channel Z, we maintain $W.' This gives the board data to make an informed decision, not just a financial one.", quality: "best" },
        { label: "Push back and argue that cutting marketing will hurt growth", feedback: "Directionally correct but poorly executed. Simply saying 'do not cut my budget' without alternatives or data will not work. You need to show the trade-offs in financial terms the board understands. Come with scenarios, not just objections.", quality: "good" },
      ],
      insight: "Budget cuts are inevitable. The marketers who survive them are the ones who can articulate the ROI of every dollar and present clear trade-off scenarios. 'We can cut $X but it will cost us $Y in revenue' is the most powerful sentence in marketing finance.",
    },
    deliverable: "Quarterly review document: results vs goals, channel performance analysis, top 5 learnings, Q2 plan with revised budget, and learning agenda for next quarter",
    mentorTip: "The quarterly review is your chance to demonstrate strategic thinking. Anyone can report numbers. The value you add is in the 'so what' — connecting data to decisions. End every review with: 'Based on what we learned, here is what I recommend we do differently.'",
    goalCheck: "Can you tell the complete story of Q1 in 5 minutes — what you tried, what worked, what you learned, and what you would do differently? If yes, you are thinking like a CMO.",
    boundaryLesson: "Budget decisions happen above your pay grade. Your job is to inform the decision with data and scenarios, not to make it. Present the trade-offs clearly and accept the outcome professionally. Then optimise within whatever constraints you are given.",
  },
]

/* ═══════════════════════════════════════════════════
   PERSISTENCE
═══════════════════════════════════════════════════ */
const STORAGE_KEY = "bloom-sim-progress"

function loadProgress(): Record<number, number> {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  } catch { return {} }
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
  const nodePositions = stages.map((_, i) => ({
    x: 50 + Math.sin(i * 0.8) * 28,
    y: 8 + i * (84 / (stages.length - 1)),
  }))

  return (
    <div className="relative w-full" style={{ aspectRatio: "1/2.6" }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Connection path */}
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
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray={isCompleted ? "none" : "1.5 1"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            />
          )
        })}

        {/* Nodes */}
        {nodePositions.map((pos, i) => {
          const stage = stages[i]
          const isCompleted = completedStages.has(stage.id)
          const isActive = activeStage === stage.id
          const isLocked = !isCompleted && stage.id > 1 && !completedStages.has(stage.id - 1) && activeStage !== stage.id
          const canAccess = !isLocked

          return (
            <g key={stage.id}>
              {/* Pulse ring for active */}
              {isActive && (
                <motion.circle
                  cx={pos.x} cy={pos.y} r="3.8"
                  fill="none" stroke={stage.color} strokeWidth="0.3"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}

              {/* Node background */}
              <motion.circle
                cx={pos.x} cy={pos.y}
                r={isActive ? "3.2" : "2.8"}
                fill={isCompleted ? stage.color : isActive ? stage.color : isLocked ? "#e5e5e5" : "#f7f3ea"}
                stroke={isCompleted || isActive ? stage.color : isLocked ? "#d4d4d4" : stage.color}
                strokeWidth={isActive ? "0.5" : "0.4"}
                className={cn(canAccess && "cursor-pointer")}
                onClick={() => canAccess && onSelect(stage.id)}
                whileHover={canAccess ? { scale: 1.15 } : {}}
                whileTap={canAccess ? { scale: 0.95 } : {}}
                style={isActive ? { filter: `drop-shadow(0 0 4px ${stage.color}40)` } : {}}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: i * 0.06 }}
              />

              {/* Icon text */}
              <text
                x={pos.x} y={pos.y + 0.8}
                textAnchor="middle"
                fontSize="2.2"
                fill={isCompleted || isActive ? "white" : isLocked ? "#a3a3a3" : stage.color}
                className="pointer-events-none select-none"
              >
                {isCompleted ? "✓" : isLocked ? "🔒" : stage.id}
              </text>

              {/* Label */}
              <text
                x={pos.x + (i % 2 === 0 ? -5 : 5)}
                y={pos.y + 0.6}
                textAnchor={i % 2 === 0 ? "end" : "start"}
                fontSize="1.6"
                fill={isActive ? "#1d2126" : "#65655f"}
                fontWeight={isActive ? "600" : "400"}
                className="pointer-events-none select-none"
              >
                {stage.title}
              </text>
              <text
                x={pos.x + (i % 2 === 0 ? -5 : 5)}
                y={pos.y + 2.5}
                textAnchor={i % 2 === 0 ? "end" : "start"}
                fontSize="1.1"
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
      {/* Header */}
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

      {/* Scenario */}
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

      {/* Questions to Ask */}
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

      {/* Tools */}
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

      {/* Decision Point */}
      <Card className="border-editorial-amber/30 bg-editorial-amber-soft/20">
        <CardContent className="p-5 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-editorial-amber" /> Decision Point
          </h3>
          <p className="text-sm font-medium">{stage.decision.question}</p>

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

      {/* Deliverable */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-editorial-green" /> Your Deliverable
          </h3>
          <p className="text-sm text-editorial-muted">{stage.deliverable}</p>
        </CardContent>
      </Card>

      {/* Mentor Tip */}
      <Card className="border-editorial-green/20 bg-editorial-green-soft/30">
        <CardContent className="p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4 text-editorial-green" />
            <h3 className="text-sm font-semibold text-editorial-green">Mentor Tip</h3>
          </div>
          <p className="text-sm text-editorial-muted leading-relaxed">{stage.mentorTip}</p>
        </CardContent>
      </Card>

      {/* Goal Check */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-editorial-blue" /> Goal Check
          </h3>
          <p className="text-sm text-editorial-muted">{stage.goalCheck}</p>
        </CardContent>
      </Card>

      {/* Boundary Lesson */}
      <Card className="border-editorial-amber/20 bg-editorial-amber-soft/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle className="h-4 w-4 text-editorial-amber" />
            <h3 className="text-sm font-semibold text-editorial-amber">Know Your Boundaries</h3>
          </div>
          <p className="text-sm text-editorial-muted leading-relaxed">{stage.boundaryLesson}</p>
        </CardContent>
      </Card>

      {/* Navigation */}
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

  // Load progress on mount
  useEffect(() => {
    const saved = loadProgress()
    if (Object.keys(saved).length > 0) {
      setChoices(saved)
      const completed = new Set(Object.keys(saved).map(Number))
      setCompletedStages(completed)
      setShowIntro(false)
      // Set active to first incomplete stage
      const firstIncomplete = STAGES.find(s => !completed.has(s.id))
      if (firstIncomplete) setActiveStage(firstIncomplete.id)
      else setActiveStage(STAGES.length) // all done
    }
  }, [])

  const handleDecision = useCallback((stageId: number, choiceIdx: number) => {
    setChoices(prev => {
      const next = { ...prev, [stageId]: choiceIdx }
      return next
    })
  }, [])

  const handleNext = useCallback(() => {
    // Mark current stage as completed
    setCompletedStages(prev => {
      const next = new Set(prev)
      next.add(activeStage)
      return next
    })
    // Save progress
    const newChoices = { ...choices }
    saveProgress(newChoices)
    // Move to next
    if (activeStage < STAGES.length) {
      setActiveStage(activeStage + 1)
      setChoices(prev => {
        const next = { ...prev }
        // Keep existing choices
        return next
      })
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

  const currentStage = STAGES.find(s => s.id === activeStage)
  const progressPct = (completedStages.size / STAGES.length) * 100

  return (
    <div className="container py-10 space-y-8">
      {/* Hero */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-editorial-green-soft text-editorial-green border-transparent text-xs">Interactive Simulation</Badge>
          {completedStages.size > 0 && (
            <Badge variant="outline" className="text-xs">{completedStages.size}/{STAGES.length} completed</Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif">Welcome to Bloom & Co.</h1>
        <p className="text-editorial-muted mt-2 leading-relaxed">
          You have just been hired as the first dedicated marketer at an Australian skincare startup.
          No playbook. No team. Just you, a laptop, and $5,000/month. Build a marketing engine from scratch.
        </p>
      </div>

      {/* Progress bar */}
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
          <span>Start</span>
          <span>Week 6</span>
          <span>Quarter End</span>
        </div>
      </div>

      {/* Intro / Company Profile */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="space-y-6"
          >
            <Card className="border-editorial-green/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-[14px] bg-editorial-green flex items-center justify-center">
                    <span className="text-white text-xl font-serif font-bold">B</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-serif">{COMPANY.name}</h2>
                    <p className="text-sm text-editorial-muted">{COMPANY.tagline}</p>
                  </div>
                </div>
                <div className="text-sm text-editorial-muted leading-relaxed mb-4 space-y-1.5">
                  <p>A <strong>Melbourne-based D2C sustainable skincare</strong> brand.</p>
                  <p><strong>Founded</strong> 18 months ago by two friends who left corporate beauty.</p>
                  <p><strong>12 SKUs</strong> — cleansers, serums, moisturisers, SPF.</p>
                  <p><strong>Revenue:</strong> $420K last year, growing 15% QoQ.</p>
                  <p><strong>Team:</strong> founder/CEO, one part-time social media person, you (the new marketer).</p>
                  <p><strong>Shopify store</strong> + Instagram presence. <strong>No paid ads</strong> yet.</p>
                  <p><strong>Email list:</strong> 2,400 subscribers.</p>
                  <p><strong>Average order value:</strong> $68. <strong>Repeat purchase rate:</strong> 22%.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {COMPANY.stats.map(s => (
                    <div key={s.label} className="rounded-[12px] bg-editorial-canvas p-3">
                      <p className="text-lg font-bold font-serif">{s.value}</p>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-editorial-muted">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setShowIntro(false)}
                className="bg-editorial-green hover:bg-editorial-green/90 text-white px-8"
              >
                Start Your First Day <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout: Map + Detail */}
      {!showIntro && (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Journey Map sidebar */}
          <div className="space-y-4">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Map className="h-4 w-4" /> Your Journey
              </h3>
              <JourneyMap
                stages={STAGES}
                activeStage={activeStage}
                completedStages={completedStages}
                onSelect={setActiveStage}
              />
              {completedStages.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="w-full mt-4 text-xs text-editorial-muted"
                >
                  <RotateCcw className="h-3 w-3 mr-1.5" /> Reset Progress
                </Button>
              )}
            </div>
          </div>

          {/* Stage Detail */}
          <div className="min-w-0">
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
