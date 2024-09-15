import ArticleForm from "@/components/forms/ArticleForm";
import BackBtn from "@/components/shared/BackBtn";

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
