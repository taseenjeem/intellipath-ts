import { authConfig } from "@/auth.config";
import {
  AUTHENTICATED_RESTRICTED_ROUTES,
  PRIVATE_ROUTES,
} from "@/utils/privateRoutes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

// Initialize NextAuth with the provided configuration
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req; // Get the URL of the next request
  const isAuthenticated = !!req.auth; // Check if the user is authenticated

  // Check if the current path is part of the private routes
  const isPrivateRoute = PRIVATE_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Check if the current path is part of the restricted routes
  const isRestrictedRoute = AUTHENTICATED_RESTRICTED_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // If the route is private and the user is not authenticated, redirect them to the login page
  if (isPrivateRoute && !isAuthenticated) {
    const redirectedUrl = new URL("/auth/login", nextUrl); // Set the redirect URL to the login page
    redirectedUrl.searchParams.set("message", "login_required"); // Add a message to indicate login is required
    return Response.redirect(redirectedUrl); // Redirect the user to the login page
  }

  // If the route is restricted and the user is authenticated, redirect them to home page
  if (isRestrictedRoute && isAuthenticated) {
    const redirectedUrl = new URL("/", nextUrl); // Set the redirect URL to home
    return Response.redirect(redirectedUrl); // Redirect the user to the forbidden page
  }

  // If none of the above conditions are met, allow the request to proceed
  return NextResponse.next();
});

// The config defines the paths where this middleware will be applied
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // Matcher rules for which routes will trigger this middleware
  // It applies to all routes except static file routes and Next.js internal routes like `_next`.
};
