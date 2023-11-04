import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/",

    // account management
    "/account/:path*",
    "/api/account/:path*",

    // admin section
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};

export async function middleware(req) {
  const hostname = req.headers.get("host");
  const reqPathName = req.nextUrl.pathname;
  const sessionRequired = ["/account", "/api/account"];
  const adminRequired = ["/admin", "/api/admin"];
  const adminUsers = process.env.ADMIN_USERS.split(",");

  // check if custom domain
  const hostedDomain = process.env.NEXT_PUBLIC_BASE_URL.replace(
    /http:\/\/|https:\/\//,
    "",
  );
  if (hostname !== hostedDomain && reqPathName === "/") {
    console.log("custom domain used: ", hostname);
    let res;
    let profile;
    let url = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/search/${encodeURIComponent(hostname)}`;
    try {
      res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      profile = await res.json();
    } catch (e) {
      console.error(url, e);
      return NextResponse.error(e);
    }

    if (
      profile.username &&
      profile.user.type === "premium" &&
      profile.settings?.domain &&
      hostname === profile.settings.domain
    ) {
      console.log("custom domain matched: ", profile.username, hostname);
      // if match found rewrite to custom domain and display profile page
      return NextResponse.rewrite(
        new URL(`/${profile.username}`, `http://${profile.settings.domain}`),
      );
    }
  }

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
