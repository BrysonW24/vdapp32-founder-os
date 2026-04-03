"use client"

import dynamic from "next/dynamic"
import type { Module } from "@/types/curriculum"

const MissionControl = dynamic(
  () => import("./MissionControl").then((m) => m.MissionControl),
  { ssr: false }
)

interface Props {
  modules: Module[]
}

export function MissionControlWrapper({ modules }: Props) {
  return <MissionControl modules={modules} />
}
