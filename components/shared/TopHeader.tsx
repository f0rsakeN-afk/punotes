"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import {
  BadgeInfo,
  BookText,
  CloudUpload,
  FileQuestionMark,
  FileText,
  House,
  LogOut,
  MessageSquare,
  Users,
  Menu,
  X,
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
  { name: "Home", route: "/", icon: House },
  { name: "PDFs", route: "/pdfs", icon: FileText },
  { name: "Syllabus", route: "/syllabus", icon: BookText },
  { name: "Past Questions", route: "/pyqs", icon: FileQuestionMark },
  { name: "Upload", route: "/upload", icon: CloudUpload },
  { name: "Feedback", route: "/feedback", icon: MessageSquare },
  { name: "About", route: "/about", icon: BadgeInfo },
  { name: "Users", route: "/users", icon: Users },
];

export function TopHeader() {
  const pathname = usePathname();
  const user = useUser();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#1b1c1d]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2 mr-8">
              <Image
                src="/logo.webp"
                width={32}
                height={32}
                alt="logo"
                className="dark:invert"
              />
              <span className="font-semibold tracking-widest uppercase text-lg hidden sm:inline">
                Punotes
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.route === pathname;
                return (
                  <Link
                    key={item.name}
                    href={item.route}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Mobile Menu - Sheet */}
              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="w-5 h-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64">
                    <div className="space-y-4 mt-8">
                      <div className="flex items-center gap-2 mb-6">
                        <Image
                          src="/logo.webp"
                          width={28}
                          height={28}
                          alt="logo"
                          className="dark:invert"
                        />
                        <span className="font-semibold tracking-widest uppercase">
                          Punotes
                        </span>
                      </div>

                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.route === pathname;
                        return (
                          <Link
                            key={item.name}
                            href={item.route}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={user?.profileImageUrl || ""}
                      alt="user-profile"
                    />
                    <AvatarFallback>NR</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="text-xs">
                    {user?.displayName || user?.primaryEmail}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => user?.signOut()}
                    className="font-semibold"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
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
