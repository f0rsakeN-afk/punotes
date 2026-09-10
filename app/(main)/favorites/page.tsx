import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getStackUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import FavoritesClient from "./favorites-client";

export const metadata: Metadata = {
  title: "My Favorites | PuNotes",
  description: "View your saved notes, syllabus, and past questions",
  robots: { index: false, follow: false },
};

export default async function FavoritesPage() {
  const user = await getStackUser();

  if (!user) {
    redirect("/handler/signin");
  }

  // Server-render initial data alongside auth: eliminates the
  // auth -> skeleton -> client-fetch waterfall (and a 2nd Stack
  // verification inside /api/favorites + /api/collections).
  const [favorites, collections] = await Promise.all([
    prisma.favorite.findMany({
      where: { userId: user.id },
      select: { id: true, userId: true, type: true, itemId: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.collection.findMany({
      where: { userId: user.id },
      include: { _count: { select: { items: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <FavoritesClient
      initialFavorites={favorites.map((f) => ({
        ...f,
        createdAt: f.createdAt.toISOString(),
      }))}
      initialCollections={collections.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        itemCount: c._count.items,
        createdAt: c.createdAt.toISOString(),
      }))}
    />
  );
}
