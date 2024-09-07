import Image from "next/image";
import logo from "@/../../public/logo.png";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

import AuthLinks from "./AuthLinks";
import NavBar from "./NavBar";
import User from "@/components/shared/RoundedUser";

const Header = () => {
  const token = cookies().get("jwt_token")?.value;
  const user = verifyTokenForPage(token || "");

  return (
    <header className="bg_glassy sticky top-0 z-[999] bg-white/50 shadow shadow-sky-200">
      <div className="main-props container flex items-center justify-start gap-3 py-2">
        <div className="hidden w-1/5 shrink justify-start md:flex">
          <Link className="max-w-11 rounded-full" href={"/"}>
            <Image
              className="max-h-11 max-w-11 object-contain"
              alt="logo"
              src={logo}
            />
          </Link>
        </div>

        <NavBar user={user} />

        {!user ? <AuthLinks /> : <User user={user} />}
      </div>
    </header>
  );
};

export default Header;
