import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get("jwt_token");
  const token = jwtToken?.value;

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: response.headers });
  }

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

  if (
    !token &&
    req.method !== "GET" &&
    req.nextUrl.pathname !== "/api/users/login" &&
    req.nextUrl.pathname !== "/api/users/register"
  ) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  // if (!req.nextUrl.pathname.includes("api")) {
  //   const headers = new Headers(req.headers);
  //   headers.set("x-current-path", req.nextUrl.pathname);
  //   return NextResponse.next({ headers });
  // }

  return response;
}

export const config = {
  matcher: [
    "/api/:path*",
    "/api/users/profile/:path*",
    "/dashboard/:path*",
    "/profile",
    "/login",
    "/register",
  ],
};
