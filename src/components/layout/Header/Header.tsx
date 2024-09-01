"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/../../public/logo.png";
import NavBar from "./NavBar";
import Link from "next/link";
import AuthLinks from "./AuthLinks";

//icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="relative shadow shadow-sky-200">
      <div className="main-props container flex items-center justify-start gap-3 py-3">
        <div className="hidden w-1/5 shrink-0 justify-start md:flex">
          <Link className="rounded-full" href={"/"}>
            <Image
              className="object-cover w-14 h-14"
              alt="logo"
              src={logo}
              width={56}
              height={56}
            />
          </Link>
        </div>
        <span
          onClick={() => setIsNavOpen((prev) => !prev)}
          className="cursor-pointer text-2xl md:hidden"
        >
          {!isNavOpen ? <RxHamburgerMenu /> : <IoCloseSharp />}
        </span>
        <NavBar setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
        <AuthLinks />
      </div>
    </header>
  );
};

export default Header;
