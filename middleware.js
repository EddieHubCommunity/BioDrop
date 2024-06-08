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
  const sessionRequired = [ "/account", "/api/account" ];
  const adminRequired = [ "/admin", "/api/admin" ];
  // Trailing slash is necessary to catch URL /account/statistics/* but not index page
  const premiumRequired = [ "/account/statistics/" ];
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

  // Check token existence or validity
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // if no token reject request
  if (!token) {
    if (reqPathName.startsWith("/api")) {
      return NextResponse.json({}, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Premium path
  const isPremiumRoute = premiumRequired.some((path) => reqPathName.startsWith(path))
  const isUserPremium = token.accountType === "premium"
  if (isPremiumRoute && !isUserPremium) {
    if (reqPathName.startsWith("/api")) {
      return NextResponse.json({}, { status: 401 });
    }
    return NextResponse.redirect(new URL("/pricing", req.url))
  }

  // Admin Path
  const username = token.username;
  const isAdminRoute = adminRequired.some((path) => reqPathName.startsWith(path))
  const isUserAdmin = adminUsers.includes(username)
  if (isAdminRoute && !isUserAdmin) {
    if (reqPathName.startsWith("/api")) {
      return NextResponse.json({}, { status: 401 });
    }
    return NextResponse.redirect(new URL("/404", req.url));
  }

  // Allow request 
  return NextResponse.next();
}

