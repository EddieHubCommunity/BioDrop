import { NextResponse } from "next/server";

// note: logger is not available in middleware, using console.log instead

export const config = {
  matcher: ["/:path*"],
};

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  console.log("PATH", path);
  if (path !== "/") {
    return NextResponse.redirect(new URL(path, "https://github.com"));
  }

  if (path === "/") {
    return NextResponse.redirect(
      new URL("/EddieHubCommunity/BioDrop", "https://github.com")
    );
  }

  return NextResponse.next();
}
