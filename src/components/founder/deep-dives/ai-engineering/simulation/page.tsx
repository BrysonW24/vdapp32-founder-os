import { SimulationClient } from "./SimulationClient"

export const metadata = {
  title: "Frontier AI Engineering Simulation",
  description:
    "An interactive scenario about model choice, retrieval design, agent permissions, eval gates, and release safety.",
}

export default function SimulationPage() {
  return <SimulationClient />
}
