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
    const loginUrl = new URL(LOGIN, nextUrl);
    loginUrl.searchParams.set("message", "login_required");

    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
