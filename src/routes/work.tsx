import { createFileRoute } from "@tanstack/react-router"
import { Nav } from "@/components/sections/Nav"
import { Footer } from "@/components/sections/Footer"
import SectionLabel from "@/components/sections/SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"
import { WorkCard } from "@/components/WorkCard"
import { caseStudiesByCategory } from "@/data/caseStudies"

const title = "Work | Kellen Bolger"
const description =
  "Tools that do the repetitive work, AI that works with your software, custom apps and websites you can update yourself. Client work, my own products and prototypes."

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://kellenbolger.ca/work" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: WorkPage,
})

function WorkPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <SectionLabel>Work</SectionLabel>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
              Things I&apos;ve built.
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Client work, my own products and prototypes. Each one is labelled
              for what it is.
            </p>
          </ScrollReveal>

          {caseStudiesByCategory.map((group) => (
            <section key={group.id} className="mt-16">
              <ScrollReveal>
                <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  {group.heading}
                </h2>
              </ScrollReveal>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {group.items.map((cs, i) => (
                  <ScrollReveal key={cs.slug} delay={(i % 2) * 0.1}>
                    <WorkCard caseStudy={cs} showBuildNotes />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
