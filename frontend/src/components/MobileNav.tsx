import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavLinksTypes } from "./Navbar";
import { cn } from "@/lib/utils";

interface MobileNavProps {
    items: NavLinksTypes[];
    className?: string;
}

const MobileNav = ({ items, className }: MobileNavProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
                        className
                    )}
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] pr-0">
                <div className="px-4 mb-8">
                    <Logo />
                </div>
                <nav className="flex flex-col space-y-4">
                    {items.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={({ isActive }) =>
                                cn(
                                    "block px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    isActive && "bg-accent text-accent-foreground"
                                )
                            }
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="absolute bottom-4 left-4">
                    <p className="text-sm  text-muted-foreground">
                        © {new Date().getFullYear()} PUNotes
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;