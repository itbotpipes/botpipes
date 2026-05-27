import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { Route } from "next";
import { HomeIcon, SettingsIcon } from "lucide-react";

interface NavbarProps {
  className?: string;
}

interface ILink {
  label: string;
  href: Route;
  Icon: typeof HomeIcon;
}

const links: ILink[] = [
  {
    label: "Dashboard",
    href: "/admin",
    Icon: HomeIcon,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    Icon: HomeIcon,
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    Icon: HomeIcon,
  },
  {
    label: "Career",
    href: "/admin/careers",
    Icon: HomeIcon,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    Icon: HomeIcon,
  },
  {
    label: "FAQ",
    href: "/admin/faq",
    Icon: HomeIcon,
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    Icon: HomeIcon,
  },
  {
    label: "Products",
    href: "/admin/products",
    Icon: HomeIcon,
  },
];

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <div className={clsx("bg-[#24275E] p-4 text-white", className)}>
      <div className="flex h-full flex-col justify-between">
        {/* Main Navigation */}
        <div className="flex h-full flex-col gap-4">
          {links.map((link, indx) => (
            <NavItem key={indx} {...link} />
          ))}
        </div>

        {/* Settings */}
        <div className="mb-10 flex flex-col gap-2">
          <NavItem
            label="Settings"
            href="/admin/settings"
            Icon={SettingsIcon}
          />
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<ILink & { className?: string }> = ({
  label,
  href,
  Icon,
  className,
}) => {
  return (
    <Link
      className={clsx(
        "flex items-center rounded-lg p-2.5 hover:bg-gray-100/20",
        className,
      )}
      href={href}
    >
      <Icon size={20} className="mr-2 inline-block" />
      {label}
    </Link>
  );
};

export default Navbar;
