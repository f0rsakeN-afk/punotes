import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/Sidebar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import Footer from "@/components/shared/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
