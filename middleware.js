export { default } from "next-auth/middleware";

export const config = { matcher: ["/api/account/:path*", "/account/:path*"] };
