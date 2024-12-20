import * as React from "react";
import { cn } from "@/lib/utils";
import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    to: string;
}

const NavLink = ({ children, className, to, ...props }: NavLinkProps) => {
    return (
        <RouterNavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-primary",
                    "relative group px-3 py-2",
                    isActive ? "text-primary" : "text-gray-600 dark:text-gray-300",
                    className
                )
            }
            {...props}
        >
            {children}
            <span className="absolute inset-x-0 -bottom-px h-px bg-primary/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </RouterNavLink>
    );
};

export default NavLink;