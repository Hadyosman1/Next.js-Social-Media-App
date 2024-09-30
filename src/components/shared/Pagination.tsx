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

  if (pageNumber > pagesCount || pageNumber < 1) {
    return redirect(`${path}?page=1&limit=10`);
  }

  return (
    <div className="mx-auto flex flex-wrap justify-center gap-[1px] text-sky-500 *:rounded-sm">
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
