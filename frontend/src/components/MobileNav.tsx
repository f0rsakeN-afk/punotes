import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavLinksTypes } from "./Navbar";

interface MobileNavProps {
    items: NavLinksTypes[]
}

const MobileNav: React.FC<MobileNavProps> = ({ items }) => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="">
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
                >
                    <Menu size={36} />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
                <Logo />
                <nav className="flex flex-col space-y-4 mt-4">
                    {items.map((item: NavLinksTypes) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className="block px-2 py-1 text-lg"
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
};


export default MobileNav;