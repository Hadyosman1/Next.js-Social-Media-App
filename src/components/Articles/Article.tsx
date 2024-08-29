import { TArticle } from "@/types";
import Link from "next/link";

const Article = ({
  id,
  body,
  title,
  /*  userId,*/
  isSingle,
}: TArticle & { isSingle?: boolean }) => {
  const date = new Date().toISOString();

  return (
    <article
      className={`flex ${!isSingle ? "self-center border border-x-blue-300 border-y-blue-400 shadow shadow-blue-500/80" : "self-start"} flex-col items-start gap-2 rounded p-5`}
    >
      <h2 className={`${!isSingle && "line-clamp-1"} text-lg font-bold`}>
        {title}
      </h2>
      <p>{date.slice(0, date.indexOf("T"))}</p>

      <p className={`${!isSingle && "line-clamp-1"} text-lg`}>{body}</p>
      {!isSingle && (
        <Link className="text-blue-500 underline" href={`articles/${id}`}>
          Read more
        </Link>
      )}
    </article>
  );
};

export default Article;
