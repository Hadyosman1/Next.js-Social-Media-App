"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

//icons
import { RxDashboard } from "react-icons/rx";
import { MdOutlineMenuOpen } from "react-icons/md";
import { PiArticleNyTimes } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { FaComments } from "react-icons/fa";

const SideBar = () => {
  const [isSideBarFull, setIsSideBarFull] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const handleWindowSize = () => {
      if (window.innerWidth < 768) setIsSideBarFull(false);
    };

    handleWindowSize();

    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  return (
    <div
      className={`${isSideBarFull ? "w-[200px]" : "w-auto"} relative flex w-fit flex-col border-2 border-l-0 border-t-0 border-white bg-slate-400/75 px-3 py-5 text-white transition-[width] duration-500`}
    >
      <Link
        href="/dashboard"
        className="relative flex items-center justify-center gap-2 border-b border-white pb-2 text-xl font-bold"
      >
        <RxDashboard />
        <span className={`${!isSideBarFull ? "hidden" : "md:block"} hidden`}>
          Dashboard
        </span>
      </Link>

      <div
        className={`my-5 flex flex-grow flex-col gap-3 ${isSideBarFull ? "overflow-y-auto" : ""}`}
      >
        <Link
          className={`${!isSideBarFull ? "justify-center px-1 py-1" : "px-3 py-0.5"} ${pathname === "/dashboard/articles" || pathname === "/dashboard/articles/add-article" ? "active" : ""} side_bar_link`}
          href={"/dashboard/articles/?page=1&limit=10"}
        >
          <PiArticleNyTimes className="text-xl" />
          <span
            className={`${!isSideBarFull ? "absolute_right" : "md:block"} static`}
          >
            Articles
          </span>
        </Link>

        <Link
          className={`${!isSideBarFull ? "justify-center px-1 py-1" : "px-3 py-0.5"} ${pathname === "/dashboard/comments" ? "active" : ""} side_bar_link`}
          href={"/dashboard/comments"}
        >
          <FaComments className="text-xl" />
          <span
            className={`${!isSideBarFull ? "absolute_right" : "md:block"} static`}
          >
            Comments
          </span>
        </Link>

        <Link
          className={`${!isSideBarFull ? "justify-center px-1 py-1" : "px-3 py-0.5"} ${pathname === "/dashboard/users" || pathname === "/dashboard/users/add-user" ? "active" : ""} side_bar_link`}
          href={"/dashboard/users"}
        >
          <FaUsers className="text-xl" />
          <span
            className={`${!isSideBarFull ? "absolute_right" : "md:block"} static`}
          >
            Users
          </span>
        </Link>
      </div>

      <button
        onClick={() => setIsSideBarFull((prev) => !prev)}
        className={`${!isSideBarFull && "absolute bottom-3 right-0 translate-x-1/2 rounded-full"} ms-auto hidden rounded border border-blue-400 bg-slate-100 p-1 text-xl text-blue-400 shadow-md transition-all hover:bg-slate-200 md:block`}
      >
        <MdOutlineMenuOpen className={`${!isSideBarFull && "rotate-180"}`} />
      </button>
    </div>
  );
};

export default SideBar;
