import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// note: logger is not available in middleware, using console.log instead

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
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const hostname = req.headers.get("host");
  const reqPathName = req.nextUrl.pathname;
  const sessionRequired = ["/account", "/api/account"];
  const adminRequired = ["/admin", "/api/admin"];
  const adminUsers = process.env.ADMIN_USERS.split(",");
  const hostedDomain = process.env.NEXT_PUBLIC_BASE_URL.replace(
    /http:\/\/|https:\/\//,
    "",
  );
  const hostedDomains = [hostedDomain, `www.${hostedDomain}`];

  // if custom domain + on root path
  if (!hostedDomains.includes(hostname) && reqPathName === "/") {
    console.log(`custom domain used: "${hostname}"`);

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
      profile?.username &&
      profile.user.type === "premium" &&
      profile.settings?.domain &&
      profile.settings.domain === hostname
    ) {
      console.log(
        `custom domain matched "${hostname}" for username "${profile.username}" (protocol: "${protocol}")`,
      );
      // if match found rewrite to custom domain and display profile page
      return NextResponse.rewrite(
        new URL(
          `/${profile.username}`,
          `${protocol}://${profile.settings.domain}`,
        ),
      );
    }

    console.error(`custom domain NOT matched "${hostname}"`);
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
