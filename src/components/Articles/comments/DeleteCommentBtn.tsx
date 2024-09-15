"use client";

import DeleteItemModal from "@/components/modals/DeleteItemModal";
import { useCallback, useState } from "react";

type TProps = {
  commentId: number;
  children: React.ReactNode;
};

const DeleteCommentBtn = ({ commentId, children }: TProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>{children}</button>

      <DeleteItemModal
        item="comment"
        isModalOpen={isModalOpen}
        onClose={onClose}
        commentId={commentId}
      />
    </>
  );
};

export default DeleteCommentBtn;
