"use client";

import { LinkSchema } from "@/lib/utils";
import React from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface NavItemProps {
  item: LinkSchema;
  className?: string;
}

/**
 * Determines if a path should be marked active
 * - "/" must match exactly
 * - other paths match by prefix
 */
const isActivePath = (pathname: string, path: string) => {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
};

const NavItem: React.FC<NavItemProps> = ({ item, className }) => {
  const pathname = usePathname();

  // Check active state
  const isActive = item.sub
    ? item.sub.some((sub) => isActivePath(pathname, sub.path))
    : isActivePath(pathname, item.path);

  const activeClass = "underline underline-offset-8 decoration-2";

  if (item.sub)
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={clsx(
            "bg-transparent hover:bg-transparent font-semibold",
            className,
            isActive && activeClass
          )}
        >
          {item.label}
        </NavigationMenuTrigger>

        <NavigationMenuContent className="bg-white shadow-md backdrop-blur-lg">
          <ul className="grid w-50 gap-2 p-0.5 lg:grid-cols-1">
            {item.sub.map((subItem, indx) => {
              const isSubActive = isActivePath(pathname, subItem.path);

              return (
                <Link
                  key={indx}
                  href={subItem.path}
                  className={clsx(
                    "rounded-sm px-2 py-1 font-semibold hover:bg-gray-300/20",
                    isSubActive && "bg-gray-300/20"
                  )}
                >
                  {subItem.label}
                </Link>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={item.path}
          className={clsx(
            "font-semibold",
            className,
            isActive && activeClass
          )}
        >
          {item.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavItem;
