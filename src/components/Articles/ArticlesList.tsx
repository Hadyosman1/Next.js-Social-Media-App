import { TArticle } from "@/types";
import Article from "./Article";
import Pagination from "../shared/Pagination";
import { getArticles } from "@/services/articles";

const ArticlesList = async ({
  limit,
  page,
  count,
}: {
  limit: string | undefined;
  count: number;
  page: string | undefined;
}) => {
  const articles: TArticle[] = await getArticles(page, limit);

  return (
    <>
      <div className="flex w-full max-w-full grow flex-wrap items-start justify-center gap-1.5 md:max-w-xl md:gap-3">
        {articles.map((article, i) => (
          <Article imagePriority={i < 4} key={article.id} article={article} />
        ))}
      </div>

      <Pagination
        path="/articles"
        limit={limit}
        page={page}
        count={count}
        CurrentArticlesCount={articles.length}
      />
    </>
  );
};

export default ArticlesList;
