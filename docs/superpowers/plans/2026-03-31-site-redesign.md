# kellenbolger.ca Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio/services site with dark theme, amber accent, scroll sections, Framer Motion animations, and a Resend-powered contact form.

**Architecture:** Single `index.tsx` route composing section components. Data from flat TypeScript files. TanStack Router `<Link>` with `hash` for in-page navigation. Resend contact form via TanStack Start server function.

**Tech Stack:** TanStack Start, Tailwind v4, shadcn/ui, Framer Motion, Resend, Syne + Geist fonts, Lucide icons

**Spec:** `docs/superpowers/specs/2026-03-31-site-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
| --- | --- | --- |
| `src/styles.css` | Modify | Add Syne font import, update `--font-heading` |
| `src/routes/__root.tsx` | Modify | Update meta title, add dark class to html, theme script |
| `src/routes/index.tsx` | Modify | Compose all section components |
| `src/data/caseStudies.ts` | Create | Case study data + types |
| `src/data/testimonials.ts` | Create | Testimonial data + types |
| `src/components/ScrollReveal.tsx` | Create | Framer Motion viewport-enter wrapper |
| `src/components/TiltCard.tsx` | Create | 3D mouse-tracking hover card wrapper |
| `src/components/ThemeToggle.tsx` | Create | Dark/light toggle with localStorage |
| `src/components/sections/Nav.tsx` | Create | Sticky nav with blur, links, theme toggle |
| `src/components/sections/Hero.tsx` | Create | Full-height hero with animated background |
| `src/components/DotConstellation.tsx` | Create | Canvas-based dot animation for hero |
| `src/components/sections/WhatIDo.tsx` | Create | Service cards grid |
| `src/components/sections/Work.tsx` | Create | Case study cards grid |
| `src/components/sections/HowItWorks.tsx` | Create | 3-step process section |
| `src/components/sections/Testimonials.tsx` | Create | Conditionally rendered testimonials |
| `src/components/sections/About.tsx` | Create | Brief about section |
| `src/components/sections/Contact.tsx` | Create | Contact form UI |
| `src/server/contact.ts` | Create | Resend server function |
| `src/components/sections/Footer.tsx` | Create | Simple footer |
| `public/favicon.svg` | Create | `{kB}` SVG favicon |

---

## Task 1: Install dependencies and configure fonts

**Files:**

- Modify: `package.json`
- Modify: `src/styles.css`

- [ ] **Step 1: Install new dependencies**

Run:

```bash
npm install framer-motion @fontsource-variable/syne resend
```

Expected: packages added to `package.json` dependencies

- [ ] **Step 2: Add Syne font import and heading variable to styles.css**

In `src/styles.css`, add the Syne import after the Geist import, and update the heading font variable:

```css
@import "@fontsource-variable/syne";
```

Update the `@theme inline` block — change `--font-heading`:

```css
--font-heading: 'Syne Variable', var(--font-sans);
```

- [ ] **Step 3: Verify dev server starts**

Run:

```bash
npm run dev
```

Expected: dev server starts on port 3000 with no errors

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/styles.css
git commit -m "chore: install framer-motion, syne font, resend"
```

---

## Task 2: Theme toggle and dark mode setup

**Files:**

- Create: `src/components/ThemeToggle.tsx`
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Create ThemeToggle component**

Create `src/components/ThemeToggle.tsx`:

```tsx
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    if (stored) {
      setDark(stored === "dark")
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDark(!dark)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}
```

- [ ] **Step 2: Update __root.tsx with dark class, meta, and theme flash prevention script**

Replace the contents of `src/routes/__root.tsx`:

```tsx
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"

import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kellen Bolger — Software That Solves Real Problems" },
      {
        name: "description",
        content:
          "Custom web apps, AI-powered tools, and accounting integrations — built fast, built to last.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
    scripts: [
      {
        children: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")return;document.documentElement.classList.add("dark")}catch(e){}})()`,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

Note: TanStack DevTools are removed from production layout. Add them back conditionally during development if desired.

- [ ] **Step 3: Verify dark mode works**

Run:

```bash
npm run dev
```

Open `http://localhost:3000`. Page should load with dark background. The ThemeToggle isn't wired into the page yet (that happens in the Nav task), but verify no errors in console.

- [ ] **Step 4: Commit**

```bash
git add src/components/ThemeToggle.tsx src/routes/__root.tsx
git commit -m "feat: add theme toggle and dark mode setup"
```

---

## Task 3: ScrollReveal and TiltCard shared components

**Files:**

- Create: `src/components/ScrollReveal.tsx`
- Create: `src/components/TiltCard.tsx`

- [ ] **Step 1: Create ScrollReveal component**

Create `src/components/ScrollReveal.tsx`:

```tsx
import { motion, type Variants } from "framer-motion"
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
```

- [ ] **Step 2: Create TiltCard component**

Create `src/components/TiltCard.tsx`:

```tsx
import { type ReactNode, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Props = {
  children: ReactNode
  className?: string
}

export function TiltCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -4, y: x * 4 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Verify build passes**

Run:

```bash
npm run typecheck
```

Expected: no type errors

- [ ] **Step 4: Commit**

```bash
git add src/components/ScrollReveal.tsx src/components/TiltCard.tsx
git commit -m "feat: add ScrollReveal and TiltCard shared components"
```

---

## Task 4: Data files

**Files:**

- Create: `src/data/caseStudies.ts`
- Create: `src/data/testimonials.ts`

- [ ] **Step 1: Create case studies data**

Create `src/data/caseStudies.ts`:

```ts
export type CaseStudy = {
  slug: string
  title: string
  tags: string[]
  description: string
  outcome: string
  image: string
  url?: string
  visible: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "tidyar",
    title: "tidyAR",
    tags: ["SaaS", "AI"],
    description:
      "AI-powered invoice generation for trades businesses. Parses messy job data and syncs drafts to QuickBooks and Xero.",
    outcome: "Live product serving real customers",
    image: "/images/tidyar.png",
    url: "https://tidyar.io",
    visible: true,
  },
  {
    slug: "camp-yoga",
    title: "Camp Yoga Scheduler",
    tags: ["Bespoke", "Web App"],
    description:
      "Custom scheduling and client management platform for a boutique yoga retreat. Built end-to-end.",
    outcome: "Full platform delivered from scratch",
    image: "/images/camp-yoga.png",
    visible: true,
  },
  {
    slug: "action-backers",
    title: "Action Backers",
    tags: ["SaaS"],
    description:
      "Sports betting analytics SaaS, built from scratch and scaled to real revenue.",
    outcome: "Scaled to $100K ARR before archiving",
    image: "/images/action-backers.png",
    visible: true,
  },
]
```

- [ ] **Step 2: Create testimonials data**

Create `src/data/testimonials.ts`:

```ts
export type Testimonial = {
  name: string
  company: string
  quote: string
  visible: boolean
}

export const testimonials: Testimonial[] = [
  {
    name: "Placeholder",
    company: "Placeholder",
    quote: "Placeholder testimonial.",
    visible: false,
  },
]
```

- [ ] **Step 3: Create placeholder images directory**

Run:

```bash
mkdir -p public/images
```

Create three placeholder SVGs so the site doesn't break before real screenshots are added. Create `public/images/tidyar.png`, `public/images/camp-yoga.png`, `public/images/action-backers.png` as simple placeholder images (1200x630 dark rectangles with centered text). These will be replaced with real screenshots later.

For now, create a simple placeholder script:

```bash
echo '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect fill="#18181b" width="1200" height="630"/><text x="600" y="315" text-anchor="middle" fill="#71717a" font-family="sans-serif" font-size="32">tidyAR</text></svg>' > public/images/tidyar.svg
echo '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect fill="#18181b" width="1200" height="630"/><text x="600" y="315" text-anchor="middle" fill="#71717a" font-family="sans-serif" font-size="32">Camp Yoga</text></svg>' > public/images/camp-yoga.svg
echo '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect fill="#18181b" width="1200" height="630"/><text x="600" y="315" text-anchor="middle" fill="#71717a" font-family="sans-serif" font-size="32">Action Backers</text></svg>' > public/images/action-backers.svg
```

Then update `caseStudies.ts` image paths to use `.svg` extension instead of `.png` (until real screenshots are added).

- [ ] **Step 4: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/data/caseStudies.ts src/data/testimonials.ts public/images/
git commit -m "feat: add case studies and testimonials data files with placeholder images"
```

---

## Task 5: Nav section

**Files:**

- Create: `src/components/sections/Nav.tsx`

- [ ] **Step 1: Create Nav component**

Create `src/components/sections/Nav.tsx`:

```tsx
import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "What I Do", hash: "what-i-do" },
  { label: "Work", hash: "work" },
  { label: "Contact", hash: "contact" },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-colors duration-300",
        scrolled ? "bg-zinc-950/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          to="/"
          className="font-heading text-lg font-bold tracking-tight text-foreground"
        >
          kellenbolger
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              to="/"
              hash={link.hash}
              hashScrollIntoView={{ behavior: "smooth" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Nav.tsx
git commit -m "feat: add sticky Nav section with hash links and theme toggle"
```

---

## Task 6: Hero section with animated background

**Files:**

- Create: `src/components/DotConstellation.tsx`
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create DotConstellation canvas component**

Create `src/components/DotConstellation.tsx`:

```tsx
import { useEffect, useRef } from "react"

type Props = {
  className?: string
  dotCount?: number
  color?: string
}

export function DotConstellation({
  className,
  dotCount = 70,
  color = "251,191,36",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let dots: { x: number; y: number; vx: number; vy: number }[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
    }

    function init() {
      resize()
      dots = Array.from({ length: dotCount }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }))
    }

    function draw() {
      if (!ctx || !canvas) return
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > W) d.vx *= -1
        if (d.y < 0 || d.y > H) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},0.5)`
        ctx.fill()
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(${color},${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [dotCount, color])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
```

- [ ] **Step 2: Create Hero section**

Create `src/components/sections/Hero.tsx`:

```tsx
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
```

- [ ] **Step 3: Add drift keyframes to styles.css**

Add to the bottom of `src/styles.css`, before the closing of the file:

```css
@keyframes drift1 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(80px, 50px); }
}

@keyframes drift2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-50px, -40px); }
}
```

- [ ] **Step 4: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/components/DotConstellation.tsx src/components/sections/Hero.tsx src/styles.css
git commit -m "feat: add Hero section with gradient mesh and dot constellation"
```

---

## Task 7: What I Do section

**Files:**

- Create: `src/components/sections/WhatIDo.tsx`

- [ ] **Step 1: Create WhatIDo component**

Create `src/components/sections/WhatIDo.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/WhatIDo.tsx
git commit -m "feat: add What I Do section with service cards"
```

---

## Task 8: Work / Case Studies section

**Files:**

- Create: `src/components/sections/Work.tsx`

- [ ] **Step 1: Create Work component**

Create `src/components/sections/Work.tsx`:

```tsx
import { ExternalLink } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"
import { TiltCard } from "@/components/TiltCard"
import { caseStudies } from "@/data/caseStudies"

export function Work() {
  const visible = caseStudies.filter((cs) => cs.visible)

  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Work
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cs, i) => (
            <ScrollReveal key={cs.slug} delay={i * 0.1}>
              <TiltCard className="flex h-full flex-col">
                <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                  {cs.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {cs.description}
                </p>

                <p className="mt-3 text-sm font-medium text-foreground">
                  {cs.outcome}
                </p>

                {cs.url && (
                  <a
                    href={cs.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    View project <ExternalLink className="size-3.5" />
                  </a>
                )}
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Work.tsx
git commit -m "feat: add Work section with case study cards"
```

---

## Task 9: How It Works section

**Files:**

- Create: `src/components/sections/HowItWorks.tsx`

- [ ] **Step 1: Create HowItWorks component**

Create `src/components/sections/HowItWorks.tsx`:

```tsx
import { ScrollReveal } from "@/components/ScrollReveal"

const steps = [
  {
    number: "01",
    title: "Tell me your problem",
    description:
      "No jargon required. We'll have a conversation about what's slowing you down.",
  },
  {
    number: "02",
    title: "I'll scope a solution",
    description:
      "Clear deliverables, a clear plan, and no surprises.",
  },
  {
    number: "03",
    title: "We build it",
    description:
      "Fast iterations, regular demos, and something you'll actually use.",
  },
] as const

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            How It Works
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.15}>
              <div className="relative">
                <span className="font-heading text-4xl font-bold text-primary/20">
                  {step.number}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HowItWorks.tsx
git commit -m "feat: add How It Works section"
```

---

## Task 10: Testimonials section (conditionally rendered)

**Files:**

- Create: `src/components/sections/Testimonials.tsx`

- [ ] **Step 1: Create Testimonials component**

Create `src/components/sections/Testimonials.tsx`:

```tsx
import { ScrollReveal } from "@/components/ScrollReveal"
import { testimonials } from "@/data/testimonials"

export function Testimonials() {
  const visible = testimonials.filter((t) => t.visible)

  if (visible.length === 0) return null

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            What People Say
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {visible.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <blockquote className="rounded-xl border border-border bg-card p-6">
                <p className="text-lg text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm text-muted-foreground">
                  {t.name} — {t.company}
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat: add conditionally rendered Testimonials section"
```

---

## Task 11: About section

**Files:**

- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Create About component**

Create `src/components/sections/About.tsx`:

```tsx
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
                overengineered tools that nobody actually uses. If it doesn&apos;t
                solve a real problem, I&apos;m not interested in building it.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat: add About section"
```

---

## Task 12: Contact form and Resend server function

**Files:**

- Create: `src/server/contact.ts`
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Add shadcn form components**

Run:

```bash
npx shadcn@latest add input textarea label
```

Expected: components added to `src/components/ui/`

- [ ] **Step 2: Create Resend server function**

Create `src/server/contact.ts`:

```ts
import { createServerFn } from "@tanstack/react-start"
import { Resend } from "resend"

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator(
    (data: { name: string; email: string; message: string }) => {
      if (!data.name || !data.email || !data.message) {
        throw new Error("All fields are required")
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        throw new Error("Invalid email address")
      }
      return data
    },
  )
  .handler(async ({ data }) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: "kellenbolger.ca <contact@kellenbolger.ca>",
      to: "kellen@kellenbolger.ca",
      subject: `New contact from ${data.name}`,
      replyTo: data.email,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    })

    return { success: true }
  })
```

- [ ] **Step 3: Create Contact section**

Create `src/components/sections/Contact.tsx`:

```tsx
import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollReveal } from "@/components/ScrollReveal"
import { sendContactEmail } from "@/server/contact"

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await sendContactEmail({
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          message: formData.get("message") as string,
        },
      })
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again or email me directly.")
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-xl px-6">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell me what you&apos;re working on and I&apos;ll get back to you
            within a day or two.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {status === "success" ? (
            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="font-medium text-foreground">
                Thanks! I&apos;ll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive">{errorMessage}</p>
              )}

              <Button type="submit" disabled={status === "sending"} size="lg">
                {status === "sending" ? "Sending..." : "Send message"}
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Verify typecheck**

Run:

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add src/server/contact.ts src/components/sections/Contact.tsx src/components/ui/
git commit -m "feat: add Contact section with Resend server function"
```

---

## Task 13: Footer and favicon

**Files:**

- Create: `src/components/sections/Footer.tsx`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create Footer component**

Create `src/components/sections/Footer.tsx`:

```tsx
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
        &copy; {year} Kellen Bolger
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Create SVG favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#09090b"/>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="800" font-size="16" fill="#fafafa">{<tspan fill="#fbbf24">kB</tspan>}</text>
</svg>
```

- [ ] **Step 3: Update __root.tsx to use SVG favicon**

Add to the `links` array in `__root.tsx` head:

```tsx
{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Footer.tsx public/favicon.svg src/routes/__root.tsx
git commit -m "feat: add Footer and {kB} SVG favicon"
```

---

## Task 14: Compose all sections in index.tsx

**Files:**

- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Replace index.tsx with composed sections**

Replace the contents of `src/routes/index.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify the full site loads**

Run:

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:

- All sections render in order
- Nav is sticky with blur on scroll
- Hero has animated gradient and dot constellation
- Hash links scroll smoothly to sections
- Theme toggle works (switches between dark/light)
- Cards have 3D tilt on hover
- Sections fade in on scroll
- Testimonials section is hidden (no visible testimonials)
- Contact form renders with all fields

- [ ] **Step 3: Run typecheck and lint**

Run:

```bash
npm run typecheck && npm run lint
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: compose all sections into single-page layout"
```

---

## Task 15: Final polish and verification

- [ ] **Step 1: Run full build**

Run:

```bash
npm run build
```

Expected: build completes with no errors

- [ ] **Step 2: Preview production build**

Run:

```bash
npm run preview
```

Open the preview URL. Walk through the entire page and verify everything works as expected in the production build.

- [ ] **Step 3: Format all files**

Run:

```bash
npm run format
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: format all files"
```
