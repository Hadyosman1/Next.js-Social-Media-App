import Article from "@/components/Articles/Article";
import Pagination from "@/components/Articles/Pagination";
import SearchArticlesInput from "@/components/Articles/SearchArticlesInput";
import { Metadata } from "next";
import { TArticle } from "@/types";

const ArticlesPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) throw new Error("Failed to fetch articles..!");

  const articles: TArticle[] = await res.json();

  const articlesList = articles
    .slice(0, 8)
    .map((article) => <Article key={article.id} {...article} />);

  return (
    <div className="main-props container grid justify-center py-12">
      <SearchArticlesInput />
      <div className="my-5 grid max-w-4xl grid-cols-1 gap-3 md:grid-cols-2">
        {articlesList}
      </div>
      <Pagination />
    </div>
  );
};

export default ArticlesPage;

export const metadata: Metadata = {
  title: "Articles",
  description: "List of all articles",
};
