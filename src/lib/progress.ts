import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface QuizResult {
  score: number
  total: number
}

export interface SubjectProgress {
  completedModules: string[]
  completedLessons: string[]
  completedProjects: string[]
  completedFrameworks: string[]
  viewedTools: string[]
  quizResults: Record<string, QuizResult>
}

const EMPTY_SUBJECT: SubjectProgress = {
  completedModules: [],
  completedLessons: [],
  completedProjects: [],
  completedFrameworks: [],
  viewedTools: [],
  quizResults: {},
}

const LEGACY = "_legacy"

export interface ProgressState {
  subjects: Record<string, SubjectProgress>

  // Actions — subject defaults to _legacy for backward compat with old 1-arg callers
  completeModule: (subjectOrSlug: string, slug?: string) => void
  completeLesson: (subjectOrSlug: string, slug?: string) => void
  completeProject: (subjectOrSlug: string, slug?: string) => void
  completeFramework: (subjectOrSlug: string, slug?: string) => void
  viewTool: (subjectOrSlug: string, slug?: string) => void
  saveQuizResult: (subjectOrLessonSlug: string, lessonSlugOrScore: string | number, scoreOrTotal?: number, total?: number) => void
  reset: () => void

  // Helpers
  getSubjectProgress: (subject: string) => SubjectProgress
  isModuleComplete: (subjectOrSlug: string, slug?: string) => boolean
  isLessonComplete: (subjectOrSlug: string, slug?: string) => boolean
  isProjectComplete: (subjectOrSlug: string, slug?: string) => boolean

  // Backward-compatible flat accessors (aggregate all subjects)
  completedModules: string[]
  completedLessons: string[]
  completedProjects: string[]
  completedFrameworks: string[]
  viewedTools: string[]
  quizResults: Record<string, QuizResult>
}

function ensureSubject(
  subjects: Record<string, SubjectProgress>,
  subject: string
): SubjectProgress {
  return subjects[subject] ?? { ...EMPTY_SUBJECT }
}

function addUnique(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr : [...arr, item]
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      subjects: {},

      completeModule: (subjectOrSlug, slug?) => {
        const [s, sl] = slug ? [subjectOrSlug, slug] : [LEGACY, subjectOrSlug]
        set((st) => {
          const sp = ensureSubject(st.subjects, s)
          return { subjects: { ...st.subjects, [s]: { ...sp, completedModules: addUnique(sp.completedModules, sl) } } }
        })
      },

      completeLesson: (subjectOrSlug, slug?) => {
        const [s, sl] = slug ? [subjectOrSlug, slug] : [LEGACY, subjectOrSlug]
        set((st) => {
          const sp = ensureSubject(st.subjects, s)
          return { subjects: { ...st.subjects, [s]: { ...sp, completedLessons: addUnique(sp.completedLessons, sl) } } }
        })
      },

      completeProject: (subjectOrSlug, slug?) => {
        const [s, sl] = slug ? [subjectOrSlug, slug] : [LEGACY, subjectOrSlug]
        set((st) => {
          const sp = ensureSubject(st.subjects, s)
          return { subjects: { ...st.subjects, [s]: { ...sp, completedProjects: addUnique(sp.completedProjects, sl) } } }
        })
      },

      completeFramework: (subjectOrSlug, slug?) => {
        const [s, sl] = slug ? [subjectOrSlug, slug] : [LEGACY, subjectOrSlug]
        set((st) => {
          const sp = ensureSubject(st.subjects, s)
          return { subjects: { ...st.subjects, [s]: { ...sp, completedFrameworks: addUnique(sp.completedFrameworks, sl) } } }
        })
      },

      viewTool: (subjectOrSlug, slug?) => {
        const [s, sl] = slug ? [subjectOrSlug, slug] : [LEGACY, subjectOrSlug]
        set((st) => {
          const sp = ensureSubject(st.subjects, s)
          return { subjects: { ...st.subjects, [s]: { ...sp, viewedTools: addUnique(sp.viewedTools, sl) } } }
        })
      },

      saveQuizResult: (a, b, c?, d?) => {
        // 2-arg legacy: saveQuizResult(lessonSlug, score, total)
        // 4-arg new: saveQuizResult(subject, lessonSlug, score, total)
        const [s, lessonSlug, score, total] =
          typeof b === "string" ? [a, b, c as number, d as number] : [LEGACY, a, b as number, c as number]
        set((st) => {
          const sp = ensureSubject(st.subjects, s)
          return { subjects: { ...st.subjects, [s]: { ...sp, quizResults: { ...sp.quizResults, [lessonSlug]: { score, total } } } } }
        })
      },

      reset: () => set({ subjects: {} }),

      getSubjectProgress: (subject) => {
        return get().subjects[subject] ?? { ...EMPTY_SUBJECT }
      },

      isModuleComplete: (subjectOrSlug, slug?) => {
        const [s, sl] = slug ? [subjectOrSlug, slug] : [LEGACY, subjectOrSlug]
        return (get().subjects[s]?.completedModules ?? []).includes(sl)
      },

      isLessonComplete: (subjectOrSlug, slug?) => {
        const [s, sl] = slug ? [subjectOrSlug, slug] : [LEGACY, subjectOrSlug]
        return (get().subjects[s]?.completedLessons ?? []).includes(sl)
      },

      isProjectComplete: (subjectOrSlug, slug?) => {
        const [s, sl] = slug ? [subjectOrSlug, slug] : [LEGACY, subjectOrSlug]
        return (get().subjects[s]?.completedProjects ?? []).includes(sl)
      },

      // Backward-compatible flat accessors
      completedModules: [],
      completedLessons: [],
      completedProjects: [],
      completedFrameworks: [],
      viewedTools: [],
      quizResults: {},
    }),
    { name: "founder-os-progress" }
  )
)

// Legacy compatibility: empty domain groups for orphaned progress components
export const DOMAIN_GROUPS: Record<string, { label: string; color: string; modules: string[] }> = {}
