"use client";
import CommentItem from "./CommentItem";
import { TArticle } from "@/types";
import { useState } from "react";

// icons
import { FaComments } from "react-icons/fa6";

type TProps = {
  comments: TArticle["comments"];
};

const Comments = ({ comments }: TProps) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  return (
    <div>
      <h5
        className={`${!isCommentsVisible ? "border-b-0 pt-3" : "border-y-2 py-3"} mt-2 border border-x-0 text-slate-600`}
      >
        <button
          onClick={() => setIsCommentsVisible((prev) => !prev)}
          className="flex items-center gap-1 rounded bg-slate-200 px-4 py-1 underline-offset-2 hover:underline"
        >
          {comments.length} Comments
          <FaComments />
        </button>
      </h5>
      <div
        className={`${!isCommentsVisible ? "h-0 scale-y-0" : "transition"} flex flex-col`}
      >
        {comments.length === 0 ? (
          <p className="text-center text-slate-600 pt-3">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
