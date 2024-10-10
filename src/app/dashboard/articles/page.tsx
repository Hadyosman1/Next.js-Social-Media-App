import Pagination from "@/components/shared/Pagination";
import ArticlesTable from "@/components/dashboard/articles/ArticlesTable";
import PageTitle from "@/components/dashboard/PageTitle";
import { getArticles } from "@/services/articles";
import { TArticle } from "@/types";
import prisma from "@/utils/db";
import Link from "next/link";

//icons
import { IoAddCircle } from "react-icons/io5";
import { Metadata } from "next";

type TProps = {
  searchParams: {
    page: string;
    limit: string;
  };
};

const ArticlesPage = async ({ searchParams: { page, limit } }: TProps) => {
  const articles: TArticle[] = await getArticles(page, limit);
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
    <section className="flex h-full flex-col py-7">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <PageTitle title={"articles"} />

        <Link
          className="ms-auto flex items-center justify-center gap-1 rounded bg-blue-500 px-2 py-1 text-center text-sm text-white hover:bg-blue-600 md:text-base"
          href="/dashboard/articles/add-article"
        >
          <IoAddCircle /> Add article
        </Link>
      </div>

      <ArticlesTable articles={articles} />

      <p className="my-3 text-sm font-medium text-slate-600 md:text-xl">
        {(parseInt(page) - 1) * parseInt(limit) + 1} to{" "}
        {articles.length + (parseInt(page) - 1) * parseInt(limit)} from (
        {articlesCount} Articles)
      </p>

      <div className="mt-auto pb-3">
        <Pagination
          path="/dashboard/articles"
          page={page}
          limit={limit}
          count={articlesCount}
        />
      </div>
    </section>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Dashboard | Articles ",
  description: "Article List.",
};

