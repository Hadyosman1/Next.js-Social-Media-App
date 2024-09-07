import ArticleImage from "./ArticleImage";
import Comments from "./comments/Comments";
import CommentForm from "./comments/CommentForm";

import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import anonymousUser from "@/../../public/anonymous_user.svg";

import getTimeAgo from "@/utils/getTimeAgo";
import useTextDirByLine from "@/hooks/useTextDirByLine";
import { verifyTokenForPage } from "@/utils/verifyToken";

import { TArticle } from "@/types";
import ArticleControls from "./ArticleControls";

const Article = ({
  article,
  imagePriority,
}: {
  article: TArticle;
  imagePriority: boolean;
}) => {
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
            unoptimized
            className="aspect-square w-16 rounded-full bg-slate-100 object-cover object-top shadow"
            priority={imagePriority}
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

          {user?.id === article.authorId && (
            <ArticleControls articleId={article.id} />
          )}
        </div>

        <div className={`text-sm font-medium md:text-lg`}>{title}</div>
        <div className={`indent-1 text-sm md:text-lg`}>{description}</div>

        <ArticleImage
          imagePriority={imagePriority}
          image={article.imageUrl}
          title={article.title}
        />

        <Comments user={user} comments={article.comments} />

        {user ? (
          <CommentForm status="create" articleId={article.id} />
        ) : (
          <p className="text-center text-slate-600">
            Please
            <Link className="mx-1 text-blue-700 underline" href="/login">
              log in
            </Link>
            first to be able to comment.
          </p>
        )}
      </article>
    </>
  );
};

export default Article;
