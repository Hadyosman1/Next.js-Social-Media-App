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
      },
    );

    if (!res.ok) throw new Error("Failed to fetch articles");

    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch articles");
  }
}

// Get Articles Count
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

// Create Article
type TCreateArticleProps = {
  title: string;
  description: string;
  image?: File | null;
};

type TCreateArticleReturn = { ok: true } | { ok: false; error: string };

export async function createArticle({
  title,
  description,
  image,
}: TCreateArticleProps): Promise<TCreateArticleReturn> {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const res = await fetch(`${API_URL}/articles`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw data.message;

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to create article",
    };
  }
}
