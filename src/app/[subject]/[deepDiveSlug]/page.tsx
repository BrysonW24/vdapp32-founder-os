import { notFound } from "next/navigation"
import { getSubject, getSubjects } from "@/lib/content"
import {
  getDeepDiveMetadata,
  renderDeepDive,
} from "@/lib/deep-dives"
import {
  getAllPresentationDeepDiveSlugs,
  getCanonicalDeepDiveSlug,
} from "@/lib/subject-presentation"

export async function generateStaticParams() {
  return getSubjects().flatMap((subject) =>
    getAllPresentationDeepDiveSlugs(subject).map((deepDiveSlug) => ({
        subject: subject.slug,
        deepDiveSlug,
      }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; deepDiveSlug: string }>
}) {
  const { subject: subjectSlug, deepDiveSlug } = await params
  const subject = getSubject(subjectSlug)
  const canonicalSlug = subject
    ? getCanonicalDeepDiveSlug(subject, deepDiveSlug)
    : deepDiveSlug

  if (!subject) {
    return { title: "Not Found" }
  }

  const isWhitelisted = getAllPresentationDeepDiveSlugs(subject).includes(
    deepDiveSlug
  )

  if (!isWhitelisted) {
    return { title: "Not Found" }
  }

  return getDeepDiveMetadata(subject, canonicalSlug)
}

export default async function SubjectDeepDivePage({
  params,
}: {
  params: Promise<{ subject: string; deepDiveSlug: string }>
}) {
  const { subject: subjectSlug, deepDiveSlug } = await params
  const subject = getSubject(subjectSlug)

  if (!subject) notFound()

  const canonicalSlug = getCanonicalDeepDiveSlug(subject, deepDiveSlug)
  const isWhitelisted = getAllPresentationDeepDiveSlugs(subject).includes(
    deepDiveSlug
  )

  if (!isWhitelisted) {
    notFound()
  }

  const content = renderDeepDive(subject, canonicalSlug)
  if (!content) notFound()

  return content
}
