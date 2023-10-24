import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    // account management
    "/account/:path*",
    "/api/account/:path*",

    // admin section
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};

export async function middleware(req) {
  const sessionRequired = ["/account", "/api/account"];
  const adminRequired = ["/admin", "/api/admin"];
  const adminUsers = process.env.ADMIN_USERS.split(",");
  const reqPathName = req.nextUrl.pathname;

  // if not in sessionRequired or adminRequired, skip
  if (
    !sessionRequired
      .concat(adminRequired)
      .some((path) => reqPathName.startsWith(path))
  ) {
    return NextResponse.next();
  }

  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // if no session reject request
  if (!session) {
    if (reqPathName.startsWith("/api")) {
      return NextResponse.json({}, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const username = session.username;
  // if admin request check user is allowed
  if (adminRequired.some((path) => reqPathName.startsWith(path))) {
    if (!adminUsers.includes(username)) {
      if (reqPathName.startsWith("/api")) {
        return NextResponse.json({}, { status: 401 });
      }
      return NextResponse.redirect(new URL("/404", req.url));
    }
  }

  return NextResponse.next();
}
