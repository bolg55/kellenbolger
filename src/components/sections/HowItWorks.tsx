import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"

const steps = [
  {
    number: "01",
    title: "Tell me your problem",
    description:
      "No jargon required. We'll have a plain-English conversation about what's slowing you down and what you actually need.",
  },
  {
    number: "02",
    title: "I'll scope a solution",
    description:
      "Clear deliverables, honest timeline, no surprises. You'll know exactly what you're getting before any work starts.",
  },
  {
    number: "03",
    title: "We build it",
    description:
      "Fast iterations, regular demos, and a finished product that works the way your business actually does — not the way a generic tool assumes it does.",
  },
] as const

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionLabel>Process</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            How it works.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <div className="relative">
                <span className="font-heading text-5xl font-bold text-primary/30 dark:text-primary/50">
                  {step.number}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
