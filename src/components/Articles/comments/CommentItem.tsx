import Image from "next/image";
import anonymousUser from "@/../../public/anonymous_user.svg";
import getTimeAgo from "@/utils/getTimeAgo";
import useTextDirByLine from "@/hooks/useTextDirByLine";
import { TComment } from "@/types";


import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

type TProps = {
  comment: TComment & {
    user: {
      profilePicture: string | null;
      userName: string;
    };
  };
};

const CommentItem = ({ comment }: TProps) => {
  const commentCreatedAt = getTimeAgo(comment.createdAt);
  const commentContent = useTextDirByLine(comment.content);

  return (
    <div className="comment_wrapper mt-1 flex items-start gap-0.5 p-1 md:gap-2 md:p-2">
      <div className="flex-shrink-0">
        <Image
          src={comment.user.profilePicture ?? anonymousUser}
          alt={"user"}
          width={64}
          height={64}
          className="h-12 w-12 rounded-full bg-slate-200 object-cover md:h-16 md:w-16"
          loading="lazy"
        />
      </div>

      <div className="z-10 grow rounded border border-gray-200 bg-gray-100 p-2 md:p-3">
        <div className="mb-1.5 flex items-center justify-between">
          <b className="text-sm md:text-base">{comment.user.userName}</b>
          <span className="rounded bg-slate-200 px-1 text-sm text-slate-700">
            {commentCreatedAt}
          </span>
        </div>

        <div className="mb-3 text-sm font-normal text-gray-600 md:text-base">
          {commentContent}
        </div>

        <div className="flex items-center justify-end gap-3 text-xl md:text-2xl">
          <FaRegEdit className="cursor-pointer text-blue-400 hover:text-blue-600" />
          <FaRegTrashAlt className="cursor-pointer text-red-500 hover:text-red-600" />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
