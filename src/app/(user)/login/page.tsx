import LoginForm from "@/components/forms/LoginForm";
import { Metadata } from "next";

const LoginPage = () => {
  return (
    <section className="main-props container flex items-center justify-center py-12">
      <LoginForm />
    </section>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "Login |",
  description: "Login Page For User. ",
};
