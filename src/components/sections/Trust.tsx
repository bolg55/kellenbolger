import {
  CodeXml,
  KeyRound,
  PenLine,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"

const points = [
  {
    icon: PenLine,
    title: "It drafts. You send.",
    description:
      "Anything that leaves your business or touches money needs your OK.",
  },
  {
    icon: KeyRound,
    title: "Only the access it needs.",
    description: "Read-only wherever possible.",
  },
  {
    icon: CodeXml,
    title: "Sometimes there's no AI at all.",
    description:
      "If plain code does the job, that's what you get: predictable, every time.",
  },
  // Keep this true: only use paid/business AI tiers that don't train on
  // customer data (e.g. the Claude API, paid Gemini API), or the client's own.
  {
    icon: ShieldCheck,
    title: "Your data stays yours.",
    description:
      "I use paid, business-grade AI services that don't train on your data, or the one you already pay for. Before we start, I'll tell you exactly where everything is stored.",
  },
  {
    icon: UserRound,
    title: "A real person.",
    description: "You're dealing with me, not a call centre.",
  },
] as const

export function Trust() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionLabel>Peace of mind</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Built so it can&apos;t go rogue.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {points.map((point, i) => (
            <ScrollReveal key={point.title} delay={(i % 2) * 0.1}>
              <div className="flex h-full items-start gap-4 rounded-xl border border-border bg-card p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/30">
                  <point.icon className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
