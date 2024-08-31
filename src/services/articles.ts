import { TArticle } from "@/types";
import API_URL from "./API_URL";

// Get Articles
export async function getArticles(
  pageNumber: string | undefined,
  limit: string | undefined,
): Promise<TArticle[]> {
  try {
    const res = await fetch(
      `${API_URL}/articles?page=${pageNumber ? pageNumber : 1}&limit=${limit ? limit : 10}`,
      {
        cache: "no-store",
        next: { revalidate: 60 },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch articles");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getArticlesCount(): Promise<number> {
  try {
    const res = await fetch(`${API_URL}/articles/count`);
    if (!res.ok) throw new Error("Failed to fetch articles count");
    const { articlesCount } = await res.json();
    return articlesCount;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get articles count");
  }
}
