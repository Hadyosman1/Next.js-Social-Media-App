import Link from "next/link";
import { redirect } from "next/navigation";

type TProps = {
  count: number;
  page: string | undefined;
  limit: string | undefined;
  path: string;
};

const Pagination = ({ count, page, limit, path }: TProps) => {
  const parsedLimit = limit ? parseInt(limit) : 10;
  const pagesCount = Math.ceil(count / parsedLimit);
  const parsedPage = page ? parseInt(page) : 1;
  const prevPage = parsedPage - 1;
  const nextPage = parsedPage + 1;
  const pagesArr = Array.from({ length: pagesCount }).map((el, i) => i + 1);
  const slicedPagesArr =
    pagesArr.length < 4 ? pagesArr : pagesArr.slice(parsedPage, parsedPage + 4);

  if (parsedPage > pagesCount) {
    redirect(`${path}?page=${pagesCount}`);
  }

  return (
    <div className="flex items-center justify-center gap-0.5 text-sky-500 *:rounded-sm">
      <Link
        href={`${path}?page=${prevPage}`}
        className={`${parsedPage <= 1 && "cursor-no-drop opacity-55"} pagination_btn`}
      >
        prev
      </Link>
      {slicedPagesArr.map((el) => (
        <Link
          href={`${path}?page=${el}`}
          className={`pagination_btn ${el === parsedPage && "active"} `}
          key={el}
        >
          {el}
        </Link>
      ))}
      <Link
        href={`${path}?page=${nextPage}`}
        className={`${parsedPage === pagesCount && "cursor-no-drop opacity-55"} pagination_btn`}
      >
        next
      </Link>
    </div>
  );
};

export default Pagination;
