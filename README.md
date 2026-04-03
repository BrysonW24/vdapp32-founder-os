# vdapp32-founder-os

Founder OS is a unified multi-subject Next.js app for operating a business as a founder. It combines playbooks, systems, tools, and structured learning across 15 business domains inside one shell, one progress store, and one deploy.

## What This App Is

- Operator-first, not LMS-first
- Subject-prefixed, multi-subject architecture
- Static content site powered by JSON curriculum files and Zod schemas
- Wave 1 build target focused on Marketing, Sales, Strategy, and Finance

The product is designed to feel like a founder cockpit: what matters now, what to do next, and how to build repeatable systems around the business.

## Core Routes

- `/` — Founder dashboard across all subjects
- `/{subject}` — Subject overview with domain meta, actions, and next steps
- `/{subject}/playbooks` — Action-oriented operational playbooks
- `/{subject}/systems` — Repeatable business systems and operating cadences
- `/{subject}/tools` — Tool explorer with subject-specific recommendations
- `/{subject}/learn` — Learning hub for modules and lessons
- `/{subject}/learn/modules/{slug}` — Module detail
- `/{subject}/learn/modules/{slug}/{lessonSlug}` — Lesson detail
- `/{subject}/projects` — Practice projects
- `/{subject}/{deepDiveSlug}` — Manifest-driven deep dives such as toolkit, blueprint, simulation, and subject-specific operator pages

## Subject Model

All subject content lives under `content/curriculum/{subject}/` and is auto-discovered from `manifest.json`.

Current subject groups:

- Go-to-Market: `marketing`, `sales`, `customer-success`
- Operations: `finance`, `accounting`, `operations`, `data-analytics`
- Growth: `strategy`, `product`, `ai-automation`, `ai-engineering`, `leadership`
- Founder: `capital`, `legal`, `founder-performance`

## Wave 1 Focus

Founder OS has completed its Wave 1 threshold across four core subjects:

- Marketing
- Sales
- Strategy
- Finance

The remaining subjects stay available in the shell, with the current deepening wave focused on Marketing and Sales parity-plus plus the new AI Engineering subject.

## Tech Stack

- Next.js 15 App Router
- React 19
- Tailwind CSS
- Framer Motion
- Zustand
- Zod
- Static JSON content loaders in `src/lib/content.ts`

## Development

```bash
npm install
npm run dev
npm run type-check
npm run lint
npm run build
```

## Content Conventions

- Add new subjects by creating `content/curriculum/{slug}/manifest.json`
- Add subject content via JSON files in `modules/`, `lessons/`, `tools/`, `playbooks/`, `systems/`, and related folders
- Do not hardcode content into route components
- Keep all content routes under `/{subject}/...`

## Current Delivery Posture

- Architecture is shipped and stable
- Wave 1 thresholds are complete across Marketing, Sales, Strategy, and Finance
- Marketing and Sales now include manifest-driven deep dives ported from their source academies
- AI Engineering is now a first-class Growth subject with academy baseline content plus Founder OS playbooks and systems
- Manifest-driven deep-dive routes are live under `/{subject}/{deepDiveSlug}`
- Personal Academy remains out of scope during the current Founder OS deepening wave
