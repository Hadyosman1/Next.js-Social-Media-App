"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";

const AddCommentsForm = () => {
  const [comment, setComment] = useState("");
  const toastId: any = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (comment === "" && !toast.isActive(toastId.current)) {
      toastId.current = toast.error("Comment should be at least one digit..!");
      return;
    }

    console.log(comment);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full gap-2 rounded border border-sky-400"
      >
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Add a comment"
          className="flex-grow rounded px-3 py-1 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded border border-gray-200 bg-sky-400 px-4 py-1 text-center text-white hover:bg-sky-500 focus:outline-white"
        >
          Comment
        </button>
      </form>
    </>
  );
};

export default AddCommentsForm;
