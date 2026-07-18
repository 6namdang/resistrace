import { useCallback, useId, useRef, useState } from "react"
import {
  FileUp,
  FileWarning,
  Replace,
  Trash2,
  UploadCloud,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatFileSize, isFastaFilename } from "@/lib/format"
import { cn } from "@/lib/utils"

type FastaUploadPanelProps = {
  file: File | null
  onFileChange: (file: File | null) => void
}

export function FastaUploadPanel({
  file,
  onFileChange,
}: FastaUploadPanelProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const applyFile = useCallback(
    (next: File | null) => {
      if (!next) {
        setError(null)
        onFileChange(null)
        return
      }

      if (!isFastaFilename(next.name)) {
        setError("Select a reconstructed genome file ending in .fasta, .fa, or .fna.")
        return
      }

      setError(null)
      onFileChange(next)
    },
    [onFileChange]
  )

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const selected = files?.[0] ?? null
      applyFile(selected)
    },
    [applyFile]
  )

  return (
    <Card className="rounded-lg shadow-none">
      <CardHeader className="border-b border-border/70">
        <CardTitle>Upload genome</CardTitle>
        <CardDescription>
          FASTA, FA, or FNA format.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              inputRef.current?.click()
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={(event) => {
            event.preventDefault()
            setIsDragging(false)
          }}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            handleFiles(event.dataTransfer.files)
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-4 py-9 text-center transition-colors",
            isDragging
              ? "border-primary bg-accent/80"
              : "border-border bg-muted/40 hover:border-primary/50 hover:bg-accent/40",
            error ? "border-destructive/50" : null
          )}
          aria-controls={inputId}
          aria-label="Select or drop a FASTA genome file"
        >
          <div className="flex size-10 items-center justify-center rounded-md bg-card ring-1 ring-border">
            <UploadCloud className="size-5 text-primary" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Drop a FASTA file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Accepted formats: .fasta, .fa, .fna
            </p>
          </div>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept=".fasta,.fa,.fna,text/plain"
            className="sr-only"
            onChange={(event) => {
              handleFiles(event.target.files)
              event.target.value = ""
            }}
          />
        </div>

        {error ? (
          <div className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
            <FileWarning className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <p>{error}</p>
          </div>
        ) : null}

        {file ? (
          <div className="flex flex-col gap-3 rounded-md border border-border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <FileUp className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)} · selected in this browser session
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-md"
                onClick={() => inputRef.current?.click()}
              >
                <Replace data-icon="inline-start" />
                Replace
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-md"
                onClick={() => applyFile(null)}
              >
                <Trash2 data-icon="inline-start" />
                Remove
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Files remain local until analysis begins.
        </p>
        <Button type="button" disabled className="rounded-md">
          Start analysis
        </Button>
      </CardFooter>
    </Card>
  )
}
