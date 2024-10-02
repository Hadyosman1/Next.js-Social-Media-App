import AddUserForm from "@/components/forms/AddUserForm";
import BackBtn from "@/components/shared/BackBtn";
import { Metadata } from "next";

const AddUserPage = () => {
  return (
    <section className="flex flex-col gap-3 py-10">
      <div className="flex items-center">
        <BackBtn />
      </div>

      <div className="flex justify-center">
        <AddUserForm />
      </div>
    </section>
  );
};

export default AddUserPage;

export const metadata: Metadata = {
  title: "Dashboard | Add User",
  description: "Add User from admin",
};
