"use client";
import CommentItem from "./CommentItem";
import { TArticle, TypeJWTPayload } from "@/types";
import { useState } from "react";

// icons
import { FaComments } from "react-icons/fa6";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";

type TProps = {
  comments: TArticle["comments"];
  user: TypeJWTPayload | null;
};

const Comments = ({ comments, user }: TProps) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(
    comments.length >= 1,
  );
  const [isAllCommentsVisible, setIsAllCommentsVisible] = useState(false);
  let shownComments = comments.length === 1 ? comments : comments.slice(0, 1);
  if (isAllCommentsVisible) shownComments = comments;

  return (
    <div>
      <h5 className={`mt-2 border border-x-0 border-y-2 py-2 text-slate-600`}>
        <button
          onClick={() => setIsCommentsVisible((prev) => !prev)}
          className="flex items-center gap-1 rounded bg-slate-200 px-4 py-1 underline-offset-2 hover:underline"
        >
          {comments.length} Comments
          <FaComments />
        </button>
      </h5>

      {comments.length === 0 && isCommentsVisible && (
        <p className="pt-3 text-center text-slate-600">No comments yet.</p>
      )}

      {comments.length > 2 && isCommentsVisible && (
        <button
          onClick={() => setIsAllCommentsVisible((prev) => !prev)}
          className="mt-2 flex items-center gap-1 self-start rounded bg-slate-200 px-4 py-1 text-sm underline-offset-2 hover:underline"
        >
          {isAllCommentsVisible ? (
            <>
              Expand comments
              <MdExpandLess className="text-xl" />
            </>
          ) : (
            <>
              Show all comments
              <MdExpandMore className="text-xl" />
            </>
          )}
        </button>
      )}

      <div className={`flex flex-col transition`}>
        {isCommentsVisible &&
          shownComments.map((comment) => (
            <CommentItem user={user} key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default Comments;
