import DeleteCommentBtn from "@/components/Articles/comments/DeleteCommentBtn";
import { Comment } from "@prisma/client";
import CommentContent from "./CommentContent";

import { FaTrash } from "react-icons/fa6";

const CommentsTable = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden bg-white">
            <table className="min-w-full text-center align-middle text-sm font-light">
              <thead className="border-b border-neutral-200 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-2">
                    Comment
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Created At
                  </th>

                  <th scope="col" className="px-6 py-2">
                    Controls
                  </th>
                </tr>
              </thead>

              <tbody>
                {comments.map((comment) => (
                  <tr
                    key={comment.id}
                    className="border-b border-neutral-200 font-medium"
                  >
                    <td className="px-6 py-4">
                      <div dir="auto" className="max-w-[350px] mx-auto text-start bg-slate-100 rounded py-1 px-2">
                        <CommentContent str={comment.content} />
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(comment.createdAt).toDateString()}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="mx-auto flex max-w-20 flex-col justify-center gap-2 bg-slate-50">
                        <DeleteCommentBtn commentId={comment.id}>
                          <span className="flex items-center justify-center gap-1 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">
                            <FaTrash /> Delete
                          </span>
                        </DeleteCommentBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

              {comments.length === 0 && (
                <tfoot>
                  <tr>
                    <td className="py-2 font-semibold" colSpan={8}>
                      There is no comments yet...
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsTable;
