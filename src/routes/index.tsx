import { createFileRoute } from "@tanstack/react-router"
import { Nav } from "@/components/sections/Nav"
import { Hero } from "@/components/sections/Hero"
import { Problem } from "@/components/sections/Problem"
import { Examples } from "@/components/sections/Examples"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Trust } from "@/components/sections/Trust"
import { Work } from "@/components/sections/Work"
import { About } from "@/components/sections/About"
import { Testimonials } from "@/components/sections/Testimonials"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Examples />
        <HowItWorks />
        <Trust />
        <Work />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
