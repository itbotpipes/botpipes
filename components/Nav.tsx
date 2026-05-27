"use client";

import React from "react";
import Image2 from "./Image";
import Image from "next/image";
import NavMenuSheet from "./NavMenuSheet";
import MainButton from "./MainButton";
import { Button } from "./ui/button";
import useScroll from "./hooks/useScroll";
import clsx from "clsx";
import NavList from "./NavList";
import { usePathname } from "next/navigation";
import Link from "next/link";

const thresh = 100;



const Nav = () => {
  const { scrollY, isDown } = useScroll();
  const pathname = usePathname();

  const excludeLists = ["/about", "/about-factory"];
  const isTransparent =
    scrollY > thresh ||
    excludeLists.includes(pathname) ||
    pathname.startsWith("/blog");

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-45 w-full px-4 py-2 transition-all duration-300 bg-white",
        isTransparent && "bg-white border-b border-black/20",
      )}
    >
      <div className="mx-auto gap-3 max-w-[85rem] flex items-center p-3 justify-between">
          <Link href="/">
            <Image
              priority
              src="/logo.png"
              alt="logo"
              width={200}
              height={50}
              className="h-[2.3rem] w-fit object-contain"
            />
          </Link>

            {/* <div className="hidden gap-2 md:flex">
              <Image2
                src="/nav-cell.png"
                alt="nav-cell"
                className="aspect-square h-10 w-auto object-contain"
              />
              <div 
                className="text-black"
              >
                <h2 className="font-anek text-sm">Call us now</h2>
                <Link href="/contact" className="font-anek font-semibold hover:underline">+91 95125 66629</Link>
              </div>
            </div> */}
            
        <div className="flex gap-6 xl:hidden">
          <NavMenuSheet 
            color="text-black"
          />
        </div>

        <NavList
          className="text-gray-500 hover:text-black"
        />

        <Link href="/contact" className="hidden xl:flex">
          <MainButton
              className=""
              text="Contact With Us"
              size={"lg"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
