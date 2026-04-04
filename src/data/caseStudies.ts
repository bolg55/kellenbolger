export type CaseStudy = {
  slug: string
  title: string
  tags: Array<string>
  description: string
  outcome: string
  image: string
  url?: string
  visible: boolean
}

export const caseStudies: Array<CaseStudy> = [
  {
    slug: "tidyar",
    title: "tidyAR",
    tags: ["SaaS", "AI"],
    description:
      "AI-powered accounts receivable tool for trades businesses. Parses messy job data and syncs invoice drafts directly to QuickBooks and Xero.",
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
      "Full scheduling and client management platform for a boutique yoga retreat — replacing a $400/month MindBody subscription with something built exactly to fit.",
    outcome: "Full platform delivered end-to-end",
    image: "/images/camp-yoga.png",
    visible: true,
  },
  {
    slug: "action-backers",
    title: "Action Backers",
    tags: ["SaaS"],
    description:
      "Sports betting analytics and bet-tracking SaaS, built from scratch and scaled to real revenue — including automated bet grading via live score APIs.",
    outcome: "Scaled to $100K ARR before archiving",
    image: "/images/action-backers.webp",
    visible: true,
  },
]
