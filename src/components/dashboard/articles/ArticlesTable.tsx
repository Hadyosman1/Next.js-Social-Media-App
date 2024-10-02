"use client";

import { TArticle } from "@/types";
import Image from "next/image";
import { MouseEventHandler } from "react";
import DeleteArticleBtn from "../../Articles/DeleteArticleBtn";
import EditArticleBtn from "../../Articles/EditArticleBtn";
import Link from "next/link";
import FixTextDirection from "@/components/shared/FixTextDirection";

const ArticlesTable = ({ articles }: { articles: TArticle[] }) => {
  const handleImageClicked: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;

    if (
      typeof target.requestFullscreen === "function" &&
      !document.fullscreenElement
    ) {
      target.style.objectFit = "contain";
      target.requestFullscreen();
    } else if (typeof document.exitFullscreen === "function") {
      target.style.objectFit = "cover";
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden bg-white">
            <table className="min-w-full text-center align-middle text-sm font-light">
              <thead className="border-b border-neutral-200 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-2">
                    Title
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Description
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Image
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Created At
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Author
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Comments count
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Controls
                  </th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => {
                  return (
                    <tr
                      key={article.id}
                      className="border-b border-neutral-200 font-medium"
                    >
                      <td dir="auto" className="px-6 py-4 min-w-52">
                        <div
                          dir="auto"
                          className="mx-auto max-w-[350px] rounded bg-slate-100 px-2 py-1 text-start"
                        >
                          <FixTextDirection text={article.title} />
                        </div>
                      </td>

                      <td dir="auto" className="px-6 py-4 min-w-52">
                        <div
                          dir="auto"
                          className="mx-auto max-w-[350px] rounded bg-slate-100 px-2 py-1 text-start"
                        >
                          <FixTextDirection text={article.description} />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {article.imageUrl ? (
                          <Image
                            onClick={handleImageClicked}
                            className="mx-auto aspect-square max-w-52 cursor-pointer rounded object-center object-cover shadow"
                            width={500}
                            height={500}
                            unoptimized
                            src={article.imageUrl}
                            alt={article.title}
                          />
                        ) : (
                          <span className="mx-auto">With no image</span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(article.createdAt).toDateString()}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex flex-col items-center gap-2">
                          <p>{article.author.userName}</p>

                          <Link
                            href={`/profile/${article.authorId}`}
                            className="rounded bg-slate-400 px-3 py-1 font-normal text-white hover:bg-slate-500"
                          >
                            view user profile
                          </Link>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        {article.comments.length === 0 ? (
                          "No comments yet..."
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <p>
                              {article.comments.length} comment
                              {article.comments.length > 2 ? "s" : ""}{" "}
                            </p>
                          </div>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="mx-auto flex max-w-20 flex-col justify-center gap-2 bg-slate-50">
                          <EditArticleBtn
                            articleId={article.id}
                            imageUrl={article.imageUrl}
                            title={article.title}
                            description={article.description}
                          />

                          <DeleteArticleBtn articleId={article.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              {articles.length === 0 && (
                <tfoot>
                  <tr>
                    <td className="py-2 font-semibold" colSpan={8}>
                      There is no articles yet...
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesTable;
