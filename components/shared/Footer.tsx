import { Heart } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import Image from "next/image";
import Link from "next/link";

const resources = [
  { title: "Browse Notes", href: "/pdfs" },
  { title: "Syllabus", href: "/syllabus" },
  { title: "Past Questions", href: "/pyqs" },
  { title: "Contribute", href: "/contribute" },
];

const company = [
  { title: "About", href: "/about" },
  { title: "Feedback", href: "/feedback" },
  { title: "Analytics", href: "/analytics" },
];

const legal = [
  { title: "Terms", href: "/terms" },
  { title: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.webp"
                width={28}
                height={28}
                alt="PuNotes"
                className="dark:invert"
              />
              <span className="font-bold text-base tracking-tight">PuNotes</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Free academic resources for Purbanchal University students. Notes, syllabus, and past questions — all in one place.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/f0rsakeN-afk/punotes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PuNotes on GitHub"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-background border border-border hover:border-primary/40 hover:text-primary transition-all duration-150"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h2 className="font-semibold text-sm mb-4">Resources</h2>
            <ul className="space-y-2.5">
              {resources.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="font-semibold text-sm mb-4">Company</h2>
            <ul className="space-y-2.5">
              {company.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="font-semibold text-sm mb-4">Legal</h2>
            <ul className="space-y-2.5">
              {legal.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PuNotes. Built with{" "}
            <span className="inline-flex items-center gap-1 text-primary">
              <Heart className="w-3 h-3 fill-primary" />
              by PU students
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Made by{" "}
            <a
              href="https://nareshrajbanshi.com.np"
              target="_blank"
              rel="author noopener"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Naresh Rajbanshi
            </a>{" "}
            &middot;{" "}
            <a
              href="https://github.com/f0rsakeN-afk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>{" "}
            &middot; Open source
          </p>
        </div>
      </div>
    </footer>
  );
}
