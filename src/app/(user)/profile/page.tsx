import { verifyTokenForPage } from "@/utils/verifyToken";
import Image from "next/image";
import anonymousUserPicture from "@/../../public/anonymous_user.svg";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/services/users";

async function ProfilePage() {
  const token = cookies().get("jwt_token")?.value;
  const userFromToken = verifyTokenForPage(token ?? "");
  if (!userFromToken) return redirect("/");

  const user = await getUserInfo(userFromToken?.id ?? 0);

  return (
    <div className="main-props container py-8">
      <div className="rounded bg-white p-4 shadow-md md:p-6 lg:p-8">
        <div className="flex flex-col items-center">
          <div className="relative aspect-video max-h-64 w-full">
            <Image
              src={user.profilePicture ?? anonymousUserPicture}
              alt={user.userName}
              width={1000}
              height={500}
              priority
              className=""
            />
          </div>
          <h2 className="text-lg font-bold text-slate-800">{user.userName}</h2>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-slate-800">
            Profile Information
          </h3>
          <div className="mt-4 flex flex-col">
            <div className="flex justify-between border-b border-slate-200 py-2">
              <span className="text-sm text-slate-500">Role:</span>
              {/* <span className="text-sm text-slate-800">{profile.role}</span> */}
            </div>
            <div className="flex justify-between border-b border-slate-200 py-2">
              <span className="text-sm text-slate-500">Created At:</span>
              {/* <span className="text-sm text-slate-800">{profile.createdAt}</span> */}
            </div>
          </div>
        </div>

        <button className="mt-6 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
export default ProfilePage;
