import { Metadata } from "next";
import Pagination from "@/components/Articles/Pagination";
import ArticlesList from "@/components/Articles/ArticlesList";
import { getArticles, getArticlesCount } from "@/services/articles";
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
  const articlesCount: number = await prisma.article.count();

  return (
    <div className="main-props container flex flex-col items-center gap-5 py-8">
      {articlesCount > 0 ? (
        <>
          <SearchArticlesInput />
          <ArticlesList articles={articles} />

          <p className="my-3 text-sm font-medium text-slate-600 md:text-xl">
            {(parseInt(page ?? "1") - 1) * parseInt(limit ?? "10") + 1} to{" "}
            {articles.length +
              (parseInt(page ?? "1") - 1) * parseInt(limit ?? "10")}{" "}
            from ({articlesCount} Articles)
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
