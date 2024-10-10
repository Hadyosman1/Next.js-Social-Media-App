import { Metadata } from "next";
import RegisterOrEditForm from "@/components/forms/RegisterOrEditForm";

const RegisterPage = () => {
  return (
    <section className="main-props container flex items-center justify-center py-12">
      <RegisterOrEditForm status="register" />
    </section>
  );
};

export default RegisterPage;

export const metadata: Metadata = {
  title: "Register |",
  description: "User Registration Page.",
};
