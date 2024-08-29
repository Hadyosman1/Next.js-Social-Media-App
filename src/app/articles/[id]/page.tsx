import Article from "@/components/Articles/Article";
import AddCommentsForm from "@/components/Articles/comments/AddCommentsForm";
import Comments from "@/components/Articles/comments/Comments";

type TProps = {
  params: {
    id: string;
  };
};

const SingleArticle = async ({ params }: TProps) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
  );
  if (!res.ok) throw new Error("Failed to fetch article..!");
  const article = await res.json();

  return (
    <div className="flex items-start justify-center py-12">
      <div className="max-w-2xl rounded border border-sky-400 p-2 shadow shadow-sky-400">
        <Article isSingle={true} {...article} />
        <hr className="my-3 border-slate-300" />
        <Comments />
        <hr className="my-3 border-slate-300" />
        <AddCommentsForm />
      </div>
    </div>
  );
};
export default SingleArticle;
