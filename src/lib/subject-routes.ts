export function subjectRootHref(subjectSlug: string): string {
  return `/${subjectSlug}`
}

export function subjectV2Href(subjectSlug: string): string {
  return `/${subjectSlug}/v2`
}

export function subjectHref(subjectSlug: string, href: string): string {
  if (href === "/") return subjectRootHref(subjectSlug)

  if (href === "/modules") return `/${subjectSlug}/learn/modules`
  if (href.startsWith("/modules/")) return `/${subjectSlug}/learn${href}`

  if (href === "/projects") return `/${subjectSlug}/projects`
  if (href.startsWith("/projects/")) return `/${subjectSlug}${href}`

  if (href === "/tools") return `/${subjectSlug}/tools`
  if (href.startsWith("/tools/")) return `/${subjectSlug}${href}`

  if (href === "/playbooks") return `/${subjectSlug}/playbooks`
  if (href.startsWith("/playbooks/")) return `/${subjectSlug}${href}`

  if (href === "/systems") return `/${subjectSlug}/systems`
  if (href.startsWith("/systems/")) return `/${subjectSlug}${href}`

  return `/${subjectSlug}${href}`
}

export function isCoreSubjectPath(href: string): boolean {
  return (
    href === "/" ||
    href === "/modules" ||
    href.startsWith("/modules/") ||
    href === "/projects" ||
    href.startsWith("/projects/") ||
    href === "/tools" ||
    href.startsWith("/tools/") ||
    href === "/playbooks" ||
    href.startsWith("/playbooks/") ||
    href === "/systems" ||
    href.startsWith("/systems/")
  )
}
