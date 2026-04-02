import AboutCallout from "./AboutCallout"
import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"

const PHOTO_PATH: string | null = "/images/kellen.jpg"

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <SectionLabel>About</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            About.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row">
            {PHOTO_PATH && (
              <img
                src={PHOTO_PATH}
                alt="Kellen Bolger"
                className="size-32 rounded-xl border border-border object-cover"
              />
            )}
            <div className="space-y-4 text-muted-foreground">
              <p>
                I lead with the problem, not the technology. I&apos;ve built
                software that scaled to six-figure revenue, shipped tools that
                replaced five-figure software subscriptions, and turned manual
                processes that consumed hours into things that just happen
                automatically.
              </p>
              <p>
                I work best with business owners and operators who know their
                problem inside out but don&apos;t want to manage a dev team or
                navigate technical decisions alone. I&apos;ll tell you what to
                build, why, and then build it.
              </p>
              <p>
                I&apos;m based in Waterloo. Opinionated about simplicity,
                allergic to overengineered tools that nobody actually uses. The
                best software is the kind your team actually reaches for.
              </p>
              <AboutCallout />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
