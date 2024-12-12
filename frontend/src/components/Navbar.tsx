import { useTheme } from "@/context/themeProvider";
import { Switch } from "@/components/ui/switch";
import NavLink from "./NavLink";
import MobileNav from "./MobileNav";
import Logo from "./Logo";

export interface NavLinksTypes {
  label: string
  href: string
}

const navLinks: NavLinksTypes[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: 'Past Questions',
    href: '/pastquestions'
  },
  {
    label: 'Assignments',
    href: '/assignments'
  },
  {
    label: "About",
    href: "/about",
  },
];


const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Mobile Navigation */}
        <div className="flex  items-center justify-between">
          <Logo />
          <MobileNav items={navLinks} />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex lg:flex-1 lg:justify-center">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.href} to={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-2">
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="hidden sm:flex"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;