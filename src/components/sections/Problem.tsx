import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"

const lines = [
  "Every week I copy the same numbers into the same spreadsheet.",
  "We pay for AI and nobody really uses it.",
  "Half my day is re-typing things from one system into another.",
] as const

export function Problem() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionLabel>Sound familiar?</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Where the week goes.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {lines.map((line, i) => (
            <ScrollReveal key={line} delay={i * 0.1}>
              <blockquote className="h-full rounded-xl border border-l-4 border-border border-l-primary bg-card p-6 text-lg text-card-foreground">
                &ldquo;{line}&rdquo;
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
