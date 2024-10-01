"use client";

import React, { useMemo, useState } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import anonymousUser from "@/../../public/anonymous_user.svg";

//icons
import { FaSearch } from "react-icons/fa";

interface IProps {
  users: User[];
}

const UsersList = ({ users }: IProps) => {
  const [search, setSearch] = useState("");

  const shownUsers = useMemo(() => {
    if (search) {
      return users.filter((user) =>
        user.userName.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return users;
  }, [search, users]);

  return (
    <>
      <div className="search_input_wrapper mb-3 flex overflow-hidden rounded ring-2 ring-blue-400">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          id="users-search"
          type="search"
          className="grow px-3 py-1.5 caret-blue-300 focus:border-none focus:outline-none focus:ring-blue-400"
        />

        <label
          htmlFor="users-search"
          className="flex items-center justify-center border-s-2 border-blue-400 bg-white px-2 text-blue-400"
        >
          <FaSearch className="" />
        </label>
      </div>

      <div className="flex flex-col gap-5">
        {shownUsers.map((user, idx) => (
          <div
            key={user.id}
            className="flex flex-col gap-3 rounded border border-slate-300 bg-white p-4 shadow-md sm:flex-row sm:gap-5"
          >
            <div className="flex grow items-center justify-center sm:grow-0">
              <Image
                src={user.profilePicture ?? anonymousUser}
                alt={user.userName}
                width={160}
                height={160}
                unoptimized
                className="aspect-square w-40 rounded-full bg-slate-100 object-cover object-top shadow"
                priority={idx < 6}
              />
            </div>

            <div className="flex grow flex-col items-center py-3 sm:items-start">
              <h2 className="mb-2 text-lg font-semibold">{user.userName}</h2>
              <small className="mb-2 text-base text-gray-600">
                Joining Date :{" "}
                {new Date(user.createdAt)
                  .toISOString()
                  .split("T")[0]
                  .replaceAll(/-/g, "/")}
              </small>
              <Link
                className="self-center rounded border border-slate-200 bg-blue-500 px-3 py-1 text-white decoration-white hover:bg-blue-600 hover:underline md:self-start"
                href={`/profile/${user.id}`}
              >
                show Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersList;
