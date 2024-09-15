import { TypeJWTPayload } from "@/types";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(req: NextRequest): TypeJWTPayload | null {
  try {
    const token = req.cookies.get("jwt_token")?.value;

    if (!token) return null;

    return jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY as string,
    ) as TypeJWTPayload;
  } catch (error) {
    console.error("Error verifying token: ", error);
    return null;
  }
}

export function verifyTokenForPage(token: string): TypeJWTPayload | null {
  if (!token) return null;

  const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);

  if (!user) return null;

  return user as TypeJWTPayload;
}
