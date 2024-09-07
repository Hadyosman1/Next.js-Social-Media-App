import LoginForm from "@/components/forms/LoginForm";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const token = cookies().get("jwt_token")?.value;
  const user = verifyTokenForPage(token || "");

  if (user) redirect("/");

  return (
    <section className="main-props container flex items-center justify-center py-12">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
