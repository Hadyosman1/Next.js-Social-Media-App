"use client";

import SmallLoadingIndicator from "@/components/shared/SmallLoadingIndicator";
import { createComment, updateComment } from "@/services/comments";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type TProps = {
  status: "create" | "update";
  articleId?: number;
  prevValue?: string;
  commentId?: number;
  onCancelEdit?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentForm = ({
  articleId,
  status,
  prevValue,
  commentId,
  onCancelEdit,
}: TProps) => {
  const [comment, setComment] = useState(prevValue ? prevValue : "");
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitBtnDisabled = !comment.length || isLoading;
  const router = useRouter();

  if (status === "update" && !comment.length && onCancelEdit) {
    onCancelEdit(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim().length < 2) {
      return toast.error("Comment must be at least 2 digits");
    }

    setIsLoading(true);

    let res;
    if (status === "create") {
      res = await createComment({
        content: comment,
        articleId: articleId ?? 0,
      });
    } else {
      if (prevValue?.trim() === comment.trim() && onCancelEdit) {
        toast.error("can't update comment with same content", {
          position: "bottom-center",
        });
        return onCancelEdit(false);
      }
      res = await updateComment({ content: comment, id: commentId ?? 0 });
    }

    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(res.message);
    setComment("");
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="add_comment_form">
        <textarea
          dir="auto"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value.trimStart());
          }}
          placeholder="Add a comment"
          className={` ${comment.trim().length ? "active min-h-20" : "h-9 max-h-9 min-h-9 w-4 overflow-hidden"} `}
        />

        {onCancelEdit && (
          <button
            onClick={() => onCancelEdit(false)}
            type="button"
            className="flex items-center justify-center gap-2 rounded bg-slate-600 px-3 py-1 capitalize text-white hover:bg-slate-700"
          >
            cancel
          </button>
        )}

        <button
          disabled={isSubmitBtnDisabled}
          type="submit"
          className="submit_btn flex items-center justify-center gap-2 capitalize"
        >
          {isLoading && <SmallLoadingIndicator size="sm" />}
          {status === "create" ? "Comment" : "Edit"}
        </button>
      </form>
    </>
  );
};

export default CommentForm;
