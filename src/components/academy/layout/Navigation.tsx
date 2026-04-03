"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  Wrench,
  FolderKanban,
  Play,
  Layers,
  Menu,
  X,
  ChevronDown,
  Library,
} from "lucide-react"
import type { SubjectManifest, SubjectGroup } from "@/types/curriculum"
import { SUBJECT_GROUP_LABELS } from "@/types/curriculum"

interface NavigationProps {
  subjects: SubjectManifest[]
}

const SUBJECT_NAV = [
  { segment: "", label: "Overview", icon: LayoutDashboard },
  { segment: "/playbooks", label: "Playbooks", icon: Play },
  { segment: "/systems", label: "Systems", icon: Layers },
  { segment: "/tools", label: "Tools", icon: Wrench },
  { segment: "/learn", label: "Learn", icon: BookOpen },
  { segment: "/projects", label: "Projects", icon: FolderKanban },
]

export function Navigation({ subjects }: NavigationProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [subjectOpen, setSubjectOpen] = useState(false)

  // Derive current subject from URL
  const pathSegments = pathname.split("/").filter(Boolean)
  const currentSubjectSlug = pathSegments[0] || null
  const currentSubject = subjects.find((s) => s.slug === currentSubjectSlug)
  const isHome = pathname === "/"

  // Group subjects by their group
  const grouped = subjects.reduce<Record<SubjectGroup, SubjectManifest[]>>(
    (acc, s) => {
      if (!acc[s.group]) acc[s.group] = []
      acc[s.group].push(s)
      return acc
    },
    {} as Record<SubjectGroup, SubjectManifest[]>
  )

  const isSubjectNavActive = (segment: string) => {
    if (!currentSubjectSlug) return false
    const href = `/${currentSubjectSlug}${segment}`
    if (segment === "") return pathname === `/${currentSubjectSlug}`
    return pathname.startsWith(href)
  }

  const isDeepDiveActive = !!(
    currentSubjectSlug &&
    currentSubject?.deepDivePages.some((page) =>
      pathname.startsWith(`/${currentSubjectSlug}/${page.slug}`)
    )
  )

  return (
    <header className="fixed top-0 left-0 right-0 sm:top-[18px] sm:left-[18px] sm:right-[18px] z-50 rounded-none sm:rounded-[18px] border-b sm:border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.95)] sm:bg-[rgba(255,252,247,0.85)] backdrop-blur-[16px] shadow-editorial-soft">
      <div className="container flex h-14 items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="h-8 w-8 rounded-[10px] bg-editorial-green flex items-center justify-center">
            <span className="text-white text-sm font-bold font-serif">F</span>
          </div>
          <span className="hidden sm:inline font-serif text-lg font-semibold text-editorial-ink">
            Founder OS
          </span>
        </Link>

        {/* Subject Switcher (desktop) */}
        {currentSubject && (
          <div className="hidden lg:block relative">
            <button
              onClick={() => setSubjectOpen(!subjectOpen)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-editorial-ink bg-white/80 border border-[rgba(44,49,59,0.1)] shadow-sm"
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: currentSubject.color }}
              />
              {currentSubject.name}
              <ChevronDown
                className={cn(
                  "h-3 w-3 transition-transform",
                  subjectOpen && "rotate-180"
                )}
              />
            </button>
            {subjectOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setSubjectOpen(false)}
                />
                <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.95)] backdrop-blur-[20px] shadow-editorial p-3 space-y-3">
                  {(
                    Object.entries(grouped) as [
                      SubjectGroup,
                      SubjectManifest[],
                    ][]
                  ).map(([group, subs]) => (
                    <div key={group}>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted px-2 mb-1">
                        {SUBJECT_GROUP_LABELS[group]}
                      </p>
                      <div className="space-y-0.5">
                        {subs.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/${s.slug}`}
                            onClick={() => setSubjectOpen(false)}
                            className={cn(
                              "flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm transition-all duration-200",
                              s.slug === currentSubjectSlug
                                ? "text-editorial-ink bg-white/80 shadow-sm"
                                : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                            )}
                          >
                            <span
                              className="inline-block h-2 w-2 rounded-full shrink-0"
                              style={{ backgroundColor: s.color }}
                            />
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Subject Nav (desktop) */}
        {currentSubject && (
          <nav className="hidden lg:flex items-center gap-0.5">
            {SUBJECT_NAV.map((item) => {
              const Icon = item.icon
              const isActive = isSubjectNavActive(item.segment)
              return (
                <Link
                  key={item.segment}
                  href={`/${currentSubjectSlug}${item.segment}`}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                    isActive
                      ? "text-editorial-ink bg-white/80 border border-[rgba(44,49,59,0.1)] shadow-sm"
                      : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              )
            })}

            {/* More dropdown */}
            {currentSubject.deepDivePages.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                    isDeepDiveActive
                      ? "text-editorial-ink bg-white/80 border border-[rgba(44,49,59,0.1)] shadow-sm"
                      : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                  )}
                >
                  More
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      moreOpen && "rotate-180"
                    )}
                  />
                </button>
                {moreOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setMoreOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.95)] backdrop-blur-[20px] shadow-editorial p-2 space-y-0.5">
                      {currentSubject.deepDivePages.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/${currentSubjectSlug}/${page.slug}`}
                          onClick={() => setMoreOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm transition-all duration-200",
                            pathname.startsWith(
                              `/${currentSubjectSlug}/${page.slug}`
                            )
                              ? "text-editorial-ink bg-white/80 shadow-sm"
                              : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                          )}
                        >
                          <Library className="h-3.5 w-3.5" />
                          {page.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </nav>
        )}

        {!currentSubject && !isHome && (
          <Link
            href="/"
            className="text-sm text-editorial-muted hover:text-editorial-ink"
          >
            ← Dashboard
          </Link>
        )}

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-[10px] hover:bg-white/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[rgba(44,49,59,0.08)] p-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm transition-all duration-200",
              isHome
                ? "text-editorial-ink bg-white/74 shadow-sm"
                : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          {currentSubject && (
            <>
              <div className="h-px bg-[rgba(44,49,59,0.08)] mx-3 my-2" />
              <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted px-3 py-1">
                {currentSubject.name}
              </p>
              {SUBJECT_NAV.map((item) => {
                const Icon = item.icon
                const isActive = isSubjectNavActive(item.segment)
                return (
                  <Link
                    key={item.segment}
                    href={`/${currentSubjectSlug}${item.segment}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm transition-all duration-200",
                      isActive
                        ? "text-editorial-ink bg-white/74 shadow-sm"
                        : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
              {currentSubject.deepDivePages.length > 0 && (
                <>
                  <div className="h-px bg-[rgba(44,49,59,0.08)] mx-3 my-2" />
                  <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted px-3 py-1">
                    More
                  </p>
                  {currentSubject.deepDivePages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${currentSubjectSlug}/${page.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm transition-all duration-200",
                        pathname.startsWith(`/${currentSubjectSlug}/${page.slug}`)
                          ? "text-editorial-ink bg-white/74 shadow-sm"
                          : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                      )}
                    >
                      <Library className="h-4 w-4" />
                      {page.label}
                    </Link>
                  ))}
                </>
              )}
            </>
          )}

          <div className="h-px bg-[rgba(44,49,59,0.08)] mx-3 my-2" />
          <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted px-3 py-1">
            Subjects
          </p>
          {subjects.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm transition-all duration-200",
                s.slug === currentSubjectSlug
                  ? "text-editorial-ink bg-white/74 shadow-sm"
                  : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
              )}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              {s.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
