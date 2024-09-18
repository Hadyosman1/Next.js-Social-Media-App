import ArticleForm from "@/components/forms/ArticleForm";
import BackBtn from "@/components/shared/BackBtn";
import { Metadata } from "next";

const AddProductPage = () => {
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

export const metadata: Metadata = {
  title: "Dashboard | Articles",
  description: "Add article from admin",
};
