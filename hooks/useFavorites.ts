"use client";

import { useCallback, useMemo } from "react";
import { useQuery, queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type FavoriteType = "NOTES" | "SYLLABUS" | "PYQ";

interface Favorite {
  id: string;
  userId: string;
  type: FavoriteType;
  itemId: string;
  createdAt: string;
}

async function fetchFavorites(): Promise<Favorite[]> {
  const { data } = await axios.get("/api/favorites");
  return data;
}

export const favoritesQueryOptions = queryOptions({
  queryKey: ["favorites"],
  queryFn: fetchFavorites,
  staleTime: 1000 * 60 * 5, // 5 minutes
});

export function useFavorites() {
  const queryClient = useQueryClient();
  const { data: favorites = [], refetch } = useQuery(favoritesQueryOptions);

  // O(1) lookup set for per-card checks - avoids O(N*M) every render
  const favoritesSet = useMemo(
    () => new Set(favorites.map((f) => `${f.type}:${f.itemId}`)),
    [favorites]
  );

  const mutation = useMutation({
    mutationFn: async ({ type, itemId, action }: { type: FavoriteType; itemId: string; action: "add" | "remove" }) => {
      if (action === "add") await axios.post("/api/favorites", { type, itemId });
      else await axios.delete(`/api/favorites?type=${type}&itemId=${itemId}`);
    },
    onMutate: async ({ type, itemId, action }) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previous = queryClient.getQueryData<Favorite[]>(["favorites"]);
      const key = `${type}:${itemId}`;
      queryClient.setQueryData<Favorite[]>(["favorites"], (old = []) => {
        if (action === "add" && !old.some(f => `${f.type}:${f.itemId}` === key)) {
          return [...old, { id: `optimistic-${key}`, userId: "me", type, itemId, createdAt: new Date().toISOString() }];
        }
        if (action === "remove") return old.filter(f => `${f.type}:${f.itemId}` !== key);
        return old;
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["favorites"], ctx.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  const toggleFavorite = useCallback(
    async (type: FavoriteType, itemId: string) => {
      const key = `${type}:${itemId}`;
      const isFav = favoritesSet.has(key);
      await mutation.mutateAsync({ type, itemId, action: isFav ? "remove" : "add" });
    },
    [favoritesSet, mutation]
  );

  const isFavorited = useCallback((type: FavoriteType, itemId: string) => favoritesSet.has(`${type}:${itemId}`), [favoritesSet]);
  const isFavoritedFast = useCallback((type: FavoriteType, itemId: string) => favoritesSet.has(`${type}:${itemId}`), [favoritesSet]);

  return { favorites, favoritesSet, toggleFavorite, isFavorited, isFavoritedFast, refetch, isMutating: mutation.isPending };
}
