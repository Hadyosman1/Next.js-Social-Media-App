import { Metadata } from "next";

import Pagination from "@/components/Articles/Pagination";
import { TArticle } from "@/types";
import SearchArticlesInput from "@/components/Articles/SearchArticlesInput";
import ArticlesList from "@/components/Articles/ArticlesList";
import { getArticles, getArticlesCount } from "@/services/articles";

type TProps = {
  searchParams: {
    page?: string;
    limit?: string;
  };
};

const HomePage = async ({ searchParams }: TProps) => {
  const { page, limit } = searchParams;
  const articles = await getArticles(page, limit);
  const articlesCount = await getArticlesCount();

  return (
    <div className="main-props container flex flex-col items-center gap-5 py-8">
      <ArticlesList articles={articles} />
      <Pagination limit={limit} page={page} count={articlesCount} />
    </div>
  );
};

export default HomePage;

export const metadata: Metadata = {
  title: "Home | articles",
  description: "List of all articles",
};
