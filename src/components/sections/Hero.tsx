import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DotConstellation } from "@/components/DotConstellation"

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-16 h-[400px] w-[400px] animate-[drift1_14s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.1),transparent_70%)]" />
        <div className="absolute -bottom-10 -right-8 h-[300px] w-[300px] animate-[drift2_18s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgba(251,146,36,0.06),transparent_70%)]" />
      </div>

      {/* Dot constellation */}
      <div className="absolute inset-0 opacity-30">
        <DotConstellation />
      </div>

      {/* Center fade for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0.5)_0%,rgba(9,9,11,0.1)_70%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          I build software that solves real problems for real businesses.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Custom web apps, AI-powered tools, and accounting integrations —
          built fast, built to last.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-8"
        >
          <Link
              to="/"
              hash="contact"
              hashScrollIntoView={{ behavior: "smooth" }}
            >
              <Button size="lg" className="text-base">
                Work with me →
              </Button>
            </Link>
        </motion.div>
      </div>
    </section>
  )
}
