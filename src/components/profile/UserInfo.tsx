import Image from "next/image";
import anonymousUserPicture from "@/../../public/anonymous_user.svg";
import { User } from "@prisma/client";
import ChangeProfilePictureBtn from "./ChangeProfilePictureBtn";

import EditUserBtn from "./EditUserBtn";
import DeleteUserBtn from "./DeleteUserBtn";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

type TProps = {
  user: User;
};

const UserInfo = ({ user }: TProps) => {
  const { profilePicture, userName, email, createdAt, id } = user;

  const token = cookies().get("jwt_token")?.value;
  const userFromToken = verifyTokenForPage(token || "");

  const isControlItemShown = user.id === userFromToken?.id;

  return (
    <div className="rounded-md bg-gray-100 px-3 py-6 shadow-md">
      <div className="flex flex-col items-center gap-5">
        {isControlItemShown && (
          <div className="flex w-full items-center justify-end gap-1">
            <DeleteUserBtn id={id} />

            <EditUserBtn user={user} />
          </div>
        )}

        <div className="relative">
          <Image
            src={profilePicture ?? anonymousUserPicture}
            alt={userName}
            unoptimized
            width={280}
            height={280}
            className="aspect-square w-[270px] rounded-full border-2 border-slate-200 object-cover object-top shadow sm:w-[280px]"
          />

          {isControlItemShown && <ChangeProfilePictureBtn id={id} />}
        </div>

        <div className="flex grow flex-col items-center justify-center gap-3 px-3">
          <h1 className="text-2xl font-bold">{userName}</h1>
          <p className="text-base text-gray-500">{email}</p>
          <p className="text-base text-gray-500">
            Joining Date :{" "}
            {new Date(createdAt)
              .toISOString()
              .split("T")[0]
              .replaceAll(/-/g, "/")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
