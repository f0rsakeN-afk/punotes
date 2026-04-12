import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-8 w-64" />
      </div>
      <Skeleton className="h-10 w-72 mb-7" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 p-4 rounded-xl border border-border/60">
            <div className="flex items-start gap-3">
              <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-3 w-1/3 ml-11" />
            <div className="flex items-center gap-2 ml-11">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
