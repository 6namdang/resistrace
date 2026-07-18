import type {
  NcbiGenomeSequence,
  NcbiGenomeSummary,
} from "@/types/genome"

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000"

type GenomeSearchResponse = {
  organism: string
  results: NcbiGenomeSummary[]
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    signal,
  })

  if (!response.ok) {
    let message = `Request failed with HTTP ${response.status}.`
    try {
      const body = (await response.json()) as { detail?: string }
      if (body.detail) {
        message = body.detail
      }
    } catch {
      // Keep the status-based message when the response is not JSON.
    }
    throw new Error(message)
  }

  return (await response.json()) as T
}

export function searchNcbiGenomes(
  organism: string,
  signal?: AbortSignal
): Promise<GenomeSearchResponse> {
  const params = new URLSearchParams({
    organism,
    limit: "5",
  })
  return request<GenomeSearchResponse>(
    `/api/ncbi/genomes/search?${params.toString()}`,
    signal
  )
}

export function fetchNcbiGenome(
  uid: string,
  signal?: AbortSignal
): Promise<NcbiGenomeSequence> {
  return request<NcbiGenomeSequence>(`/api/ncbi/genomes/${uid}`, signal)
}
