import { Bot, Code, Info, Layers } from "lucide-react"
import SectionLabel from "./SectionLabel"
import { ScrollReveal } from "@/components/ScrollReveal"
import { TiltCard } from "@/components/TiltCard"

const services = [
  {
    icon: Code,
    title: "Custom Web Apps",
    description:
      "Bespoke tools built around how your business actually works — not a generic platform you have to work around.",
  },
  {
    icon: Bot,
    title: "AI-Powered Automation",
    description:
      "Turn repetitive manual work into something your team never has to think about again. It just happens.",
  },
  {
    icon: Layers,
    title: "Headless CMS & Content Architecture",
    description:
      "Scalable content infrastructure for teams that have outgrown WordPress. Built on Strapi and modern tooling.",
  },
  {
    icon: Info,
    title: "Product Strategy & Scoping",
    description:
      "Not sure what to build, or whether your idea is the right one? I'll help you figure that out before writing a line of code — clear deliverables, no surprises, no wasted budget.",
  },
] as const

export function WhatIDo() {
  return (
    <section id="what-i-do" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <SectionLabel>What I do</SectionLabel>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            From vague idea to shipped product.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/30">
                  <service.icon className="size-6 text-primary" />
                </div>
                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
