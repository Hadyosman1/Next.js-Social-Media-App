"use client";

import DeleteUserBtn from "@/components/profile/DeleteUserBtn";
import { User } from "@prisma/client";
import Image from "next/image";
import { MouseEventHandler } from "react";

const UsersTable = ({ users }: { users: User[] }) => {
  const handleImageClicked: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;

    if (
      typeof target.requestFullscreen === "function" &&
      !document.fullscreenElement
    ) {
      target.style.objectFit = "contain";
      target.requestFullscreen();
    } else if (typeof document.exitFullscreen === "function") {
      document.exitFullscreen();
      target.style.objectFit = "cover";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden bg-white">
            <table className="min-w-full text-center align-middle text-sm font-light">
              <thead className="border-b border-neutral-200 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-2">
                    User name
                  </th>

                  <th scope="col" className="px-6 py-2">
                    E-mail
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Image
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Role
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Created At
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Controls
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-neutral-200 font-medium"
                  >
                    <td className="px-6 py-4">{user.userName}</td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {user.email}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {user.profilePicture ? (
                        <Image
                          onClick={handleImageClicked}
                          className="mx-auto aspect-square max-w-52 cursor-pointer rounded object-cover shadow"
                          width={500}
                          height={500}
                          unoptimized
                          src={user.profilePicture}
                          alt={user.userName}
                        />
                      ) : (
                        <span className="mx-auto">With no image</span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {user.isAdmin ? "Admin" : "User"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(user.createdAt).toDateString()}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="mx-auto flex max-w-20 flex-col justify-center gap-2 bg-slate-50">
                        <DeleteUserBtn id={user.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              {users.length === 0 && (
                <tfoot>
                  <tr>
                    <td className="py-2 font-semibold" colSpan={8}>
                      There is no users yet...
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
