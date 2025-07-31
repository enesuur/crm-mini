import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* TODO: JWT decoded token validation. */
export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value ?? null;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (
    token &&
    (pathname === "/" || pathname === "/login" || pathname === "/register")
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!token && pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
