import Article from "@/components/Articles/Article";
import { TArticle } from "@/types";

const ArticlesPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch articles..!");
  const articles: TArticle[] = await res.json();

  const articlesList = articles.map((article) => (
    <Article key={article.id} {...article} />
  ));

  return (
    <div className="main-props container flex flex-col items-center gap-4">
      {articlesList}
    </div>
  );
};

export default ArticlesPage;
