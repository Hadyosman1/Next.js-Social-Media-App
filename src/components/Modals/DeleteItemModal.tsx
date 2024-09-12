"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalWrapper from "./ModalWrapper";
import SmallLoadingIndicator from "../shared/SmallLoadingIndicator";
import { toast } from "react-toastify";
import { deleteComment } from "@/services/comments";
import { deleteArticle } from "@/services/articles";
import { deleteUser } from "@/services/users";

type TProps = {
  commentId?: number;
  articleId?: number;
  userId?: number;
  onClose: () => void;
  isModalOpen: boolean;
  item: "comment" | "article" | "account";
};

const DeleteItemModal = ({
  commentId,
  item,
  userId,
  isModalOpen,
  articleId,
  onClose,
}: TProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const deleteFn =
    item === "comment"
      ? deleteComment
      : item === "article"
        ? deleteArticle
        : deleteUser;

  const itemId =
    item === "comment" ? commentId : item === "article" ? articleId : userId;

  const handleDeleteItem = async () => {
    setIsLoading(true);
    const res = await deleteFn(itemId ?? 0);
    setIsLoading(false);

    if (!res.ok) return toast.error(res.error);

    toast.success(res.message);
    onClose();
    router.refresh();
  };

  return (
    <ModalWrapper
      className="shadow shadow-blue-500"
      title={`Delete ${item}`}
      size="sm"
      bg="white"
      onClose={onClose}
      isOpen={isModalOpen}
    >
      <div className="px-3 py-2">
        <p className="py-4 text-slate-600">
          Are you sure you want to delete this {item}?
        </p>

        <div className="flex justify-end gap-2 border-t-2 border-slate-300 py-3">
          <button
            onClick={onClose}
            className="rounded bg-slate-400 px-3 py-1.5 text-sm text-white hover:bg-slate-500"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={handleDeleteItem}
            className="flex items-center justify-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
          >
            {isLoading && <SmallLoadingIndicator size="sm" />} Delete
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteItemModal;
