import UsersList from "@/components/users/UsersList";
import { getAllUsers } from "@/services/users";
import { Metadata } from "next";

const UsersPage = async () => {
  const users = await getAllUsers();

  return (
    <section className="main-props container py-8">
      <div className="mb-7">
        <h1 className="w-fit border-b-2 border-slate-400 pb-2 text-2xl font-semibold text-slate-700">
          All Users
        </h1>
      </div>

      <div className="mx-auto max-w-xs sm:max-w-xl">
        <UsersList users={users} />
      </div>
    </section>
  );
};

export default UsersPage;

export const metadata: Metadata = {
  title: "Users |",
  description: "Users",
};
