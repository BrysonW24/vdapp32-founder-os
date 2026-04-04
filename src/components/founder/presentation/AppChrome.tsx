"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import type { SubjectManifest } from "@/types/curriculum"
import { Navigation } from "@/components/academy/layout/Navigation"
import { Footer } from "@/components/academy/layout/Footer"
import { ProgressRibbonWrapper } from "@/components/academy/progress/ProgressRibbonWrapper"
import { ClassicSubjectNavigation } from "@/components/founder/classic/ClassicSubjectNavigation"
import { ClassicSubjectFooter } from "@/components/founder/classic/ClassicSubjectFooter"
import { getSubjectPresentation } from "@/lib/subject-presentation"

interface AppChromeProps {
  subjects: SubjectManifest[]
  children: ReactNode
}

export function AppChrome({ subjects, children }: AppChromeProps) {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)
  const currentSubject = subjects.find((subject) => subject.slug === pathSegments[0])
  const isV2Route = pathSegments[1] === "v2"
  const presentation = currentSubject ? getSubjectPresentation(currentSubject) : null
  const useClassicChrome =
    !!currentSubject && !!presentation && presentation.defaultVariant === "classic" && !isV2Route
  const showProgressRibbon =
    useClassicChrome &&
    currentSubject &&
    ["marketing", "sales", "ai-engineering"].includes(currentSubject.slug)

  return (
    <>
      {useClassicChrome && currentSubject && presentation ? (
        <ClassicSubjectNavigation
          subjectSlug={currentSubject.slug}
          presentation={presentation}
        />
      ) : (
        <Navigation subjects={subjects} />
      )}

      {useClassicChrome && presentation?.navPosition === "fixed" ? (
        <div className="h-[60px] sm:h-[80px]" aria-hidden="true" />
      ) : !useClassicChrome ? (
        <div className="h-[60px] sm:h-[80px]" aria-hidden="true" />
      ) : null}

      {showProgressRibbon && (
        <div className="container mx-auto px-4 mt-2">
          <ProgressRibbonWrapper />
        </div>
      )}

      <main className="flex-1">{children}</main>

      {useClassicChrome && presentation ? (
        <ClassicSubjectFooter
          brandName={presentation.brandName}
          footerLine={presentation.footerLine}
        />
      ) : (
        <Footer />
      )}
    </>
  )
}
