"use client";

import { FaTrash } from "react-icons/fa6";
import DeleteItemModal from "../Modals/DeleteItemModal";
import { useCallback, useState } from "react";

const DeleteUserBtn = ({ id }: { id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-1 rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 focus:outline-none"
      >
        <FaTrash /> Delete
      </button>

      <DeleteItemModal
        userId={id}
        item="account"
        onClose={onClose}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default DeleteUserBtn;
