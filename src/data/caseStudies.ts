export type CaseStudyStatus = "client" | "own-product" | "prototype"

export const statusLabels: Record<CaseStudyStatus, string> = {
  client: "Client work",
  "own-product": "My product",
  prototype: "Prototype",
}

// Categories mirror the offer, so each project proves one part of it.
// Order here sets the group order on /work.
export const categories = [
  {
    id: "tool",
    label: "A repetitive task, turned into a tool",
    heading: "Tools that do the repetitive work",
  },
  {
    id: "ai",
    label: "AI that works with your software",
    heading: "AI that works with your software",
  },
  {
    id: "app",
    label: "A custom app",
    heading: "Custom apps",
  },
  {
    id: "website",
    label: "A website you can update yourself",
    heading: "Websites you can update yourself",
  },
] as const

export type CaseStudyCategory = (typeof categories)[number]["id"]

export const categoryLabels = Object.fromEntries(
  categories.map((c) => [c.id, c.label])
) as Record<CaseStudyCategory, string>

export type CaseStudy = {
  slug: string
  title: string
  category: CaseStudyCategory
  status: CaseStudyStatus
  description: string
  outcome: string
  image?: string
  url?: string
  // Shown on /work only, in a smaller muted style. The one place technical
  // terms are allowed.
  howItsBuilt?: string
  // Homepage shows featured entries, ordered by category. Aim for one per
  // part of the offer.
  featured?: boolean
  visible: boolean
}

// Only real projects and real numbers. No adoption, payment or time-saved
// claims for prototypes.
export const caseStudies: Array<CaseStudy> = [
  {
    // One project. Do not name the person, the insurance company or any
    // financial institution. Screenshot uses dummy data.
    // TODO(kellen): if it's ever delivered and in use, change `status` to
    // "client" and update the outcome line.
    slug: "fee-change-prototype",
    title: "A 20–60 minute task, down to about a second",
    category: "tool",
    status: "prototype",
    description:
      "A prototype for a repetitive process an insurance team did by hand: turning messy fee-change spreadsheets into clean, formatted English and French output. A simple interface plus a parser. No AI needed.",
    outcome: "Prototype handled a 20–60 minute task in about a second.",
    image: "/images/fee-change.jpg",
    howItsBuilt:
      "Vite front end, a Hono API and a custom spreadsheet parser. No AI.",
    featured: true,
    visible: true,
  },
  {
    slug: "tidyar",
    title: "tidyAR",
    category: "ai",
    status: "own-product",
    description:
      "A working tool that reads messy job data, drafts invoices with AI, and syncs them to QuickBooks and Xero.",
    outcome: "Built and running end-to-end.",
    image: "/images/tidyar.png",
    url: "https://tidyar.io",
    howItsBuilt:
      "Turborepo monorepo: a React and TanStack Start app on a Convex backend, Gemini for AI drafting, QuickBooks and Xero APIs, and an Astro marketing site.",
    featured: true,
    visible: true,
  },
  {
    slug: "rpm-construction",
    title: "RPM Construction",
    category: "website",
    status: "client",
    description:
      "A family-run renovation company's website, years old and impossible to update, rebuilt as a fast, modern site.",
    outcome: "They now edit any page and upload new photos themselves.",
    image: "/images/rpm-construction.jpg",
    url: "https://rpmconstructionltd.com/",
    howItsBuilt:
      "Strapi for content and an Astro front end, hosted on Cloudflare.",
    featured: true,
    visible: true,
  },
  {
    slug: "action-backers",
    title: "Action Backers",
    category: "app",
    status: "own-product",
    description:
      "My own sports analytics and bet-tracking software business, built from scratch, including automated bet grading from live score data.",
    outcome: "Built and ran it to $100K in annual revenue.",
    image: "/images/action-backers.webp",
    // TODO(kellen): confirm Fastify.
    howItsBuilt:
      "Monorepo with React, Vite and TanStack on the front end, a Fastify API, and live score API integrations.",
    visible: true,
  },
  {
    // Kept unnamed: the client never signed off on being shown.
    slug: "camp-yoga",
    title: "Class booking for a yoga retreat",
    category: "app",
    status: "prototype",
    description:
      "A scheduling and client management prototype for a boutique yoga retreat, built as a custom replacement for a $400/month subscription.",
    outcome: "Working prototype, built end-to-end.",
    image: "/images/camp-yoga.png",
    howItsBuilt: "Vite front end with a Hono API.",
    featured: true,
    visible: true,
  },
  // TODO(kellen): add Pioneer Log Homes (category: "website") once launched
  // and approved by client
]

export const visibleCaseStudies = caseStudies.filter((cs) => cs.visible)
const categoryOrder: Array<CaseStudyCategory> = categories.map((c) => c.id)
export const featuredCaseStudies = visibleCaseStudies
  .filter((cs) => cs.featured)
  .sort(
    (a, b) =>
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
  )
export const caseStudiesByCategory = categories
  .map((category) => ({
    ...category,
    items: visibleCaseStudies.filter((cs) => cs.category === category.id),
  }))
  .filter((group) => group.items.length > 0)
