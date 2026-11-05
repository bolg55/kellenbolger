import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { DotConstellation } from "@/components/DotConstellation"
import { cn } from "@/lib/utils"

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
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4 text-xs font-medium tracking-widest text-primary uppercase"
        >
          Kellen Bolger · Kitchener-Waterloo
        </motion.p>

        {/*
          Alternate headlines:
          - "If you do it every week, I can probably make it go away."
          - "The task that eats your week, turned into a button."
        */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Show me once. Never do it by hand again.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Walk me through the task that eats your week. I&apos;ll turn it into a
          tool, or an AI assistant that knows how you do it, and keep it
          running.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/"
            hash="contact"
            hashScrollIntoView={{ behavior: "smooth" }}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 w-full px-5 text-base sm:w-auto"
            )}
          >
            Book a walkthrough <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link
            to="/"
            hash="examples"
            hashScrollIntoView={{ behavior: "smooth" }}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 w-full px-5 text-base sm:w-auto"
            )}
          >
            See examples
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Working with businesses across Canada · In person or remote
        </motion.p>
      </div>
    </section>
  )
}
