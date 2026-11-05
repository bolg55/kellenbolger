// Site-wide settings. Anything left as `null` is hidden or falls back to a
// safe default on the page. Do not invent values.

export type Price = string | null

export const pricing: {
  walkthrough: Price
  build: Price
  monthly: Price
} = {
  // CAD. Add "plus HST" once registered.
  walkthrough: "$300",
  build: "From $2,500",
  monthly: "From $250/month",
}

export const PRICE_FALLBACK = "Pricing on the call"

// TODO(kellen): booking URL (Cal.com or Calendly). Shows a "Pick a time" link
// next to the contact form when set.
export const bookingUrl: string | null = null

// Footer links. Each link only renders when its URL is set.
export const githubUrl: string | null = "https://github.com/bolg55"
export const linkedinUrl: string | null =
  "https://www.linkedin.com/in/kellenbolger/"
