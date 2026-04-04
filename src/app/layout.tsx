import type { Metadata } from "next"
import { AppChrome } from "@/components/founder/presentation/AppChrome"
import { getSubjects } from "@/lib/content"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Founder OS",
    template: "%s | Founder OS",
  },
  description:
    "A founder operating system — playbooks, systems, tools, and decision support across 15 business domains. Operating system first, academy second.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const subjects = getSubjects()

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col relative z-[1]">
        <AppChrome subjects={subjects}>{children}</AppChrome>
      </body>
    </html>
  )
}
