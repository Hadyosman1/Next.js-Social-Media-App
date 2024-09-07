import DeleteItemModal from "@/components/Modals/DeleteItemModal";
import { useCallback, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const CommentControls = ({
  setIsEditComment,
  commentId,
}: {
  setIsEditComment: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className="flex items-center justify-end gap-2 text-xl md:text-2xl">
        <FaEdit
          onClick={() => setIsEditComment(true)}
          title="Edit"
          className="cursor-pointer text-blue-400 hover:text-blue-600"
        />

        <FaTrash
          onClick={() => setIsModalOpen(true)}
          title="Delete"
          className="cursor-pointer text-red-400 hover:text-red-500"
        />
      </div>

      {isModalOpen && (
        <DeleteItemModal
          item="comment"
          isModalOpen={isModalOpen}
          onClose={onClose}
          commentId={commentId}
        />
      )}
    </>
  );
};

export default CommentControls;
