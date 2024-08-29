import CommentItem from "./CommentItem";

import { FaComments } from "react-icons/fa6";

const Comments = () => {
  return (
    <div>
      <h5 className="mb-3 flex items-center gap-2 text-slate-700">
        Comments
        <FaComments />
      </h5>
      <CommentItem />
    </div>
  );
};

export default Comments;
