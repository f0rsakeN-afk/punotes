"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { Menu, LogOut, MessageSquare, Flame } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "./ThemeToggler";
import { cn } from "@/lib/utils";
import { isAdviceDue } from "@/lib/advice-cookie";

const navItems = [
  { name: "PDFs", route: "/pdfs" },
  { name: "Syllabus", route: "/syllabus" },
  { name: "Past Questions", route: "/pyqs" },
  { name: "Upload", route: "/upload" },
  { name: "About", route: "/about" },
];

const mobileExtraItems = [{ name: "Feedback", route: "/feedback" }];

export function TopHeader() {
  const pathname = usePathname();
  const user = useUser();
  const [open, setOpen] = React.useState(false);
  const [adviceDue, setAdviceDue] = React.useState(false);

  React.useEffect(() => {
    setAdviceDue(isAdviceDue());
  }, [pathname]);

  const initials = user?.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : user?.primaryEmail?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo.webp"
              width={28}
              height={28}
              alt="PuNotes"
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
            <Link
              href="/advice"
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150",
                pathname.startsWith("/advice")
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              For You
              {adviceDue && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              )}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />

            {/* Feedback shortcut — desktop only */}
            <Link href="/feedback" className="hidden lg:block">
              <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </Link>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background">
                  <Avatar className="w-8 h-8 border border-border/60 transition-opacity hover:opacity-80">
                    <AvatarImage src={user?.profileImageUrl ?? ""} alt="avatar" />
                    <AvatarFallback className="bg-muted text-[11px] font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-normal py-2">
                  <p className="text-sm font-semibold truncate">
                    {user?.displayName ?? "Account"}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {user?.primaryEmail}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/feedback" className="cursor-pointer">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Feedback
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20 cursor-pointer"
                  onClick={() => user?.signOut()}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <div className="lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 p-0">
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
                      <Link
                        href="/advice"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "relative flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                          pathname.startsWith("/advice")
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        )}
                      >
                        <Flame className="w-3.5 h-3.5 text-orange-400" />
                        For You
                        {adviceDue && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        )}
                      </Link>
                    </nav>

                    {/* Sheet footer */}
                    <div className="mt-auto border-t border-border/50 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border border-border/60">
                          <AvatarImage src={user?.profileImageUrl ?? ""} alt="avatar" />
                          <AvatarFallback className="bg-muted text-[11px] font-semibold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{user?.displayName ?? "Account"}</p>
                          <p className="text-xs text-muted-foreground truncate">{user?.primaryEmail}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { user?.signOut(); setOpen(false); }}
                        className="mt-3 flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
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
