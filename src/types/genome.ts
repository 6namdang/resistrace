export type NcbiGenomeSummary = {
  uid: string
  accession: string
  title: string
  length: number
  updated_at: string | null
}

export type NcbiGenomeSequence = {
  source: "ncbi"
  uid: string
  accession: string
  header: string
  sequence: string
  length: number
}

export type GenomeSelection =
  | {
      source: "local"
      file: File
    }
  | NcbiGenomeSequence
