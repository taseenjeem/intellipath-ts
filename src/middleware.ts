import { authConfig } from "@/auth.config";
import { PRIVATE_ROUTES } from "@/utils/privateRoutes";
import NextAuth from "next-auth";

// Initialize NextAuth with the provided configuration
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req; // Get the URL of the next request
  const isAuthenticated = !!req.auth; // Check if the user is authenticated

  // Check if the current path is part of the private routes
  const isPrivateRoute = PRIVATE_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // If the route is private and the user is not authenticated, redirect them to the login page
  if (isPrivateRoute && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", nextUrl); // Set the redirect URL to the login page
    loginUrl.searchParams.set("message", "login_required"); // Add a message to indicate login is required

    return Response.redirect(loginUrl); // Redirect the user to the login page
  }
});

// The config defines the paths where this middleware will be applied
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // Matcher rules for which routes will trigger this middleware
  // It applies to all routes except static file routes and Next.js internal routes like `_next`.
};
