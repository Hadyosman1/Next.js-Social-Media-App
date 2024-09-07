"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//icons
import { MdOutlineHome as HomeIcon } from "react-icons/md";
import { HiOutlineClipboardDocumentList as AboutIcon } from "react-icons/hi2";
import { FaFolderOpen as AlbumsIcon } from "react-icons/fa6";
import { TbLayoutDashboard as DashboardIcon } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { TypeJWTPayload } from "@/types";

let navLinks = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/about", label: "About", icon: <AboutIcon /> },
  { href: "/albums", label: "Albums", icon: <AlbumsIcon /> },
  { href: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
];

const isActive = (href: string, pathname: string) => {
  if (href !== "/") {
    return pathname.startsWith(href) ? "active" : "";
  }
  return pathname === href ? "active" : "";
};

type TProps = { user: TypeJWTPayload | null };

const NavBar = ({ user }: TProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  if (!user?.isAdmin) {
    navLinks = navLinks.filter((el) => !el.href.includes("dashboard"));
  }

  return (
    <>
      <span
        onClick={() => setIsNavOpen((prev) => !prev)}
        className="cursor-pointer text-2xl text-slate-700 md:hidden"
      >
        {!isNavOpen ? <RxHamburgerMenu /> : <IoCloseSharp />}
      </span>
      <nav
        className={`absolute bottom-0 left-0 right-0 z-40 flex flex-grow translate-y-full items-center justify-center bg-white p-4 text-white shadow shadow-blue-300 transition-[opacity,visibility] duration-300 ease-linear sm:p-7 md:visible md:static md:translate-y-0 md:bg-transparent md:p-0 md:opacity-100 md:shadow-none ${isNavOpen ? "opacity-100" : "invisible opacity-0"} `}
      >
        <ul className="flex w-full flex-col items-start justify-center gap-3 md:flex-row md:items-center">
          {navLinks.map((link) => (
            <Link
              className={`${isActive(link.href, pathname)} nav_link relative font-semibold md:text-3xl`}
              key={link.href}
              onClick={() => setIsNavOpen(false)}
              href={link.href}
            >
              {link.icon}
              <span className="label">{link.label}</span>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
