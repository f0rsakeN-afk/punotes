"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FileText, FileSearch, Link2, Check, Star, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toOrdinalWord } from "@/utils/toOrdinalWord";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "react-hot-toast";

const PDFViewerDialog = dynamic(
  () => import("@/components/common/PDFViewerDialog").then((m) => m.PDFViewerDialog),
  { loading: () => <button className="h-8 text-xs gap-1.5 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 px-3 text-xs font-medium animate-pulse">Loading...</button> }
);

interface PYQData {
  id: string;
  semester: string;
  year: string;
  branch: string;
  fileSize: string;
  url: string;
  createdAt: Date;
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
  const handleShare = () => {
    const shareUrl = encodeURIComponent(url);
    const text = encodeURIComponent(`Check out this PYQ: ${title} - ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleShare();
      }}
      className="inline-flex items-center justify-center gap-1.5 h-8 px-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-green-600 hover:border-green-600"
      title="Share on WhatsApp"
    >
      <Share2 className="w-3 h-3" />
    </button>
  );
}

function FavoriteButton({ itemId, type }: { itemId: string; type: "NOTES" | "SYLLABUS" | "PYQ" }) {
  const { toggleFavorite, isFavorited } = useFavorites();
  const [loading, setLoading] = useState(false);
  const favorited = isFavorited(type, itemId);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-muted shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-3 w-32 bg-muted rounded" />
          </div>
        </div>
        <div className="w-12 h-5 bg-muted rounded-full" />
      </div>
      <div className="h-3 w-1/4 ml-11 bg-muted rounded" />
      <div className="flex items-center gap-2 ml-11">
        <div className="h-8 w-16 bg-muted rounded-md" />
        <div className="h-8 w-20 bg-muted rounded-md" />
      </div>
    </div>
  );
}

export function SearchPYQClient({
  initialData,
  isLoading,
}: {
  initialData: PYQData[];
  isLoading?: boolean;
}) {
  const [query, setQuery] = useState("");

  const filtered = initialData.filter((el) =>
    `${toOrdinalWord(Number(el.semester))} ${el.branch} ${el.fileSize} ${el.year}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-7">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by year, semester, branch…"
          className="max-w-sm h-10"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <FileSearch className="h-8 w-8" />
          <p className="text-sm">No past questions match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((el) => (
            <div
              key={el.id}
              className="group flex flex-col gap-3 p-4 rounded-xl border border-border/60 bg-background hover:border-border hover:shadow-sm transition-all duration-150"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
                    <FileText className="w-4 h-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      Semester {el.semester}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{el.branch}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <FavoriteButton itemId={el.id} type="PYQ" />
                  <Badge variant="secondary" className="shrink-0 text-xs font-semibold">
                    {el.year}
                  </Badge>
                </div>
              </div>

              {/* Meta */}
              <p className="text-xs text-muted-foreground pl-11">{el.fileSize}</p>

              {/* Actions */}
              <div className="flex items-center gap-1.5 pl-11">
                <PDFViewerDialog url={el.url} title={`Semester ${el.semester} · ${el.year}`} buttonClassName="h-8 text-xs gap-1.5" />
                <a
                  href={`https://drive.google.com/uc?export=download&id=${el.url.match(/\/d\/([^\/]+)/)?.[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 h-8 px-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Download
                </a>
                <CopyLinkButton url={el.url} />
                <ShareButton url={el.url} title={`Semester ${el.semester} ${el.year}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
