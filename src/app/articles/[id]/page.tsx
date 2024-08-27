import Article from "@/components/Articles/Article";

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
    <div className="flex justify-center">
      <Article isSingle={true} {...article} />
    </div>
  );
};
export default SingleArticle;
