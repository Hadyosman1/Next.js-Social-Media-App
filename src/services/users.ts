import { User } from "@prisma/client";
import API_URL from "./API_URL";
import { TArticle } from "@/types";

type TGetUserInfoReturn = User;

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

export async function getUserArticles(id: number): Promise<TArticle[]> {
  try {
    const res = await fetch(`${API_URL}/users/profile/${id}/user-articles`, {
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

type TUpdateUserProps = {
  id: number;
  userName?: string;
  email?: string;
  isAdmin?: boolean;
  profilePicture?: File | null;
  password?: string;
};

type TUpdateUserReturn =
  | { ok: true; message: string }
  | { ok: false; error: string };

export async function updateUser({
  id,
  email,
  profilePicture,
  isAdmin,
  userName,
  password,
}: TUpdateUserProps): Promise<TUpdateUserReturn> {
  try {
    const formData = new FormData();
    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (userName) formData.append("userName", userName || "");
    if (isAdmin) formData.append("isAdmin", isAdmin.toString() ?? "");
    if (profilePicture) formData.append("profilePicture", profilePicture);

    const res = await fetch(`${API_URL}/users/profile/${id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to update user");
    }

    return {
      ok: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to update user",
    };
  }
}

type TDeleteUserReturn =
  | { ok: true; message: string }
  | { ok: false; error: string };

export async function deleteUser(id: number): Promise<TDeleteUserReturn> {
  try {
    const res = await fetch(`${API_URL}/users/profile/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.message || "Failed to delete user");

    return {
      ok: true,
      message: data.message,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
}
