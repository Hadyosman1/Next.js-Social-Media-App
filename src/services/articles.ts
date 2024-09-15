import { TArticle } from "@/types";
import API_URL from "./API_URL";

// Get Articles
export async function getArticles(
  pageNumber?: string | undefined,
  limit?: string | undefined,
): Promise<TArticle[]> {
  try {
    const res = await fetch(
      `${API_URL}/articles?page=${pageNumber && +pageNumber > 0 ? pageNumber : 1}&limit=${limit ? limit : 10}`,
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
    const res = await fetch(`${API_URL}/articles/count`, {
      cache: "no-store",
    });

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

type TCreateArticleReturn =
  | { ok: true; message: string }
  | { ok: false; error: string };

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

    return { ok: true, message: "Article created successfully" };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to create article",
    };
  }
}

type TDeleteArticleReturn =
  | { ok: true; message: string }
  | { ok: false; error: string };
export async function deleteArticle(id: number): Promise<TDeleteArticleReturn> {
  try {
    const res = await fetch(`${API_URL}/articles/${id}`, { method: "DELETE" });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return { ok: true, message: data.message };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to delete article",
    };
  }
}

type TUpdateArticleProps = {
  id: number;
  title: string;
  description: string;
  image?: File | null;
};

type TUpdateArticleReturn =
  | { ok: true; message: string }
  | { ok: false; error: string };

export async function updateArticle({
  id,
  title,
  description,
  image,
}: TUpdateArticleProps): Promise<TUpdateArticleReturn> {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const res = await fetch(`${API_URL}/articles/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return { ok: true, message: "Article updated successfully" };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to update article",
    };
  }
}
