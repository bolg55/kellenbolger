import { Code, Globe } from "lucide-react"
import SectionLabel from "./SectionLabel"
import type { Price } from "@/data/site"
import { ScrollReveal } from "@/components/ScrollReveal"
import { PRICE_FALLBACK, pricing } from "@/data/site"

const steps: Array<{
  number: string
  title: string
  description: string
  price: Price
}> = [
  {
    number: "01",
    title: "Show me.",
    description:
      "We sit down for an hour, in person or on a call. You walk me through where your time goes, and I come back with the three tasks most worth handing off. Fixed price, and it's credited toward the build if you go ahead.",
    price: pricing.walkthrough,
  },
  {
    number: "02",
    title: "I build it.",
    description:
      "A tool, an AI assistant, or both, whichever does the job best. Built around how you already work, using the software you already have. Timeline agreed up front, usually a few weeks.",
    price: pricing.build,
  },
  {
    number: "03",
    title: "I keep it running.",
    description:
      "Fixes when your tools change, new tasks as you think of them, a short monthly note on what it did, and a direct line to me.",
    price: pricing.monthly,
  },
]

const alsoOffers = [
  {
    icon: Code,
    title: "Custom tools and apps",
    description:
      "When off-the-shelf software doesn't fit how you work, I build the one that does.",
  },
  {
    icon: Globe,
    title: "A website you can update yourself",
    description: "A fast, modern site you can edit without calling anyone.",
  },
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionLabel>The process</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            How it works.
          </h2>
        </ScrollReveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.number}>
              <ScrollReveal delay={i * 0.15} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
                  <span className="font-heading text-5xl font-bold text-primary/30 dark:text-primary/50">
                    {step.number}
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-muted-foreground">
                    {step.description}
                  </p>
                  <p className="mt-6 border-t border-border pt-4 text-sm font-medium text-foreground">
                    {step.price ?? PRICE_FALLBACK}
                  </p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal delay={0.2}>
          <h3 className="mt-16 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Also
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {alsoOffers.map((offer) => (
              <div
                key={offer.title}
                className="flex items-start gap-3 rounded-lg border border-border p-4"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/20">
                  <offer.icon className="size-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {offer.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {offer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
