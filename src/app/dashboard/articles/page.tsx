import Pagination from "@/components/Articles/Pagination";
import ArticlesTable from "@/components/dashboard/ArticlesTable";
import PageTitle from "@/components/dashboard/PageTitle";
import { getArticles, getArticlesCount } from "@/services/articles";
import { TArticle } from "@/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

//icons
import { IoAddCircle } from "react-icons/io5";

type TProps = {
  searchParams: {
    page: string;
    limit: string;
  };
};

const ArticlesPage = async ({ searchParams: { page, limit } }: TProps) => {
  const token = cookies().get("jwt_token")?.value;
  const userFromToken = verifyTokenForPage(token ?? "");

  if (!userFromToken?.isAdmin || !token) return redirect("/");

  const articles: TArticle[] = await getArticles(page, limit);

  const articlesCount: number = await getArticlesCount();

  return (
    <section className="py-7">
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

      <p className="my-3 text-xl font-medium text-slate-600">
        {(parseInt(page) - 1) * parseInt(limit) + 1} to{" "}
        {articles.length + (parseInt(page) - 1) * parseInt(limit)} from (
        {articlesCount} Articles)
      </p>

      <Pagination
        path="/dashboard/articles"
        page={page}
        limit={limit}
        count={articlesCount}
      />
    </section>
  );
};

export default ArticlesPage;
