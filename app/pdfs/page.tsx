"use client";

import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Building2,
  Network,
  Zap,
  Layers,
  Laptop,
  Database,
  MoveRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const BranchEnum = [
  "Computer Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics and Communication",
  "BCA",
  "BIT",
] as const;

type Branch = (typeof BranchEnum)[number];
type Category = "Engineering" | "IT" | "All";

const branchCategory: Record<Branch, Category> = {
  "Computer Engineering": "Engineering",
  "Civil Engineering": "Engineering",
  "Electrical Engineering": "Engineering",
  "Electronics and Communication": "Engineering",
  BCA: "IT",
  BIT: "IT",
};

const descriptions: Record<Branch, string> = {
  "Computer Engineering":
    "Focuses on systems, architecture, AI, and cutting edge software engineering.",
  "Civil Engineering":
    "Builds the world's infrastructure bridges, buildings, and massive structures.",
  "Electrical Engineering":
    "Power, machines, circuits, energy the backbone of modern tech.",
  "Electronics and Communication":
    "Advanced telecom, embedded tech, chip design, IoT, and circuits.",
  BCA: "Practical IT degree focused on programming, apps, and real world development.",
  BIT: "IT systems, networking, cloud, enterprise solutions and modern system operations.",
};

const icons: Record<Category, React.ReactNode> = {
  Engineering: <Zap />,
  IT: <Laptop />,
  All: <Layers />,
};

const branchIcons: Record<Branch, React.ReactNode> = {
  "Computer Engineering": <Cpu />,
  "Civil Engineering": <Building2 />,
  "Electrical Engineering": <Zap />,
  "Electronics and Communication": <Network />,
  BCA: <Laptop />,
  BIT: <Database />,
};

export default function BranchesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const router = useRouter();

  const branches = useMemo(() => {
    return BranchEnum.filter((b) => {
      const matchesQuery = b.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        category === "All" || branchCategory[b] === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="relative max-w-(--breakpoint-xl)  mx-auto py-10">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-primary/5 to-transparent blur-3xl opacity-40"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold bg-linear-to-br from-primary to-primary/70 text-transparent bg-clip-text">
          Explore Branches
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex justify-center gap-3 mb-10 flex-wrap"
      >
        {["All", "Engineering", "IT"].map((cat) => {
          const icon = icons[cat as Category];
          const active = category === cat;
          return (
            <motion.div whileTap={{ scale: 0.85 }} key={cat}>
              <Button
                variant={active ? "default" : "outline"}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 transition-all",
                  active && "shadow-lg shadow-primary/30",
                )}
                onClick={() => setCategory(cat as Category)}
              >
                {icon} {cat}
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto mb-14 relative"
      >
        <Input
          placeholder="Search branches..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="py-6 shadow-md backdrop-blur-xl bg-background/60"
        />
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {branches.map((b) => {
          const icon = branchIcons[b];
          return (
            <motion.div
              key={b}
              layout
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="group"
            >
              <Card className="border bg-card/50 backdrop-blur-xl shadow-md hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-inner">
                      {icon}
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {b}
                    </CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="mt-3 w-fit text-xs px-3 py-1 rounded-lg"
                  >
                    {branchCategory[b]}
                  </Badge>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 overflow-hidden leading-relaxed">
                    {descriptions[b]}
                  </p>
                </CardContent>

                <CardFooter>
                  <Button
                    className="cursor-pointer"
                    onClick={() => router.push(`/pdfs/${encodeURIComponent(b)}`)}
                  >
                    View semesters <MoveRight />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
