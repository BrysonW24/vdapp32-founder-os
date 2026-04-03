import { notFound } from "next/navigation"
import { getSubject, getSubjects } from "@/lib/content"
import {
  getDeepDiveMetadata,
  isDeepDiveRegistered,
  renderDeepDive,
} from "@/lib/deep-dives"

export async function generateStaticParams() {
  return getSubjects().flatMap((subject) =>
    subject.deepDivePages
      .filter((page) => isDeepDiveRegistered(subject.slug, page.slug))
      .map((page) => ({
        subject: subject.slug,
        deepDiveSlug: page.slug,
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

  if (!subject || !isDeepDiveRegistered(subjectSlug, deepDiveSlug)) {
    return { title: "Not Found" }
  }

  return getDeepDiveMetadata(subject, deepDiveSlug)
}

export default async function SubjectDeepDivePage({
  params,
}: {
  params: Promise<{ subject: string; deepDiveSlug: string }>
}) {
  const { subject: subjectSlug, deepDiveSlug } = await params
  const subject = getSubject(subjectSlug)

  if (!subject) notFound()

  const isWhitelisted = subject.deepDivePages.some(
    (page) => page.slug === deepDiveSlug
  )

  if (!isWhitelisted || !isDeepDiveRegistered(subjectSlug, deepDiveSlug)) {
    notFound()
  }

  const content = renderDeepDive(subject, deepDiveSlug)
  if (!content) notFound()

  return content
}
