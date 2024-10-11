import React from "react";
import SearchArticlesInput from "@/components/Articles/SearchArticlesInput";
import { searchInArticles } from "@/services/articles";
import { TArticle } from "@/types";
import Link from "next/link";
import Article from "@/components/Articles/Article";

type TProps = {
  searchParams: {
    searchKey: string;
  };
};

const SearchArticlePage = async ({ searchParams: { searchKey } }: TProps) => {
  const articles: TArticle[] = await searchInArticles(searchKey);

  return (
    <section className="main-props container flex flex-col items-center gap-5 py-8">
      <div className="flex w-full items-center gap-3">
        <h2 className="me-auto w-fit border-b-2 border-b-slate-700 pb-2 text-lg font-bold text-slate-700 md:text-3xl">
          Search
        </h2>

        <Link
          href={"/articles?page=1&limit=10"}
          className="self-start rounded bg-slate-500 px-3 py-1 text-white hover:bg-slate-600"
        >
          ← All articles
        </Link>
      </div>

      <SearchArticlesInput defaultValue={searchKey} />

      {articles.length ? (
        <>
          <h1 className="text-xl text-slate-700">
            <span className="break-all">( {searchKey} )</span> results :{" "}
            {articles.length} Article{articles.length > 1 && "s"}
          </h1>

          <div className="flex w-full max-w-full grow flex-wrap items-start justify-center gap-1.5 md:max-w-xl md:gap-3">
            {articles.map((article, i) => (
              <Article
                imagePriority={i < 4}
                key={article.id}
                article={article}
              />
            ))}
          </div>
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
