import { ScrollReveal } from "@/components/ScrollReveal"

const steps = [
  {
    number: "01",
    title: "Tell me your problem",
    description:
      "No jargon required. We'll have a conversation about what's slowing you down.",
  },
  {
    number: "02",
    title: "I'll scope a solution",
    description: "Clear deliverables, a clear plan, and no surprises.",
  },
  {
    number: "03",
    title: "We build it",
    description:
      "Fast iterations, regular demos, and something you'll actually use.",
  },
] as const

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            How It Works
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <div className="relative">
                <span className="font-heading text-4xl font-bold text-primary/20">
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
