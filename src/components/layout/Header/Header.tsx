"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/../../public/images.png";
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
      <div className="main-props container flex items-center gap-3 py-3">
        <Link className="hidden shrink-0 md:block" href={"/"}>
          <Image alt="logo" src={logo} width={50} height={50} />
        </Link>
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
