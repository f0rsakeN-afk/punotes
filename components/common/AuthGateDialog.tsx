"use client";

import { LogIn, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthGateDialog({ open, onOpenChange }: AuthGateDialogProps) {
  const pathname = usePathname();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[380px] border-border/50 bg-background/98 backdrop-blur-xl shadow-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="relative bg-muted/30 border-b border-border/30 px-6 py-5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/6 to-transparent" />
          <div className="relative flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-foreground">
                Sign in to continue
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Create a free account to view and download notes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-5 flex-row gap-3 sm:justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="rounded-full text-xs text-muted-foreground"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            asChild
            className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 gap-1.5"
          >
            <Link href={`/handler/signin?after=${encodeURIComponent(pathname)}`}>
              <LogIn className="w-3.5 h-3.5" />
              Sign in
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
