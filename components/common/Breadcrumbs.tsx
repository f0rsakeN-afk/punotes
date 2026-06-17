"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

function useBreadcrumbs(items?: BreadcrumbItem[]) {
  const pathname = usePathname();

  if (items && items.length > 0) {
    return [{ label: "Home", href: "/" }, ...items];
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return [{ label: "Home", href: "/" }];
  }

  const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let path = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    path += `/${segment}`;

    // Format the label
    let label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Check if it's a branch (should be URL encoded branch name)
    if (i === 1 && segments[0] === "pdfs") {
      label = decodeURIComponent(segment);
    }

    // Last item is current page (no href)
    const isLast = i === segments.length - 1;
    crumbs.push({
      label,
      href: isLast ? undefined : path,
    });
  }

  return crumbs;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const crumbs = useBreadcrumbs(items);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem key={crumb.label + index}>
            {index > 0 && <BreadcrumbSeparator />}
            {crumb.href ? (
              <BreadcrumbLink asChild>
                <Link
                  href={crumb.href}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  {crumb.label}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-foreground font-medium">
                {crumb.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}