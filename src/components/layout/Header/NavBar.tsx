import Link from "next/link";

const linkStyle =
  "flex items-center gap-1 min-w-[100px] rounded-sm bg-blue-500/90 px-3 py-1.5 text-slate-100 hover:underline hover:bg-blue-600";

//icons
import { MdOutlineHome } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiTextAlignRightFill } from "react-icons/pi";
import { FaFolderOpen } from "react-icons/fa6";

const NavBar = ({ isNavOpen }: { isNavOpen: boolean }) => {
  return (
    <nav
      className={`absolute bottom-0 left-0 right-0 z-40 flex flex-grow translate-y-full items-center justify-center bg-current p-3 text-white shadow shadow-blue-300 transition-all md:static md:translate-y-0 md:p-0 md:opacity-100 md:shadow-none ${isNavOpen ? "px-10 opacity-100" : "opacity-0"}`}
    >
      <ul className="flex w-full flex-col items-start justify-center gap-2 md:flex-row md:items-center">
        <Link className={linkStyle} href={"/"}>
          <MdOutlineHome /> Home
        </Link>
        <Link className={linkStyle} href={"/about"}>
          <HiOutlineClipboardDocumentList /> About
        </Link>
        <Link className={linkStyle} href={"/articles"}>
          <PiTextAlignRightFill /> Articles
        </Link>
        <Link className={linkStyle} href={"/albums"}>
          <FaFolderOpen /> Albums
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
