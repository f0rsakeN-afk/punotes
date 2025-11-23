import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/Sidebar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Footer from "@/components/shared/Footer";
import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await stackServerApp.getUser();

  if (!user) redirect("/handler/signin");

  return (
    <SidebarProvider>
      <ScrollProgress />

      <AppSidebar />

      <SidebarInset className="p-2">
        <SidebarTrigger className="mt-2" />
        {children}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
