"use client";
import { TArticle } from "@/types";
import Article from "./Article";
import SearchArticlesInput from "./SearchArticlesInput";

const ArticlesList = ({
  articles,
  children,
}: {
  articles: TArticle[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex max-w-xl flex-wrap justify-center gap-5">
      <SearchArticlesInput />
      {children}
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;
