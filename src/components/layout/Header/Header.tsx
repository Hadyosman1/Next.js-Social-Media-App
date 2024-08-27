"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/../../public/next.svg";
import NavBar from "./NavBar";
import Link from "next/link";
import AuthLinks from "./AuthLinks";

//icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const [isNavOpen, setIsNavOPen] = useState(false);
  return (
    <header className="relative shadow shadow-sky-200">
      <div className="main-props container flex items-center gap-3 py-4">
        <Link className="hidden md:block" href={"/"}>
          <Image alt="logo" src={logo} width={80} />
        </Link>
        <span
          onClick={() => setIsNavOPen((prev) => !prev)}
          className="cursor-pointer text-2xl md:hidden"
        >
          {!isNavOpen ? <RxHamburgerMenu /> : <IoCloseSharp />}
        </span>
        <NavBar isNavOpen={isNavOpen} />
        <AuthLinks />
      </div>
    </header>
  );
};

export default Header;
