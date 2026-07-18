import { ArrowLeft, Dna } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getGenomeDetail, getGenomeLabel } from "@/lib/genome-label"
import type { GenomeSelection } from "@/types/genome"

type AnalyzePageProps = {
  selectedGenome: GenomeSelection
  onBack: () => void
}

export function AnalyzePage({ selectedGenome, onBack }: AnalyzePageProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 p-5 md:p-8 lg:pt-10">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Analyze
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Resistance analysis
        </h1>
        <p className="text-sm text-muted-foreground">
          Your genome is ready. Analysis will run when the prediction service is
          connected.
        </p>
      </div>

      <Card className="rounded-lg shadow-none">
        <CardHeader className="border-b border-border/70">
          <CardTitle>Selected genome</CardTitle>
          <CardDescription>
            Confirm the input before starting analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3">
            <Dna
              className="mt-0.5 size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {getGenomeLabel(selectedGenome)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {getGenomeDetail(selectedGenome)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="rounded-md"
            >
              <ArrowLeft aria-hidden="true" />
              Back
            </Button>
            <Button type="button" disabled className="rounded-md">
              Start analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
