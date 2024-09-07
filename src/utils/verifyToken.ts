import { TypeJWTPayload } from "@/types";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(req: NextRequest): TypeJWTPayload | null {
  try {
    const jwtToken = req.cookies.get("jwt_token");
    const token = jwtToken?.value as string;
    if (!token) return null;

    const userFromToken = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY as string,
    ) as TypeJWTPayload;

    return userFromToken;
  } catch (error) {
    return null;
  }
}

export function verifyTokenForPage(token: string): TypeJWTPayload | null {
  if (!token) return null;

  const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);

  if (!user) return null;

  return user as TypeJWTPayload;
}
