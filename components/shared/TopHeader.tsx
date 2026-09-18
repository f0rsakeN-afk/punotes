"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { Menu, LogOut, MessageSquare, LogIn, FileText, Shield, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import ThemeToggle from "./ThemeToggler";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/common/SearchDialog";

const navItems = [
  { name: "PDFs", route: "/pdfs" },
  { name: "Syllabus", route: "/syllabus" },
  { name: "Past Questions", route: "/pyqs" },
  { name: "Share Drive", route: "/share" },
  { name: "Contribute", route: "/contribute" },
  { name: "About", route: "/about" },
];

const mobileExtraItems = [
  { name: "My Favorites", route: "/favorites" },
  { name: "My Submissions", route: "/submissions" },
  { name: "Feedback", route: "/feedback" },
];

export function TopHeader({
  isAdmin,
  initialUser,
}: {
  isAdmin?: boolean;
  initialUser?: {
    displayName: string | null;
    primaryEmail: string | null;
    profileImageUrl: string | null;
  } | null;
}) {
  const pathname = usePathname();
  const user = useUser();
  // Server-rendered identity avoids the signed-out flash while useUser hydrates.
  const displayUser = user ?? initialUser;
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const initials = displayUser?.displayName
    ? displayUser.displayName.slice(0, 2).toUpperCase()
    : displayUser?.primaryEmail?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-200",
        scrolled
          ? "border-border bg-background/95 shadow-[0_1px_12px_-4px_rgb(0_0_0/0.12)]"
          : "border-border/40 bg-background/90"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo.webp"
              width={28}
              height={28}
              alt="PuNotes"
              priority
              sizes="28px"
              className="dark:invert transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-semibold text-base tracking-tight text-foreground hidden sm:inline">
              PuNotes
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active =
                item.route === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.route);
              return (
                <Link
                  key={item.name}
                  href={item.route}
                  className={cn(
                    "relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150",
                    active
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Global search */}
            <SearchDialog>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search notes, syllabus and past questions"
                className="w-9 h-9 text-muted-foreground hover:text-foreground relative"
                title="Search (Cmd+K)"
              >
                <Search data-icon="inline-start" className="w-4 h-4" />
                <kbd className="absolute -bottom-0.5 right-0 text-[10px] font-mono text-muted-foreground hidden sm:inline">
                  ⌘K
                </kbd>
              </Button>
            </SearchDialog>

            <ThemeToggle />

            {/* Feedback shortcut — desktop only */}
            <Button variant="ghost" size="icon" aria-label="Give feedback" className="w-9 h-9 text-muted-foreground hover:text-foreground hidden lg:flex" asChild>
              <Link href="/feedback" aria-label="Give feedback">
                <MessageSquare data-icon="inline-start" className="w-4 h-4" />
              </Link>
            </Button>

            {/* User menu */}
            {displayUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button aria-label="Account menu" className="rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background">
                    <Avatar className="w-9 h-9 border border-border/60 transition-opacity hover:opacity-80">
                      <AvatarImage src={displayUser.profileImageUrl ?? ""} alt={displayUser.displayName ?? displayUser.primaryEmail ?? "User avatar"} />
                      <AvatarFallback className="bg-muted text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="font-normal py-2">
                    <p className="text-sm font-semibold truncate">
                      {displayUser.displayName ?? "Account"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {displayUser.primaryEmail}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="cursor-pointer">
                      <Star data-icon="inline-start" className="w-4 h-4 mr-2" />
                      My Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/submissions" className="cursor-pointer">
                      <FileText data-icon="inline-start" className="w-4 h-4 mr-2" />
                      My Submissions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/feedback" className="cursor-pointer">
                      <MessageSquare data-icon="inline-start" className="w-4 h-4 mr-2" />
                      Feedback
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-xs text-muted-foreground">Admin</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/public-links" className="cursor-pointer">
                          <Shield data-icon="inline-start" className="w-4 h-4 mr-2" />
                          Review Links
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/audit-logs" className="cursor-pointer">
                          <Shield data-icon="inline-start" className="w-4 h-4 mr-2" />
                          Audit Logs
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20 cursor-pointer"
                    onClick={() => user?.signOut()}
                  >
                    <LogOut data-icon="inline-start" className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" className="gap-1.5 h-8 px-4 text-xs" asChild>
                <Link href="/handler/signin">
                  <LogIn data-icon="inline-start" className="w-3.5 h-3.5" />
                  Sign in
                </Link>
              </Button>
            )}

            {/* Mobile menu */}
            <div className="lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu" className="w-9 h-9">
                    <Menu data-icon="inline-start" className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 p-0" aria-describedby={undefined}>
                  <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                  <SheetDescription className="sr-only">Main navigation links</SheetDescription>
                  <div className="flex flex-col h-full">
                    {/* Sheet header */}
                    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border/50">
                      <Image
                        src="/logo.webp"
                        width={24}
                        height={24}
                        alt="PuNotes"
                        className="dark:invert"
                      />
                      <span className="font-semibold text-base tracking-tight">PuNotes</span>
                    </div>

                    {/* Nav links */}
                    <nav className="flex flex-col px-3 py-3 gap-0.5">
                      {[...navItems, ...mobileExtraItems].map((item) => {
                        const active =
                          item.route === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.route);
                        return (
                          <Link
                            key={item.name}
                            href={item.route}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                              active
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                            )}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </nav>

                    {/* Sheet footer */}
                    <div className="mt-auto border-t border-border/50 px-5 py-4">
                      {displayUser ? (
                        <>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9 border border-border/60">
                      <AvatarImage src={displayUser.profileImageUrl ?? ""} alt={displayUser.displayName ?? displayUser.primaryEmail ?? "User avatar"} />
                              <AvatarFallback className="bg-muted text-xs font-semibold">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{displayUser.displayName ?? "Account"}</p>
                              <p className="text-xs text-muted-foreground truncate">{displayUser.primaryEmail}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => { user?.signOut(); setOpen(false); }}
                            className="mt-3 flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            <LogOut data-icon="inline-start" className="w-4 h-4" />
                            Log out
                          </button>
                        </>
                      ) : (
                          <Button className="w-full gap-2" asChild>
                            <Link
                              href="/handler/signin"
                              onClick={() => setOpen(false)}
                            >
                              <LogIn data-icon="inline-start" className="w-4 h-4" />
                              Sign in
                            </Link>
                          </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
