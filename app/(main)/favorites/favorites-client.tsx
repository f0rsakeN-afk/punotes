"use client";

import { useState, useEffect } from "react";
import { Star, FileText, BookOpen, HelpCircle, Plus, FolderOpen, Folder, Trash2, X, Check, GripVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import type { DragStartEvent } from "@dnd-kit/core";

interface Favorite {
  id: string;
  userId: string;
  type: "NOTES" | "SYLLABUS" | "PYQ";
  itemId: string;
  createdAt: string;
}

interface Collection {
  id: string;
  name: string;
  description: string | null;
  itemCount: number;
  createdAt: string;
}

function DraggableFavorite({
  favorite,
  onRemove,
  onAddToCollection,
  collections,
  showAddToCollection,
  onDragStart,
}: {
  favorite: Favorite;
  onRemove: () => void;
  onAddToCollection?: (favoriteId: string, collectionId: string) => void;
  collections?: Collection[];
  showAddToCollection?: boolean;
  onDragStart?: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: favorite.itemId,
    data: { favorite },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "NOTES":
        return <FileText className="w-4 h-4" />;
      case "SYLLABUS":
        return <BookOpen className="w-4 h-4" />;
      case "PYQ":
        return <HelpCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "NOTES":
        return "Notes";
      case "SYLLABUS":
        return "Syllabus";
      case "PYQ":
        return "Past Questions";
      default:
        return type;
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative",
        isDragging && "opacity-50 z-50"
      )}
    >
      <Card className={cn("hover:border-border/80 transition-colors", showAddToCollection && "cursor-grab active:cursor-grabbing")}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {showAddToCollection && (
              <div
                {...attributes}
                {...listeners}
                className="mt-1 shrink-0 cursor-grab text-muted-foreground hover:text-foreground"
                onPointerDown={onDragStart}
              >
                <GripVertical className="w-4 h-4" />
              </div>
            )}
            <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
              {getIcon(favorite.type)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground leading-snug">
                {getTypeLabel(favorite.type)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Saved {new Date(favorite.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0 text-[10px]">
              {favorite.type}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-3 ml-11">
            <Link href={favorite.type === "NOTES" ? "/pdfs" : favorite.type === "SYLLABUS" ? "/syllabus" : "/pyqs"}>
              <Button size="sm" className="h-7 text-xs">
                Browse
              </Button>
            </Link>
            {onAddToCollection && collections && collections.length > 0 && (
              <div className="relative group">
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <Folder className="w-3 h-3 mr-1" />
                  Add to
                </Button>
                <div className="absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[140px]">
                  {collections.map((col) => (
                    <button
                      key={col.id}
                      onClick={() => onAddToCollection?.(favorite.id, col.id)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-muted flex items-center gap-2 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Folder className="w-3 h-3" />
                      {col.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-muted-foreground hover:text-destructive"
              onClick={onRemove}
            >
              Remove
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DroppableCollection({
  collection,
  onClick,
  isActive,
}: {
  collection: Collection;
  onClick: () => void;
  isActive: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: collection.id,
  });

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={cn(
        "transition-all rounded-xl border-2 border-dashed",
        isOver
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border/60 hover:border-border/80",
        isActive && "border-primary/50"
      )}
    >
      <Card className="border-0 bg-transparent">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              "mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              isOver ? "bg-primary text-primary-foreground" : "bg-primary/8 text-primary"
            )}>
              <Folder className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground leading-snug truncate">
                {collection.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {collection.itemCount} item{collection.itemCount !== 1 ? "s" : ""}
              </p>
            </div>
            {isOver && (
              <Badge className="bg-primary text-primary-foreground">Drop here</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
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
      <div className="h-3 w-1/4 ml-11 bg-muted rounded" />
    </div>
  );
}

export default function FavoritesClient() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [activeTab, setActiveTab] = useState<"FAVORITES" | "COLLECTIONS">("FAVORITES");
  const [favoriteTab, setFavoriteTab] = useState<"ALL" | "NOTES" | "SYLLABUS" | "PYQ">("ALL");
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [creating, setCreating] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [collectionItems, setCollectionItems] = useState<Favorite[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [favRes, colRes] = await Promise.all([
        axios.get<Favorite[]>("/api/favorites"),
        axios.get<{ data: Collection[] }>("/api/collections"),
      ]);
      setFavorites(favRes.data);
      setCollections(colRes.data.data);
    } catch {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async () => {
    if (!newCollectionName.trim()) return;
    setCreating(true);
    try {
      const res = await axios.post("/api/collections", { name: newCollectionName });
      setCollections((prev) => [{ ...res.data, description: null, createdAt: new Date().toISOString() }, ...prev]);
      setNewCollectionName("");
      setShowCreateCollection(false);
      toast.success("Collection created");
    } catch {
      toast.error("Failed to create collection");
    } finally {
      setCreating(false);
    }
  };

  const deleteCollection = async (id: string) => {
    try {
      await axios.delete(`/api/collections/${id}`);
      setCollections((prev) => prev.filter((c) => c.id !== id));
      if (selectedCollection?.id === id) setSelectedCollection(null);
      toast.success("Collection deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const openCollection = async (collection: Collection) => {
    setSelectedCollection(collection);
    setLoadingCollection(true);
    try {
      const res = await axios.get(`/api/collections/${collection.id}`);
      const items = res.data.data.items.map((item: { type: string; itemId: string; addedAt: string }) => ({
        id: item.itemId,
        userId: "",
        type: item.type as "NOTES" | "SYLLABUS" | "PYQ",
        itemId: item.itemId,
        createdAt: item.addedAt,
      }));
      setCollectionItems(items);
    } catch {
      toast.error("Failed to load collection");
    } finally {
      setLoadingCollection(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (over && active.id !== over.id) {
      const collectionId = over.id as string;
      const favorite = favorites.find((f) => f.itemId === active.id);

      if (favorite) {
        try {
          await axios.post(`/api/collections/${collectionId}/items`, {
            favoriteId: favorite.id,
          });
          setCollections((prev) =>
            prev.map((c) =>
              c.id === collectionId ? { ...c, itemCount: c.itemCount + 1 } : c
            )
          );
          toast.success("Added to collection");
        } catch {
          toast.error("Failed to add to collection");
        }
      }
    }
  };

  const removeFromCollection = async (favoriteId: string) => {
    if (!selectedCollection) return;
    try {
      await axios.delete(`/api/collections/${selectedCollection.id}/items?itemId=${favoriteId}`);
      setCollectionItems((prev) => prev.filter((f) => f.itemId !== favoriteId));
      setCollections((prev) =>
        prev.map((c) =>
          c.id === selectedCollection.id ? { ...c, itemCount: c.itemCount - 1 } : c
        )
      );
      toast.success("Removed from collection");
    } catch {
      toast.error("Failed to remove");
    }
  };

  const addToCollection = async (favoriteId: string, collectionId: string) => {
    try {
      await axios.post(`/api/collections/${collectionId}/items`, { favoriteId });
      setCollections((prev) =>
        prev.map((c) =>
          c.id === collectionId ? { ...c, itemCount: c.itemCount + 1 } : c
        )
      );
      toast.success("Added to collection");
    } catch {
      toast.error("Failed to add");
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

  const filteredFavorites = favorites.filter((f) =>
    favoriteTab === "ALL" ? true : f.type === favoriteTab
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Library</h1>
              <p className="text-muted-foreground text-sm">Drag items to collections to organize</p>
            </div>
          </div>

          {/* Main Tabs */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setActiveTab("FAVORITES")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === "FAVORITES"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Star className="w-4 h-4 mr-1.5 inline" />
              Favorites
            </button>
            <button
              onClick={() => setActiveTab("COLLECTIONS")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === "COLLECTIONS"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <FolderOpen className="w-4 h-4 mr-1.5 inline" />
              Collections
            </button>
          </div>

          {activeTab === "FAVORITES" && (
            <div className="flex items-center gap-2 flex-wrap">
              {(["ALL", "NOTES", "SYLLABUS", "PYQ"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFavoriteTab(tab)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    favoriteTab === tab
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
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
          )}

          {activeTab === "COLLECTIONS" && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {collections.length} collection{collections.length !== 1 ? "s" : ""} · Drag favorites onto collections to add
              </p>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs gap-1.5"
                onClick={() => setShowCreateCollection(true)}
              >
                <Plus className="w-3.5 h-3.5" />
                New Collection
              </Button>
            </div>
          )}
        </div>

        {/* Create Collection Modal */}
        {showCreateCollection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-sm mx-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Create Collection</h3>
                  <button
                    onClick={() => setShowCreateCollection(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g. Exam Prep, Semester 5..."
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && createCollection()}
                  />
                  <Button onClick={createCollection} disabled={creating || !newCollectionName.trim()}>
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Selected Collection View */}
        {selectedCollection && activeTab === "COLLECTIONS" && (
          <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">{selectedCollection.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {collectionItems.length} items
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs text-destructive"
                  onClick={() => deleteCollection(selectedCollection.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs"
                  onClick={() => setSelectedCollection(null)}
                >
                  Close
                </Button>
              </div>
            </div>

            {loadingCollection ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : collectionItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                This collection is empty. Drag favorites here to add them.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {collectionItems.map((fav) => (
                  <Card key={fav.itemId} className="hover:border-border/80 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground leading-snug">
                            {getTypeLabel(fav.type)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Added {new Date(fav.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          {fav.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-3 ml-11">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCollection(fav.itemId)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Collections Grid - as drop targets */}
        {activeTab === "COLLECTIONS" && !selectedCollection && (
          <>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : collections.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
                <FolderOpen className="w-12 h-12 opacity-20" />
                <div className="text-center">
                  <p className="text-sm font-medium">No collections yet</p>
                  <p className="text-xs mt-1">Create collections to organize your favorites</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowCreateCollection(true)}
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Create Collection
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {collections.map((col) => (
                  <DroppableCollection
                    key={col.id}
                    collection={col}
                    onClick={() => openCollection(col)}
                    isActive={activeDragId !== null}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Favorites Grid - draggable items */}
        {activeTab === "FAVORITES" && (
          <>
            {activeDragId && collections.length > 0 && (
              <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm text-center">
                <Folder className="w-4 h-4 inline mr-1.5" />
                Drop on a collection to add it
              </div>
            )}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredFavorites.length === 0 ? (
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
                {filteredFavorites.map((fav) => (
                  <DraggableFavorite
                    key={fav.id}
                    favorite={fav}
                    onRemove={() => removeFavorite(fav.type, fav.itemId)}
                    onAddToCollection={addToCollection}
                    collections={collections}
                    showAddToCollection={activeDragId !== null}
                    onDragStart={() => setActiveDragId(fav.itemId)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <DragOverlay>
        {activeDragId && (
          <Card className="shadow-lg opacity-90">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <GripVertical className="w-4 h-4" />
                Dragging...
              </div>
            </CardContent>
          </Card>
        )}
      </DragOverlay>
    </DndContext>
  );
}
