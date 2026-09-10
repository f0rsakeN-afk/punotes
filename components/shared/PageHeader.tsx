import { cn } from "@/lib/utils";

// Standard page heading: one H1 scale, one spacing rhythm everywhere.
// Use `center` for landing-style centered headers (share, contribute).
export function PageHeader({
  title,
  description,
  center,
  className,
}: {
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "text-center", className)}>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
        {title}
      </h1>
      {description && (
        <p className={cn("text-sm text-muted-foreground", center && "max-w-xl mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
