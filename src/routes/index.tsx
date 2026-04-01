import { createFileRoute } from "@tanstack/react-router"
import { Nav } from "@/components/sections/Nav"
import { Hero } from "@/components/sections/Hero"
import { WhatIDo } from "@/components/sections/WhatIDo"
import { Work } from "@/components/sections/Work"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Testimonials } from "@/components/sections/Testimonials"
import { About } from "@/components/sections/About"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatIDo />
        <Work />
        <HowItWorks />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
