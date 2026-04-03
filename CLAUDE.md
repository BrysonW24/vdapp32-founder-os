# CLAUDE.md — Founder OS

## What this app is

A **multi-subject founder operating system** (`vdapp32-founder-os`) — playbooks, systems, tools, and structured learning across 15 business domains. Operating system first, academy second.

This is NOT a single-subject academy. It is a unified app where switching from Marketing to Sales to Finance happens within the same shell, same progress store, same deploy.

**Target user:** Founder building and operating a business. The UX should feel like a cockpit — "what matters now," "I need to do X right now" — not a student's LMS.

## Architecture — multi-subject content system

### Content structure (subject-scoped)

```
content/curriculum/
├── marketing/           ← migrated subject with academy depth + operator content
│   ├── manifest.json    ← Subject registration (auto-discovered)
│   ├── modules/
│   ├── lessons/
│   ├── frameworks/
│   ├── playbooks/
│   ├── systems/
│   ├── projects/
│   ├── tools/
│   └── domain-meta/
├── sales/               ← migrated subject with playbooks, systems, tools, and lessons
│   ├── manifest.json
│   └── ...
├── strategy/            ← native Founder OS subject under Wave 1 expansion
│   ├── manifest.json
│   └── ...
├── finance/             ← native Founder OS subject under Wave 1 expansion
│   ├── manifest.json
│   └── ...
├── ai-engineering/      ← deep technical AI builder subject with academy baseline + operator layer
│   ├── manifest.json
│   └── ...
├── capital/             ← founder-only skeleton subject
├── legal/               ← founder-only skeleton subject
└── [9 more subjects]/
```

**To add a new subject:** Create `content/curriculum/{slug}/manifest.json` matching `SubjectManifestSchema`. Add content JSON in subdirectories. No code changes — the loader auto-discovers subjects from `manifest.json`.

**To add content to an existing subject:** Drop JSON files into the subject's subdirectory (`modules/`, `lessons/`, etc.) matching the Zod schema. The loaders scan directories automatically.

### 15 subjects, 4 groups

| Group | Subjects |
|-------|----------|
| Go-to-Market | Marketing, Sales, Customer Success |
| Operations | Finance, Accounting, Operations, Data & Analytics |
| Growth | Strategy, Product, AI & Automation, AI Engineering, Leadership |
| Founder | Capital / Fundraising, Legal / Risk, Founder Performance |

### Route architecture (subject-prefixed, operator-first)

```
/                                    → Founder Dashboard (all subjects, grouped)
/{subject}                           → Subject Overview (playbooks, systems, tools, learn)
/{subject}/playbooks                 → Operational playbooks
/{subject}/playbooks/{slug}          → Playbook detail
/{subject}/systems                   → Frameworks & business systems
/{subject}/tools                     → Tool explorer
/{subject}/tools/{slug}              → Tool detail
/{subject}/learn                     → Learning hub
/{subject}/learn/modules             → Module grid
/{subject}/learn/modules/{slug}      → Module detail + lesson list
/{subject}/learn/modules/{slug}/{lessonSlug}  → Lesson page
/{subject}/projects                  → Practice projects
/{subject}/projects/{slug}           → Project detail
/{subject}/{deepDiveSlug}            → Manifest-driven subject deep dive
```

### Navigation (3-tier, operator-first)

1. **Subject switcher** — dropdown grouped by Go-to-Market / Operations / Growth / Founder
2. **Subject nav** — Overview | Playbooks | Systems | Tools | Learn | Projects
3. **More dropdown** — manifest-driven deep dives only (for example Blueprint, Toolkit, Day in Life, Simulation, AI Workflows, Ops)

Navigation reads subjects from `getSubjects()` at build time. Subject-specific deep dive pages come from `manifest.json#deepDivePages`.

### Key files

| File | Purpose |
|------|---------|
| `src/types/curriculum.ts` | All Zod schemas: SubjectManifest, Module, Lesson, Framework, Project, Tool, DayInLife, Playbook, BusinessSystem, Simulation, PromptPack, Template |
| `src/lib/content.ts` | Content loader — every function takes `subject` as first param |
| `src/lib/progress.ts` | Zustand progress store — subject-scoped with backward compat |
| `src/components/academy/layout/Navigation.tsx` | 3-tier nav with subject switcher |
| `src/components/founder/SubjectOverview.tsx` | Operator-first subject landing page |
| `src/app/page.tsx` | Founder Dashboard |
| `src/app/[subject]/` | All subject-scoped routes |

### Content model

**Existing types:** Module, Lesson, Framework, Project, Tool, DayInLife — same as the original academy shell, with relaxed validation for cross-subject compatibility.

**New types (Founder OS only):** Playbook, BusinessSystem, Simulation, PromptPack, Template, DomainMeta — operational content that makes this an OS, not just an academy.

**Subject manifest fields:** slug, name, shortName, group, icon, color, tagline, blueprintSlug, deepDivePages, order.

## Working in this app

### Build commands

```bash
npm run dev          # Dev server (default port 3000)
npm run build        # Production build — must pass cleanly
npm run lint         # ESLint
npm run type-check   # TypeScript strict mode
```

### Common build issue

The `.next` cache can become stale. Fix with:
```bash
rm -rf .next && npm run build
```

## Design system

### Theme — warm editorial

Uses the "paper and canvas" palette. NOT a standard dark or white SaaS theme.

```
paper: #f7f3ea    canvas: #f1ece1    ink: #1d2126    muted: #65655f
green: #386a58    amber: #a16a1f     red: #a0453f    blue: #2f4f79
```

### Typography

- Headlines: Serif (`"Iowan Old Style"`, Georgia)
- Body: Sans (`"Avenir Next"`, Inter)
- Data: Mono (`"JetBrains Mono"`)

### Component patterns

Cards: `rounded-[22px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,255,255,0.78)] shadow-editorial-soft backdrop-blur-[18px]`

Badges: `editorial-green-soft`, `editorial-amber-soft`, `editorial-red-soft`, `editorial-blue-soft`

Buttons: primary `bg-editorial-green text-white`, secondary glass panel with border.

## Content conventions

- Plain English, no jargon without explanation
- Australian English spelling (optimise, colour, analyse)
- Australian dollar context for salaries and costs
- Real-world examples (Apple, Nike, HubSpot, Canva, Spotify)
- Lessons follow: What → Why → How → Example → Mistakes → Exercise → Next
- Playbooks follow: Context → Steps → Expected Outcome → Common Mistakes → Checklist

## What NOT to do

- Don't create flat routes outside `[subject]/` — all content routes are subject-scoped
- Don't hardcode subject lists — use `getSubjects()` which reads from manifests
- Don't mix academy and operator framing — Founder OS leads with playbooks and systems, not courses
- Don't add a database, auth, or backend — this is a static content site
- Don't change the editorial warm theme
- Don't hardcode content in page components — use JSON files + loaders
- Don't add Three.js/react-three — peer dep conflicts with React 19
- Don't break the mobile experience — test at 375px width

## Canonical architecture document

The full architecture plan is at `~/.claude/plans/tranquil-percolating-flask.md`. This is the source of truth for taxonomy, migration strategy, and rollout phases.

## Current state (2026-04-03)

- 15 subjects registered with manifests
- Founder OS is active as a unified multi-subject app
- Wave 1 thresholds are complete across Marketing, Sales, Strategy, and Finance
- Current deepening wave focuses on Marketing and Sales parity-plus plus the new AI Engineering subject
- Marketing and Sales include manifest-driven deep dives under `/{subject}/{deepDiveSlug}`
- Marketing: 26 modules, 26 lessons, 3 playbooks, 2 systems, 17 frameworks, 30 tools
- Sales: 23 modules, 47 lessons, 3 playbooks, 2 systems, 81 frameworks, 30 tools
- Strategy: 5 modules, 5 lessons, 3 playbooks, 3 systems, 6 frameworks, 5 tools
- Finance: 5 modules, 5 lessons, 3 playbooks, 2 systems, 4 frameworks, 5 tools
- AI Engineering: 20 modules, 12 lessons, 3 playbooks, 2 systems, 11 frameworks, 30 tools
- Remaining subjects are available in the shell but are not current content priorities
- Progress is subject-scoped and stored in a single local state container
- Current verification baseline: `type-check`, `lint`, and `build` pass; build generates 508 static pages
