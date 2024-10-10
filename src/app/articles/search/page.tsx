import React from "react";
import ArticlesList from "@/components/Articles/ArticlesList";
import SearchArticlesInput from "@/components/Articles/SearchArticlesInput";
import { searchInArticles } from "@/services/articles";
import { TArticle } from "@/types";
import Link from "next/link";

type TProps = {
  searchParams: {
    searchKey: string;
  };
};

const SearchArticlePage = async ({ searchParams: { searchKey } }: TProps) => {
  const articles: TArticle[] = await searchInArticles(searchKey);

  return (
    <section className="main-props container flex flex-col items-center gap-5 py-8">
      <Link
        href={"/articles?page=1&limit=10"}
        className="self-start rounded bg-slate-500 px-3 py-1 text-white hover:bg-slate-600"
      >
        ← All articles
      </Link>

      <SearchArticlesInput defaultValue={searchKey} />

      {articles.length ? (
        <>
          <h1 className="text-xl text-slate-700">
            <span className="break-all">( {searchKey} )</span> results :{" "}
            {articles.length} Article{articles.length>1&&"s"}
          </h1>

          <ArticlesList articles={articles} />
        </>
      ) : (
        <p className="text-lg text-slate-600 underline decoration-wavy underline-offset-2">
          No results matches :
          <span className="break-all text-red-400 decoration-red-400">
            {" "}
            {searchKey}
          </span>
        </p>
      )}
    </section>
  );
};

export default SearchArticlePage;
