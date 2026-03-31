import { ScrollReveal } from "@/components/ScrollReveal"
import { testimonials } from "@/data/testimonials"

export function Testimonials() {
  const visible = testimonials.filter((t) => t.visible)

  if (visible.length === 0) return null

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            What People Say
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {visible.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <blockquote className="rounded-xl border border-border bg-card p-6">
                <p className="text-lg text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm text-muted-foreground">
                  {t.name} — {t.company}
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
