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
    image: "https://media.kellenbolger.ca/tidyar.png",
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
    image: "/images/camp-yoga.svg",
    visible: true,
  },
  {
    slug: "action-backers",
    title: "Action Backers",
    tags: ["SaaS"],
    description:
      "Sports betting analytics SaaS, built from scratch and scaled to real revenue.",
    outcome: "Scaled to $100K ARR before archiving",
    image: "https://media.kellenbolger.ca/action_backers.png",
    visible: true,
  },
]
