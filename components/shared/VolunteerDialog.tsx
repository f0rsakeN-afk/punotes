"use client";

import { useEffect, useState } from "react";
import { Heart, MessageCircle, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "volunteer-dialog-last-seen";
const WHATSAPP_NUMBER = "9779742302747";

const POINTS = [
  "Share study materials, assignments, or lab reports",
  "One or more volunteer needed from each semester",
  "Directly helps juniors who come after you",
];

export function VolunteerDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (!lastSeen || now - parseInt(lastSeen) > SEVEN_DAYS) {
      const timer = setTimeout(() => setIsOpen(true), 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsOpen(false);
  };

  if (!hasMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
          <DialogContent className="sm:max-w-[420px] border-border/40 bg-background/98 backdrop-blur-xl shadow-2xl p-0 overflow-hidden">
            {/* Header */}
            <div className="relative bg-muted/30 border-b border-border/30 px-6 py-5">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-500/6 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="relative flex items-start gap-3"
              >
                <Heart className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <h2 className="text-base font-bold tracking-tight text-foreground">
                    Help Keep PuNotes Alive
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Looking for one volunteer from each semester.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-[13px] text-muted-foreground leading-relaxed"
              >
                This platform runs on shared materials. If you have notes,
                assignments, or lab reports worth passing on you can make a
                real difference for the juniors who come after you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="space-y-2"
              >
                {POINTS.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <ChevronRight className="w-3 h-3 text-rose-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-3 bg-muted/40 border border-border/40 rounded-lg px-4 py-3"
              >
                <MessageCircle className="w-4 h-4 text-green-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                    Reach out on WhatsApp
                  </p>
                  <p className="text-sm font-bold text-foreground tracking-wide">
                    +977 97423 02747
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <DialogFooter className="px-6 pb-5 pt-0 border-t border-border/20 flex-row gap-3 sm:justify-between items-center bg-muted/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-muted-foreground rounded-full text-xs"
              >
                Maybe later
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full px-5 bg-green-600 hover:bg-green-700 text-white gap-1.5"
                onClick={handleClose}
              >
                <Link
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Contact on WhatsApp
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
