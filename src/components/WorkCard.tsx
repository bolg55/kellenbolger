import { ExternalLink } from "lucide-react"
import type { CaseStudy } from "@/data/caseStudies"
import { TiltCard } from "@/components/TiltCard"
import { categoryLabels, statusLabels } from "@/data/caseStudies"

type Props = {
  caseStudy: CaseStudy
  showBuildNotes?: boolean
  showCategory?: boolean
  headingLevel?: "h2" | "h3"
}

export function WorkCard({
  caseStudy: cs,
  showBuildNotes = false,
  showCategory = false,
  headingLevel: Heading = "h3",
}: Props) {
  return (
    <TiltCard className="flex h-full flex-col">
      {cs.image && (
        <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-muted">
          <img
            src={cs.image}
            alt={`Screenshot of ${cs.title}`}
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}

      {showCategory && (
        <p className="mb-2 text-xs font-medium tracking-widest text-primary uppercase">
          {categoryLabels[cs.category]}
        </p>
      )}

      <div>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {statusLabels[cs.status]}
        </span>
      </div>

      <Heading className="mt-3 font-heading text-lg font-semibold text-foreground">
        {cs.title}
      </Heading>

      <p className="mt-2 text-sm text-muted-foreground">{cs.description}</p>

      <p className="mt-3 text-sm font-medium text-foreground">{cs.outcome}</p>

      {showBuildNotes && cs.howItsBuilt && (
        <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="font-medium">How it&apos;s built:</span>{" "}
          {cs.howItsBuilt}
        </p>
      )}

      {cs.url && (
        <a
          href={cs.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm text-primary hover:underline"
        >
          Visit {cs.title} <ExternalLink className="size-3.5" />
        </a>
      )}
    </TiltCard>
  )
}
