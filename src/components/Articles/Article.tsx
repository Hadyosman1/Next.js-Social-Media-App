import { TArticle } from "@/types";
import Image from "next/image";
import anonymousUser from "@/../../public/anonymous_user.svg";
import getTimeAgo from "@/utils/getTimeAgo";
import Comments from "./comments/Comments";

import useTextDirByLine from "@/hooks/useTextDirByLine";
import AddCommentsForm from "./comments/AddCommentsForm";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import ArticleImage from "./ArticleImage";

const Article = ({ article }: { article: TArticle }) => {
  const timeAgo = getTimeAgo(article.createdAt);
  const updatedAgo = getTimeAgo(article.updatedAt);
  const title = useTextDirByLine(article.title);
  const description = useTextDirByLine(article.description);
  const isUpdatedAtDisplay = !(article.createdAt === article.updatedAt);

  const token = cookies().get("jwt_token")?.value;
  const user = verifyTokenForPage(token || "");

  return (
    <>
      <article className={`article`}>
        <div className="mb-4 flex w-full items-center gap-2 border-b-2 pb-3">
          <Image
            src={article.author.profilePicture ?? anonymousUser}
            alt={article.author.userName}
            width={64}
            height={64}
            className="aspect-square w-16 rounded-full bg-slate-100 object-cover object-top"
            loading="lazy"
          />
          <h2 className="flex flex-col font-bold">
            {article.author.userName}
            <span className="text-sm font-normal text-slate-500">
              {timeAgo}
            </span>
            {isUpdatedAtDisplay && (
              <span className="text-sm font-normal text-slate-500">
                updated at {updatedAgo}
              </span>
            )}
          </h2>
        </div>

        <div className={`text-sm font-medium md:text-lg`}>{title}</div>
        <div className={`indent-1 text-sm md:text-lg`}>{description}</div>

        <ArticleImage image={article.imageUrl} title={article.title} />

        <Comments user={user} comments={article.comments} />

        {user ? (
          <AddCommentsForm articleId={article.id} />
        ) : (
          <p className="text-center text-slate-700">
            Please log in first to be able to comment.
          </p>
        )}
      </article>
    </>
  );
};

export default Article;
