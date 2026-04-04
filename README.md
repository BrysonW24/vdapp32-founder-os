# vdapp32-founder-os

Founder OS is a unified multi-subject Next.js app for operating a business as a founder. It combines playbooks, systems, tools, and structured learning across 15 business domains inside one shell, one progress store, and one deploy.

## What This App Is

- Operator-first, not LMS-first
- Subject-prefixed, multi-subject architecture
- Static content site powered by JSON curriculum files and Zod schemas
- Wave 1 build target focused on Marketing, Sales, Strategy, and Finance, with the classic restoration and deepening wave extending the rest of the business-native subjects

The product is designed to feel like a founder cockpit: what matters now, what to do next, and how to build repeatable systems around the business.

## Core Routes

- `/` — Founder dashboard across all subjects
- `/{subject}` — Classic subject front by default, including restored academy-style experiences for Marketing, Sales, and AI Engineering
- `/{subject}/v2` — Newer generic Founder OS subject overview retained as a secondary variant
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

## Delivery Posture

Founder OS has completed its Wave 1 threshold across four core subjects:

- Marketing
- Sales
- Strategy
- Finance

Since then, the deepening wave has expanded the rest of the business-native subjects to a real baseline and restored the classic academy fronts for Marketing, Sales, and AI Engineering.

- Marketing, Sales, and AI Engineering now default to their classic academy-style front-end, SVGs, and legacy route rhythm
- The newer generic subject experience is preserved at `/{subject}/v2`
- Founder Performance, Capital, Legal, Accounting, Operations, Product, Leadership, Data & Analytics, Customer Success, AI & Automation, Finance, and Strategy now all have structured baseline content depth

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
- Classic restored fronts now lead `marketing`, `sales`, and `ai-engineering`, with `v2` kept as the secondary Founder OS variant
- All 15 subjects now have operator-first content baselines, and the flagship subjects retain the deepest bespoke pages
- Deep-dive routes are live under `/{subject}/{deepDiveSlug}`, including classic aliases like `learning-map`, `timeline`, `ae-blueprint`, and `frontier-blueprint`
- Current verified build output is 1370 static pages
