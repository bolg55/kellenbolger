export type Testimonial = {
  name: string
  company: string
  quote: string
  visible: boolean
}

// Add real client quotes only. Do not fabricate.
export const testimonials: Array<Testimonial> = []
