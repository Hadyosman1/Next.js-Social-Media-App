import { TArticle } from "@/types";
import Article from "./Article";

const ArticlesList = ({ articles }: { articles: TArticle[] }) => {
  return (
    <div className="flex max-w-full flex-wrap justify-center gap-5 md:max-w-xl">
      {articles.map((article, i) => (
        <Article imagePriority={i < 5} key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;
