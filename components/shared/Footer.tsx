import { GithubIcon, Heart } from "lucide-react";
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
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
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-background border border-border hover:border-primary/40 hover:text-primary transition-all duration-150"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Resources</h4>
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
            <h4 className="font-semibold text-sm mb-4">Company</h4>
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
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
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
            Open source &middot; MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}
