import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const reqPathName = req.nextUrl.pathname;

  if (!session) {
    if (reqPathName.startsWith("/api/admin")) {
      return NextResponse.json({}, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const username = session.username;
  if (!process.env.ADMIN_USERS.includes(username)) {
    if (reqPathName.startsWith("/api/admin")) {
      return NextResponse.json({}, { status: 401 });
    }
    return NextResponse.redirect(new URL("/404", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
