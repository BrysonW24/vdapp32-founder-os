import type { Metadata } from "next"
import { Navigation } from "@/components/academy/layout/Navigation"
import { Footer } from "@/components/academy/layout/Footer"
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
        <Navigation subjects={subjects} />
        <div className="h-[60px] sm:h-[80px]" aria-hidden="true" />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
