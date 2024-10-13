"use client";

import { useMemo, useTransition } from "react";
import { redirect, useRouter } from "next/navigation";
import SmallSpinner from "../loadingIndicators/smallSpinner/SmallSpinner";

import { GrNext, GrPrevious } from "react-icons/gr";

type TProps = {
  count: number;
  page: string | undefined;
  limit: string | undefined;
  path: string;
  CurrentArticlesCount: number;
};

const Pagination = ({
  count,
  page: p,
  limit: l,
  path,
  CurrentArticlesCount,
}: TProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const limit = l ? parseInt(l) : 10;
  const page = p ? parseInt(p) : 1;

  const pagesCount = Math.ceil(count / limit);

  const prevPage = page - 1;
  const nextPage = page + 1;
  const pages = useMemo(() => {
    let pagesArr = Array.from({ length: pagesCount }).map((_, i) => i + 1);
    if (pagesArr.length <= 5) return pagesArr;

    if (page <= 4) {
      return [...pagesArr.slice(0, 5), "...", pagesArr.length];
    }

    if (page >= pagesCount - 3) {
      return [pagesArr.at(0), "...", ...pagesArr.slice(page - 4)];
    }

    return [
      pagesArr.at(0),
      "...",
      ...pagesArr.slice(page - 3, page + 2),
      "...",
      pagesArr.at(-1),
    ];
  }, [pagesCount, page]);

  const start = (page - 1) * limit + 1;
  const end = start + CurrentArticlesCount - 1;

  if (page > pagesCount || page < 1) {
    return redirect(`${path}?page=1&limit=10`);
  }

  function handleNavigate(href: string) {
    startTransition(() => {
      router.replace(href);
    });
  }

  return (
    <>
      {isPending && (
        <div className="flex flex-col items-center gap-2">
          <SmallSpinner />
          <span className="animate-pulse">Loading...</span>
        </div>
      )}

      <p className="my-1 text-sm font-medium text-slate-600 md:text-xl">
        {start} to {end} of ({count} Articles)
      </p>

      <div className="mx-auto flex flex-wrap justify-center gap-[0.75px] text-sky-500 *:rounded-sm">
        <button
          disabled={page <= 1}
          onClick={() =>
            handleNavigate(`${path}?page=${prevPage}&limit=${limit}`)
          }
          className={`${page <= 1 && "cursor-no-drop opacity-55"} pagination_btn me-1.5 flex items-center rounded-lg`}
        >
          <span className="sr-only">Previous</span>
          <GrPrevious />
        </button>

        {pages.map((el) => (
          <button
            disabled={el === "..."}
            key={el}
            className={`pagination_btn ${el === page ? "active" : ""} ${el === "..." ? "cursor-no-drop opacity-55" : ""} `}
            onClick={() => {
              handleNavigate(`${path}?page=${el}&limit=${limit}`);
            }}
          >
            {el}
          </button>
        ))}

        <button
          disabled={page === pagesCount}
          onClick={() =>
            handleNavigate(`${path}?page=${nextPage}&limit=${limit}`)
          }
          className={`${page === pagesCount && "cursor-no-drop opacity-55"} pagination_btn ms-1.5 flex items-center rounded-lg`}
        >
          <span className="sr-only">Next</span>
          <GrNext />
        </button>
      </div>
    </>
  );
};

export default Pagination;
