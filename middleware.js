import { NextResponse } from "next/server";

export const config = {
  matcher: ["/"],
};

// logging
// no http requests (use db?)
export async function middleware(request) {
  const hostname = request.headers.get("host");

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
    // if match found rewrite to custom domain and display profile page
    return NextResponse.rewrite(
      new URL(`/${profile.username}`, `https://${profile.settings.domain}`), // TODO: https
    );
  }
}
