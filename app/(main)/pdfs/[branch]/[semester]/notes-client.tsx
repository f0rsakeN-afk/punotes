"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FileText, FileSearch, Link2, Check, Star, Share2, Filter, X, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@stackframe/stack";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ShareQRDialog } from "@/components/common/ShareQRDialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PDFViewerDialog = dynamic(
  () => import("@/components/common/PDFViewerDialog").then((m) => m.PDFViewerDialog),
  { loading: () => <Button size="sm" className="h-8 text-xs gap-1.5" disabled>Loading...</Button> }
);

const AuthGateDialog = dynamic(
  () => import("@/components/common/AuthGateDialog").then((m) => m.AuthGateDialog),
  { loading: () => null }
);

interface NotesData {
  id: string;
  name: string;
  subject: string;
  fileSize: string;
  url: string;
  createdAt: Date;
  semester: string;
  branch: string;
}

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCopy();
      }}
      className="inline-flex items-center justify-center gap-1.5 h-8 px-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
      title="Copy link"
    >
      {copied ? <Check className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
    </button>
  );
}

function ShareButton({ url, title }: { url: string; title: string }) {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setQrOpen(true);
        }}
        className="inline-flex items-center justify-center gap-1.5 h-8 px-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        title="Share"
      >
        <Share2 className="w-3 h-3" />
      </button>
      <ShareQRDialog url={url} title={title} open={qrOpen} onOpenChange={setQrOpen} />
    </>
  );
}

function FavoriteButton({ itemId, type }: { itemId: string; type: "NOTES" | "SYLLABUS" | "PYQ" }) {
  const user = useUser();
  const { toggleFavorite, isFavorited } = useFavorites();
  const [loading, setLoading] = useState(false);
  const favorited = isFavorited(type, itemId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Sign in to save favorites");
      return;
    }

    setLoading(true);
    try {
      await toggleFavorite(type, itemId);
    } catch {
      toast.error("Failed to update favorite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center justify-center h-8 px-2 text-xs font-medium rounded-md border transition-colors ${
        favorited
          ? "border-amber-500 bg-amber-50 text-amber-600 hover:border-amber-600 dark:bg-amber-950/30"
          : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
      }`}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Star className={`w-3 h-3 ${favorited ? "fill-amber-500" : ""}`} />
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-border/60 bg-background animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-muted shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
        </div>
      </div>
      <div className="h-3 w-1/3 ml-11 bg-muted rounded" />
      <div className="flex items-center gap-2 ml-11">
        <div className="h-8 w-16 bg-muted rounded-md" />
        <div className="h-8 w-20 bg-muted rounded-md" />
      </div>
    </div>
  );
}

export function SearchNotesClient({
  initialData,
  isLoading,
}: {
  initialData: NotesData[];
  isLoading?: boolean;
}) {
  const { branch, semester } = useParams<{ branch: string; semester: string }>();
  const decodedBranch = decodeURIComponent(branch);
  const formattedBranch = decodedBranch.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const [query, setQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [authGateOpen, setAuthGateOpen] = useState(false);
  const user = useUser();

  // Extract unique subjects
  const subjects = useMemo(() => {
    const unique = Array.from(new Set(initialData.map((n) => n.subject))).sort();
    return unique;
  }, [initialData]);

  // Filter by query and subject
  const filtered = useMemo(() => {
    return initialData.filter((n) => {
      const matchesQuery =
        !query || `${n.name} ${n.subject}`.toLowerCase().includes(query.toLowerCase());
      const matchesSubject = !activeSubject || n.subject === activeSubject;
      return matchesQuery && matchesSubject;
    });
  }, [initialData, query, activeSubject]);

  const handleGatedAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      setAuthGateOpen(true);
    }
  };

  return (
    <>
      <AuthGateDialog open={authGateOpen} onOpenChange={setAuthGateOpen} />

      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/pdfs" className="hover:text-foreground transition-colors">
                PDFs
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/pdfs/${branch}`} className="hover:text-foreground transition-colors">
                {formattedBranch}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-foreground">
              Semester {semester}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Search and filter bar */}
      <div className="flex flex-col gap-3 mb-6">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or subject…"
          className="h-10 max-w-sm"
        />

        {/* Subject filter chips */}
        {subjects.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
            <button
              onClick={() => setActiveSubject(null)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium border transition-all duration-150 shrink-0",
                !activeSubject
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
              )}
            >
              <Filter className="w-3 h-3" />
              All
            </button>
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setActiveSubject(activeSubject === subject ? null : subject)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-medium border transition-all duration-150 shrink-0",
                  activeSubject === subject
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                )}
              >
                {subject}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active filter indicator */}
      {activeSubject && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground">Filtered by:</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {activeSubject}
            <button onClick={() => setActiveSubject(null)} className="hover:text-primary/70">
              <X className="w-3 h-3" />
            </button>
          </span>
          <span className="text-xs text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <FileSearch className="h-8 w-8" />
          <p className="text-sm">No notes match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((note) => (
            <div
              key={note.id}
              className="group flex flex-col gap-3 p-4 rounded-xl border border-border/60 bg-background hover:border-border hover:shadow-sm transition-all duration-150"
            >
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
                  <FileText className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground leading-snug truncate">
                    {note.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{note.subject}</p>
                </div>
                <FavoriteButton itemId={note.id} type="NOTES" />
              </div>

              {/* Meta */}
              <p className="text-xs text-muted-foreground pl-11">
                {note.fileSize} MB &middot; {new Date(note.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-1.5 pl-11" onClick={handleGatedAction}>
                {user ? (
                  <>
                    <PDFViewerDialog url={note.url} title={note.name} buttonClassName="h-8 text-xs gap-1.5" />
                    <a
                      href={`https://drive.google.com/uc?export=download&id=${note.url.match(/\/d\/([^\/]+)/)?.[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 h-8 px-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Download
                    </a>
                    <CopyLinkButton url={note.url} />
                    <ShareButton url={note.url} title={note.name} />
                  </>
                ) : (
                  <>
                    <Button size="sm" className="h-8 text-xs gap-1.5">
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                      Download
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
