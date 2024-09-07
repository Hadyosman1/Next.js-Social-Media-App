import { verifyTokenForPage } from "@/utils/verifyToken";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function ProfilePage() {
  const token = cookies().get("jwt_token")?.value;
  const user = verifyTokenForPage(token ?? "");

  if (!user) return redirect("/");

  return <div className="container mx-auto px-4 py-8">{user?.userName}</div>;
}
export default ProfilePage;
