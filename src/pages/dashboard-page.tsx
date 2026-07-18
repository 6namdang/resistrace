import { useState } from "react"
import { ArrowRight, Database, FileUp } from "lucide-react"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FastaUploadPanel } from "@/components/dashboard/fasta-upload-panel"
import { NcbiGenomeSearch } from "@/components/dashboard/ncbi-genome-search"
import { Button } from "@/components/ui/button"
import type { GenomeSelection } from "@/types/genome"
import { cn } from "@/lib/utils"

type DashboardPageProps = {
  selectedGenome: GenomeSelection | null
  onSelectedGenomeChange: (genome: GenomeSelection | null) => void
  onContinue: () => void
}

export function DashboardPage({
  selectedGenome,
  onSelectedGenomeChange,
  onContinue,
}: DashboardPageProps) {
  const [source, setSource] = useState<"ncbi" | "local">("ncbi")
  const selectedFile =
    selectedGenome?.source === "local" ? selectedGenome.file : null
  const selectedNcbiGenome =
    selectedGenome?.source === "ncbi" ? selectedGenome : null
  const canContinue = selectedGenome !== null

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 p-5 md:p-8 lg:pt-10">
      <DashboardHeader />

      <div
        className="inline-flex w-fit rounded-md border border-border bg-muted/50 p-1"
        role="group"
        aria-label="Genome source"
      >
        <Button
          type="button"
          size="sm"
          variant={source === "ncbi" ? "secondary" : "ghost"}
          onClick={() => setSource("ncbi")}
          className={cn(
            "rounded-[4px]",
            source === "ncbi" && "bg-background shadow-sm"
          )}
        >
          <Database />
          Search NCBI
        </Button>
        <Button
          type="button"
          size="sm"
          variant={source === "local" ? "secondary" : "ghost"}
          onClick={() => setSource("local")}
          className={cn(
            "rounded-[4px]",
            source === "local" && "bg-background shadow-sm"
          )}
        >
          <FileUp />
          Upload FASTA
        </Button>
      </div>

      {source === "ncbi" ? (
        <NcbiGenomeSearch
          selectedGenome={selectedNcbiGenome}
          onGenomeChange={onSelectedGenomeChange}
        />
      ) : (
        <FastaUploadPanel
          file={selectedFile}
          onFileChange={(file) =>
            onSelectedGenomeChange(
              file
                ? {
                    source: "local",
                    file,
                  }
                : null
            )
          }
        />
      )}

      <div className="flex items-center justify-end border-t border-border pt-4">
        <Button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="rounded-md"
        >
          Next
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
