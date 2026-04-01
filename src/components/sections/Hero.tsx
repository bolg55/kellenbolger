import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DotConstellation } from "@/components/DotConstellation"

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Gradient mesh background — dark mode */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute -top-20 -left-16 h-125 w-125 animate-[drift1_14s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.15),transparent_70%)]" />
        <div className="absolute -right-8 -bottom-10 h-100 w-100 animate-[drift2_18s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.08),transparent_70%)]" />
        <div className="absolute top-1/3 left-1/2 h-75 w-75 animate-[drift1_20s_ease-in-out_infinite_alternate-reverse] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.06),transparent_70%)]" />
      </div>
      {/* Gradient mesh background — light mode (stronger opacity) */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute -top-20 -left-16 h-125 w-125 animate-[drift1_14s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.12),transparent_70%)]" />
        <div className="absolute -right-8 -bottom-10 h-100 w-100 animate-[drift2_18s_ease-in-out_infinite_alternate] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.07),transparent_70%)]" />
        <div className="absolute top-1/3 left-1/2 h-75 w-75 animate-[drift1_20s_ease-in-out_infinite_alternate-reverse] rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.05),transparent_70%)]" />
      </div>

      {/* Dot constellation */}
      <div className="absolute inset-0">
        <DotConstellation />
      </div>

      {/* Center fade for readability — different for light/dark */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0.4)_0%,transparent_60%)] dark:block" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5)_0%,transparent_50%)] dark:hidden" />

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
          Custom web apps, AI-powered tools, and accounting integrations — built
          fast, built to last.
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
              Work with me <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
