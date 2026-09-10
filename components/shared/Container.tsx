import { cn } from "@/lib/utils";

// Single source of truth for horizontal page alignment.
// Matches the header/footer chrome gutters at every breakpoint.
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
