import fs from "fs"
import path from "path"
import {
  ModuleSchema,
  LessonSchema,
  FrameworkSchema,
  ProjectSchema,
  ToolSchema,
  DayInLifeSchema,
  DomainMetaSchema,
  PlaybookSchema,
  BusinessSystemSchema,
  SimulationSchema,
  PromptPackSchema,
  TemplateSchema,
  SubjectManifestSchema,
  type Module,
  type Lesson,
  type Framework,
  type Project,
  type Tool,
  type DayInLife,
  type DomainMeta,
  type Playbook,
  type BusinessSystem,
  type Simulation,
  type PromptPack,
  type Template,
  type SubjectManifest,
} from "@/types/curriculum"

const CONTENT_DIR = path.join(process.cwd(), "content/curriculum")

// ============================================================
// Core JSON helpers — now subject-scoped
// ============================================================

function readJsonDir<T>(
  subject: string,
  dir: string,
  schema: { parse: (data: unknown) => T }
): T[] {
  const fullPath = path.join(CONTENT_DIR, subject, dir)
  if (!fs.existsSync(fullPath)) return []
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = JSON.parse(fs.readFileSync(path.join(fullPath, f), "utf-8"))
      return schema.parse(raw)
    })
}

function readJsonFile<T>(
  subject: string,
  filePath: string,
  schema: { parse: (data: unknown) => T }
): T | null {
  const fullPath = path.join(CONTENT_DIR, subject, filePath)
  if (!fs.existsSync(fullPath)) return null
  const raw = JSON.parse(fs.readFileSync(fullPath, "utf-8"))
  return schema.parse(raw)
}

// ============================================================
// Subject Discovery — auto-discovers subjects from manifest.json
// ============================================================

export function getSubjects(): SubjectManifest[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) =>
      fs.existsSync(path.join(CONTENT_DIR, d.name, "manifest.json"))
    )
    .map((d) => {
      const raw = JSON.parse(
        fs.readFileSync(
          path.join(CONTENT_DIR, d.name, "manifest.json"),
          "utf-8"
        )
      )
      return SubjectManifestSchema.parse(raw)
    })
    .sort((a, b) => a.order - b.order)
}

export function getSubject(slug: string): SubjectManifest | null {
  const manifestPath = path.join(CONTENT_DIR, slug, "manifest.json")
  if (!fs.existsSync(manifestPath)) return null
  const raw = JSON.parse(fs.readFileSync(manifestPath, "utf-8"))
  return SubjectManifestSchema.parse(raw)
}

export function getSubjectSlugs(): string[] {
  return getSubjects().map((s) => s.slug)
}

// ============================================================
// Modules
// ============================================================

export function getModules(subject: string): Module[] {
  return readJsonDir(subject, "modules", ModuleSchema).sort(
    (a, b) => a.order - b.order
  )
}

export function getModule(subject: string, slug: string): Module | null {
  return readJsonFile(subject, `modules/${slug}.json`, ModuleSchema)
}

export function getModulesByDomain(
  subject: string,
  domain: string
): Module[] {
  return getModules(subject).filter((m) => m.domain === domain)
}

// ============================================================
// Lessons
// ============================================================

export function getLessons(subject: string, moduleSlug: string): Lesson[] {
  return readJsonDir(subject, "lessons", LessonSchema)
    .filter((l) => l.moduleSlug === moduleSlug)
    .sort((a, b) => a.order - b.order)
}

export function getLesson(subject: string, slug: string): Lesson | null {
  return readJsonFile(subject, `lessons/${slug}.json`, LessonSchema)
}

export function getAllLessons(subject: string): Lesson[] {
  return readJsonDir(subject, "lessons", LessonSchema).sort(
    (a, b) => a.order - b.order
  )
}

// ============================================================
// Frameworks
// ============================================================

export function getFrameworks(subject: string): Framework[] {
  return readJsonDir(subject, "frameworks", FrameworkSchema)
}

export function getFramework(subject: string, slug: string): Framework | null {
  return readJsonFile(subject, `frameworks/${slug}.json`, FrameworkSchema)
}

export function getFrameworksByDomain(
  subject: string,
  domain: string
): Framework[] {
  return getFrameworks(subject).filter((f) => f.domain === domain)
}

// ============================================================
// Projects
// ============================================================

export function getProjects(subject: string): Project[] {
  return readJsonDir(subject, "projects", ProjectSchema).sort(
    (a, b) => a.difficulty - b.difficulty
  )
}

export function getProject(subject: string, slug: string): Project | null {
  return readJsonFile(subject, `projects/${slug}.json`, ProjectSchema)
}

// ============================================================
// Tools
// ============================================================

export function getTools(subject: string): Tool[] {
  return readJsonDir(subject, "tools", ToolSchema)
}

export function getTool(subject: string, slug: string): Tool | null {
  return readJsonFile(subject, `tools/${slug}.json`, ToolSchema)
}

export function getToolsByDomain(subject: string, domain: string): Tool[] {
  return getTools(subject).filter((t) => t.category === domain)
}

// ============================================================
// Day in the Life
// ============================================================

export function getDayInLifeScenarios(subject: string): DayInLife[] {
  return readJsonDir(subject, "day-in-life", DayInLifeSchema)
}

export function getDayInLifeScenario(
  subject: string,
  slug: string
): DayInLife | null {
  return readJsonFile(subject, `day-in-life/${slug}.json`, DayInLifeSchema)
}

// ============================================================
// Domain Meta
// ============================================================

export function getAllDomainMeta(subject: string): DomainMeta[] {
  return readJsonDir(subject, "domain-meta", DomainMetaSchema).sort(
    (a, b) => a.order - b.order
  )
}

export function getDomainMeta(
  subject: string,
  slug: string
): DomainMeta | null {
  return readJsonFile(subject, `domain-meta/${slug}.json`, DomainMetaSchema)
}

// ============================================================
// Playbooks
// ============================================================

export function getPlaybooks(subject: string): Playbook[] {
  return readJsonDir(subject, "playbooks", PlaybookSchema).sort(
    (a, b) => a.order - b.order
  )
}

export function getPlaybook(subject: string, slug: string): Playbook | null {
  return readJsonFile(subject, `playbooks/${slug}.json`, PlaybookSchema)
}

export function getPlaybooksByDomain(
  subject: string,
  domain: string
): Playbook[] {
  return getPlaybooks(subject).filter((p) => p.domain === domain)
}

// ============================================================
// Business Systems
// ============================================================

export function getSystems(subject: string): BusinessSystem[] {
  return readJsonDir(subject, "systems", BusinessSystemSchema).sort(
    (a, b) => a.order - b.order
  )
}

export function getSystem(
  subject: string,
  slug: string
): BusinessSystem | null {
  return readJsonFile(subject, `systems/${slug}.json`, BusinessSystemSchema)
}

export function getSystemsByDomain(
  subject: string,
  domain: string
): BusinessSystem[] {
  return getSystems(subject).filter((s) => s.domain === domain)
}

// ============================================================
// Simulations
// ============================================================

export function getSimulations(subject: string): Simulation[] {
  return readJsonDir(subject, "simulations", SimulationSchema).sort(
    (a, b) => a.order - b.order
  )
}

export function getSimulation(
  subject: string,
  slug: string
): Simulation | null {
  return readJsonFile(subject, `simulations/${slug}.json`, SimulationSchema)
}

// ============================================================
// Prompt Packs
// ============================================================

export function getPromptPacks(subject: string): PromptPack[] {
  return readJsonDir(subject, "prompts", PromptPackSchema).sort(
    (a, b) => a.order - b.order
  )
}

export function getPromptPack(
  subject: string,
  slug: string
): PromptPack | null {
  return readJsonFile(subject, `prompts/${slug}.json`, PromptPackSchema)
}

export function getPromptPacksByDomain(
  subject: string,
  domain: string
): PromptPack[] {
  return getPromptPacks(subject).filter((p) => p.domain === domain)
}

// ============================================================
// Templates
// ============================================================

export function getTemplates(subject: string): Template[] {
  return readJsonDir(subject, "templates", TemplateSchema).sort(
    (a, b) => a.order - b.order
  )
}

export function getTemplate(subject: string, slug: string): Template | null {
  return readJsonFile(subject, `templates/${slug}.json`, TemplateSchema)
}

export function getTemplatesByDomain(
  subject: string,
  domain: string
): Template[] {
  return getTemplates(subject).filter((t) => t.domain === domain)
}
