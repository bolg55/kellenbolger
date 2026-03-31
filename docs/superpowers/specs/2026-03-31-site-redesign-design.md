# kellenbolger.ca — Site Redesign Design Spec

## Overview

Single-page portfolio/services site for Kellen Bolger, positioning as a software engineer who solves real business problems — not a freelancer, not an agency, not a "developer for hire." The site targets non-technical business owners (the "Whitney" persona) who need custom software but don't know where to start.

**Key positioning decisions:**
- No employer mention, no "side gig" framing — the site presents Kellen as someone who does this, full stop
- No pricing page or rate card — pricing is value-based and tied to the specific problem
- No blog, no resume, no tech stack badges

---

## Architecture

### Approach: Single route, section components

One `index.tsx` route composes all sections in order. Each section is a self-contained component in `src/components/sections/`. Data lives in flat TypeScript files in `src/data/`.

Navigation uses TanStack Router's `<Link>` component with `hash` prop and `hashScrollIntoView={{ behavior: 'smooth' }}` for in-page scrolling — no raw anchor tags.

### File Structure

```
src/
├── components/
│   ├── ui/                # shadcn components (button, input, textarea, label)
│   ├── sections/
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx
│   │   ├── WhatIDo.tsx
│   │   ├── Work.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── CaseStudyCard.tsx
│   ├── ServiceCard.tsx
│   ├── ScrollReveal.tsx   # reusable Framer Motion wrapper
│   └── ThemeToggle.tsx
├── data/
│   ├── caseStudies.ts
│   └── testimonials.ts
├── lib/
│   └── utils.ts           # existing cn() utility
├── routes/
│   ├── __root.tsx          # HTML shell, fonts, meta
│   └── index.tsx           # composes all sections
├── server/
│   └── contact.ts          # Resend server function
├── styles.css              # Tailwind theme
├── router.tsx
└── routeTree.gen.ts
```

---

## Design Language

### Theme
- **Base:** Dark (`zinc-950`), off-white text
- **Accent:** Warm amber (`amber-400` / `orange-400`) — distinctive against the sea of blue/purple dev portfolios
- **Color system:** CSS custom properties via shadcn/Tailwind, oklch-based. Accent is trivially swappable later if amber doesn't feel right in practice (emerald/blue gradient was the runner-up).
- **Light mode:** Supported via theme toggle. Dark is the default.

### Typography
- **Headings:** Syne (variable) — geometric, confident, slightly unusual
- **Body:** Geist (variable, already installed) — clean, modern
- **Logo text:** "kellenbolger" in Syne, bold

### Motion
- **Framer Motion** for:
  - Hero text: staggered entrance on page load
  - Sections: fade + slide up on viewport enter via `ScrollReveal` wrapper
  - Cards: subtle 3D hover effect — light perspective tilt (1-2deg) tracking mouse position + shadow elevation. The card barely acknowledges the mouse, it doesn't perform for it.
  - Nav: backdrop blur transition on scroll

### Layout
- Generous whitespace
- Full-width hero (100vh)
- Constrained content width (~768px max for text blocks)
- Responsive grid for cards (2x2 desktop, stacked mobile)

---

## Sections

### 1. Nav
- Sticky, `backdrop-blur-md`
- Transparent at top, transitions to `bg-zinc-950/80` on scroll
- **Left:** "kellenbolger" in Syne bold, links to top
- **Right:** `Work`, `What I Do`, `Contact` — TanStack `<Link>` with `hash` + smooth scroll
- **Far right:** Theme toggle (sun/moon icons from Lucide), persists to `localStorage`
- No hamburger menu — 3 links + icon is compact enough. Revisit only if it breaks on very small screens.

### 2. Hero
- Full viewport height, vertically centered
- **Background layers (bottom to top):**
  1. Dark base (`zinc-950`)
  2. Amber gradient mesh — 2-3 radial gradient blobs with slow CSS animation (`12-18s` alternate)
  3. Dot constellation — lightweight `<canvas>`, ~60-80 amber dots with connecting lines when within proximity. Slow drift, no mouse interaction needed.
  4. Subtle center fade for text readability
- **Headline (Syne):** "I build software that solves real problems for real businesses."
- **Sub-line (Geist):** "Custom web apps, AI-powered tools, and accounting integrations — built fast, built to last."
- **CTA:** "Work with me →" — amber button, scrolls to contact section
- **Animation:** Staggered Framer Motion entrance (headline → sub-line → CTA)

### 3. What I Do
- Section id: `what-i-do`
- 4 cards in responsive grid (2x2 desktop, stacked mobile)
- Each card: Lucide icon + short label + one sentence
- Cards:
  - **Custom Web Apps** — "Bespoke tools built around how your business actually works."
  - **AI-Powered Automation** — "Turn repetitive manual work into something your team never has to think about again."
  - **Accounting Integrations** — "QuickBooks, Xero, and everything in between."
  - **Headless CMS & Content Architecture** — "Scalable content infrastructure for teams that have outgrown WordPress."
- Subtle 3D hover lift on each card

### 4. Work / Case Studies
- Section id: `work`
- Cards rendered from `src/data/caseStudies.ts`, filtered by `visible: true`
- Each card: screenshot image, title, tag pills, short description, outcome line
- Optional `url` field — renders "View project →" link only when provided
- 3D hover effect matching service cards
- ScrollReveal fade-in

**Initial data:**

| Project | Tags | URL | Notes |
|---------|------|-----|-------|
| tidyAR | SaaS, AI | https://tidyar.io | Live, link to it |
| Camp Yoga Scheduler | Bespoke, Web App | — | In progress, no link yet |
| Action Backers | SaaS | — | Archived, no link |

Screenshots: grab from live sites (tidyAR, Camp Yoga) and dig up old Action Backers assets. Playwright available for screenshots if needed.

### 5. How It Works
- 3 numbered steps, horizontal on desktop, vertical on mobile
- Subtle connecting line/dots between steps
- Steps:
  1. **Tell me your problem** — "No jargon required. We'll have a conversation about what's slowing you down."
  2. **I'll scope a solution** — "Clear deliverables, a clear plan, and no surprises."
  3. **We build it** — "Fast iterations, regular demos, and something you'll actually use."
- No mention of pricing model — pricing is a conversation, not a page element

### 6. Testimonials
- Fully built component, but **entire section conditionally rendered** — hidden when `testimonials.filter(t => t.visible).length === 0`
- Data from `src/data/testimonials.ts`
- Card layout: quote in large text, name, company
- Flip `visible: true` on a testimonial to show the section — no code changes needed

### 7. About
- Section id: `about` (no nav link — it's a brief section, not a destination)
- 2-3 sentences, no resume energy:
  - Software engineer based in Waterloo
  - Enjoys turning messy business problems into clean software
  - Opinionated about simplicity
- Optional photo: renders if image path is provided in a config constant, hidden otherwise

### 8. Contact
- Section id: `contact`
- Heading: "Let's work together" or similar
- Form fields: name (`Input`), email (`Input`), message (`Textarea`)
- Submit button: shadcn `Button`, amber accent
- **Backend:** TanStack Start server function in `src/server/contact.ts`
  - Calls Resend API to send email to Kellen
  - API key via `RESEND_API_KEY` environment variable
  - Returns success/error response
- **UI states:** loading spinner on submit, success message, error message (inline, no toast library needed)
- Basic validation: required fields, email format

---

## Data Structures

### Case Studies (`src/data/caseStudies.ts`)

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
    description: "AI-powered invoice generation for trades businesses. Parses messy job data and syncs drafts to QuickBooks and Xero.",
    outcome: "Live product serving real customers",
    image: "/images/tidyar.png",
    url: "https://tidyar.io",
    visible: true,
  },
  {
    slug: "camp-yoga",
    title: "Camp Yoga Scheduler",
    tags: ["Bespoke", "Web App"],
    description: "Custom scheduling and client management platform for a boutique yoga retreat. Built end-to-end.",
    outcome: "Full platform delivered from scratch",
    image: "/images/camp-yoga.png",
    visible: true,
  },
  {
    slug: "action-backers",
    title: "Action Backers",
    tags: ["SaaS"],
    description: "Sports betting analytics SaaS, built from scratch and scaled to real revenue.",
    outcome: "Scaled to $100K ARR before archiving",
    image: "/images/action-backers.png",
    visible: true,
  },
]
```

### Testimonials (`src/data/testimonials.ts`)

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

---

## Technical Decisions

### Stack (confirmed)
- **Framework:** TanStack Start (SSR, mostly static)
- **Styling:** Tailwind v4 with shadcn components
- **Animation:** Framer Motion
- **Email:** Resend (server function, not API route)
- **Fonts:** Syne (headings, new), Geist (body, existing)
- **Icons:** Lucide React (existing)

### Not in scope for initial build
- Cloudflare Web Analytics (add when site goes live)
- Blog
- Case study detail pages / modals (can add later)
- OG image generation (do manually or add later)
- Domain transfer / DNS (separate task)
- Hamburger menu (only add if mobile layout breaks)

### Favicon
- `{kB}` mark — Syne bold initials, subtle amber braces
- Generate as SVG favicon for crisp rendering at all sizes

### Theme Toggle
- Dark default
- Respects `prefers-color-scheme` on first visit
- Toggle persists preference to `localStorage`
- Uses existing `.dark` class mechanism from shadcn setup

### ScrollReveal Component
- Thin Framer Motion wrapper
- Props: `delay`, `direction` (up/left/right), `duration`
- Uses `whileInView` with `once: true` — animates in once, doesn't repeat
- Applied to each section wrapper

### 3D Card Hover Effect
- `onMouseMove` tracks cursor position relative to card
- Applies `transform: perspective(800px) rotateX(Ydeg) rotateY(Xdeg)` — max 2 degrees
- Elevated `box-shadow` on hover
- Smooth transition, resets on mouse leave
- Can be extracted as a reusable wrapper or hook

---

## Open Questions (none)

All design decisions have been resolved through brainstorming.
