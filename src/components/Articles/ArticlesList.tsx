import { TArticle } from "@/types";
import Article from "./Article";

const ArticlesList = ({ articles }: { articles: TArticle[] }) => {
  return (
    <div className="flex w-full max-w-full grow flex-wrap items-start justify-center gap-1.5 md:max-w-xl md:gap-3">
      {articles.map((article, i) => (
        <Article imagePriority={i < 4} key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesList;
