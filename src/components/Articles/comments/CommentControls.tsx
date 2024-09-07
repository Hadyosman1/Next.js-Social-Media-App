import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const CommentControls = () => {
  return (
    <div className="flex items-center justify-end gap-2 text-xl md:text-2xl">
      <FaEdit className="cursor-pointer text-blue-400 hover:text-blue-600" />
      <FaTrash className="cursor-pointer text-red-400 hover:text-red-500" />
    </div>
  );
};

export default CommentControls;
