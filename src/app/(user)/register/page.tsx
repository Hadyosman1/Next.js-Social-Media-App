import RegisterForm from "@/components/forms/RegisterForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const RegisterPage = () => {
  const token = cookies().get("jwt_token")?.value;
  const user = verifyTokenForPage(token || "");

  if (user) redirect("/");

  return (
    <section className="main-props container flex items-center justify-center py-12">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
