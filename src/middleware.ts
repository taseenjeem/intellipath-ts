import { authConfig } from "@/auth.config";
import { PRIVATE_ROUTES } from "@/utils/privateRoutes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = req.auth;

  const isPrivateRoute = PRIVATE_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    if (isAuthenticated === null) {
      const redirectedUrl = new URL("/auth/login", nextUrl);
      redirectedUrl.searchParams.set("message", "login_required");
      return Response.redirect(redirectedUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
