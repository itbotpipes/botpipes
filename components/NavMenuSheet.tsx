"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { links, LinkSchema } from "@/lib/utils";
import Link from "next/link";
import Image from "./Image";
import clsx from "clsx";
import MainButton from "./MainButton";

interface NavMenuSheetProps {
  color: string;
}
const NavMenuSheet: React.FC<NavMenuSheetProps> = ({ color }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center xl:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className={clsx("relative z-10 cursor-pointer", color)}>
          <Menu size={30} />
        </SheetTrigger>
        <SheetContent className="z-150 max-h-screen overflow-auto p-5">
          <h1 className="font-inter text-2xl font-semibold">Menu</h1>
          <div className="mb-15 flex flex-col gap-6">
            <div>
              <h2 className="mb-2 text-xs font-semibold text-gray-400">Main</h2>
              <ul className="space-y-2">
                {links
                  .filter((item) => !item.sub)
                  .map((item, indx) => (
                    <Link
                      className="block font-semibold"
                      onClick={() => setOpen(false)}
                      key={indx}
                      href={item.path}
                    >
                      {item.label}
                    </Link>
                  ))}
              </ul>
            </div>

            {links
              .filter((item) => item.sub)
              .map((item, indx) => (
                <NavItem
                  key={indx}
                  item={item}
                  onClick={() => setOpen(false)}
                />
              ))}
          </div>
          <SheetFooter className="p-0">
            <div className="flex items-center gap-2">
              <Image
                src="/nav-cell.png"
                alt="nav-cell"
                className="h-10 w-10 object-contain"
              />
              <div className="">
                <h2 className="font-anek text-sm">Call us now</h2>
                <h1 className="font-anek font-semibold">+91 96872 66688</h1>
              </div>
            </div>
            <MainButton
              className="hidden md:flex"
              text="Contact With Us"
              size={"lg"}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface NavItemProps {
  item: LinkSchema;
  onClick: () => void;
}
const NavItem: React.FC<NavItemProps> = ({ item, onClick }) => {
  if (item.sub)
    return (
      <div>
        <h2 className="mb-2 text-xs font-semibold text-gray-400">
          {item.label}
        </h2>
        <ul className="space-y-2">
          {item.sub.map((subItem, indx) => (
            <Link
              className="block font-semibold"
              onClick={onClick}
              key={indx}
              href={subItem.path}
            >
              {subItem.label}
            </Link>
          ))}
        </ul>
      </div>
    );

  return (
    <Link className="font-semibold" onClick={onClick} href={item.path}>
      {item.label}
    </Link>
  );
};

export default NavMenuSheet;
