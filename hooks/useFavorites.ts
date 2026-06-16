"use client";

import { useCallback } from "react";
import { useQuery, useMutation, queryOptions } from "@tanstack/react-query";
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
  const { data: favorites = [], refetch } = useQuery(favoritesQueryOptions);

  const addFavorite = useCallback(
    async (type: FavoriteType, itemId: string) => {
      await axios.post("/api/favorites", { type, itemId });
      await refetch();
    },
    [refetch]
  );

  const removeFavorite = useCallback(
    async (type: FavoriteType, itemId: string) => {
      await axios.delete(`/api/favorites?type=${type}&itemId=${itemId}`);
      await refetch();
    },
    [refetch]
  );

  const toggleFavorite = useCallback(
    async (type: FavoriteType, itemId: string) => {
      const isFavorited = favorites.some((f) => f.type === type && f.itemId === itemId);
      if (isFavorited) {
        await removeFavorite(type, itemId);
      } else {
        await addFavorite(type, itemId);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const isFavorited = useCallback(
    (type: FavoriteType, itemId: string) => {
      return favorites.some((f) => f.type === type && f.itemId === itemId);
    },
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorited, refetch };
}
