import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref, onAction, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-4 border rounded-xl bg-card", className)}>
      {icon && <div className="w-12 h-12 opacity-20 mb-3 flex items-center justify-center">{icon}</div>}
      <h3 className="font-semibold text-base">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>}
      {(actionLabel && (actionHref || onAction)) && (
        <Button asChild={!!actionHref} onClick={onAction} size="sm" className="mt-4">
          {actionHref ? <Link href={actionHref}>{actionLabel}</Link> : <span>{actionLabel}</span>}
        </Button>
      )}
    </div>
  );
}
