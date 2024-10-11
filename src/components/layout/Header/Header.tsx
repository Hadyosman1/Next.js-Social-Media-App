import Image from "next/image";
import Link from "next/link";
import AuthLinks from "./AuthLinks";
import NavBar from "./NavBar";
import RoundedUser from "@/components/shared/RoundedUser";

import { TypeJWTPayload } from "@/types";

const Header = ({ user }: { user: TypeJWTPayload | null }) => {
  return (
    <header className="bg_glassy sticky top-0 z-[999] bg-white/50 shadow shadow-sky-200">
      <div className="main-props container flex items-center justify-start gap-3 py-2">
        <h1 className="hidden h-[55px] w-1/5 shrink justify-start text-2xl md:flex items-center font-extrabold text-slate-700 md:flex">
          DE<span className="text-blue-600">V</span>O
        </h1>

        <NavBar user={user} />

        {!user ? <AuthLinks /> : <RoundedUser user={user} />}
      </div>
    </header>
  );
};

export default Header;
