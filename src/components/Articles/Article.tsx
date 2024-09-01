import { TArticle } from "@/types";
import Image from "next/image";
import anonymousUser from "@/../../public/anonymous_user.svg";
import getTimeAgo from "@/utils/getTimeAgo";
import Comments from "./comments/Comments";

import useTextDirByLine from "@/hooks/useTextDirByLine";

const Article = ({ article }: { article: TArticle }) => {
  const timeAgo = getTimeAgo(article.createdAt);
  const title = useTextDirByLine(article.title);
  const description = useTextDirByLine(article.description);

  return (
    <article
      className={`flex w-full flex-col gap-2 rounded border border-blue-300 bg-white p-3 shadow-md shadow-blue-200/75 md:p-5`}
    >
      <div className="mb-4 flex w-full items-center gap-2 border-b-2 pb-3">
        <Image
          src={article.author.profilePicture ?? anonymousUser}
          alt={article.author.userName}
          width={64}
          height={64}
          className="w-16 rounded-full bg-slate-400"
          loading="lazy"
        />
        <h2 className="flex flex-col font-bold">
          {article.author.userName}
          <span className="text-sm font-normal text-slate-500">{timeAgo}</span>
          <span className="text-sm font-normal text-slate-500">
            updated at {article.updatedAt.toString()}
          </span>
        </h2>
      </div>

      <div className={`text-sm font-medium md:text-lg`}>{title}</div>
      <div className={`indent-1 text-sm md:text-lg`}>{description}</div>

      {article.imageUrl && (
        <Image
          className="bg-slate-50"
          src={article.imageUrl}
          alt={article.title}
          width={800}
          height={400}
        />
      )}

      <Comments comments={article.comments} />
    </article>
  );
};

export default Article;
