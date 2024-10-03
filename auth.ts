import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./database/db-models/userModel";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig, // Spreading authentication configuration
  providers: [
    CredentialProvider({
      // Async function to authorize users
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        // Ensure the password is a string
        if (typeof credentials.password !== "string") {
          throw new Error("Invalid password format. Password must be a string");
        }

        try {
          // Attempt to find the user by email
          const existingUser = await User.findOne({
            email: credentials?.email, // Querying for user with the provided email
          });

          // If user is not found, throw an error
          if (!existingUser) {
            throw new Error("User email is not found.");
          }

          // Check if the user exists and has a password
          if (existingUser && existingUser.password) {
            // Compare provided password with the hashed password in the database
            const verifyPassword = await bcrypt.compare(
              credentials.password, // User-provided password
              existingUser.password // Hashed password from the database
            );

            // If passwords match, return the existing user
            if (verifyPassword) {
              return existingUser;
            } else {
              throw new Error("Invalid password. Try again.");
            }
          } else {
            throw new Error("User not found.");
          }
        } catch (error) {
          console.log(error);
          throw new Error("An unexpected error occurred.");
        }
      },
    }),
  ],
});
