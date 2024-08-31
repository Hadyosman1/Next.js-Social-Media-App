import React from "react";
import Link from "next/link";

//icons
import { MdOutlineHome as HomeIcon } from "react-icons/md";
import { HiOutlineClipboardDocumentList as AboutIcon } from "react-icons/hi2";
import { FaFolderOpen as AlbumsIcon } from "react-icons/fa6";
import { TbLayoutDashboard as DashboardIcon } from "react-icons/tb";

const linkStyle = `
        flex items-center justify-center
        text-sm gap-1 min-w-[120px] 
        rounded-sm bg-blue-500/90
        px-2 py-1.5 text-slate-100
        md:min-w-[initial]
        hover:underline 
        hover:bg-blue-600
      `;

const navLinks = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/about", label: "About", icon: <AboutIcon /> },
  { href: "/albums", label: "Albums", icon: <AlbumsIcon /> },
  { href: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
];

const NavBar = ({
  isNavOpen,
  setIsNavOpen,
}: {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav
      className={`absolute bottom-0 left-0 right-0 z-40 flex flex-grow translate-y-full items-center justify-center bg-current p-3 text-white shadow shadow-blue-300 transition-[opacity,visibility] duration-300 ease-linear md:visible md:static md:translate-y-0 md:p-0 md:opacity-100 md:shadow-none ${isNavOpen ? "opacity-100" : "invisible opacity-0"} `}
    >
      <ul className="flex w-full flex-col items-start justify-center gap-2 md:flex-row md:items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            onClick={() => setIsNavOpen(false)}
            className={linkStyle}
            href={link.href}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
