import React, { Suspense } from "react";
import { Metadata } from "next";
import ArticlesList from "@/components/Articles/ArticlesList";
import SearchArticlesInput from "@/components/Articles/SearchArticlesInput";
import prisma from "@/utils/db";
import ArticlesLoader from "@/components/loadingIndicators/ArticlesLoader/ArticlesLoader";

type TProps = {
  searchParams: {
    page?: string;
    limit?: string;
  };
};

const ArticlesPage = async ({ searchParams }: TProps) => {
  const { page, limit } = searchParams;
  let articlesCount: number = 0;

  try {
    articlesCount = await prisma.article.count();
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error?.message : "Error fetching articles count",
    );
  }

  return (
    <div className="main-props container flex flex-col items-center gap-5 py-8">
      {articlesCount > 0 ? (
        <>
          <SearchArticlesInput />

          <Suspense fallback={<ArticlesLoader />}>
            <ArticlesList limit={limit} page={page} count={articlesCount} />
          </Suspense>
        </>
      ) : (
        <p className="flex grow items-center text-lg font-semibold text-slate-600">
          There are no articles..!
        </p>
      )}
    </div>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Articles |",
  description: "Article List.",
};
