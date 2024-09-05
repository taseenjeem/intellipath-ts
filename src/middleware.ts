import { authConfig } from "@/auth.config";
import { LOGIN, PUBLIC_ROUTES, ROOT } from "@/utils/publicRoutes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
