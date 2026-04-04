"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SubjectPresentation } from "@/lib/subject-presentation"
import { subjectHref } from "@/lib/subject-routes"

interface ClassicSubjectNavigationProps {
  subjectSlug: string
  presentation: SubjectPresentation
}

export function ClassicSubjectNavigation({
  subjectSlug,
  presentation,
}: ClassicSubjectNavigationProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const isActive = (href: string) => {
    const actualHref = subjectHref(subjectSlug, href)
    if (href === "/") return pathname === actualHref
    return pathname.startsWith(actualHref)
  }

  const isDeepPageActive = presentation.deepNav.some((item) => isActive(item.href))

  const headerClassName =
    presentation.navPosition === "sticky"
      ? "sticky top-[18px] z-50 mx-[18px] mt-[18px] mb-2 rounded-[18px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.78)] backdrop-blur-[16px] shadow-editorial-soft"
      : "fixed top-0 left-0 right-0 sm:top-[18px] sm:left-[18px] sm:right-[18px] z-50 rounded-none sm:rounded-[18px] border-b sm:border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.95)] sm:bg-[rgba(255,252,247,0.85)] backdrop-blur-[16px] shadow-editorial-soft"

  return (
    <header className={headerClassName}>
      <div className="container flex h-14 items-center justify-between">
        <Link href={`/${subjectSlug}`} className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-[10px] bg-editorial-green flex items-center justify-center">
            <span className="text-white text-sm font-bold font-serif">{presentation.brandMark}</span>
          </div>
          <span className="hidden sm:inline font-serif text-lg font-semibold text-editorial-ink">
            {presentation.brandName}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {presentation.mainNav.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={subjectHref(subjectSlug, item.href)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                  isActive(item.href)
                    ? "text-editorial-ink bg-white/80 border border-[rgba(44,49,59,0.1)] shadow-sm"
                    : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            )
          })}

          {presentation.deepNav.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-all duration-200",
                  isDeepPageActive
                    ? "text-editorial-ink bg-white/80 border border-[rgba(44,49,59,0.1)] shadow-sm"
                    : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                )}
              >
                More
                <ChevronDown className={cn("h-3 w-3 transition-transform", moreOpen && "rotate-180")} />
              </button>
              {moreOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-[16px] border border-[rgba(44,49,59,0.08)] bg-[rgba(255,252,247,0.95)] backdrop-blur-[20px] shadow-editorial p-2 space-y-0.5">
                    {presentation.deepNav.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={subjectHref(subjectSlug, item.href)}
                          onClick={() => setMoreOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm transition-all duration-200",
                            isActive(item.href)
                              ? "text-editorial-ink bg-white/80 shadow-sm"
                              : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </nav>

        <button
          className="lg:hidden p-2 rounded-[10px] hover:bg-white/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-[rgba(44,49,59,0.08)] p-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
          <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted px-3 py-1">Core</p>
          {presentation.mainNav.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={subjectHref(subjectSlug, item.href)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm transition-all duration-200",
                  isActive(item.href)
                    ? "text-editorial-ink bg-white/74 shadow-sm"
                    : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
          {presentation.deepNav.length > 0 && (
            <>
              <div className="h-px bg-[rgba(44,49,59,0.08)] mx-3 my-2" />
              <p className="text-[10px] uppercase tracking-[0.18em] text-editorial-muted px-3 py-1">Deep Dives</p>
              {presentation.deepNav.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={subjectHref(subjectSlug, item.href)}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 text-sm transition-all duration-200",
                      isActive(item.href)
                        ? "text-editorial-ink bg-white/74 shadow-sm"
                        : "text-editorial-muted hover:text-editorial-ink hover:bg-white/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </>
          )}
        </nav>
      )}
    </header>
  )
}
