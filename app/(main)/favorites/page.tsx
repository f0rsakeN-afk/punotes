import { Metadata } from "next";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import FavoritesClient from "./favorites-client";

export const metadata: Metadata = {
  title: "My Favorites | PuNotes",
  description: "View your saved notes, syllabus, and past questions",
  robots: { index: false, follow: false },
};

export default async function FavoritesPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/signin");
  }

  return <FavoritesClient />;
}
