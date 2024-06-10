import { NextResponse } from "next/server";

// note: logger is not available in middleware, using console.log instead

export const config = {
  matcher: ["/:path*"],
};

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  if (path !== "/") {
    return NextResponse.redirect(new URL(path, "https://github.com"));
  }

  return NextResponse.next();
}
