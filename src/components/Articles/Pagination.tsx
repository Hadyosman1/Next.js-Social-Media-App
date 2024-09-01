import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type TProps = {
  count: number;
  page: string | undefined;
  limit: string | undefined;
};

const Pagination = ({ count, page, limit }: TProps) => {
  const parsedLimit = limit ? parseInt(limit) : 10;
  const pagesCount = Math.ceil(count / parsedLimit);
  const parsedPage = page ? parseInt(page) : 1;

  if (parsedPage > pagesCount) {
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    redirect(`${pathname}?page=${pagesCount}`);
  }

  return (
    <div className="flex items-center justify-center gap-0.5 text-sky-500 *:rounded-sm">
      <Link
        href={`/?page=${parsedPage - 1}`}
        className={`${parsedPage <= 1 && "pointer-events-none cursor-not-allowed opacity-55"} pagination_btn`}
      >
        prev
      </Link>
      {Array.from({ length: pagesCount }).map((el, i) => (
        <Link
          href={`/?page=${i + 1}`}
          className={`pagination_btn ${i + 1 === parsedPage && "active"} `}
          key={i}
        >
          {i + 1}
        </Link>
      ))}
      <Link
        href={`/?page=${parsedPage + 1}`}
        className={`${parsedPage === pagesCount && "pointer-events-none cursor-not-allowed opacity-55"} pagination_btn`}
      >
        next
      </Link>
    </div>
  );
};

export default Pagination;
