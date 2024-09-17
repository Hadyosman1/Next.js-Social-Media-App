import { Metadata } from "next";
import Pagination from "@/components/shared/Pagination";
import ArticlesList from "@/components/Articles/ArticlesList";
import { getArticles } from "@/services/articles";
import SearchArticlesInput from "@/components/Articles/SearchArticlesInput";
import prisma from "@/utils/db";

type TProps = {
  searchParams: {
    page?: string;
    limit?: string;
  };
};

const ArticlesPage = async ({ searchParams }: TProps) => {
  const { page, limit } = searchParams;
  const articles = await getArticles(page, limit);
  let articlesCount: number = 0;

  try {
    articlesCount = await prisma.article.count();
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error?.message : "Error fetching articles count",
    );
  }

  const currentPage = parseInt(page ?? "1");
  const currentLimit = parseInt(limit ?? "10");
  const start = (currentPage - 1) * currentLimit + 1;
  const end = start + articles.length - 1;

  return (
    <div className="main-props container flex flex-col items-center gap-5 py-8">
      {articlesCount > 0 ? (
        <>
          <SearchArticlesInput />
          <ArticlesList articles={articles} />

          <p className="my-3 text-sm font-medium text-slate-600 md:text-xl">
            {start} to {end} of ({articlesCount} Articles)
          </p>

          <Pagination
            path="/articles"
            limit={limit}
            page={page}
            count={articlesCount}
          />
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
  title: "Articles",
  description: "List of all articles",
};
