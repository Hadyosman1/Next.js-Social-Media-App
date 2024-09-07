import { TArticle } from "@/types";
import Article from "./Article";
import SearchArticlesInput from "./SearchArticlesInput";

const ArticlesList = ({ articles }: { articles: TArticle[] }) => {
  return (
    <div className="flex max-w-full md:max-w-xl flex-wrap justify-center gap-5">
      <SearchArticlesInput />
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;
