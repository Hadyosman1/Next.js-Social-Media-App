import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get("jwt_token");
  const token = jwtToken?.value;

  if (!token && req.method !== "GET") {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  if (!req.nextUrl.pathname.includes("api")) {
    const headers = new Headers(req.headers);
    headers.set("x-current-path", req.nextUrl.pathname);
    return NextResponse.next({ headers });
  }
}

export const config = {
  matcher: ["/api/users/profile/:path*"/*, "/:path*"*/],
};
