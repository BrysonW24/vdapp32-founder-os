"use client"

import dynamic from "next/dynamic"

const ProgressRibbon = dynamic(
  () => import("./ProgressRibbon").then((m) => m.ProgressRibbon),
  { ssr: false }
)

export function ProgressRibbonWrapper() {
  return <ProgressRibbon />
}
