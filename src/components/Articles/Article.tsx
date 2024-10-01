import React from "react";
import ArticleImage from "./ArticleImage";
import Comments from "./comments/Comments";
import CommentForm from "./comments/CommentForm";

import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import anonymousUser from "@/../../public/anonymous_user.svg";
import FixTextDirection from "@/components/shared/FixTextDirection";
import { verifyTokenForPage } from "@/utils/verifyToken";

import { TArticle } from "@/types";
import ArticleControls from "./ArticleControls";
import CreatedAtAndUpdatedAt from "./CreatedAtAndUpdatedAt";

const Article = ({
  article,
  imagePriority,
}: {
  article: TArticle;
  imagePriority: boolean;
}) => {
  const token = cookies().get("jwt_token")?.value;
  const user = verifyTokenForPage(token || "");

  return (
    <>
      <article className={`article`}>
        <div className="mb-4 flex w-full items-center gap-2 border-b-2 pb-3">
          <Link
            href={`/profile/${!(user?.id === article.authorId) ? article.authorId : ""}`}
          >
            <Image
              src={article.author.profilePicture ?? anonymousUser}
              alt={article.author.userName}
              width={64}
              height={64}
              unoptimized
              className="aspect-square w-16 rounded-full bg-slate-100 object-cover object-top shadow"
              priority={imagePriority}
            />
          </Link>

          <h2 className="flex flex-col font-bold">
            {article.author.userName}
            <CreatedAtAndUpdatedAt
              createdAt={article.createdAt}
              updatedAt={article.createdAt}
            />
          </h2>

          {user?.id === article.authorId && (
            <ArticleControls
              imageUrl={article.imageUrl}
              title={article.title}
              description={article.description}
              articleId={article.id}
            />
          )}
        </div>

        <div className={`-mb-1 text-sm font-medium md:text-lg`}>
          <FixTextDirection text={article.title} />
        </div>

        <div className={`text-sm md:text-lg`}>
          <FixTextDirection text={article.description} />
        </div>

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
