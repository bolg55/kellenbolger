import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"

const PHOTO_PATH: string | null = "/images/kellen.jpg"

export function About() {
  return (
    <section id="about" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <SectionLabel>About</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Hi, I&apos;m Kellen.
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
                I&apos;m a self-taught developer and a senior solutions engineer
                by day. I&apos;ve also built and run my own software business,
                up to $100K a year in revenue, so I know what your time is
                worth.
              </p>
              {/* Don't add more detail about the internal tool. */}
              <p>
                By day, I build AI assistants that a whole team uses every day.
                They connect to the team&apos;s tools and follow its procedures.
                I set up the same kind of thing for small businesses.
              </p>
              <p>
                I&apos;m based in Kitchener-Waterloo. I&apos;d rather build you
                something small that you actually use than something clever that
                you don&apos;t.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
