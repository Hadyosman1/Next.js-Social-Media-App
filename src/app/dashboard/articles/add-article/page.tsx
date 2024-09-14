import ArticleForm from "@/components/forms/ArticleForm";
import BackBtn from "@/components/shared/BackBtn";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const AddProductPage = () => {
  const token = cookies().get("jwt_token")?.value;
  const userFromToken = verifyTokenForPage(token ?? "");

  if (!userFromToken?.isAdmin || !token) return redirect("/");

  return (
    <section className="flex flex-col gap-3 py-7">
      <div className="flex items-center">
        <BackBtn />
      </div>

      <div className="flex justify-center">
        <ArticleForm title="Add article" status={"create"} />
      </div>
    </section>
  );
};

export default AddProductPage;
