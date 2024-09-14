import { useCallback, useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import DeleteItemModal from "../modals/DeleteItemModal";

const DeleteArticleBtn = ({ articleId }: { articleId: number }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onDeleteModalClose = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className={`flex items-center justify-between gap-0.5 rounded-sm bg-red-700/80 px-3 py-1 text-slate-100 transition-all hover:bg-red-800/80`}
      >
        Delete
        <BiTrashAlt />
      </button>

      {isDeleteModalOpen && (
        <DeleteItemModal
          item="article"
          isModalOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          articleId={articleId}
        />
      )}
    </>
  );
};

export default DeleteArticleBtn;
