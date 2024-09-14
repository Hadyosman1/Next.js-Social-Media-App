import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get("jwt_token");
  const token = jwtToken?.value;

  if (req.nextUrl.pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    token &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (req.nextUrl.pathname === "/profile" && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && req.method !== "GET") {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  if (!req.nextUrl.pathname.includes("api")) {
    const headers = new Headers(req.headers);
    headers.set("x-current-path", req.nextUrl.pathname);
    return NextResponse.next({ headers });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/users/profile/:path*",
    "/dashboard/:path*",
    "/profile",
    "/login",
    "/register",
  ],
};
