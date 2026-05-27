import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { links } from "@/lib/utils";
import NavItem from "./NavItem";

const NavList = ({ className }: React.ComponentProps<"div">) => {
  return (
    <NavigationMenu viewport={false} className="hidden xl:block col-start-2">
      <NavigationMenuList>
        {links.map((item, indx) => (
          <NavItem key={indx} item={item} className={className} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavList;
