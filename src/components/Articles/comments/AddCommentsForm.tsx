"use client";

import SmallLoadingIndicator from "@/components/shared/SmallLoadingIndicator";
import { createComment } from "@/services/comments";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AddCommentsForm = ({ articleId }: { articleId: number }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitBtnDisabled = !comment.length || isLoading;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim().length < 2) {
      return toast.error("Comment must be at least 2 digits");
    }

    setIsLoading(true);
    const res = await createComment({ content: comment, articleId });
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(res.message);
    router.refresh();
    setComment("");
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
          className={` ${comment.trim().length ? "active min-h-20" : "h-9 max-h-9 min-h-9 w-5 overflow-hidden"} `}
        />
        <button
          disabled={isSubmitBtnDisabled}
          type="submit"
          className="submit_btn flex items-center justify-center gap-2"
        >
          {isLoading && <SmallLoadingIndicator size="sm" />} Comment
        </button>
      </form>
    </>
  );
};

export default AddCommentsForm;
