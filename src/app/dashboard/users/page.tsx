import PageTitle from "@/components/dashboard/PageTitle";
import UsersTable from "@/components/dashboard/users/UsersTable";
import { getAllUsers } from "@/services/users";
import { User } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";

import { IoAddCircle } from "react-icons/io5";

const UsersPage = async () => {
  const users: User[] = await getAllUsers();

  return (
    <section className="flex h-full flex-col py-7">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <PageTitle title={"users"} />

        <Link
          className="ms-auto flex items-center justify-center gap-1 rounded bg-blue-500 px-2 py-1 text-center text-sm text-white hover:bg-blue-600 md:text-base"
          href="/dashboard/users/add-user"
        >
          <IoAddCircle /> Add User
        </Link>
      </div>

      <UsersTable users={users} />
    </section>
  );
};

export default UsersPage;

export const metadata: Metadata = {
  title: "Dashboard | Users ",
  description: "List of users",
};
