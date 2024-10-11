import Article from "@/components/Articles/Article";
import UserInfo from "@/components/profile/UserInfo";
import { getUserArticles, getUserInfo } from "@/services/users";
import { TArticle } from "@/types";
import { User } from "@prisma/client";
import { Metadata } from "next";

type TProps = {
  params: {
    id: string;
  };
};

const UserProfilePage = async ({ params: { id } }: TProps) => {
  const user: User = await getUserInfo(parseInt(id) ?? 0);
  const userArticles: TArticle[] = await getUserArticles(user.id);

  return (
    <section className="profile_section">
      <div className="main-props container py-8">
        <div className="mx-auto flex flex-col gap-5 md:max-w-xl">
          <UserInfo user={user} />

          <h2 className="rounded-md bg-white p-3 text-xl font-semibold shadow">
            {user.userName}
            {"'s"} Articles
          </h2>

          {userArticles.length ? (
            <div className="flex w-full max-w-full grow flex-wrap items-start justify-center gap-1.5 md:max-w-xl md:gap-3">
              {userArticles.map((article, i) => (
                <Article
                  imagePriority={i < 4}
                  key={article.id}
                  article={article}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">No articles yet..</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;

export const metadata: Metadata = {
  title: "User Profile |",
  description: "User Profile",
};
