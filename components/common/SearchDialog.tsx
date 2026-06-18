"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, FileText, BookOpen, ScrollText, Loader2, X, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchResult {
  type: "NOTES" | "SYLLABUS" | "PYQ";
  id: string;
  title: string;
  branch: string;
  semester: string;
  url: string;
  createdAt: string;
  subject?: string;
}

const typeIcon = {
  NOTES: FileText,
  SYLLABUS: BookOpen,
  PYQ: ScrollText,
};

const typeLabel = {
  NOTES: "Note",
  SYLLABUS: "Syllabus",
  PYQ: "PYQ",
};

export function SearchDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const user = useUser();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  // Search when query changes
  useEffect(() => {
    if (!query || query.length < 2 || !user) {
      setResults([]);
      return;
    }

    const debounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setSelectedIndex(0);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, user]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        const result = results[selectedIndex];
        if (result.type === "NOTES") {
          router.push(`/pdfs/${encodeURIComponent(result.branch)}/${result.semester}`);
        } else if (result.type === "SYLLABUS") {
          router.push("/syllabus");
        } else {
          router.push("/pyqs");
        }
        setOpen(false);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [results, selectedIndex, router]
  );

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden bg-background dark:bg-black/90 backdrop-blur-xl">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b border-border/60 dark:border-border/40">
            {loading ? (
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
            ) : (
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search notes, syllabus, PYQs..."
              className="border-0 shadow-none h-12 text-base focus-visible:ring-0 px-2 bg-transparent dark:text-foreground placeholder:text-muted-foreground flex-1"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {!user ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Sign in to search
              </div>
            ) : query.length < 2 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Type at least 2 characters to search
              </div>
            ) : results.length === 0 && !loading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              <div className="space-y-1">
                {results.map((result, i) => {
                  const Icon = typeIcon[result.type];
                  return (
                    <button
                      key={result.id}
                      onClick={() => {
                        if (result.type === "NOTES") {
                          router.push(`/pdfs/${encodeURIComponent(result.branch)}/${result.semester}`);
                        } else if (result.type === "SYLLABUS") {
                          router.push("/syllabus");
                        } else {
                          router.push("/pyqs");
                        }
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                        i === selectedIndex ? "bg-primary/15 dark:bg-primary/20" : "hover:bg-muted/60 dark:hover:bg-muted/40"
                      )}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm font-medium truncate",
                          i === selectedIndex && "text-foreground"
                        )}>{result.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {result.branch} &middot; Sem {result.semester}
                          {result.subject && ` · ${result.subject}`}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-medium px-1.5 py-0.5 rounded bg-primary/10 dark:bg-primary/25 text-primary">
                        {typeLabel[result.type]}
                      </span>
                      <ArrowRight className={cn(
                        "w-3.5 h-3.5 shrink-0 transition-colors",
                        i === selectedIndex ? "text-primary" : "text-muted-foreground"
                      )} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="px-4 py-2.5 border-t border-border/60 dark:border-border/40 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted dark:bg-muted/80 text-[10px] font-mono">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted dark:bg-muted/80 text-[10px] font-mono">↵</kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted dark:bg-muted/80 text-[10px] font-mono">Esc</kbd>
              Close
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
