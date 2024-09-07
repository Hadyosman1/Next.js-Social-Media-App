"use client";

import { TypeJWTPayload } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import anonymousUser from "@/../../public/anonymous_user.svg";
import Link from "next/link";
import SmallLoadingIndicator from "./SmallLoadingIndicator";
import { useRouter } from "next/navigation";
import { userLogOut } from "@/services/auth";
import { toast } from "react-toastify";

//icons
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";

type TProps = {
  user: TypeJWTPayload | null;
};

const User = ({ user }: TProps) => {
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleCloseDropMenu = (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      if (
        !isMenuHidden &&
        !target.classList.contains("user_dropdown_item") &&
        !target.classList.contains("logout-btn") &&
        !(target.id === "user_drop_menu")
      ) {
        setIsMenuHidden(true);
      }
    };

    document.addEventListener("click", handleCloseDropMenu);

    return () => {
      document.removeEventListener("click", handleCloseDropMenu);
    };
  }, [isMenuHidden]);

  const logOutHandler = async () => {
    setIsLoading(true);
    const res = await userLogOut();
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(res.message);
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="ms-auto flex items-center justify-end gap-2.5 text-sm md:w-1/5">
      <div className="relative">
        <button
          onClick={() => setIsMenuHidden((prev) => !prev)}
          className="relative rounded-full align-middle"
        >
          <Image
            src={user?.profilePicture ?? anonymousUser}
            alt={user?.userName ?? "user"}
            width={48}
            height={48}
            className="aspect-square w-12 rounded-full border bg-slate-100 object-cover object-top shadow-sm hover:shadow-inner"
          />

          <span className="absolute bottom-0 right-0 translate-y-0.5 rounded-full border bg-slate-100 p-0.5 text-sm text-slate-700 shadow-md">
            {isMenuHidden ? <MdExpandMore /> : <MdExpandLess />}
          </span>
        </button>

        <nav
          id="user_drop_menu"
          className={`${isMenuHidden && "invisible opacity-0"} absolute bottom-0 right-0 z-10 flex min-w-44 translate-y-[calc(100%_+_9px)] flex-col gap-1 rounded border-2 border-slate-300 bg-gray-100 p-1.5 shadow-md transition`}
        >
          <p className="user_dropdown_item overflow-hidden text-ellipsis whitespace-nowrap bg-white font-semibold hover:bg-white hover:indent-0">
            {user?.userName}
          </p>

          <hr />

          <Link className="user_dropdown_item" href="/profile">
            Profile
          </Link>

          <p className="user_dropdown_item">anything for now </p>
          <p className="user_dropdown_item">anything for now </p>
          <p className="user_dropdown_item">anything for now </p>
          <p className="user_dropdown_item">anything for now </p>

          <button
            disabled={isLoading}
            onClick={logOutHandler}
            className={`logout-btn flex items-center justify-center gap-1 rounded-sm bg-red-700/80 px-3 py-1 text-slate-100 transition-all hover:bg-red-800/80 hover:indent-2`}
          >
            {isLoading && <SmallLoadingIndicator size="sm" />} Log out
          </button>
        </nav>
      </div>
    </div>
  );
};

export default User;
