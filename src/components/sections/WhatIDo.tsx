import { Code, Bot, Receipt, Layers } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"
import { TiltCard } from "@/components/TiltCard"

const services = [
  {
    icon: Code,
    title: "Custom Web Apps",
    description:
      "Bespoke tools built around how your business actually works.",
  },
  {
    icon: Bot,
    title: "AI-Powered Automation",
    description:
      "Turn repetitive manual work into something your team never has to think about again.",
  },
  {
    icon: Receipt,
    title: "Accounting Integrations",
    description: "QuickBooks, Xero, and everything in between.",
  },
  {
    icon: Layers,
    title: "Headless CMS & Content Architecture",
    description:
      "Scalable content infrastructure for teams that have outgrown WordPress.",
  },
] as const

export function WhatIDo() {
  return (
    <section id="what-i-do" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            What I Do
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <TiltCard>
                <service.icon className="size-6 text-primary" />
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
