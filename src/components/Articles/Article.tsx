import { TArticle } from "@/types";
import Link from "next/link";

const Article = ({
  id,
  body,
  title,
  userId,
  isSingle,
}: TArticle & { isSingle?: boolean }) => {
  return (
    <article
      className={`flex max-w-2xl ${!isSingle ? "self-center" : "self-start"} flex-col items-start gap-2 rounded border border-x-blue-300 border-y-blue-400 p-5 shadow shadow-blue-500/80`}
    >
      <h2 className={`${!isSingle && "line-clamp-1"} text-lg font-bold`}>
        {title}
      </h2>
      <p className={`${!isSingle && "line-clamp-1"} text-xl`}>{body}</p>
      {!isSingle && (
        <Link className="text-blue-500 underline" href={`articles/${id}`}>
          Read more
        </Link>
      )}
    </article>
  );
};

export default Article;
