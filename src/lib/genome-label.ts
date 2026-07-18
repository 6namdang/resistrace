import type { GenomeSelection } from "@/types/genome"
import { formatFileSize } from "@/lib/format"

const baseCountFormatter = new Intl.NumberFormat("en-US")

export function getGenomeLabel(genome: GenomeSelection): string {
  if (genome.source === "local") {
    return genome.file.name
  }
  return genome.accession
}

export function getGenomeDetail(genome: GenomeSelection): string {
  if (genome.source === "local") {
    return formatFileSize(genome.file.size)
  }
  return `${baseCountFormatter.format(genome.length)} bp · NCBI`
}
