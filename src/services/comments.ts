import { TComment } from "@/types";
import API_URL from "./API_URL";

type TCreateCommentPayLoad = {
  content: string;
  articleId: number;
};

type TCreateCommentResponse = TComment & {
  message: string;
  ok: true;
};

export async function createComment(
  comment: TCreateCommentPayLoad,
): Promise<TCreateCommentResponse | { ok: false; error: string }> {
  try {
    const res = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    const data = await res.json();

    if (!res.ok) return { error: data.message, ok: false };

    return {
      ...data,
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to create comment",
    };
  }
}

