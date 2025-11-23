"use client";

import Features from "@/components/home/Features";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="">
      <div className="relative h-dvh flex items-center justify-center px-6 overflow-hidden">
        <AnimatedGridPattern
          numSquares={70}
          maxOpacity={0.1}
          duration={3}
          className={cn(
            "mask-[radial-gradient(900px_circle_at_center,white,transparent)]",
            "inset-x-0 h-full skew-y-6",
          )}
        />
        <div className="relative z-10 text-center max-w-3xl">
          <Badge
            variant="default"
            className="rounded-full py-1 border-border"
            asChild
          >
            <span>
              Updated Regularly <ArrowUpRight className="ml-1 size-4" />
            </span>
          </Badge>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
            Purbanchal University Notes, Syllabus & Past Question Papers
          </h1>

          <Highlighter action="box" color="#E7405C">
            <p className="mt-6 md:text-lg text-justify sm:text-center">
              Get all PU notes, syllabus files, old question papers,
              assignments, project reports and lab reports organized and
              maintained by the admin for fast and easy access.
            </p>
          </Highlighter>

          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full text-base cursor-pointer"
              onClick={() => router.push("/pdfs")}
            >
              Browse Notes <ArrowUpRight className="h-5! w-5!" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none cursor-pointer"
              onClick={() => router.push("/about")}
            >
              <CirclePlay className="h-5! w-5!" /> Learn More
            </Button>
          </div>
        </div>
      </div>
      <Features />
    </div>
  );
}
