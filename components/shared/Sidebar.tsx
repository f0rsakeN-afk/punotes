"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BadgeInfo,
  BookText,
  FileQuestionMark,
  FileText,
  House,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggler";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { usePathname } from "next/navigation";

const sidebarData = [
  { name: "Home", route: "/", icon: <House size={6} /> },
  {
    name: "PDFs",
    route: "/pdfs",
    icon: <FileText size={6} />,
  },
  {
    name: "Syllabus",
    route: "/syllabus",
    icon: <BookText size={6} />,
  },
  {
    name: "Past Questions",
    route: "/pyqs",
    icon: <FileQuestionMark size={6} />,
  },
  {
    name: "Feedback",
    route: "/feedback",
    icon: <MessageSquare size={6} />,
  },
  {
    name: "About",
    route: "/about",
    icon: <BadgeInfo size={6} />,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-center flex-row gap-3">
        <Image
          src={"/logo.webp"}
          width={32}
          height={32}
          alt="logo"
          className="dark:invert"
        />
        <span className="font-semibold tracking-widest uppercase text-xl">
          Punotes
        </span>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {sidebarData.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={item.route === pathname}
                className="h-[35px]"
              >
                <Link
                  href={item.route}
                  className="flex items-center gap-2 tracking-widest text-base font-semibold"
                >
                  {item.icon}
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <section className="flex items-center justify-between gap-3">
          <ThemeToggle />

          <Avatar className="">
            <AvatarFallback>NR</AvatarFallback>
          </Avatar>
        </section>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
