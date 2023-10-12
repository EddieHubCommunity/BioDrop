import { NextResponse } from "next/server";

export const config = {
  matcher: ["/"],
};

// logging
// no http requests (use db?)
export async function middleware(request) {
  const hostname = request.headers.get("host");
  console.log("=======", hostname, process.env.NEXT_PUBLIC_BASE_URL);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/profiles/domain/${encodeURIComponent(hostname.replaceAll(".", "|"))}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const profile = await res.json();

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
