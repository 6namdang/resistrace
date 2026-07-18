export function DashboardHeader() {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
        Dashboard
      </p>
      <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        Start a genome analysis
      </h1>
      <p className="text-sm text-muted-foreground">
        Search NCBI or upload one quality-checked reconstructed bacterial genome.
      </p>
    </div>
  )
}
