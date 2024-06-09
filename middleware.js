import { NextResponse } from "next/server";

// note: logger is not available in middleware, using console.log instead

export const config = {
  matcher: ["/:path*"],
};

export async function middleware(req) {
  const reqPathName = req.nextUrl.pathname;

  return NextResponse.redirect(new URL(reqPathName, "https://github.com"));
}
