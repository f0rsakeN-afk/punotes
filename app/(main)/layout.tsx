import { isAdmin, getStackUser } from "@/lib/auth";
import MainLayoutClient from "./mainLayoutClient";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Cached: 1 Stack verification per request (React cache) + 1 Redis
  // lookup for role. No DB writes, no cache busting here — user sync
  // happens lazily on write paths via ensureUserExists().
  const [admin, stackUser] = await Promise.all([isAdmin(), getStackUser()]);

  return (
    <MainLayoutClient
      isAdmin={admin}
      initialUser={
        stackUser
          ? {
              displayName: stackUser.displayName ?? null,
              primaryEmail: stackUser.primaryEmail ?? null,
              profileImageUrl: stackUser.profileImageUrl ?? null,
            }
          : null
      }
    >
      {children}
    </MainLayoutClient>
  );
}
