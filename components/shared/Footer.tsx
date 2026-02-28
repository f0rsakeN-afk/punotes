import { GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { title: "PDFs", href: "/pdfs" },
  { title: "Syllabus", href: "/syllabus" },
  { title: "Past Questions", href: "/pyqs" },
  { title: "About", href: "/about" },
  { title: "Feedback", href: "/feedback" },
  { title: "Terms", href: "/terms" },
  { title: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.webp"
              width={24}
              height={24}
              alt="PuNotes"
              className="dark:invert"
            />
            <span className="font-semibold text-sm tracking-tight">PuNotes</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PuNotes. All rights reserved.
          </p>
          <a
            href="https://github.com/f0rsakeN-afk/punotes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
