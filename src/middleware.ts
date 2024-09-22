import { authConfig } from "@/auth.config";
import { PRIVATE_ROUTES } from "@/utils/privateRoutes";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isPrivateRoute = PRIVATE_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isPrivateRoute && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", nextUrl);
    loginUrl.searchParams.set("message", "login_required");

    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
