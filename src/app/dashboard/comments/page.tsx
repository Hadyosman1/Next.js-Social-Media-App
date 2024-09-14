import PageTitle from "@/components/dashboard/PageTitle";
import Link from "next/link";

import { IoAddCircle } from "react-icons/io5";

const CommentsPage = () => {
  return (
    <section className="py-7">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <PageTitle title={"comments"} />

        <Link
          className="ms-auto flex items-center justify-center gap-1 rounded bg-blue-500 px-2 py-1 text-center text-sm text-white hover:bg-blue-600 md:text-base"
          href="/dashboard/comments/add-article"
        >
          <IoAddCircle /> Add Comment
        </Link>
      </div>
    </section>
  );
};

export default CommentsPage;
