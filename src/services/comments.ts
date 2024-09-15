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

type TUpdateCommentProps = {
  id: number;
  content: string;
};

type TUpdateCommentReturn =
  | { ok: false; error: string }
  | { ok: true; message: string };

export async function updateComment({
  id,
  content,
}: TUpdateCommentProps): Promise<TUpdateCommentReturn> {
  try {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to update comment",
    };
  }
}

type TDeleteCommentReturn =
  | { ok: false; error: string }
  | { ok: true; message: string };

export async function deleteComment(id: number): Promise<TDeleteCommentReturn> {
  try {
    const res = await fetch(`${API_URL}/comments/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Failed to delete comment",
    };
  }
}

export async function getAllComments(token: string): Promise<TComment[]> {
  try {
    const res = await fetch(`${API_URL}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get comments",
    );
  }
}
