"use client";

import { useState, useEffect } from "react";
import { Star, FileText, BookOpen, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

interface Favorite {
  id: string;
  userId: string;
  type: "NOTES" | "SYLLABUS" | "PYQ";
  itemId: string;
  createdAt: string;
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
      <div className="h-3 w-1/4 ml-11 bg-muted rounded" />
    </div>
  );
}

export default function FavoritesClient() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [activeTab, setActiveTab] = useState<"ALL" | "NOTES" | "SYLLABUS" | "PYQ">("ALL");

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get<Favorite[]>("/api/favorites");
      setFavorites(data);
    } catch {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (type: "NOTES" | "SYLLABUS" | "PYQ", itemId: string) => {
    try {
      await axios.delete(`/api/favorites?type=${type}&itemId=${itemId}`);
      setFavorites((prev) => prev.filter((f) => !(f.type === type && f.itemId === itemId)));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove");
    }
  };

  const filtered = favorites.filter((f) =>
    activeTab === "ALL" ? true : f.type === activeTab
  );

  const getIcon = (type: "NOTES" | "SYLLABUS" | "PYQ") => {
    switch (type) {
      case "NOTES":
        return <FileText className="w-4 h-4" />;
      case "SYLLABUS":
        return <BookOpen className="w-4 h-4" />;
      case "PYQ":
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getLabel = (type: "NOTES" | "SYLLABUS" | "PYQ") => {
    switch (type) {
      case "NOTES":
        return "Note";
      case "SYLLABUS":
        return "Syllabus";
      case "PYQ":
        return "PYQ";
    }
  };

  const getTypeLabel = (type: "NOTES" | "SYLLABUS" | "PYQ") => {
    switch (type) {
      case "NOTES":
        return "Notes";
      case "SYLLABUS":
        return "Syllabus";
      case "PYQ":
        return "Past Questions";
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Favorites</h1>
            <p className="text-muted-foreground text-sm">Your saved notes, syllabus, and past questions</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["ALL", "NOTES", "SYLLABUS", "PYQ"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "ALL" ? "All" : getTypeLabel(tab)}
              {tab !== "ALL" && (
                <span className="ml-1.5 opacity-60">
                  ({favorites.filter((f) => f.type === tab).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
          <Star className="w-12 h-12 opacity-20" />
          <div className="text-center">
            <p className="text-sm font-medium">No favorites yet</p>
            <p className="text-xs mt-1">Star notes, syllabus, or PYQs to save them here</p>
          </div>
          <Link href="/pdfs">
            <Button variant="outline" size="sm" className="mt-2">
              Browse Notes
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((fav) => (
            <Card key={fav.id} className="hover:border-border/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
                    {getIcon(fav.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      {getLabel(fav.type)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Saved {new Date(fav.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-[10px]">
                    {getLabel(fav.type)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-3 ml-11">
                  <Link href={fav.type === "NOTES" ? "/pdfs" : fav.type === "SYLLABUS" ? "/syllabus" : "/pyqs"}>
                    <Button size="sm" className="h-7 text-xs">
                      Browse
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => removeFavorite(fav.type, fav.itemId)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
