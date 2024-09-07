import { Article, User } from "@prisma/client";
import API_URL from "./API_URL";

type TGetUserInfoReturn = User & {
  articles: Article & { comments: Comment[] }[];
};

export async function getUserInfo(id: number): Promise<TGetUserInfoReturn> {
  try {
    const res = await fetch(`${API_URL}/users/profile/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch user info");
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch user info",
    );
  }
}
