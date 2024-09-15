import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import DeleteCommentBtn from "./DeleteCommentBtn";

const CommentControls = ({
  setIsEditComment,
  commentId,
}: {
  setIsEditComment: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: number;
}) => {
  return (
    <>
      <div className="flex items-center justify-end gap-2 text-xl md:text-2xl">
        <button onClick={() => setIsEditComment(true)}>
          <FaEdit
            title="Edit"
            className="cursor-pointer text-blue-400 hover:text-blue-600"
          />
        </button>

        <DeleteCommentBtn commentId={commentId}>
          <FaTrash
            title="Delete"
            className="cursor-pointer text-red-400 hover:text-red-500"
          />
        </DeleteCommentBtn>
      </div>
    </>
  );
};

export default CommentControls;
