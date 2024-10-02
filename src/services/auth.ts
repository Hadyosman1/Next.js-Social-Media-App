import { ILogInUserDto } from "@/types/dtos";
import API_URL from "./API_URL";
import { User } from "@prisma/client";

type TRegisterData = {
  userName: string;
  email: string;
  password: string;
  profilePicture?: File | null;
  isAdmin?: boolean;
};

type TRegisterReturn = (User & { ok: true }) | { error: string; ok: false };

export async function userRegister(
  data: TRegisterData,
): Promise<TRegisterReturn> {
  try {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("profilePicture", data.profilePicture ?? "");
    formData.append("isAdmin", data?.isAdmin?.toString() ?? "false");

    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      body: formData,
    });

    const dataFromRes = await res.json();

    if (!res.ok) throw new Error(dataFromRes.message);

    return {
      ...dataFromRes,
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

type TLoginReturn =
  | {
      user: User;
      message: string;
      ok: true;
    }
  | { error: string; ok: false };

export async function userLogin(data: ILogInUserDto): Promise<TLoginReturn> {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataFromRes = await res.json();

    if (!res.ok) throw new Error(dataFromRes.message);

    return {
      ...dataFromRes,
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

type TUserLogOutReturn =
  | { message: string; ok: true }
  | { error: string; ok: false };

export async function userLogOut(): Promise<TUserLogOutReturn> {
  try {
    const res = await fetch(`${API_URL}/users/logout`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return {
      message: data.message,
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
