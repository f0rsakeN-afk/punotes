// Instant fallback shown during client-side navigation while the
// (main) layout/page server components (auth + data) resolve.
export default function MainLoading() {
  return (
    <div className="animate-pulse" aria-hidden>
      <div className="h-8 w-48 bg-muted rounded-lg mb-2" />
      <div className="h-4 w-72 max-w-full bg-muted rounded mb-8" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-4 space-y-3">
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-3 w-1/2 bg-muted rounded" />
            <div className="h-3 w-1/4 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
