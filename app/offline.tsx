import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WifiOff } from "lucide-react";

export default function Offline() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4">
      <WifiOff className="w-16 h-16 text-muted-foreground mb-4" />
      <h1 className="text-2xl font-bold mb-2">You are offline</h1>
      <p className="text-muted-foreground max-w-md mb-6">Check your internet connection. Some pages are available offline once visited.</p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
