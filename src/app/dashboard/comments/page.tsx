import CommentsTable from "@/components/dashboard/comments/CommentsTable";
import PageTitle from "@/components/dashboard/PageTitle";
import { getAllComments } from "@/services/comments";
import { cookies } from "next/headers";

const CommentsPage = async () => {
  const token = cookies().get("jwt_token")?.value;

  const comments = await getAllComments(token ?? "");

  return (
    <section className="py-7">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <PageTitle title={"comments"} />
      </div>

      <CommentsTable comments={comments} />
    </section>
  );
};

export default CommentsPage;
