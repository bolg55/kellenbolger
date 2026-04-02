import type { ReactNode } from "react"

const SectionLabel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-3 text-xs font-medium tracking-widest text-primary uppercase">
      {children}
    </div>
  )
}
export default SectionLabel
