import { motion } from "framer-motion"
import type { Variants } from "framer-motion"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "left" | "right"
  className?: string
}

const directionOffset = {
  up: { x: 0, y: 24 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  className,
}: Props) {
  const offset = directionOffset[direction]

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: { opacity: 1, x: 0, y: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
