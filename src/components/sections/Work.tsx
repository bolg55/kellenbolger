import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"
import { WorkCard } from "@/components/WorkCard"
import { featuredCaseStudies } from "@/data/caseStudies"
import { cn } from "@/lib/utils"

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionLabel>Work</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            What it looks like in practice.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            One real example of each thing I do, labelled for what it is.
          </p>
        </ScrollReveal>

        <div
          className={cn(
            "mt-12 grid gap-6 sm:grid-cols-2",
            featuredCaseStudies.length === 3 && "lg:grid-cols-3"
          )}
        >
          {featuredCaseStudies.map((cs, i) => (
            <ScrollReveal key={cs.slug} delay={i * 0.1}>
              <WorkCard caseStudy={cs} showCategory />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <Link
            to="/work"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            See more <ArrowRight className="size-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
