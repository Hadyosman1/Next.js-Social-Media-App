import RegisterOrEditForm from "@/components/forms/RegisterOrEditForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const RegisterPage = () => {
  const token = cookies().get("jwt_token")?.value;
  const user = verifyTokenForPage(token || "");

  if (user) redirect("/");

  return (
    <section className="main-props container flex items-center justify-center py-12">
      <RegisterOrEditForm status="register" />
    </section>
  );
};

export default RegisterPage;
