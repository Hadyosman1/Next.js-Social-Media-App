import { verifyTokenForPage } from "@/utils/verifyToken";

import { cookies } from "next/headers";
import { getUserArticles, getUserInfo } from "@/services/users";
import UserInfo from "@/components/profile/UserInfo";
import ArticlesList from "@/components/Articles/ArticlesList";
import { User } from "@prisma/client";
import { TArticle } from "@/types";
import { Metadata } from "next";

async function ProfilePage() {
  const token = cookies().get("jwt_token")?.value;
  const userFromToken = verifyTokenForPage(token ?? "");
  const user: User = await getUserInfo(userFromToken?.id ?? 0);
  const userArticles: TArticle[] = await getUserArticles(user.id);

  return (
    <section className="profile_section">
      <div className="main-props container py-8">
        <div className="mx-auto flex flex-col gap-5 md:max-w-xl">
          <UserInfo user={user} />

          <h2 className="rounded-md bg-white p-3 text-xl font-semibold shadow">
            Your Articles
          </h2>

          {userArticles.length ? (
            <ArticlesList articles={userArticles} />
          ) : (
            <p className="text-center">No articles yet..</p>
          )}
        </div>
      </div>
    </section>
  );
}
export default ProfilePage;

export const metadata: Metadata = {
  title: "Profile",
  description: "Your Profile",
};

