"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TypeJWTPayload } from "@/types";

//icons
import { IoHome as HomeIcon } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { MdArticle } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";

const isActive = (href: string, pathname: string) => {
  if (href !== "/") {
    return pathname.startsWith(href.split("?")[0]) ? "active" : "";
  }
  return pathname === href ? "active" : "";
};

type TProps = { user: TypeJWTPayload | null };

const NavBar = ({ user }: TProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = useMemo(() => {
    let links = [
      { href: "/", label: "Home", icon: <HomeIcon /> },
      {
        href: "/articles?page=1&limit=10",
        label: "Articles",
        icon: <MdArticle />,
      },
      { href: "/users", label: "Users", icon: <FaUsers /> },
    ];

    if (user) {
      links.push({
        href: "/profile",
        label: "Profile",
        icon: <FaCircleUser />,
      });

      if (user.isAdmin) {
        links.push({
          href: "/dashboard",
          label: "Dashboard",
          icon: <BiSolidDashboard />,
        });
      }
    }

    return links;
  }, [user]);

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
