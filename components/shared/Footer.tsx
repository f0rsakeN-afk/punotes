import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Overview",
    href: "#",
  },
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "Privacy",
    href: "#",
  },
];

const Footer = () => {
  return (
    <div className="flex flex-col">
      <footer className="border-t">
        <div className="max-w-(--breakpoint-xl) mx-auto">
          <div className="py-12 flex flex-col justify-start items-center">
            {/* Logo */}
            <Image
              src={"/logo.webp"}
              height={50}
              width={100}
              alt="logo"
              className="dark:invert"
            />

            <ul className="mt-6 flex items-center gap-4 flex-wrap justify-center">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            {/*my name is naresh rajbanshi*/}

            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Punotes
              </Link>
              . All rights reserved.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <a href="https://github.com/f0rsakeN-afk/punotes" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
