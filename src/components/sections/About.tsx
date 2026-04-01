import { ScrollReveal } from "@/components/ScrollReveal"

const PHOTO_PATH: string | null = null

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            About
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row">
            {PHOTO_PATH && (
              <img
                src={PHOTO_PATH}
                alt="Kellen Bolger"
                className="size-32 rounded-xl object-cover"
              />
            )}
            <div className="space-y-4 text-muted-foreground">
              <p>
                I&apos;m a software engineer based in Waterloo who genuinely
                enjoys turning messy business problems into clean software
                solutions.
              </p>
              <p>
                I&apos;m opinionated about simplicity and allergic to
                overengineered tools that nobody actually uses. If it
                doesn&apos;t solve a real problem, I&apos;m not interested in
                building it.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
