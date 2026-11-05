import { MessageSquareText } from "lucide-react"
import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"
import { TiltCard } from "@/components/TiltCard"
import { examples } from "@/data/examples"

export function Examples() {
  return (
    <section id="examples" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionLabel>Examples</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            The kind of thing people show me.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Some of these need AI. Some just need a bit of code. You don&apos;t
            have to know which.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example, i) => (
            <ScrollReveal key={example.ask} delay={(i % 3) * 0.1}>
              <TiltCard className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/30">
                  <MessageSquareText className="size-5 text-primary" />
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                  &ldquo;{example.ask}&rdquo;
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {example.result}
                </p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
