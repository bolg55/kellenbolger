import { ExternalLink } from "lucide-react"
import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"
import { TiltCard } from "@/components/TiltCard"
import { caseStudies } from "@/data/caseStudies"

export function Work() {
  const visible = caseStudies.filter((cs) => cs.visible)

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionLabel>Work</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Things I've built.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cs, i) => (
            <ScrollReveal key={cs.slug} delay={i * 0.1}>
              <TiltCard className="flex h-full flex-col">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                  {cs.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {cs.description}
                </p>

                <p className="mt-3 text-sm font-medium text-foreground">
                  {cs.outcome}
                </p>

                {cs.url && (
                  <a
                    href={cs.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    View project <ExternalLink className="size-3.5" />
                  </a>
                )}
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
