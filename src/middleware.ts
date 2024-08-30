import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get("jwt_token");
  const token = jwtToken?.value;

  if (!token && req.method !== "GET") {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*"],
};
