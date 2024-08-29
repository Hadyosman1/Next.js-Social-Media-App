import { FaEdit, FaTrash } from "react-icons/fa";

const CommentItem = () => {
  return (
    <div className="mb-5 rounded border border-gray-300 bg-gray-200 p-3">
      <div className="mb-3 flex items-center justify-between">
        <b className="uppercase">Hady Osman</b>
        <span className="text-yellow-600">12/2/2024</span>
      </div>

      <div className="mb-3 font-semibold text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima optio,
        consectetur doloribus, cumque sunt veniam nemo, adipisci odit aliquid
        excepturi repellendus vel. Nemo distinctio possimus doloremque dolorem
        alias commodi! A?
      </div>

      <div className="flex items-center justify-end gap-3 text-2xl">
        <FaEdit className="cursor-pointer text-blue-400 hover:text-blue-600" />
        <FaTrash className="cursor-pointer text-red-500 hover:text-red-600" />
      </div>
    </div>
  );
};

export default CommentItem;
