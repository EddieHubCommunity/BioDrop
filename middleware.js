import { NextResponse } from "next/server";

export const config = {
  matcher: ["/"],
};

// logging
// no http requests (use db?)
export async function middleware(request) {
  const hostname = request.headers.get("host");
  console.log("=======", hostname, process.env.NEXT_PUBLIC_BASE_URL);

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
  console.log("----- PROFILE", profile);
  if (
    profile.username &&
    profile.user.type === "premium" &&
    profile.settings?.domain &&
    hostname === profile.settings.domain
  ) {
    console.log("MIDDLEWARE REDIRECT");
    // if match found rewrite to custom domain and display profile page
    return NextResponse.rewrite(
      new URL(`/${profile.username}`, `https://${profile.settings.domain}`), // TODO: https
    );
  }

  console.log("MIDDLEWARE NO REDIRECT");
}
