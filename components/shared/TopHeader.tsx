"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import {
  Menu,
  LogOut,
} from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "./ThemeToggler";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", route: "/" },
  { name: "PDFs", route: "/pdfs" },
  { name: "Syllabus", route: "/syllabus" },
  { name: "Past Questions", route: "/pyqs" },
  { name: "Upload", route: "/upload" },
  { name: "Feedback", route: "/feedback" },
  { name: "About", route: "/about" },
  { name: "Users", route: "/users" },
];

export function TopHeader() {
  const pathname = usePathname();
  const user = useUser();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2 mr-8 group">
              <Image
                src="/logo.webp"
                width={32}
                height={32}
                alt="logo"
                className="dark:invert group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-bold tracking-tight text-lg hidden sm:inline text-foreground">
                Punotes
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navigationItems.map((item) => {
                const isActive = item.route === pathname;
                return (
                  <Link
                    key={item.name}
                    href={item.route}
                    className={cn(
                      "text-sm font-medium transition-all duration-200 relative py-1",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Mobile Menu - Sheet */}
              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover:bg-muted/50">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72 sm:w-80 border-l border-border/50">
                    <div className="flex flex-col h-full mt-6">
                      <div className="flex items-center gap-2 mb-8 px-2">
                        <Image
                          src="/logo.webp"
                          width={28}
                          height={28}
                          alt="logo"
                          className="dark:invert"
                        />
                        <span className="font-bold tracking-tight text-lg">
                          Punotes
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {navigationItems.map((item) => {
                          const isActive = item.route === pathname;
                          return (
                            <Link
                              key={item.name}
                              href={item.route}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200",
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )}
                            >
                              {item.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar className="w-8 h-8 border border-border/50 transition-transform hover:scale-105">
                    <AvatarImage
                      src={user?.profileImageUrl || ""}
                      alt="user-profile"
                    />
                    <AvatarFallback className="bg-muted text-xs font-medium">NR</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.primaryEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
