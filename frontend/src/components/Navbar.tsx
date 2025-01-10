import { useTheme } from "@/context/themeProvider";
import { Switch } from "@/components/ui/switch";
import NavLink from "./NavLink";
import MobileNav from "./MobileNav";
import Logo from "./Logo";

export interface NavLinksTypes {
  label: string;
  href: string;
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
    label: 'Syllabus',
    href: '/syllabus'
  },
  {
    label: "About",
    href: "/about",
  },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/30 backdrop-blur-lg supports-[backdrop-filter]:bg-white/20">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Middle Section: Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Section: Theme Switch & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Switch
            checked={theme === "dark"}
            onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            className=""
            aria-label="Toggle theme"
          />
          <MobileNav items={navLinks} className="lg:hidden" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;