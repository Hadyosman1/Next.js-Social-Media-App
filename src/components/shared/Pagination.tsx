import Link from "next/link";
import { redirect } from "next/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";

type TProps = {
  count: number;
  page: string | undefined;
  limit: string | undefined;
  path: string;
};

const Pagination = ({ count, page, limit, path }: TProps) => {
  const limitNumber = limit ? parseInt(limit) : 10;
  const pagesCount = Math.ceil(count / limitNumber);
  const pageNumber = page ? parseInt(page) : 1;
  const prevPage = pageNumber - 1;
  const nextPage = pageNumber + 1;
  const pagesArr = Array.from({ length: pagesCount }).map((el, i) => i + 1);
  // const activePageIdx = pagesArr.indexOf(pageNumber);

  // const slicedPagesArr =
  //   pagesArr.length < 6
  //     ? pagesArr
  //     : pagesArr.slice(
  //         activePageIdx - 2 < 0 ? 0 : activePageIdx - 2,
  //         activePageIdx + 3,
  //       );

  if (pageNumber > pagesCount || pageNumber < 1) {
    return redirect(`${path}?page=1&limit=10`);
  }

  return (
    <div className="mx-auto flex justify-center gap-0.5 text-sky-500 *:rounded-sm">
      <Link
        href={`${path}?page=${prevPage}&limit=${limitNumber}`}
        className={`${pageNumber <= 1 && "pointer-events-none cursor-no-drop opacity-55"} pagination_btn flex items-center`}
      >
        <GrPrevious />
      </Link>

      {pagesArr.map((el) => (
        <Link
          href={`${path}?page=${el}&limit=${limitNumber}`}
          className={`pagination_btn ${el === pageNumber && "active"} `}
          key={el}
        >
          {el}
        </Link>
      ))}

      {/* {pagesArr.length > 6 &&
        activePageIdx + 1 !== pagesArr[pagesArr.length - 1] && (
          <>
            <span className="pagination_btn flex cursor-default items-center opacity-70 hover:bg-slate-200 hover:text-sky-500">
              ...
            </span>
            <Link
              href={`${path}?page=${pagesArr[pagesArr.length - 1]}&limit=${limitNumber}`}
              className={`pagination_btn ${pagesArr[pagesArr.length - 1] === pageNumber && "active"} `}
              key={pagesArr[pagesArr.length - 1]}
            >
              {pagesArr[pagesArr.length - 1]}
            </Link>
          </>
        )} */}

      <Link
        href={`${path}?page=${nextPage}&limit=${limitNumber}`}
        className={`${pageNumber === pagesCount && "pointer-events-none cursor-no-drop opacity-55"} pagination_btn flex items-center`}
      >
        <GrNext />
      </Link>
    </div>
  );
};

export default Pagination;
